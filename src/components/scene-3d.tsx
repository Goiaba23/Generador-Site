'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

interface Scene3DProps {
  variant?: 'hero' | 'section' | 'subtle';
  primaryColor?: string;
  secondaryColor?: string;
}

export function Scene3D({ variant = 'hero', primaryColor = '#7C5CFC', secondaryColor = '#F25C9E' }: Scene3DProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let w = canvas.width = container.clientWidth;
    let h = canvas.height = container.clientHeight;
    const isHero = variant === 'hero';

    const particles: {
      x: number; y: number; z: number;
      vx: number; vy: number; vz: number;
      size: number; alpha: number; color: string;
      orbit: number; orbitSpeed: number; phase: number;
    }[] = [];

    const count = isHero ? 120 : 50;
    const colors = [primaryColor, secondaryColor, '#D4A853', '#6366F1', '#EC4899'];

    for (let i = 0; i < count; i++) {
      particles.push({
        x: (Math.random() - 0.5) * w * 1.5,
        y: (Math.random() - 0.5) * h * 1.5,
        z: Math.random() * 800 - 200,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        vz: (Math.random() - 0.5) * 0.3,
        size: Math.random() * 3 + 1,
        alpha: Math.random() * 0.5 + 0.2,
        color: colors[Math.floor(Math.random() * colors.length)],
        orbit: Math.random() * Math.PI * 2,
        orbitSpeed: (Math.random() - 0.5) * 0.02,
        phase: Math.random() * Math.PI * 2,
      });
    }

    const connections: [number, number][] = [];
    for (let i = 0; i < count; i++) {
      for (let j = i + 1; j < count; j++) {
        if (Math.random() < 0.08) connections.push([i, j]);
      }
    }

    const resize = () => {
      w = canvas.width = container.clientWidth;
      h = canvas.height = container.clientHeight;
    };
    window.addEventListener('resize', resize);

    let animId: number;
    const render = () => {
      ctx.clearRect(0, 0, w, h);

      const mx = (mouseRef.current.x - w / 2) / w;
      const my = (mouseRef.current.y - h / 2) / h;

      particles.forEach(p => {
        p.orbit += p.orbitSpeed;
        p.x += p.vx + Math.sin(p.orbit) * 0.3 + mx * 0.5;
        p.y += p.vy + Math.cos(p.orbit) * 0.3 + my * 0.5;
        p.z += p.vz;

        const halfW = w * 1.5, halfH = h * 1.5;
        if (Math.abs(p.x) > halfW) { p.vx *= -1; p.x = Math.sign(p.x) * halfW * 0.9; }
        if (Math.abs(p.y) > halfH) { p.vy *= -1; p.y = Math.sign(p.y) * halfH * 0.9; }
        if (Math.abs(p.z) > 600) { p.vz *= -1; }

        const perspective = 600 / (600 + p.z);
        const px = p.x * perspective + w / 2 + mx * 30 * perspective;
        const py = p.y * perspective + h / 2 + my * 30 * perspective;
        const size = p.size * perspective;
        const alpha = p.alpha * perspective;

        if (px < -size || px > w + size || py < -size || py > h + size) return;

        ctx.beginPath();
        ctx.arc(px, py, size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = alpha;
        ctx.fill();

        if (isHero) {
          ctx.beginPath();
          ctx.arc(px, py, size * 3, 0, Math.PI * 2);
          ctx.fillStyle = p.color;
          ctx.globalAlpha = alpha * 0.08;
          ctx.fill();
        }
      });

      ctx.globalAlpha = 0.15;
      connections.forEach(([i, j]) => {
        const a = particles[i], b = particles[j];
        const ap = 600 / (600 + a.z), bp = 600 / (600 + b.z);
        const ax = a.x * ap + w / 2 + mx * 30 * ap;
        const ay = a.y * ap + h / 2 + my * 30 * ap;
        const bx = b.x * bp + w / 2 + mx * 30 * bp;
        const by = b.y * bp + h / 2 + my * 30 * bp;
        const dx = ax - bx, dy = ay - by;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 200) {
          ctx.beginPath();
          ctx.moveTo(ax, ay);
          ctx.lineTo(bx, by);
          ctx.strokeStyle = primaryColor;
          ctx.globalAlpha = 0.08 * (1 - dist / 200);
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      });

      ctx.globalAlpha = 1;
      animId = requestAnimationFrame(render);
    };
    render();

    const onMouse = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouseRef.current.x = e.clientX - rect.left;
      mouseRef.current.y = e.clientY - rect.top;
    };
    container.addEventListener('mousemove', onMouse);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
      container.removeEventListener('mousemove', onMouse);
    };
  }, [variant, primaryColor, secondaryColor]);

  return (
    <div ref={containerRef} style={{
      position: 'absolute', inset: 0, zIndex: 0, overflow: 'hidden',
      perspective: '600px', transformStyle: 'preserve-3d',
    }}>
      <canvas ref={canvasRef} style={{ width: '100%', height: '100%', display: 'block' }} />
      <div style={{
        position: 'absolute', inset: 0,
        background: variant === 'hero'
          ? `radial-gradient(ellipse at 30% 20%, ${primaryColor}15 0%, transparent 60%), radial-gradient(ellipse at 70% 80%, ${secondaryColor}10 0%, transparent 60%)`
          : `radial-gradient(ellipse at 50% 50%, ${primaryColor}08 0%, transparent 70%)`,
        pointerEvents: 'none',
      }} />
    </div>
  );
}

