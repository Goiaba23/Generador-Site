'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { getAnimationsForNiche } from '@/lib/animations';
import { getComponentsForNiche } from '@/lib/21dev-components';
import { generateLogoInspiration } from '@/lib/uxshowcase-logos';

gsap.registerPlugin(ScrollTrigger);

type Theme = 'dark' | 'light';

const themeConfig = {
  dark: {
    bg: '#030308',
    bgSecondary: '#0A0A12',
    bgGlass: 'rgba(10, 10, 18, 0.7)',
    text: '#FAFAFA',
    textMuted: '#71717A',
    textSecondary: '#A1A1AA',
    primary: '#A855F7',
    primaryGlow: 'rgba(168, 85, 247, 0.5)',
    secondary: '#6366F1',
    accent: '#EC4899',
    border: 'rgba(255, 255, 255, 0.06)',
    borderHover: 'rgba(168, 85, 247, 0.4)',
    cardBg: 'rgba(20, 20, 32, 0.5)',
    cardBorder: 'rgba(255, 255, 255, 0.04)',
    gradient: 'linear-gradient(135deg, #A855F7 0%, #6366F1 50%, #EC4899 100%)',
  },
  light: {
    bg: '#FAFAFA',
    bgSecondary: '#F4F4F5',
    bgGlass: 'rgba(255, 255, 255, 0.8)',
    text: '#18181B',
    textMuted: '#A1A1AA',
    textSecondary: '#52525B',
    primary: '#9333EA',
    primaryGlow: 'rgba(147, 51, 234, 0.3)',
    secondary: '#6366F1',
    accent: '#DB2777',
    border: 'rgba(0, 0, 0, 0.06)',
    borderHover: 'rgba(147, 51, 234, 0.3)',
    cardBg: 'rgba(255, 255, 255, 0.8)',
    cardBorder: 'rgba(0, 0, 0, 0.04)',
    gradient: 'linear-gradient(135deg, #9333EA 0%, #6366F1 50%, #EC4899 100%)',
  },
};

function getThemeColors(t: Theme) {
  return themeConfig[t];
}

function useInView(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, isVisible };
}

function GlowCard({ children, delay = 0, selected = false, onClick }: { children: React.ReactNode; delay?: number; selected?: boolean; onClick?: () => void }) {
  const { ref, isVisible } = useInView();
  const colors = getThemeColors('dark');
  
  return (
    <div
      ref={ref}
      onClick={onClick}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
        transition: 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
        transitionDelay: `${delay}ms`,
        background: selected ? 'rgba(30, 30, 50, 0.8)' : colors.cardBg,
        border: selected ? `2px solid ${colors.primary}` : `1px solid ${colors.cardBorder}`,
        borderRadius: '1.25rem',
        padding: '1.5rem',
        backdropFilter: 'blur(20px)',
        cursor: onClick ? 'pointer' : 'default',
        position: 'relative',
        overflow: 'hidden',
        boxShadow: selected ? '0 20px 40px -10px rgba(168, 85, 247, 0.3)' : 'none',
      }}
    >
      {selected && (
        <div style={{
          position: 'absolute',
          top: '-50%',
          right: '-50%',
          width: '200%',
          height: '200%',
          background: 'radial-gradient(circle, rgba(168, 85, 247, 0.15), transparent 70%)',
          pointerEvents: 'none',
        }} />
      )}
      {children}
    </div>
  );
}

