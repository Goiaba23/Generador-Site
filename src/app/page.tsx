'use client';

import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import ProblemSolutionSection from '@/components/ProblemSolutionSection';
import GrowthModulesSection from '@/components/GrowthModulesSection';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// ===== Theme System - Dark/Light Mode =====
type Theme = 'dark' | 'light';

const COLORS = {
  dark: {
    bgPrimary: '#0A0A0F',
    bgSecondary: '#12121A',
    bgCard: '#1A1A24',
    textPrimary: '#F5F5F7',
    textSecondary: '#94A3B8',
    textMuted: '#64748B',
    accent: '#6366F1',
    accentHover: '#818CF8',
    border: '#2D2D3A',
    gradient: 'linear-gradient(135deg, #6366F1, #8B5CF6)',
  },
  light: {
    bgPrimary: '#FAFBFC',
    bgSecondary: '#F1F5F9',
    bgCard: '#FFFFFF',
    textPrimary: '#0F172A',
    textSecondary: '#475569',
    textMuted: '#94A3B8',
    accent: '#4F46E5',
    accentHover: '#4338CA',
    border: '#E2E8F0',
    gradient: 'linear-gradient(135deg, #4F46E5, #7C3AED)',
  },
};

function getColors(theme: Theme) {
  return COLORS[theme];
}

// ===== Theme Toggle Button =====
function ThemeToggle({ theme, onClick }: { theme: Theme; onClick: () => void }) {
  const colors = getColors(theme);
  return (
    <button
      onClick={onClick}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        padding: '0.5rem 1rem',
        borderRadius: '9999px',
        border: `1px solid ${colors.border}`,
        background: theme === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)',
        color: colors.textPrimary,
        cursor: 'pointer',
        fontSize: '0.875rem',
        fontWeight: 500,
        transition: 'all 0.2s ease',
      }}
    >
      <span style={{ fontSize: '1.25rem' }}>{theme === 'dark' ? '🌙' : '☀️'}</span>
      <span>{theme === 'dark' ? 'Dark' : 'Light'}</span>
    </button>
  );
}

// ===== Bento Grid Metrics with Real Data =====
function BentoMetrics({ theme }: { theme: Theme }) {
  const colors = getColors(theme);
  const metrics = [
    { icon: '🏢', value: '2.000+', label: 'Sites Entregues' },
    { icon: '💼', value: '500+', label: 'Agências' },
    { icon: '⭐', value: '98%', label: 'Satisfação' },
    { icon: '⚡', value: '2 min', label: 'Tempo Médio' },
  ];

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
      gap: '1rem',
      marginTop: '4rem',
    }}>
      {metrics.map((m, i) => (
        <div key={i} style={{
          background: colors.bgCard,
          border: `1px solid ${colors.border}`,
          borderRadius: '1rem',
          padding: '1.25rem',
          textAlign: 'center',
        }}>
          <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>{m.icon}</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 800, color: colors.textPrimary }}>{m.value}</div>
          <div style={{ fontSize: '0.75rem', color: colors.textMuted, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{m.label}</div>
        </div>
      ))}
    </div>
  );
}

// ===== Animações Premium =====

function useAnimation(delay = 0) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setTimeout(() => setIsVisible(true), delay); observer.disconnect(); } },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [delay]);

  return { ref, isVisible };
}

function AnimatedCounter({ end, label, duration = 2000, prefix = '' }: { end: number; label: string; duration?: number; prefix?: string }) {
  const [count, setCount] = useState(0);
  const { ref, isVisible } = useAnimation(200);

  useEffect(() => {
    if (!isVisible) return;
    let startTime: number;
    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // easeOutCubic
      setCount(Math.floor(eased * end));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [isVisible, end, duration]);

  return (
    <div ref={ref} style={{ textAlign: 'center', opacity: isVisible ? 1 : 0, transform: isVisible ? 'translateY(0)' : 'translateY(20px)', transition: 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)' }}>
      <div style={{
        fontSize: '4rem',
        fontWeight: 900,
        background: 'linear-gradient(135deg, #818cf8, #c084fc)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
        letterSpacing: '-0.05em',
        lineHeight: 1,
        marginBottom: '0.5rem',
      }}>
        {prefix}{count}+
      </div>
      <div style={{ fontSize: '1rem', color: '#94a3b8', fontWeight: 500, textTransform: 'uppercase' as const, letterSpacing: '0.1em' }}>{label}</div>
    </div>
  );
}

function AnimatedElement({ children, delay = 0, direction = 'up', className = '' }: { children: React.ReactNode; delay?: number; direction?: 'up' | 'left' | 'right' | 'scale'; className?: string }) {
  const { ref, isVisible } = useAnimation(delay);
  
  const getTransform = () => {
    if (!isVisible) {
      switch (direction) {
        case 'up': return 'translateY(40px)';
        case 'left': return 'translateX(-40px)';
        case 'right': return 'translateX(40px)';
        case 'scale': return 'scale(0.9)';
      }
    }
    return 'translateY(0) translateX(0) scale(1)';
  };

  return (
    <div ref={ref} style={{
      opacity: isVisible ? 1 : 0,
      transform: getTransform(),
      transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
    }} className={className}>
      {children}
    </div>
  );
}

function FeatureCard({ icon, title, description, features, delay = 0 }: { icon: string; title: string; description: string; features: string[]; delay?: number }) {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        background: isHovered ? 'linear-gradient(135deg, rgba(79, 70, 229, 0.1), rgba(124, 58, 237, 0.05))' : 'linear-gradient(135deg, rgba(30, 41, 59, 0.8), rgba(15, 23, 42, 0.9))',
        border: isHovered ? '1px solid rgba(129, 140, 248, 0.5)' : '1px solid rgba(51, 65, 85, 0.5)',
        borderRadius: '2rem',
        padding: '3rem',
        transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
        cursor: 'pointer',
        position: 'relative' as const,
        overflow: 'hidden',
        transform: isHovered ? 'translateY(-12px) scale(1.02)' : 'translateY(0) scale(1)',
        boxShadow: isHovered ? '0 30px 60px -15px rgba(129, 140, 248, 0.2)' : 'none',
      }}
    >
      {/* Glow Effect */}
      {isHovered && (
        <div style={{
          position: 'absolute' as const,
          top: '-50%',
          right: '-50%',
          width: '200%',
          height: '200%',
          background: 'radial-gradient(circle, rgba(129, 140, 248, 0.1), transparent 70%)',
          pointerEvents: 'none' as const,
        }} />
      )}
      
      <div style={{ fontSize: '3.5rem', marginBottom: '1.5rem', position: 'relative' as const, zIndex: 1 }}>{icon}</div>
      <h3 style={{ fontSize: '1.75rem', fontWeight: 700, color: 'white', marginBottom: '1rem', position: 'relative' as const, zIndex: 1 }}>{title}</h3>
      <p style={{ color: '#94a3b8', lineHeight: 1.625, marginBottom: '1.5rem', position: 'relative' as const, zIndex: 1 }}>{description}</p>
      
      <ul style={{ listStyle: 'none', padding: 0, margin: 0, position: 'relative' as const, zIndex: 1 }}>
        {features.map((feature, i) => (
          <li key={i} style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '0.75rem', 
            marginBottom: '0.75rem', 
            color: isHovered ? '#cbd5e1' : '#94a3b8',
            fontSize: '0.875rem',
            transition: 'color 0.3s ease',
          }}>
            <span style={{ color: '#818cf8', fontSize: '1.25rem', flexShrink: 0 }}>✓</span>
            {feature}
          </li>
        ))}
      </ul>
    </div>
  );
}

