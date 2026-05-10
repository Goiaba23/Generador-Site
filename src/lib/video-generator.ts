export interface VideoScene {
  id: number;
  imageUrl: string;
  narration: string;
  duration: number;
  transition: 'fade' | 'slide' | 'zoom' | 'none';
}

export interface VideoResult {
  success: boolean;
  title: string;
  scenes: VideoScene[];
  totalDuration: number;
  error?: string;
}

export class VideoGenerator {
  async generateScript(
    businessName: string,
    businessType: string,
    style: string
  ): Promise<{ scenes: { description: string; narration: string; duration: number }[] } | null> {
    const key = process.env.GEMINI_API_KEY;
    if (!key) return null;

    const prompt = `Crie um roteiro de vídeo de 15 segundos para o negócio "${businessName}" (tipo: ${businessType}, estilo: ${style}).
Gere EXATAMENTE 4 cenas em formato JSON:
{
  "scenes": [
    {
      "description": "descrição detalhada da imagem para gerar",
      "narration": "texto falado desta cena em português (máx 20 palavras)",
      "duration": 4
    }
  ]
}
Regras:
- Cada description deve descrever uma cena visual MARKETEIRA e ATRAENTE
- A primeira cena deve ser uma abertura impactante
- A última cena deve ter um call-to-action
- Narrações curtas e diretas em português
- Duração total máxima: 15 segundos`;

    try {
      const res = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${key}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }],
            generationConfig: { temperature: 0.7, maxOutputTokens: 1024 },
          }),
        }
      );

      const data = await res.json();
      const text = data?.candidates?.[0]?.content?.parts?.[0]?.text || '';
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (!jsonMatch) return null;

      return JSON.parse(jsonMatch[0]);
    } catch (e) {
      console.error('[VideoGenerator] Script generation failed:', e);
      return null;
    }
  }

  async generateSceneImage(description: string, index: number): Promise<string | null> {
    const key = process.env.OPENAI_API_KEY;
    if (!key) return null;

    try {
      const res = await fetch('https://api.openai.com/v1/images/generations', {
        method: 'POST',
        headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'dall-e-3',
          prompt: `Cena ${index + 1} de vídeo marketing: ${description}. Estilo profissional, cores vibrantes, composition cinematográfica, 16:9`,
          n: 1,
          size: '1792x1024',
          quality: 'standard',
          style: 'vivid',
        }),
      });

      const data = await res.json();
      return data?.data?.[0]?.url || null;
    } catch (e) {
      console.error('[VideoGenerator] Scene image failed:', e);
      return null;
    }
  }

  async generateFallbackScene(
    businessName: string,
    businessType: string,
    style: string,
    index: number
  ): Promise<string | null> {
    const geminiKey = process.env.GEMINI_API_KEY;
    if (!geminiKey) return null;

    const scenes = [
      `Abstract background with ${style} design elements for ${businessType} business`,
      `Modern ${businessType} showcase with ${style} aesthetic and floating elements`,
      `${businessType} features and benefits presentation in ${style} style`,
      `${businessType} call to action with ${style} premium effects`,
    ];

    const svgPrompt = `Generate a professional SVG image for a marketing video scene.
Business: ${businessName}, Type: ${businessType}, Style: ${style}
Scene ${index + 1}: ${scenes[index] || scenes[0]}

Create a modern, ${style} SVG with:
- Rich gradient backgrounds
- Floating geometric elements
- Clean typography
- Professional color palette
- 16:9 aspect ratio (1920x1080 viewBox)
Return ONLY the SVG code inside \`\`\`svg...\`\`\``;

    try {
      const res = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${geminiKey}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: svgPrompt }] }],
            generationConfig: { temperature: 0.7, maxOutputTokens: 2048 },
          }),
        }
      );

      const data = await res.json();
      const text = data?.candidates?.[0]?.content?.parts?.[0]?.text || '';
      const svgMatch = text.match(/```svg\n?([\s\S]*?)```/);
      if (!svgMatch) return null;

      const svg = svgMatch[1].trim();
      return `data:image/svg+xml;base64,${Buffer.from(svg).toString('base64')}`;
    } catch (e) {
      console.error('[VideoGenerator] Fallback scene failed:', e);
      return null;
    }
  }

  async generateVideo(
    businessName: string,
    businessType: string,
    style: string
  ): Promise<VideoResult> {
    const script = await this.generateScript(businessName, businessType, style);
    if (!script || !script.scenes || script.scenes.length === 0) {
      return { success: false, title: '', scenes: [], totalDuration: 0, error: 'Falha ao gerar roteiro' };
    }

    const scenes: VideoScene[] = [];
    for (let i = 0; i < script.scenes.length; i++) {
      const scene = script.scenes[i];

      let imageUrl = await this.generateSceneImage(scene.description, i);
      if (!imageUrl) {
        imageUrl = await this.generateFallbackScene(businessName, businessType, style, i);
      }

      scenes.push({
        id: i + 1,
        imageUrl: imageUrl || '',
        narration: scene.narration,
        duration: scene.duration,
        transition: i === 0 ? 'fade' : i === script.scenes.length - 1 ? 'zoom' : 'slide',
      });
    }

    const totalDuration = scenes.reduce((acc, s) => acc + s.duration, 0);

    return {
      success: scenes.some(s => s.imageUrl),
      title: `${businessName} - Vídeo Marketing`,
      scenes,
      totalDuration,
    };
  }
}

export const videoGenerator = new VideoGenerator();
