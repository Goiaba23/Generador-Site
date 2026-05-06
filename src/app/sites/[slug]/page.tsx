'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { getWorldClassTokens, WORLD_CLASS_PALETTES } from '@/lib/world-class-design';
import { getRestaurantTemplate, getPremiumImages, SAMPLE_DISHES, SAMPLE_MENU_CATEGORIES, SAMPLE_TESTIMONIALS, RestaurantTemplate } from '@/lib/premium-sections';

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
  businessType: 'RESTAURANT',
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

// ===== COMPONENT: NAVIGATION =====
function Navigation({ palette, contact, scrollToSection }: any) {
  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, 
      background: palette.surfaceGlass,
      backdropFilter: 'blur(20px) saturate(180%)',
      WebkitBackdropFilter: 'blur(20px) saturate(180%)',
      borderBottom: `1px solid ${palette.border}`,
      zIndex: 100, padding: '1rem 2rem',
    }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Link href="/" style={{ textDecoration: 'none' }}>
          <span style={{ fontWeight: 800, fontSize: '1.5rem', color: palette.text }}>Restaurante</span>
        </Link>
        
        <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
          <button onClick={() => scrollToSection('menu')} style={{ background: 'none', border: 'none', color: palette.textSecondary, cursor: 'pointer', fontSize: '0.9rem' }}>Cardápio</button>
          <button onClick={() => scrollToSection('about')} style={{ background: 'none', border: 'none', color: palette.textSecondary, cursor: 'pointer', fontSize: '0.9rem' }}>Sobre</button>
          <button onClick={() => scrollToSection('gallery')} style={{ background: 'none', border: 'none', color: palette.textSecondary, cursor: 'pointer', fontSize: '0.9rem' }}>Galeria</button>
          <button onClick={() => scrollToSection('contact')} style={{ background: 'none', border: 'none', color: palette.textSecondary, cursor: 'pointer', fontSize: '0.9rem' }}>Contato</button>
          <Link href={`https://wa.me/${contact.whatsapp || '5511999999999'}`} style={{
            padding: '0.75rem 1.5rem', background: palette.gradient,
            borderRadius: '12px', color: 'white', textDecoration: 'none', fontSize: '0.9rem', fontWeight: 600,
          }}>Reservar Mesa</Link>
        </div>
      </div>
    </nav>
  );
}