function Ring3D({ color = '#7C5CFC', size = 300, speed = 20, delay = 0, style }: {
  color?: string; size?: number; speed?: number; delay?: number; style?: React.CSSProperties;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    gsap.to(ref.current, {
      rotationY: 360,
      duration: speed,
      repeat: -1,
      ease: 'none',
      delay,
    });
    gsap.to(ref.current, {
      rotationX: 5,
      rotationZ: 3,
      duration: 6,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
      delay: delay + 1,
    });
  }, [speed, delay]);

  return (
    <div ref={ref} style={{
      width: size, height: size,
      borderRadius: '50%',
      border: `1.5px solid ${color}22`,
      position: 'absolute',
      transformStyle: 'preserve-3d',
      boxShadow: `0 0 40px ${color}08, inset 0 0 40px ${color}08`,
      ...style,
    }}>
      <div style={{
        position: 'absolute', top: '15%', left: '15%', width: '70%', height: '70%',
        borderRadius: '50%', border: `1px solid ${color}15`,
      }} />
    </div>
  );
}

export function Rings3D({ count = 3, color = '#7C5CFC', style }: {
  count?: number; color?: string; style?: React.CSSProperties;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onMouse = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
      gsap.to(el, { x: x * 20, y: y * 20, duration: 1.5, ease: 'power2.out' });
    };
    el.addEventListener('mousemove', onMouse);
    return () => el.removeEventListener('mousemove', onMouse);
  }, []);

  const rings = Array.from({ length: count });

  return (
    <div ref={ref} style={{
      position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center',
      perspective: '800px', transformStyle: 'preserve-3d', transition: 'transform 0.1s',
      ...style,
    }}>
      {rings.map((_, i) => (
        <Ring3D
          key={i}
          color={color}
          size={200 + i * 60}
          speed={18 - i * 2}
          delay={i * 0.5}
          style={{
            position: 'absolute',
            opacity: 1 - i * 0.15,
            transform: `translateZ(${-i * 30}px)`,
          }}
        />
      ))}
    </div>
  );
}

export function FloatingShape({ children, duration = 6, intensity = 20, style }: {
  children: React.ReactNode; duration?: number; intensity?: number; style?: React.CSSProperties;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    gsap.to(el, {
      y: intensity,
      x: intensity * 0.5,
      rotation: 2,
      duration,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
    });
  }, [duration, intensity]);

  return <div ref={ref} style={style}>{children}</div>;
}

export function GlowOrb({
  color = '#7C5CFC', size = 300, blur = 100, top = '50%', left = '50%',
  speed = 8, intensity = 30,
}: {
  color?: string; size?: number; blur?: number; top?: string; left?: string;
  speed?: number; intensity?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    gsap.to(el, {
      x: intensity, y: intensity * 0.6,
      duration: speed, repeat: -1, yoyo: true, ease: 'sine.inOut',
    });
    gsap.to(el, {
      scale: 1.1,
      duration: speed * 0.7, repeat: -1, yoyo: true, ease: 'sine.inOut',
      delay: speed * 0.3,
    });
  }, [speed, intensity]);

  return (
    <div ref={ref} style={{
      position: 'absolute', top, left, width: size, height: size, marginLeft: -size / 2, marginTop: -size / 2,
      borderRadius: '50%',
      background: `radial-gradient(circle, ${color}12 0%, ${color}08 40%, transparent 70%)`,
      filter: `blur(${blur}px)`,
      pointerEvents: 'none',
      transformStyle: 'preserve-3d',
    }} />
  );
}