function ProgressStep({ icon, title, desc, active, completed }: { icon: string; title: string; desc: string; active?: boolean; completed?: boolean }) {
  return (
    <div style={{
      padding: '1rem 1.5rem',
      background: completed ? 'rgba(52, 211, 153, 0.15)' : active ? 'rgba(168, 85, 247, 0.15)' : 'rgba(255, 255, 255, 0.03)',
      border: completed ? '1px solid rgba(52, 211, 153, 0.4)' : active ? '2px solid #A855F7' : '1px solid rgba(255, 255, 255, 0.1)',
      borderRadius: '12px',
      display: 'flex',
      alignItems: 'flex-start',
      gap: '1rem',
      opacity: completed ? 1 : active ? 1 : 0.6,
      transform: active ? 'scale(1.02)' : 'scale(1)',
      transition: 'all 0.5s ease',
    }}>
      <span style={{ fontSize: '1.5rem' }}>{icon}</span>
      <div>
        <div style={{ fontWeight: 600, color: completed ? '#34D399' : active ? 'white' : '#64748B' }}>
          {title}
          {completed && <span style={{ marginLeft: '0.5rem', fontSize: '0.75rem', color: '#34D399' }}>✓ Completo</span>}
          {active && <span style={{ marginLeft: '0.5rem', fontSize: '0.75rem', color: '#A855F7' }}>Processando...</span>}
        </div>
        <div style={{ fontSize: '0.85rem', color: '#94A3B8', marginTop: '0.25rem' }}>{desc}</div>
      </div>
    </div>
  );
}

// ===== CATALOG DATA =====
interface BusinessOption {
  type: string;
  label: string;
  icon: string;
  category: string;
}

const businessCatalog: BusinessOption[] = [
  { type: 'RESTAURANT', label: 'Restaurante', icon: '🍽️', category: 'Alimentacao' },
  { type: 'BARBERSHOP', label: 'Barbearia', icon: '✂️', category: 'Beleza' },
  { type: 'SALON', label: 'Salão de Beleza', icon: '💇', category: 'Beleza' },
  { type: 'CLINIC', label: 'Clínica', icon: '🏥', category: 'Saude' },
  { type: 'GYM', label: 'Academia', icon: '💪', category: 'Fitness' },
  { type: 'RETAIL', label: 'Loja', icon: '🛒', category: 'Varejo' },
  { type: 'REAL_ESTATE', label: 'Imobiliária', icon: '🏠', category: 'Imobiliária' },
  { type: 'TECH', label: 'Tecnologia', icon: '💻', category: 'Tecnologia' },
  { type: 'PET_SHOP', label: 'Pet Shop', icon: '🐕', category: 'Pets' },
  { type: 'HOTEL', label: 'Hotel', icon: '🏨', category: 'Lazer' },
];

