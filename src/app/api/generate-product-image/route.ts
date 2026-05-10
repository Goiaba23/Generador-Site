import { NextRequest, NextResponse } from 'next/server';

const STYLES: Record<string, string> = {
  studio: 'professional studio photography, softbox lighting, clean gradient background, sharp focus, commercial, high-end',
  lifestyle: 'lifestyle photography, natural lighting, real environment setting, warm atmosphere, professional model using product, candid',
  white: 'pure white background, Amazon-style e-commerce product photo, isolated, drop shadow, commercial catalog, 360 view',
  luxury: 'luxury product photography, dramatic lighting, dark moody background, premium editorial style, high contrast, cinematic',
  macro: 'macro photography, extreme close-up, texture detail, shallow depth of field, bokeh background',
  flatlay: 'flat lay photography, top-down view, styled composition, natural light, creative arrangement',
};

const ANGLES: Record<string, string> = {
  front: 'front view, straight-on, symmetrical',
  side: 'side view, profile angle',
  three_quarter: 'three-quarter view, slightly angled, dynamic',
  top: 'top-down view, bird\'s eye',
  macro_detail: 'extreme macro close-up, texture detail visible',
  packshot: '360 product packshot, all sides visible rotation',
};

function buildPrompt(productName: string, style: string, angle: string, color?: string, brand?: string, description?: string): string {
  const stylePrompt = STYLES[style] || STYLES.white;
  const anglePrompt = ANGLES[angle] || ANGLES.three_quarter;
  const parts = [
    `Professional e-commerce product photograph of ${productName}`,
    color ? `, color: ${color}` : '',
    brand ? `, brand: ${brand}` : '',
    description ? `. ${description}` : '',
    `. ${anglePrompt}.`,
    stylePrompt,
    'Ultra HD, photorealistic, commercial quality, perfect lighting, sharp focus, no watermark, no text overlay',
  ];
  return parts.join('');
}

async function generateWithReplicateFLUX(prompt: string): Promise<string | null> {
  const key = process.env.REPLICATE_API_KEY;
  if (!key || key === 'YOUR_REPLICATE_API_KEY') return null;

  try {
    const prediction = await fetch('https://api.replicate.com/v1/models/black-forest-labs/flux-dev/predictions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${key}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        input: {
          prompt,
          num_outputs: 1,
          aspect_ratio: '3:2',
          output_format: 'png',
          guidance_scale: 3.5,
          num_inference_steps: 28,
        },
      }),
    });

    const predictionData = await prediction.json();
    if (!prediction.ok) {
      console.warn('[ProductImage] Replicate error:', predictionData);
      return null;
    }

    const predictionId = predictionData.id;
    for (let attempt = 0; attempt < 30; attempt++) {
      await new Promise(r => setTimeout(r, 1000));
      const statusRes = await fetch(`https://api.replicate.com/v1/predictions/${predictionId}`, {
        headers: { 'Authorization': `Bearer ${key}` },
      });
      const statusData = await statusRes.json();

      if (statusData.status === 'succeeded') {
        const url = statusData.output?.[0];
        if (url && typeof url === 'string') return url;
        return null;
      }
      if (statusData.status === 'failed') {
        console.warn('[ProductImage] Replicate prediction failed:', statusData.error);
        return null;
      }
    }
    return null;
  } catch (e) {
    console.warn('[ProductImage] Replicate request failed:', e);
    return null;
  }
}

