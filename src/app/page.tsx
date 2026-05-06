'use client';

import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

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

function AnimatedGradient({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const { ref, isVisible } = useInView();
  
  return (
    <div ref={ref} style={{
      opacity: isVisible ? 1 : 0,
      transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
      transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
      transitionDelay: `${delay}ms`,
    }}>
      {children}
    </div>
  );
}

function BentoCard({ children, delay = 0, colSpan = 1 }: { children: React.ReactNode; delay?: number; colSpan?: number }) {
  const { ref, isVisible } = useInView();
  const colors = getThemeColors('dark');
  const [hovered, setHovered] = useState(false);
  
  return (
    <div
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        gridColumn: `span ${colSpan}`,
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'scale(1)' : 'scale(0.95)',
        transition: 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
        transitionDelay: `${delay}ms`,
        background: hovered ? 'rgba(30, 30, 50, 0.8)' : colors.cardBg,
        border: hovered ? `1px solid ${colors.borderHover}` : `1px solid ${colors.cardBorder}`,
        borderRadius: '1.5rem',
        padding: '2.5rem',
        backdropFilter: 'blur(20px)',
        position: 'relative',
        overflow: 'hidden',
        boxShadow: hovered ? '0 25px 50px -12px rgba(168, 85, 247, 0.25)' : 'none',
      }}
    >
      {hovered && (
        <div style={{
          position: 'absolute',
          top: '-50%', right: '-50%',
          width: '200%', height: '200%',
          background: 'radial-gradient(circle, rgba(168, 85, 247, 0.12), transparent 60%)',
          pointerEvents: 'none',
        }} />
      )}
      {children}
    </div>
  );
}

function GlowButton({ children, primary = false, onClick, style }: { children: React.ReactNode; primary?: boolean; onClick?: () => void; style?: React.CSSProperties }) {
  const [hovered, setHovered] = useState(false);
  const colors = getThemeColors('dark');
  
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: primary 
          ? 'linear-gradient(135deg, #A855F7, #6366F1)' 
          : 'transparent',
        border: primary ? 'none' : `1px solid ${colors.border}`,
        color: '#FAFAFA',
        padding: '1rem 2rem',
        borderRadius: '0.875rem',
        fontSize: '1rem',
        fontWeight: 600,
        cursor: 'pointer',
        boxShadow: primary 
          ? (hovered 
              ? '0 20px 40px -10px rgba(168, 85, 247, 0.5)' 
              : '0 12px 28px -6px rgba(168, 85, 247, 0.4)')
          : 'none',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.5rem',
        ...style,
      }}
    >
      {children}
      {primary && (
        <span style={{ transform: hovered ? 'translateX(4px)' : 'translateX(0)', transition: 'transform 0.3s' }}>
          →
        </span>
      )}
    </button>
  );
}

function StatCard({ value, label, delay = 0 }: { value: string; label: string; delay?: number }) {
  const { ref, isVisible } = useInView();
  const colors = getThemeColors('dark');
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    if (!isVisible) return;
    let startTime: number;
    const targetValue = parseInt(value.replace(/\D/g, '')) || 0;
    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / 2000, 1);
      const eased = 1 - Math.pow(1 - progress, 4);
      setCount(Math.floor(eased * targetValue));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [isVisible, value]);

  return (
    <div ref={ref} style={{
      opacity: isVisible ? 1 : 0,
      transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
      transition: 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
      transitionDelay: `${delay}ms`,
      background: colors.cardBg,
      border: `1px solid ${colors.cardBorder}`,
      borderRadius: '1.25rem',
      padding: '1.75rem',
      backdropFilter: 'blur(20px)',
      textAlign: 'center',
    }}>
      <div style={{
        fontSize: '2.5rem',
        fontWeight: 800,
        background: colors.gradient,
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
        lineHeight: 1,
      }}>
        {count}
      </div>
      <div style={{ 
        fontSize: '0.75rem', 
        color: colors.textMuted,
        textTransform: 'uppercase',
        letterSpacing: '0.1em',
        marginTop: '0.5rem',
        fontWeight: 500,
      }}>
        {label}
      </div>
    </div>
  );
}

