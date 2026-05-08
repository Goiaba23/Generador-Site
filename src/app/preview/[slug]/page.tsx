'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Scene3D, GlowOrb, FloatingShape } from '@/components/scene-3d';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function PreviewPage({ params }: { params: { slug: string } }) {
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
    return (
      <div style={{ minHeight: '100vh', background: '#06060E', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
        <Scene3D variant="hero" />
        <div style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
          <div style={{
            width: '48px', height: '48px', margin: '0 auto 1rem',
            border: '2px solid rgba(255,255,255,0.05)',
            borderTopColor: '#7C5CFC', borderRadius: '50%',
            animation: 'spin 0.8s linear infinite',
          }} />
          <div style={{ color: '#686880', fontSize: '0.85rem' }}>Loading preview...</div>
        </div>
        <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
      </div>
    );
  }

  if (!siteData) {
    return (
      <div style={{ minHeight: '100vh', background: '#06060E', color: '#EEEEF5', padding: '4rem 2rem', position: 'relative' }}>
        <Scene3D variant="subtle" />
        <div style={{ position: 'relative', zIndex: 1 }}>
          <h1 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '1rem' }}>Site not found</h1>
          <Link href="/create" style={{ color: '#7C5CFC' }}>Create new site →</Link>
        </div>
      </div>
    );
  }

  const anims: any[] = siteData.animations || [];
  const comps: any[] = siteData.components || [];

  return (
    <main style={{ minHeight: '100vh', background: '#06060E', color: '#EEEEF5', position: 'relative', overflow: 'hidden' }}>
      <Scene3D variant="subtle" primaryColor="#7C5CFC" secondaryColor="#F25C9E" />
      <GlowOrb color="#7C5CFC" size={400} blur={100} top="30%" left="60%" speed={10} intensity={25} />
      <GlowOrb color="#F25C9E" size={300} blur={80} top="60%" left="30%" speed={12} intensity={20} />

      <nav style={{ position: 'relative', zIndex: 10, padding: '1.5rem 2rem', maxWidth: '1200px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Link href="/" style={{ color: '#EEEEF5', textDecoration: 'none', fontWeight: 900, fontSize: '1.25rem', letterSpacing: '-0.03em' }}>
          <span style={{ background: 'linear-gradient(135deg, #7C5CFC, #F25C9E)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Studio</span>
        </Link>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <Link href="/create" style={{ color: '#7C5CFC', textDecoration: 'none', fontSize: '0.85rem', fontWeight: 600, padding: '0.5rem 1rem', border: '1px solid rgba(124,92,252,0.3)', borderRadius: '999px' }}>New Site</Link>
        </div>
      </nav>

      <section className="gsap-hero" style={{ maxWidth: '1100px', margin: '0 auto', padding: '3rem 2rem', position: 'relative', zIndex: 10 }}>
        <FloatingShape intensity={12} duration={8}>
          <div style={{
            display: 'inline-block', padding: '0.3rem 1rem', borderRadius: '999px',
            background: 'rgba(124,92,252,0.12)', border: '1px solid rgba(124,92,252,0.25)',
            color: '#7C5CFC', fontSize: '0.7rem', fontWeight: 700, marginBottom: '1rem',
          }}>✦ PREVIEW</div>
        </FloatingShape>
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
                background: 'linear-gradient(135deg, #7C5CFC, #F25C9E)',
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
            <h3 style={{ color: '#7C5CFC', fontSize: '0.85rem', fontWeight: 700, marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span>◆</span> Integrated Tools
            </h3>
            <div style={{ display: 'grid', gap: '0.5rem' }}>
              {[{ label: 'Animations', count: anims.length, color: '#7C5CFC' },
                { label: 'Components', count: comps.length, color: '#6366F1' },
                { label: 'YouTube Insights', count: siteData.youtubeInsights?.length || 0, color: '#F25C9E' },
                { label: 'Logo Inspiration', count: siteData.logoInspiration ? 1 : 0, color: '#D4A853' },
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
              <span style={{ color: '#7C5CFC' }}>⟳</span> Animations
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '0.75rem' }}>
              {anims.map((a, i) => (
                <div key={i} className="gsap-card" style={{
                  padding: '1rem 1.25rem', borderRadius: '0.875rem',
                  background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)',
                  fontSize: '0.85rem', fontWeight: 600,
                }}>
                  <div style={{ color: '#7C5CFC', fontSize: '0.7rem', fontWeight: 700, marginBottom: '0.25rem' }}>{a.type || 'GSAP'}</div>
                  {a.name}
                </div>
              ))}
            </div>
          </div>
        )}
        {siteData.features?.length > 0 && (
          <div>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ color: '#6366F1' }}>◇</span> Features
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