// ===== COMPONENT: HERO =====
function HeroSection({ palette, site, template }: any) {
  const heroImage = template?.hero?.backgroundImage || getPremiumImages(site?.businessType || 'RESTAURANT').hero;
  
  return (
    <section style={{ 
      position: 'relative', minHeight: '100vh', display: 'flex', alignItems: 'center',
      backgroundImage: `linear-gradient(to right, ${palette.background}ee, ${palette.background}dd), url(${heroImage})`,
      backgroundSize: 'cover', backgroundPosition: 'center',
    }}>
      {/* Gradient overlay */}
      <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(to right, ${palette.background}ee 0%, ${palette.background}88 50%, ${palette.background}44 100%)` }} />
      
      {/* Glow effect */}
      <div style={{ position: 'absolute', top: '20%', left: '10%', width: '400px', height: '400px', background: palette.heroGlow, borderRadius: '50%', filter: 'blur(100px)' }} />
      
      <div style={{ position: 'relative', zIndex: 1, maxWidth: '1400px', margin: '0 auto', padding: '140px 2rem 80px', width: '100%', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center' }}>
        <div>
          <span style={{ display: 'inline-block', padding: '0.5rem 1rem', background: 'rgba(255,255,255,0.1)', borderRadius: '2rem', color: palette.primary, fontSize: '0.85rem', marginBottom: '1.5rem', border: `1px solid ${palette.border}` }}>
            ✨ Sabores Únicos
          </span>
          
          <h1 style={{ fontSize: 'clamp(3rem, 6vw, 5rem)', fontWeight: 800, marginBottom: '1.5rem', color: palette.text, lineHeight: 1.1 }}>
            Uma Experiência <br />
            <span style={{ background: palette.gradientText, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              Inesquecível
            </span>
          </h1>
          
          <p style={{ fontSize: '1.25rem', color: palette.textSecondary, marginBottom: '2.5rem', maxWidth: '500px', lineHeight: 1.7 }}>
            Descubra o verdadero sabor da gastronomia. Ingredientes frescos, preparo artesanal e um ambiente acolhedor.
          </p>

          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <Link href="#menu" style={{
              padding: '1rem 2rem', background: palette.gradient,
              borderRadius: '12px', color: 'white', textDecoration: 'none', fontWeight: 700, fontSize: '1rem',
              boxShadow: `0 4px 24px ${palette.primary}40`,
            }}>
              Ver Cardápio
            </Link>
            <Link href="#reservations" style={{
              padding: '1rem 2rem', background: 'transparent', 
              border: `1px solid ${palette.borderHover}`, borderRadius: '12px',
              color: palette.text, textDecoration: 'none', fontWeight: 600, fontSize: '1rem',
            }}>
              Reservar Mesa
            </Link>
          </div>
        </div>
        
        {/* Right side - Decorative */}
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <div style={{ 
            width: '400px', height: '400px', borderRadius: '50%', 
            background: palette.gradientSoft, border: `2px solid ${palette.border}`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            position: 'relative',
          }}>
            <span style={{ fontSize: '8rem' }}>🍽️</span>
            {/* Floating badges */}
            <div style={{ position: 'absolute', top: '-20px', right: '-20px', background: palette.surface, padding: '1rem', borderRadius: '12px', border: `1px solid ${palette.border}` }}>
              <span style={{ fontSize: '1.5rem' }}>⭐</span>
              <span style={{ color: palette.text, fontWeight: 600, marginLeft: '0.5rem' }}>4.9</span>
            </div>
            <div style={{ position: 'absolute', bottom: '-20px', left: '-20px', background: palette.surface, padding: '1rem', borderRadius: '12px', border: `1px solid ${palette.border}` }}>
              <span style={{ fontSize: '1.5rem' }}>👨‍🍳</span>
              <span style={{ color: palette.text, fontWeight: 600, marginLeft: '0.5rem' }}>Chef Experiente</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ===== COMPONENT: FEATURED DISHES =====
function FeaturedDishesSection({ palette }: any) {
  const dishes = SAMPLE_DISHES;
  
  return (
    <section id="featured" style={{ padding: '100px 2rem', background: palette.surface }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <span style={{ color: palette.primary, fontWeight: 600, fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '2px' }}>
            Especialidades da Casa
          </span>
          <h2 style={{ fontSize: '2.5rem', fontWeight: 800, marginTop: '0.5rem', color: palette.text }}>
            Pratos <span style={{ background: palette.gradientText, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Em Destaque</span>
          </h2>
        </div>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
          {dishes.map((dish: any, i: number) => (
            <div key={i} style={{
              background: palette.surfaceElevated, borderRadius: '20px', overflow: 'hidden',
              border: `1px solid ${palette.border}`, transition: 'all 0.3s ease',
            }}>
              <div style={{ 
                height: '200px', background: `linear-gradient(to top, ${palette.surfaceElevated}, transparent), url(${getPremiumImages('restaurant').dishes[dish.image]})`,
                backgroundSize: 'cover', backgroundPosition: 'center',
              }} />
              <div style={{ padding: '1.5rem' }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: palette.text, marginBottom: '0.5rem' }}>{dish.name}</h3>
                <p style={{ color: palette.textSecondary, fontSize: '0.9rem', marginBottom: '1rem' }}>{dish.description}</p>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '1.25rem', fontWeight: 800, color: palette.primary }}>{dish.price}</span>
                  <button style={{ 
                    background: palette.gradient, border: 'none', borderRadius: '8px', 
                    padding: '0.5rem 1rem', color: 'white', fontWeight: 600, cursor: 'pointer',
                  }}>
                    Pedir
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ===== COMPONENT: MENU SECTION =====
function MenuSection({ palette }: any) {
  const categories = Object.entries(SAMPLE_MENU_CATEGORIES);
  
  return (
    <section id="menu" style={{ padding: '100px 2rem', background: palette.background }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <span style={{ color: palette.primary, fontWeight: 600, fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '2px' }}>
            Nosso Cardápio
          </span>
          <h2 style={{ fontSize: '2.5rem', fontWeight: 800, marginTop: '0.5rem', color: palette.text }}>
            Explore os <span style={{ background: palette.gradientText, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Sabores</span>
          </h2>
        </div>
        
        <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap', justifyContent: 'center', marginBottom: '3rem' }}>
          {categories.map(([key], i) => (
            <button key={key} style={{
              padding: '0.75rem 1.5rem', background: i === 0 ? palette.gradient : 'transparent',
              border: `1px solid ${palette.border}`, borderRadius: '2rem', color: palette.text,
              fontWeight: 600, cursor: 'pointer', transition: 'all 0.3s ease',
            }}>
              {key.charAt(0).toUpperCase() + key.slice(1)}
            </button>
          ))}
        </div>
        
        {categories.map(([key, items]: [string, any]) => (
          <div key={key} style={{ marginBottom: '3rem' }}>
            <h3 style={{ fontSize: '1.5rem', fontWeight: 700, color: palette.text, marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: palette.primary }} />
              {key.charAt(0).toUpperCase() + key.slice(1)}
            </h3>
            <div style={{ display: 'grid', gap: '1rem' }}>
              {items.map((item: any, i: number) => (
                <div key={i} style={{ 
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                  padding: '1.5rem', background: palette.surfaceElevated, borderRadius: '12px',
                  border: `1px solid ${palette.border}`,
                }}>
                  <div>
                    <h4 style={{ fontSize: '1.1rem', fontWeight: 700, color: palette.text, marginBottom: '0.25rem' }}>{item.name}</h4>
                    <p style={{ color: palette.textSecondary, fontSize: '0.9rem' }}>{item.description}</p>
                  </div>
                  <span style={{ fontSize: '1.25rem', fontWeight: 800, color: palette.primary, whiteSpace: 'nowrap', marginLeft: '1rem' }}>{item.price}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// ===== COMPONENT: ABOUT =====
function AboutSection({ palette }: any) {
  return (
    <section id="about" style={{ padding: '100px 2rem', background: palette.surface }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <img src={getPremiumImages('restaurant').gallery[0]} alt="Restaurant" style={{ width: '100%', height: '250px', objectFit: 'cover', borderRadius: '16px' }} />
          <img src={getPremiumImages('restaurant').gallery[1]} alt="Food" style={{ width: '100%', height: '250px', objectFit: 'cover', borderRadius: '16px', marginTop: '2rem' }} />
          <img src={getPremiumImages('restaurant').gallery[2]} alt="Chef" style={{ width: '100%', height: '250px', objectFit: 'cover', borderRadius: '16px', marginTop: '-2rem' }} />
          <img src={getPremiumImages('restaurant').gallery[3]} alt="Interior" style={{ width: '100%', height: '250px', objectFit: 'cover', borderRadius: '16px' }} />
        </div>
        
        <div>
          <span style={{ color: palette.primary, fontWeight: 600, fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '2px' }}>
            Nossa História
          </span>
          <h2 style={{ fontSize: '2.5rem', fontWeight: 800, marginTop: '0.5rem', marginBottom: '1.5rem', color: palette.text }}>
            Tradição e <span style={{ background: palette.gradientText, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Paixão</span>
          </h2>
          <p style={{ color: palette.textSecondary, fontSize: '1.1rem', lineHeight: 1.8, marginBottom: '1.5rem' }}>
            Há mais de 15 anos, trazemos a autêntica gastronomia para nossa cidade. Nosso compromisso com a qualidade e o sabor nos tornou referência na região.
          </p>
          <p style={{ color: palette.textSecondary, fontSize: '1.1rem', lineHeight: 1.8, marginBottom: '2rem' }}>
            Cada prato é preparado com ingredientes frescos e muito carinho pela nossa equipe de chefs renomados.
          </p>
          
          <div style={{ display: 'flex', gap: '2rem' }}>
            <div>
              <span style={{ fontSize: '2.5rem', fontWeight: 800, color: palette.primary }}>15+</span>
              <p style={{ color: palette.textMuted, fontSize: '0.9rem' }}>Anos de Tradição</p>
            </div>
            <div>
              <span style={{ fontSize: '2.5rem', fontWeight: 800, color: palette.primary }}>50k+</span>
              <p style={{ color: palette.textMuted, fontSize: '0.9rem' }}>Clientes Satisfeitos</p>
            </div>
            <div>
              <span style={{ fontSize: '2.5rem', fontWeight: 800, color: palette.primary }}>100+</span>
              <p style={{ color: palette.textMuted, fontSize: '0.9rem' }}>Pratos no Cardápio</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ===== COMPONENT: TESTIMONIALS =====
function TestimonialsSection({ palette }: any) {
  const testimonials = SAMPLE_TESTIMONIALS;
  
  return (
    <section id="testimonials" style={{ padding: '100px 2rem', background: palette.background }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <span style={{ color: palette.primary, fontWeight: 600, fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '2px' }}>
            O que dizem
          </span>
          <h2 style={{ fontSize: '2.5rem', fontWeight: 800, marginTop: '0.5rem', color: palette.text }}>
            Depoimentos de <span style={{ background: palette.gradientText, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Clientes</span>
          </h2>
        </div>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
          {testimonials.map((t: any, i: number) => (
            <div key={i} style={{
              background: palette.surfaceElevated, padding: '2rem', borderRadius: '20px',
              border: `1px solid ${palette.border}`,
            }}>
              <div style={{ display: 'flex', gap: '0.25rem', marginBottom: '1rem' }}>
                {[...Array(t.rating)].map((_, j) => (
                  <span key={j} style={{ color: '#fbbf24', fontSize: '1.25rem' }}>★</span>
                ))}
              </div>
              <p style={{ color: palette.textSecondary, fontSize: '1rem', lineHeight: 1.7, marginBottom: '1.5rem', fontStyle: 'italic' }}>
                "{t.text}"
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{ width: '50px', height: '50px', borderRadius: '50%', background: palette.gradient, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ fontSize: '1.25rem', color: 'white', fontWeight: 700 }}>{t.name.charAt(0)}</span>
                </div>
                <span style={{ color: palette.text, fontWeight: 600 }}>{t.name}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ===== COMPONENT: GALLERY =====
function GallerySection({ palette }: any) {
  const images = getPremiumImages('restaurant').gallery;
  
  return (
    <section id="gallery" style={{ padding: '100px 2rem', background: palette.surface }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <span style={{ color: palette.primary, fontWeight: 600, fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '2px' }}>
            Nos conheça
          </span>
          <h2 style={{ fontSize: '2.5rem', fontWeight: 800, marginTop: '0.5rem', color: palette.text }}>
            Nossa <span style={{ background: palette.gradientText, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Galeria</span>
          </h2>
        </div>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
          {images.map((img: string, i: number) => (
            <div key={i} style={{
              height: i === 0 ? '400px' : '200px', gridColumn: i === 0 ? 'span 2' : 'span 1',
              borderRadius: '16px', overflow: 'hidden',
              background: `url(${img})`, backgroundSize: 'cover', backgroundPosition: 'center',
              transition: 'all 0.3s ease', cursor: 'pointer',
            }} />
          ))}
        </div>
      </div>
    </section>
  );
}

// ===== COMPONENT: RESERVATIONS =====
function ReservationsSection({ palette, contact }: any) {
  return (
    <section id="reservations" style={{ padding: '100px 2rem', background: palette.background }}>
      <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
        <span style={{ color: palette.primary, fontWeight: 600, fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '2px' }}>
          Faça sua Reserva
        </span>
        <h2 style={{ fontSize: '2.5rem', fontWeight: 800, marginTop: '0.5rem', marginBottom: '1rem', color: palette.text }}>
          Garanta sua <span style={{ background: palette.gradientText, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Mesa</span>
        </h2>
        <p style={{ color: palette.textSecondary, fontSize: '1.1rem', marginBottom: '2rem' }}>
          Reserve agora mesmo pelo WhatsApp
        </p>
        
        <Link href={`https://wa.me/${contact.whatsapp || '5511999999999'}`} style={{
          display: 'inline-flex', alignItems: 'center', gap: '0.75rem',
          padding: '1.25rem 3rem', background: '#25d366',
          borderRadius: '12px', color: 'white', textDecoration: 'none', fontWeight: 700, fontSize: '1.1rem',
        }}>
          <span style={{ fontSize: '1.5rem' }}>💬</span>
          Reservar pelo WhatsApp
        </Link>
        
        <div style={{ marginTop: '3rem', display: 'flex', justifyContent: 'center', gap: '3rem', flexWrap: 'wrap' }}>
          <div>
            <span style={{ display: 'block', fontSize: '1.5rem', marginBottom: '0.5rem' }}>📍</span>
            <span style={{ color: palette.textSecondary }}>Rua Example, 123 - Centro</span>
          </div>
          <div>
            <span style={{ display: 'block', fontSize: '1.5rem', marginBottom: '0.5rem' }}>📞</span>
            <span style={{ color: palette.textSecondary }}>(11) 99999-9999</span>
          </div>
          <div>
            <span style={{ display: 'block', fontSize: '1.5rem', marginBottom: '0.5rem' }}>🕐</span>
            <span style={{ color: palette.textSecondary }}>Ter a Dom: 18h às 23h</span>
          </div>
        </div>
      </div>
    </section>
  );
}

