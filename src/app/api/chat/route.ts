import { NextRequest, NextResponse } from 'next/server';
import { multiAI } from '@/lib/multi-ai-orchestrator';

const CAPABILITIES = [
  '🧠 Assistente IA — Perguntas, código, análise, conteúdo',
  '📺 YouTube — Pesquisar vídeos, tutoriais, tendências',
  '🔥 Web Scrape — Extrair conteúdo de qualquer site',
  '🎨 Gerar Imagem — DALL-E, FLUX, logos, arte',
  '🖼️ Stock Photos — Unsplash, Pexels',
  '🏷️ Brand — Logos e dados de marca',
  '🎬 Vídeo — Roteiro, cenas, vídeo marketing',
  '🌐 Site — Criar sites profissionais completos',
  '📐 Design Research — Tendências em 10 plataformas',
  '✏️ Editar Imagem — Remover fundo, upscale',
];

function getIntent(msg: string): string {
  const m = msg.toLowerCase();
  if (/(youtube|v[ií]deo|tutorial|canal|trend)/.test(m)) return 'YOUTUBE_SEARCH';
  if (/(site|website|scraping|extrair|not[ií]cia)/.test(m)) return 'WEB_SCRAPE';
  if (/(imagem|desenho|ilustraç[ãa]o|logo|logotipo|arte)/.test(m)) return 'IMAGE_GEN';
  if (/(foto|fotografia|stock photo|banco.*imagem|unsplash|pexels)/.test(m)) return 'STOCK_PHOTOS';
  if (/(marca|brand|empresa|dom[ií]nio)/.test(m)) return 'BRAND_LOOKUP';
  if (/(vídeo marketing|an[úu]ncio|roteiro|criar.*v[ií]deo)/i.test(m)) return 'VIDEO_GEN';
  if (/(criar site|landing page|p[aá]gina web|fazer site)/.test(m)) return 'FULL_SITE';
  if (/(design|tendência|inspiração|layout|ui|ux|interface|mockup)/.test(m)) return 'DESIGN_RESEARCH';
  if (/(editar|remover fundo|upscale|redimensionar|melhorar)/.test(m)) return 'EDIT_IMAGE';
  return 'GENERAL_CHAT';
}

function makeReply(message: string, intent: string): string {
  const m = message.toLowerCase();

  if (intent === 'YOUTUBE_SEARCH') return `🔍 **Pesquisa no YouTube ativada!**\n\nVou buscar vídeos sobre "${message}" para voce. Quer que eu pesquise agora?`;
  if (intent === 'WEB_SCRAPE') return `🌐 **Web Scrape ativado!**\n\n${m.match(/https?:\/\/[^\s]+/) ? 'Detectei uma URL — vou extrair o conteudo!' : 'Me passe uma URL que eu acesso e trago as informacoes.'}`;
  if (intent === 'IMAGE_GEN') return `🎨 **Geracao de Imagem ativada!**\n\nVou criar uma imagem baseada em: "${message}".`;
  if (intent === 'STOCK_PHOTOS') return `🖼️ **Busca de Stock Photos!**\n\nVou procurar fotos profissionais sobre "${message}" no Unsplash e Pexels.`;
  if (intent === 'BRAND_LOOKUP') return `🏷️ **Consulta de Marca!**\n\nVou buscar informacoes e logotipo para: "${message}".`;
  if (intent === 'VIDEO_GEN') return `🎬 **Criacao de Video!**\n\nVou criar roteiro e cenas para um video sobre: "${message}".`;
  if (intent === 'FULL_SITE') return `🌐 **Criacao de Site!**\n\nVou criar um site profissional completo para: "${message}". Qual o tipo de negocio?`;
  if (intent === 'DESIGN_RESEARCH') return `📐 **Pesquisa de Design!**\n\nVou analisar tendencias de design para: "${message}" em plataformas como MOBBIN, Awwwards, Dribbble.`;
  if (intent === 'EDIT_IMAGE') return `✏️ **Edicao de Imagem!**\n\nPosso remover fundo, upscalar, redimensionar. Me mande os detalhes.`;

  if (/^(oi|olá|ola|hey|bom dia|boa tarde|boa noite)/.test(m)) {
    return `Ola! 👋 Eu sou o **NexusAI**, seu assistente pessoal multi-IA.\n\n**Minhas capacidades:**\n${CAPABILITIES.join('\n')}\n\n**O que voce precisa hoje?**`;
  }

  if (/(obrigado|valeu|brigado|thanks|obg|grato)/.test(m)) {
    return `Por nada! 😊 Estou aqui para ajudar. Se precisar de mais alguma coisa, e so chamar! 🚀`;
  }

  return `Entendi! Sobre "${message}"...\n\nPara te ajudar, aqui esta o que posso fazer:\n\n${CAPABILITIES.slice(0, 6).join('\n')}\n\n**Qual dessas opcoes se encaixa no que voce precisa?**`;
}