function TestimonialCard({ name, role, content, avatar, company, rating = 5 }: { name: string; role: string; content: string; avatar: string; company?: string; rating?: number }) {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        background: 'linear-gradient(135deg, rgba(30, 41, 59, 0.6), rgba(15, 23, 42, 0.8))',
        border: isHovered ? '1px solid rgba(129, 140, 248, 0.3)' : '1px solid rgba(51, 65, 85, 0.5)',
        borderRadius: '2rem',
        padding: '2.5rem',
        position: 'relative' as const,
        overflow: 'hidden',
        transition: 'all 0.4s ease',
        transform: isHovered ? 'translateY(-8px)' : 'translateY(0)',
        boxShadow: isHovered ? '0 20px 40px -10px rgba(0, 0, 0, 0.3)' : 'none',
      }}
    >
      {/* Quote Mark */}
      <div style={{ position: 'absolute' as const, top: '1.5rem', right: '2rem', fontSize: '5rem', color: 'rgba(129, 140, 248, 0.15)', fontFamily: 'serif', lineHeight: 1, pointerEvents: 'none' as const }}>"</div>
      
      {/* Rating */}
      <div style={{ display: 'flex', gap: '0.25rem', marginBottom: '1.5rem' }}>
        {Array(rating).fill(0).map((_, i) => (
          <span key={i} style={{ color: '#fbbf24', fontSize: '1.25rem' }}>★</span>
        ))}
      </div>
      
      <p style={{ color: '#cbd5e1', lineHeight: 1.75, marginBottom: '2rem', fontSize: '1.125rem', fontStyle: 'italic', position: 'relative' as const, zIndex: 1 }}>{content}</p>
      
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <div style={{
          width: '4rem',
          height: '4rem',
          borderRadius: '50%',
          background: isHovered ? 'linear-gradient(135deg, #4f46e5, #7c3aed)' : 'linear-gradient(135deg, rgba(79, 70, 229, 0.5), rgba(124, 58, 237, 0.5))',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '1.75rem',
          flexShrink: 0,
          transition: 'all 0.3s ease',
        }}>
          {avatar}
        </div>
        <div>
          <div style={{ color: 'white', fontWeight: 700, fontSize: '1rem' }}>{name}</div>
          <div style={{ color: '#94a3b8', fontSize: '0.875rem' }}>{role}{company && <span style={{ color: '#818cf8' }}> • {company}</span>}</div>
        </div>
      </div>
    </div>
  );
}

