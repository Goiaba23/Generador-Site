'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

type TransitionVariant = 'fade-up' | 'scale-reveal' | 'slide-right' | 'clip-circle' | 'perspective-rotate';

interface SectionTransitionProps {
  children: React.ReactNode;
  variant?: TransitionVariant;
  delay?: number;
  className?: string;
  style?: React.CSSProperties;
}

const variantConfig: Record<TransitionVariant, gsap.TweenVars> = {
  'fade-up': { opacity: 0, y: 60 },
  'scale-reveal': { opacity: 0, scale: 0.85, y: 30 },
  'slide-right': { opacity: 0, x: -80 },
  'clip-circle': { opacity: 0, clipPath: 'circle(0% at 50% 50%)' },
  'perspective-rotate': { opacity: 0, rotationX: 20, transformPerspective: 1000, y: 40 },
};

export function SectionTransition({
  children, variant = 'fade-up', delay = 0,
  className, style,
}: SectionTransitionProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const vars = {
      ...variantConfig[variant],
      duration: 1.2,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 85%',
        toggleActions: 'play none none reverse',
      },
      delay,
    };

    gsap.from(el, vars);

    return () => {
      ScrollTrigger.getAll().forEach(st => {
        if (st.trigger === el) st.kill();
      });
    };
  }, [variant, delay]);

  return (
    <div ref={ref} className={className} style={style}>
      {children}
    </div>
  );
}

export function StaggerGrid({ children, columns = 3, gap = '1.25rem', delay = 0 }: {
  children: React.ReactNode;
  columns?: number;
  gap?: string;
  delay?: number;
}) {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = gridRef.current;
    if (!el) return;

    const items = el.children;
    gsap.from(items, {
      opacity: 0,
      y: 40,
      scale: 0.95,
      duration: 0.8,
      ease: 'power2.out',
      stagger: 0.08,
      delay,
      scrollTrigger: {
        trigger: el,
        start: 'top 82%',
        toggleActions: 'play none none reverse',
      },
    });
  }, [delay]);

  return (
    <div
      ref={gridRef}
      style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${columns}, 1fr)`,
        gap,
      }}
    >
      {children}
    </div>
  );
}

export function MorphSection({ children, from, className, style }: {
  children: React.ReactNode;
  from?: string;
  className?: string;
  style?: React.CSSProperties;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const content = contentRef.current;
    if (!container || !content) return;

    gsap.set(content, { clipPath: 'circle(0% at 50% 50%)' });

    gsap.to(content, {
      clipPath: 'circle(100% at 50% 50%)',
      duration: 1.5,
      ease: 'power3.inOut',
      scrollTrigger: {
        trigger: container,
        start: 'top 80%',
        end: 'top 30%',
        scrub: 1.5,
      },
    });
  }, []);

  return (
    <div ref={containerRef} className={className} style={{ position: 'relative', ...style }}>
      <div ref={contentRef} style={{ position: 'relative' }}>
        {children}
      </div>
    </div>
  );
}
