'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useSearchParams, useParams } from 'next/navigation';
import { getWorldClassTokens, generateWorldClassCSS, WORLD_CLASS_PALETTES } from '@/lib/world-class-design';

const SITE_PLACEHOLDER = {
  title: 'Seu Negócio Premium',
  subtitle: 'Soluções Digitais Empresariais',
  hero: {
    headline: 'Transforme Sua Presença Digital',
    subheadline: 'Sites premium que convertem visitantes em clientes',
  },
  cta: {
    primary: 'Solicitar Orçamento',
    secondary: 'Ver Portfólio',
  },
  features: [],
  contact: {
    phone: '(11) 99999-9999',
    email: 'contato@seudominio.com.br',
    address: 'São Paulo, SP',
    whatsapp: '5511999999999',
  },
  social: {
    instagram: '@seudominio',
    facebook: 'seudominio',
  },
  businessType: 'TECH',
  style: 'MODERN',
};

const FEATURE_ICONS: Record<string, string> = {
  'Catálogo Online': '📋',
  'Agendamento Online': '📅',
  'Pedidos Online': '🛒',
  'Delivery': '🚚',
  'Reservas': '🍽️',
  'Programa Fidelidade': '⭐',
  'WhatsApp Direct': '💬',
  'Pagamento Online': '💳',
  'Blog/Conteúdo': '✍️',
  'Galeria/Portfólio': '🖼️',
  'Área do Cliente': '🔐',
  'Depoimentos': '💬',
};