function PricingCard({ title, price, period, description, features, popular = false, ctaText = 'Começar Agora' }: { 
  title: string; 
  price: string; 
  period?: string;
  description: string; 
  features: string[]; 
  popular?: boolean;
  ctaText?: string;
}) {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        background: popular 
          ? 'linear-gradient(135deg, rgba(79, 70, 229, 0.15), rgba(124, 58, 237, 0.1))' 
          : 'linear-gradient(135deg, rgba(30, 41, 59, 0.8), rgba(15, 23, 42, 0.9))',
        border: popular ? '2px solid rgba(129, 140, 248, 0.6)' : '1px solid rgba(51, 65, 85, 0.5)',
        borderRadius: '2rem',
        padding: '3rem',
        position: 'relative' as const,
        transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
        transform: isHovered ? 'translateY(-12px) scale(1.03)' : 'translateY(0) scale(1)',
        boxShadow: isHovered ? (popular ? '0 40px 80px -20px rgba(79, 70, 229, 0.3)' : '0 30px 60px -15px rgba(0, 0, 0, 0.2)') : 'none',
      }}
    >
      {popular && (
        <div style={{
          position: 'absolute' as const,
          top: '-1.25rem',
          left: '50%',
          transform: 'translateX(-50%)',
          background: 'linear-gradient(to right, #4f46e5, #7c3aed)',
          color: 'white',
          padding: '0.5rem 2rem',
          borderRadius: '9999px',
          fontSize: '0.875rem',
          fontWeight: 700,
          letterSpacing: '0.05em',
          textTransform: 'uppercase' as const,
          boxShadow: '0 8px 24px rgba(79, 70, 229, 0.4)',
        }}>
          MAIS POPULAR
        </div>
      )}
      
      <div style={{ textAlign: 'center' as const, marginBottom: '2.5rem' }}>
        <h3 style={{ fontSize: '1.5rem', fontWeight: 600, color: 'white', marginBottom: '1rem' }}>{title}</h3>
        <div style={{ marginBottom: '1rem' }}>
          <span style={{ fontSize: '4rem', fontWeight: 900, color: 'white', letterSpacing: '-0.05em' }}>
            {price === '0' ? 'Grátis' : `R$ ${price}`}
          </span>
          {price !== '0' && period && <span style={{ fontSize: '1.125rem', fontWeight: 400, color: '#94a3b8', marginLeft: '0.5rem' }}>{period}</span>}
        </div>
        <p style={{ color: '#94a3b8', fontSize: '0.875rem' }}>{description}</p>
      </div>
      
      <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 2.5rem 0' }}>
        {features.map((feature, index) => (
          <li key={index} style={{ 
            display: 'flex', 
            alignItems: 'flex-start', 
            gap: '0.75rem', 
            marginBottom: '1rem', 
            color: '#cbd5e1', 
            fontSize: '0.875rem',
            lineHeight: 1.5,
          }}>
            <span style={{ color: '#818cf8', fontSize: '1.25rem', flexShrink: 0, marginTop: '0.125rem' }}>✓</span>
            {feature}
          </li>
        ))}
      </ul>
      
      <Link href="/create" style={{ textDecoration: 'none', display: 'block' }}>
        <button
          style={{
            width: '100%',
            padding: '1rem 2rem',
            borderRadius: '1rem',
            border: popular ? 'none' : '2px solid rgba(51, 65, 85, 0.8)',
            background: popular ? 'linear-gradient(135deg, #4f46e5, #7c3aed)' : (isHovered ? 'rgba(30, 41, 59, 0.9)' : 'transparent'),
            color: popular ? 'white' : (isHovered ? '#cbd5e1' : '#94a3b8'),
            fontWeight: 700,
            fontSize: '1rem',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.5rem',
            boxShadow: popular ? '0 8px 24px rgba(79, 70, 229, 0.4)' : 'none',
          }}
        >
          {ctaText}
          <span style={{ transition: 'transform 0.3s ease', transform: isHovered ? 'translateX(4px)' : 'translateX(0)' }}>→</span>
        </button>
      </Link>
    </div>
  );
}

// ===== Hero Section com Layout Ultra-Premium =====