function FloatingBlob({ color, size, top, left, right, delay }: { color: string; size: number; top: string; left?: string; right?: string; delay?: number }) {
  const { ref, isVisible } = useInView();
  
  return (
    <div ref={ref} style={{
      position: 'fixed',
      top,
      left,
      right,
      width: size,
      height: size,
      background: `radial-gradient(circle, ${color}, transparent 70%)`,
      borderRadius: '50%',
      filter: 'blur(80px)',
      pointerEvents: 'none',
      zIndex: 0,
      opacity: isVisible ? 1 : 0,
      transform: isVisible ? 'scale(1)' : 'scale(0.8)',
      transition: 'all 1.2s cubic-bezier(0.4, 0, 0.2, 1)',
      transitionDelay: `${delay || 0}ms`,
    }} />
  );
}

function MeshGradient() {
  const { ref, isVisible } = useInView();
  
  return (
    <div ref={ref} style={{
      position: 'fixed',
      inset: 0,
      overflow: 'hidden',
      pointerEvents: 'none',
      zIndex: 0,
      opacity: isVisible ? 1 : 0,
      transition: 'opacity 1s ease',
    }}>
      <div style={{
        position: 'absolute',
        top: '10%',
        left: '10%',
        width: '600px',
        height: '600px',
        background: 'radial-gradient(circle, rgba(168, 85, 247, 0.15), transparent 50%)',
        filter: 'blur(60px)',
        animation: 'float 8s ease-in-out infinite',
      }} />
      <div style={{
        position: 'absolute',
        top: '40%',
        right: '5%',
        width: '500px',
        height: '500px',
        background: 'radial-gradient(circle, rgba(99, 102, 241, 0.12), transparent 50%)',
        filter: 'blur(60px)',
        animation: 'float 10s ease-in-out infinite reverse',
      }} />
      <div style={{
        position: 'absolute',
        bottom: '20%',
        left: '30%',
        width: '400px',
        height: '400px',
        background: 'radial-gradient(circle, rgba(236, 72, 153, 0.1), transparent 50%)',
        filter: 'blur(60px)',
        animation: 'float 12s ease-in-out infinite',
      }} />
      <style jsx global>{`
        @keyframes float {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -30px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.95); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.7; transform: scale(1.2); }
        }
      `}</style>
    </div>
  );
}

