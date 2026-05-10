import { NextRequest, NextResponse } from 'next/server';

function getKey(): string | null {
  const key = process.env.REPLICATE_API_KEY;
  if (!key || key === 'YOUR_REPLICATE_API_KEY') return null;
  return key;
}

async function createPrediction(model: string, input: any, key: string) {
  const res = await fetch(`https://api.replicate.com/v1/models/${model}/predictions`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ input }),
  });
  return res;
}

async function createPredictionLegacy(version: string, input: any, key: string) {
  const res = await fetch('https://api.replicate.com/v1/predictions', {
    method: 'POST',
    headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ version, input }),
  });
  return res;
}

async function waitForPrediction(url: string, token: string): Promise<any> {
  for (let i = 0; i < 30; i++) {
    await new Promise(r => setTimeout(r, 1500));
    const res = await fetch(url, { headers: { Authorization: `Bearer ${token}` } });
    const data = await res.json();
    if (data.status === 'succeeded') return data;
    if (data.status === 'failed') throw new Error(data.error || 'Replicate prediction failed');
  }
  throw new Error('Prediction timed out');
}

function extractOutput(data: any): string | null {
  if (data?.output && typeof data.output === 'string') return data.output;
  if (Array.isArray(data?.output) && data.output.length > 0) return data.output[0];
  return null;
}

async function runModel(model: string, version: string, input: any): Promise<string | null> {
  const key = getKey();
  if (!key) return null;

  try {
    const res = await createPrediction(model, input, key);
    if (res.ok) {
      const data = await res.json();
      const result = await waitForPrediction(`https://api.replicate.com/v1/predictions/${data.id}`, key);
      return extractOutput(result);
    }
    console.warn(`[EditImage] Model ${model} failed, trying version hash...`);
  } catch (e) {
    console.warn(`[EditImage] Model ${model} error:`, e);
  }

  try {
    const res = await createPredictionLegacy(version, input, key);
    if (!res.ok) return null;
    const data = await res.json();
    const result = await waitForPrediction(`https://api.replicate.com/v1/predictions/${data.id}`, key);
    return extractOutput(result);
  } catch (e) {
    console.warn(`[EditImage] Version hash fallback failed:`, e);
    return null;
  }
}

async function removeBackground(imageUrl: string): Promise<string | null> {
  return runModel(
    'abirizer/remove-bg',
    'fb8af171cfa1616ddcf1242c093f9c46bcada5ad4cf6f2fbe8b81b330ec2a1cb',
    { image: imageUrl }
  );
}

async function upscaleImage(imageUrl: string, scale: number = 2): Promise<string | null> {
  return runModel(
    'nightmareai/real-esrgan',
    '42fed1c4974146d4d2414e2be2c5277c7fcf05fcc3a73abf41610695738c1d7f',
    { image: imageUrl, scale }
  );
}

async function inpaintImage(imageUrl: string, mask: string, prompt: string): Promise<string | null> {
  return runModel(
    'stability-ai/stable-diffusion-inpainting',
    '95b7223104132402a9ae91cc677285bc5eb997834bd2349fa49f8541a538e2bc',
    { image: imageUrl, mask, prompt, num_outputs: 1 }
  );
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action, imageUrl, scale = 2, mask, prompt } = body;

    if (!imageUrl) {
      return NextResponse.json({ error: 'imageUrl é obrigatório' }, { status: 400 });
    }

    let resultUrl: string | null = null;

    switch (action) {
      case 'remove-bg':
        resultUrl = await removeBackground(imageUrl);
        break;
      case 'upscale':
        resultUrl = await upscaleImage(imageUrl, scale);
        break;
      case 'inpaint':
        if (!mask || !prompt) {
          return NextResponse.json({ error: 'inpaint requer mask e prompt' }, { status: 400 });
        }
        resultUrl = await inpaintImage(imageUrl, mask, prompt);
        break;
      default:
        return NextResponse.json(
          { error: 'Ação inválida. Use: remove-bg, upscale, inpaint' },
          { status: 400 }
        );
    }

    if (!resultUrl) {
      return NextResponse.json(
        { error: `Falha ao executar ${action}. Verifique REPLICATE_API_KEY.`, fallback: true },
        { status: 200 }
      );
    }

    return NextResponse.json({ success: true, action, resultUrl });
  } catch (error: any) {
    console.error('[EditImage] Error:', error);
    return NextResponse.json({ error: error.message || 'Erro interno' }, { status: 500 });
  }
}
