'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Hero3D from '@/components/Hero3D';

gsap.registerPlugin(ScrollTrigger);

// --- DESIGN TOKENS ---
const colors = {
  bg: '#030308',
  bgSecondary: '#0A0A12',
  text: '#FAFAFA',
  textMuted: '#A1A1AA',
  primary: '#A855F7',
  secondary: '#6366F1',
  accent: '#EC4899',
  border: 'rgba(255, 255, 255, 0.08)',
  gradient: 'linear-gradient(135deg, #A855F7 0%, #6366F1 50%, #EC4899 100%)',
};

// --- COMPONENTS ---

function NoiseOverlay() {
  return <div className="noise-overlay" />;
}

function MagneticButton({ children, primary = false, onClick }: { children: React.ReactNode; primary?: boolean; onClick?: () => void }) {
  const buttonRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const el = buttonRef.current;
    if (!el) return;

    const onMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { left, top, width, height } = el.getBoundingClientRect();
      const x = clientX - (left + width / 2);
      const y = clientY - (top + height / 2);
      gsap.to(el, { x: x * 0.3, y: y * 0.3, duration: 0.3, ease: 'power2.out' });
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
  }, []);

  return (
    <div 
      ref={buttonRef} 
      onClick={onClick}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        padding: '0.85rem 2.5rem',
        background: primary ? colors.gradient : 'rgba(255, 255, 255, 0.03)',
        border: `1px solid ${primary ? 'transparent' : colors.border}`,
        borderRadius: '1rem',
        color: '#FAFAFA',
        fontSize: '0.95rem',
        fontWeight: 700,
        cursor: 'pointer',
        backdropFilter: 'blur(10px)',
        transition: 'all 0.3s ease',
      }}
    >
      {children}
    </div>
  );
}

function FeatureCard({ icon, title, desc, delay = 0, span = 1 }: { icon: string; title: string; desc: string; delay?: number; span?: number }) {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.from(cardRef.current, {
      opacity: 0,
      y: 40,
      duration: 1.2,
      delay,
      ease: 'power4.out',
      scrollTrigger: {
        trigger: cardRef.current,
        start: 'top 90%',
      }
    });
  }, [delay]);

  return (
    <div
      ref={cardRef}
      className="glass-panel"
      style={{
        padding: '3rem',
        borderRadius: '2rem',
        cursor: 'pointer',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        gridColumn: `span ${span}`,
      }}
      onMouseEnter={(e) => {
        gsap.to(e.currentTarget, { y: -12, scale: 1.02, borderColor: colors.primary, boxShadow: '0 40px 80px -20px rgba(168, 85, 247, 0.2)' });
      }}
      onMouseLeave={(e) => {
        gsap.to(e.currentTarget, { y: 0, scale: 1, borderColor: colors.border, boxShadow: 'none' });
      }}
    >
      <div style={{ fontSize: '3.5rem', marginBottom: '2.5rem' }}>{icon}</div>
      <div>
        <h3 style={{ fontSize: '1.75rem', fontWeight: 900, marginBottom: '1.25rem', letterSpacing: '-0.03em' }}>{title}</h3>
        <p style={{ color: colors.textMuted, lineHeight: 1.7, fontSize: '1.05rem' }}>{desc}</p>
      </div>
      <div style={{ marginTop: '2.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem', color: colors.primary, fontWeight: 800, fontSize: '0.85rem', letterSpacing: '0.1em' }}>
        DESCUBRIR MAIS <span style={{ transition: 'transform 0.3s ease' }} className="arrow">→</span>
      </div>
    </div>
  );
}

// --- MAIN PAGE SECTIONS ---

function Navbar() {
  return (
    <nav style={{ position: 'fixed', top: 0, left: 0, width: '100%', zIndex: 100, padding: '2rem 4rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', backdropFilter: 'blur(20px)', borderBottom: `1px solid ${colors.border}` }}>
      <Link href="/" style={{ fontSize: '1.75rem', fontWeight: 900, color: colors.text, textDecoration: 'none', letterSpacing: '-0.05em' }}>
        Elite<span style={{ color: colors.primary }}>SaaS</span>
      </Link>
      <div style={{ display: 'flex', gap: '3rem', alignItems: 'center' }}>
        {['Recursos', 'Processo', 'Resultados', 'Preços'].map(item => (
          <a key={item} href={`#${item.toLowerCase()}`} style={{ color: colors.textMuted, textDecoration: 'none', fontSize: '0.9rem', fontWeight: 600, transition: 'color 0.3s' }}>{item}</a>
        ))}
        <MagneticButton primary onClick={() => window.location.href = '/create'}>Entrar no Swarm</MagneticButton>
      </div>
    </nav>
  );
}