function DotPattern() {
  const colors = getThemeColors('dark');
  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      backgroundImage: `radial-gradient(circle at 1px 1px, ${colors.border} 1px, transparent 0)`,
      backgroundSize: '40px 40px',
      pointerEvents: 'none',
      zIndex: 0,
      opacity: 0.5,
    }} />
  );
}

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const colors = getThemeColors('dark');
  
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 100,
      background: scrolled ? 'rgba(3, 3, 8, 0.9)' : 'transparent',
      backdropFilter: scrolled ? 'blur(20px)' : 'none',
      borderBottom: scrolled ? `1px solid ${colors.border}` : 'none',
      transition: 'all 0.3s ease',
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
          <div>
            <span style={{ fontWeight: 800, fontSize: '1.25rem', color: colors.text }}>SitesSaaS</span>
            <span style={{ display: 'block', fontSize: '0.6rem', color: colors.primary, fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase' }}>Premium</span>
          </div>
        </Link>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
          <div style={{ display: 'flex', gap: '1.75rem', color: colors.textSecondary, fontSize: '0.875rem' }}>
            <a href="#features" style={{ color: 'inherit', textDecoration: 'none', fontWeight: 500 }}>Recursos</a>
            <a href="#pricing" style={{ color: 'inherit', textDecoration: 'none', fontWeight: 500 }}>Preços</a>
            <a href="#testimonials" style={{ color: 'inherit', textDecoration: 'none', fontWeight: 500 }}>Depoimentos</a>
          </div>
          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <Link href="/sites"><GlowButton>Meus Sites</GlowButton></Link>
            <Link href="/create"><GlowButton primary>Criar</GlowButton></Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

function Hero() {
  const { ref, isVisible } = useInView();
  const colors = getThemeColors('dark');
  
  return (
    <section style={{
      position: 'relative',
      zIndex: 1,
      padding: '12rem 2rem 8rem',
      maxWidth: '1400px',
      margin: '0 auto',
      textAlign: 'center',
    }}>
      <AnimatedGradient delay={100}>
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.75rem',
          padding: '0.625rem 1.25rem',
          background: 'rgba(168, 85, 247, 0.1)',
          border: '1px solid rgba(168, 85, 247, 0.2)',
          borderRadius: '9999px',
          color: colors.primary,
          fontSize: '0.8125rem',
          fontWeight: 600,
          marginBottom: '2rem',
          backdropFilter: 'blur(10px)',
        }}>
          <span style={{
            width: '6px',
            height: '6px',
            background: colors.primary,
            borderRadius: '50%',
            boxShadow: `0 0 12px ${colors.primary}`,
            animation: 'pulse 2s ease-in-out infinite',
          }} />
          NOW with AI Generator
        </div>
      </AnimatedGradient>
      
      <AnimatedGradient delay={200}>
        <h1 style={{
          fontSize: 'clamp(2.5rem, 7vw, 5.5rem)',
          fontWeight: 900,
          lineHeight: 1.05,
          marginBottom: '1.75rem',
          letterSpacing: '-0.03em',
          color: colors.text,
        }}>
          Criação de sites<br/>
          <span style={{
            background: colors.gradient,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}>ultra-premium</span> com IA
        </h1>
      </AnimatedGradient>
      
      <AnimatedGradient delay={300}>
        <p style={{
          fontSize: '1.25rem',
          color: colors.textSecondary,
          maxWidth: '640px',
          margin: '0 auto 2.5rem',
          lineHeight: 1.7,
        }}>
          Plataforma profissional com IA generativa, GSAP animations, 
          Three.js e deploy instantâneo. Crie sites de R$10K em 2 minutos.
        </p>
      </AnimatedGradient>
      
      <AnimatedGradient delay={400}>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link href="/create"><GlowButton primary>Criar Site Agora</GlowButton></Link>
          <a href="#features"><GlowButton>Ver Demonstração</GlowButton></a>
        </div>
      </AnimatedGradient>
      
      <AnimatedGradient delay={500}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '1rem',
          maxWidth: '800px',
          margin: '4rem auto 0',
        }}>
          <StatCard value="2000" label="Sites Criados" delay={0} />
          <StatCard value="500" label="Agências" delay={100} />
          <StatCard value="98" label="Satisfação %" delay={200} />
          <StatCard value="2" label="Minutos" delay={300} />
        </div>
      </AnimatedGradient>
    </section>
  );
}

function Features() {
  const colors = getThemeColors('dark');
  
  const features = [
    { icon: '🤖', title: 'IA Generativa', desc: 'GPT-4 + dados reais do Dribbble, Landbook', colSpan: 2 },
    { icon: '✨', title: 'GSAP Animations', desc: 'ScrollTrigger, parallax, smooth transitions', colSpan: 1 },
    { icon: '🎨', title: '3D Interativo', desc: 'Three.js particles', colSpan: 1 },
    { icon: '📱', title: 'Responsivo', desc: 'Mobile-first, todas telas', colSpan: 2 },
    { icon: '⚡', title: 'Deploy Instantâneo', desc: 'Vercel em 1 clique', colSpan: 2 },
  ];

  return (
    <section id="features" style={{
      position: 'relative',
      zIndex: 1,
      padding: '8rem 2rem',
      maxWidth: '1400px',
      margin: '0 auto',
    }}>
      <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
        <AnimatedGradient>
          <span style={{
            display: 'inline-block',
            padding: '0.5rem 1rem',
            background: 'rgba(168, 85, 247, 0.1)',
            border: '1px solid rgba(168, 85, 247, 0.2)',
            borderRadius: '9999px',
            color: colors.primary,
            fontSize: '0.75rem',
            fontWeight: 700,
            letterSpacing: '0.1em',
            marginBottom: '1.25rem',
          }}>
            FEATURES
          </span>
        </AnimatedGradient>
        <AnimatedGradient delay={100}>
          <h2 style={{
            fontSize: 'clamp(2rem, 4vw, 3rem)',
            fontWeight: 800,
            color: colors.text,
            letterSpacing: '-0.02em',
          }}>
            Tudo que você precisa
          </h2>
        </AnimatedGradient>
      </div>
      
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: '1.25rem',
      }}>
        {features.map((f, i) => (
          <BentoCard key={i} colSpan={f.colSpan} delay={i * 100}>
            <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>{f.icon}</div>
            <h3 style={{ fontSize: '1.125rem', fontWeight: 700, color: colors.text, marginBottom: '0.5rem' }}>{f.title}</h3>
            <p style={{ fontSize: '0.875rem', color: colors.textSecondary, lineHeight: 1.5 }}>{f.desc}</p>
          </BentoCard>
        ))}
      </div>
    </section>
  );
}

