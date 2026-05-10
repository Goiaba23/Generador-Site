'use client';

import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { GlowOrbs } from '@/components/scene-3d';

// ===== Animações =====

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

function AnimatedElement({ children, delay = 0, direction = 'up' }: { children: React.ReactNode; delay?: number; direction?: 'up' | 'left' | 'right' | 'scale' }) {
  const { ref, isVisible } = useAnimation(delay);
  
  const getTransform = () => {
    if (!isVisible) {
      switch (direction) {
        case 'up': return 'translateY(60px)';
        case 'left': return 'translateX(-60px)';
        case 'right': return 'translateX(60px)';
        case 'scale': return 'scale(0.8)';
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

// ===== Components Premium =====

function SiteCard({ site, onDelete, index = 0 }: { site: any; onDelete?: (id: string) => void; index?: number }) {
  const [isHovered, setIsHovered] = useState(false);
  
  const getBusinessTypeLabel = (type: string) => {
    const labels: Record<string, string> = {
      'RESTAURANT': '🍽️ Restaurante',
      'CLINIC': '🏥 Clínica',
      'STORE': '🛍️ Loja',
      'SALON': '💇 Salão',
      'GYM': '💪 Academia',
      'HOTEL': '🏨 Hotel',
      'LAWYER': '⚖️ Advocacia',
      'REAL_ESTATE': '🏠 Imobiliária',
      'TECH': '💻 Tecnologia',
      'CONSULTING': '💼 Consultoria',
    };
    return labels[type] || type;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'PUBLISHED': return { bg: 'rgba(16, 185, 129, 0.15)', color: '#10b981', border: 'rgba(16, 185, 129, 0.3)' };
      case 'DRAFT': return { bg: 'rgba(245, 158, 11, 0.15)', color: '#f59e0b', border: 'rgba(245, 158, 11, 0.3)' };
      case 'ARCHIVED': return { bg: 'rgba(107, 114, 128, 0.15)', color: '#6b7280', border: 'rgba(107, 114, 128, 0.3)' };
      default: return { bg: 'rgba(59, 130, 246, 0.15)', color: '#3b82f6', border: 'rgba(59, 130, 246, 0.3)' };
    }
  };

  const statusStyle = getStatusColor(site.status);

  return (
    <AnimatedElement delay={index * 100}>
      <div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{
          background: isHovered 
            ? 'linear-gradient(135deg, rgba(22, 22, 34, 0.9), rgba(14, 14, 24, 0.95))' 
            : 'linear-gradient(135deg, rgba(22, 22, 34, 0.7), rgba(14, 14, 24, 0.8))',
          border: isHovered ? '1px solid rgba(6, 182, 212, 0.4)' : '1px solid rgba(42, 42, 62, 0.5)',
          borderRadius: '1.5rem',
          padding: '2rem',
          transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
          transform: isHovered ? 'translateY(-8px)' : 'translateY(0)',
          boxShadow: isHovered ? '0 20px 40px -10px rgba(0, 0, 0, 0.3)' : 'none',
          cursor: 'pointer',
          position: 'relative' as const,
          overflow: 'hidden',
        }}
      >
        {isHovered && (
          <div style={{
            position: 'absolute' as const,
            top: '-30%',
            right: '-30%',
            width: '300px',
            height: '300px',
            background: 'radial-gradient(circle, rgba(129, 140, 248, 0.1), transparent 70%)',
            pointerEvents: 'none' as const,
          }} />
        )}
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem', position: 'relative' as const, zIndex: 1 }}>
          <div>
            <h3 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'white', marginBottom: '0.5rem' }}>{site.businessName}</h3>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.375rem 1rem',
              borderRadius: '9999px',
              background: statusStyle.bg,
              border: `1px solid ${statusStyle.border}`,
              color: statusStyle.color,
              fontSize: '0.75rem',
              fontWeight: 600,
              textTransform: 'uppercase' as const,
              letterSpacing: '0.05em',
            }}>
              {site.status === 'PUBLISHED' ? '✓ ' : site.status === 'DRAFT' ? '◯ ' : '📦 '}
              {site.status}
            </div>
          </div>
          
          <div style={{
            padding: '0.5rem 1rem',
          background: 'rgba(6, 182, 212, 0.1)',
          borderRadius: '0.75rem',
          color: '#06B6D4',
            fontSize: '0.875rem',
            fontWeight: 600,
          }}>
            {getBusinessTypeLabel(site.businessType)}
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem', marginBottom: '1.5rem', position: 'relative' as const, zIndex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#94a3b8', fontSize: '0.875rem' }}>
            <span>📅</span>
            <span>{new Date(site.createdAt).toLocaleDateString('pt-BR')}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#94a3b8', fontSize: '0.875rem' }}>
            <span>🔗</span>
            <span style={{ color: '#06B6D4' }}>{site.slug}.sites-saas.com</span>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '1rem', position: 'relative' as const, zIndex: 1 }}>
          <Link href={`/sites/${site.slug}`} style={{ textDecoration: 'none', flex: 1 }}>
            <button style={{
              width: '100%',
              padding: '0.75rem 1.5rem',
              background: isHovered ? 'linear-gradient(135deg, #06B6D4, #3B82F6)' : 'rgba(79, 70, 229, 0.1)',
              color: 'white',
              border: 'none',
              borderRadius: '0.75rem',
              cursor: 'pointer',
              fontSize: '0.875rem',
              fontWeight: 600,
              transition: 'all 0.3s ease',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
            }}>
                   Ver Site do Cliente →
            </button>
          </Link>
          
          {onDelete && (
            <button
              onClick={() => onDelete(site.id)}
              style={{
                padding: '0.75rem 1rem',
                background: 'rgba(239, 68, 68, 0.1)',
                color: '#ef4444',
                border: '1px solid rgba(239, 68, 68, 0.3)',
                borderRadius: '0.75rem',
                cursor: 'pointer',
                fontSize: '0.875rem',
                fontWeight: 600,
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(239, 68, 68, 0.2)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(239, 68, 68, 0.1)'; }}
            >
              🗑️
            </button>
          )}
        </div>
      </div>
    </AnimatedElement>
  );
}

