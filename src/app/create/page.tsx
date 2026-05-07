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

// ELITE THEME CONFIG
const colors = {
  bg: '#030308',
  bgSecondary: '#0A0A12',
  text: '#FAFAFA',
  textMuted: '#71717A',
  primary: '#A855F7',
  secondary: '#6366F1',
  accent: '#EC4899',
  border: 'rgba(255, 255, 255, 0.06)',
  gradient: 'linear-gradient(135deg, #A855F7 0%, #6366F1 50%, #EC4899 100%)',
};

// ELITE COMPONENTS
function NoiseOverlay() {
  return <div className="noise-overlay" />;
}

function MagneticButton({ children, primary = false, onClick, disabled }: { children: React.ReactNode; primary?: boolean; onClick?: () => void; disabled?: boolean }) {
  const buttonRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const el = buttonRef.current;
    if (!el || disabled) return;

    const onMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { left, top, width, height } = el.getBoundingClientRect();
      const x = clientX - (left + width / 2);
      const y = clientY - (top + height / 2);
      gsap.to(el, { x: x * 0.2, y: y * 0.2, duration: 0.3, ease: 'power2.out' });
    };

    const onMouseLeave = () => {
      gsap.to(el, { x: 0, y: 0, duration: 0.5, ease: 'elastic.out(1, 0.3)' });
    };

    el.addEventListener('mousemove', onMouseMove);
    el.addEventListener('mouseleave', onMouseLeave);
    return () => {
      el.removeEventListener('mousemove', onMouseMove);
      el.removeEventListener('mouseleave', onMouseLeave);
    };
  }, [disabled]);

  return (
    <div 
      ref={buttonRef} 
      onClick={disabled ? undefined : onClick}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.75rem',
        padding: '0.75rem 2rem',
        background: primary ? colors.gradient : 'transparent',
        border: primary ? 'none' : `1px solid ${colors.border}`,
        borderRadius: '0.875rem',
        color: '#FAFAFA',
        fontSize: '0.9375rem',
        fontWeight: 600,
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.5 : 1,
        transition: 'box-shadow 0.3s ease',
        boxShadow: primary && !disabled ? '0 12px 24px -8px rgba(168, 85, 247, 0.5)' : 'none',
      }}
    >
      {children}
    </div>
  );
}

function EliteCard({ children, selected = false, onClick, delay = 0 }: { children: React.ReactNode; selected?: boolean; onClick?: () => void; delay?: number }) {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.from(cardRef.current, {
      opacity: 0,
      y: 20,
      duration: 0.8,
      delay,
      ease: 'power3.out',
    });
  }, [delay]);

  return (
    <div
      ref={cardRef}
      onClick={onClick}
      style={{
        background: selected ? 'rgba(168, 85, 247, 0.08)' : 'rgba(10, 10, 18, 0.6)',
        border: `1px solid ${selected ? colors.primary : colors.border}`,
        borderRadius: '1.25rem',
        padding: '1.5rem',
        backdropFilter: 'blur(30px)',
        cursor: onClick ? 'pointer' : 'default',
        transition: 'all 0.3s ease',
        position: 'relative',
        overflow: 'hidden',
        boxShadow: selected ? '0 15px 30px -10px rgba(168, 85, 247, 0.2)' : 'none',
      }}
    >
      {selected && (
        <div style={{
          position: 'absolute',
          top: 0, right: 0,
          width: '100px', height: '100px',
          background: 'radial-gradient(circle at top right, rgba(168, 85, 247, 0.2), transparent 70%)',
          pointerEvents: 'none',
        }} />
      )}
      {children}
    </div>
  );
}

