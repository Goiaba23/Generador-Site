'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const palette = {
  bg: '#08080F',
  surface: '#0C0C1A',
  text: '#F0F0F5',
  muted: '#686880',
  primary: '#7C5CFC',
  primarySoft: 'rgba(124, 92, 252, 0.12)',
  accent: '#F25C9E',
  accentSoft: 'rgba(242, 92, 158, 0.15)',
  gold: '#D4A853',
  border: 'rgba(255, 255, 255, 0.05)',
  glass: 'rgba(255, 255, 255, 0.03)',
  glow: 'rgba(124, 92, 252, 0.25)',
};

const niches = [
  { type: 'RESTAURANT', label: 'Restaurante', cat: 'Food' },
  { type: 'BAKERY', label: 'Padaria', cat: 'Food' },
  { type: 'PIZZA', label: 'Pizzaria', cat: 'Food' },
  { type: 'COFFEE', label: 'Cafeteria', cat: 'Food' },
  { type: 'VEGAN', label: 'Vegano', cat: 'Food' },
  { type: 'FOOD_TRUCK', label: 'Food Truck', cat: 'Food' },
  { type: 'BUTCHER', label: 'Açougue', cat: 'Food' },
  { type: 'GROCERY', label: 'Mercearia', cat: 'Food' },
  { type: 'ICE_CREAM', label: 'Sorveteria', cat: 'Food' },
  { type: 'JUICE', label: 'Sucos', cat: 'Food' },
  { type: 'BAKERY_CAFE', label: 'Café & Padaria', cat: 'Food' },
  { type: 'BARBERSHOP', label: 'Barbearia', cat: 'Beauty' },
  { type: 'SALON', label: 'Salão', cat: 'Beauty' },
  { type: 'SPA', label: 'Spa', cat: 'Beauty' },
  { type: 'NAIL_SALON', label: 'Manicure', cat: 'Beauty' },
  { type: 'TATTOO', label: 'Tatuagem', cat: 'Beauty' },
  { type: 'BARBER', label: 'Barbearia', cat: 'Beauty' },
  { type: 'CLINIC', label: 'Clínica', cat: 'Health' },
  { type: 'DENTAL', label: 'Dentista', cat: 'Health' },
  { type: 'PHARMACY', label: 'Farmácia', cat: 'Health' },
  { type: 'VETERINARY', label: 'Veterinária', cat: 'Health' },
  { type: 'PHYSIOTHERAPY', label: 'Fisioterapia', cat: 'Health' },
  { type: 'PSYCHOLOGY', label: 'Psicologia', cat: 'Health' },
  { type: 'NUTRITION', label: 'Nutrição', cat: 'Health' },
  { type: 'HOSPITAL', label: 'Hospital', cat: 'Health' },
  { type: 'LAB', label: 'Laboratório', cat: 'Health' },
  { type: 'GYM', label: 'Academia', cat: 'Fitness' },
  { type: 'GYMNASIUM', label: 'Academia', cat: 'Fitness' },
  { type: 'PERSONAL_TRAINING', label: 'Personal', cat: 'Fitness' },
  { type: 'TECH', label: 'Tecnologia', cat: 'Tech' },
  { type: 'SOFTWARE', label: 'Software', cat: 'Tech' },
  { type: 'CYBERSECURITY', label: 'Segurança', cat: 'Tech' },
  { type: 'DATA_SCIENCE', label: 'Dados', cat: 'Tech' },
  { type: 'AI_AGENCY', label: 'Agência IA', cat: 'Tech' },
  { type: 'LAW_FIRM', label: 'Advocacia', cat: 'Service' },
  { type: 'CONSULTANT', label: 'Consultoria', cat: 'Service' },
  { type: 'CLEANING', label: 'Limpeza', cat: 'Service' },
  { type: 'COWORKING', label: 'Coworking', cat: 'Service' },
  { type: 'CONSTRUCTION', label: 'Construção', cat: 'Service' },
  { type: 'AUTO_REPAIR', label: 'Mecânica', cat: 'Service' },
  { type: 'EVENT', label: 'Eventos', cat: 'Service' },
  { type: 'TRANSPORT', label: 'Transporte', cat: 'Service' },
  { type: 'MOVING', label: 'Mudanças', cat: 'Service' },
  { type: 'DELIVERY', label: 'Entrega', cat: 'Service' },
  { type: 'RETAIL', label: 'Loja', cat: 'Retail' },
  { type: 'ECOMMERCE', label: 'Ecommerce', cat: 'Retail' },
  { type: 'FLORIST', label: 'Floricultura', cat: 'Retail' },
  { type: 'PET_SHOP', label: 'Pet Shop', cat: 'Retail' },
  { type: 'HOTEL', label: 'Hotel', cat: 'Travel' },
  { type: 'TRAVEL', label: 'Viagens', cat: 'Travel' },
  { type: 'HOSTEL', label: 'Hostel', cat: 'Travel' },
  { type: 'RESORT', label: 'Resort', cat: 'Travel' },
  { type: 'REAL_ESTATE', label: 'Imobiliária', cat: 'Realty' },
  { type: 'REAL_ESTATE_AGENCY', label: 'Corretora', cat: 'Realty' },
  { type: 'FINANCIAL', label: 'Finanças', cat: 'Finance' },
  { type: 'INSURANCE', label: 'Seguros', cat: 'Finance' },
  { type: 'ACCOUNTING', label: 'Contabilidade', cat: 'Finance' },
  { type: 'MARKETING', label: 'Marketing', cat: 'Marketing' },
  { type: 'SEO_AGENCY', label: 'SEO', cat: 'Marketing' },
  { type: 'SCHOOL', label: 'Escola', cat: 'Education' },
  { type: 'EDUCATION', label: 'Educação', cat: 'Education' },
  { type: 'MUSIC_SCHOOL', label: 'Música', cat: 'Education' },
  { type: 'ART_STUDIO', label: 'Arte', cat: 'Culture' },
  { type: 'CINEMA', label: 'Cinema', cat: 'Culture' },
  { type: 'THRATRE', label: 'Teatro', cat: 'Culture' },
  { type: 'PLAYGROUND', label: 'Parque', cat: 'Culture' },
  { type: 'NIGHTCLUB', label: 'Balada', cat: 'Culture' },
];

