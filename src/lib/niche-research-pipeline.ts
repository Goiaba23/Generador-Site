import { researchNiche, NicheDesignTokens } from './skill-research';
import { designInspirationEngine, DesignInspiration } from './design-inspiration';

const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY || '';

interface YouTubeVideo {
  title: string;
  description: string;
  thumbnail: string;
  url: string;
  channelTitle: string;
  publishedAt: string;
}

interface WebSearchResult {
  title: string;
  url: string;
  snippet: string;
}

export interface NicheResearchResult extends NicheDesignTokens {
  businessType: string;
  businessName: string;
  designTokens: NicheDesignTokens;
  youtubeFindings: YouTubeVideo[];
  platformFindings: YouTubeVideo[];
  designInspirations: DesignInspiration[];
  webFindings: WebSearchResult[];
  trends: string[];
  confidence: number;
}

const NICHE_TRENDS: Record<string, string[]> = {
  RESTAURANT: ['Dark mode + food photography parllax', 'Menu interativo com hover 3D', 'Bento grid para categorias', 'Glassmorphism cards de pratos', 'Scroll-triggered reveal de ingredientes'],
  BARBERSHOP: ['Before/after slider com GSAP', 'Galeria em grid assimétrico', 'Booking integrado com calendário', 'Preços em accordion animado', 'Hero com textura noise + bold typography'],
  SALON: ['Galeria com lightbox Masonry', 'Cards de serviço com flip 3D', 'Booking em múltiplos passos', 'Testemunhos em carrossel infinito', 'Paleta neutra com acentos rose gold'],
  CLINIC: ['Hero com video background', 'Cards de especialidades com ícones', 'FAQ accordion interativo', 'Agendamento inline no hero', 'Design clean + fotos reais da equipe'],
  GYM: ['Hero com contador animado', 'Planos em 3 tiers com destaque', 'Galeria de resultados com before/after', 'Matrícula em múltiplas etapas', 'Stats counter com scroll trigger'],
  HOTEL: ['Galeria full-screen com swipe', 'Cards de quarto com price reveal', 'Booking calendar integrado', 'Mapa interativo com pins', 'Depoimentos em carrossel autoplay'],
  TECH: ['Hero 3D com Three.js', 'Bento grid features interativo', 'Pricing toggle anual/mensal', 'FAQ com search interno', 'Stats counter com gradient text'],
  DEFAULT: ['Hero moderno com CTA', 'Bento grid de serviços', 'Depoimentos em carrossel', 'FAQ accordion', 'Footer com mapa e contato'],
};

const DESIGN_PLATFORMS = ['Mobbin', 'Refero', 'Curated Design', 'Bento Grinds', 'Httpster', 'Awwwards', 'Godly', 'SiteInspire', 'Land Book'];

async function searchYouTubeForDesignPlatforms(businessType: string, style: string): Promise<YouTubeVideo[]> {
  if (!YOUTUBE_API_KEY) return [];

  const queries = DESIGN_PLATFORMS.flatMap(p => [
    `how to use ${p} for website design inspiration ${businessType}`,
    `${p} web design tutorial ${style}`,
    `best ${p} designs ${businessType}`,
    `${p} review website design inspiration 2026`,
  ]);

  const all: YouTubeVideo[] = [];
  const seen = new Set<string>();
  for (const query of queries.slice(0, 12)) {
    try {
      const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(query)}&type=video&maxResults=2&key=${YOUTUBE_API_KEY}`;
      const res = await fetch(url);
      const data = await res.json();
      if (data.items) for (const item of data.items) {
        const t = item.snippet.title;
        if (!seen.has(t)) { seen.add(t); all.push({
          title: t, description: (item.snippet.description || '').substring(0, 200),
          thumbnail: item.snippet.thumbnails?.default?.url || '',
          url: `https://youtube.com/watch?v=${item.id.videoId}`,
          channelTitle: item.snippet.channelTitle, publishedAt: item.snippet.publishedAt,
        }); }
      }
    } catch { continue; }
  }
  return all.slice(0, 8);
}

async function searchYouTubeForNiche(businessType: string, businessName: string): Promise<YouTubeVideo[]> {
  if (!YOUTUBE_API_KEY) return [];

  const queries = [
    `${businessType.toLowerCase().replace(/_/g, ' ')} website design 2026`,
    `${businessName} website inspiration design`,
    `best ${businessType.toLowerCase().replace(/_/g, ' ')} websites 2026`,
  ];

  const allVideos: YouTubeVideo[] = [];
  const seen = new Set<string>();

  for (const query of queries) {
    try {
      const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(query)}&type=video&maxResults=3&key=${YOUTUBE_API_KEY}`;
      const res = await fetch(url);
      const data = await res.json();
      if (data.items) {
        for (const item of data.items) {
          const title = item.snippet.title;
          if (!seen.has(title)) {
            seen.add(title);
            allVideos.push({
              title,
              description: item.snippet.description?.substring(0, 200) || '',
              thumbnail: item.snippet.thumbnails?.default?.url || '',
              url: `https://youtube.com/watch?v=${item.id.videoId}`,
              channelTitle: item.snippet.channelTitle,
              publishedAt: item.snippet.publishedAt,
            });
          }
        }
      }
    } catch {
      continue;
    }
  }

  return allVideos.slice(0, 6);
}