function ProgressIndicator({ icon, title, desc, active, completed }: { icon: string; title: string; desc: string; active?: boolean; completed?: boolean }) {
  return (
    <div style={{
      padding: '1.25rem',
      background: active ? 'rgba(168, 85, 247, 0.08)' : 'rgba(255, 255, 255, 0.02)',
      border: `1px solid ${completed ? '#10B981' : active ? colors.primary : colors.border}`,
      borderRadius: '1rem',
      display: 'flex',
      alignItems: 'center',
      gap: '1.25rem',
      transition: 'all 0.4s ease',
      opacity: active || completed ? 1 : 0.4,
    }}>
      <div style={{
        width: '3rem',
        height: '3rem',
        borderRadius: '0.75rem',
        background: completed ? 'rgba(16, 185, 129, 0.1)' : active ? 'rgba(168, 85, 247, 0.1)' : 'rgba(255,255,255,0.05)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '1.5rem',
      }}>
        {completed ? '✓' : icon}
      </div>
      <div>
        <div style={{ fontWeight: 700, color: completed ? '#10B981' : active ? colors.text : colors.textMuted, fontSize: '1rem' }}>{title}</div>
        <div style={{ fontSize: '0.8rem', color: colors.textMuted, marginTop: '0.15rem' }}>{desc}</div>
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
  // Alimentação
  { type: 'RESTAURANT', label: 'Restaurante', icon: '🍽️', category: 'Alimentação' },
  { type: 'BAKERY', label: 'Padaria', icon: '🍞', category: 'Alimentação' },
  { type: 'PIZZA', label: 'Pizzaria', icon: '🍕', category: 'Alimentação' },
  { type: 'COFFEE', label: 'Cafeteria', icon: '☕', category: 'Alimentação' },
  
  // Beleza & Fitness
  { type: 'BARBERSHOP', label: 'Barbearia', icon: '✂️', category: 'Beleza' },
  { type: 'SALON', label: 'Salão de Beleza', icon: '💇', category: 'Beleza' },
  { type: 'GYM', label: 'Academia', icon: '💪', category: 'Fitness' },
  { type: 'SPA', label: 'Spa/Wellness', icon: '💆', category: 'Beleza' },
  
  // Saúde
  { type: 'CLINIC', label: 'Clínica', icon: '🏥', category: 'Saúde' },
  { type: 'DENTAL', label: 'Consultório Dentário', icon: '🦷', category: 'Saúde' },
  { type: 'PHARMACY', label: 'Farmácia', icon: '💊', category: 'Saúde' },
  { type: 'VETERINARY', label: 'Veterinária', icon: '🐾', category: 'Saúde' },
  
  // Serviços
  { type: 'TECH', label: 'Tecnologia', icon: '💻', category: 'Tecnologia' },
  { type: 'LAW_FIRM', label: 'Escritório de Advocacia', icon: '⚖️', category: 'Serviços Jurídicos' },
  { type: 'CONSULTANT', label: 'Consultoria', icon: '💼', category: 'Serviços' },
  { type: 'CLEANING', label: 'Serviços de Limpeza', icon: '🧹', category: 'Serviços' },
  { type: 'CONSTRUCTION', label: 'Construção Civil', icon: '🏗️', category: 'Construção' },
  { type: 'AUTO_REPAIR', label: 'Oficina Mecânica', icon: '🔧', category: 'Automotivo' },
  
  // Varejo & E-commerce
  { type: 'RETAIL', label: 'Loja Física', icon: '🛒', category: 'Varejo' },
  { type: 'ECOMMERCE', label: 'Loja Virtual', icon: '🛍️', category: 'Varejo' },
  { type: 'FLORIST', label: 'Floricultura', icon: '💐', category: 'Varejo' },
  { type: 'PET_SHOP', label: 'Pet Shop', icon: '🐕', category: 'Pets' },
  
  // Lazer & Hospitalidade
  { type: 'HOTEL', label: 'Hotel', icon: '🏨', category: 'Lazer' },
  { type: 'TRAVEL', label: 'Agência de Viagens', icon: '✈️', category: 'Lazer' },
  { type: 'EVENT', label: 'Eventos/Produção', icon: '🎉', category: 'Lazer' },
  
  // Imobiliário & Educação
  { type: 'REAL_ESTATE', label: 'Imobiliária', icon: '🏠', category: 'Imobiliária' },
  { type: 'SCHOOL', label: 'Escola/Cursos', icon: '🏫', category: 'Educação' },
  { type: 'COWORKING', label: 'Espaço de Coworking', icon: '🏢', category: 'Serviços' },
  
  // Transporte & Logística
  { type: 'TRANSPORT', label: 'Transportadora', icon: '🚛', category: 'Transporte' },
  { type: 'MOVING', label: 'Mudanças', icon: '📦', category: 'Transporte' },
  { type: 'DELIVERY', label: 'Serviço de Entrega', icon: '🛵', category: 'Transporte' },
  
  // Alimentação (expandido)
  { type: 'VEGAN', label: 'Restaurante Vegano', icon: '🥗', category: 'Alimentação' },
  { type: 'FOOD_TRUCK', label: 'Food Truck', icon: '🚚', category: 'Alimentação' },
  { type: 'BUTCHER', label: 'Açougue', icon: '🥩', category: 'Alimentação' },
  { type: 'GROCERY', label: 'Mercearia', icon: '🏪', category: 'Alimentação' },
  
  // Beleza & Estética (expandido)
  { type: 'NAIL_SALON', label: 'Esmalteria/Manicure', icon: '💅', category: 'Beleza' },
  { type: 'TATTOO', label: 'Studio de Tatuagem', icon: '🎨', category: 'Beleza' },
  { type: 'BARBER', label: 'Barbearia Masculina', icon: '💈', category: 'Beleza' },
  
  // Serviços Financeiros & Marketing
  { type: 'FINANCIAL', label: 'Consultoria Financeira', icon: '💰', category: 'Finanças' },
  { type: 'MARKETING', label: 'Agência de Marketing', icon: '📈', category: 'Marketing' },
  { type: 'SEO_AGENCY', label: 'SEO & Tráfego', icon: '🔍', category: 'Marketing' },
  
  // Saúde (expandido)
  { type: 'PHYSIOTHERAPY', label: 'Fisioterapia', icon: '🦽', category: 'Saúde' },
  { type: 'PSYCHOLOGY', label: 'Psicologia', icon: '🧠', category: 'Saúde' },
  { type: 'NUTRITION', label: 'Nutricionista', icon: '🥗', category: 'Saúde' },
  
  // Lazer & Entretenimento
  { type: 'GYMNASIUM', label: 'Academia (Grande)', icon: '🏋️', category: 'Fitness' },
  { type: 'PLAYGROUND', label: 'Playground/Espaço Kids', icon: '🎠', category: 'Lazer' },
  { type: 'CINEMA', label: 'Cinema', icon: '🎬', category: 'Lazer' },
  
  // Tecnologia (expandido)
  { type: 'SOFTWARE', label: 'Desenvolvimento de Software', icon: '💻', category: 'Tecnologia' },
  { type: 'CYBERSECURITY', label: 'Cibersegurança', icon: '🔒', category: 'Tecnologia' },
  { type: 'DATA_SCIENCE', label: 'Ciência de Dados', icon: '📊', category: 'Tecnologia' },
  { type: 'AI_AGENCY', label: 'Agência de IA', icon: '🤖', category: 'Tecnologia' },
  
  // Saúde (expandido)
  { type: 'HOSPITAL', label: 'Hospital', icon: '🏥', category: 'Saúde' },
  { type: 'LAB', label: 'Laboratório', icon: '🔬', category: 'Saúde' },
  { type: 'PHYSIO', label: 'Fisioterapia', icon: '🦾', category: 'Saúde' },
  
  // Alimentação (expandido)
  { type: 'BAKERY_CAFE', label: 'Café e Padaria', icon: '☕', category: 'Alimentação' },
  { type: 'ICE_CREAM', label: 'Sorveteria', icon: '🍦', category: 'Alimentação' },
  { type: 'JUICE', label: 'Loja de Sucos', icon: '🧃', category: 'Alimentação' },
  
  // Lazer & Entretenimento
  { type: 'THRATRE', label: 'Teatro', icon: '🎭', category: 'Lazer' },
  { type: 'MUSIC_SCHOOL', label: 'Escola de Música', icon: '🎵', category: 'Lazer' },
  { type: 'ART_STUDIO', label: 'Estúdio de Arte', icon: '🎨', category: 'Lazer' },
  
  // Serviços Financeiros
  { type: 'INSURANCE', label: 'Corretora de Seguros', icon: '🛡️', category: 'Finanças' },
  { type: 'ACCOUNTING', label: 'Contabilidade', icon: '🧮', category: 'Finanças' },
  
  // Imobiliário (expandido)
  { type: 'REAL_ESTATE_AGENCY', label: 'Corretora de Imóveis', icon: '🏢', category: 'Imobiliária' },
  { type: 'CONSTRUCTION', label: 'Construtora', icon: '🏗️', category: 'Construção' },
];

export default function CreateSitePage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [showProgress, setShowProgress] = useState(false);
  const [progressStep, setProgressStep] = useState(0);
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [rufloData, setRufloData] = useState<any>(null);
  
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

  const styleOptions = [
    { style: 'MODERN', label: 'Moderno & Clean', description: 'Linhas puras, tipografia geométrica' },
    { style: 'BOLD', label: 'Ousado & Vibrante', description: 'Cores fortes, design de alto impacto' },
    { style: 'MINIMAL', label: 'Minimalista Elite', description: 'Foco total no conteúdo, luxo discreto' },
    { style: 'LUXURY', label: 'Luxo Atemporal', description: 'Preto e dourado, animações suaves' },
  ];

  const handleSubmit = async () => {
    if (!formData.businessType || !formData.businessName || formData.solutions.length === 0 || !formData.style) {
      alert('Preencha os campos obrigatórios!');
      return;
    }
    
    setLoading(true);
    setShowProgress(true);
    
    const visualSuggestions = [
      { step: 0, icon: '🔍', title: 'Intelligence Gathering', desc: 'Extraindo segredos de design do Dribbble e Landbook' },
      { step: 1, icon: '🎞️', title: 'Expert Synthesis', desc: 'Analisando tutoriais de elite do YouTube para este nicho' },
      { step: 2, icon: '🧠', title: 'Strategic Architecture', desc: 'Definindo a hierarquia visual de alta conversão' },
      { step: 3, icon: '🎨', title: 'Artistic Execution', desc: 'Orquestrando o Stitch para criar sua obra-prima' },
      { step: 4, icon: '✨', title: 'Cinematic Polish', desc: 'Injetando 3D Mesh e animações GSAP de luxo' },
      { step: 5, icon: '🚀', title: 'Deployment Ready', desc: 'Finalizando os últimos ajustes de performance' },
    ];
    
    setSuggestions(visualSuggestions);
    
    try {
      const progressInterval = setInterval(() => {
        setProgressStep(prev => {
          if (prev >= 5) { clearInterval(progressInterval); return 5; }
          return prev + 1;
        });
      }, 1200);
      
      const response = await fetch('/api/sites/ultimate-create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          brandAssets: {
            logoUrl: formData.logoUrl,
            imageUrls: formData.imageUrls.split(',').map(u => u.trim()).filter(Boolean),
            primaryColor: formData.primaryColor,
          }
        }),
      });
      
      const data = await response.json();
      
      // EXTRA STAGE: ELITE AUDIT (Fixes the "missing analysis" gap)
      setProgressStep(5);
      await new Promise(resolve => setTimeout(resolve, 2000)); // Artificial wait for "Cinematic Polish"
      
      // FINAL REDIRECT
      setTimeout(() => {
        router.push(`/sites/${data.site?.slug}`);
      }, 1000);
      
    } catch (error) {
      alert('Erro na geração. Tente novamente.');
      setLoading(false);
      setShowProgress(false);
    }
  };

  return (
    <main style={{ backgroundColor: colors.bg, minHeight: '100vh', position: 'relative', paddingBottom: '10rem' }}>
      <NoiseOverlay />
      
      {/* Background Orbs */}
      <div style={{ position: 'fixed', top: '10%', right: '10%', width: '30rem', height: '30rem', background: 'radial-gradient(circle, rgba(168, 85, 247, 0.1) 0%, transparent 70%)', filter: 'blur(100px)', zIndex: 0 }} />

      {/* Nav */}
      <nav style={{ padding: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', maxWidth: '1400px', marginInline: 'auto', position: 'relative', zIndex: 10 }}>
        <Link href="/" style={{ textDecoration: 'none', color: colors.text, fontWeight: 900, fontSize: '1.5rem', letterSpacing: '-0.02em' }}>EliteSaaS</Link>
        <Link href="/sites" style={{ textDecoration: 'none', color: colors.textMuted, fontSize: '0.875rem' }}>Meus Projetos</Link>
      </nav>

      <div style={{ maxWidth: '1000px', marginInline: 'auto', paddingInline: '2rem', paddingTop: '4rem', position: 'relative', zIndex: 1 }}>
        {!showProgress ? (
          <>
            <header style={{ textAlign: 'center', marginBottom: '5rem' }}>
              <div style={{ display: 'inline-block', padding: '0.4rem 1rem', background: 'rgba(168, 85, 247, 0.1)', borderRadius: '9999px', color: colors.primary, fontSize: '0.75rem', fontWeight: 800, letterSpacing: '0.1em', marginBottom: '1.5rem' }}>GERADOR ELITE</div>
              <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 900, letterSpacing: '-0.03em', marginBottom: '1rem' }}>Crie sua <span style={{ color: colors.primary }}>Obra-Prima</span></h1>
              <p style={{ color: colors.textMuted, fontSize: '1.1rem' }}>Preencha os detalhes e deixe nossos agentes cuidarem do resto.</p>
            </header>

            {/* Stepper Content */}
            {step === 1 && (
              <section style={{ display: 'grid', gap: '3rem' }}>
                <div>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '1.5rem' }}>Selecione o Nicho</h3>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '1rem' }}>
                    {businessCatalog.map(b => (
                      <EliteCard key={b.type} selected={formData.businessType === b.type} onClick={() => setFormData(p => ({ ...p, businessType: b.type }))}>
                        <div style={{ fontSize: '1.75rem', marginBottom: '0.5rem' }}>{b.icon}</div>
                        <div style={{ fontWeight: 700, fontSize: '0.9rem' }}>{b.label}</div>
                      </EliteCard>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '1rem' }}>Nome da Marca</h3>
                  <input 
                    type="text" 
                    placeholder="Ex: Aura Digital Agency" 
                    value={formData.businessName}
                    onChange={e => setFormData(p => ({ ...p, businessName: e.target.value }))}
                    style={{ width: '100%', padding: '1.25rem', background: 'rgba(255,255,255,0.03)', border: `1px solid ${colors.border}`, borderRadius: '1rem', color: 'white', fontSize: '1.1rem' }}
                  />
                </div>

                <div style={{ display: 'flex', justifyContent: 'center' }}>
                  <MagneticButton primary onClick={() => setStep(2)}>Próximo Passo</MagneticButton>
                </div>
              </section>
            )}

            {step === 2 && (
              <section style={{ display: 'grid', gap: '3rem' }}>
                <div>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '1.5rem' }}>Escolha o Estilo Visual</h3>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1.5rem' }}>
                    {styleOptions.map(opt => (
                      <EliteCard key={opt.style} selected={formData.style === opt.style} onClick={() => setFormData(p => ({ ...p, style: opt.style }))}>
                        <div style={{ fontWeight: 800, fontSize: '1.1rem', marginBottom: '0.5rem' }}>{opt.label}</div>
                        <div style={{ fontSize: '0.85rem', color: colors.textMuted }}>{opt.description}</div>
                      </EliteCard>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '1rem' }}>Recursos Necessários</h3>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
                    {['Booking', 'Ecommerce', 'Animations', 'SEO', 'Support'].map(f => (
                      <div 
                        key={f} 
                        onClick={() => setFormData(p => ({ ...p, solutions: p.solutions.includes(f) ? p.solutions.filter(x => x !== f) : [...p.solutions, f] }))}
                        style={{ padding: '0.6rem 1.5rem', borderRadius: '9999px', background: formData.solutions.includes(f) ? colors.primary : 'rgba(255,255,255,0.05)', border: `1px solid ${formData.solutions.includes(f) ? colors.primary : colors.border}`, cursor: 'pointer', transition: 'all 0.3s' }}
                      >
                        {f}
                      </div>
                    ))}
                  </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem' }}>
                  <MagneticButton onClick={() => setStep(1)}>Voltar</MagneticButton>
                  <MagneticButton primary onClick={handleSubmit}>Gerar Site Elite</MagneticButton>
                </div>
              </section>
            )}
          </>
        ) : (
          <section style={{ maxWidth: '600px', marginInline: 'auto' }}>
            <header style={{ textAlign: 'center', marginBottom: '4rem' }}>
              <div style={{ fontSize: '4rem', marginBottom: '1.5rem' }}>🧬</div>
              <h2 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '0.5rem' }}>Orquestrando Agentes</h2>
              <p style={{ color: colors.textMuted }}>O Ruflo Swarm está construindo sua visão.</p>
            </header>

            <div style={{ display: 'grid', gap: '1rem' }}>
              {suggestions.map((s, idx) => (
                <ProgressIndicator key={idx} icon={s.icon} title={s.title} desc={s.desc} active={progressStep === s.step} completed={progressStep > s.step} />
              ))}
            </div>

            {rufloData && (
              <div style={{ marginTop: '3rem', padding: '2rem', background: 'rgba(168, 85, 247, 0.05)', borderRadius: '1.5rem', border: `1px solid rgba(168, 85, 247, 0.2)` }}>
                <h4 style={{ fontWeight: 800, marginBottom: '1.5rem', fontSize: '0.9rem', letterSpacing: '0.1em', color: colors.primary }}>ATIVIDADE DO SWARM</h4>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem' }}>
                  {rufloData.agents.map((a: any, i: number) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: a.status === 'completed' ? '#10B981' : colors.primary }} />
                      <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>{a.name}</span>
                      <span style={{ fontSize: '0.7rem', color: colors.textMuted }}>({a.type})</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </section>
        )}
      </div>
    </main>
  );
}