function Pricing() {
  const colors = getThemeColors('dark');
  
  const plans = [
    { name: 'Starter', price: '0', period: '', popular: false, features: ['1 site', 'Template básico', '.sites-saas.com', 'SSL'] },
    { name: 'Professional', price: '49', period: '/mês', popular: true, features: ['Sites ilimitados', 'Templates $10K', 'White label', 'IA', 'Analytics'] },
    { name: 'Enterprise', price: '199', period: '/mês', popular: false, features: ['Tudo Pro', 'API', 'Multi-usuário', 'SLA', 'Suporte'] },
  ];

  return (
    <section id="pricing" style={{
      position: 'relative',
      zIndex: 1,
      padding: '8rem 2rem',
      maxWidth: '1200px',
      margin: '0 auto',
    }}>
      <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
        <AnimatedGradient>
          <span style={{
            display: 'inline-block',
            padding: '0.5rem 1rem',
            background: 'rgba(168, 85, 247, 0.1)',
            border: '1px solid rgba(168, 85, 247, 0.2)',
            borderRadius: '9999px',
            color: colors.primary,
            fontSize: '0.75rem',
            fontWeight: 700,
            letterSpacing: '0.1em',
            marginBottom: '1.25rem',
          }}>
            PRICING
          </span>
        </AnimatedGradient>
        <AnimatedGradient delay={100}>
          <h2 style={{
            fontSize: 'clamp(2rem, 4vw, 3rem)',
            fontWeight: 800,
            color: colors.text,
            letterSpacing: '-0.02em',
          }}>
            Escolha seu plano
          </h2>
        </AnimatedGradient>
      </div>
      
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '1.5rem',
        alignItems: 'start',
      }}>
        {plans.map((plan, i) => (
          <BentoCard key={i} delay={i * 150}>
            {plan.popular && (
              <div style={{
                position: 'absolute',
                top: '-0.75rem',
                left: '50%',
                transform: 'translateX(-50%)',
                background: colors.gradient,
                color: 'white',
                padding: '0.375rem 1.25rem',
                borderRadius: '9999px',
                fontSize: '0.6875rem',
                fontWeight: 700,
                letterSpacing: '0.05em',
              }}>
                POPULAR
              </div>
            )}
            <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: colors.text, marginBottom: '0.5rem' }}>{plan.name}</h3>
            <div style={{ marginBottom: '1.5rem' }}>
              <span style={{ fontSize: '2.5rem', fontWeight: 900, color: colors.text }}>
                {plan.price === '0' ? 'Free' : `R$${plan.price}`}
              </span>
              {plan.period && <span style={{ color: colors.textMuted }}>{plan.period}</span>}
            </div>
            <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 2rem' }}>
              {plan.features.map((f, j) => (
                <li key={j} style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  marginBottom: '0.625rem',
                  color: colors.textSecondary,
                  fontSize: '0.875rem',
                }}>
                  <span style={{ color: colors.primary, fontWeight: 700 }}>✓</span>
                  {f}
                </li>
              ))}
            </ul>
            <Link href="/create">
              <GlowButton primary={plan.popular} style={{ width: '100%', justifyContent: 'center' }}>
                Começar
              </GlowButton>
            </Link>
          </BentoCard>
        ))}
      </div>
    </section>
  );
}