// ===== Main Component =====

interface Site {
  id: string;
  slug: string;
  businessName: string;
  businessType: string;
  createdAt: string;
  status: string;
}

export default function SitesPage() {
  const [sites, setSites] = useState<Site[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteing, setDeleteing] = useState<string | null>(null);

  useEffect(() => {
    fetchSites();
  }, []);

  const fetchSites = async () => {
    try {
      const response = await fetch('/api/sites');
      if (response.ok) {
        const data = await response.json();
        setSites(data);
      }
    } catch (error) {
      console.error('Error fetching sites:', error);
    } finally {
      setLoading(false);
    }
  };

  const deleteSite = async (id: string) => {
    if (!confirm('Tem certeza que deseja excluir este site?')) return;
    
    setDeleteing(id);
    try {
      const response = await fetch(`/api/sites/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        setSites(sites.filter(s => s.id !== id));
      }
    } catch (error) {
      console.error('Error deleting site:', error);
    } finally {
      setDeleteing(null);
    }
  };

  const getBusinessTypeLabel = (type: string) => {
    const labels: Record<string, string> = {
      'RESTAURANT': 'Restaurante',
      'CLINIC': 'Clínica',
      'STORE': 'Loja Virtual',
      'SALON': 'Salão',
      'GYM': 'Academia',
      'HOTEL': 'Hotel',
      'LAWYER': 'Advocacia',
      'REAL_ESTATE': 'Imobiliária',
      'TECH': 'Tecnologia',
      'CONSULTING': 'Consultoria',
    };
    return labels[type] || type.replace(/_/g, ' ').toLowerCase().replace(/\b\w/g, l => l.toUpperCase());
  };

  return (
        <main style={{ backgroundColor: '#07070E', minHeight: '100vh', color: '#EEEEF5', position: 'relative' }}>
      {/* 3D Background */}
      <GlowOrbs />

      {/* Background Decorations */}
      <div style={{ position: 'fixed', top: '-20%', left: '-10%', width: '600px', height: '600px', background: 'radial-gradient(circle, rgba(6, 182, 212, 0.06), transparent 70%)', borderRadius: '50%', filter: 'blur(100px)', pointerEvents: 'none' as const }} />
      <div style={{ position: 'fixed', bottom: '10%', right: '-10%', width: '500px', height: '500px', background: 'radial-gradient(circle, rgba(59, 130, 246, 0.05), transparent 70%)', borderRadius: '50%', filter: 'blur(100px)', pointerEvents: 'none' as const }} />

      {/* Navigation */}
      <nav style={{
        position: 'fixed' as const,
        top: 0,
        width: '100%',
        backgroundColor: 'rgba(7, 7, 14, 0.9)',
        backdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(42, 42, 62, 0.3)',
        zIndex: 50,
      }}>
        <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '0 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '5rem' }}>
          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', textDecoration: 'none' }}>
            <div style={{
              width: '3rem',
              height: '3rem',
              background: 'linear-gradient(135deg, #06B6D4, #3B82F6)',
              borderRadius: '1rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <span style={{ color: 'white', fontWeight: 800, fontSize: '1.25rem' }}>S</span>
            </div>
            <span style={{ fontWeight: 800, fontSize: '1.5rem', color: 'white' }}>SitesSaaS</span>
          </Link>
          <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
            <button onClick={async () => {
              try {
                const res = await fetch('/api/checkout', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({ plan: 'premium' }),
                });
                const data = await res.json();
                if (data.url) window.location.href = data.url;
              } catch {}
            }} style={{
              padding: '0.6rem 1.25rem', borderRadius: '0.75rem',
              border: '1px solid rgba(212,165,116,0.3)',
              background: 'rgba(212,165,116,0.1)', color: '#D4A574',
              cursor: 'pointer', fontSize: '0.8rem', fontWeight: 700,
              transition: 'all 0.3s ease',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(212,165,116,0.2)'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'rgba(212,165,116,0.1)'; }}
            >✦ Upgrade</button>
            <Link href="/create" style={{ textDecoration: 'none' }}>
              <button style={{
                background: 'linear-gradient(135deg, #06B6D4, #3B82F6)',
                color: 'white',
                border: 'none',
                padding: '0.75rem 2rem',
                borderRadius: '0.75rem',
                cursor: 'pointer',
                fontSize: '0.875rem',
                fontWeight: 700,
                boxShadow: '0 8px 24px rgba(79, 70, 229, 0.4)',
                transition: 'all 0.3s ease',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 12px 32px rgba(79, 70, 229, 0.6)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 8px 24px rgba(79, 70, 229, 0.4)';
              }}
              >
                🚀 Criar Novo Site
              </button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <section style={{ paddingTop: '8rem', paddingBottom: '4rem', position: 'relative' as const }}>
        <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '0 2rem' }}>
          <AnimatedElement>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4rem', flexWrap: 'wrap' as const, gap: '2rem' }}>
              <div>
                <h1 style={{
                   fontSize: '4rem',
                   fontWeight: 900,
                   color: 'white',
                   marginBottom: '1rem',
                   letterSpacing: '-0.04em',
                   lineHeight: 1.1,
                 }}>
                   Sites dos{' '}
                   <span style={{
                     background: 'linear-gradient(to right, #06B6D4, #3B82F6)',
                     WebkitBackgroundClip: 'text',
                     WebkitTextFillColor: 'transparent',
                     backgroundClip: 'text',
                   }}>
                     Clientes
                   </span>
                 </h1>
                <p style={{ fontSize: '1.375rem', color: '#94a3b8', lineHeight: 1.625 }}>
                   Gerencie todos os sites dos seus clientes com design premium
                 </p>
              </div>

              <Link href="/create" style={{ textDecoration: 'none' }}>
                <button style={{
                  background: 'linear-gradient(135deg, #06B6D4, #3B82F6)',
                  color: 'white',
                  border: 'none',
                  padding: '1rem 2.5rem',
                  borderRadius: '1rem',
                  cursor: 'pointer',
                  fontSize: '1rem',
                  fontWeight: 700,
                  boxShadow: '0 8px 24px rgba(79, 70, 229, 0.4)',
                  transition: 'all 0.3s ease',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-3px) scale(1.05)';
                  e.currentTarget.style.boxShadow = '0 12px 32px rgba(79, 70, 229, 0.6)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0) scale(1)';
                  e.currentTarget.style.boxShadow = '0 8px 24px rgba(79, 70, 229, 0.4)';
                }}
                >
                  <span style={{ fontSize: '1.25rem' }}>🎨</span>
                   Criar Site para Cliente
                  <span style={{ transition: 'transform 0.3s ease' }}>→</span>
                </button>
              </Link>
            </div>
          </AnimatedElement>

          {/* Stats Bar */}
          <AnimatedElement delay={200}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '2rem',
              marginBottom: '4rem',
              maxWidth: '48rem',
            }}>
              {[
                { number: sites.length, label: 'Total de Sites', icon: '📊' },
                { number: sites.filter(s => s.status === 'PUBLISHED').length, label: 'Publicados', icon: '✅' },
                { number: sites.filter(s => s.status === 'DRAFT').length, label: 'Rascunhos', icon: '◯' },
              ].map((stat, i) => (
                <div key={i} style={{
                  background: 'linear-gradient(135deg, rgba(22, 22, 34, 0.6), rgba(14, 14, 24, 0.7))',
                  border: '1px solid rgba(42, 42, 62, 0.5)',
                  borderRadius: '1.5rem',
                  padding: '2rem',
                  textAlign: 'center' as const,
                  transition: 'all 0.3s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(129, 140, 248, 0.3)';
                  e.currentTarget.style.transform = 'translateY(-4px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(51, 65, 85, 0.5)';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
                >
                  <div style={{ fontSize: '2.5rem', marginBottom: '0.75rem' }}>{stat.icon}</div>
                  <div style={{ fontSize: '3rem', fontWeight: 900, color: 'white', marginBottom: '0.5rem' }}>{stat.number}</div>
                  <div style={{ fontSize: '0.875rem', color: '#94a3b8', fontWeight: 500 }}>{stat.label}</div>
                </div>
              ))}
            </div>
          </AnimatedElement>

          {/* Sites Grid */}
          {loading ? (
            <div style={{ textAlign: 'center' as const, padding: '4rem 0' }}>
              <div style={{
                width: '3rem',
                height: '3rem',
                border: '3px solid rgba(129, 140, 248, 0.3)',
                borderTopColor: '#818cf8',
                borderRadius: '50%',
                animation: 'spin 1s linear infinite',
                margin: '0 auto 1rem',
              }} />
              <p style={{ color: '#94a3b8', fontSize: '1rem' }}>Carregando sites...</p>
            </div>
          ) : sites.length === 0 ? (
            <AnimatedElement delay={400}>
              <div style={{
                textAlign: 'center' as const,
                padding: '6rem 2rem',
                background: 'linear-gradient(135deg, rgba(22, 22, 34, 0.4), rgba(14, 14, 24, 0.5))',
                border: '2px dashed rgba(42, 42, 62, 0.5)',
                borderRadius: '2rem',
              }}>
                <div style={{ fontSize: '5rem', marginBottom: '2rem' }}>🎨</div>
                 <h2 style={{ fontSize: '2rem', fontWeight: 700, color: 'white', marginBottom: '1rem' }}>Nenhum site para cliente ainda</h2>
                 <p style={{ color: '#94a3b8', fontSize: '1.125rem', marginBottom: '3rem', maxWidth: '32rem', margin: '0 auto 3rem', lineHeight: 1.625 }}>
                   Comece criando o primeiro site para seu cliente com design premium baseado em templates do Dribbble de $10.000+
                 </p>
                <Link href="/create" style={{ textDecoration: 'none' }}>
                  <button style={{
                    background: 'linear-gradient(135deg, #06B6D4, #3B82F6)',
                    color: 'white',
                    border: 'none',
                    padding: '1.25rem 3rem',
                    borderRadius: '1rem',
                    cursor: 'pointer',
                    fontSize: '1.125rem',
                    fontWeight: 700,
                    boxShadow: '0 8px 24px rgba(79, 70, 229, 0.4)',
                    transition: 'all 0.3s ease',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-3px) scale(1.05)';
                    e.currentTarget.style.boxShadow = '0 12px 32px rgba(79, 70, 229, 0.6)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0) scale(1)';
                    e.currentTarget.style.boxShadow = '0 8px 24px rgba(79, 70, 229, 0.4)';
                  }}
                  >
                    <span style={{ fontSize: '1.5rem' }}>🚀</span>
                     Criar Site para Cliente
                    <span style={{ transition: 'transform 0.3s ease' }}>→</span>
                  </button>
                </Link>
              </div>
            </AnimatedElement>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(400px, 1fr))', gap: '2rem' }}>
              {sites.map((site, index) => (
                <SiteCard
                  key={site.id}
                  site={site}
                  onDelete={deleteSite}
                  index={index}
                />
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