const categories = [...new Set(niches.map(n => n.cat))];

function FloatingOrbs() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const orbs = container.querySelectorAll('.orb');
    let mouseX = 0, mouseY = 0;

    const onMouse = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouseX = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      mouseY = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
      gsap.to(orbs, {
        x: mouseX * 25,
        y: mouseY * 25,
        duration: 1.5,
        ease: 'power2.out',
        overwrite: 'auto',
      });
    };

    container.addEventListener('mousemove', onMouse);

    orbs.forEach((orb, i) => {
      gsap.to(orb, {
        y: (i % 2 === 0 ? -20 : 20),
        x: (i % 3 === 0 ? 15 : -15),
        rotation: (i % 2 === 0 ? 5 : -5),
        duration: 4 + i * 0.5,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });
    });

    return () => container.removeEventListener('mousemove', onMouse);
  }, []);

  return (
    <div ref={containerRef} style={{ position: 'fixed', inset: 0, perspective: '1200px', pointerEvents: 'none', zIndex: 0, overflow: 'hidden' }}>
      <div className="orb" data-depth="25" style={{ position: 'absolute', top: '12%', left: '8%', width: '420px', height: '420px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(124,92,252,0.12) 0%, transparent 70%)', filter: 'blur(80px)', transformStyle: 'preserve-3d', willChange: 'transform' }} />
      <div className="orb" data-depth="-20" style={{ position: 'absolute', bottom: '5%', right: '12%', width: '350px', height: '350px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(242,92,158,0.1) 0%, transparent 70%)', filter: 'blur(90px)', transformStyle: 'preserve-3d', willChange: 'transform' }} />
      <div className="orb" data-depth="30" style={{ position: 'absolute', top: '40%', right: '25%', width: '250px', height: '250px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(212,168,83,0.08) 0%, transparent 70%)', filter: 'blur(70px)', transformStyle: 'preserve-3d', willChange: 'transform' }} />
      <div className="orb" data-depth="-15" style={{ position: 'absolute', bottom: '30%', left: '20%', width: '300px', height: '300px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(124,92,252,0.06) 0%, transparent 70%)', filter: 'blur(100px)', transformStyle: 'preserve-3d', willChange: 'transform' }} />
      <div className="orb" data-depth="18" style={{ position: 'absolute', top: '60%', left: '60%', width: '200px', height: '200px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(242,92,158,0.08) 0%, transparent 70%)', filter: 'blur(60px)', transformStyle: 'preserve-3d', willChange: 'transform' }} />
    </div>
  );
}

