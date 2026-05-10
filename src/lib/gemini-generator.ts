const GEMINI_API_KEY = process.env.GEMINI_API_KEY || '';
const MODEL = 'gemini-2.0-flash';
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${GEMINI_API_KEY}`;

export interface GeminiInput {
  businessName: string;
  businessType: string;
  businessDescription?: string;
  style?: string;
  sections: string[];
  sandwichLayers: {
    foundation: { layout: string; structure: string[] };
    colors: { palette: string[]; psychology: string; scheme: string };
    typography: { heading: string; body: string; pairing: string };
    animation: { type: string; intensity: string; library: string; patterns: string[] };
    premium: { glassmorphism: boolean; bentoGrid: boolean; noise: boolean };
  };
  objective?: string;
  researchInsights?: any;
  intensity?: 'standard' | 'premium';
}

function buildPrompt(input: GeminiInput): string {
  const { businessName, businessType, sections, sandwichLayers, objective } = input;
  const typeLabel = businessType.replace(/_/g, ' ').toLowerCase();

  return `You are NexusAI, a senior web designer and frontend developer. Generate a COMPLETE, production-ready single-page HTML landing page for a business.

## BUSINESS CONTEXT
- Name: ${businessName}
- Type: ${typeLabel}
- Objective: ${objective || 'professional online presence'}

## SECTIONS (in order)
${sections.map((s, i) => `  ${i + 1}. ${s}`).join('\n')}

## DESIGN TOKENS (from 15 expert skills)

### Foundation
- Layout: ${sandwichLayers.foundation.layout}
- Structure: ${sandwichLayers.foundation.structure.join(' → ')}

### Colors
- Palette: ${sandwichLayers.colors.palette.join(', ')}
- Psychology: ${sandwichLayers.colors.psychology}
- Scheme: ${sandwichLayers.colors.scheme}

### Typography
- Headings: ${sandwichLayers.typography.heading}
- Body: ${sandwichLayers.typography.body}
- Pairing: ${sandwichLayers.typography.pairing}

### Animation
- Style: ${sandwichLayers.animation.type}
- Intensity: ${sandwichLayers.animation.intensity}
- Library: ${sandwichLayers.animation.library}
- Patterns: ${sandwichLayers.animation.patterns.join(', ')}

### Premium Effects
- Glassmorphism: ${sandwichLayers.premium.glassmorphism ? 'yes' : 'no'}
- Bento Grid: ${sandwichLayers.premium.bentoGrid ? 'yes' : 'no'}
- Noise Texture: ${sandwichLayers.premium.noise ? 'yes' : 'no'}