export async function POST(request: NextRequest) {
  try {
    const text = await request.text();
    const body = JSON.parse(text);
    const { message, history } = body;

    if (!message) {
      return NextResponse.json({ error: 'Mensagem é obrigatória' }, { status: 400 });
    }

    const intent = getIntent(message);
    let toolResults: any[] = [];

    if (intent === 'YOUTUBE_SEARCH') {
      const r = await multiAI.executeTask('search-videos', { query: message }).catch(() => null);
      if (r?.success) toolResults.push({ tool: 'youtube', data: r.data });
    } else if (intent === 'WEB_SCRAPE') {
      const urlMatch = message.match(/https?:\/\/[^\s]+/);
      if (urlMatch) {
        const r = await multiAI.executeTask('scrape-url', { url: urlMatch[0] }).catch(() => null);
        if (r?.success) toolResults.push({ tool: 'firecrawl', data: r.data });
      }
    } else if (intent === 'IMAGE_GEN') {
      const r = await multiAI.executeTask('generate-image', { prompt: message }).catch(() => null);
      if (r?.success) toolResults.push({ tool: 'image-gen', data: r.data, provider: r.provider });
    } else if (intent === 'STOCK_PHOTOS') {
      const r = await multiAI.executeTask('search-stock-photos', { query: message }).catch(() => null);
      if (r?.success) toolResults.push({ tool: 'stock-photos', data: r.data });
    } else if (intent === 'DESIGN_RESEARCH') {
      const r = await multiAI.executeTask('analyze-design', { prompt: message }).catch(() => null);
      if (r?.success) toolResults.push({ tool: 'design-research', data: r.data });
    } else if (intent === 'BRAND_LOOKUP') {
      const domainMatch = message.match(/([a-zA-Z0-9-]+\.(com|net|org|io|dev|app|ai|br))/);
      if (domainMatch) {
        const [logo, brand] = await Promise.all([
          multiAI.executeTask('get-logo', { domain: domainMatch[1] }).catch(() => null),
          multiAI.executeTask('get-brand-data', { domain: domainMatch[1] }).catch(() => null),
        ]);
        if (logo?.success) toolResults.push({ tool: 'logo', data: logo.data });
        if (brand?.success) toolResults.push({ tool: 'brand', data: brand.data });
      }
    }

    let reply: string | null = null;
    let provider = 'fallback';
    const geminiKey = process.env.GEMINI_API_KEY;
    const openaiKey = process.env.OPENAI_API_KEY;

    if (intent === 'GENERAL_CHAT' && geminiKey) {
      try {
        const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${geminiKey}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [
              ...(history || []).slice(-6).map((m: any) => ({ role: m.role === 'user' ? 'user' : 'model', parts: [{ text: String(m.text || '') }] })),
              { role: 'user', parts: [{ text: String(message) }] },
            ],
            generationConfig: { temperature: 0.7, maxOutputTokens: 1024 },
          }),
        });
        const data = await res.json();
        if (data?.candidates?.[0]?.content?.parts?.[0]?.text) {
          reply = data.candidates[0].content.parts[0].text;
          provider = 'gemini';
        }
      } catch {}
    }

    if (!reply && intent === 'GENERAL_CHAT' && openaiKey) {
      try {
        const res = await fetch('https://api.openai.com/v1/chat/completions', {
          method: 'POST',
          headers: { 'Authorization': `Bearer ${openaiKey}`, 'Content-Type': 'application/json' },
          body: JSON.stringify({
            model: 'gpt-4o-mini',
            messages: [
              { role: 'system', content: 'Voce e um assistente pessoal amigavel chamado NexusAI. Responda em portugues brasileiro de forma natural.' },
              ...(history || []).slice(-6).map((m: any) => ({ role: m.role, content: String(m.text || '') })),
              { role: 'user', content: String(message) },
            ],
            max_tokens: 1024,
            temperature: 0.7,
          }),
        });
        const data = await res.json();
        if (data?.choices?.[0]?.message?.content) {
          reply = data.choices[0].message.content;
          provider = 'openai';
        }
      } catch {}
    }

    if (!reply) {
      reply = makeReply(message, intent);
    }

    const response: any = { reply, intent, provider };
    if (toolResults.length > 0) response.toolResults = toolResults;
    return NextResponse.json(response);
  } catch (err) {
    console.error('Chat error:', err);
    return NextResponse.json({
      reply: '⚠️ Erro inesperado. Tente novamente.',
      intent: 'GENERAL_CHAT',
      provider: 'error',
    }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({
    name: 'NexusAI Personal Assistant',
    version: '2.1',
    status: process.env.GEMINI_API_KEY || process.env.OPENAI_API_KEY ? 'online' : 'limited',
    apis: { gemini: !!process.env.GEMINI_API_KEY, openai: !!process.env.OPENAI_API_KEY },
  });
}