async function generateWithDALLE3(prompt: string): Promise<{ url: string; revisedPrompt?: string } | null> {
  const key = process.env.OPENAI_API_KEY;
  if (!key) return null;

  try {
    const res = await fetch('https://api.openai.com/v1/images/generations', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${key}`,
      },
      body: JSON.stringify({
        model: 'dall-e-3',
        prompt,
        n: 1,
        size: '1792x1024',
        quality: 'hd',
        style: 'vivid',
      }),
    });

    const data = await res.json();
    if (res.ok && data.data?.[0]?.url) {
      return { url: data.data[0].url, revisedPrompt: data.data[0].revised_prompt };
    }
    console.warn('[ProductImage] DALL-E error:', data.error);
    return null;
  } catch (e) {
    console.warn('[ProductImage] DALL-E request failed:', e);
    return null;
  }
}

async function generateWithGeminiSVG(productName: string, color?: string): Promise<string | null> {
  const key = process.env.GEMINI_API_KEY;
  if (!key) return null;

  try {
    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent?key=${key}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: `Generate a high-end product showcase SVG for "${productName}"${color ? `, color: ${color}` : ''}. E-commerce product display, professional studio lighting, clean composition. Return ONLY valid SVG code wrapped in \`\`\`svg...\`\`\` with: centered product representation, gradient background, shadow effects, premium aesthetic, 800x800 viewBox.`
            }]
          }],
          generationConfig: { temperature: 0.7, maxOutputTokens: 4096 },
        }),
      }
    );
    const data = await res.json();
    const text = data?.candidates?.[0]?.content?.parts?.[0]?.text || '';
    const match = text.match(/```svg\n?([\s\S]*?)```/);
    if (match) {
      const b64 = Buffer.from(match[1].trim()).toString('base64');
      return `data:image/svg+xml;base64,${b64}`;
    }
    return null;
  } catch (e) {
    console.warn('[ProductImage] Gemini SVG failed:', e);
    return null;
  }
}

function selectBestProvider(style: string, description?: string): 'flux' | 'dalle' {
  const hasText = description ? /text|label|rótulo|escrita|palavra|embalagem|packaging/i.test(description) : false;
  if (hasText) return 'dalle';
  if (['lifestyle', 'studio', 'luxury'].includes(style)) return 'flux';
  return 'dalle';
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      productName, description, style = 'white', angle = 'three_quarter',
      color, brand, provider,
    } = body;

    if (!productName) {
      return NextResponse.json({ error: 'Nome do produto é obrigatório' }, { status: 400 });
    }

    const prompt = buildPrompt(productName, style, angle, color, brand, description);
    const selectedProvider = provider || selectBestProvider(style, description);

    if (selectedProvider === 'flux') {
      const fluxUrl = await generateWithReplicateFLUX(prompt);
      if (fluxUrl) {
        return NextResponse.json({ success: true, source: 'flux-pro', imageUrl: fluxUrl, productName, style, angle });
      }
      const dalleResult = await generateWithDALLE3(prompt);
      if (dalleResult) {
        return NextResponse.json({
          success: true, source: 'dalle-3', imageUrl: dalleResult.url,
          revisedPrompt: dalleResult.revisedPrompt, productName, style, angle,
        });
      }
    } else {
      const dalleResult = await generateWithDALLE3(prompt);
      if (dalleResult) {
        return NextResponse.json({
          success: true, source: 'dalle-3', imageUrl: dalleResult.url,
          revisedPrompt: dalleResult.revisedPrompt, productName, style, angle,
        });
      }
      const fluxUrl = await generateWithReplicateFLUX(prompt);
      if (fluxUrl) {
        return NextResponse.json({ success: true, source: 'flux-pro', imageUrl: fluxUrl, productName, style, angle });
      }
    }

    const svgUrl = await generateWithGeminiSVG(productName, color);
    if (svgUrl) {
      return NextResponse.json({ success: true, source: 'gemini-svg', imageUrl: svgUrl, productName, style, angle });
    }

    return NextResponse.json(
      { error: 'Nenhum provedor de geração disponível. Configure OPENAI_API_KEY, REPLICATE_API_KEY ou GEMINI_API_KEY.' },
      { status: 503 }
    );
  } catch (error: any) {
    console.error('[ProductImage] Error:', error);
    return NextResponse.json({ error: error.message || 'Erro interno' }, { status: 500 });
  }
}