function Hero() {
  return (
    <section id="hero" style={{ paddingTop: '15rem', paddingBottom: '12rem', textAlign: 'center', position: 'relative' }}>
      <div className="gsap-reveal" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.75rem', padding: '0.6rem 1.5rem', background: 'rgba(168, 85, 247, 0.1)', borderRadius: '9999px', border: '1px solid rgba(168, 85, 247, 0.2)', marginBottom: '3rem' }}>
        <span style={{ width: '8px', height: '8px', background: colors.primary, borderRadius: '50%', boxShadow: `0 0 10px ${colors.primary}` }} />
        <span style={{ color: colors.primary, fontSize: '0.75rem', fontWeight: 800, letterSpacing: '0.15em' }}>AGENTIC ENGINE V8.2</span>
      </div>
      
      <h1 className="gsap-reveal" style={{ fontSize: 'clamp(3.5rem, 12vw, 8.5rem)', fontWeight: 900, lineHeight: 0.85, letterSpacing: '-0.06em', marginBottom: '2.5rem' }}>
        A Próxima Era <br /> <span style={{ background: colors.gradient, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Do Web Design</span>
      </h1>
      
      <p className="gsap-reveal" style={{ maxWidth: '700px', marginInline: 'auto', fontSize: '1.35rem', color: colors.textMuted, marginBottom: '4.5rem', lineHeight: 1.6 }}>
        Não somos apenas uma IA. Somos o seu enxame de design agêntico que estuda, cria e refina sites de elite enquanto você dorme.
      </p>

      <div className="gsap-reveal" style={{ display: 'flex', gap: '2rem', justifyContent: 'center' }}>
        <MagneticButton primary onClick={() => window.location.href = '/create'}>Começar Projeto Grátis</MagneticButton>
        <MagneticButton>Explorar Exemplos</MagneticButton>
      </div>
    </section>
  );
}

function Features() {
  const features = [
    { icon: '🧬', title: 'Ruflo Swarm Intelligence', desc: 'Nosso enxame de agentes orquestra pesquisas profundas em tempo real, analisando tendências antes mesmo de você pedir.', span: 2 },
    { icon: '🎞️', title: 'Análise de Vídeo MCP', desc: 'Extraímos insights de design de tutoriais do YouTube para garantir que seu site use as técnicas mais modernas de 2026.', span: 1 },
    { icon: '🧩', title: 'Engenharia de Refinamento', desc: 'Utilizamos o Stitch como base e aplicamos camadas de polimento que removem qualquer aspecto estéril de IA comum.', span: 1 },
    { icon: '✨', title: 'Interações Cinemáticas', desc: 'Cada elemento do seu site é animado com GSAP para guiar o olhar e maximizar a taxa de conversão.', span: 2 },
    { icon: '🌐', title: 'Layouts Editoriais', desc: 'Fuja dos templates. Criamos grids modulares assimétricos que posicionam sua marca como líder incontestável.', span: 1 },
    { icon: '💎', title: 'Tactile UX', desc: 'Texturas de grão tátil e glassmorphism avançado que criam uma experiência de luxo autêntica.', span: 2 },
  ];

  return (
    <section id="recursos" style={{ paddingBlock: '12rem', background: colors.bgSecondary }}>
      <div style={{ maxWidth: '1600px', marginInline: 'auto', paddingInline: '4rem' }}>
        <header style={{ marginBottom: '8rem', maxWidth: '900px' }}>
          <h2 className="gsap-reveal" style={{ fontSize: '4.5rem', fontWeight: 900, letterSpacing: '-0.05em', marginBottom: '2rem' }}>
            Recursos Que <span style={{ color: colors.primary }}>Dominam o Mercado</span>
          </h2>
          <p className="gsap-reveal" style={{ fontSize: '1.25rem', color: colors.textMuted, lineHeight: 1.6 }}>
            Baseado em pesquisas com os 5 maiores especialistas de design do mundo. Cada recurso foi validado para converter.
          </p>
        </header>

        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(3, 1fr)', 
          gap: '2.5rem',
        }}>
          {features.map((f, i) => (
            <FeatureCard key={i} {...f} delay={i * 0.1} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  useEffect(() => {
    // Reveal Animations
    gsap.to('.gsap-reveal', {
      opacity: 1,
      y: 0,
      duration: 1.2,
      stagger: 0.15,
      ease: 'power4.out',
      scrollTrigger: {
        trigger: '.gsap-reveal',
        start: 'top 90%'
      }
    });

    // Parallax 3D
    gsap.to('.hero-3d-container', {
      scrollTrigger: {
        trigger: 'body',
        start: 'top top',
        end: 'bottom bottom',
        scrub: true
      },
      y: 200,
      scale: 1.15,
      rotateZ: 10
    });
  }, []);

  return (
    <main style={{ backgroundColor: colors.bg, minHeight: '100vh', position: 'relative', overflowX: 'hidden' }}>
      <NoiseOverlay />
      
      <div className="hero-3d-container" style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
        <Hero3D />
      </div>

      <Navbar />
      <Hero />
      <Features />

      {/* CTA Final */}
      <section style={{ paddingBlock: '15rem', textAlign: 'center', position: 'relative' }}>
        <div className="glass-panel gsap-reveal" style={{ maxWidth: '1000px', marginInline: 'auto', padding: '6rem', borderRadius: '3rem' }}>
          <h2 style={{ fontSize: '4rem', fontWeight: 900, marginBottom: '2.5rem', letterSpacing: '-0.04em' }}>Pronto para o <span style={{ color: colors.primary }}>Próximo Nível</span>?</h2>
          <p style={{ fontSize: '1.25rem', color: colors.textMuted, marginBottom: '4rem' }}>O seu enxame agêntico está esperando. Junte-se à elite do design.</p>
          <MagneticButton primary onClick={() => window.location.href = '/create'}>Começar Projeto Agora</MagneticButton>
        </div>
      </section>

      <footer style={{ padding: '6rem', borderTop: `1px solid ${colors.border}`, textAlign: 'center', color: colors.textMuted, fontSize: '0.9rem' }}>
        &copy; 2026 EliteSaaS. Design Agêntico Ultra-Premium.
      </footer>
    </main>
  );
}