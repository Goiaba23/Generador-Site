'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface Scene3DProps {
  variant?: 'hero' | 'subtle';
}

export function Scene3D({ variant = 'subtle' }: Scene3DProps) {
  return null;
}

// CSS 3D Cube that anyone can see - rotates in perspective
export function Cube3D({ size = 120, speed = 12 }: { size?: number; speed?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const half = size / 2;

  useEffect(() => {
    if (!ref.current) return;
    gsap.to(ref.current, {
      rotationX: 360, rotationY: 360,
      duration: speed, repeat: -1, ease: 'none',
    });
  }, [speed]);

  const face = (label: string, transform: string, color: string) => (
    <div style={{
      position: 'absolute', width: size, height: size,
      background: color, border: '1px solid rgba(255,255,255,0.15)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontWeight: 800, fontSize: '1.25rem', color: 'rgba(255,255,255,0.7)',
      backdropFilter: 'blur(8px)', transform,
    }}>{label}</div>
  );

  return (
    <div ref={ref} style={{
      width: size, height: size, position: 'relative',
      transformStyle: 'preserve-3d', willChange: 'transform',
    }}>
      {face('C', `translateZ(${half}px)`, 'rgba(6,182,212,0.25)')}
      {face('Y', `rotateY(180deg) translateZ(${half}px)`, 'rgba(59,130,246,0.25)')}
      {face('A', `rotateY(-90deg) translateZ(${half}px)`, 'rgba(6,182,212,0.25)')}
      {face('N', `rotateY(90deg) translateZ(${half}px)`, 'rgba(212,165,116,0.25)')
}
      {face('S', `rotateX(90deg) translateZ(${half}px)`, 'rgba(59,130,246,0.25)')}
      {face('T', `rotateX(-90deg) translateZ(${half}px)`, 'rgba(6,182,212,0.25)')}
    </div>
  );
}

// 3D Card Flip on hover
export function FlipCard3D({ front, back, style }: {
  front: React.ReactNode; back: React.ReactNode; style?: React.CSSProperties;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    gsap.from(ref.current, {
      opacity: 0, y: 40, duration: 1, ease: 'power3.out',
      scrollTrigger: { trigger: ref.current, start: 'top 85%' },
    });
  }, []);

  return (
    <div style={{ perspective: '1000px', ...style }}>
      <div ref={ref} className="flip-card-3d" style={{
        position: 'relative', width: '100%', height: '280px',
        transformStyle: 'preserve-3d', transition: 'transform 0.8s cubic-bezier(0.22,1,0.36,1)',
        cursor: 'pointer',
      }}>
        <div style={{
          position: 'absolute', inset: 0, backfaceVisibility: 'hidden',
          borderRadius: '1.25rem', overflow: 'hidden',
        }}>{front}</div>
        <div style={{
          position: 'absolute', inset: 0, backfaceVisibility: 'hidden',
          transform: 'rotateY(180deg)', borderRadius: '1.25rem', overflow: 'hidden',
        }}>{back}</div>
      </div>
      <style>{`
        .flip-card-3d:hover { transform: rotateY(180deg); }
      `}</style>
    </div>
  );
}

// 3D Tilt Card that follows mouse
export function TiltCard3D({ children, style }: {
  children: React.ReactNode; style?: React.CSSProperties;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      const x = ((e.clientX - r.left) / r.width - 0.5) * 2;
      const y = ((e.clientY - r.top) / r.height - 0.5) * 2;
      el.style.transform = `perspective(800px) rotateX(${-y * 8}deg) rotateY(${x * 8}deg)`;
    };
    const onLeave = () => { el.style.transform = 'perspective(800px) rotateX(0) rotateY(0)'; };
    el.addEventListener('mousemove', onMove);
    el.addEventListener('mouseleave', onLeave);
    return () => { el.removeEventListener('mousemove', onMove); el.removeEventListener('mouseleave', onLeave); };
  }, []);

  return <div ref={ref} style={{ transition: 'transform 0.1s ease', transformStyle: 'preserve-3d', ...style }}>{children}</div>;
}

