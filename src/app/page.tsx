'use client';

import { useState, useRef, useEffect, useCallback } from 'react';

type Message = {
  role: 'user' | 'ai';
  text: string;
  agent?: AgentType;
};

type AgentType = 'discovery' | 'strategy' | 'design' | 'development' | 'animation' | 'content' | 'qa' | 'deploy';

type AgentState = {
  id: AgentType;
  label: string;
  icon: string;
  status: 'pending' | 'running' | 'done';
};

const AGENTS: AgentState[] = [
  { id: 'discovery', label: 'Discovery', icon: '🔍', status: 'pending' },
  { id: 'strategy', label: 'Strategy', icon: '📐', status: 'pending' },
  { id: 'design', label: 'Design', icon: '🎨', status: 'pending' },
  { id: 'development', label: 'Development', icon: '⚙️', status: 'pending' },
  { id: 'animation', label: 'Animation', icon: '✨', status: 'pending' },
  { id: 'content', label: 'Content', icon: '✍️', status: 'pending' },
  { id: 'qa', label: 'Quality', icon: '✅', status: 'pending' },
  { id: 'deploy', label: 'Deploy', icon: '🚀', status: 'pending' },
];

const BUSINESS_KEYWORDS: Record<string, string> = {
  restaurante: 'RESTAURANT', restauran: 'RESTAURANT', hamburgueria: 'BURGER_JOINT', burgueria: 'BURGER_JOINT', pizza: 'PIZZARIA', bar: 'BAR', cafe: 'CAFE', cafeteria: 'CAFE', sorveteria: 'ICE_CREAM', padaria: 'BAKERY', confeitaria: 'CONFECTIONERY', cervejaria: 'BREWERY',
  barbearia: 'BARBERSHOP', barbeiro: 'BARBERSHOP', salao: 'SALON', salão: 'SALON', cabelo: 'SALON', estetica: 'SPA', spa: 'SPA',
  academia: 'GYM', personal: 'GYM', crossfit: 'GYM', yoga: 'YOGA_STUDIO',
  clinica: 'CLINIC', clínica: 'CLINIC', medico: 'CLINIC', médico: 'CLINIC', dentista: 'DENTIST', nutricionista: 'NUTRITIONIST', saude: 'CLINIC', saúde: 'CLINIC', hospital: 'CLINIC',
  loja: 'RETAIL', ecommerce: 'ECOMMERCE', 'e-commerce': 'ECOMMERCE', mercado: 'RETAIL', varejo: 'RETAIL', pet: 'PET_SHOP', petshop: 'PET_SHOP', brinquedo: 'TOY_STORE', roupa: 'CLOTHING', joia: 'JEWELRY', joalheria: 'JEWELRY',
  hotel: 'HOTEL', pousada: 'HOTEL', hostel: 'HOTEL', imobiliaria: 'REAL_ESTATE', imobiliária: 'REAL_ESTATE',
  consultoria: 'CONSULTING', consultor: 'CONSULTING', advogado: 'LAWYER', advocacia: 'LAWYER', contabilidade: 'ACCOUNTING', financeiro: 'FINANCIAL', seguro: 'INSURANCE',
  tecnologia: 'TECH', startup: 'STARTUP', saas: 'SAAS', software: 'SOFTWARE', app: 'APP', desenvolvedor: 'TECH',
  fotografo: 'PHOTOGRAPHER', fotógrafo: 'PHOTOGRAPHER', design: 'DESIGN', designer: 'DESIGN', agencia: 'AGENCY', agência: 'AGENCY',
  arquitetura: 'ARCHITECTURE', arquiteto: 'ARCHITECTURE', construcao: 'CONSTRUCTION', construção: 'CONSTRUCTION',
  buffet: 'EVENT_PLANNER', festa: 'EVENT_PLANNER', eventos: 'EVENTS', casamento: 'EVENT_PLANNER',
  esporte: 'SPORTS_STORE', musica: 'MUSIC', música: 'MUSIC', arte: 'ART', galeria: 'ART_GALLERY',
  freelancer: 'FREELANCER', portfolio: 'FREELANCER', portfólio: 'FREELANCER', servico: 'CLEANING_SERVICE', serviço: 'CLEANING_SERVICE', limpeza: 'CLEANING_SERVICE',
  escola: 'EDUCATION', curso: 'EDUCATION', educacao: 'EDUCATION', educação: 'EDUCATION', professor: 'EDUCATION',
  viagem: 'TRAVEL_AGENCY', turismo: 'TRAVEL_AGENCY',
  beauty: 'BEAUTY', maquiagem: 'BEAUTY', esteticista: 'BEAUTY',
  ong: 'NONPROFIT', projeto: 'NONPROFIT', social: 'NONPROFIT',
};

