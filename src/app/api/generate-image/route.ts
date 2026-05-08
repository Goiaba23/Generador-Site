import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { prompt, niche } = await request.json();

    const imagePrompt = prompt || `Professional website background for ${niche || 'business'}, abstract gradient with geometric shapes, dark mode, premium SaaS aesthetic, subtle glow, 3D depth, cinematic lighting, ultra HD, no text, no logo, atmospheric`;

    // Try Gemini for image generation (Gemini 2.0 Flash supports image output)
    const GEMINI_KEY = process.env.GEMINI_API_KEY;
    if (GEMINI_KEY) {
      try {
        const geminiRes = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent?key=${GEMINI_KEY}`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              contents: [{
                parts: [{
                  text: `Generate a high-end abstract background image for a ${niche || 'SaaS'} website. ${imagePrompt}. Return ONLY a valid SVG code wrapped in \`\`\`svg...\`\`\` that I can use directly as a background. Use complex gradients, blur effects, geometric shapes, and atmospheric lighting. Dark theme.`
                }]
              }],
              generationConfig: { temperature: 0.9, maxOutputTokens: 4096 },
            }),
          }
        );
        const geminiData = await geminiRes.json();
        const text = geminiData?.candidates?.[0]?.content?.parts?.[0]?.text || '';
        const svgMatch = text.match(/```svg\n?([\s\S]*?)```/);
        if (svgMatch) {
          const svg = svgMatch[1].trim();
          const b64 = Buffer.from(svg).toString('base64');
          return NextResponse.json({
            success: true,
            source: 'gemini-svg',
            imageUrl: `data:image/svg+xml;base64,${b64}`,
            svg,
          });
        }
      } catch (e) {
        console.warn('[Image] Gemini SVG generation failed, trying DALL-E:', e);
      }
    }

    // Fallback: OpenAI DALL-E 3
    const OPENAI_KEY = process.env.OPENAI_API_KEY;
    if (OPENAI_KEY) {
      const dalleRes = await fetch('https://api.openai.com/v1/images/generations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${OPENAI_KEY}`,
        },
        body: JSON.stringify({
          model: 'dall-e-3',
          prompt: imagePrompt,
          n: 1,
          size: '1792x1024',
          quality: 'hd',
          style: 'vivid',
        }),
      });
      const dalleData = await dalleRes.json();
      if (dalleData.data?.[0]?.url) {
        return NextResponse.json({ success: true, source: 'dalle', imageUrl: dalleData.data[0].url });
      }
    }

    // Ultimate fallback: procedural CSS gradient
    const hues = [260, 320, 200, 340, 280];
    const hue = hues[Math.floor(Math.random() * hues.length)];
    const svgFallback = `<svg xmlns="http://www.w3.org/2000/svg" width="1920" height="1080" viewBox="0 0 1920 1080">
      <defs>
        <radialGradient id="g1" cx="20%" cy="30%" r="60%"><stop offset="0%" stop-color="hsla(${hue}, 70%, 50%, 0.15)"/><stop offset="100%" stop-color="transparent"/></radialGradient>
        <radialGradient id="g2" cx="80%" cy="70%" r="50%"><stop offset="0%" stop-color="hsla(${hue + 60}, 80%, 55%, 0.12)"/><stop offset="100%" stop-color="transparent"/></radialGradient>
        <radialGradient id="g3" cx="50%" cy="10%" r="40%"><stop offset="0%" stop-color="hsla(${hue + 30}, 60%, 60%, 0.08)"/><stop offset="100%" stop-color="transparent"/></radialGradient>
        <filter id="blur"><feGaussianBlur stdDeviation="40"/></filter>
      </defs>
      <rect width="1920" height="1080" fill="#08080F"/>
      <rect width="1920" height="1080" fill="url(#g1)" filter="url(#blur)"/>
      <rect width="1920" height="1080" fill="url(#g2)" filter="url(#blur)"/>
      <rect width="1920" height="1080" fill="url(#g3)" filter="url(#blur)"/>
    </svg>`;
    const b64 = Buffer.from(svgFallback).toString('base64');
    return NextResponse.json({
      success: true,
      source: 'procedural',
      imageUrl: `data:image/svg+xml;base64,${b64}`,
    });

  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
