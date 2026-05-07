'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Simplified 3D Background using CSS
function ThreeBackground() {
  return (
    <div className="three-background">
      <div className="floating-orb orb-1"></div>
      <div className="floating-orb orb-2"></div>
      <div className="floating-orb orb-3"></div>
    </div>
  );
}

export default function PreviewPage({ params }: { params: { slug: string } }) {
  const [siteData, setSiteData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Try API first, then localStorage as fallback
    fetch(`/api/sites/${params.slug}`)
      .then(res => res.json())
      .then(data => {
        if (data.success && data.site) {
          setSiteData(data.site);
        } else {
          // Fallback to localStorage
          const stored = localStorage.getItem('preview_site');
          if (stored) {
            setSiteData(JSON.parse(stored));
          }
        }
        setLoading(false);
      })
      .catch(() => {
        // Fallback to localStorage
        const stored = localStorage.getItem('preview_site');
        if (stored) {
          setSiteData(JSON.parse(stored));
        }
        setLoading(false);
      });
  }, [params.slug]);

  useEffect(() => {
    if (!loading && siteData) {
      // Initialize GSAP animations
      gsap.from('.preview-container', {
        opacity: 0,
        y: 50,
        duration: 1,
        ease: 'power3.out'
      });

      gsap.from('.feature-card', {
        scrollTrigger: {
          trigger: '.features-section',
          start: 'top 80%',
        },
        y: 30,
        opacity: 0,
        stagger: 0.1,
        duration: 0.8,
        ease: 'power2.out'
      });
    }
  }, [loading, siteData]);

  if (loading) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#030308',
        color: 'white'
      }}>
        <div>
          <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>🧬</div>
          <div>Carregando preview do site...</div>
        </div>
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: -1,
          opacity: 0.3
        }}>
          <ThreeBackground />
        </div>
      </div>
    );
  }

  if (!siteData) {
    return (
      <div style={{ minHeight: '100vh', padding: '2rem', color: 'white', backgroundColor: '#030308' }}>
        <h1>Site não encontrado</h1>
        <Link href="/create">Criar novo site</Link>
      </div>
    );
  }

  return (
    <main className="preview-container" style={{
      minHeight: '100vh',
      backgroundColor: '#030308',
      color: 'white',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* 3D Background */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: -1,
        opacity: 0.2
      }}>
        <ThreeBackground />
      </div>

      {/* Header */}
      <nav style={{
        padding: '2rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        position: 'relative',
        zIndex: 10
      }}>
        <Link href="/" style={{ color: 'white', textDecoration: 'none', fontWeight: 900, fontSize: '1.5rem' }}>
          EliteSaaS
        </Link>
        <Link href="/create" style={{ color: '#A855F7', textDecoration: 'none' }}>
          Criar Outro Site
        </Link>
      </nav>

      {/* Hero Section */}
      <section style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '4rem 2rem',
        position: 'relative',
        zIndex: 10
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '4rem',
          alignItems: 'center'
        }}>
          <div>
            <h1 style={{
              fontSize: 'clamp(2.5rem, 5vw, 4rem)',
              fontWeight: 900,
              lineHeight: 1.1,
              marginBottom: '1.5rem'
            }}>
              {siteData.title || 'Seu Site Premium'}
            </h1>
            <p style={{
              fontSize: '1.2rem',
              color: '#71717A',
              marginBottom: '2rem',
              lineHeight: 1.6
            }}>
              {siteData.metaDescription || 'Site gerado com IA usando todas as ferramentas disponíveis.'}
            </p>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <Link href="/create" style={{
                padding: '1rem 2rem',
                background: 'linear-gradient(135deg, #A855F7 0%, #6366F1 50%, #EC4899 100%)',
                borderRadius: '0.875rem',
                color: 'white',
                textDecoration: 'none',
                fontWeight: 600
              }}>
                Editar Site
              </Link>
              <a href={`/sites/${siteData.slug}`} style={{
                padding: '1rem 2rem',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '0.875rem',
                color: 'white',
                textDecoration: 'none'
              }}>
                Ver Completo →
              </a>
            </div>
          </div>
          <div style={{
            background: 'rgba(168, 85, 247, 0.1)',
            borderRadius: '1.5rem',
            padding: '2rem',
            border: '1px solid rgba(168, 85, 247, 0.2)'
          }}>
            <h3 style={{ color: '#A855F7', marginBottom: '1rem' }}>Ferramentas Integradas</h3>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              {(Array.isArray(siteData.animations) ? siteData.animations : []).map((a: any, i: number) => (
                <li key={i} style={{ padding: '0.5rem 0', color: '#71717A' }}>
                  ✓ {a.name || `Animation ${i + 1}`}
                </li>
              ))}
              {(Array.isArray(siteData.components) ? siteData.components : []).map((c: any, i: number) => (
                <li key={`c-${i}`} style={{ padding: '0.5rem 0', color: '#71717A' }}>
                  ✓ Component: {c.name || `Component ${i + 1}`}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Features Section */}
      {siteData.features && siteData.features.length > 0 && (
        <section className="features-section" style={{
          maxWidth: '1200px',
          margin: '4rem auto',
          padding: '0 2rem',
          position: 'relative',
          zIndex: 10
        }}>
          <h2 style={{
            fontSize: '2rem',
            fontWeight: 800,
            marginBottom: '2rem',
            textAlign: 'center'
          }}>Recursos do Site</h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: '1.5rem'
          }}>
            {siteData.features.map((feature: string, idx: number) => (
              <div key={idx} className="feature-card" style={{
                padding: '1.5rem',
                background: 'rgba(10,10,18,0.6)',
                borderRadius: '1rem',
                border: '1px solid rgba(255,255,255,0.06)',
                backdropFilter: 'blur(30px)'
              }}>
                <div style={{ color: '#A855F7', marginBottom: '0.5rem' }}>✓</div>
                <div style={{ fontWeight: 600 }}>{feature}</div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Tools Data Section */}
      <section style={{
        maxWidth: '1200px',
        margin: '4rem auto',
        padding: '2rem',
        position: 'relative',
        zIndex: 10
      }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '1.5rem' }}>
          Dados das Ferramentas Integradas
        </h2>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '1rem'
        }}>
          <div style={{
            padding: '1.5rem',
            background: 'rgba(168,85,247,0.08)',
            borderRadius: '1rem',
            border: '1px solid rgba(168,85,247,0.2)'
          }}>
            <h4 style={{ color: '#A855F7' }}>Animações GSAP + Three.js</h4>
            <p>Total: {siteData.animations?.length || 0} configurações</p>
          </div>
          <div style={{
            padding: '1.5rem',
            background: 'rgba(99,102,241,0.08)',
            borderRadius: '1rem',
            border: '1px solid rgba(99,102,241,0.2)'
          }}>
            <h4 style={{ color: '#6366F1' }}>Componentes 21.dev</h4>
            <p>Total: {siteData.components?.length || 0} sugestões</p>
          </div>
          <div style={{
            padding: '1.5rem',
            background: 'rgba(236,72,153,0.08)',
            borderRadius: '1rem',
            border: '1px solid rgba(236,72,153,0.2)'
          }}>
            <h4 style={{ color: '#EC4899' }}>Logo UXShowcase</h4>
            <p>{siteData.logoInspiration ? '✓ Gerado' : '✗ Não disponível'}</p>
          </div>
          <div style={{
            padding: '1.5rem',
            background: 'rgba(16,185,129,0.08)',
            borderRadius: '1rem',
            border: '1px solid rgba(16,185,129,0.2)'
          }}>
            <h4 style={{ color: '#10B981' }}>YouTube Insights</h4>
            <p>Total: {siteData.youtubeInsights?.length || 0} insights</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{
        padding: '2rem',
        borderTop: '1px solid rgba(255,255,255,0.06)',
        textAlign: 'center',
        color: '#71717A',
        fontSize: '0.875rem',
        position: 'relative',
        zIndex: 10
      }}>
        <p>© 2026 EliteSaaS. Site gerado com IA e todas as ferramentas integradas.</p>
        <p style={{ marginTop: '0.5rem' }}>
          <Link href="/create" style={{ color: '#A855F7', textDecoration: 'none' }}>
            Criar outro site →
          </Link>
        </p>
      </footer>
    </main>
  );
}
