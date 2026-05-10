'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { GlowOrbs, Cube3D, ScrollReveal, TiltCard3D } from '@/components/scene-3d';
import NicheScene3D from '@/components/NicheScene3D';
import ProductViewer3D from '@/components/ProductViewer3D';
import { SectionTransition, StaggerGrid, MorphSection } from '@/components/SectionTransition';

gsap.registerPlugin(ScrollTrigger);

const palette = {
  bg: '#07070E', surface: '#0E0E18', elevated: '#161622',
  text: '#EEEEF5', muted: '#808098',
  primary: '#06B6D4', accent: '#D4A574', gold: '#3B82F6',
  border: 'rgba(255,255,255,0.06)', glass: 'rgba(255,255,255,0.03)',
  gradient: 'linear-gradient(135deg, #06B6D4, #3B82F6)',
};

function AnimatedSection({ children, className, style }: {
  children: React.ReactNode; className?: string; style?: React.CSSProperties;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    gsap.from(el, {
      opacity: 0, y: 60, duration: 1, ease: 'power3.out',
      scrollTrigger: { trigger: el, start: 'top 85%' },
    });
  }, []);
  return <div ref={ref} className={className} style={style}>{children}</div>;
}

function GlassCard({ children, hover = true, style }: {
  children: React.ReactNode; hover?: boolean; style?: React.CSSProperties;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    gsap.from(ref.current, { opacity: 0, y: 30, scale: 0.95, duration: 0.8, ease: 'power3.out', scrollTrigger: { trigger: ref.current, start: 'top 85%' } });
  }, []);
  return (
    <div ref={ref} style={{
      background: palette.glass, border: `1px solid ${palette.border}`,
      borderRadius: '1.25rem', padding: '2rem',
      backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)',
      transition: hover ? 'all 0.4s cubic-bezier(0.22,1,0.36,1)' : 'none',
      ...style,
    }} onMouseEnter={e => hover && gsap.to(e.currentTarget, { y: -6, borderColor: `${palette.primary}44`, duration: 0.3 })}
      onMouseLeave={e => hover && gsap.to(e.currentTarget, { y: 0, borderColor: palette.border, duration: 0.3 })}>
      {children}
    </div>
  );
}

function Nav3D() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
      padding: scrolled ? '0.75rem 2rem' : '1.25rem 2rem',
      background: scrolled ? 'rgba(6,6,14,0.85)' : 'transparent',
      backdropFilter: scrolled ? 'blur(30px) saturate(180%)' : 'none',
      borderBottom: scrolled ? '1px solid rgba(255,255,255,0.04)' : '1px solid transparent',
      transition: 'all 0.5s cubic-bezier(0.22,1,0.36,1)',
    }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Link href="/" style={{ fontSize: '1.25rem', fontWeight: 800, color: palette.text, textDecoration: 'none', letterSpacing: '-0.03em' }}>
          <span style={{ background: palette.gradient, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Studio</span>
        </Link>
        <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
          <Link href="/sites" style={{ color: palette.muted, textDecoration: 'none', fontSize: '0.85rem', fontWeight: 500 }}>Projects</Link>
          <Link href="/create" style={{
            padding: '0.5rem 1.25rem', borderRadius: '999px', background: palette.gradient,
            color: '#fff', textDecoration: 'none', fontSize: '0.8rem', fontWeight: 700,
          }}>Create</Link>
        </div>
      </div>
    </nav>
  );
}

function Hero3D({ title, subtitle, niche }: { title: string; subtitle: string; niche?: string }) {
  const isRetail = niche === 'RETAIL';
  const isTech = niche === 'TECH';
  return (
    <section style={{
      position: 'relative', minHeight: '90vh', display: 'flex', alignItems: 'center',
      overflow: 'hidden', paddingTop: '5rem',
    }}>
      <div style={{
        position: 'absolute', right: '5%', top: '50%', transform: 'translateY(-50%)',
        zIndex: 2, opacity: 0.6, width: '280px', height: '280px',
      }}>
        {isRetail ? (
          <ProductViewer3D height={280} />
        ) : (
          <Cube3D size={200} speed={20} />
        )}
      </div>

      <div style={{ position: 'relative', zIndex: 3, maxWidth: '800px', margin: '0 auto', padding: '0 2rem', width: '100%' }}>
        <ScrollReveal direction="up">
          <div style={{
            display: 'inline-block', padding: '0.35rem 1rem', borderRadius: '999px',
            background: 'rgba(124,92,252,0.12)', border: '1px solid rgba(124,92,252,0.25)',
            color: palette.primary, fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.08em',
            marginBottom: '1.5rem',
          }}>
            ✦ PREMIUM SITE
          </div>
        </ScrollReveal>
        <h1 style={{
          fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', fontWeight: 900,
          letterSpacing: '-0.04em', lineHeight: 1.05, marginBottom: '1.25rem',
          color: palette.text,
        }}>
          {title || 'Your Premium Site'}
        </h1>
        <p style={{
          fontSize: 'clamp(1rem, 2vw, 1.25rem)', color: palette.muted,
          maxWidth: '560px', lineHeight: 1.7, marginBottom: '2.5rem',
        }}>
          {subtitle || 'A premium digital experience crafted with cutting-edge design'}
        </p>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <a href="#sections" style={{
            padding: '0.85rem 2rem', borderRadius: '999px', border: 'none',
            background: palette.gradient, color: '#fff', fontWeight: 700, fontSize: '0.9rem',
            textDecoration: 'none', boxShadow: `0 8px 32px ${palette.primary}40`,
            display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
          }}>
            Explore <span>↓</span>
          </a>
          <Link href="/create" style={{
            padding: '0.85rem 2rem', borderRadius: '999px',
            border: `1px solid ${palette.border}`, color: palette.text,
            textDecoration: 'none', fontWeight: 600, fontSize: '0.9rem',
          }}>
            Create Yours
          </Link>
        </div>
      </div>

      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, height: '200px',
        background: 'linear-gradient(to top, #06060E, transparent)',
        pointerEvents: 'none', zIndex: 2,
      }} />
    </section>
  );
}

