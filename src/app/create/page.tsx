'use client';

import { useState } from 'react';
import Link from 'next/link';

// ===== TYPE DEFINITIONS =====

interface BusinessOption {
  type: string;
  label: string;
  icon: string;
  category: string;
}

interface PainOption {
  id: string;
  label: string;
}

interface SolutionOption {
  id: string;
  label: string;
  description: string;
  icon: string;
}

interface StyleOption {
  style: string;
  label: string;
  image: string;
  description: string;
}

// ===== CATALOG DATA =====

const businessCatalog: BusinessOption[] = [
  // Alimentação
  { type: 'RESTAURANT', label: 'Restaurante', icon: '🍽️', category: 'Alimentação' },
  { type: 'BURGER_JOINT', label: 'Hamburgueria', icon: '🍔', category: 'Alimentação' },
  { type: 'PIZZERIA', label: 'Pizzaria', icon: '🍕', category: 'Alimentação' },
  { type: 'COFFEE_SHOP', label: 'Cafeteria', icon: '☕', category: 'Alimentação' },
  { type: 'BAR', label: 'Bar/Pub', icon: '🍺', category: 'Alimentação' },
  // Beleza
  { type: 'SALON', label: 'Salão de Beleza', icon: '💇', category: 'Beleza' },
  { type: 'BARBERSHOP', label: 'Barbearia', icon: '💈', category: 'Beleza' },
  { type: 'SPA', label: 'SPA/Massagem', icon: '💆', category: 'Beleza' },
  { type: 'NAIL_SALON', label: 'Esmalteria', icon: '💅', category: 'Beleza' },
  // Saúde
  { type: 'CLINIC', label: 'Clínica Médica', icon: '🏥', category: 'Saúde' },
  { type: 'DENTIST', label: 'Dentista', icon: '🦷', category: 'Saúde' },
  { type: 'PSYCHOLOGIST', label: 'Psicólogo', icon: '🧠', category: 'Saúde' },
  // Fitness
  { type: 'GYM', label: 'Academia', icon: '💪', category: 'Fitness' },
  { type: 'PERSONAL_TRAINER', label: 'Personal Trainer', icon: '🏋️', category: 'Fitness' },
  { type: 'YOGA_STUDIO', label: 'Studio de Yoga', icon: '🧘', category: 'Fitness' },
  // Serviços
  { type: 'LAWYER', label: 'Advogado', icon: '⚖️', category: 'Serviços' },
  { type: 'CONSULTING', label: 'Consultoria', icon: '💼', category: 'Serviços' },
  { type: 'REAL_ESTATE', label: 'Imobiliária', icon: '🏠', category: 'Serviços' },
  // Tech
  { type: 'TECH', label: 'Tecnologia/SaaS', icon: '💻', category: 'Tech' },
  { type: 'WEB_AGENCY', label: 'Agência Web', icon: '🌐', category: 'Tech' },
  // Varejo
  { type: 'RETAIL', label: 'Loja/Varejo', icon: '🛍️', category: 'Varejo' },
  { type: 'PET_SHOP', label: 'Pet Shop', icon: '🐕', category: 'Varejo' },
  // Hotelaria
  { type: 'HOTEL', label: 'Hotel/Pousada', icon: '🏨', category: 'Hotelaria' },
  // Educação
  { type: 'SCHOOL', label: 'Escola/Curso', icon: '🏫', category: 'Educação' },
];

// ===== PAIN OPTIONS (Ready to select) =====