function extractKeywordsDeep(description: string): string[] {
  const lower = description.toLowerCase();
  const words = lower.replace(/[^a-zà-ú\s]/g, '').split(/\s+/).filter(w => w.length > 3);
  const stopWords = new Set(['para', 'com', 'que', 'tem', 'uma', 'como', 'mais', 'por', 'dos', 'das', 'ser', 'nos', 'era', 'aos', 'esta', 'este', 'isso', 'para', 'muito', 'pode', 'vai', 'quer', 'sobre', 'depois', 'entre', 'sua', 'seu']);
  const unique = [...new Set(words.filter(w => !stopWords.has(w)))];

  const designKeywords = lower.includes('moderno') || lower.includes('modern') ? ['modern', 'clean', 'minimalist'] : [];
  const styleKeywords = lower.includes('luxo') || lower.includes('luxury') ? ['luxury', 'premium', 'sophisticated'] : [];
  const colorKeywords = lower.includes('escuro') || lower.includes('dark') ? ['dark mode', 'bold'] : lower.includes('claro') || lower.includes('light') ? ['light', 'clean'] : [];

  return [...new Set([...unique, ...designKeywords, ...styleKeywords, ...colorKeywords])].slice(0, 15);
}

function extractDesignFindings(videos: YouTubeVideo[], trends: string[]): WebSearchResult[] {
  const findings: WebSearchResult[] = [];

  for (const video of videos) {
    findings.push({
      title: video.title,
      url: video.url,
      snippet: video.description.substring(0, 150),
    });
  }

  for (const trend of trends.slice(0, 3)) {
    findings.push({
      title: `Tendência 2026: ${trend}`,
      url: '#',
      snippet: `Padrão de design identificado para o nicho: ${trend}`,
    });
  }

  return findings;
}

export async function researchNicheWithYouTube(
  businessType: string,
  businessName: string,
  userDescription: string,
  style: string = 'modern'
): Promise<NicheResearchResult> {
  const baseTokens = researchNiche(businessType, businessName, userDescription);

  const [youtubeVideos, platformVideos, designInsp] = await Promise.all([
    searchYouTubeForNiche(businessType, businessName),
    searchYouTubeForDesignPlatforms(businessType, style),
    designInspirationEngine.search(
      { businessName, businessType, style, keywords: [], niches: [businessType] },
      { limit: 8 }
    ),
  ]);

  const keywords = extractKeywordsDeep(userDescription);

  const trends = NICHE_TRENDS[businessType] || NICHE_TRENDS['DEFAULT'];

  const webFindings = extractDesignFindings(youtubeVideos, trends);

  const hasLiveData = youtubeVideos.length > 0 || platformVideos.length > 0;
  const enrichedTokens = {
    ...baseTokens,
    keywords: [...new Set([...baseTokens.keywords, ...keywords])].slice(0, 15),
  };

  return {
    ...enrichedTokens,
    businessType,
    businessName,
    designTokens: enrichedTokens,
    youtubeFindings: youtubeVideos,
    platformFindings: platformVideos,
    designInspirations: designInsp.inspirations,
    webFindings,
    trends,
    confidence: hasLiveData ? 0.9 : 0.65,
  };
}

export function generateResearchReport(result: NicheResearchResult): string {
  const { designTokens, youtubeFindings, trends, keywords } = result;
  const layers = designTokens.sandwichLayers;

  const sections = [
    `## 🔍 Pesquisa de Nicho: ${result.businessName}`,
    `**Tipo:** ${result.businessType.replace(/_/g, ' ').toLowerCase()}`,
    `**Confiança:** ${Math.round(result.confidence * 100)}%`,
    '',
    `### 📐 Fundação (Sanduíche - Camada 1)`,
    `Layout: ${layers.foundation.layout}`,
    `Seções: ${layers.foundation.structure.join(' → ')}`,
    '',
    `### 🎨 Cores (Camada 2)`,
    `Paleta: ${layers.colors.palette.join(', ')}`,
    `Psicologia: ${layers.colors.psychology}`,
    `Esquema: ${layers.colors.scheme}`,
    '',
    `### 🔤 Tipografia (Camada 3)`,
    `Headings: ${layers.typography.heading}`,
    `Body: ${layers.typography.body}`,
    `Pairing: ${layers.typography.pairing}`,
    '',
    `### ✨ Animação (Camada 4)`,
    `Tipo: ${layers.animation.type}`,
    `Intensidade: ${layers.animation.intensity}`,
    `Bibliotecas: ${layers.animation.library}`,
    `Padrões: ${layers.animation.patterns.join(', ')}`,
    '',
    `### 💎 Premium (Camada 5)`,
    `Glassmorphism: ${layers.premium.glassmorphism ? '✓' : '✗'}`,
    `Bento Grid: ${layers.premium.bentoGrid ? '✓' : '✗'}`,
    `Noise Texture: ${layers.premium.noise ? '✓' : '✗'}`,
    '',
    `### 🔮 Tendências 2026 para o Nicho`,
    ...trends.map(t => `• ${t}`),
    '',
    `### 📺 YouTube Insights (${youtubeFindings.length} vídeos)`,
    ...youtubeFindings.map(v => `• [${v.title}](${v.url}) — ${v.channelTitle}`),
    '',
    `### 🔑 Palavras-chave`,
    keywords.join(', '),
  ];

  return sections.join('\n');
}