// ===== COMPONENT: FOOTER =====
function Footer({ palette, site, contact }: any) {
  return (
    <footer style={{ padding: '4rem 2rem 2rem', background: palette.surface, borderTop: `1px solid ${palette.border}` }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '3rem' }}>
        <div>
          <h3 style={{ fontSize: '1.5rem', fontWeight: 800, color: palette.text, marginBottom: '1rem' }}>{site.title}</h3>
          <p style={{ color: palette.textSecondary, lineHeight: 1.7 }}> gastronimia de excelência em um ambiente acolhedor.</p>
        </div>
        
        <div>
          <h4 style={{ color: palette.text, fontWeight: 700, marginBottom: '1rem' }}>Links Rápidos</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {['Cardápio', 'Sobre', 'Galeria', 'Contato'].map(link => (
              <a key={link} href={`#${link.toLowerCase()}`} style={{ color: palette.textSecondary, textDecoration: 'none' }}>{link}</a>
            ))}
          </div>
        </div>
        
        <div>
          <h4 style={{ color: palette.text, fontWeight: 700, marginBottom: '1rem' }}>Horário</h4>
          <p style={{ color: palette.textSecondary }}>Terça a Quinta: 18h - 23h</p>
          <p style={{ color: palette.textSecondary }}>Sexta a Domingo: 18h - 00h</p>
          <p style={{ color: palette.textSecondary }}>Segunda: Fechado</p>
        </div>
        
        <div>
          <h4 style={{ color: palette.text, fontWeight: 700, marginBottom: '1rem' }}>Contato</h4>
          <p style={{ color: palette.textSecondary, marginBottom: '0.5rem' }}>📍 {contact.address}</p>
          <p style={{ color: palette.textSecondary, marginBottom: '0.5rem' }}>📞 {contact.phone}</p>
          <p style={{ color: palette.textSecondary, marginBottom: '1rem' }}>✉️ {contact.email}</p>
          
          <div style={{ display: 'flex', gap: '1rem' }}>
            <a href={`https://instagram.com/${contact.social?.instagram?.replace('@','')}`} style={{ 
              width: '40px', height: '40px', borderRadius: '50%', background: palette.surfaceElevated, 
              display: 'flex', alignItems: 'center', justifyContent: 'center', textDecoration: 'none',
            }}>📷</a>
            <a href={`https://facebook.com/${contact.social?.facebook}`} style={{ 
              width: '40px', height: '40px', borderRadius: '50%', background: palette.surfaceElevated, 
              display: 'flex', alignItems: 'center', justifyContent: 'center', textDecoration: 'none',
            }}>📘</a>
          </div>
        </div>
      </div>
      
      <div style={{ maxWidth: '1400px', margin: '3rem auto 0', paddingTop: '2rem', borderTop: `1px solid ${palette.border}`, textAlign: 'center' }}>
        <p style={{ color: palette.textMuted, fontSize: '0.9rem' }}>© 2024 {site.title}. Todos os direitos reservados.</p>
      </div>
    </footer>
  );
}