const painOptions: Record<string, PainOption[]> = {
  'default': [
    { id: 'few_customers', label: 'Poucos clientes novos' },
    { id: 'no_online_presence', label: 'Sem presença online' },
    { id: 'manual_scheduling', label: 'Agendamento manual' },
    { id: 'no_online_sales', label: 'Não vende online' },
    { id: 'losing_customers', label: 'Perde clientes' },
  ],
  'food': [
    { id: 'phone_orders', label: 'Pedidos só por telefone' },
    { id: 'no_menu_online', label: 'Cardápio não está online' },
    { id: 'delivery_disorganized', label: 'Delivery desorganizado' },
    { id: 'no_reservations', label: 'Sem sistema de reservas' },
  ],
  'beauty': [
    { id: 'forgot_appointments', label: 'Clientes esquecem horários' },
    { id: 'no_portfolio', label: 'Sem portfólio visual' },
    { id: 'phone_busy', label: 'Telefone sempre ocupado' },
    { id: 'no_loyalty', label: 'Sem programa de fidelidade' },
  ],
  'health': [
    { id: 'long_queues', label: 'Filas de espera' },
    { id: 'no_online_booking', label: 'Agendamento só por telefone' },
    { id: 'paper_records', label: 'Prontuário em papel' },
    { id: 'hard_to_find', label: 'Difícil de encontrar online' },
  ],
};

// ===== SOLUTION OPTIONS (REQUIRED - What the site will have) =====

const solutionOptions: SolutionOption[] = [
  { id: 'online_catalog', label: 'Catálogo Online', description: '展示 produtos/serviços', icon: '📋' },
  { id: 'online_booking', label: 'Agendamento Online', description: '📅 Agenda 24/7', icon: '📅' },
  { id: 'online_orders', label: 'Pedidos Online', description: '🛒 Compra direta no site', icon: '🛒' },
  { id: 'delivery_integration', label: 'Delivery', description: '🚚 Rastreamento em tempo real', icon: '🚚' },
  { id: 'reservation_system', label: 'Reservas', description: '🍽️ Mesa/horário marcado', icon: '🍽️' },
  { id: 'loyalty_program', label: 'Programa Fidelidade', description: '⭐ Pontos e recompensas', icon: '⭐' },
  { id: 'whatsapp_integration', label: 'WhatsApp Direct', description: '💬 Botão flutuante', icon: '💬' },
  { id: 'online_payment', label: 'Pagamento Online', description: '💳 PIX/Cartão no site', icon: '💳' },
  { id: 'blog_content', label: 'Blog/Conteúdo', description: '✍️ Artigos e dicas', icon: '✍️' },
  { id: 'portfolio_gallery', label: 'Galeria/Portfólio', description: '🖼️ Fotos e trabalhos', icon: '🖼️' },
  { id: 'customer_area', label: 'Área do Cliente', description: '🔐 Login e histórico', icon: '🔐' },
  { id: 'reviews_testimonials', label: 'Depoimentos', description: '⭐ Avaliações sociais', icon: '⭐' },
];

// ===== STYLE OPTIONS (With images) =====

const styleOptions: StyleOption[] = [
  { 
    style: 'MODERN', 
    label: 'Moderno Clean', 
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52d?w=400&h=300&fit=crop',
    description: 'Clean, minimal, plenty of white space'
  },
  { 
    style: 'BOLD', 
    label: 'Ousado Vibrante', 
    image: 'https://images.unsplash.com/photo-1557682250-33bd709cbe85?w=400&h=300&fit=crop',
    description: 'Cores vibrantes, design impactante'
  },
  { 
    style: 'MINIMAL', 
    label: 'Minimalista', 
    image: 'https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?w=400&h=300&fit=crop',
    description: 'Foco no essencial, simplicidade'
  },
  { 
    style: 'CLASSIC', 
    label: 'Elegante Clássico', 
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop',
    description: 'Elegância atemporal, serif fonts'
  },
  { 
    style: 'LUXURY', 
    label: 'Luxo Premium', 
    image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=400&h=300&fit=crop',
    description: 'Gold accents, dark theme, premium'
  },
  { 
    style: 'CREATIVE', 
    label: 'Criativo Arte', 
    image: 'https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=400&h=300&fit=crop',
    description: 'Artístico, único, memorável'
  },
];

// ===== STITCH PROMPT GENERATOR =====

function generateStitchPrompt(business: BusinessOption, solutions: string[], style: string): string {
  const businessName = business.label;
  const features = solutions.map(id => {
    const opt = solutionOptions.find(s => s.id === id);
    return opt?.label || id;
  }).join(', ');
  
  const styleDesc = styleOptions.find(s => s.style === style)?.description || 'modern';
  
  return `Create a premium ${styleDesc} website for a ${businessName}. 
Features needed: ${features}.
Style: ${styleDesc}, high-converting, $10K+ quality.
Use GSAP animations, modern typography, mobile-first design.`;
}