function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let w = canvas.width = window.innerWidth;
    let h = canvas.height = window.innerHeight;
    const particles: { x: number; y: number; vx: number; vy: number; r: number; a: number }[] = [];

    for (let i = 0; i < 60; i++) {
      particles.push({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        r: Math.random() * 1.5 + 0.5,
        a: Math.random() * 0.4 + 0.1,
      });
    }

    const resize = () => { w = canvas.width = window.innerWidth; h = canvas.height = window.innerHeight; };
    window.addEventListener('resize', resize);

    let anim: number;
    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      particles.forEach(p => {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(124, 92, 252, ${p.a})`;
        ctx.fill();
      });

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 150) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(124, 92, 252, ${0.05 * (1 - dist / 150)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      anim = requestAnimationFrame(draw);
    };
    draw();

    return () => { cancelAnimationFrame(anim); window.removeEventListener('resize', resize); };
  }, []);

  return <canvas ref={canvasRef} style={{ position: 'fixed', inset: 0, zIndex: 1, pointerEvents: 'none' }} />;
}

function NoiseTexture() {
  return <div style={{ position: 'fixed', inset: 0, zIndex: 2, opacity: 0.03, backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\'/%3E%3C/svg%3E")', backgroundSize: '256px 256px', pointerEvents: 'none' }} />;
}

function GlassCard({ children, selected, onClick, style }: { children: React.ReactNode; selected?: boolean; onClick?: () => void; style?: React.CSSProperties }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    gsap.from(ref.current, { opacity: 0, y: 20, scale: 0.95, duration: 0.6, ease: 'power3.out', scrollTrigger: { trigger: ref.current, start: 'top 85%' } });
  }, []);

  return (
    <div
      ref={ref}
      onClick={onClick}
      style={{
        background: selected ? `linear-gradient(135deg, ${palette.primarySoft}, ${palette.accentSoft})` : palette.glass,
        border: `1px solid ${selected ? palette.primary : palette.border}`,
        borderRadius: '1rem',
        padding: '1.25rem',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        cursor: onClick ? 'pointer' : 'default',
        transition: 'all 0.35s cubic-bezier(0.22, 1, 0.36, 1)',
        position: 'relative',
        overflow: 'hidden',
        ...style,
      }}
      onMouseEnter={e => { if (!selected) gsap.to(e.currentTarget, { scale: 1.02, borderColor: 'rgba(255,255,255,0.15)', duration: 0.3 }); }}
      onMouseLeave={e => { if (!selected) gsap.to(e.currentTarget, { scale: 1, borderColor: palette.border, duration: 0.3 }); }}
    >
      {selected && <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(circle at 50% 0%, ${palette.glow}, transparent 70%)`, opacity: 0.3, pointerEvents: 'none' }} />}
      {children}
    </div>
  );
}

function StepIndicator({ num, label, active }: { num: number; label: string; active: boolean }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', opacity: active ? 1 : 0.3, transition: 'opacity 0.5s ease' }}>
      <div style={{
        width: '2rem', height: '2rem', borderRadius: '50%',
        background: active ? `linear-gradient(135deg, ${palette.primary}, ${palette.accent})` : palette.border,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: '0.7rem', fontWeight: 800, color: active ? '#fff' : palette.muted,
        transition: 'all 0.4s ease',
      }}>{num}</div>
      <span style={{ fontSize: '0.85rem', fontWeight: 600, color: active ? palette.text : palette.muted }}>{label}</span>
    </div>
  );
}

