'use client';

import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ProblemSolutionSection from '@/components/ProblemSolutionSection';
import GrowthModulesSection from '@/components/GrowthModulesSection';

gsap.registerPlugin(ScrollTrigger);

type Theme = 'dark' | 'light';

const COLORS = {
  dark: {
    bgPrimary: '#030308',
    bgSecondary: '#080812',
    bgCard: 'rgba(20, 20, 35, 0.6)',
    bgCardHover: 'rgba(30, 30, 50, 0.8)',
    textPrimary: '#FAFAFA',
    textSecondary: '#A1A1AA',
    textMuted: '#52525B',
    accent: '#A855F7',
    accentSecondary: '#6366F1',
    accentGlow: 'rgba(168, 85, 247, 0.4)',
    border: 'rgba(255, 255, 255, 0.08)',
    borderHover: 'rgba(168, 85, 247, 0.5)',
    gradient: 'linear-gradient(135deg, #A855F7, #6366F1, #8B5CF6)',
    gradientText: 'linear-gradient(135deg, #A855F7, #6366F1)',
  },
  light: {
    bgPrimary: '#FAFAFA',
    bgSecondary: '#F4F4F5',
    bgCard: 'rgba(255, 255, 255, 0.8)',
    bgCardHover: '#FFFFFF',
    textPrimary: '#18181B',
    textSecondary: '#52525B',
    textMuted: '#A1A1AA',
    accent: '#9333EA',
    accentSecondary: '#4F46E5',
    accentGlow: 'rgba(147, 51, 234, 0.2)',
    border: 'rgba(0, 0, 0, 0.08)',
    borderHover: 'rgba(147, 51, 234, 0.5)',
    gradient: 'linear-gradient(135deg, #9333EA, #4F46E5)',
    gradientText: 'linear-gradient(135deg, #9333EA, #4F46E5)',
  },
};

function getColors(theme: Theme) {
  return COLORS[theme];
}

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
      const eased = 1 - Math.pow(1 - progress, 3);
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
      <div style={{ fontSize: '1rem', color: '#94a3b8', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.1em' }}>{label}</div>
    </div>
  );
}

function AnimatedElement({ children, delay = 0, direction = 'up' }: { children: React.ReactNode; delay?: number; direction?: 'up' | 'left' | 'right' | 'scale' }) {
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
    }}>
      {children}
    </div>
  );
}