function Testimonials() {
  const colors = getThemeColors('dark');
  
  const testimonials = [
    { name: 'Carlos M.', role: 'Fundador', company: 'WebPro', text: 'Reduzimos tempo de entrega de 30 dias para 2 minutos!', rating: 5 },
    { name: 'Marina D.', role: 'Diretora', company: 'Digital', text: 'White label perfeito. Margem de 80% em todos os projetos.', rating: 5 },
    { name: 'Pedro T.', role: 'CTO', company: 'Tech', text: 'API integrada ao CRM. 50 sites em uma semana.', rating: 5 },
  ];

  return (
    <section id="testimonials" style={{
      position: 'relative',
      zIndex: 1,
      padding: '8rem 2rem',
      maxWidth: '1200px',
      margin: '0 auto',
    }}>
      <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
        <AnimatedGradient>
          <span style={{
            display: 'inline-block',
            padding: '0.5rem 1rem',
            background: 'rgba(168, 85, 247, 0.1)',
            border: '1px solid rgba(168, 85, 247, 0.2)',
            borderRadius: '9999px',
            color: colors.primary,
            fontSize: '0.75rem',
            fontWeight: 700,
            letterSpacing: '0.1em',
            marginBottom: '1.25rem',
          }}>
            TESTIMONIALS
          </span>
        </AnimatedGradient>
        <AnimatedGradient delay={100}>
          <h2 style={{
            fontSize: 'clamp(2rem, 4vw, 3rem)',
            fontWeight: 800,
            color: colors.text,
            letterSpacing: '-0.02em',
          }}>
            O que dizem
          </h2>
        </AnimatedGradient>
      </div>
      
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '1.5rem',
      }}>
        {testimonials.map((t, i) => (
          <BentoCard key={i} delay={i * 100}>
            <div style={{ display: 'flex', gap: '0.25rem', marginBottom: '1rem' }}>
              {Array(t.rating).fill(0).map((_, j) => (
                <span key={j} style={{ color: '#FBBF24' }}>★</span>
              ))}
            </div>
            <p style={{ color: colors.textSecondary, fontSize: '1rem', lineHeight: 1.6, marginBottom: '1.5rem', fontStyle: 'italic' }}>
              "{t.text}"
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <div style={{
                width: '2.5rem',
                height: '2.5rem',
                background: colors.gradient,
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontWeight: 700,
              }}>
                {t.name[0]}
              </div>
              <div>
                <div style={{ color: colors.text, fontWeight: 600, fontSize: '0.875rem' }}>{t.name}</div>
                <div style={{ color: colors.textMuted, fontSize: '0.75rem' }}>{t.role} • {t.company}</div>
              </div>
            </div>
          </BentoCard>
        ))}
      </div>
    </section>
  );
}

function Footer() {
  const colors = getThemeColors('dark');
  
  return (
    <footer style={{
      position: 'relative',
      zIndex: 1,
      padding: '4rem 2rem',
      borderTop: `1px solid ${colors.border}`,
      background: colors.bgSecondary,
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '2rem',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{
            width: '2rem',
            height: '2rem',
            background: colors.gradient,
            borderRadius: '0.5rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <span style={{ color: 'white', fontWeight: 900, fontSize: '0.875rem' }}>S</span>
          </div>
          <span style={{ color: colors.textMuted, fontSize: '0.875rem' }}>© 2026 SitesSaaS Premium</span>
        </div>
        <div style={{ display: 'flex', gap: '2rem', color: colors.textMuted, fontSize: '0.875rem' }}>
          <a href="#" style={{ color: 'inherit', textDecoration: 'none' }}>Privacidade</a>
          <a href="#" style={{ color: 'inherit', textDecoration: 'none' }}>Termos</a>
          <a href="#" style={{ color: 'inherit', textDecoration: 'none' }}>Contato</a>
        </div>
      </div>
    </footer>
  );
}

export default function Home() {
  const mainRef = useRef<HTMLElement>(null);
  const colors = getThemeColors('dark');
  
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    const ctx = gsap.context(() => {
      gsap.from('.animate-in', {
        y: 60,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: 'power3.out',
      });
    }, mainRef);
    
    return () => ctx.revert();
  }, []);

  return (
    <main ref={mainRef} style={{
      backgroundColor: colors.bg,
      minHeight: '100vh',
      color: colors.text,
      overflowX: 'hidden',
    }}>
      <MeshGradient />
      <DotPattern />
      <FloatingBlob color="rgba(168, 85, 247, 0.12)" size={600} top="5%" left="-10%" delay={0} />
      <FloatingBlob color="rgba(99, 102, 241, 0.1)" size={500} top="50%" right="-15%" delay={200} />
      <FloatingBlob color="rgba(236, 72, 153, 0.08)" size={400} top="70%" left="20%" delay={400} />
      
      <Navbar />
      <Hero />
      <Features />
      <Pricing />
      <Testimonials />
      <Footer />
    </main>
  );
}