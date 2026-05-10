'use client';

import { useState, useEffect, use } from 'react';
import Link from 'next/link';
import { GlowOrbs, ScrollReveal } from '@/components/scene-3d';
import NicheScene3D from '@/components/NicheScene3D';
import PremiumLoading from '@/components/PremiumLoading';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function PreviewPage(props: { params: Promise<{ slug: string }> }) {
  const params = use(props.params);
  const [siteData, setSiteData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem('preview_site');
    if (stored) {
      try {
        const parsedData = JSON.parse(stored);
        if (parsedData.slug === params.slug) {
          setSiteData(parsedData);
          setLoading(false);
          return;
        }
      } catch {}
    }
    fetch(`/api/sites/${params.slug}`)
      .then(res => res.json())
      .then(data => { if (data.success && data.site) setSiteData(data.site); setLoading(false); })
      .catch(() => setLoading(false));
  }, [params.slug]);

  useEffect(() => {
    if (loading || !siteData) return;
    gsap.from('.gsap-hero', { opacity: 0, y: 40, duration: 1.2, ease: 'power3.out' });
    gsap.from('.gsap-card', {
      scrollTrigger: { trigger: '.gsap-grid', start: 'top 80%' },
      opacity: 0, y: 30, stagger: 0.1, duration: 0.8, ease: 'power2.out',
    });
  }, [loading, siteData]);

  if (loading) {
    return <PremiumLoading message="Loading Preview" minDuration={1500} />;
  }

  if (!siteData) {
    return (
      <div style={{ minHeight: '100vh', background: '#07070E', color: '#EEEEF5', padding: '4rem 2rem', position: 'relative' }}>
        <div style={{ position: 'relative', zIndex: 1 }}>
          <h1 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '1rem' }}>Site not found</h1>
          <Link href="/create" style={{ color: '#06B6D4' }}>Create new site →</Link>
        </div>
      </div>
    );
  }

  const anims: any[] = siteData.animations || [];
  const comps: any[] = siteData.components || [];

  return (
    <main style={{ minHeight: '100vh', background: '#07070E', color: '#EEEEF5', position: 'relative', overflow: 'hidden' }}>
      <NicheScene3D businessType={siteData.businessType} />

      <nav style={{ position: 'relative', zIndex: 10, padding: '1.5rem 2rem', maxWidth: '1200px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Link href="/" style={{ color: '#EEEEF5', textDecoration: 'none', fontWeight: 900, fontSize: '1.25rem', letterSpacing: '-0.03em' }}>
          <span style={{ background: 'linear-gradient(135deg, #06B6D4, #3B82F6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Studio</span>
        </Link>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <Link href="/create" style={{ color: '#06B6D4', textDecoration: 'none', fontSize: '0.85rem', fontWeight: 600, padding: '0.5rem 1rem', border: '1px solid rgba(124,92,252,0.3)', borderRadius: '999px' }}>New Site</Link>
        </div>
      </nav>

      <section className="gsap-hero" style={{ maxWidth: '1100px', margin: '0 auto', padding: '3rem 2rem', position: 'relative', zIndex: 10 }}>
        <ScrollReveal direction="up">
          <div style={{
            display: 'inline-block', padding: '0.3rem 1rem', borderRadius: '999px',
            background: 'rgba(124,92,252,0.12)', border: '1px solid rgba(124,92,252,0.25)',
            color: '#06B6D4', fontSize: '0.7rem', fontWeight: 700, marginBottom: '1rem',
          }}>✦ PREVIEW</div>
        </ScrollReveal>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem', alignItems: 'center' }}>
          <div>
            <h1 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 900, lineHeight: 1.1, marginBottom: '1rem', letterSpacing: '-0.03em' }}>
              {siteData.title || 'Premium Site'}
            </h1>
            <p style={{ color: '#686880', fontSize: '1.05rem', marginBottom: '2rem', lineHeight: 1.6, maxWidth: '480px' }}>
              {siteData.metaDescription || 'Generated with all integrated tools.'}
            </p>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <a href={`/sites/${siteData.slug || params.slug}`} style={{
                padding: '0.85rem 2rem', borderRadius: '999px', border: 'none',
                background: 'linear-gradient(135deg, #06B6D4, #3B82F6)',
                color: '#fff', fontWeight: 700, fontSize: '0.85rem', textDecoration: 'none',
                boxShadow: '0 8px 32px rgba(124,92,252,0.3)',
              }}>View Full Site →</a>
            </div>
          </div>
          <div style={{
            padding: '2rem', borderRadius: '1.25rem',
            background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)',
            backdropFilter: 'blur(20px)',
          }}>
            <h3 style={{ color: '#06B6D4', fontSize: '0.85rem', fontWeight: 700, marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span>◆</span> Integrated Tools
            </h3>
            <div style={{ display: 'grid', gap: '0.5rem' }}>
              {[{ label: 'Animations', count: anims.length, color: '#06B6D4' },
                { label: 'Components', count: comps.length, color: '#3B82F6' },
                { label: 'YouTube Insights', count: siteData.youtubeInsights?.length || 0, color: '#3B82F6' },
                { label: 'Logo Inspiration', count: siteData.logoInspiration ? 1 : 0, color: '#D4A574' },
              ].map((item, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '0.4rem 0', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                  <span style={{ color: '#686880', fontSize: '0.8rem' }}>{item.label}</span>
                  <span style={{ color: item.color, fontWeight: 700, fontSize: '0.85rem' }}>{item.count}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="gsap-grid" style={{ maxWidth: '1100px', margin: '0 auto', padding: '3rem 2rem 6rem', position: 'relative', zIndex: 10 }}>
        {anims.length > 0 && (
          <div style={{ marginBottom: '3rem' }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ color: '#06B6D4' }}>⟳</span> Animations
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '0.75rem' }}>
              {anims.map((a, i) => (
                <div key={i} className="gsap-card" style={{
                  padding: '1rem 1.25rem', borderRadius: '0.875rem',
                  background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)',
                  fontSize: '0.85rem', fontWeight: 600,
                }}>
                  <div style={{ color: '#06B6D4', fontSize: '0.7rem', fontWeight: 700, marginBottom: '0.25rem' }}>{a.type || 'GSAP'}</div>
                  {a.name}
                </div>
              ))}
            </div>
          </div>
        )}
        {siteData.features?.length > 0 && (
          <div>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ color: '#3B82F6' }}>◇</span> Features
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '0.75rem' }}>
              {siteData.features.map((f: string, i: number) => (
                <div key={i} className="gsap-card" style={{
                  padding: '1rem 1.25rem', borderRadius: '0.875rem',
                  background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)',
                  fontSize: '0.85rem', fontWeight: 600,
                }}>✦ {f}</div>
              ))}
            </div>
          </div>
        )}
      </section>

      <footer style={{ padding: '2rem', borderTop: '1px solid rgba(255,255,255,0.06)', textAlign: 'center', color: '#686880', fontSize: '0.8rem', position: 'relative', zIndex: 10 }}>
        <p>© 2026 Studio · Preview Mode</p>
      </footer>
    </main>
  );
}