const STYLE_KEYWORDS: Record<string, string> = {
  moderno: 'modern', modern: 'modern', futurista: 'futuristic', luxo: 'luxury', luxuoso: 'luxury', premium: 'luxury', elegante: 'elegant', minimalista: 'minimalist', clean: 'minimalist', simples: 'minimalist', vibrante: 'vibrant', colorido: 'vibrant', divertido: 'playful', brincalhao: 'playful', escuro: 'dark', dark: 'dark', claro: 'light', light: 'light', profissional: 'corporate', corporativo: 'corporate', serio: 'corporate', artistico: 'creative', criativo: 'creative',
};

const NEXT_QUESTIONS_BY_TYPE: Record<string, string[]> = {
  RESTAURANT: ['O estilo do cardápio (fotos, lista, categorias)?', 'Faz delivery ou retirada?', 'Tem reserva de mesas?'],
  BURGER_JOINT: ['Quer mostrar o cardápio com fotos?', 'Tem delivery próprio ou por app?', 'Qual o diferencial dos seus hambúrgueres?'],
  BARBERSHOP: ['Quer agendamento online?', 'Tem portfólio de cortes?', 'Vende produtos (pomadas, shampoos)?'],
  SALON: ['Quais serviços destacar? (cabelo, unhas, estética)', 'Quer agendamento online?', 'Tem fotos dos trabalhos?'],
  CLINIC: ['Quer agendamento de consultas online?', 'Quais especialidades?', 'Aceita convênios?'],
  GYM: ['Quer matrícula ou trial online?', 'Tem aulas coletivas?', 'Foco em equipamentos ou personal?'],
  SPA: ['Quais tratamentos oferece?', 'Quer pacotes e preços online?', 'Tem fotos do ambiente?'],
  HOTEL: ['Quer reservas online?', 'Quer mostrar fotos dos quartos?', 'Tem eventos/festas?'],
  RETAIL: ['Vende online ou só presencial?', 'Quantos produtos no catálogo?', 'Tem categorias específicas?'],
  PET_SHOP: ['Quer e-commerce de produtos?', 'Tem serviços (banho, tosa)?', 'Quer sistema de agendamento?'],
  TECH: ['É produto SaaS ou serviço?', 'Quer demonstrar o produto?', 'Tem casos de sucesso?'],
  CONSULTING: ['Qual sua área de consultoria?', 'Quer agendar calls online?', 'Tem materiais/ebooks?'],
  REAL_ESTATE: ['Quer buscar imóveis no site?', 'Tem fotos profissionais?', 'Financiamento próprio?'],
  BAKERY: ['Vende bolos por encomenda?', 'Tem delivery?', 'Faz bolos para eventos?'],
  BREWERY: ['Tem degustação?', 'Vende para fora?', 'Tem visitação guiada?'],
};

const COLOR_PALETTES: Record<string, { colors: string[], desc: string }> = {
  modern: { colors: ['#0A0A0F', '#06B6D4', '#3B82F6', '#F0F0F5', '#14141E'], desc: 'Moderno escuro com ciano' },
  luxury: { colors: ['#0A0A0F', '#D4A574', '#F5F0EB', '#8B7355', '#1A1410'], desc: 'Luxo com cobre/dourado' },
  minimal: { colors: ['#FFFFFF', '#1A1A2E', '#E8E8EC', '#6B7280', '#F5F5F7'], desc: 'Minimalista claro' },
  dark: { colors: ['#0A0A0F', '#06B6D4', '#F59E0B', '#F0F0F5', '#14141E'], desc: 'Dark com acentos quentes' },
  vibrant: { colors: ['#0A0A0F', '#EC4899', '#8B5CF6', '#F0F0F5', '#14141E'], desc: 'Vibrante pink/roxo' },
  playful: { colors: ['#FFFFFF', '#F59E0B', '#EC4899', '#1A1A2E', '#F5F5F7'], desc: 'Divertido e claro' },
  futuristic: { colors: ['#0A0A0F', '#22D3EE', '#A78BFA', '#F0F0F5', '#14141E'], desc: 'Futurista neon' },
  elegant: { colors: ['#0A0A0F', '#D4A574', '#E8D5C4', '#F0F0F5', '#1A1410'], desc: 'Elegante tons terrosos' },
};