// ===== MAIN COMPONENT =====

export default function CreateSitePage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  
  // Form state
  const [formData, setFormData] = useState({
    businessType: '',
    businessName: '',
    painPoints: [] as string[],
    solutions: [] as string[],
    style: '',
    phone: '',
    email: '',
    address: '',
  });

  const categories = [...new Set(businessCatalog.map(b => b.category))];
  const selectedBusiness = businessCatalog.find(b => b.type === formData.businessType);
  
  const getPainOptions = () => {
    if (!selectedBusiness) return painOptions.default;
    const cat = selectedBusiness.category.toLowerCase();
    if (cat === 'alimentação') return painOptions.food;
    if (cat === 'beleza') return painOptions.beauty;
    if (cat === 'saúde') return painOptions.health;
    return painOptions.default;
  };

  const togglePain = (id: string) => {
    setFormData(prev => ({
      ...prev,
      painPoints: prev.painPoints.includes(id) 
        ? prev.painPoints.filter(p => p !== id)
        : [...prev.painPoints, id]
    }));
  };

  const toggleSolution = (id: string) => {
    setFormData(prev => ({
      ...prev,
      solutions: prev.solutions.includes(id)
        ? prev.solutions.filter(s => s !== id)
        : [...prev.solutions, id]
    }));
  };

  const handleSubmit = async () => {
    if (!formData.businessType || !formData.businessName || formData.solutions.length === 0 || !formData.style) {
      alert('Preencha: Nicho, Nome, Estilo e pelo menos 1 solução!');
      return;
    }
    
    setLoading(true);
    
    // Generate Stitch prompt
    const stitchPrompt = generateStitchPrompt(
      selectedBusiness!,
      formData.solutions,
      formData.style
    );
    
    console.log('Stitch Prompt:', stitchPrompt);
    
    try {
      const response = await fetch('/api/sites/ultimate-create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          businessName: formData.businessName,
          businessType: formData.businessType,
          painPoints: formData.painPoints,
          solutions: formData.solutions,
          style: formData.style,
          phone: formData.phone,
          email: formData.email,
          address: formData.address,
          stitchPrompt,
        }),
      });
      
      const data = await response.json();
      
      if (data.upgrade) {
        alert('Limite do plano grátis atingido!');
        return;
      }
      
      // Store site data for retrieval
      await fetch(`/api/sites/${data.slug}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ siteData: data }),
      });
      
      router.push(`/sites/${data.slug}`);
    } catch (error) {
      console.error('Error:', error);
      alert('Erro ao criar site');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main style={{ backgroundColor: '#0a0a1a', minHeight: '100vh', color: '#fff' }}>
      {/* Background */}
      <div style={{ position: 'fixed', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
        <div style={{ position: 'absolute', top: '-20%', left: '-10%', width: '600px', height: '600px', background: 'radial-gradient(circle, rgba(79,70,229,0.1), transparent)', borderRadius: '50%', filter: 'blur(80px)' }} />
        <div style={{ position: 'absolute', bottom: '10%', right: '-10%', width: '500px', height: '500px', background: 'radial-gradient(circle, rgba(192,132,252,0.08), transparent)', borderRadius: '50%', filter: 'blur(80px)' }} />
      </div>

      {/* Header */}
      <header style={{ position: 'fixed', top: 0, left: 0, right: 0, background: 'rgba(10,10,26,0.95)', backdropFilter: 'blur(20px)', borderBottom: '1px solid rgba(255,255,255,0.1)', zIndex: 100 }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '1rem 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', textDecoration: 'none' }}>
            <div style={{ width: '40px', height: '40px', background: 'linear-gradient(135deg, #4f46e5, #7c3aed)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '1.25rem' }}>S</div>
            <span style={{ fontWeight: 800, fontSize: '1.5rem', color: 'white' }}>SitesSaaS</span>
          </Link>
          <Link href="/sites" style={{ color: '#94a3b8', textDecoration: 'none', fontSize: '0.9rem' }}>← Meus Sites</Link>
        </div>
      </header>

      {/* Main Content - Single Scroll */}
      <div style={{ paddingTop: '100px', paddingBottom: '100px', maxWidth: '1200px', margin: '0 auto', paddingLeft: '2rem', paddingRight: '2rem' }}>
        
        {/* Title */}
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h1 style={{ fontSize: '2.5rem', fontWeight: 900, marginBottom: '0.5rem', background: 'linear-gradient(to right, #818cf8, #c084fc)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            Crie site premium para seu cliente
          </h1>
          <p style={{ color: '#64748b', fontSize: '1.1rem' }}>Selecione as opções abaixo em um único fluxo</p>
        </div>

        {/* STEP 1: Business Type */}
        <section style={{ marginBottom: '4rem' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ background: '#4f46e5', color: 'white', width: '32px', height: '32px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.9rem' }}>1</span>
            Qual o negócio do seu cliente?
          </h2>
          
          {/* Category Filter - Single Row */}
          <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
            {categories.map(cat => (
              <button key={cat} onClick={() => {}} style={{
                padding: '0.5rem 1rem', borderRadius: '2rem', border: '1px solid rgba(255,255,255,0.1)',
                background: 'rgba(30,41,59,0.8)', color: '#94a3b8', fontSize: '0.85rem', cursor: 'pointer',
              }}>{cat}</button>
            ))}
          </div>
          
          {/* Business Grid - Single Scroll */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '0.75rem', maxHeight: '300px', overflowY: 'auto', padding: '0.5rem' }}>
            {businessCatalog.map(bt => (
              <button key={bt.type} onClick={() => setFormData({ ...formData, businessType: bt.type })} style={{
                display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '1rem',
                background: formData.businessType === bt.type ? 'rgba(79,70,229,0.2)' : 'rgba(30,41,59,0.6)',
                border: formData.businessType === bt.type ? '2px solid #818cf8' : '1px solid rgba(255,255,255,0.1)',
                borderRadius: '12px', cursor: 'pointer', transition: 'all 0.2s', textAlign: 'left',
              }}>
                <span style={{ fontSize: '1.5rem' }}>{bt.icon}</span>
                <span style={{ color: 'white', fontWeight: 600, fontSize: '0.9rem' }}>{bt.label}</span>
              </button>
            ))}
          </div>
        </section>

        {/* STEP 2: Pain Points (Optional) */}
        <section style={{ marginBottom: '4rem' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ background: '#64748b', color: 'white', width: '32px', height: '32px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.9rem' }}>2</span>
            Quais as dores atuais? <span style={{ color: '#64748b', fontSize: '0.9rem', fontWeight: 400 }}>(opcional)</span>
          </h2>
          
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
            {getPainOptions().map(pain => (
              <button key={pain.id} onClick={() => togglePain(pain.id)} style={{
                padding: '0.75rem 1.25rem', borderRadius: '2rem', border: '1px solid rgba(255,255,255,0.1)',
                background: formData.painPoints.includes(pain.id) ? 'rgba(239,68,68,0.2)' : 'rgba(30,41,59,0.6)',
                borderColor: formData.painPoints.includes(pain.id) ? '#ef4444' : 'rgba(255,255,255,0.1)',
                color: formData.painPoints.includes(pain.id) ? '#fca5a5' : '#cbd5e1', fontSize: '0.9rem', cursor: 'pointer', transition: 'all 0.2s',
              }}>
                {formData.painPoints.includes(pain.id) ? '✓ ' : ''}{pain.label}
              </button>
            ))}
          </div>
        </section>

        {/* STEP 3: Solutions (REQUIRED) */}
        <section style={{ marginBottom: '4rem' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ background: '#4f46e5', color: 'white', width: '32px', height: '32px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.9rem' }}>3</span>
            O que o site vai ter? <span style={{ color: '#f59e0b', fontSize: '0.9rem' }}>*obrigatório</span>
          </h2>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1rem' }}>
            {solutionOptions.map(sol => (
              <button key={sol.id} onClick={() => toggleSolution(sol.id)} style={{
                padding: '1.25rem', borderRadius: '16px', border: '2px solid',
                background: formData.solutions.includes(sol.id) ? 'rgba(16,185,129,0.15)' : 'rgba(30,41,59,0.6)',
                borderColor: formData.solutions.includes(sol.id) ? '#10b981' : 'rgba(255,255,255,0.1)',
                cursor: 'pointer', transition: 'all 0.2s', textAlign: 'left',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
                  <span style={{ fontSize: '1.5rem' }}>{sol.icon}</span>
                  <span style={{ color: 'white', fontWeight: 700, fontSize: '1rem' }}>{sol.label}</span>
                </div>
                <p style={{ color: '#94a3b8', fontSize: '0.8rem', margin: 0 }}>{sol.description}</p>
              </button>
            ))}
          </div>
        </section>

        {/* STEP 4: Style */}
        <section style={{ marginBottom: '4rem' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ background: '#4f46e5', color: 'white', width: '32px', height: '32px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.9rem' }}>4</span>
            Escolha o estilo visual
          </h2>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '1rem' }}>
            {styleOptions.map(style => (
              <button key={style.style} onClick={() => setFormData({ ...formData, style: style.style })} style={{
                padding: '0', borderRadius: '16px', border: '3px solid',
                background: formData.style === style.style ? 'rgba(79,70,229,0.3)' : 'rgba(30,41,59,0.6)',
                borderColor: formData.style === style.style ? '#818cf8' : 'rgba(255,255,255,0.1)',
                cursor: 'pointer', overflow: 'hidden', transition: 'all 0.2s',
              }}>
                <img src={style.image} alt={style.label} style={{ width: '100%', height: '120px', objectFit: 'cover' }} />
                <div style={{ padding: '1rem' }}>
                  <div style={{ color: 'white', fontWeight: 700, fontSize: '0.95rem', marginBottom: '0.25rem' }}>{style.label}</div>
                  <div style={{ color: '#94a3b8', fontSize: '0.75rem' }}>{style.description}</div>
                </div>
              </button>
            ))}
          </div>
        </section>

        {/* STEP 5: Basic Info */}
        <section style={{ marginBottom: '4rem' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ background: '#4f46e5', color: 'white', width: '32px', height: '32px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.9rem' }}>5</span>
            Informações básicas
          </h2>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
            <input type="text" placeholder="Nome do negócio *" value={formData.businessName} onChange={e => setFormData({...formData, businessName: e.target.value})} style={{
              padding: '1rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)',
              background: 'rgba(30,41,59,0.8)', color: 'white', fontSize: '1rem',
            }} />
            <input type="text" placeholder="WhatsApp" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} style={{
              padding: '1rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)',
              background: 'rgba(30,41,59,0.8)', color: 'white', fontSize: '1rem',
            }} />
            <input type="email" placeholder="Email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} style={{
              padding: '1rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)',
              background: 'rgba(30,41,59,0.8)', color: 'white', fontSize: '1rem',
            }} />
          </div>
        </section>

        {/* Submit Button */}
        <div style={{ textAlign: 'center' }}>
          <button onClick={handleSubmit} disabled={loading || !formData.businessType || !formData.businessName || formData.solutions.length === 0 || !formData.style} style={{
            padding: '1.25rem 4rem', borderRadius: '16px', border: 'none',
            background: loading || !formData.businessType || !formData.businessName || formData.solutions.length === 0 || !formData.style ? 'rgba(79,70,229,0.5)' : 'linear-gradient(135deg, #4f46e5, #7c3aed)',
            color: 'white', fontSize: '1.25rem', fontWeight: 700, cursor: loading ? 'not-allowed' : 'pointer',
            boxShadow: '0 8px 32px rgba(79,70,229,0.4)', transition: 'all 0.3s',
          }}>
            {loading ? 'Criando Site Premium...' : '🚀 Criar Site Premium'}
          </button>
        </div>

      </div>
    </main>
  );
}

import { useRouter } from 'next/navigation';