export default function CreateSitePage() {
  const router = useRouter();
  const colors = getThemeColors('dark');
  
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [showProgress, setShowProgress] = useState(false);
  const [progressStep, setProgressStep] = useState(0);
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [rufloData, setRufloData] = useState<any>(null);
  const [youtubeResults, setYoutubeResults] = useState<any[]>([]);
  const [webSearchResults, setWebSearchResults] = useState<any[]>([]);
  
  const [formData, setFormData] = useState({
    businessType: '',
    businessName: '',
    painPoints: [] as string[],
    solutions: [] as string[],
    style: '',
    phone: '',
    email: '',
    address: '',
    logoUrl: '',
    imageUrls: '',
    primaryColor: '',
  });

  const categories = [...new Set(businessCatalog.map(b => b.category))];
  const selectedBusiness = businessCatalog.find(b => b.type === formData.businessType);
  
  const getPainOptions = () => {
    const painMap: Record<string, {id: string, label: string}[]> = {
      'RESTAURANT': [
        { id: 'delivery', label: 'Delivery ineficiente' },
        { id: 'menu', label: 'Cardápio difícil' },
        { id: 'reservation', label: 'Reservas complicadas' },
      ],
      'BARBERSHOP': [
        { id: 'booking', label: 'Agendamento confuso' },
        { id: 'visibility', label: 'Pouca visibilidade' },
        { id: 'old_design', label: 'Site antigo' },
      ],
      'SALON': [
        { id: 'booking', label: 'Agendamento falho' },
        { id: 'portfolio', label: 'Portfólio ruim' },
        { id: 'pricing', label: 'Preços não visíveis' },
      ],
      'default': [
        { id: 'visibility', label: 'Pouca visibilidade online' },
        { id: 'old_design', label: 'Site antigo/feio' },
        { id: 'mobile_issues', label: 'Não funciona no celular' },
        { id: 'no_sales', label: 'Não gera vendas' },
      ],
    };
    const cat = selectedBusiness?.category?.toLowerCase() || 'default';
    return (painMap[formData.businessType] || painMap['default']);
  };

  const solutionOptions = [
    { id: 'modern-site', label: 'Site Moderno Premium', description: 'Design de $10K+ com animações', icon: '🎨' },
    { id: 'booking-system', label: 'Sistema de Agendamento', description: 'Agenda online integrada', icon: '📅' },
    { id: 'ecommerce', label: 'Loja Virtual', description: 'Venda produtos e serviços', icon: '🛒' },
    { id: 'seo-optimization', label: 'SEO Otimizado', description: 'Apareça no Google', icon: '🔍' },
    { id: 'analytics', label: 'Analytics Dashboard', description: 'Relatórios de performance', icon: '📊' },
    { id: 'ai-chatbot', label: 'Chatbot IA', description: 'Atendimento 24/7', icon: '🤖' },
    { id: 'whatsapp', label: 'WhatsApp Business', description: 'Integração direta', icon: '💬' },
    { id: 'loyalty', label: 'Programa de Fidelidade', description: 'Pontos e recompensas', icon: '🎁' },
  ];

  const styleOptions = [
    { style: 'MODERN', label: 'Moderno Limpo', description: 'Linhas limpas, tipografia moderna' },
    { style: 'BOLD', label: 'Ousado Vibrante', description: 'Cores vibrantes, design impactante' },
    { style: 'MINIMAL', label: 'Minimalista', description: 'Foco no essencial, simplicidade' },
    { style: 'LUXURY', label: 'Luxo Premium', description: 'Gold accents, dark theme, premium' },
  ];

  const togglePain = (id: string) => {
    setFormData(prev => ({
      ...prev,
      painPoints: prev.painPoints.includes(id) 
        ? prev.painPoints.filter(p => p !== id)
        : [...prev.painPoints, id]
    }));
  };

  const toggleSolution = (id: string) => {
    setFormData(prev => ({
      ...prev,
      solutions: prev.solutions.includes(id)
        ? prev.solutions.filter(s => s !== id)
        : [...prev.solutions, id]
    }));
  };

  const handleSubmit = async () => {
    if (!formData.businessType || !formData.businessName || formData.solutions.length === 0 || !formData.style) {
      alert('Preencha: Nicho, Nome, Estilo e pelo menos 1 solução!');
      return;
    }
    
    setLoading(true);
    setShowProgress(true);
    setProgressStep(0);
    
    const anims = getAnimationsForNiche(formData.businessType);
    const comps = getComponentsForNiche(formData.businessType);
    const logoInsp = generateLogoInspiration(formData.businessType);
    
    // Step 0: Real-time research (YouTube + Web)
    setProgressStep(0);
    
    let researchData = null;
    try {
      const researchRes = await fetch('/api/research', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          niche: selectedBusiness?.category,
          businessType: formData.businessType,
          businessName: formData.businessName
        }),
      });
      if (researchRes.ok) {
        researchData = await researchRes.json();
        setYoutubeResults(researchData.results?.youtube || []);
        setWebSearchResults(researchData.results?.web || []);
        console.log('[Submit] Research completed:', researchData);
      }
    } catch (researchError) {
      console.error('[Submit] Research failed (non-fatal):', researchError);
    }
    
    const visualSuggestions = [
      { step: 0, icon: '🔍', title: 'Pesquisa em tempo real', desc: `YouTube + Web: ${formData.businessType} 2026` },
      { step: 1, icon: '🎨', title: 'Analisando estilo', desc: `Aplicando ${formData.style} baseado no World Class Design System` },
      { step: 2, icon: '✨', title: 'Carregando animações', desc: `${anims.length} animações GSAP` },
      { step: 3, icon: '🧩', title: 'Preparando componentes', desc: `${comps.length} componentes 21dev` },
      { step: 4, icon: '🎯', title: 'Logo inspiration', desc: `UXShowcase: ${logoInsp.substring(0, 60)}...` },
      { step: 5, icon: '🤖', title: 'IA processando', desc: 'Usando templates premium $10K+ do Dribbble/Landbook + pesquisa' },
      { step: 6, icon: '🚀', title: 'Site quase pronto', desc: 'Finalizando...' },
    ];
    
    setSuggestions(visualSuggestions);
    
    try {
      const progressInterval = setInterval(() => {
        setProgressStep(prev => {
          if (prev >= 6) { clearInterval(progressInterval); return 6; }
          return prev + 1;
        });
      }, 800);
      
      const response = await fetch('/api/sites/ultimate-create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          businessName: formData.businessName,
          businessType: formData.businessType,
          painPoints: formData.painPoints,
          solutions: formData.solutions,
          style: formData.style,
          phone: formData.phone,
          email: formData.email,
          address: formData.address,
          brandAssets: {
            logoUrl: formData.logoUrl,
            imageUrls: formData.imageUrls.split(',').map((url: string) => url.trim()).filter(Boolean),
            primaryColor: formData.primaryColor,
          },
          researchData // Pass research results to API
        }),
      });
      
      clearInterval(progressInterval);
      setProgressStep(6);
      
      const data = await response.json();
      
      if (!response.ok) {
        alert(data.error || 'Erro ao criar site');
        setLoading(false);
        setShowProgress(false);
        return;
      }
      
      if (data.rufloSwarm) {
        setRufloData(data.rufloSwarm);
      }
      
      if (data.upgrade) {
        const wantsUpgrade = window.confirm('Limite do plano gratis atingido! Deseja fazer o upgrade para o Plano Premium?');
        if (wantsUpgrade) {
          try {
            const checkoutRes = await fetch('/api/checkout', { method: 'POST' });
            const checkoutData = await checkoutRes.json();
            if (checkoutData.url) {
              window.location.href = checkoutData.url;
            }
          } catch (e) {
            console.error(e);
          }
        }
        setLoading(false);
        setShowProgress(false);
        return;
      }
      
      setTimeout(() => {
        router.push(data.previewUrl || `/sites/${data.site?.slug}`);
      }, 1000);
      
    } catch (error) {
      console.error('Error:', error);
      alert('Erro ao criar site');
      setLoading(false);
      setShowProgress(false);
    }
  };

  return (
    <main style={{
      backgroundColor: colors.bg,
      minHeight: '100vh',
      color: colors.text,
      overflowX: 'hidden',
      position: 'relative',
    }}>
      {/* Mesh Gradients */}
      <div style={{
        position: 'fixed',
        inset: 0,
        overflow: 'hidden',
        pointerEvents: 'none',
        zIndex: 0,
      }}>
        <div style={{
          position: 'absolute',
          top: '10%',
          left: '10%',
          width: '600px',
          height: '600px',
          background: 'radial-gradient(circle, rgba(168, 85, 247, 0.15), transparent 50%)',
          borderRadius: '50%',
          filter: 'blur(60px)',
        }} />
        <div style={{
          position: 'absolute',
          top: '40%',
          right: '5%',
          width: '500px',
          height: '500px',
          background: 'radial-gradient(circle, rgba(99, 102, 241, 0.12), transparent 50%)',
          borderRadius: '50%',
          filter: 'blur(60px)',
        }} />
        <div style={{
          position: 'absolute',
          bottom: '20%',
          left: '30%',
          width: '400px',
          height: '400px',
          background: 'radial-gradient(circle, rgba(236, 72, 153, 0.1), transparent 50%)',
          borderRadius: '50%',
          filter: 'blur(60px)',
        }} />
      </div>

      {/* Header */}
      <header style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        background: 'rgba(3, 3, 8, 0.9)',
        backdropFilter: 'blur(20px)',
        borderBottom: `1px solid ${colors.border}`,
      }}>
        <div style={{
          maxWidth: '1400px',
          margin: '0 auto',
          padding: '0 2rem',
          height: '5rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', textDecoration: 'none' }}>
            <div style={{
              width: '2.75rem',
              height: '2.75rem',
              background: colors.gradient,
              borderRadius: '0.625rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 8px 24px rgba(168, 85, 247, 0.4)',
            }}>
              <span style={{ color: 'white', fontWeight: 900, fontSize: '1.25rem' }}>S</span>
            </div>
            <span style={{ fontWeight: 800, fontSize: '1.25rem', color: colors.text }}>SitesSaaS</span>
          </Link>
          <Link href="/sites" style={{ color: colors.textSecondary, textDecoration: 'none', fontSize: '0.9rem' }}>← Meus Sites</Link>
        </div>
      </header>

      {/* Main Content */}
      <div style={{
        position: 'relative',
        zIndex: 1,
        paddingTop: '100px',
        paddingBottom: '100px',
        maxWidth: '1200px',
        margin: '0 auto',
        paddingLeft: '2rem',
        paddingRight: '2rem',
      }}>
        
        {/* Title */}
        <div style={{
          textAlign: 'center',
          marginBottom: '3rem',
        }}>
          <h1 style={{
            fontSize: 'clamp(2rem, 5vw, 3.5rem)',
            fontWeight: 900,
            marginBottom: '0.75rem',
            background: colors.gradient,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            letterSpacing: '-0.03em',
          }}>
            Crie site premium para seu cliente
          </h1>
          <p style={{ color: colors.textSecondary, fontSize: '1.1rem' }}>O sistema criará tudo automaticamente usando IA.</p>
          
          <div style={{
            display: 'inline-flex',
            background: 'rgba(168, 85, 247, 0.1)',
            border: '1px solid rgba(168, 85, 247, 0.2)',
            borderRadius: '9999px',
            padding: '0.5rem 1.25rem',
            marginTop: '1.5rem',
            color: colors.primary,
            fontSize: '0.875rem',
            fontWeight: 600,
          }}>
            <span style={{
              width: '6px',
              height: '6px',
              background: colors.primary,
              borderRadius: '50%',
              display: 'inline-block',
              marginRight: '0.5rem',
              boxShadow: `0 0 12px ${colors.primaryGlow}`,
            }} />
            MODO PREMIUM 2026
          </div>
        </div>
        
        {/* Stepper */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '1rem',
          marginBottom: '3rem',
        }}>
          {[1, 2, 3].map((s) => (
            <div key={s} onClick={() => !showProgress && setStep(s)} style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              background: step === s ? colors.gradient : 'rgba(255, 255, 255, 0.1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 700,
              cursor: showProgress ? 'default' : 'pointer',
              color: step === s ? 'white' : colors.textMuted,
              border: step === s ? 'none' : '2px solid rgba(255,255,255,0.1)',
              transition: 'all 0.3s ease',
            }}>
              {s}
            </div>
          ))}
        </div>

        {/* Progress Panel */}
        {showProgress && (
          <div style={{
            background: 'rgba(10, 10, 18, 0.95)',
            borderRadius: '20px',
            padding: '2.5rem',
            border: `1px solid ${colors.border}`,
            marginBottom: '2rem',
            backdropFilter: 'blur(10px)',
          }}>
            <h2 style={{
              fontSize: '1.8rem',
              fontWeight: 700,
              marginBottom: '0.5rem',
              color: colors.primary,
            }}>🤖 IA trabalhando nos bastidores</h2>
            <p style={{ color: colors.textSecondary, marginBottom: '2rem' }}>
              Usando memória completa: animations.ts, 21dev-components.ts, client-finder.ts, uxshowcase-logos.ts
            </p>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {suggestions.map((sug, idx) => (
                <ProgressStep
                  key={idx}
                  icon={sug.icon}
                  title={sug.title}
                  desc={sug.desc}
                  active={progressStep === sug.step}
                  completed={progressStep > sug.step}
                />
              ))}
            </div>

            {/* Ruflo Agents Panel */}
            {rufloData && rufloData.agents && rufloData.agents.length > 0 && (
              <div style={{
                marginTop: '2rem',
                padding: '1.5rem',
                background: 'rgba(99, 102, 241, 0.08)',
                borderRadius: '12px',
                border: '1px solid rgba(99, 102, 241, 0.3)',
              }}>
                <h3 style={{
                  fontSize: '1.2rem',
                  fontWeight: 700,
                  color: '#a5b4fc',
                  marginBottom: '1rem',
                }}>🤖 Agentes Ruflo Trabalhando</h3>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
                  {rufloData.agents.map((agent: any, idx: number) => (
                    <div key={idx} style={{
                      padding: '0.75rem 1rem',
                      background: agent.status === 'completed' ? 'rgba(52,211,153,0.15)' : 
                                agent.status === 'error' ? 'rgba(248,113,113,0.15)' : 
                                'rgba(255,255,255,0.05)',
                      borderRadius: '8px',
                      border: `1px solid ${agent.status === 'completed' ? 'rgba(52,211,153,0.4)' : 
                                       agent.status === 'error' ? 'rgba(248,113,113,0.4)' : 
                                       'rgba(255,255,255,0.1)'}`,
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                    }}>
                      <span style={{ fontSize: '1.2rem' }}>
                        {agent.type === 'researcher' ? '🔍' : 
                         agent.type === 'coder' ? '💻' : 
                         agent.type === 'reviewer' ? '👀' : 
                         agent.type === 'tester' ? '🧪' : 
                         agent.type === 'coordinator' ? '🎯' : '🤖'}
                      </span>
                      <div>
                        <div style={{ fontSize: '0.85rem', fontWeight: 600, color: 'white' }}>{agent.name}</div>
                        <div style={{ fontSize: '0.75rem', color: colors.textMuted }}>
                          {agent.type} - {agent.status === 'completed' ? '✓ Pronto' : 
                           agent.status === 'error' ? '✗ Erro' : '⏳ Trabalhando...'}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Step 1: Nicho e Nome */}
        {!showProgress && step === 1 && (
          <div style={{
            background: 'rgba(10, 10, 18, 0.6)',
            borderRadius: '20px',
            padding: '2.5rem',
            border: `1px solid ${colors.border}`,
          }}>
            <h2 style={{ fontSize: '1.8rem', fontWeight: 700, marginBottom: '0.5rem' }}>1. Nicho e Informações Básicas</h2>
            <p style={{ color: colors.textSecondary, marginBottom: '2rem' }}>Selecione o tipo de negócio e informe os dados.</p>
            
            {/* Business Type */}
            <div style={{ marginBottom: '2rem' }}>
              <label style={{ display: 'block', marginBottom: '0.75rem', fontWeight: 600, fontSize: '1.1rem' }}>Tipo de Negócio *</label>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '0.75rem' }}>
                {categories.map(cat => (
                  <div key={cat}>
                    <h3 style={{ fontSize: '0.9rem', color: colors.textMuted, marginBottom: '0.5rem', textTransform: 'uppercase' }}>{cat}</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                      {businessCatalog.filter(b => b.category === cat).map(b => (
                        <div key={b.type} onClick={() => setFormData(prev => ({ ...prev, businessType: b.type }))} style={{
                          padding: '0.75rem 1rem',
                          background: formData.businessType === b.type ? 'rgba(168, 85, 247, 0.2)' : 'rgba(255, 255, 255, 0.05)',
                          border: formData.businessType === b.type ? '2px solid #A855F7' : '1px solid rgba(255,255,255,0.1)',
                          borderRadius: '10px',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.75rem',
                          transition: 'all 0.2s ease',
                        }}>
                          <span style={{ fontSize: '1.5rem' }}>{b.icon}</span>
                          <span style={{ fontWeight: 600 }}>{b.label}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Business Name */}
            <div style={{ marginBottom: '2rem' }}>
              <label style={{ display: 'block', marginBottom: '0.75rem', fontWeight: 600, fontSize: '1.1rem' }}>Nome do Negócio *</label>
              <input
                type="text"
                value={formData.businessName}
                onChange={e => setFormData(prev => ({ ...prev, businessName: e.target.value }))}
                placeholder="Ex: Pizzaria do Mario"
                style={{
                  width: '100%',
                  padding: '1rem',
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '2px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '10px',
                  color: 'white',
                  fontSize: '1rem',
                }}
              />
            </div>

            {/* Contact Info */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: '1rem',
              marginBottom: '2rem',
            }}>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Telefone</label>
                <input
                  type="text"
                  value={formData.phone}
                  onChange={e => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                  placeholder="(11) 99999-9999"
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '2px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '8px',
                    color: 'white',
                  }}
                />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>E-mail</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={e => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  placeholder="contato@exemplo.com"
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '2px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '8px',
                    color: 'white',
                  }}
                />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Endereço</label>
                <input
                  type="text"
                  value={formData.address}
                  onChange={e => setFormData(prev => ({ ...prev, address: e.target.value }))}
                  placeholder="Rua Exemplo, 123"
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '2px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '8px',
                    color: 'white',
                  }}
                />
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <button
                onClick={() => setStep(2)}
                style={{
                  padding: '0.75rem 2rem',
                  background: colors.gradient,
                  color: 'white',
                  border: 'none',
                  borderRadius: '10px',
                  fontWeight: 600,
                  fontSize: '1rem',
                  cursor: 'pointer',
                  boxShadow: '0 8px 32px rgba(168, 85, 247, 0.4)',
                  transition: 'all 0.3s ease',
                }}
              >
                Avançar →
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Dores e Soluções */}
        {!showProgress && step === 2 && (
          <div style={{
            background: 'rgba(10, 10, 18, 0.6)',
            borderRadius: '20px',
            padding: '2.5rem',
            border: `1px solid ${colors.border}`,
          }}>
            <h2 style={{ fontSize: '1.8rem', fontWeight: 700, marginBottom: '0.5rem' }}>2. Dores e Soluções</h2>
            <p style={{ color: colors.textSecondary, marginBottom: '2rem' }}>Selecione as dores do cliente e as soluções que o site trará.</p>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
              {/* Pain Points */}
              <div>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 600, marginBottom: '1rem', color: '#f87171' }}>🔴 Dores do Cliente</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  {getPainOptions().map(p => (
                    <div key={p.id} onClick={() => togglePain(p.id)} style={{
                      padding: '0.75rem 1rem',
                      background: formData.painPoints.includes(p.id) ? 'rgba(248, 113, 113, 0.2)' : 'rgba(255, 255, 255, 0.05)',
                      border: formData.painPoints.includes(p.id) ? '2px solid #f87171' : '2px solid rgba(255,255,255,0.1)',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.75rem',
                    }}>
                      <div style={{
                        width: '20px',
                        height: '20px',
                        borderRadius: '4px',
                        background: formData.painPoints.includes(p.id) ? '#f87171' : 'transparent',
                        border: '2px solid #f87171',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                        {formData.painPoints.includes(p.id) && <span style={{ color: 'white', fontSize: '0.75rem' }}>✓</span>}
                      </div>
                      <span>{p.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Solutions */}
              <div>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 600, marginBottom: '1rem', color: '#34d399' }}>🟢 Soluções * (pelo menos 1)</h3>
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.5rem',
                  maxHeight: '400px',
                  overflowY: 'auto',
                  paddingRight: '0.5rem',
                }}>
                  {solutionOptions.map(s => (
                    <div key={s.id} onClick={() => toggleSolution(s.id)} style={{
                      padding: '0.75rem 1rem',
                      background: formData.solutions.includes(s.id) ? 'rgba(52, 211, 153, 0.2)' : 'rgba(255, 255, 255, 0.05)',
                      border: formData.solutions.includes(s.id) ? '2px solid #34d399' : '2px solid rgba(255,255,255,0.1)',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.75rem',
                    }}>
                      <div style={{
                        width: '20px',
                        height: '20px',
                        borderRadius: '4px',
                        background: formData.solutions.includes(s.id) ? '#34d399' : 'transparent',
                        border: '2px solid #34d399',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                        {formData.solutions.includes(s.id) && <span style={{ color: 'white', fontSize: '0.75rem' }}>✓</span>}
                      </div>
                      <span style={{ fontSize: '1.5rem' }}>{s.icon}</span>
                      <div>
                        <div style={{ fontWeight: 600 }}>{s.label}</div>
                        <div style={{ fontSize: '0.85rem', color: colors.textSecondary }}>{s.description}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '2rem' }}>
              <button
                onClick={() => setStep(1)}
                style={{
                  padding: '0.75rem 2rem',
                  background: 'rgba(255, 255, 255, 0.1)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '10px',
                  fontWeight: 600,
                  cursor: 'pointer',
                }}
              >
                ← Voltar
              </button>
              <button
                onClick={() => setStep(3)}
                style={{
                  padding: '0.75rem 2rem',
                  background: colors.gradient,
                  color: 'white',
                  border: 'none',
                  borderRadius: '10px',
                  fontWeight: 600,
                  fontSize: '1rem',
                  cursor: 'pointer',
                  boxShadow: '0 8px 32px rgba(168, 85, 247, 0.4)',
                  transition: 'all 0.3s ease',
                }}
              >
                Avançar →
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Estilo e Assets */}
        {!showProgress && step === 3 && (
          <div style={{
            background: 'rgba(10, 10, 18, 0.6)',
            borderRadius: '20px',
            padding: '2.5rem',
            border: `1px solid ${colors.border}`,
          }}>
            <h2 style={{ fontSize: '1.8rem', fontWeight: 700, marginBottom: '0.5rem' }}>3. Estilo e Assets da Marca</h2>
            <p style={{ color: colors.textSecondary, marginBottom: '2rem' }}>Escolha o estilo visual e adicione assets da marca.</p>
            
            {/* Style Selection */}
            <div style={{ marginBottom: '2rem' }}>
              <label style={{ display: 'block', marginBottom: '0.75rem', fontWeight: 600, fontSize: '1.1rem' }}>Estilo do Site *</label>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '1rem' }}>
                {styleOptions.map(s => (
                  <div key={s.style} onClick={() => setFormData(prev => ({ ...prev, style: s.style }))} style={{
                    borderRadius: '12px',
                    overflow: 'hidden',
                    border: formData.style === s.style ? '3px solid #A855F7' : '2px solid rgba(255,255,255,0.1)',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    background: 'rgba(255, 255, 255, 0.05)',
                  }}>
                    <div style={{ height: '150px', background: 'linear-gradient(135deg, rgba(168,85,247,0.2), rgba(99,102,241,0.2))' }} />
                    <div style={{ padding: '1rem' }}>
                      <h3 style={{ fontWeight: 700, marginBottom: '0.25rem' }}>{s.label}</h3>
                      <p style={{ color: colors.textSecondary, fontSize: '0.85rem' }}>{s.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Brand Assets */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: '1rem',
              marginBottom: '2rem',
            }}>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>URL do Logo</label>
                <input
                  type="text"
                  value={formData.logoUrl}
                  onChange={e => setFormData(prev => ({ ...prev, logoUrl: e.target.value }))}
                  placeholder="https://exemplo.com/logo.png"
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '2px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '8px',
                    color: 'white',
                  }}
                />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>URLs de Imagens (separadas por vírgula)</label>
                <textarea
                  value={formData.imageUrls}
                  onChange={e => setFormData(prev => ({ ...prev, imageUrls: e.target.value }))}
                  placeholder="https://exemplo.com/img1.jpg, https://exemplo.com/img2.jpg"
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '2px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '8px',
                    color: 'white',
                    minHeight: '80px',
                    resize: 'vertical',
                  }}
                />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Cor Primária (hex)</label>
                <input
                  type="text"
                  value={formData.primaryColor}
                  onChange={e => setFormData(prev => ({ ...prev, primaryColor: e.target.value }))}
                  placeholder="#4f46e5"
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '2px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '8px',
                    color: 'white',
                  }}
                />
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <button
                onClick={() => setStep(2)}
                style={{
                  padding: '0.75rem 2rem',
                  background: 'rgba(255, 255, 255, 0.1)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '10px',
                  fontWeight: 600,
                  cursor: 'pointer',
                }}
              >
                ← Voltar
              </button>
              <button
                onClick={handleSubmit}
                disabled={loading}
                style={{
                  padding: '0.75rem 2rem',
                  background: loading ? 'rgba(255,255,255,0.1)' : colors.gradient,
                  color: 'white',
                  border: 'none',
                  borderRadius: '10px',
                  fontWeight: 600,
                  fontSize: '1rem',
                  cursor: loading ? 'not-allowed' : 'pointer',
                  boxShadow: loading ? 'none' : '0 8px 32px rgba(168, 85, 247, 0.4)',
                  transition: 'all 0.3s ease',
                }}
              >
                {loading ? 'Criando...' : 'Criar Site Agora 🚀'}
              </button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