function FeatureCard({ icon, title, description, features, delay = 0 }: { icon: React.ReactNode; title: string; description: string; features: string[]; delay?: number }) {
  const [isHovered, setIsHovered] = useState(false);
  const { ref, isVisible } = useAnimation(delay);
  
  return (
    <div
      ref={ref}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible 
          ? (isHovered ? 'translateY(-12px) scale(1.02)' : 'translateY(0) scale(1)') 
          : 'translateY(30px)',
        transition: 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
        background: isHovered ? 'rgba(30, 30, 50, 0.8)' : 'rgba(20, 20, 35, 0.6)',
        border: isHovered ? '1px solid rgba(168, 85, 247, 0.4)' : '1px solid rgba(255, 255, 255, 0.08)',
        borderRadius: '1.5rem',
        padding: '2.5rem',
        cursor: 'pointer',
        position: 'relative',
        overflow: 'hidden',
        backdropFilter: 'blur(20px)',
        boxShadow: isHovered ? '0 30px 60px -15px rgba(168, 85, 247, 0.3)' : 'none',
      }}
    >
      {isHovered && (
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
      <div style={{ marginBottom: '1.5rem', position: 'relative', zIndex: 1 }}>{icon}</div>
      <h3 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#FAFAFA', marginBottom: '0.75rem', position: 'relative', zIndex: 1 }}>{title}</h3>
      <p style={{ color: '#A1A1AA', lineHeight: 1.625, marginBottom: '1.5rem', position: 'relative', zIndex: 1, fontSize: '0.9375rem' }}>{description}</p>
      <ul style={{ listStyle: 'none', padding: 0, margin: 0, position: 'relative', zIndex: 1 }}>
        {features.map((feature, i) => (
          <li key={i} style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '0.75rem', 
            marginBottom: '0.625rem', 
            color: isHovered ? '#D4D4D8' : '#A1A1AA',
            fontSize: '0.875rem',
            transition: 'color 0.3s ease',
          }}>
            <span style={{ color: '#A855F7', fontSize: '1rem', flexShrink: 0 }}>✓</span>
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
        position: 'relative',
        overflow: 'hidden',
        transition: 'all 0.4s ease',
        transform: isHovered ? 'translateY(-8px)' : 'translateY(0)',
        boxShadow: isHovered ? '0 20px 40px -10px rgba(0, 0, 0, 0.3)' : 'none',
      }}
    >
      <div style={{ position: 'absolute', top: '1.5rem', right: '2rem', fontSize: '5rem', color: 'rgba(129, 140, 248, 0.15)', fontFamily: 'serif', lineHeight: 1, pointerEvents: 'none' }}>"</div>
      <div style={{ display: 'flex', gap: '0.25rem', marginBottom: '1.5rem' }}>
        {Array(rating).fill(0).map((_, i) => (
          <span key={i} style={{ color: '#fbbf24', fontSize: '1.25rem' }}>★</span>
        ))}
      </div>
      <p style={{ color: '#cbd5e1', lineHeight: 1.75, marginBottom: '2rem', fontSize: '1.125rem', fontStyle: 'italic', position: 'relative', zIndex: 1 }}>{content}</p>
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
  const { ref, isVisible } = useAnimation(0);
  
  return (
    <div
      ref={ref}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible 
          ? (isHovered ? 'translateY(-12px) scale(1.03)' : 'translateY(0) scale(1)') 
          : 'translateY(30px)',
        transition: 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
        background: popular 
          ? 'linear-gradient(135deg, rgba(79, 70, 229, 0.2), rgba(124, 58, 237, 0.15))' 
          : 'linear-gradient(135deg, rgba(30, 41, 59, 0.8), rgba(15, 23, 42, 0.9))',
        border: popular ? '2px solid rgba(129, 140, 248, 0.6)' : '1px solid rgba(51, 65, 85, 0.5)',
        borderRadius: '2rem',
        padding: '3rem',
        position: 'relative',
        boxShadow: isHovered ? (popular ? '0 40px 80px -20px rgba(79, 70, 229, 0.3)' : '0 30px 60px -15px rgba(0, 0, 0, 0.2)') : 'none',
      }}
    >
      {popular && (
        <div style={{
          position: 'absolute',
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
          textTransform: 'uppercase',
          boxShadow: '0 8px 24px rgba(79, 70, 229, 0.4)',
        }}>
          MAIS POPULAR
        </div>
      )}
      <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
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

function ThreeBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let mouseX = 0;
    let mouseY = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const particles: Array<{
      x: number;
      y: number;
      radius: number;
      vx: number;
      vy: number;
      color: string;
    }> = [];

    const colors = ['#6366F1', '#8B5CF6', '#A78BFA', '#C084FC', '#06B6D4'];

    for (let i = 0; i < 100; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 2 + 0.5,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };
    window.addEventListener('mousemove', handleMouseMove);

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p, i) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        const dx = mouseX - p.x;
        const dy = mouseY - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 150) {
          const angle = Math.atan2(dy, dx);
          p.x -= Math.cos(angle) * 0.5;
          p.y -= Math.sin(angle) * 0.5;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = 0.6;
        ctx.fill();

        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const d = Math.sqrt((p.x - p2.x) ** 2 + (p.y - p2.y) ** 2);
          if (d < 100) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = p.color;
            ctx.globalAlpha = 0.1 * (1 - d / 100);
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 0,
      }}
    />
  );
}