// ===== MAIN COMPONENT: SITE VIEWER =====
function SiteViewer({ siteData }: { siteData: any }) {
  const site = siteData?.site || SITE_PLACEHOLDER;
  const features = siteData?.features || [];
  const contact = siteData?.contact || SITE_PLACEHOLDER.contact;
  const businessType = siteData?.businessType || 'RESTAURANT';
  const style = siteData?.style || 'MODERN';
  
  const tokens = getWorldClassTokens(businessType, style);
  const palette = tokens.palette;
  const template = getRestaurantTemplate(businessType);
  
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <main style={{ backgroundColor: palette.background, minHeight: '100vh', color: palette.text }}>
      {/* Floating WhatsApp */}
      <a href={`https://wa.me/${contact.whatsapp || '5511999999999'}`} target="_blank" rel="noopener noreferrer" style={{
        position: 'fixed', bottom: '24px', right: '24px', width: '60px', height: '60px',
        background: '#25d366', borderRadius: '50%', display: 'flex', alignItems: 'center',
        justifyContent: 'center', fontSize: '28px', zIndex: 1000, 
        boxShadow: '0 4px 24px rgba(37,211,102,0.4)', textDecoration: 'none', border: 'none', cursor: 'pointer',
      }}>
        💬
      </a>

      <Navigation palette={palette} contact={contact} scrollToSection={scrollToSection} />
      
      <HeroSection palette={palette} site={site} template={template} />
      
      {template.sections?.find((s: any) => s.id === 'featured' && s.enabled) && (
        <FeaturedDishesSection palette={palette} />
      )}
      
      {template.sections?.find((s: any) => s.id === 'menu' && s.enabled) && (
        <MenuSection palette={palette} />
      )}
      
      {template.sections?.find((s: any) => s.id === 'about' && s.enabled) && (
        <AboutSection palette={palette} />
      )}
      
      {template.sections?.find((s: any) => s.id === 'testimonials' && s.enabled) && (
        <TestimonialsSection palette={palette} />
      )}
      
      {template.sections?.find((s: any) => s.id === 'gallery' && s.enabled) && (
        <GallerySection palette={palette} />
      )}
      
      {template.sections?.find((s: any) => s.id === 'reservations' && s.enabled) && (
        <ReservationsSection palette={palette} contact={contact} />
      )}
      
      <Footer palette={palette} site={site} contact={contact} />
    </main>
  );
}

// ===== PAGE COMPONENT =====
export default function SiteViewPage() {
  const params = useParams();
  const slug = params.slug as string;
  
  const [siteData, setSiteData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchSite() {
      try {
        const res = await fetch(`/api/sites/${slug}`);
        if (res.ok) {
          const data = await res.json();
          // Combine business and site data
          setSiteData({
            site: data.site,
            business: data.business,
            contact: {
              phone: data.business?.phone || SITE_PLACEHOLDER.contact.phone,
              email: data.business?.email || SITE_PLACEHOLDER.contact.email,
              address: data.business?.address || SITE_PLACEHOLDER.contact.address,
              whatsapp: (data.business?.phone || '').replace(/\D/g, ''),
            },
            features: data.site?.features || [],
            businessType: data.business?.type || 'RESTAURANT',
            style: data.site?.designTokens?.style || 'MODERN',
          });
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
          <p style={{ color: '#a1a1aa' }}>Carregando...</p>
        </div>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </main>
    );
  }

  return <SiteViewer siteData={siteData} />;
}