function SiteViewer({ siteData }: { siteData: any }) {
  const site = siteData?.site || SITE_PLACEHOLDER;
  const features = siteData?.features || [];
  const contact = siteData?.contact || SITE_PLACEHOLDER.contact;
  const businessType = siteData?.businessType || 'TECH';
  const style = siteData?.style || 'MODERN';
  
  // Get world-class tokens
  const tokens = getWorldClassTokens(businessType, style);
  const palette = tokens.palette;
  const typography = tokens.typography;
  
  const [menuOpen, setMenuOpen] = useState(false);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
  };

  // Generate gradient text style
  const gradientTextStyle = {
    background: palette.gradientText,
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
  };

  return (
    <main style={{ backgroundColor: palette.background, minHeight: '100vh', color: palette.text }}>
      {/* Floating WhatsApp Button */}
      <a href={`https://wa.me/${contact.whatsapp || '5511999999999'}`} target="_blank" rel="noopener noreferrer" style={{
        position: 'fixed', bottom: '24px', right: '24px', width: '60px', height: '60px',
        background: '#25d366', borderRadius: '50%', display: 'flex', alignItems: 'center',
        justifyContent: 'center', fontSize: '28px', zIndex: 1000, 
        boxShadow: '0 4px 24px rgba(37,211,102,0.4)',
        textDecoration: 'none', border: 'none', cursor: 'pointer',
      }}>
        <svg width="28" height="28" viewBox="0 0 24 24" fill="white">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.019-.446.104-.606.104-.15.198-.347.297-.52.099-.174.198-.347.297-.52.198-.297.099-.595-.297-.743-.372-.149-1.082-.372-1.653-.372-.572 0-1.103.099-1.492.371-.374.273-.64.595-.64.643 0 .173.099.371.297.52.595.595 1.82 1.915 3.96 2.644 1.07.372 1.907.595 2.59.743.297.124.595.124.82-.02.223-.148.747-.926.855-1.244-.108-.299-.198-.595-.297-.891-.099-.297-.074-.595.025-.82.297-.595 1.653-2.95 1.78-3.163.124-.174.248-.348.37-.521.124-.174.173-.348.099-.595-.074-.173-.594-1.653-.82-2.258z"/>
          <path fill="white" d="M2.688 22.056c-.547 0-1.103-.022-1.64-.066-.537-.044-1.103-.088-1.64-.022-.536.066-1.002.132-1.566.066-.564-.066-.97-.132-1.278-.132-.31 0-.588-.066-.82-.198-.233-.132-.419-.323-.605-.537l-.002-.002c-.372-.462-.587-.793-.712-1.116-.125-.323-.187-.65-.062-1.002.125-.35.475-.82.95-1.277.475-.457 1.006-.772 1.448-.967.442-.195 1.006-.31 1.49-.444.483-.133.997-.221 1.64-.443.644-.222 1.103-.443 1.392-.443.287 0 .567-.066 1-.132.432-.066.93-.31 1.32-.71.39-.4.82-1.002 1.002-1.64.182-.637.182-1.32.095-1.64-.088-.32-.39-1.103-.546-1.412-.158-.31-.315-.578-.473-1.002-.158-.424-.316-.848-.474-1.282-.159-.434-.316-.868-.474-1.282-.159-.414-.237-.926-.395-1.28-.158-.354-.316-.792-.474-1.238-.158-.446-.237-1.054-.395-1.466-.158-.41-.316-.924-.474-1.446-.158-.522-.316-1.138-.395-1.64-.078-.502-.158-.998-.236-1.384 0 0-.002-.002-.002-.002-.32-.867-.468-1.442-.468-1.598 0-.155.157-1.002.468-1.914.311-.912.778-1.825 1.166-2.444.388-.618.779-1.247 1.308-1.964.529-.717 1.002-1.002 1.192-1.322.19-.32.38-.64.475-.866.095-.227.38-.64.474-1.034.095-.395.095-.866-.095-1.338-.19-.473-.57-.95-.855-1.28-.285-.33-.474-.577-.57-.793-.095-.217-.19-.455-.095-.793.095-.338.284-.793.57-1.28.285-.487.665-1.137 1.102-1.992.437-.855.807-1.825 1.166-2.837.359-1.012.548-1.89.585-2.258.037-.368.112-1.016-.284-1.64-.396-.624-1.002-.792-1.64-.792-.638 0-1.002-.066-1.64.066-.638.132-1.002.066-1.64-.066-.638-.132-1.64-.066-2.445.066-.805.398-1.64.494-1.756.095-.116.237-.397.095-.595-.142-.199-.142-.397.19-.595.33-.199.743-.132 1.002-.066.259.066.535.165.802.264.267.099.535.198.803.297.268.099.535.297.803.595.268.298.467.577.546.866.079.289.158.595.158.866 0 .27-.079.577-.079.866-.099.536-.297.795-.495 1.002-.198.207-.33.33-.33.413 0 .083.033.165.066.248.033.083.033.199.033.38v.002c0 .182-.033.346-.066.509-.033.163-.066.346-.033.546.033.2.066.38.198.56.132.18.33.463.66.906.33.443.907 1.213 1.166 1.64.259.427.74 1.48 1.102 2.444.362.965.626 1.68.626 2.054 0 .374-.132.928-.397 1.592-.265.664-1.003 1.793-1.639 2.837-.636 1.044-1.395 2.444-1.753 3.022-.358.578-.716 1.284-.716 1.914 0 .63.397 1.38.926 2.221.529.84 1.515 2.023 3.032 3.299 1.517 1.276 2.133 1.992 2.367 3.166.234 1.174-.066 2.054-.495 3.222-.429 1.168-1.36 2.444-1.753 2.837-.393.393-1.322 1.002-1.753 1.28-.431.278-.862.595-1.278.907-.416.312-.906.495-1.402.165-.496-.33-1.753-1.283-2.445-3.166-.692-1.883-1.036-2.837-.495-3.766.541-.929 1.807-1.64 2.21-2.054.403-.414 1.302-1.64 1.302-1.64s.264-.265.495-.595c.23-.33.495-.826 1.278-2.053.783-1.227 2.054-2.64 2.054-2.64s.495-.991.495-1.64c0-.649-.099-1.64-.495-2.258-.396-.618-1.166-1.478-1.753-2.221-.587-.743-1.753-2.053-1.928-2.444-.175-.391-.495-1.166-.263-1.992.23-.826 1.753-2.053 2.21-2.64.457-.587 2.523-3.432 2.682-3.566.159-.134.397-.165.495-.264.099-.099.173-.066.263-.033.09.033.198.05.38.05h.125c.124 0 .422-.033.866-.198.444-.165 1.613-.743 2.444-2.053.831-1.31 1.478-2.93 1.36-3.432-.118-.502-.753-1.48-1.89-3.166-1.137-1.686-1.913-2.444-2.289-2.93-.376-.486-.753-.486-1.002-.486-.249 0-.662.033-1.002.198-.34.165-.641.33-.866.495-.225.165-.457.33-.866.495-.41.165-1.103.33-1.753.594-.65.264-1.753.858-2.523 1.64-.77.782-1.753 2.053-1.753 2.837 0 .784.594 1.48 1.36 2.053.766.573 2.013 1.914 2.757 2.64.743.726 1.753 1.64 2.054 2.64.3 1 .346 1.64.198 2.288-.148.648-.608 2.053-1.072 2.444-.464.39-1.002.495-1.36.33-.358-.165-.578-.33-.752-.495-.174-.165-.348-.33-.546-.495-.198-.165-.495-.33-.793-.066-.298.264-.495.33-.866.495-.37.165-1.36.33-2.054-.066-.694-.396-1.674-.99-2.757-2.444-1.083-1.454-2.132-2.053-2.445-2.313-.313-.26-.63-.264-1.002-.264h-.124zm6.376-14.92c-1.753 0-3.466.463-5.093 1.753-1.627 1.29-2.836 3.166-2.836 5.36 0 2.194 1.36 4.027 3.702 5.36 2.342 1.333 4.523 1.753 6.454 1.753.66 0 1.302-.066 1.87-.131.568-.065 1.103-.264 1.638-.464.535-.2 1.103-.397 1.753-.595.65-.198 1.36-.397 2.054-.992.694-.595 1.753-1.002 2.367-1.992.614-.99.926-1.992.926-2.444 0-.452-.198-1.168-.793-2.052-.595-.884-1.753-1.753-3.166-2.837-1.413-1.084-2.523-2.053-2.757-2.523-.234-.47-.596-1.103-.596-1.103s-.132-.264-.264-.595c-.132-.33-.066-.793.066-1.123-.066-.33-.066-.661-.066-1.002l.002-.002z"/>
        </svg>
      </a>

      {/* Navigation - Glass effect */}
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, 
        background: palette.surfaceGlass,
        backdropFilter: 'blur(20px) saturate(180%)',
        WebkitBackdropFilter: 'blur(20px) saturate(180%)',
        borderBottom: `1px solid ${palette.border}`,
        zIndex: 100, padding: '1rem 2rem',
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Link href="/" style={{ textDecoration: 'none' }}>
            <span style={{ fontWeight: 800, fontSize: '1.5rem', color: palette.text }}>{site.title}</span>
          </Link>
          
          {/* Desktop Menu */}
          <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
            <button onClick={() => scrollToSection('features')} style={{ background: 'none', border: 'none', color: palette.textSecondary, cursor: 'pointer', fontSize: '0.9rem' }}>Serviços</button>
            <button onClick={() => scrollToSection('about')} style={{ background: 'none', border: 'none', color: palette.textSecondary, cursor: 'pointer', fontSize: '0.9rem' }}>Sobre</button>
            <button onClick={() => scrollToSection('contact')} style={{ background: 'none', border: 'none', color: palette.textSecondary, cursor: 'pointer', fontSize: '0.9rem' }}>Contato</button>
            <Link href={`https://wa.me/${contact.whatsapp || '5511999999999'}`} style={{
              padding: '0.75rem 1.5rem', background: palette.gradient,
              borderRadius: '12px', color: 'white', textDecoration: 'none', fontSize: '0.9rem', fontWeight: 600,
              border: 'none', cursor: 'pointer',
            }}>WhatsApp</Link>
          </div>
        </div>
      </nav>

      {/* Hero Section - World Class */}
      <section id="hero" style={{ 
        paddingTop: '140px', paddingBottom: '100px', paddingLeft: '2rem', paddingRight: '2rem',
        textAlign: 'center', position: 'relative', overflow: 'hidden',
      }}>
        {/* Background Effects */}
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0 }}>
          {/* Glow effect */}
          <div style={{ 
            position: 'absolute', top: '20%', left: '50%', transform: 'translateX(-50%)', 
            width: '800px', height: '800px', 
            background: palette.heroGlow, 
            borderRadius: '50%', 
            filter: 'blur(80px)',
          }} />
          {/* Mesh pattern */}
          <div style={{
            position: 'absolute', inset: 0,
            backgroundImage: palette.heroMesh,
            backgroundSize: '40px 40px',
            opacity: 0.5,
          }} />
        </div>

        <div style={{ position: 'relative', zIndex: 1, maxWidth: '900px', margin: '0 auto' }}>
          <span style={{ 
            display: 'inline-block', padding: '0.5rem 1rem', 
            background: 'rgba(99,102,241,0.15)', borderRadius: '2rem', 
            color: palette.primary, fontSize: '0.85rem', marginBottom: '1.5rem',
            border: `1px solid ${palette.border}`,
          }}>
            {site.subtitle}
          </span>
          
          <h1 style={{ 
            fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', 
            fontWeight: 800, marginBottom: '1.5rem', 
            lineHeight: 1.1,
            color: palette.text,
          }}>
            {site.hero?.headline || site.title}
          </h1>
          
          <p style={{ 
            fontSize: 'clamp(1.1rem, 2vw, 1.25rem)', 
            color: palette.textSecondary, marginBottom: '2.5rem', 
            maxWidth: '600px', margin: '0 auto 2.5rem',
            lineHeight: 1.7,
          }}>
            {site.hero?.subheadline || 'Sites premium que convertem visitantes em clientes'}
          </p>

          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href={`https://wa.me/${contact.whatsapp || '5511999999999'}`} style={{
              padding: '1rem 2rem', background: palette.gradient,
              borderRadius: '12px', color: 'white', textDecoration: 'none', fontWeight: 700, fontSize: '1rem',
              boxShadow: `0 4px 24px rgba(99,102,241,0.4)`, border: 'none', cursor: 'pointer',
              transition: 'all 0.3s ease',
            }}>
              {site.cta?.primary || 'Solicitar Orçamento'}
            </Link>
            <button style={{
              padding: '1rem 2rem', background: 'transparent', 
              border: `1px solid ${palette.borderHover}`, borderRadius: '12px',
              color: palette.text, fontWeight: 600, fontSize: '1rem', cursor: 'pointer',
              transition: 'all 0.3s ease',
            }}>
              {site.cta?.secondary || 'Ver Mais'}
            </button>
          </div>
        </div>
      </section>

      {/* Features/Services Section */}
      {(features.length > 0) && (
        <section id="features" style={{ padding: '100px 2rem', background: palette.surface }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <h2 style={{ fontSize: '2rem', fontWeight: 800, textAlign: 'center', marginBottom: '3rem', color: palette.text }}>
              Nossos <span style={gradientTextStyle}>Serviços</span>
            </h2>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
              {features.map((feature: string, i: number) => (
                <div key={i} style={{
                  padding: '2rem', 
                  background: palette.surfaceElevated, 
                  borderRadius: '16px', 
                  border: `1px solid ${palette.border}`,
                  transition: 'all 0.3s ease',
                }}>
                  <span style={{ fontSize: '2.5rem', marginBottom: '1rem', display: 'block' }}>
                    {FEATURE_ICONS[feature] || '✨'}
                  </span>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.5rem', color: palette.text }}>{feature}</h3>
                  <p style={{ color: palette.textSecondary, fontSize: '0.9rem', lineHeight: 1.7 }}>Serviço premium de alta qualidade</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* About Section */}
      <section id="about" style={{ padding: '100px 2rem' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem', alignItems: 'center' }}>
          <div>
            <h2 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '1rem', color: palette.text }}>
              Sobre Nossa <span style={gradientTextStyle}>Empresa</span>
            </h2>
            <p style={{ color: palette.textSecondary, fontSize: '1.1rem', lineHeight: 1.8, marginBottom: '1.5rem' }}>
              Somos uma empresa dedicada a oferecer soluções digitais de alta qualidade para negócios que buscam se destacar no mercado. Nossa missão é transformar presença digital em resultados concretos.
            </p>
            <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
              <div>
                <span style={{ fontSize: '2rem', fontWeight: 800, color: palette.primary }}>5+</span>
                <p style={{ color: palette.textMuted, fontSize: '0.85rem' }}>Anos de experiência</p>
              </div>
              <div>
                <span style={{ fontSize: '2rem', fontWeight: 800, color: palette.primary }}>500+</span>
                <p style={{ color: palette.textMuted, fontSize: '0.85rem' }}>Clientes atendidos</p>
              </div>
              <div>
                <span style={{ fontSize: '2rem', fontWeight: 800, color: palette.primary }}>98%</span>
                <p style={{ color: palette.textMuted, fontSize: '0.85rem' }}>Satisfação</p>
              </div>
            </div>
          </div>
          <div style={{ 
            background: palette.gradientSoft, 
            borderRadius: '24px', 
            padding: '3rem', 
            textAlign: 'center',
            border: `1px solid ${palette.border}`,
          }}>
            <span style={{ fontSize: '4rem' }}>🏆</span>
            <h3 style={{ fontSize: '1.5rem', fontWeight: 700, marginTop: '1rem', color: palette.text }}>Qualidade Garantida</h3>
            <p style={{ color: palette.textSecondary, marginTop: '0.5rem' }}>Compromisso com a excelência em cada projeto</p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" style={{ padding: '100px 2rem', background: palette.surface }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '1rem', color: palette.text }}>
            Entre em <span style={gradientTextStyle}>Contato</span>
          </h2>
          <p style={{ color: palette.textSecondary, marginBottom: '2rem' }}>Estamos prontos para atender você</p>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
            <a href={`tel:${contact.phone}`} style={{ 
              padding: '1.5rem', background: palette.surfaceElevated, 
              borderRadius: '12px', textDecoration: 'none', 
              border: `1px solid ${palette.border}`,
              transition: 'all 0.3s ease',
            }}>
              <span style={{ fontSize: '2rem', display: 'block', marginBottom: '0.5rem' }}>📞</span>
              <span style={{ color: palette.text, fontWeight: 600 }}>{contact.phone}</span>
            </a>
            <a href={`mailto:${contact.email}`} style={{ 
              padding: '1.5rem', background: palette.surfaceElevated, 
              borderRadius: '12px', textDecoration: 'none', 
              border: `1px solid ${palette.border}`,
              transition: 'all 0.3s ease',
            }}>
              <span style={{ fontSize: '2rem', display: 'block', marginBottom: '0.5rem' }}>✉️</span>
              <span style={{ color: palette.text, fontWeight: 600 }}>{contact.email}</span>
            </a>
            <div style={{ 
              padding: '1.5rem', background: palette.surfaceElevated, 
              borderRadius: '12px', 
              border: `1px solid ${palette.border}`,
            }}>
              <span style={{ fontSize: '2rem', display: 'block', marginBottom: '0.5rem' }}>📍</span>
              <span style={{ color: palette.text, fontWeight: 600 }}>{contact.address}</span>
            </div>
          </div>

          <Link href={`https://wa.me/${contact.whatsapp || '5511999999999'}`} style={{
            padding: '1rem 3rem', background: '#25d366',
            borderRadius: '12px', color: 'white', textDecoration: 'none', 
            fontWeight: 700, fontSize: '1.1rem', display: 'inline-block',
            border: 'none', cursor: 'pointer',
          }}>
            💬 Falar no WhatsApp
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ padding: '2rem', borderTop: `1px solid ${palette.border}`, textAlign: 'center' }}>
        <p style={{ color: palette.textMuted, fontSize: '0.9rem' }}>
          © 2024 {site.title}. Todos os direitos reservados.
        </p>
        <div style={{ marginTop: '1rem', display: 'flex', gap: '1rem', justifyContent: 'center' }}>
          <a href={`https://instagram.com/${contact.social?.instagram?.replace('@','')}`} style={{ color: palette.textSecondary, textDecoration: 'none', fontSize: '0.9rem' }}>Instagram</a>
          <a href={`https://facebook.com/${contact.social?.facebook}`} style={{ color: palette.textSecondary, textDecoration: 'none', fontSize: '0.9rem' }}>Facebook</a>
        </div>
      </footer>
    </main>
  );
}

export default function SiteViewPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const slug = params.slug as string;
  
  const [siteData, setSiteData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchSite() {
      try {
        const res = await fetch(`/api/sites/${slug}`);
        if (res.ok) {
          const data = await res.json();
          setSiteData(data);
        }
      } catch (e) {
        console.error('Error fetching site:', e);
      } finally {
        setLoading(false);
      }
    }
    
    if (slug) {
      fetchSite();
    } else {
      setLoading(false);
    }
  }, [slug]);

  if (loading) {
    return (
      <main style={{ backgroundColor: '#050508', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ 
            width: '48px', height: '48px', 
            border: '3px solid rgba(99,102,241,0.3)', 
            borderTopColor: '#818cf8', 
            borderRadius: '50%', 
            animation: 'spin 1s linear infinite', 
            margin: '0 auto 1rem' 
          }} />
          <p style={{ color: '#a1a1aa' }}>Carregando site...</p>
        </div>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </main>
    );
  }

  return <SiteViewer siteData={siteData} />;
}