export default function Home() {
  const [scrollY, setScrollY] = useState(0);
  const [theme, setTheme] = useState<Theme>('dark');
  const colors = getColors(theme);
  const mainRef = useRef<HTMLElement>(null);
  
  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };
  
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    const ctx = gsap.context(() => {
      gsap.from('.hero-animate', {
        y: 100,
        opacity: 0,
        duration: 1.2,
        stagger: 0.2,
        ease: 'power3.out',
      });
      
      gsap.from('.feature-card', {
        scrollTrigger: {
          trigger: '.features-section',
          start: 'top 80%',
        },
        y: 80,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power2.out',
      });
      
      gsap.from('.pricing-card', {
        scrollTrigger: {
          trigger: '.pricing-section',
          start: 'top 80%',
        },
        y: 50,
        opacity: 0,
        duration: 0.6,
        stagger: 0.15,
        ease: 'back.out(1.7)',
      });
      
      gsap.from('.testimonial-card', {
        scrollTrigger: {
          trigger: '.testimonials-section',
          start: 'top 75%',
        },
        x: -40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power2.out',
      });
      
      gsap.to('.floating-orbs', {
        scrollTrigger: {
          trigger: 'body',
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1,
        },
        y: -200,
        ease: 'none',
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
    <main ref={mainRef} style={{ backgroundColor: colors.bgPrimary, minHeight: '100vh', color: colors.textPrimary, overflowX: 'hidden' }}>
      <ThreeBackground />
      
      <div style={{ position: 'fixed', top: '-25%', left: '-15%', width: '1000px', height: '1000px', background: 'radial-gradient(circle, rgba(168, 85, 247, 0.12), transparent 60%)', borderRadius: '50%', filter: 'blur(100px)', pointerEvents: 'none', zIndex: 0 }} className="floating-orbs" />
      <div style={{ position: 'fixed', top: '15%', right: '-20%', width: '1100px', height: '1100px', background: 'radial-gradient(circle, rgba(99, 102, 241, 0.1), transparent 60%)', borderRadius: '50%', filter: 'blur(100px)', pointerEvents: 'none', zIndex: 0 }} className="floating-orbs" />
      <div style={{ position: 'fixed', bottom: '5%', left: '25%', width: '800px', height: '800px', background: 'radial-gradient(circle, rgba(236, 72, 153, 0.06), transparent 60%)', borderRadius: '50%', filter: 'blur(100px)', pointerEvents: 'none', zIndex: 0 }} className="floating-orbs" />
      
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(99, 102, 241, 0.03) 1px, transparent 0)',
        backgroundSize: '48px 48px',
        pointerEvents: 'none',
        opacity: 0.4,
        zIndex: 0,
      }} />

      <nav style={{
        position: 'fixed',
        top: 0,
        width: '100%',
        background: scrollY > 50 ? `${colors.bgSecondary}ee` : `${colors.bgSecondary}cc`,
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
            }}>
              <span style={{ color: 'white', fontWeight: 900, fontSize: '1.5rem', letterSpacing: '-0.05em' }}>S</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
              <span style={{ fontWeight: 900, fontSize: '1.75rem', background: 'linear-gradient(to right, #ffffff, #e2e8f0)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', letterSpacing: '-0.03em', lineHeight: 1.2 }}>SitesSaaS</span>
              <span style={{ fontSize: '0.625rem', color: '#818cf8', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', lineHeight: 1 }}>PLATFORM</span>
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
                >
                  Meus Sites
                </button>
              </Link>
              
              <Link href="/create" style={{ textDecoration: 'none' }}>
                <button style={{
                  background: 'linear-gradient(135deg, #4f46e5, #7c3aed)',
                  border: 'none',
                  color: 'white',
                  padding: '0.75rem 1.5rem',
                  borderRadius: '0.75rem',
                  cursor: 'pointer',
                  fontSize: '0.875rem',
                  fontWeight: 600,
                  boxShadow: '0 8px 24px rgba(79, 70, 229, 0.4)',
                  transition: 'all 0.2s ease',
                }}>
                  Criar Site
                </button>
              </Link>
              
              <ThemeToggle theme={theme} onClick={toggleTheme} />
            </div>
          </div>
        </div>
      </nav>

      <section style={{ position: 'relative', zIndex: 1, padding: '14rem 2rem 10rem', textAlign: 'center', maxWidth: '1400px', margin: '0 auto' }}>
        <AnimatedElement delay={100}>
          <div style={{ 
            display: 'inline-flex', 
            alignItems: 'center', 
            gap: '0.75rem', 
            padding: '0.75rem 1.5rem',
            background: 'rgba(168, 85, 247, 0.1)',
            border: '1px solid rgba(168, 85, 247, 0.3)',
            borderRadius: '9999px',
            color: '#A855F7',
            fontSize: '0.875rem',
            fontWeight: 600,
            letterSpacing: '0.02em',
            marginBottom: '2rem',
            backdropFilter: 'blur(10px)',
          }}>
            <span style={{ 
              width: '8px', 
              height: '8px', 
              background: '#A855F7', 
              borderRadius: '50%',
              boxShadow: '0 0 12px rgba(168, 85, 247, 0.8)',
              animation: 'pulse 2s ease-in-out infinite',
            }} />
            Novo: Crie sites premium com IA generativa
          </div>
        </AnimatedElement>
        
        <AnimatedElement delay={200}>
          <h1 style={{ 
            fontSize: 'clamp(3rem, 8vw, 7rem)', 
            fontWeight: 900, 
            lineHeight: 1.05, 
            marginBottom: '2rem', 
            letterSpacing: '-0.04em',
            background: 'linear-gradient(135deg, #FAFAFA 0%, #A1A1AA 50%, #A855F7 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}>
            Transforme clientes<br/>
            em ouro<span style={{ color: '#A855F7' }}>.</span>
          </h1>
        </AnimatedElement>
        
        <AnimatedElement delay={300}>
          <p style={{ 
            fontSize: '1.375rem', 
            color: '#A1A1AA', 
            maxWidth: '720px', 
            margin: '0 auto 3rem', 
            lineHeight: 1.7,
            fontWeight: 400,
          }}>
            A plataforma que cria sites <span style={{ color: '#A855F7', fontWeight: 600 }}>$10K</span> para seus clientes em 2 minutos. 
            IA alimentada por dados reais do Dribbble, Landbook e UXShowcase.
          </p>
        </AnimatedElement>
        
        <AnimatedElement delay={400}>
          <div style={{ display: 'flex', gap: '1.25rem', justifyContent: 'center', flexWrap: 'wrap' }} className="hero-animate">
            <Link href="/create" style={{ textDecoration: 'none' }}>
              <button style={{
                background: 'linear-gradient(135deg, #A855F7, #6366F1)',
                border: 'none',
                color: 'white',
                padding: '1.125rem 2.75rem',
                borderRadius: '1rem',
                fontSize: '1.125rem',
                fontWeight: 700,
                cursor: 'pointer',
                boxShadow: '0 16px 48px rgba(168, 85, 247, 0.4), 0 0 0 1px rgba(168, 85, 247, 0.2) inset',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                position: 'relative',
                overflow: 'hidden',
              }}>
                <span style={{ position: 'relative', zIndex: 1, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                  </svg>
                  Criar Site Agora
                </span>
              </button>
            </Link>
            <a href="#features" style={{ textDecoration: 'none' }}>
              <button style={{
                background: 'rgba(255, 255, 255, 0.03)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                color: '#FAFAFA',
                padding: '1.125rem 2.75rem',
                borderRadius: '1rem',
                fontSize: '1.125rem',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                backdropFilter: 'blur(10px)',
              }}>
                Ver Recursos
              </button>
            </a>
          </div>
        </AnimatedElement>

        <BentoMetrics theme={theme} />
      </section>

      <section id="features" className="features-section" style={{ position: 'relative', zIndex: 1, padding: '10rem 2rem', maxWidth: '1400px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
          <div style={{ 
            display: 'inline-block',
            padding: '0.5rem 1.25rem',
            background: 'rgba(168, 85, 247, 0.1)',
            border: '1px solid rgba(168, 85, 247, 0.2)',
            borderRadius: '9999px',
            color: '#A855F7',
            fontSize: '0.875rem',
            fontWeight: 600,
            marginBottom: '1.5rem',
          }}>
            ⚡ RECURSOS PREMIUM 2026
          </div>
          <h2 style={{ 
            fontSize: 'clamp(2.5rem, 5vw, 4rem)', 
            fontWeight: 900, 
            marginBottom: '1.5rem',
            letterSpacing: '-0.02em',
          }}>
            Tudo para criar <span style={{ background: 'linear-gradient(135deg, #A855F7, #6366F1)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>sites $10K</span>
          </h2>
          <p style={{ fontSize: '1.25rem', color: '#A1A1AA', maxWidth: '600px', margin: '0 auto' }}>
            A ferramenta completa que agências profissionais usam para entregar projetos premium
          </p>
        </div>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem' }}>
          <div className="feature-card" style={{ gridColumn: 'span 2' }}>
            <FeatureCard 
              icon={<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#A855F7" strokeWidth="1.5"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>}
              title="IA Generativa"
              description="IA alimentada por dados reais do Dribbble, Landbook e UXShowcase. Cria sites baseados em tendências internacionais."
              features={['Crawler YouTube/Dribbble', 'Análise de concorrência real', 'Copywriting automático por nicho']}
              delay={0}
            />
          </div>
          <div className="feature-card">
            <FeatureCard 
              icon={<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#A855F7" strokeWidth="1.5"><path d="M12 2v20M2 12h20M3 3l18 18M21 3L3 21"/></svg>}
              title="GSAP Animations"
              description="Animações scroll-triggered, parallax e hover effects com GSAP."
              features={['ScrollTrigger', 'Parallax effects', 'Smooth transitions']}
              delay={100}
            />
          </div>
          <div className="feature-card">
            <FeatureCard 
              icon={<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#A855F7" strokeWidth="1.5"><circle cx="12" cy="12" r="10"/><path d="M12 2a15 15 0 0 1 4 10 15 15 0 0 1-4 10M12 2a15 15 0 0 0 4 10"/></svg>}
              title="3D Interativo"
              description="Three.js particles que respondem ao mouse do usuário."
              features={['Three.js background', 'Mouse parallax', 'Responsivo']}
              delay={200}
            />
          </div>
        </div>
      </section>

      <section id="pricing" className="pricing-section" style={{ position: 'relative', zIndex: 1, padding: '10rem 2rem', maxWidth: '1400px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
          <div style={{ 
            display: 'inline-block',
            padding: '0.5rem 1.25rem',
            background: 'rgba(168, 85, 247, 0.1)',
            border: '1px solid rgba(168, 85, 247, 0.2)',
            borderRadius: '9999px',
            color: '#A855F7',
            fontSize: '0.875rem',
            fontWeight: 600,
            marginBottom: '1.5rem',
          }}>
            💰 PLANOS
          </div>
          <h2 style={{ 
            fontSize: 'clamp(2.5rem, 5vw, 4rem)', 
            fontWeight: 900, 
            marginBottom: '1.5rem',
            letterSpacing: '-0.02em',
          }}>
            Escolha seu <span style={{ background: 'linear-gradient(135deg, #A855F7, #6366F1)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>plano</span>
          </h2>
          <p style={{ fontSize: '1.25rem', color: '#A1A1AA', maxWidth: '600px', margin: '0 auto' }}>
            White label completo. Margem de 80% em todos os planos.
          </p>
        </div>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem', alignItems: 'center' }}>
          <PricingCard 
            title="Starter"
            price="0"
            description="Perfeito para testar a plataforma"
            features={['1 site para cliente', 'Template básico', 'Domínio .sites-saas.com', 'SSL gratuito']}
          />
          <PricingCard 
            title="Professional"
            price="49"
            period="/mês"
            description="Para agências que vendem sites"
            features={['Sites ilimitados', 'Todos os templates $10K', 'White label', 'IA Personalizada', 'Analytics']}
            popular={true}
          />
          <PricingCard 
            title="Enterprise"
            price="199"
            period="/mês"
            description="Para escalar alto"
            features={['Tudo do Professional', 'White label completo', 'API access', 'Multi-usuários', 'SLA garantido']}
          />
        </div>
      </section>

      <section id="testimonials" className="testimonials-section" style={{ position: 'relative', zIndex: 1, padding: '10rem 2rem', maxWidth: '1400px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
          <div style={{ 
            display: 'inline-block',
            padding: '0.5rem 1.25rem',
            background: 'rgba(168, 85, 247, 0.1)',
            border: '1px solid rgba(168, 85, 247, 0.2)',
            borderRadius: '9999px',
            color: '#A855F7',
            fontSize: '0.875rem',
            fontWeight: 600,
            marginBottom: '1.5rem',
          }}>
            💬 DEPOIMENTOS
          </div>
          <h2 style={{ 
            fontSize: 'clamp(2.5rem, 5vw, 4rem)', 
            fontWeight: 900, 
            marginBottom: '1.5rem',
            letterSpacing: '-0.02em',
          }}>
            O que <span style={{ background: 'linear-gradient(135deg, #A855F7, #6366F1)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>dizem</span>
          </h2>
          <p style={{ fontSize: '1.25rem', color: '#A1A1AA', maxWidth: '600px', margin: '0 auto' }}>
            Agências que já tripled their receita com sites premium
          </p>
        </div>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
          <TestimonialCard 
            name="Carlos"
            role="Fundador"
            company="Agência Web Pro"
            avatar="👨"
            content="Reduzimos o tempo de entrega de sites de 30 dias para 2 minutos! Nossos clientes amam a qualidade premium."
          />
          <TestimonialCard 
            name="Marina"
            role="Diretora"
            company="Marketing Digital Ltda"
            avatar="👩"
            content="White label perfeito! Entregamos sites $10K para nossos clientes com margem de 80%. A IA faz todo o trabalho pesado."
          />
          <TestimonialCard 
            name="Pedro"
            role="CTO"
            company="Agência de Tecnologia"
            avatar="👨‍💻"
            content="API integrada ao nosso CRM. Criamos 50 sites para clientes em uma semana. Melhor investimento da nossa agência!"
          />
        </div>
      </section>

      <footer style={{ position: 'relative', zIndex: 1, padding: '4rem 2rem', borderTop: '1px solid rgba(51, 65, 85, 0.5)', textAlign: 'center' }}>
        <p style={{ color: '#64748b', fontSize: '0.875rem' }}>© 2026 SitesSaaS. Todos os direitos reservados.</p>
      </footer>
    </main>
  );
}