// Depth layers that spread apart on scroll
export function DepthStack({ layers }: { layers: { content: React.ReactNode; depth: number }[] }) {
  return (
    <div style={{ perspective: '1000px', transformStyle: 'preserve-3d', position: 'relative', height: '300px' }}>
      {layers.map((l, i) => (
        <div
          key={i}
          className={`depth-layer-${i}`}
          style={{
            position: 'absolute', inset: 0,
            transform: `translateZ(${l.depth}px)`,
            transformStyle: 'preserve-3d',
            willChange: 'transform',
          }}
        >{l.content}</div>
      ))}
    </div>
  );
}

// Glow orbs floating with GSAP (pure CSS, guaranteed visible)
export function GlowOrbs() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const orbs = ref.current.querySelectorAll('.glow-orb');
    orbs.forEach((orb, i) => {
      gsap.to(orb, {
        y: i % 2 === 0 ? 30 : -30,
        x: i % 3 === 0 ? 20 : -20,
        scale: 1.05,
        duration: 5 + i,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: i * 0.7,
      });
    });
  }, []);

  return (
    <div ref={ref} style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0, overflow: 'hidden', perspective: '800px' }}>
      <div className="glow-orb" style={{
        position: 'absolute', top: '15%', left: '10%', width: '400px', height: '400px',
        borderRadius: '50%', background: 'radial-gradient(circle, rgba(6,182,212,0.12) 0%, transparent 70%)',
        filter: 'blur(80px)', willChange: 'transform',
      }} />
      <div className="glow-orb" style={{
        position: 'absolute', bottom: '10%', right: '15%', width: '350px', height: '350px',
        borderRadius: '50%', background: 'radial-gradient(circle, rgba(59,130,246,0.1) 0%, transparent 70%)',
        filter: 'blur(90px)', willChange: 'transform',
      }} />
      <div className="glow-orb" style={{
        position: 'absolute', top: '50%', right: '30%', width: '250px', height: '250px',
        borderRadius: '50%', background: 'radial-gradient(circle, rgba(212,165,116,0.08) 0%, transparent 70%)',
        filter: 'blur(70px)', willChange: 'transform',
      }} />
      <div className="glow-orb" style={{
        position: 'absolute', bottom: '35%', left: '25%', width: '300px', height: '300px',
        borderRadius: '50%', background: 'radial-gradient(circle, rgba(59,130,246,0.06) 0%, transparent 70%)',
        filter: 'blur(100px)', willChange: 'transform',
      }} />
    </div>
  );
}

// Parallax section with depth layers
export function ParallaxLayer({ children, speed = 0.5, style }: {
  children: React.ReactNode; speed?: number; style?: React.CSSProperties;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    gsap.to(el, {
      y: () => -(el.offsetHeight * speed),
      ease: 'none',
      scrollTrigger: {
        trigger: el.parentElement || el,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
    });
  }, [speed]);

  return <div ref={ref} style={{ willChange: 'transform', ...style }}>{children}</div>;
}

// GSAP Scroll Animation wrapper
export function ScrollReveal({ children, direction = 'up', style }: {
  children: React.ReactNode; direction?: 'up' | 'left' | 'right' | 'scale'; style?: React.CSSProperties;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const vars: gsap.TweenVars = { opacity: 0, duration: 1, ease: 'power3.out' };
    if (direction === 'up') vars.y = 60;
    else if (direction === 'left') vars.x = -60;
    else if (direction === 'right') vars.x = 60;
    else if (direction === 'scale') { vars.scale = 0.8; vars.y = 30; }
    gsap.from(el, {
      ...vars,
      scrollTrigger: { trigger: el, start: 'top 85%' },
    });
  }, [direction]);

  return <div ref={ref} style={style}>{children}</div>;
}