export default function Home() {
  const [scrollY, setScrollY] = useState(0);
  const [theme, setTheme] = useState<Theme>('dark');
  const colors = getColors(theme);
  
  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };
  
  const mainRef = useRef<HTMLElement>(null);
  
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    const ctx = gsap.context(() => {
      gsap.from('.hero-animate', {
        y: 100,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: 'power3.out',
      });
      
      gsap.from('.feature-card', {
        scrollTrigger: {
          trigger: '.features-section',
          start: 'top 80%',
        },
        y: 60,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power2.out',
      });
      
      gsap.from('.pricing-card', {
        scrollTrigger: {
          trigger: '.pricing-section',
          start: 'top 80%',
        },
        y: 40,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: 'back.out(1.7)',
      });
      
      gsap.from('.testimonial-card', {
        scrollTrigger: {
          trigger: '.testimonials-section',
          start: 'top 70%',
        },
        x: -30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power2.out',
      });
    }, mainRef);
    
    return () => ctx.revert();
  }, []);
  
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <main ref={mainRef} style={{ backgroundColor: colors.bgPrimary, minHeight: '100vh', color: colors.textPrimary, overflow: 'hidden' }}>
      {/* Background Decorations - Múltiplas camadas */}
      <div style={{ position: 'fixed', top: '-30%', left: '-20%', width: '800px', height: '800px', background: theme === 'dark' ? 'radial-gradient(circle, rgba(129, 140, 248, 0.12), transparent 70%)' : 'radial-gradient(circle, rgba(99, 102, 241, 0.08), transparent 70%)', borderRadius: '50%', filter: 'blur(120px)', pointerEvents: 'none' as const, animation: 'float 20s ease-in-out infinite' }} />
      <div style={{ position: 'fixed', top: '20%', right: '-20%', width: '900px', height: '900px', background: theme === 'dark' ? 'radial-gradient(circle, rgba(192, 132, 252, 0.08), transparent 70%)' : 'radial-gradient(circle, rgba(139, 92, 246, 0.06), transparent 70%)', borderRadius: '50%', filter: 'blur(120px)', pointerEvents: 'none' as const }} />
      <div style={{ position: 'fixed', bottom: '10%', left: '30%', width: '600px', height: '600px', background: theme === 'dark' ? 'radial-gradient(circle, rgba(251, 146, 60, 0.06), transparent 70%)' : 'radial-gradient(circle, rgba(245, 158, 11, 0.04), transparent 70%)', borderRadius: '50%', filter: 'blur(120px)', pointerEvents: 'none' as const }} />
      
      {/* Dynamic Grid Pattern */}
      <div style={{
        position: 'fixed' as const,
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundImage: theme === 'dark' ? 'radial-gradient(circle at 1px 1px, rgba(129, 140, 248, 0.05) 1px, transparent 0)' : 'radial-gradient(circle at 1px 1px, rgba(99, 102, 241, 0.03) 1px, transparent 0)',
        backgroundSize: '48px 48px',
        pointerEvents: 'none' as const,
        opacity: 0.5,
      }} />

      {/* Navigation - Glassmorphism Ultra-Premium */}
      <nav style={{
        position: 'fixed' as const,
        top: 0,
        width: '100%',
        background: scrollY > 50 ? `${colors.bgSecondary}95` : `${colors.bgSecondary}B3`,
        backdropFilter: 'blur(24px)',
        borderBottom: scrollY > 50 ? `1px solid ${colors.border}` : `1px solid ${colors.border}33`,
        zIndex: 100,
        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
      }}>
        <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '0 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '5.5rem' }}>
          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '1rem', textDecoration: 'none' }}>
            <div style={{
              width: '3.5rem',
              height: '3.5rem',
              background: 'linear-gradient(135deg, #4f46e5, #7c3aed)',
              borderRadius: '1.25rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 8px 32px rgba(79, 70, 229, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
              transition: 'transform 0.3s ease, box-shadow 0.3s ease',
            }}>
              <span style={{ color: 'white', fontWeight: 900, fontSize: '1.5rem', letterSpacing: '-0.05em' }}>S</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' as const, gap: '0' }}>
              <span style={{ fontWeight: 900, fontSize: '1.75rem', background: 'linear-gradient(to right, #ffffff, #e2e8f0)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', letterSpacing: '-0.03em', lineHeight: 1.2 }}>SitesSaaS</span>
              <span style={{ fontSize: '0.625rem', color: '#818cf8', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase' as const, lineHeight: 1 }}>PLATFORM</span>
            </div>
          </Link>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '2.5rem' }}>
            <nav style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
              {[
                { label: 'Recursos', href: '#features' },
                { label: 'Preços', href: '#pricing' },
                { label: 'Depoimentos', href: '#testimonials' },
              ].map((item, i) => (
                <a key={i} href={item.href} style={{ color: '#cbd5e1', textDecoration: 'none', fontSize: '0.875rem', fontWeight: 500, transition: 'color 0.2s ease', cursor: 'pointer' }}
                  onMouseEnter={(e) => e.currentTarget.style.color = 'white'}
                  onMouseLeave={(e) => e.currentTarget.style.color = '#cbd5e1'}
                >{item.label}</a>
              ))}
            </nav>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <Link href="/sites" style={{ textDecoration: 'none' }}>
                <button style={{
                  background: 'transparent',
                  border: '1px solid rgba(51, 65, 85, 0.8)',
                  color: '#cbd5e1',
                  padding: '0.75rem 1.5rem',
                  borderRadius: '0.75rem',
                  cursor: 'pointer',
                  fontSize: '0.875rem',
                  fontWeight: 600,
                  transition: 'all 0.2s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = '#818cf8';
                  e.currentTarget.style.color = 'white';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(51, 65, 85, 0.8)';
                  e.currentTarget.style.color = '#cbd5e1';
                }}
                >Meus Sites</button>
              </Link>
              <Link href="/create" style={{ textDecoration: 'none' }}>
                <button style={{
                  background: 'linear-gradient(135deg, #4f46e5, #7c3aed)',
                  color: 'white',
                  border: 'none',
                  padding: '0.875rem 2.5rem',
                  borderRadius: '0.75rem',
                  cursor: 'pointer',
                  fontSize: '0.875rem',
                  fontWeight: 700,
                  boxShadow: '0 8px 32px rgba(79, 70, 229, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 12px 40px rgba(79, 70, 229, 0.7), inset 0 1px 0 rgba(255, 255, 255, 0.2)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 8px 32px rgba(79, 70, 229, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.2)';
                }}
                >
                  🚀 Começar Grátis
                </button>
              </Link>
              <ThemeToggle theme={theme} onClick={toggleTheme} />
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section - Ultra Premium */}
      <section style={{ position: 'relative' as const, minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', paddingTop: '6rem', paddingBottom: '6rem' }}>
        <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '0 2rem', textAlign: 'center' as const, position: 'relative' as const, zIndex: 10 }}>
          <AnimatedElement delay={0}>
            <div style={{
              marginBottom: '3rem',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.75rem',
              background: theme === 'dark' ? 'linear-gradient(135deg, rgba(139, 92, 246, 0.2), rgba(192, 132, 252, 0.15))' : 'linear-gradient(135deg, rgba(79, 70, 229, 0.15), rgba(124, 58, 237, 0.1))',
              color: theme === 'dark' ? '#c4b5fd' : '#6366F1',
              border: theme === 'dark' ? '1px solid rgba(139, 92, 246, 0.3)' : '1px solid rgba(99, 102, 241, 0.3)',
              padding: '0.75rem 1.5rem',
              borderRadius: '9999px',
              fontSize: '0.875rem',
              fontWeight: 600,
              backdropFilter: 'blur(10px)',
            }}>
              <span style={{ fontSize: '1.25rem' }}>🚀</span>
               <span>Novo: Crie sites para clientes com IA • +30 Nichos • Templates $10K</span>
            </div>
          </AnimatedElement>
          
          <AnimatedElement delay={200}>
            <h1 style={{
              fontSize: 'clamp(2.5rem, 6vw, 6.5rem)',
              fontWeight: 900,
              marginBottom: '2.5rem',
              lineHeight: 1.05,
              letterSpacing: '-0.05em',
              color: colors.textPrimary,
              maxWidth: '1200px',
              margin: '0 auto 2.5rem',
            }}>
               Crie sites{' '}
               <span style={{
                 background: colors.gradient,
                 WebkitBackgroundClip: 'text',
                 WebkitTextFillColor: 'transparent',
                 backgroundClip: 'text',
                 display: 'inline',
               }}>
                 premium
               </span>
               <br />
               para seus clientes em{' '}
               <span style={{
                 background: colors.gradient,
                 WebkitBackgroundClip: 'text',
                 WebkitTextFillColor: 'transparent',
                 backgroundClip: 'text',
                 display: 'inline',
               }}>
                 minutos
               </span>
            </h1>
          </AnimatedElement>
          
          <AnimatedElement delay={400}>
            <p style={{
              fontSize: '1.625rem',
              color: colors.textSecondary,
              marginBottom: '4rem',
              maxWidth: '72rem',
              margin: '0 auto 4rem',
              lineHeight: 1.625,
              fontWeight: 400,
            }}>
               Plataforma completa para agências criarem sites premium para clientes. IA que entende cada nicho{' '}
               <span style={{ color: colors.accent, fontWeight: 600 }}>e designs de nível internacional</span>
               {' '}com deploy instantâneo e módulos de crescimento.
            </p>
          </AnimatedElement>
          
          <AnimatedElement delay={600}>
            <div style={{ display: 'flex', flexDirection: 'column' as const, gap: '2rem', justifyContent: 'center', alignItems: 'center', marginBottom: '5rem' }}>
              <Link href="/create" style={{ textDecoration: 'none' }}>
                <button style={{
                  background: 'linear-gradient(135deg, #4f46e5, #7c3aed)',
                  color: 'white',
                  border: 'none',
                  padding: '1.5rem 4rem',
                  fontSize: '1.375rem',
                  borderRadius: '1.25rem',
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '1rem',
                  fontWeight: 800,
                  boxShadow: '0 20px 60px -15px rgba(79, 70, 229, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
                  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px) scale(1.05)';
                  e.currentTarget.style.boxShadow = '0 30px 80px -15px rgba(79, 70, 229, 0.8), inset 0 1px 0 rgba(255, 255, 255, 0.2)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0) scale(1)';
                  e.currentTarget.style.boxShadow = '0 20px 60px -15px rgba(79, 70, 229, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.2)';
                }}
                >
                  <span style={{ fontSize: '1.75rem' }}>🎨</span>
                  Criar Site Agora
                  <span style={{ fontSize: '1.75rem', transition: 'transform 0.3s ease' }}>→</span>
                </button>
              </Link>
              
                 <div style={{ display: 'flex', alignItems: 'center', gap: '2rem', flexWrap: 'wrap' as const, justifyContent: 'center' }}>
                 {[
                   { icon: '✓', text: 'Grátis para começar', color: '#10b981' },
                   { icon: '✓', text: 'White label disponível', color: '#10b981' },
                   { icon: '✓', text: 'Pronto em 2 minutos', color: '#10b981' },
                 ].map((item, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#64748b', fontSize: '0.875rem' }}>
                    <span style={{ color: item.color, fontSize: '1rem' }}>{item.icon}</span>
                    {item.text}
                  </div>
                ))}
              </div>
            </div>
          </AnimatedElement>

          <BentoMetrics theme={theme} />

          {/* Stats Ultra-Premium */}
          <AnimatedElement delay={800}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '5rem',
              maxWidth: '64rem',
              margin: '0 auto',
              padding: '4rem 0',
              borderTop: '1px solid rgba(51, 65, 85, 0.3)',
              borderBottom: '1px solid rgba(51, 65, 85, 0.3)',
            }}>
               <AnimatedCounter end={500} label="Sites para Clientes" prefix="" />
               <AnimatedCounter end={30} label="Nichos Disponíveis" prefix="" />
               <AnimatedCounter end={98} label="Satisfação das Agências" prefix="" />
            </div>
          </AnimatedElement>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" style={{ padding: '10rem 2rem', position: 'relative' as const }}>
        <div style={{ maxWidth: '1440px', margin: '0 auto' }}>
          <AnimatedElement>
            <div style={{ textAlign: 'center' as const, marginBottom: '8rem' }}>
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                background: 'linear-gradient(135deg, rgba(129, 140, 248, 0.2), rgba(192, 132, 252, 0.15))',
                color: '#a5b4fc',
                padding: '0.5rem 1rem',
                borderRadius: '9999px',
                fontSize: '0.875rem',
                fontWeight: 600,
                marginBottom: '2rem',
              }}>
                <span>⚡</span>
                <span>Recursos Premium</span>
              </div>
               <h2 style={{
                 fontSize: '4.5rem',
                 fontWeight: 800,
                 color: 'white',
                 marginBottom: '2rem',
                 lineHeight: 1.1,
                 letterSpacing: '-0.03em',
               }}>
                 Sistema Completo{' '}
                 <span style={{ background: 'linear-gradient(to right, #818cf8, #c084fc)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                   $10K
                 </span>
              </h2>
             <p style={{ fontSize: '1.5rem', color: '#94a3b8', maxWidth: '56rem', margin: '0 auto', lineHeight: 1.625 }}>
                 Plataforma completa: Login obrigatório (1 site grátis), Crawler UXShowcase + Dribbble, GSAP animations, 21dev components, sites de $10K
               </p>
            </div>
          </AnimatedElement>

             <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2.5rem' }}>
             <FeatureCard
               icon="🤖"
               title="IA + Crawler $10K"
               description="IA generativa alimentada por sites premium do Dribbble, Landbook e UXShowcase (crawler real com craw4ai)."
               features={['Crawler UXShowcase/Logo', 'Exemplos $10K+ reais', 'Dribbble/Landbook data', 'Análise de concorrência']}
               delay={0}
             />
             <FeatureCard
               icon="✨"
               title="GSAP Animations"
               description="Animações premium de $10K: parallax, fade-in, hover effects, scroll triggers via GSAP."
               features={['GSAP ScrollTrigger', 'Animações 3D leves', 'Parallax & Hover', '21dev components']}
               delay={200}
             />
             <FeatureCard
               icon="🎨"
               title="30+ Nichos Premium"
               description="Templates baseados em sites $10K: BotiFly, Design Monks, Pixxen, Safal_Adhikari, FleexStudio."
               features={['30+ templates $10K', 'Cores reais Dribbble', 'Logos UXShowcase', 'Design responsivo']}
               delay={400}
             />
             <FeatureCard
               icon="🚀"
               title="Login + Plano Free"
               description="Sistema de login obrigatório: 1 site grátis, depois pagar. Controle de agências e clientes."
               features={['NextAuth login', '1 site grátis', 'Upgrade para mais', 'White label']}
               delay={600}
             />
             <FeatureCard
               icon="📱"
               title="Problem-Solution"
               description="Seção automática: identifica dor do nicho e propõe solução com resultado esperado + growth modules."
               features={['Pain point analysis', 'Growth modules', 'Expected outcome', 'Métricas de lucro']}
               delay={800}
             />
             <FeatureCard
               icon="⚡"
               title="Client Finder"
               description="Encontre clientes potenciais via SEO analysis. Analise sites e mostre oportunidades de melhoria."
               features={['SEO analysis', 'Lead generation', 'Site auditing', 'Oportunidades']}
               delay={1000}
             />
           </div>
        </div>
      </section>

       {/* Problem-Solution-Result Demo Section */}
       <section style={{ padding: '10rem 2rem', background: 'linear-gradient(135deg, rgba(10, 10, 26, 0.8), rgba(15, 23, 42, 0.9))' }}>
         <div style={{ maxWidth: '1440px', margin: '0 auto' }}>
           <h2 style={{ fontSize: '4.5rem', fontWeight: 800, color: 'white', textAlign: 'center', marginBottom: '1rem', lineHeight: 1.1, letterSpacing: '-0.03em' }}>
             Exemplo: Site para Barbearia
           </h2>
           <p style={{ textAlign: 'center', color: '#94a3b8', fontSize: '1.5rem', maxWidth: '56rem', margin: '0 auto 3rem', lineHeight: 1.625 }}>
             Veja como criar um site que resolve a dor do cliente em 2 minutos
           </p>
          
          <div style={{ background: 'linear-gradient(to-br, rgba(129, 140, 248, 0.1), rgba(192, 132, 252, 0.05))', borderRadius: '2rem', padding: '3rem', border: '1px solid rgba(129, 140, 248, 0.2)' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem', marginBottom: '2rem' }}>
              {/* Problem */}
              <div style={{ background: 'white', borderRadius: '1.5rem', padding: '2rem', boxShadow: '0 10px 40px rgba(0,0,0,0.1)', borderLeft: '4px solid #ef4444' }}>
                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>✂️</div>
                <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '0.75rem', color: '#dc2626' }}>O Problema</h3>
                <p style={{ color: '#374151', fontSize: '1.125rem', lineHeight: 1.625 }}>
                  Dificuldade em gerenciar horários e filas de espera
                </p>
              </div>

              {/* Solution */}
              <div style={{ background: 'white', borderRadius: '1.5rem', padding: '2rem', boxShadow: '0 20px 60px rgba(0,0,0,0.15)', borderLeft: '4px solid #22c55e', transform: 'scale(1.05)' }}>
                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>✅</div>
                <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '0.75rem', color: '#16a34a' }}>Nossa Solução</h3>
                <p style={{ color: '#374151', fontSize: '1.125rem', lineHeight: 1.625 }}>
                  Sistema de agendamento online 24/7 com confirmação automática
                </p>
              </div>

              {/* Result */}
              <div style={{ background: 'linear-gradient(to-br, #2563eb, #7c3aed)', borderRadius: '1.5rem', padding: '2rem', boxShadow: '0 25px 50px rgba(37, 99, 235, 0.3)', color: 'white' }}>
                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📈</div>
                <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '0.75rem' }}>O Resultado</h3>
                <p style={{ fontSize: '1.125rem', lineHeight: 1.625, opacity: 0.9 }}>
                  +60 agendamentos/mês, -40% faltas, +R$ 8.000 faturamento
                </p>
              </div>
            </div>

             {/* Growth Modules Preview */}
             <div style={{ marginTop: '2rem', padding: '2rem', background: 'rgba(255,255,255,0.05)', borderRadius: '1rem', border: '1px solid rgba(255,255,255,0.1)' }}>
               <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', color: 'white', marginBottom: '1rem' }}>
                 Módulos de Crescimento para seus Clientes:
               </h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem' }}>
                {['Loyalty Program (10 cortes = 1 grátis)', 'Last-minute slot alerts', 'Barber Team Profiles', 'Review Automation'].map((module, i) => (
                  <div key={i} style={{ background: 'rgba(255,255,255,0.08)', padding: '1rem', borderRadius: '0.75rem', border: '1px solid rgba(255,255,255,0.1)' }}>
                    <div style={{ color: '#818cf8', fontWeight: 'bold', fontSize: '0.875rem' }}>{module}</div>
                  </div>
                ))}
              </div>
            </div>

             {/* CTA */}
             <div style={{ textAlign: 'center', marginTop: '3rem' }}>
               <button 
                 onClick={() => window.location.href = '/create'}
                 style={{
                   background: 'linear-gradient(to right, #2563eb, #7c3aed)',
                   color: 'white',
                   fontWeight: 'bold',
                   padding: '1rem 3rem',
                   borderRadius: '9999px',
                   fontSize: '1.125rem',
                   cursor: 'pointer',
                   boxShadow: '0 20px 40px rgba(37, 99, 235, 0.4)',
                   border: 'none',
                 }}
               >
                 Criar Site para Cliente - Resolver Problema
               </button>
             </div>
          </div>
        </div>
      </section>

       {/* Growth Modules Section */}
       <section style={{ padding: '10rem 2rem', background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.9), rgba(10, 10, 26, 0.8))' }}>
         <div style={{ maxWidth: '1440px', margin: '0 auto' }}>
           <h2 style={{ fontSize: '4.5rem', fontWeight: 800, color: 'white', textAlign: 'center', marginBottom: '0.5rem', lineHeight: 1.1 }}>
             O que seus clientes ganham além do site
           </h2>
           <p style={{ textAlign: 'center', color: '#94a3b8', fontSize: '1.25rem', marginBottom: '3rem' }}>
             Módulos de crescimento inclusos para fazer o negócio dos seus clientes decolar
           </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem', marginBottom: '3rem' }}>
            {[
              { module: 'Loyalty Program', desc: 'Fidelidade automática para aumentar retenção' },
              { module: 'Last-minute Alerts', desc: 'Preencha horários vazios com alertas automáticos' },
              { module: 'Review Automation', desc: 'Avaliações automáticas pós-atendimento' },
              { module: 'WhatsApp Integration', desc: 'Confirmações e lembretes via WhatsApp' },
            ].map((item, i) => (
              <div key={i} style={{ background: 'white', borderRadius: '1rem', padding: '1.5rem', boxShadow: '0 4px 20px rgba(0,0,0,0.08)', border: '1px solid #e5e7eb' }}>
                <div style={{ width: '3rem', height: '3rem', background: 'linear-gradient(to-br, #3b82f6, #8b5cf6)', borderRadius: '0.75rem', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem', color: 'white', fontWeight: 'bold' }}>
                  {i + 1}
                </div>
                <h3 style={{ fontWeight: 'bold', fontSize: '1rem', marginBottom: '0.5rem', color: '#1f2937' }}>{item.module}</h3>
                <p style={{ color: '#6b7280', fontSize: '0.875rem' }}>{item.desc}</p>
              </div>
            ))}
          </div>

          {/* Revenue Model */}
          <div style={{ background: 'linear-gradient(to-r, rgba(34, 197, 94, 0.1), rgba(59, 130, 246, 0.1))', borderRadius: '2rem', padding: '2rem', border: '1px solid rgba(34, 197, 94, 0.2)' }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
              <div style={{ fontSize: '2.5rem' }}>💰</div>
              <div>
                <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#1f2937', marginBottom: '0.5rem' }}>Modelo de Receita Recorrente</h3>
                 <p style={{ color: '#374151', marginBottom: '1rem' }}>
                   Modelo de receita recorrente para suas agências:
                 </p>
                 <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                   <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#16a34a' }}>✓ Setup para cliente: <strong style={{ marginLeft: '0.25rem' }}>R$ 497</strong> (site + configuração + 1º mês)</li>
                   <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#16a34a' }}>✓ Mensalidade por cliente: <strong style={{ marginLeft: '0.25rem' }}>R$ 97/mês</strong> (hospedagem + ferramentas)</li>
                   <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#16a34a' }}>✓ Crescimento médio dos clientes: <strong style={{ marginLeft: '0.25rem' }}>+200% leads</strong> no primeiro ano</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" style={{ padding: '10rem 2rem', backgroundColor: 'rgba(10, 10, 26, 0.5)' }}>
        <div style={{ maxWidth: '1440px', margin: '0 auto' }}>
          <AnimatedElement>
            <div style={{ textAlign: 'center' as const, marginBottom: '8rem' }}>
              <h2 style={{
                fontSize: '4.5rem',
                fontWeight: 800,
                color: 'white',
                marginBottom: '2rem',
                lineHeight: 1.1,
                letterSpacing: '-0.03em',
              }}>
                 O que dizem{' '}
                 <span style={{ background: 'linear-gradient(to right, #c084fc, #fb923c)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                   nossas agências parceiras
                 </span>
              </h2>
               <p style={{ fontSize: '1.5rem', color: '#94a3b8', maxWidth: '56rem', margin: '0 auto', lineHeight: 1.625 }}>
                 Ferramentas: Crawler UXShowcase/Logo Inspiration + Dribbble/Landbook + GSAP animations + 21dev components + IA generativa
               </p>
            </div>
          </AnimatedElement>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2.5rem' }}>
             <TestimonialCard
               name="Carlos Agência"
               role="Fundador"
               company="Agência Web Pro"
               content="Reduzimos o tempo de entrega de sites de 30 dias para 2 minutos! Nossos clientes amam a qualidade premium e nós ganhamos escala."
               avatar="👨"
               rating={5}
             />
             <TestimonialCard
               name="Marina Digital"
               role="Diretora"
               company="Marketing Digital Ltda"
               content="White label perfeito! Entregamos sites $10K para nossos clientes com margem de 80%. A IA faz todo o trabalho pesado."
               avatar="👩"
               rating={5}
             />
             <TestimonialCard
               name="Pedro Tech"
               role="CTO"
               company="Agência de Tecnologia"
               content="API integrada ao nosso CRM. Criamos 50 sites para clientes em uma semana. Melhor investimento da nossa agência!"
               avatar="👨"
               rating={5}
             />
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" style={{ padding: '10rem 2rem', position: 'relative' as const }}>
        <div style={{ maxWidth: '1440px', margin: '0 auto' }}>
          <AnimatedElement>
            <div style={{ textAlign: 'center' as const, marginBottom: '8rem' }}>
              <h2 style={{
                fontSize: '4.5rem',
                fontWeight: 800,
                color: 'white',
                marginBottom: '2rem',
                lineHeight: 1.1,
                letterSpacing: '-0.03em',
              }}>
               Preços para{' '}
               <span style={{ background: 'linear-gradient(to right, #818cf8, #c084fc)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                 agências
               </span>
              </h2>
               <p style={{ fontSize: '1.5rem', color: '#94a3b8', maxWidth: '56rem', margin: '0 auto', lineHeight: 1.625 }}>
                 Escolha o plano ideal para sua agência. White label e margem de lucro de 80%.
               </p>
            </div>
          </AnimatedElement>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2.5rem', maxWidth: '96rem', margin: '0 auto' }}>
             <PricingCard
               title="Starter"
               price="0"
               description="Perfeito para testar a plataforma"
               features={[
                 '1 site para cliente',
                 'Template básico',
                 'Domínio .sites-saas.com',
                 'SSL gratuito',
                 'Suporte por email',
               ]}
               ctaText="Testar Grátis"
             />
             <PricingCard
               title="Professional"
               price="49"
               period="/mês"
               description="Para agências que vendem sites"
               features={[
                 'Sites ilimitados para clientes',
                 'Todos os templates $10K',
                 'White label disponível',
                 'IA Personalizada',
                 'Analytics por cliente',
                 'Suporte prioritário',
               ]}
               popular={true}
               ctaText="Começar Agora"
             />
             <PricingCard
               title="Enterprise"
               price="199"
               period="/mês"
               description="Para agências que escalam alto"
               features={[
                 'Tudo do Professional',
                 'White label completo',
                 'API access + CRM',
                 'Multi-usuários',
                 'SLA garantido',
                 'Gerente de conta dedicado',
               ]}
               ctaText="Falar com Vendas"
             />
          </div>
        </div>
      </section>

      {/* CTA Section Final */}
      <section style={{
        padding: '12rem 2rem',
        textAlign: 'center' as const,
        position: 'relative' as const,
        overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute' as const,
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '1000px',
          height: '1000px',
          background: 'radial-gradient(circle, rgba(79, 70, 229, 0.15), transparent 70%)',
          borderRadius: '50%',
          filter: 'blur(150px)',
          pointerEvents: 'none' as const,
        }} />
        <div style={{ maxWidth: '80rem', margin: '0 auto', position: 'relative' as const, zIndex: 10 }}>
          <AnimatedElement>
            <h2 style={{
              fontSize: '5rem',
              fontWeight: 900,
              color: 'white',
              marginBottom: '2.5rem',
              lineHeight: 1.1,
              letterSpacing: '-0.04em',
            }}>
               Pronto para criar{' '}
               <span style={{
                 background: 'linear-gradient(135deg, #818cf8, #c084fc, #fb923c)',
                 WebkitBackgroundClip: 'text',
                 WebkitTextFillColor: 'transparent',
                 backgroundClip: 'text',
                 display: 'inline',
               }}>
                 sites para clientes?
               </span>
            </h2>
          </AnimatedElement>
          
          <AnimatedElement delay={200}>
            <p style={{
              fontSize: '1.625rem',
              color: '#94a3b8',
              marginBottom: '4rem',
              maxWidth: '64rem',
              margin: '0 auto 4rem',
              lineHeight: 1.625,
            }}>
               Junte-se a centenas de agências que já escalaram seus lucros com nossos sites $10K
            </p>
          </AnimatedElement>
          
          <AnimatedElement delay={400}>
            <Link href="/create" style={{ textDecoration: 'none' }}>
              <button style={{
                background: 'linear-gradient(135deg, #4f46e5, #7c3aed)',
                color: 'white',
                border: 'none',
                padding: '1.75rem 5rem',
                fontSize: '1.625rem',
                borderRadius: '1.5rem',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '1rem',
                fontWeight: 800,
                boxShadow: '0 30px 80px -20px rgba(79, 70, 229, 0.7), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
                transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-5px) scale(1.08)';
                e.currentTarget.style.boxShadow = '0 40px 100px -20px rgba(79, 70, 229, 0.9), inset 0 1px 0 rgba(255, 255, 255, 0.2)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0) scale(1)';
                e.currentTarget.style.boxShadow = '0 30px 80px -20px rgba(79, 70, 229, 0.7), inset 0 1px 0 rgba(255, 255, 255, 0.2)';
              }}
              >
                 <span style={{ fontSize: '2rem' }}>🚀</span>
                 Começar a Vender Sites!
                 <span style={{ fontSize: '2rem' }}>→</span>
              </button>
            </Link>
          </AnimatedElement>
        </div>
      </section>

      {/* Footer Ultra-Premium */}
      <footer style={{
        backgroundColor: 'rgba(2, 6, 23, 0.95)',
        color: '#94a3b8',
        padding: '6rem 2rem 3rem',
        borderTop: '1px solid rgba(51, 65, 85, 0.3)',
      }}>
        <div style={{ maxWidth: '1440px', margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '5rem', flexWrap: 'wrap' as const, gap: '4rem' }}>
            <div style={{ maxWidth: '24rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
                <div style={{
                  width: '3.5rem',
                  height: '3.5rem',
                  background: 'linear-gradient(135deg, #4f46e5, #7c3aed)',
                  borderRadius: '1.25rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                  <span style={{ color: 'white', fontWeight: 900, fontSize: '1.5rem' }}>S</span>
                </div>
                <span style={{ fontWeight: 900, fontSize: '1.75rem', color: 'white' }}>SitesSaaS</span>
              </div>
              <p style={{ color: '#64748b', fontSize: '1rem', lineHeight: 1.625 }}>
                Plataforma para agências criarem sites premium com IA para seus clientes com margem de 80%.
              </p>
            </div>
            
            <div style={{ display: 'flex', gap: '8rem', flexWrap: 'wrap' as const }}>
              {[
                { title: 'PRODUTO', items: ['Criar Site', 'Templates', 'Preços', 'Recursos', 'Integrações'] },
                { title: 'EMPRESA', items: ['Sobre', 'Blog', 'Carreiras', 'Contato', 'Parceiros'] },
                { title: 'SUPORTE', items: ['Central de Ajuda', 'Documentação', 'Status', 'Feedback', 'Comunidade'] },
              ].map((section, i) => (
                <div key={i}>
                  <h4 style={{ color: 'white', fontWeight: 700, marginBottom: '1.5rem', fontSize: '0.875rem', textTransform: 'uppercase' as const, letterSpacing: '0.1em' }}>{section.title}</h4>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                    {section.items.map((item, j) => (
                      <li key={j} style={{ marginBottom: '1rem' }}>
                        <a href="#" style={{ color: '#64748b', textDecoration: 'none', fontSize: '0.875rem', transition: 'color 0.2s ease' }}
                          onMouseEnter={(e) => e.currentTarget.style.color = '#cbd5e1'}
                          onMouseLeave={(e) => e.currentTarget.style.color = '#64748b'}
                        >{item}</a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
          
          <div style={{ borderTop: '1px solid rgba(51, 65, 85, 0.3)', paddingTop: '2.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap' as const, gap: '1rem' }}>
            <div style={{ fontSize: '0.875rem', color: '#64748b' }}>© 2026 SitesSaaS. Todos os direitos reservados.</div>
            <div style={{ display: 'flex', gap: '2rem' }}>
              {['Privacidade', 'Termos', 'Cookies'].map((item, i) => (
                <a key={i} href="#" style={{ color: '#64748b', textDecoration: 'none', fontSize: '0.875rem', transition: 'color 0.2s ease' }}
                  onMouseEnter={(e) => e.currentTarget.style.color = '#cbd5e1'}
                  onMouseLeave={(e) => e.currentTarget.style.color = '#64748b'}
                >{item}</a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