function ToolsDashboard({ animations, components, logoInspiration, youtubeInsights }: any) {
  const items = [
    { label: 'Animations', value: animations?.length || 0, icon: '⟳', color: '#06B6D4', data: animations },
    { label: 'Components', value: components?.length || 0, icon: '◇', color: '#3B82F6', data: components },
    { label: 'Logo', value: logoInspiration ? 'Ready' : 'None', icon: '◎', color: '#D4A574', data: logoInspiration },
    { label: 'Insights', value: youtubeInsights?.length || 0, icon: '◎', color: '#3B82F6', data: youtubeInsights },
  ];

  return (
    <section id="sections" style={{ padding: '6rem 2rem', position: 'relative' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <SectionTransition variant="scale-reveal">
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <h2 style={{ fontSize: '2rem', fontWeight: 800, color: palette.text, marginBottom: '0.5rem' }}>Integrated Tools</h2>
            <p style={{ color: palette.muted, fontSize: '1rem' }}>Powered by our proprietary engine</p>
          </div>
        </SectionTransition>
        <StaggerGrid columns={2}>
          {items.map((item, i) => (
            <GlassCard key={i}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                <div style={{
                  width: '2.5rem', height: '2.5rem', borderRadius: '0.75rem',
                  background: `${item.color}15`, border: `1px solid ${item.color}25`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '1.1rem', color: item.color,
                }}>{item.icon}</div>
                <span style={{ fontSize: '1.75rem', fontWeight: 900, color: item.color }}>{typeof item.value === 'number' ? item.value : item.value}</span>
              </div>
              <div style={{ fontWeight: 700, fontSize: '0.9rem', color: palette.text, marginBottom: '0.25rem' }}>{item.label}</div>
              <div style={{ fontSize: '0.75rem', color: palette.muted }}>{item.data ? 'Active' : 'Pending'}</div>
            </GlassCard>
          ))}
        </StaggerGrid>
      </div>
    </section>
  );
}

function FeaturesSection({ features }: { features: string[] }) {
  if (!features?.length) return null;
  return (
    <section style={{ padding: '6rem 2rem', position: 'relative' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <SectionTransition variant="perspective-rotate">
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <h2 style={{ fontSize: '2rem', fontWeight: 800, color: palette.text, marginBottom: '0.5rem' }}>Features</h2>
            <p style={{ color: palette.muted, fontSize: '1rem' }}>Everything included in your plan</p>
          </div>
        </SectionTransition>
        <StaggerGrid columns={3}>
          {features.map((f: string, i: number) => (
            <GlassCard key={i}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{
                  width: '2.5rem', height: '2.5rem', borderRadius: '50%',
                  background: palette.glass, border: `1px solid ${palette.border}`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '1rem', color: palette.primary,
                }}>✦</div>
                <span style={{ fontWeight: 600, fontSize: '0.95rem', color: palette.text }}>{f}</span>
              </div>
            </GlassCard>
          ))}
        </StaggerGrid>
      </div>
    </section>
  );
}

function ContactSection({ contact }: { contact: any }) {
  return (
    <MorphSection>
      <section style={{ padding: '6rem 2rem', position: 'relative' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <SectionTransition variant="scale-reveal">
            <GlassCard hover={false} style={{ textAlign: 'center', padding: '3rem' }}>
              <ScrollReveal direction="scale">
                <div style={{
                  width: '4rem', height: '4rem', borderRadius: '1rem',
                  background: `${palette.primary}15`, border: `1px solid ${palette.primary}30`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '1.5rem', margin: '0 auto 1.5rem',
                }}>✦</div>
              </ScrollReveal>
              <h2 style={{ fontSize: '1.75rem', fontWeight: 800, color: palette.text, marginBottom: '1rem' }}>Get in Touch</h2>
            <div style={{ display: 'grid', gap: '0.75rem', maxWidth: '400px', margin: '0 auto' }}>
              {contact?.phone && <div style={{ color: palette.muted, fontSize: '0.9rem' }}>📞 {contact.phone}</div>}
              {contact?.email && <div style={{ color: palette.muted, fontSize: '0.9rem' }}>✉️ {contact.email}</div>}
              {contact?.address && <div style={{ color: palette.muted, fontSize: '0.9rem' }}>📍 {contact.address}</div>}
            </div>
          </GlassCard>
        </SectionTransition>
      </div>
    </section>
    </MorphSection>
  );
}

function LoadingScreen() {
  return (
    <main style={{ background: palette.bg, minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'relative', zIndex: 2, textAlign: 'center' }}>
        <div style={{
          width: '64px', height: '64px', margin: '0 auto 1.5rem',
          borderRadius: '50%', border: '2px solid rgba(255,255,255,0.05)',
          borderTopColor: palette.primary, borderRightColor: palette.accent,
          animation: 'spin 0.8s linear infinite',
        }} />
        <p style={{ color: palette.muted, fontSize: '0.9rem', letterSpacing: '0.05em' }}>LOADING PREMIUM SITE</p>
      </div>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </main>
  );
}

export default function SiteViewPage() {
  const params = useParams();
  const slug = params.slug as string;
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) { setLoading(false); return; }
    fetch(`/api/sites/${slug}`)
      .then(r => r.json())
      .then(d => {
        setData(d);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [slug]);

  if (loading) return <LoadingScreen />;
  if (!data) return (
    <main style={{ background: palette.bg, minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '1rem' }}>
      <div style={{ position: 'relative', zIndex: 1, fontSize: '2rem' }}>◇</div>
      <h1 style={{ color: palette.text, fontWeight: 800, fontSize: '1.5rem', position: 'relative', zIndex: 1 }}>Site Not Found</h1>
      <Link href="/create" style={{ color: palette.primary, position: 'relative', zIndex: 1 }}>Create a new site →</Link>
    </main>
  );

  const site = data.site || {};
  const contact = data.contact || data.business || {};
  const features = site.features || data.features || [];
  const hasGeneratedHTML = typeof site.content === 'string' && (site.content.startsWith('<!DOCTYPE html') || site.content.startsWith('<html'));

  // If AI-generated HTML exists, render it in an iframe
  if (hasGeneratedHTML) {
    return (
      <main style={{ background: '#000', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <nav style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '0.5rem 1.5rem', background: '#07070E',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
          fontFamily: "'Inter', sans-serif",
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <Link href="/" style={{ fontSize: '0.9rem', fontWeight: 700, color: '#fff', textDecoration: 'none', letterSpacing: '-0.02em' }}>
              Nexus<span style={{ color: '#06B6D4' }}>AI</span>
            </Link>
            <span style={{ color: 'rgba(255,255,255,0.25)', fontSize: '0.7rem' }}>/</span>
            <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.8rem', fontWeight: 500 }}>{site.title || slug}</span>
          </div>
          <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
            <span style={{
              padding: '0.2rem 0.6rem', borderRadius: '4px',
              background: 'rgba(6,182,212,0.12)', color: '#06B6D4',
              fontSize: '0.65rem', fontWeight: 600,
            }}>IA GENERATED</span>
            <Link href="/" style={{
              padding: '0.35rem 0.9rem', borderRadius: '6px',
              background: 'rgba(255,255,255,0.06)', color: 'rgba(255,255,255,0.6)',
              fontSize: '0.75rem', textDecoration: 'none', fontWeight: 500,
            }}>← Back</Link>
          </div>
        </nav>
        <iframe
          srcDoc={site.content}
          style={{ flex: 1, width: '100%', border: 'none' }}
          title={site.title}
          sandbox="allow-scripts allow-same-origin"
        />
      </main>
    );
  }

  return (
    <main style={{ background: palette.bg, minHeight: '100vh', color: palette.text }}>
      <NicheScene3D businessType={site.businessType || data.businessType} />
      <Nav3D />
      <Hero3D title={site.title} subtitle={site.metaDescription} niche={site.businessType || data.businessType} />
      <ToolsDashboard
        animations={site.animations}
        components={site.components}
        logoInspiration={site.logoInspiration}
        youtubeInsights={site.youtubeInsights}
      />
      <FeaturesSection features={features} />
      <ContactSection contact={contact} />

      <footer style={{ padding: '3rem 2rem', borderTop: `1px solid ${palette.border}`, position: 'relative' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <span style={{ color: palette.muted, fontSize: '0.85rem' }}>© 2026 Studio. All rights reserved.</span>
          <div style={{ display: 'flex', gap: '1.5rem' }}>
            <Link href="/create" style={{ color: palette.muted, textDecoration: 'none', fontSize: '0.85rem' }}>Create</Link>
            <Link href="/sites" style={{ color: palette.muted, textDecoration: 'none', fontSize: '0.85rem' }}>Sites</Link>
          </div>
        </div>
      </footer>
    </main>
  );
}