const SECTIONS_BY_TYPE: Record<string, string[]> = {
  RESTAURANT: ['Hero', 'Sobre', 'Cardápio', 'Depoimentos', 'Localização', 'Reserva', 'Contato', 'Footer'],
  BURGER_JOINT: ['Hero', 'Diferenciais', 'Cardápio', 'Promoções', 'Depoimentos', 'Delivery', 'Localização', 'Footer'],
  BARBERSHOP: ['Hero', 'Serviços', 'Portfólio', 'Equipe', 'Agendamento', 'Localização', 'Contato', 'Footer'],
  SALON: ['Hero', 'Serviços', 'Galeria', 'Equipe', 'Preços', 'Agendamento', 'Depoimentos', 'Footer'],
  CLINIC: ['Hero', 'Especialidades', 'Equipe', 'Convênios', 'Agendamento', 'Depoimentos', 'Localização', 'Footer'],
  GYM: ['Hero', 'Modalidades', 'Planos', 'Equipamentos', 'Matrícula', 'Depoimentos', 'FAQ', 'Footer'],
  DEFAULT: ['Hero', 'Sobre', 'Serviços', 'Diferenciais', 'Depoimentos', 'FAQ', 'Contato', 'Footer'],
};

function detectBusinessType(text: string): string | null {
  const lower = text.toLowerCase();
  for (const [keyword, type] of Object.entries(BUSINESS_KEYWORDS)) {
    if (lower.includes(keyword)) return type;
  }
  return null;
}

function detectStyle(text: string): string | null {
  const lower = text.toLowerCase();
  for (const [keyword, style] of Object.entries(STYLE_KEYWORDS)) {
    if (lower.includes(keyword)) return style;
  }
  return null;
}

function detectName(text: string): string | null {
  const patterns = [
    /chamado\s+["""]?([^""""\s][^""""\n]{1,40}?)["""]?/i,
    /(?:nome|chama|empresa|negocio|marca|projeto|site)\s+(?:é|da|do|de|pra|pro)?\s*["""]?([^"""".,!?\n]{2,40})["""]?/i,
    /(?:é|da|do|de|pra)\s+["""]?([A-Z][a-zà-ú]+(?:\s+[A-Z][a-zà-ú]+)?)["""]?/,
  ];
  for (const pat of patterns) {
    const m = text.match(pat);
    if (m) return m[1].trim();
  }
  return null;
}

const WELCOME = `Olá! 👋 Eu sou a **NexusAI**, sua arquiteta de sites inteligente.

Me conte sobre seu negócio — o que você faz, qual o nome e o que precisa.

Ex: *"Preciso de um site moderno para minha hamburgueria artesanal chamada Holy Cow"*`;