function ProgressDots({ total, current }: { total: number; current: number }) {
  return (
    <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center', marginTop: '2rem' }}>
      {Array.from({ length: total }).map((_, i) => (
        <div key={i} style={{
          width: i === current ? '2rem' : '0.5rem', height: '0.5rem', borderRadius: '999px',
          background: i <= current ? `linear-gradient(90deg, ${palette.primary}, ${palette.accent})` : palette.border,
          transition: 'all 0.5s cubic-bezier(0.22, 1, 0.36, 1)',
        }} />
      ))}
    </div>
  );
}

export default function CreatePage() {
  const router = useRouter();
  const mainRef = useRef<HTMLDivElement>(null);
  const [step, setStep] = useState(0);
  const [catFilter, setCatFilter] = useState('All');
  const [loading, setLoading] = useState(false);
  const [progressStep, setProgressStep] = useState(0);

  const [form, setForm] = useState({ businessType: '', businessName: '', style: '', solutions: [] as string[] });

  const filteredNiches = catFilter === 'All' ? niches : niches.filter(n => n.cat === catFilter);
  const selected = niches.find(n => n.type === form.businessType);

  const styleOpts = [
    { id: 'MODERN', label: 'Modern', desc: 'Clean & minimal' },
    { id: 'BOLD', label: 'Bold', desc: 'High impact' },
    { id: 'MINIMAL', label: 'Minimal', desc: 'Refined luxury' },
    { id: 'LUXURY', label: 'Luxury', desc: 'Timeless elegance' },
  ];

  const features = ['Booking', 'Ecommerce', 'Animations', 'SEO', 'Chat', 'WhatsApp', 'Gallery', 'Blog'];

  const progressSteps = [
    { icon: '◈', title: 'Research', desc: 'Analyzing niche trends' },
    { icon: '◈', title: 'Design', desc: 'Crafting layout' },
    { icon: '◈', title: 'Develop', desc: 'Building components' },
    { icon: '◈', title: 'Animate', desc: 'Adding motion' },
    { icon: '◈', title: 'Launch', desc: 'Final polish' },
  ];

  useEffect(() => {
    gsap.from(mainRef.current, { opacity: 0, duration: 0.6, ease: 'power2.out' });
  }, []);

  const handleGenerate = async () => {
    if (!form.businessType || !form.businessName || !form.style) return;
    setLoading(true);
    setProgressStep(0);

    const pi = setInterval(() => setProgressStep(p => p < 4 ? p + 1 : p), 1500);

    try {
      const res = await fetch('/api/sites/ultimate-create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          businessName: form.businessName,
          businessType: form.businessType,
          style: form.style,
          plan: 'premium',
          solutions: form.solutions,
        }),
      });
      const data = await res.json();
      clearInterval(pi);
      setProgressStep(4);
      setTimeout(() => data.site?.slug && router.push(`/sites/${data.site.slug}`), 1500);
    } catch {
      clearInterval(pi);
      setLoading(false);
    }
  };

  return (
    <main ref={mainRef} style={{ background: palette.bg, minHeight: '100vh', position: 'relative', color: palette.text, fontFamily: "'Inter', system-ui, sans-serif" }}>
      <FloatingOrbs />
      <ParticleField />
      <NoiseTexture />

      <nav style={{ position: 'relative', zIndex: 10, padding: '1.5rem 2rem', maxWidth: '1280px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Link href="/" style={{ textDecoration: 'none', color: palette.text, fontSize: '1.25rem', fontWeight: 800, letterSpacing: '-0.03em' }}>
          <span style={{ background: `linear-gradient(135deg, ${palette.primary}, ${palette.accent})`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Studio</span>
        </Link>
        <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
          <Link href="/sites" style={{ textDecoration: 'none', color: palette.muted, fontSize: '0.85rem', fontWeight: 500 }}>Projects</Link>
          <div style={{ width: '1.5rem', height: '1.5rem', borderRadius: '50%', background: `linear-gradient(135deg, ${palette.primary}, ${palette.accent})` }} />
        </div>
      </nav>

      <div style={{ position: 'relative', zIndex: 5, maxWidth: '1100px', margin: '0 auto', padding: '3rem 2rem 8rem' }}>
        {!loading ? (
          <>
            <header style={{ textAlign: 'center', marginBottom: '4rem' }}>
              <div style={{ display: 'inline-flex', gap: '0.5rem', marginBottom: '1.5rem' }}>
                <StepIndicator num={1} label="Niche" active={step >= 0} />
                <span style={{ color: palette.muted, padding: '0.5rem 0.5rem 0' }}>→</span>
                <StepIndicator num={2} label="Style" active={step >= 1} />
                <span style={{ color: palette.muted, padding: '0.5rem 0.5rem 0' }}>→</span>
                <StepIndicator num={3} label="Review" active={step >= 2} />
              </div>
              <h1 style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)', fontWeight: 800, letterSpacing: '-0.04em', marginBottom: '0.75rem', lineHeight: 1.1 }}>
                {step === 0 ? 'Choose your path' : step === 1 ? 'Define your style' : 'Almost there'}
              </h1>
              <p style={{ color: palette.muted, fontSize: '1.05rem', maxWidth: '500px', margin: '0 auto' }}>
                {step === 0 ? 'Select your business niche to begin' : step === 1 ? 'Pick the visual direction' : 'Review your choices'}
              </p>
            </header>

            {step === 0 && (
              <section>
                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', justifyContent: 'center', marginBottom: '2.5rem' }}>
                  {['All', ...categories].map(c => (
                    <button key={c} onClick={() => setCatFilter(c)} style={{
                      padding: '0.4rem 1.2rem', borderRadius: '999px', border: `1px solid ${catFilter === c ? palette.primary : palette.border}`,
                      background: catFilter === c ? palette.primarySoft : 'transparent', color: catFilter === c ? palette.primary : palette.muted,
                      fontSize: '0.78rem', fontWeight: 600, cursor: 'pointer', transition: 'all 0.3s ease',
                    }}>{c}</button>
                  ))}
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))', gap: '0.75rem' }}>
                  {filteredNiches.map(n => (
                    <GlassCard key={n.type} selected={form.businessType === n.type} onClick={() => setForm(p => ({ ...p, businessType: n.type }))}>
                      <div style={{ fontSize: '0.8rem', fontWeight: 700, textAlign: 'center' }}>{n.label}</div>
                    </GlassCard>
                  ))}
                </div>

                <div style={{ marginTop: '3rem', display: 'flex', flexDirection: 'column', gap: '1.25rem', maxWidth: '480px', marginInline: 'auto' }}>
                  <div>
                    <label style={{ fontSize: '0.8rem', color: palette.muted, fontWeight: 600, marginBottom: '0.5rem', display: 'block' }}>Brand name</label>
                    <input value={form.businessName} onChange={e => setForm(p => ({ ...p, businessName: e.target.value }))} placeholder="e.g. Aurora Studio" style={{
                      width: '100%', padding: '1rem 1.25rem', background: palette.glass, border: `1px solid ${palette.border}`, borderRadius: '0.875rem',
                      color: palette.text, fontSize: '1rem', outline: 'none',
                    }} onFocus={e => gsap.to(e.target, { borderColor: palette.primary, duration: 0.3 })} onBlur={e => gsap.to(e.target, { borderColor: palette.border, duration: 0.3 })} />
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'center', marginTop: '0.5rem' }}>
                    <button onClick={() => setStep(1)} disabled={!form.businessType || !form.businessName} style={{
                      padding: '0.85rem 2.5rem', borderRadius: '999px', border: 'none',
                      background: `linear-gradient(135deg, ${palette.primary}, ${palette.accent})`,
                      color: '#fff', fontWeight: 700, fontSize: '0.9rem', cursor: form.businessType && form.businessName ? 'pointer' : 'not-allowed',
                      opacity: form.businessType && form.businessName ? 1 : 0.3, transition: 'all 0.3s ease',
                    }}>Continue →</button>
                  </div>
                </div>
              </section>
            )}

            {step === 1 && (
              <section style={{ maxWidth: '600px', margin: '0 auto' }}>
                <div style={{ display: 'grid', gap: '1rem', marginBottom: '2.5rem' }}>
                  {styleOpts.map(o => (
                    <GlassCard key={o.id} selected={form.style === o.id} onClick={() => setForm(p => ({ ...p, style: o.id }))} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1.25rem 1.5rem' }}>
                      <div>
                        <div style={{ fontWeight: 700, fontSize: '1rem' }}>{o.label}</div>
                        <div style={{ fontSize: '0.8rem', color: palette.muted, marginTop: '0.15rem' }}>{o.desc}</div>
                      </div>
                      <div style={{ width: '2rem', height: '2rem', borderRadius: '50%', border: `2px solid ${form.style === o.id ? palette.primary : palette.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.3s' }}>
                        {form.style === o.id && <div style={{ width: '1rem', height: '1rem', borderRadius: '50%', background: palette.primary }} />}
                      </div>
                    </GlassCard>
                  ))}
                </div>

                <div style={{ marginBottom: '2.5rem' }}>
                  <label style={{ fontSize: '0.8rem', color: palette.muted, fontWeight: 600, marginBottom: '0.75rem', display: 'block' }}>Features</label>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                    {features.map(f => (
                      <button key={f} onClick={() => setForm(p => ({ ...p, solutions: p.solutions.includes(f) ? p.solutions.filter(x => x !== f) : [...p.solutions, f] }))} style={{
                        padding: '0.5rem 1.25rem', borderRadius: '999px', border: `1px solid ${form.solutions.includes(f) ? palette.primary : palette.border}`,
                        background: form.solutions.includes(f) ? palette.primarySoft : 'transparent',
                        color: form.solutions.includes(f) ? palette.primary : palette.muted, fontSize: '0.8rem', fontWeight: 600, cursor: 'pointer', transition: 'all 0.2s',
                      }}>{f}</button>
                    ))}
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                  <button onClick={() => setStep(0)} style={{ padding: '0.85rem 2rem', borderRadius: '999px', border: `1px solid ${palette.border}`, background: 'transparent', color: palette.muted, fontWeight: 600, cursor: 'pointer' }}>Back</button>
                  <button onClick={() => setStep(2)} disabled={!form.style} style={{
                    padding: '0.85rem 2.5rem', borderRadius: '999px', border: 'none',
                    background: `linear-gradient(135deg, ${palette.primary}, ${palette.accent})`,
                    color: '#fff', fontWeight: 700, fontSize: '0.9rem', cursor: form.style ? 'pointer' : 'not-allowed',
                    opacity: form.style ? 1 : 0.3, transition: 'all 0.3s ease',
                  }}>Review →</button>
                </div>
              </section>
            )}

            {step === 2 && (
              <section style={{ maxWidth: '500px', margin: '0 auto' }}>
                <GlassCard style={{ marginBottom: '2rem' }}>
                  <div style={{ display: 'grid', gap: '1rem' }}>
                    <div><span style={{ color: palette.muted, fontSize: '0.75rem', fontWeight: 600 }}>NICHE</span><div style={{ fontWeight: 700, marginTop: '0.25rem' }}>{selected?.label}</div></div>
                    <div><span style={{ color: palette.muted, fontSize: '0.75rem', fontWeight: 600 }}>BRAND</span><div style={{ fontWeight: 700, marginTop: '0.25rem' }}>{form.businessName}</div></div>
                    <div><span style={{ color: palette.muted, fontSize: '0.75rem', fontWeight: 600 }}>STYLE</span><div style={{ fontWeight: 700, marginTop: '0.25rem' }}>{styleOpts.find(s => s.id === form.style)?.label}</div></div>
                    {form.solutions.length > 0 && (
                      <div><span style={{ color: palette.muted, fontSize: '0.75rem', fontWeight: 600 }}>FEATURES</span><div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', marginTop: '0.4rem' }}>{form.solutions.map(s => <span key={s} style={{ padding: '0.2rem 0.6rem', borderRadius: '999px', background: palette.primarySoft, color: palette.primary, fontSize: '0.75rem', fontWeight: 600 }}>{s}</span>)}</div></div>
                    )}
                  </div>
                </GlassCard>

                <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                  <button onClick={() => setStep(1)} style={{ padding: '0.85rem 2rem', borderRadius: '999px', border: `1px solid ${palette.border}`, background: 'transparent', color: palette.muted, fontWeight: 600, cursor: 'pointer' }}>Back</button>
                  <button onClick={handleGenerate} style={{
                    padding: '0.85rem 2.5rem', borderRadius: '999px', border: 'none',
                    background: `linear-gradient(135deg, ${palette.primary}, ${palette.accent})`,
                    color: '#fff', fontWeight: 700, fontSize: '0.9rem', cursor: 'pointer',
                    boxShadow: `0 8px 32px ${palette.glow}`,
                  }}>Generate Site</button>
                </div>
              </section>
            )}

            <ProgressDots total={3} current={step} />
          </>
        ) : (
          <section style={{ maxWidth: '520px', margin: '0 auto', textAlign: 'center' }}>
            <div style={{ position: 'relative', width: '120px', height: '120px', margin: '0 auto 2.5rem' }}>
              <div style={{ position: 'absolute', inset: 0, borderRadius: '50%', border: `2px solid ${palette.border}`, animation: 'spin 3s linear infinite' }} />
              <div style={{ position: 'absolute', inset: '8px', borderRadius: '50%', border: `2px solid transparent`, borderTopColor: palette.primary, animation: 'spin 2s linear infinite' }} />
              <div style={{ position: 'absolute', inset: '16px', borderRadius: '50%', border: `2px solid transparent`, borderRightColor: palette.accent, animation: 'spin 1.5s linear infinite reverse' }} />
              <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem' }}>◈</div>
            </div>

            <h2 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '0.5rem' }}>Building your site</h2>
            <p style={{ color: palette.muted, fontSize: '0.9rem', marginBottom: '3rem' }}>{progressSteps[progressStep]?.desc}</p>

            <div style={{ display: 'grid', gap: '0.75rem' }}>
              {progressSteps.map((s, i) => (
                <div key={i} style={{
                  display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem 1.25rem',
                  borderRadius: '0.875rem',
                  background: i <= progressStep ? palette.primarySoft : 'transparent',
                  border: `1px solid ${i <= progressStep ? palette.primary : palette.border}`,
                  transition: 'all 0.5s ease',
                  opacity: i <= progressStep ? 1 : 0.3,
                }}>
                  <div style={{ width: '1.75rem', height: '1.75rem', borderRadius: '50%', background: i < progressStep ? palette.primary : i === progressStep ? `linear-gradient(135deg, ${palette.primary}, ${palette.accent})` : palette.border, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.7rem', color: '#fff', fontWeight: 700 }}>
                    {i < progressStep ? '✓' : i + 1}
                  </div>
                  <div style={{ flex: 1, textAlign: 'left' }}>
                    <div style={{ fontWeight: 700, fontSize: '0.85rem' }}>{s.title}</div>
                    <div style={{ fontSize: '0.75rem', color: palette.muted }}>{s.desc}</div>
                  </div>
                  {i === progressStep && progressStep < 4 && (
                    <div style={{ width: '0.5rem', height: '0.5rem', borderRadius: '50%', background: palette.primary, animation: 'pulse 1s ease infinite' }} />
                  )}
                </div>
              ))}
            </div>
          </section>
        )}
      </div>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.3; } }
      `}</style>
    </main>
  );
}