## TECHNICAL REQUIREMENTS
1. Generate a COMPLETE HTML document (html, head, body)
2. ALL CSS must be inline in a <style> tag — NO external CSS files
3. ALL JS must be inline in a <script> tag — NO external JS files except:
   - Google Fonts (https://fonts.googleapis.com/css2?family=INTER&family=PLAYFAIR+DISPLAY)
   - GSAP CDN (https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js) + ScrollTrigger
   - Font Awesome (https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css)
4. Use the EXACT color palette provided
5. Must be FULLY RESPONSIVE (mobile, tablet, desktop)
6. Use CSS Grid and Flexbox for layout
7. Include smooth scroll behavior
8. Add GSAP scroll-triggered reveal animations on sections
9. Use glassmorphism effects (backdrop-filter: blur) on cards
10. Each section must have REALISTIC placeholder content related to the business type
11. Professional navigation with scroll-based background change
12. Hero section with CTA button
13. Footer with business name and social links
14. DO NOT use placeholders like "lorem ipsum" — use realistic copy

## OUTPUT
Return ONLY the complete HTML document. Start with <!DOCTYPE html> and end with </html>. No markdown, no code fences.`;
}

export async function generateSiteHTML(input: GeminiInput): Promise<string> {
  if (!GEMINI_API_KEY) {
    throw new Error('GEMINI_API_KEY não configurada');
  }

  const prompt = buildPrompt(input);

  const res = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{
        parts: [{ text: prompt }],
      }],
      generationConfig: {
        temperature: 0.7,
        topP: 0.95,
        topK: 40,
        maxOutputTokens: 8192,
      },
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Gemini API error (${res.status}): ${err}`);
  }

  const data = await res.json();
  const text = data?.candidates?.[0]?.content?.parts?.[0]?.text || '';

  // Strip markdown fences if present
  const cleaned = text
    .replace(/^```html\s*/i, '')
    .replace(/^```\s*/i, '')
    .replace(/\s*```$/i, '')
    .trim();

  if (!cleaned.startsWith('<!DOCTYPE html') && !cleaned.startsWith('<html')) {
    throw new Error('Gemini não retornou um HTML válido');
  }

  return cleaned;
}

export async function generateSiteHTMLWithFallback(input: GeminiInput): Promise<string> {
  try {
    return await generateSiteHTML(input);
  } catch (err) {
    console.error('[Gemini Generator] Failed, using fallback:', err);
    return buildFallbackHTML(input);
  }
}

export async function refineSiteHTML(
  existingHTML: string,
  input: GeminiInput
): Promise<string> {
  const intensity = input.intensity || 'standard';
  const isPremium = intensity === 'premium';

  const prompt = `You are NexusAI, a senior frontend refinement specialist. You will receive an existing HTML landing page and MUST refine it to perfection using the design tokens and requirements below.

## EXISTING HTML TO REFINE
\`\`\`html
${existingHTML.substring(0, 3000)}
\`\`\`

## BUSINESS
- Name: ${input.businessName}
- Type: ${input.businessType.replace(/_/g, ' ').toLowerCase()}
- Style: ${input.style || 'modern'}
- Objective: ${input.objective || 'professional presence'}

## REFINEMENT REQUIREMENTS
${isPremium ? `- Apply ULTRA-PREMIUM quality: 3D gradients, magnetic buttons, glassmorphism 2.0, bento grid layouts, noise textures, infinite scroll animations
- Add Three.js-style 3D elements (pure CSS 3D transforms, no external lib)
- Every section must have GSAP scroll-triggered reveals with stagger` : `- Apply standard premium quality: smooth GSAP scroll reveals, glassmorphism cards, gradient accents
- Clean typography hierarchy, micro-interactions on buttons and cards`}

## EXACT DESIGN TOKENS (MUST use these)
### Colors
- Palette: ${input.sandwichLayers.colors.palette.join(', ')}
- Psychology: ${input.sandwichLayers.colors.psychology}
- Scheme: ${input.sandwichLayers.colors.scheme}
Use these EXACT hex values throughout.

### Typography
- Headings: ${input.sandwichLayers.typography.heading}
- Body: ${input.sandwichLayers.typography.body}
- Pairing: ${input.sandwichLayers.typography.pairing}
Import via Google Fonts CDN.

### Animations
- Type: ${input.sandwichLayers.animation.type}
- Intensity: ${input.sandwichLayers.animation.intensity}
- Library: ${input.sandwichLayers.animation.library}
- Patterns: ${input.sandwichLayers.animation.patterns.join(', ')}
Add ALL these animation patterns using GSAP + ScrollTrigger.

### Premium Effects
- Glassmorphism: ${input.sandwichLayers.premium.glassmorphism ? '✓ APPLY to cards, nav, sections' : '✗ skip'}
- Bento Grid: ${input.sandwichLayers.premium.bentoGrid ? '✓ APPLY asymmetrical bento grid layout' : '✗ skip'}
- Noise Texture: ${input.sandwichLayers.premium.noise ? '✓ APPLY subtle noise overlay' : '✗ skip'}

### Sections (in order)
${input.sections.map(s => `  • ${s}`).join('\n')}
Each section MUST have REALISTIC, business-appropriate content (NO lorem ipsum).

${input.researchInsights ? `## RESEARCH INSIGHTS
${JSON.stringify(input.researchInsights, null, 2)}` : ''}

## OUTPUT RULES
1. Return the COMPLETE refined HTML document (preserve all existing structure)
2. ALL CSS inline in <style>, ALL JS in <script>
3. Keep Google Fonts, GSAP CDN, Font Awesome CDN imports
4. FULLY RESPONSIVE with media queries
5. Professional navigation with scroll behavior
6. Footer with business name
7. Start with <!DOCTYPE html>, end with </html>
8. NO markdown fences, NO explanations — just the HTML`;

  if (!GEMINI_API_KEY) {
    console.warn('[Gemini Refine] No API key, returning original HTML');
    return existingHTML;
  }

  try {
    const res = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: {
          temperature: 0.65,
          topP: 0.95,
          topK: 40,
          maxOutputTokens: 8192,
        },
      }),
    });

    if (!res.ok) {
      const err = await res.text();
      console.warn('[Gemini Refine] API error, returning original:', err);
      return existingHTML;
    }

    const data = await res.json();
    const text = data?.candidates?.[0]?.content?.parts?.[0]?.text || '';

    const cleaned = text
      .replace(/^```html\s*/i, '')
      .replace(/^```\s*/i, '')
      .replace(/\s*```\s*$/i, '')
      .trim();

    if (cleaned.startsWith('<!DOCTYPE html') || cleaned.startsWith('<html')) {
      console.log(`[Gemini Refine] ✓ Refined successfully (${cleaned.length} chars)`);
      return cleaned;
    }

    console.warn('[Gemini Refine] Invalid output, returning original');
    return existingHTML;
  } catch (err) {
    console.warn('[Gemini Refine] Error, returning original:', err);
    return existingHTML;
  }
}

function buildFallbackHTML(input: GeminiInput): string {
  const { businessName, sections, sandwichLayers } = input;
  const colors = sandwichLayers.colors.palette;
  const bg = colors[0] || '#0A0A0F';
  const primary = colors[1] || '#06B6D4';
  const accent = colors[2] || '#3B82F6';
  const text = colors[3] || '#F0F0F5';
  const surface = colors[4] || bg;

  const sectionHTML = sections.map(s => `
    <section class="section">
      <div class="container">
        <h2 class="section-title">${s}</h2>
        <p class="section-text">Conteudo personalizado para ${businessName} — secao ${s}.</p>
      </div>
    </section>
  `).join('\n');

  return `<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${businessName} — Premium Site</title>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;700;900&display=swap" rel="stylesheet">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css">
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js"></script>
<style>
* { margin: 0; padding: 0; box-sizing: border-box; }
html { scroll-behavior: smooth; }
body { font-family: 'Inter', sans-serif; background: ${bg}; color: ${text}; line-height: 1.7; }
.container { max-width: 1100px; margin: 0 auto; padding: 0 2rem; }
nav { position: fixed; top: 0; left: 0; right: 0; z-index: 100; padding: 1.25rem 2rem; transition: all 0.4s; }
nav.scrolled { background: rgba(10,10,15,0.9); backdrop-filter: blur(20px); padding: 0.75rem 2rem; border-bottom: 1px solid rgba(255,255,255,0.06); }
.nav-inner { max-width: 1100px; margin: 0 auto; display: flex; justify-content: space-between; align-items: center; }
.nav-logo { font-size: 1.25rem; font-weight: 800; color: ${text}; text-decoration: none; }
.nav-logo span { background: linear-gradient(135deg, ${primary}, ${accent}); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
.hero { min-height: 90vh; display: flex; align-items: center; justify-content: center; text-align: center; padding: 2rem; }
.hero h1 { font-size: clamp(2.5rem, 6vw, 4.5rem); font-weight: 900; letter-spacing: -0.04em; line-height: 1.05; margin-bottom: 1.25rem; }
.hero p { font-size: clamp(1rem, 2vw, 1.25rem); color: rgba(255,255,255,0.6); max-width: 560px; margin: 0 auto 2.5rem; }
.hero .btn { display: inline-flex; align-items: center; gap: 0.5rem; padding: 0.85rem 2rem; border-radius: 999px; border: none; background: linear-gradient(135deg, ${primary}, ${accent}); color: #fff; font-weight: 700; font-size: 0.9rem; text-decoration: none; box-shadow: 0 8px 32px rgba(6,182,212,0.25); }
.section { padding: 6rem 2rem; }
.section-title { font-size: 2rem; font-weight: 800; margin-bottom: 1rem; text-align: center; }
.section-text { color: rgba(255,255,255,0.6); text-align: center; max-width: 600px; margin: 0 auto; }
footer { padding: 3rem 2rem; border-top: 1px solid rgba(255,255,255,0.06); text-align: center; color: rgba(255,255,255,0.4); font-size: 0.85rem; }
</style>
</head>
<body>
<nav id="nav">
  <div class="nav-inner">
    <a href="#" class="nav-logo"><span>${businessName}</span></a>
  </div>
</nav>
<section class="hero">
  <div>
    <h1>${businessName}</h1>
    <p>Site premium gerado por IA com design thinking e tendencias 2026</p>
    <a href="#sections" class="btn">Explore <i class="fas fa-arrow-down"></i></a>
  </div>
</section>
<div id="sections">${sectionHTML}</div>
<footer>&copy; 2026 ${businessName}. Todos os direitos reservados.</footer>
<script>
gsap.registerPlugin(ScrollTrigger);
window.addEventListener('scroll', () => {
  document.getElementById('nav').classList.toggle('scrolled', window.scrollY > 40);
});
gsap.utils.toArray('.section').forEach(el => {
  gsap.from(el, { opacity: 0, y: 60, duration: 1, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 85%' } });
});
</script>
</body>
</html>`;
}