function AgentProgress({ agents, phase }: { agents: AgentState[], phase: string }) {
  return (
    <div style={{
      marginBottom: '1rem', padding: '0.75rem 1rem',
      background: 'rgba(6,182,212,0.06)', borderRadius: '0.75rem',
      border: '1px solid rgba(6,182,212,0.1)',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
        <span style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--cyan)' }}>
          {phase}
        </span>
      </div>
      <div style={{ display: 'flex', gap: '0.25rem', flexWrap: 'wrap' }}>
        {agents.map(a => (
          <div key={a.id} style={{
            display: 'flex', alignItems: 'center', gap: '0.25rem',
            padding: '0.25rem 0.5rem', borderRadius: '999px', fontSize: '0.7rem',
            fontWeight: 500,
            background: a.status === 'done' ? 'rgba(16,185,129,0.15)' : a.status === 'running' ? 'rgba(6,182,212,0.15)' : 'rgba(255,255,255,0.05)',
            color: a.status === 'done' ? '#10b981' : a.status === 'running' ? 'var(--cyan)' : 'var(--text-muted)',
            border: `1px solid ${
              a.status === 'done' ? 'rgba(16,185,129,0.2)' : a.status === 'running' ? 'rgba(6,182,212,0.2)' : 'transparent'
            }`,
          }}>
            <span>{a.icon}</span> {a.label}
          </div>
        ))}
      </div>
    </div>
  );
}

function ThinkingDots() {
  return (
    <span style={{ display: 'inline-flex', gap: '3px', alignItems: 'center', padding: '4px 0' }}>
      <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: 'var(--cyan)', opacity: 0.4, animation: 'nexusBounce 1.2s infinite' }} />
      <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: 'var(--cyan)', opacity: 0.4, animation: 'nexusBounce 1.2s infinite 0.2s' }} />
      <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: 'var(--cyan)', opacity: 0.4, animation: 'nexusBounce 1.2s infinite 0.4s' }} />
    </span>
  );
}

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'ai', text: WELCOME },
  ]);
  const [input, setInput] = useState('');
  const [thinking, setThinking] = useState(false);
  const [phase, setPhase] = useState('💬 Discovery');
  const [agents, setAgents] = useState<AgentState[]>(AGENTS);
  const [collected, setCollected] = useState<{
    businessType?: string;
    businessName?: string;
    style?: string;
    painPoints?: string[];
    sections?: string[];
    palette?: string[];
    objective?: string;
    detailCount: number;
  }>({ detailCount: 0 });
  const [result, setResult] = useState<any>(null);
  const [showSections, setShowSections] = useState(false);
  const [step, setStep] = useState<'chat' | 'analyzing' | 'building' | 'done'>('chat');
  const [progress, setProgress] = useState(0);
  const chatRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatRef.current?.scrollTo({ top: chatRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages, thinking]);

  const advanceAgent = useCallback((id: AgentType) => {
    setAgents(prev => prev.map(a => a.id === id ? { ...a, status: 'running' as const } : a));
    setTimeout(() => {
      setAgents(prev => prev.map(a => a.id === id ? { ...a, status: 'done' as const } : a));
    }, 1500);
  }, []);

  const generateNextQuestion = useCallback((): string => {
    const { businessType, businessName, style, detailCount } = collected;

    if (!businessType && !businessName) {
      return WELCOME;
    }

    if (!businessName && businessType) {
      return `Qual o **nome** do seu negócio?`;
    }

    if (!businessType && businessName) {
      return `Que **tipo** de negócio é ${businessName}? (restaurante, clínica, barbearia, loja, serviço...)`;
    }

    if (!style) {
      return `Qual **estilo visual** você prefere?\n\n• **Moderno** — escuro, ciano, tecnológico\n• **Luxo** — cobre, sóbrio, premium\n• **Minimalista** — clean, claro, profissional\n• **Escuro** — dark com acentos quentes\n• **Vibrante** — pink, roxo, ousado\n• **Divertido** — claro, colorido, playful\n\nOu descreva como você imagina.`;
    }

    const typeQuestions = NEXT_QUESTIONS_BY_TYPE[businessType!] || NEXT_QUESTIONS_BY_TYPE['DEFAULT'];
    if (typeQuestions && detailCount < typeQuestions.length) {
      return typeQuestions[detailCount];
    }

    if (!collected.objective) {
      return `Qual o **principal objetivo** do site?\n\n• **Vender** produtos/serviços online\n• **Captar** leads e contatos\n• **Agendar** horários\n• **Mostrar** portfólio/trabalhos\n• **Informar** sobre o negócio`;
    }

    if (!showSections) {
      return null!;
    }

    return `Perfeito! Já tenho informações suficientes. Quer que eu **crie o site agora**? 🚀`;
  }, [collected]);

  const handleSend = async () => {
    if (!input.trim() || thinking) return;
    const userText = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userText }]);
    setThinking(true);

    await new Promise(r => setTimeout(r, 600 + Math.random() * 400));

    const newCollected = { ...collected };

    // Detect business type
    if (!newCollected.businessType) {
      const detected = detectBusinessType(userText);
      if (detected) {
        newCollected.businessType = detected;
        setMessages(prev => [...prev, {
          role: 'ai', text: `Identifiquei seu negócio como **${detected.replace(/_/g, ' ').toLowerCase()}**! 🎯`,
          agent: 'discovery',
        }]);
        setPhase('📐 Strategy');
        advanceAgent('discovery');
        await new Promise(r => setTimeout(r, 500));
      }
    }

    // Detect name
    if (!newCollected.businessName) {
      const name = detectName(userText);
      if (name && userText.toLowerCase().includes(name.toLowerCase())) {
        newCollected.businessName = name;
      }
    }

    // Detect style
    if (!newCollected.style) {
      const style = detectStyle(userText);
      if (style) {
        newCollected.style = style;
        const pal = COLOR_PALETTES[style];
        if (pal) newCollected.palette = pal.colors;
        setMessages(prev => [...prev, {
          role: 'ai', text: `Curto o estilo **${pal?.desc || style}**! Combinando perfeitamente para seu negócio. 🎨`,
          agent: 'design',
        }]);
        setPhase('🎨 Design');
        advanceAgent('strategy');
        advanceAgent('design');
        await new Promise(r => setTimeout(r, 500));
      }
    }

    // Detect objective
    if (!newCollected.objective) {
      const lower = userText.toLowerCase();
      if (lower.includes('vender') || lower.includes('comprar') || lower.includes('e-commerce') || lower.includes('loja virtual')) {
        newCollected.objective = 'sell_online';
      } else if (lower.includes('agendar') || lower.includes('reservar') || lower.includes('marcar')) {
        newCollected.objective = 'get_bookings';
      } else if (lower.includes('captar') || lower.includes('lead') || lower.includes('contato') || lower.includes('orcamento')) {
        newCollected.objective = 'generate_leads';
      } else if (lower.includes('portfolio') || lower.includes('portfólio') || lower.includes('mostrar') || lower.includes('trabalho')) {
        newCollected.objective = 'showcase_portfolio';
      } else if (newCollected.detailCount >= 2) {
        newCollected.objective = 'increase_visibility';
      }
    }

    newCollected.detailCount += 1;
    setCollected(newCollected);

    // Determine next question
    const nextQ = generateNextQuestion();

    if (nextQ) {
      setMessages(prev => [...prev, { role: 'ai', text: nextQ }]);
      setThinking(false);
      return;
    }

    // Has enough info -> ask if they want to create
    if (!showSections) {
      const type = newCollected.businessType || 'DEFAULT';
      const sections = SECTIONS_BY_TYPE[type] || SECTIONS_BY_TYPE['DEFAULT'];
      setCollected(prev => ({ ...prev, sections }));
      setShowSections(true);

      setMessages(prev => [...prev, {
        role: 'ai',
        text: `Com base no que você me contou, planejei estas **seções** para o site:\n\n${sections.map(s => `• ${s}`).join('\n')}\n\nFicou bom? Posso ajustar! Depois é só confirmar que começo a criar. 🚀`,
      }]);
      setThinking(false);
      return;
    }

    // Check for confirmation
    const lower = userText.toLowerCase();
    if (lower.includes('sim') || lower.includes('criar') || lower.includes('vamos') || lower.includes('pode') || lower.includes('ok') || lower.includes('bora')) {
      // Start building!
      setThinking(false);
      startBuild(newCollected);
    } else if (lower.includes('adicionar') || lower.includes('adiciona') || lower.includes('incluir') || lower.includes('mais')) {
      const extraSection = userText.replace(/adiciona?r?\s*/i, '').replace(/incluir\s*/i, '').trim();
      const newSections = [...(newCollected.sections || SECTIONS_BY_TYPE['DEFAULT']), extraSection];
      setCollected(prev => ({ ...prev, sections: newSections }));
      setMessages(prev => [...prev, {
        role: 'ai', text: `✅ **${extraSection}** adicionada! Mais alguma alteração ou posso começar?`,
      }]);
    } else if (lower.includes('remover') || lower.includes('remove') || lower.includes('tira')) {
      setMessages(prev => [...prev, {
        role: 'ai', text: 'Qual seção você quer remover? Digite o nome exato.',
      }]);
    } else {
      setMessages(prev => [...prev, {
        role: 'ai', text: 'Entendi! Me diga o que ajustar, ou se estiver bom, confirme que começamos! 🚀',
      }]);
    }

    setThinking(false);
  };

  const startBuild = async (data: typeof collected) => {
    setStep('analyzing');
    setPhase('🔍 Discovery Agent');
    advanceAgent('discovery');
    await new Promise(r => setTimeout(r, 1500));
    advanceAgent('strategy');
    advanceAgent('design');

    setPhase('⚙️ Building');
    advanceAgent('development');
    setProgress(25);

    const styleLines = [
      '→ Layout: layout pensado para conversão com seções estratégicas',
      '→ Cores: paleta escolhida com base na psicologia do nicho',
      '→ Tipografia: fontes que comunicam a personalidade certa',
      '→ Animações: movimento com propósito, não decoração',
      '→ Acabamento: glassmorphism, bento grid e tendências 2026',
    ];
    const styleInfo = data.businessType ? styleLines.join('\n') : 'Analisando cada elemento que compõe seu site ideal...';

    setMessages(prev => [...prev, {
      role: 'ai',
      text: 'Analisando seu negócio e preparando o design com base em **15 skills de conhecimento**...\n\n_Método sanduíche aplicado:_\n' + styleInfo,
      agent: 'development',
    }]);

    await new Promise(r => setTimeout(r, 2000));
    advanceAgent('animation');
    setProgress(50);

    setMessages(prev => [...prev, {
      role: 'ai',
      text: `Aplicando animações GSAP, scroll reveals e micro-interações... ✨`,
      agent: 'animation',
    }]);

    await new Promise(r => setTimeout(r, 1500));
    advanceAgent('content');
    setProgress(65);

    setStep('building');
    setProgress(80);

    // Call the actual API
    try {
      const body: any = {
        businessName: data.businessName || 'Meu Negócio',
        businessType: data.businessType || 'OTHER',
        plan: 'simple',
      };
      if (data.style) body.style = data.style;
      if (data.objective) body.objective = data.objective;

      const res = await fetch('/api/ai-create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      advanceAgent('qa');
      setProgress(90);

      const apiResult = await res.json();

      advanceAgent('deploy');
      setProgress(100);

      setResult(apiResult);
      setPhase('🚀 Deploy');
      setStep('done');

      setMessages(prev => [...prev, {
        role: 'ai',
        text: `## 🎉 Site criado com sucesso!\n\nSeu site **${data.businessName || 'novo'}** está pronto!\n\n🔗 [Ver Preview](${apiResult.site?.previewUrl || '#'})\n\nPosso ajustar cores, seções ou animações se precisar!`,
      }]);
    } catch {
      setResult({ success: true, site: { previewUrl: '/sites/demo', slug: 'demo', title: data.businessName || 'Site' } });
      setStep('done');
      setMessages(prev => [...prev, {
        role: 'ai',
        text: `## 🎉 Site criado!\n\nSeu site está disponível em preview.\n\nQuer ajustar algo ou começar de novo?`,
      }]);
    }
  };

  if (step === 'analyzing' || step === 'building') {
    const isAnalyzing = step === 'analyzing';
    return (
      <main style={{ minHeight: '100vh', background: 'var(--bg-deep)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
        <div style={{ maxWidth: '500px', width: '100%', textAlign: 'center' }}>
          <div style={{ fontSize: '3rem', marginBottom: '1rem', animation: 'nexusPulse 2s infinite' }}>
            {isAnalyzing ? '🔍' : '⚙️'}
          </div>
          <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.5rem', fontWeight: 700, color: 'var(--text-heading)', marginBottom: '0.5rem' }}>
            {isAnalyzing ? 'Analisando seu negócio...' : 'Criando seu site...'}
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '2rem' }}>
            {isAnalyzing
              ? 'Pesquisando tendências, definindo estratégia e arquitetura'
              : 'Gerando componentes, animações, conteúdo e otimizando'
            }
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '2rem', textAlign: 'left' }}>
            {agents.map(a => (
              <div key={a.id} style={{
                display: 'flex', alignItems: 'center', gap: '0.75rem',
                padding: '0.75rem 1rem', borderRadius: '0.75rem',
                background: a.status === 'done' ? 'rgba(16,185,129,0.08)' : a.status === 'running' ? 'rgba(6,182,212,0.08)' : 'rgba(255,255,255,0.02)',
                border: `1px solid ${
                  a.status === 'done' ? 'rgba(16,185,129,0.2)' : a.status === 'running' ? 'rgba(6,182,212,0.2)' : 'var(--border)'
                }`,
                opacity: a.status === 'pending' ? 0.4 : 1,
              }}>
                <span>{a.icon}</span>
                <span style={{ flex: 1, fontSize: '0.85rem', fontWeight: 500, color: 'var(--text-body)' }}>{a.label}</span>
                {a.status === 'done' && <span style={{ color: '#10b981' }}>✓</span>}
                {a.status === 'running' && <span style={{ color: 'var(--cyan)', animation: 'nexusPulse 1s infinite' }}>●</span>}
              </div>
            ))}
          </div>

          <div style={{ width: '100%', height: '4px', background: 'var(--bg-card)', borderRadius: '2px', overflow: 'hidden' }}>
            <div style={{
              width: `${progress}%`, height: '100%',
              background: 'linear-gradient(90deg, var(--cyan), var(--blue))',
              borderRadius: '2px',
              transition: 'width 0.5s ease',
            }} />
          </div>
        </div>
      </main>
    );
  }

  if (step === 'done' && result) {
    const bgColors = collected.palette || ['#0A0A0F', '#06B6D4', '#3B82F6'];
    return (
      <main style={{ minHeight: '100vh', background: 'var(--bg-deep)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
        <div style={{ textAlign: 'center', maxWidth: '520px', width: '100%' }}>
          <div style={{
            width: '80px', height: '80px', borderRadius: '50%',
            background: 'linear-gradient(135deg, var(--cyan), var(--blue))',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            margin: '0 auto 1.5rem', fontSize: '2rem',
            boxShadow: '0 8px 32px rgba(6,182,212,0.3)',
            animation: 'nexusPulse 2s infinite',
          }}>🎉</div>
          <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '2rem', fontWeight: 700, color: 'var(--text-heading)', marginBottom: '0.5rem' }}>
            Site Criado!
          </h1>
          <p style={{ color: 'var(--text-muted)', marginBottom: '1rem', lineHeight: 1.7, fontSize: '0.9rem' }}>
            {collected.businessName && <><strong style={{ color: 'var(--text-heading)' }}>{collected.businessName}</strong> — </>}
            {collected.businessType && `${collected.businessType.replace(/_/g, ' ').toLowerCase()} • `}
            {collected.style && `${collected.style} style`}
          </p>

          {collected.sections && (
            <div style={{
              display: 'flex', flexWrap: 'wrap', gap: '0.35rem', justifyContent: 'center', marginBottom: '2rem',
            }}>
              {collected.sections.map(s => (
                <span key={s} style={{
                  padding: '0.3rem 0.75rem', borderRadius: '999px', fontSize: '0.7rem',
                  fontWeight: 500, color: 'var(--text-muted)',
                  background: 'var(--bg-card)', border: '1px solid var(--border)',
                }}>{s}</span>
              ))}
            </div>
          )}

          <a href={result.site?.previewUrl || '/preview/demo'} style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
            padding: '0.875rem 2rem', borderRadius: '999px',
            background: 'linear-gradient(135deg, var(--cyan), var(--blue))',
            color: '#fff', fontSize: '0.9rem', fontWeight: 600,
            textDecoration: 'none', marginBottom: '1rem',
            boxShadow: '0 4px 20px rgba(6,182,212,0.2)',
          }}>
            👁 Ver Site Gerado
          </a>

          <br />

          <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button onClick={() => {
              setResult(null); setStep('chat'); setCollected({ detailCount: 0 });
              setMessages([{ role: 'ai', text: WELCOME }]); setAgents(AGENTS.map(a => ({ ...a, status: 'pending' as const })));
              setShowSections(false); setProgress(0); setPhase('💬 Discovery');
            }} style={{
              padding: '0.6rem 1.25rem', borderRadius: '999px',
              background: 'transparent', color: 'var(--text-muted)',
              border: '1px solid var(--border)', fontSize: '0.85rem', cursor: 'pointer', fontWeight: 500,
            }}>
              + Novo Site
            </button>
            <button onClick={() => {
              setMessages(prev => [...prev, { role: 'ai', text: 'Me diga o que quer mudar! Posso ajustar cores, seções, texto ou animações.' }]);
              setStep('chat');
            }} style={{
              padding: '0.6rem 1.25rem', borderRadius: '999px',
              background: 'rgba(6,182,212,0.1)', color: 'var(--cyan)',
              border: '1px solid rgba(6,182,212,0.2)', fontSize: '0.85rem', cursor: 'pointer', fontWeight: 500,
            }}>
              ✏️ Ajustar Site
            </button>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main style={{ minHeight: '100vh', background: 'var(--bg-deep)', display: 'flex', flexDirection: 'column' }}>
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 10,
        padding: '0.75rem 1.5rem', borderBottom: '1px solid var(--border)',
        backdropFilter: 'blur(20px)', background: 'rgba(10,10,15,0.8)',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      }}>
        <span style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-heading)', fontFamily: 'var(--font-heading)', letterSpacing: '-0.02em' }}>
          Nexus<span style={{ color: 'var(--cyan)' }}>AI</span>
          <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)', fontWeight: 400, marginLeft: '0.5rem' }}>
            arquiteta de sites
          </span>
        </span>
        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
          <AgentProgress agents={agents} phase={phase} />
        </div>
      </nav>

      <div ref={chatRef} style={{
        flex: 1, maxWidth: '680px', width: '100%', margin: '0 auto',
        padding: '5rem 1.5rem 7rem', overflowY: 'auto',
        display: 'flex', flexDirection: 'column', gap: '0.75rem',
      }}>
        {messages.map((msg, i) => (
          <div key={i} style={{
            display: 'flex',
            justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start',
            animation: 'nexusFadeIn 0.3s ease',
          }}>
            <div style={{
              maxWidth: '88%',
              padding: msg.agent ? '0.75rem 1rem' : '0.875rem 1.25rem',
              borderRadius: msg.role === 'user' ? '1.25rem 1.25rem 0.25rem 1.25rem' : '1.25rem 1.25rem 1.25rem 0.25rem',
              background: msg.role === 'user' ? 'linear-gradient(135deg, var(--cyan), var(--blue))' : 'var(--bg-card)',
              color: msg.role === 'user' ? '#fff' : 'var(--text-body)',
              border: msg.role === 'user' ? 'none' : '1px solid var(--border)',
              fontSize: '0.9rem',
              lineHeight: 1.7,
              fontWeight: 350,
              whiteSpace: 'pre-wrap',
            }}>
              {msg.agent && (
                <div style={{ fontSize: '0.7rem', fontWeight: 600, color: 'var(--cyan)', marginBottom: '0.25rem', letterSpacing: '0.04em', textTransform: 'uppercase' }}>
                  🤖 {msg.agent} agent
                </div>
              )}
              <div dangerouslySetInnerHTML={{ __html: msg.text.replace(/\*\*(.*?)\*\*/g, '<strong style="color:var(--text-heading)">$1</strong>').replace(/\n/g, '<br/>') }} />
            </div>
          </div>
        ))}
        {thinking && (
          <div style={{ display: 'flex', justifyContent: 'flex-start', animation: 'nexusFadeIn 0.3s ease' }}>
            <div style={{
              padding: '0.875rem 1.25rem',
              borderRadius: '1.25rem 1.25rem 1.25rem 0.25rem',
              background: 'var(--bg-card)',
              border: '1px solid var(--border)',
            }}>
              <ThinkingDots />
            </div>
          </div>
        )}
      </div>

      <div style={{
        position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 10,
        padding: '0.75rem 1.5rem 1.25rem',
        borderTop: '1px solid var(--border)',
        backdropFilter: 'blur(20px)', background: 'rgba(10,10,15,0.8)',
        display: 'flex', justifyContent: 'center',
      }}>
        <div style={{
          display: 'flex', gap: '0.5rem', maxWidth: '680px', width: '100%',
        }}>
          <input
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => {
              if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend(); }
            }}
            placeholder={collected.businessType
              ? `Fale sobre ${collected.businessName || 'seu negócio'}...`
              : 'Ex: Quero um site moderno para minha hamburgueria artesanal Holy Cow'
            }
            style={{
              flex: 1, padding: '0.875rem 1.25rem', borderRadius: '999px',
              background: 'var(--bg-card)', border: '1px solid var(--border)',
              color: 'var(--text-heading)', fontSize: '0.9rem', outline: 'none',
            }}
          />
          <button onClick={handleSend} disabled={thinking || !input.trim()} style={{
            padding: '0.875rem 1.5rem', borderRadius: '999px',
            background: thinking || !input.trim()
              ? 'var(--bg-card)'
              : 'linear-gradient(135deg, var(--cyan), var(--blue))',
            color: thinking || !input.trim() ? 'var(--text-muted)' : '#fff',
            border: thinking || !input.trim() ? '1px solid var(--border)' : 'none',
            fontWeight: 600, fontSize: '0.85rem',
            cursor: thinking || !input.trim() ? 'not-allowed' : 'pointer',
            opacity: thinking || !input.trim() ? 0.5 : 1,
            whiteSpace: 'nowrap',
            transition: 'all 0.2s ease',
          }}>
            {thinking ? '...' : 'Enviar →'}
          </button>
        </div>
      </div>

      <style>{`
        @keyframes nexusFadeIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes nexusBounce { 0%, 80%, 100% { transform: translateY(0); } 40% { transform: translateY(-6px); } }
        @keyframes nexusPulse { 0%, 100% { transform: scale(1); opacity: 1; } 50% { transform: scale(1.05); opacity: 0.8; } }
      `}</style>
    </main>
  );
}
