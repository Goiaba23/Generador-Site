import { NextRequest, NextResponse } from 'next/server';

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

async function removeBackground(imageUrl: string): Promise<string | null> {
  const key = process.env.REPLICATE_API_KEY;
  if (!key || key === 'YOUR_REPLICATE_API_KEY') return null;

  try {
    const res = await fetch('https://api.replicate.com/v1/predictions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${key}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        version: 'fb8af171cfa1616ddcf1242c093f9c46bcada5ad4cf6f2fbe8b81b330ec2a1cb',
        input: { image: imageUrl },
      }),
    });

    const prediction = await res.json();
    if (!res.ok) {
      console.warn('[EditImage] Background removal error:', prediction);
      return null;
    }

    const result = await waitForPrediction(`https://api.replicate.com/v1/predictions/${prediction.id}`, key);

    if (result.output && typeof result.output === 'string') return result.output;
    if (Array.isArray(result.output) && result.output.length > 0) return result.output[0];
    return null;
  } catch (e) {
    console.warn('[EditImage] Background removal failed:', e);
    return null;
  }
}

async function upscaleImage(imageUrl: string, scale: number = 2): Promise<string | null> {
  const key = process.env.REPLICATE_API_KEY;
  if (!key || key === 'YOUR_REPLICATE_API_KEY') return null;

  try {
    const res = await fetch('https://api.replicate.com/v1/predictions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${key}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        version: '42aedcf4b5c0f8b2c6802f1f3c1b8b6e8e5e4d3c2a1b0f9e8d7c6b5a4f3e2d1',
        input: { image: imageUrl, scale },
      }),
    });

    const prediction = await res.json();
    if (!res.ok) {
      console.warn('[EditImage] Upscale error:', prediction);
      return null;
    }

    const result = await waitForPrediction(`https://api.replicate.com/v1/predictions/${prediction.id}`, key);
    if (result.output && typeof result.output === 'string') return result.output;
    if (Array.isArray(result.output) && result.output.length > 0) return result.output[0];
    return null;
  } catch (e) {
    console.warn('[EditImage] Upscale failed:', e);
    return null;
  }
}

async function inpaintImage(imageUrl: string, mask: string, prompt: string): Promise<string | null> {
  const key = process.env.REPLICATE_API_KEY;
  if (!key || key === 'YOUR_REPLICATE_API_KEY') return null;

  try {
    const res = await fetch('https://api.replicate.com/v1/predictions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${key}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        version: 'c11bac672033fc01a04e4f7b3e2d5f8a8d6c5b4a3f2e1d0c9b8a7f6e5d4c3b2a',
        input: {
          image: imageUrl,
          mask,
          prompt,
          num_outputs: 1,
        },
      }),
    });

    const prediction = await res.json();
    if (!res.ok) {
      console.warn('[EditImage] Inpaint error:', prediction);
      return null;
    }

    const result = await waitForPrediction(`https://api.replicate.com/v1/predictions/${prediction.id}`, key);
    if (result.output && typeof result.output === 'string') return result.output;
    if (Array.isArray(result.output) && result.output.length > 0) return result.output[0];
    return null;
  } catch (e) {
    console.warn('[EditImage] Inpaint failed:', e);
    return null;
  }
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
