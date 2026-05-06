'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { BusinessType } from '@prisma/client';

// 2 planos mensais
const plans = [
  { 
    id: 'simple', 
    name: 'Simples', 
    price: 'R$ 79,90', 
    period: '/mês',
    description: 'Ideal para pequenos negócios',
    features: ['Geração rápida', 'WhatsApp integrado', 'Design responsivo', 'SEO básico'],
    color: '#3b82f6',
    borderColor: 'rgba(59,130,246,0.3)',
    profit: 'R$ 50,00 lucro líquido'
  },
  { 
    id: 'premium', 
    name: 'Premium', 
    price: 'R$ 197,90', 
    period: '/mês',
    description: 'OpenCode big-pickle + todos os recursos',
    features: ['OpenCode big-pickle', 'Caminho pré-programado', 'Animações GSAP', 'Glassmorphism', '21.dev Components', 'Ruflo Agents', 'Dribbble Tempo Real', 'Suporte prioritário'],
    color: '#8b5cf6',
    borderColor: 'rgba(139,92,246,0.3)',
    profit: 'R$ 120,00 lucro líquido'
  },
];

// Business types
const businessTypes = [
  { type: 'RESTAURANT', label: 'Restaurante', icon: '🍽️' },
  { type: 'BARBER_SHOP', label: 'Barbearia', icon: '✂️' },
  { type: 'SALON', label: 'Salão de Beleza', icon: '💇‍♀️' },
  { type: 'CLINIC', label: 'Clínica', icon: '🏥' },
  { type: 'GYM', label: 'Academia', icon: '💪' },
  { type: 'RETAIL', label: 'Loja', icon: '🛒' },
  { type: 'HOTEL', label: 'Hotel', icon: '🏨' },
  { type: 'TECH', label: 'Tecnologia', icon: '💻' },
  { type: 'PET_SHOP', label: 'Pet Shop', icon: '🐕' },
  { type: 'OTHER', label: 'Outro', icon: '🎯' },
];

export default function AICreatePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [businessName, setBusinessName] = useState('');
  const [businessType, setBusinessType] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState('');
  const [selectedPlan, setSelectedPlan] = useState('premium');
  const [polling, setPolling] = useState(false);
  const [progress, setProgress] = useState({ current: 0, total: 0, percentage: 0, status: '', steps: [] as any[] });

  // Polling effect for worker progress
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (polling && result?.workerSessionId) {
      interval = setInterval(async () => {
        try {
          const res = await fetch(`/api/opencode-worker?sessionId=${result.workerSessionId}`);
          const data = await res.json();
          
          if (data.success) {
            setProgress({
              current: data.progress?.current || 0,
              total: data.progress?.total || 0,
              percentage: data.progress?.percentage || 0,
              status: data.status || '',
              steps: data.steps || []
            });

            // If completed or error, stop polling
            if (data.status === 'completed' || data.status === 'error') {
              clearInterval(interval);
              setPolling(false);
              
              // Set final result
              if (data.status === 'completed' && data.finalResult) {
                setResult((prev: any) => ({
                  ...prev,
                  site: {
                    ...prev.site,
                    methodUsed: 'OpenCode big-pickle (Premium)',
                    planUsed: selectedPlan,
                  },
                  finalResult: data.finalResult
                }));
              }
            }
          }
        } catch (err) {
          console.error('Polling error:', err);
        }
      }, 2000); // Poll every 2 seconds
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [polling, result?.workerSessionId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!businessName || !businessType) {
      setError('Preencha o nome e o tipo de negócio');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/ai-create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          businessName,
          businessType,
          email,
          phone,
          plan: selectedPlan,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || 'Erro ao criar site');
        if (data.upgrade) {
          const wantsUpgrade = window.confirm('Limite do plano atingido! Deseja fazer upgrade?');
          if (wantsUpgrade) {
            const checkoutRes = await fetch('/api/checkout', { method: 'POST' });
            const checkoutData = await checkoutRes.json();
            if (checkoutData.url) {
              window.location.href = checkoutData.url;
            }
          }
        }
        setLoading(false);
        return;
      }

      // Handle async response (premium plan with worker)
      if (data.status === 'processing' && data.workerSessionId) {
        setResult({
          workerSessionId: data.workerSessionId,
          status: 'processing',
          pollUrl: data.pollUrl
        });
        setPolling(true);
        setLoading(false);
      } else {
        // Standard/simple plan - immediate result
        setResult(data);
        setLoading(false);
      }
    } catch (err) {
      setError('Erro de conexão');
      setLoading(false);
    }
  };

  if (result) {
    // Show progress for premium plan with worker
    if (result.status === 'processing' || result.status === 'completed') {
      const isCompleted = result.status === 'completed' || progress.status === 'completed';
      
      return (
        <main style={{ backgroundColor: '#0a0a1a', minHeight: '100vh', color: '#fff' }}>
          <div style={{ maxWidth: '800px', margin: '0 auto', padding: '2rem', paddingTop: '120px' }}>
            {/* Header */}
            <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
              <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>
                {isCompleted ? '🎉' : '🤖'}
              </div>
              <h1 style={{ fontSize: '2.5rem', fontWeight: 900, marginBottom: '0.5rem', background: 'linear-gradient(to right, #10b981, #3b82f6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                {isCompleted ? 'Site Criado com Sucesso!' : 'Criando Site com IA...'}
              </h1>
              <p style={{ color: '#94a3b8', fontSize: '1.1rem' }}>
                {isCompleted 
                  ? `A IA criou tudo para ${result.site?.businessName || 'seu negócio'}`
                  : 'OpenCode big-pickle está processando seguindo o caminho pré-programado'
                }
              </p>
            </div>

            {/* Progress Section */}
            {!isCompleted && (
              <div style={{ background: 'rgba(30,41,59,0.95)', borderRadius: '20px', padding: '2.5rem', border: '1px solid rgba(139,92,246,0.3)', marginBottom: '2rem' }}>
                <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '1.5rem', color: '#8b5cf6' }}>
                  🔄 Progresso do OpenCode big-pickle
                </h2>
                
                {/* Progress Bar */}
                <div style={{ marginBottom: '2rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                    <span style={{ fontSize: '0.9rem', color: '#94a3b8' }}>
                      Passo {progress.current} de {progress.total}
                    </span>
                    <span style={{ fontSize: '0.9rem', color: '#8b5cf6', fontWeight: 600 }}>
                      {progress.percentage}%
                    </span>
                  </div>
                  <div style={{ width: '100%', height: '8px', background: 'rgba(255,255,255,0.1)', borderRadius: '4px', overflow: 'hidden' }}>
                    <div 
                      style={{ 
                        width: `${progress.percentage}%`, 
                        height: '100%', 
                        background: 'linear-gradient(90deg, #8b5cf6, #a78bfa)', 
                        borderRadius: '4px',
                        transition: 'width 0.5s ease'
                      }} 
                    />
                  </div>
                </div>

                {/* Steps List */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  {progress.steps?.map((step: any, idx: number) => (
                    <div 
                      key={idx}
                      style={{ 
                        padding: '1rem', 
                        background: step.status === 'completed' ? 'rgba(16,185,129,0.1)' : 
                                  step.status === 'running' ? 'rgba(139,92,246,0.1)' : 
                                  'rgba(255,255,255,0.03)',
                        borderRadius: '10px',
                        border: `1px solid ${
                          step.status === 'completed' ? 'rgba(16,185,129,0.3)' : 
                          step.status === 'running' ? 'rgba(139,92,246,0.3)' : 
                          'rgba(255,255,255,0.1)'
                        }`,
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.75rem'
                      }}
                    >
                      <span style={{ fontSize: '1.2rem' }}>
                        {step.status === 'completed' ? '✅' : 
                         step.status === 'running' ? '⏳' : 
                         step.status === 'error' ? '❌' : '⏹️'}
                      </span>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontWeight: 600, color: step.status === 'completed' ? '#10b981' : 
                                                                step.status === 'running' ? '#8b5cf6' : '#94a3b8' }}>
                          {step.name}
                        </div>
                        <div style={{ fontSize: '0.8rem', color: '#64748b', marginTop: '0.25rem' }}>
                          {step.description}
                        </div>
                      </div>
                      {step.status === 'running' && (
                        <div style={{ fontSize: '0.8rem', color: '#8b5cf6' }}>Processando...</div>
                      )}
                    </div>
                  ))}
                </div>

                {/* Polling indicator */}
                <div style={{ marginTop: '1.5rem', textAlign: 'center', fontSize: '0.85rem', color: '#64748b' }}>
                  <span style={{ display: 'inline-block', animation: 'pulse 2s infinite' }}>●</span> Atualizando automaticamente...
                </div>
              </div>
            )}

            {/* Completed Result */}
            {isCompleted && (
              <div style={{ background: 'rgba(30,41,59,0.95)', borderRadius: '20px', padding: '2.5rem', border: '1px solid rgba(16,185,129,0.3)', marginBottom: '2rem' }}>
                <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '1.5rem', color: '#10b981' }}>
                  📋 Detalhes do Site Gerado
                </h2>
                
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
                  <div style={{ padding: '1rem', background: 'rgba(255,255,255,0.03)', borderRadius: '10px' }}>
                    <div style={{ fontSize: '0.85rem', color: '#64748b', marginBottom: '0.25rem' }}>Método</div>
                    <div style={{ fontWeight: 600 }}>{result.site?.methodUsed || 'OpenCode big-pickle (Premium)'}</div>
                  </div>
                  <div style={{ padding: '1rem', background: 'rgba(255,255,255,0.03)', borderRadius: '10px' }}>
                    <div style={{ fontSize: '0.85rem', color: '#64748b', marginBottom: '0.25rem' }}>Plano</div>
                    <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>Premium (OpenCode big-pickle)</div>
                  </div>
                </div>

                <div style={{ padding: '1rem', background: 'rgba(139,92,246,0.1)', borderRadius: '10px', border: '1px solid rgba(139,92,246,0.2)' }}>
                  <div style={{ fontSize: '0.8rem', color: '#a78bfa', fontWeight: 600 }}>Lucro Líquido Mensal</div>
                  <div style={{ fontSize: '1.2rem', fontWeight: 700, color: '#a78bfa' }}>R$ 120,00</div>
                  <div style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '0.25rem' }}>Sustenta melhorias futuras de IA</div>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            {isCompleted && (
              <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                <Link 
                  href={result.site?.previewUrl || '#'} 
                  style={{ padding: '1rem 2rem', background: 'linear-gradient(135deg, #10b981, #059669)', color: 'white', borderRadius: '12px', fontWeight: 700, textDecoration: 'none', fontSize: '1.1rem' }}
                >
                  👁 Ver Site Gerado
                </Link>
                <Link 
                  href="/ai-create" 
                  style={{ padding: '1rem 2rem', background: 'rgba(255,255,255,0.05)', color: '#94a3b8', borderRadius: '12px', fontWeight: 600, textDecoration: 'none', border: '1px solid rgba(255,255,255,0.1)' }}
                  onClick={() => { setResult(null); setBusinessName(''); setBusinessType(''); }}
                >
                  + Criar Outro Site
                </Link>
              </div>
            )}
          </div>
        </main>
      );
    }

    // Standard/simple plan result
    return (
      <main style={{ backgroundColor: '#0a0a1a', minHeight: '100vh', color: '#fff' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', padding: '2rem', paddingTop: '120px' }}>
          {/* Success Header */}
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🎉</div>
            <h1 style={{ fontSize: '2.5rem', fontWeight: 900, marginBottom: '0.5rem', background: 'linear-gradient(to right, #10b981, #3b82f6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              Site Criado com Sucesso!
            </h1>
            <p style={{ color: '#94a3b8', fontSize: '1.1rem' }}>
              A IA ({result.site?.methodUsed || 'autônoma'}) criou tudo para <strong>{result.site?.businessName}</strong>
            </p>
          </div>

          {/* Plan Used */}
          <div style={{ background: 'rgba(30,41,59,0.95)', borderRadius: '20px', padding: '2rem', border: '1px solid rgba(16,185,129,0.3)', marginBottom: '2rem' }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '1.5rem', color: '#10b981' }}>📋 Plano Usado: {result.site?.planUsed === 'premium' ? 'Premium (OpenCode big-pickle)' : 'Simples'}</h2>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
              <div style={{ padding: '1rem', background: 'rgba(255,255,255,0.03)', borderRadius: '10px' }}>
                <div style={{ fontSize: '0.85rem', color: '#64748b', marginBottom: '0.25rem' }}>Método</div>
                <div style={{ fontWeight: 600 }}>{result.site?.methodUsed || 'IA Padrão'}</div>
              </div>
              <div style={{ padding: '1rem', background: 'rgba(255,255,255,0.03)', borderRadius: '10px' }}>
                <div style={{ fontSize: '0.85rem', color: '#64748b', marginBottom: '0.25rem' }}>Worker Session</div>
                <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>{result.site?.workerSessionId ? 'OpenCode big-pickle ativo' : 'Padrão'}</div>
              </div>
            </div>
            {result.site?.planUsed === 'premium' && (
              <div style={{ padding: '1rem', background: 'rgba(139,92,246,0.1)', borderRadius: '10px', border: '1px solid rgba(139,92,246,0.2)' }}>
                <div style={{ fontSize: '0.8rem', color: '#a78bfa', fontWeight: 600 }}>Lucro Líquido Mensal</div>
                <div style={{ fontSize: '1.2rem', fontWeight: 700, color: '#a78bfa' }}>R$ 120,00</div>
                <div style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '0.25rem' }}>Sustenta melhorias futuras de IA</div>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
            <Link 
              href={result.site?.previewUrl || '#'} 
              style={{ padding: '1rem 2rem', background: 'linear-gradient(135deg, #10b981, #059669)', color: 'white', borderRadius: '12px', fontWeight: 700, textDecoration: 'none', fontSize: '1.1rem' }}
            >
              👁 Ver Site Gerado
            </Link>
            <Link 
              href="/ai-create" 
              style={{ padding: '1rem 2rem', background: 'rgba(255,255,255,0.05)', color: '#94a3b8', borderRadius: '12px', fontWeight: 600, textDecoration: 'none', border: '1px solid rgba(255,255,255,0.1)' }}
              onClick={() => { setResult(null); setBusinessName(''); setBusinessType(''); }}
            >
              + Criar Outro Site
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main style={{ backgroundColor: '#0a0a1a', minHeight: '100vh', color: '#fff' }}>
      {/* Background */}
      <div style={{ position: 'fixed', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
        <div style={{ position: 'absolute', top: '-20%', left: '-10%', width: '600px', height: '600px', background: 'radial-gradient(circle, rgba(16,185,129,0.1), transparent)', borderRadius: '50%', filter: 'blur(80px)' }} />
        <div style={{ position: 'absolute', bottom: '10%', right: '-10%', width: '500px', height: '500px', background: 'radial-gradient(circle, rgba(139,92,246,0.08), transparent)', borderRadius: '50%', filter: 'blur(80px)' }} />
      </div>

      {/* Header */}
      <header style={{ position: 'fixed', top: 0, left: 0, right: 0, background: 'rgba(10,10,26,0.95)', backdropFilter: 'blur(20px)', borderBottom: '1px solid rgba(255,255,255,0.1)', zIndex: 100 }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '1rem 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', textDecoration: 'none' }}>
            <div style={{ width: '40px', height: '40px', background: 'linear-gradient(135deg, #10b981, #059669)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '1.25rem' }}>S</div>
            <span style={{ fontWeight: 800, fontSize: '1.5rem', color: 'white' }}>SitesSaaS</span>
          </Link>
          <Link href="/create" style={{ color: '#94a3b8', textDecoration: 'none', fontSize: '0.9rem' }}>← Criação Manual</Link>
        </div>
      </header>

      {/* Main Content */}
      <div style={{ paddingTop: '120px', paddingBottom: '100px', maxWidth: '900px', margin: '0 auto', paddingLeft: '2rem', paddingRight: '2rem' }}>
        {/* Title */}
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h1 style={{ fontSize: '2.5rem', fontWeight: 900, marginBottom: '0.5rem', background: 'linear-gradient(to right, #10b981, #3b82f6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            Criação 100% Autônoma com IA
          </h1>
          <p style={{ color: '#94a3b8', fontSize: '1.1rem' }}>
            Escolha seu plano mensal. A IA faz tudo seguindo o caminho pré-programado.
          </p>
        </div>

        {/* Plans Comparison */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '3rem' }}>
          {plans.map((plan) => (
            <div
              key={plan.id}
              onClick={() => setSelectedPlan(plan.id)}
              style={{
                padding: '2rem',
                background: selectedPlan === plan.id ? `rgba(${plan.id === 'premium' ? '139,92,246' : '16,185,129'},0.15)` : 'rgba(30,41,59,0.95)',
                border: selectedPlan === plan.id ? `2px solid ${plan.borderColor}` : '1px solid rgba(255,255,255,0.1)',
                borderRadius: '20px',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                backdropFilter: 'blur(10px)',
              }}
            >
              <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{plan.id === 'premium' ? '👑' : '🚀'}</div>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'white', marginBottom: '0.5rem' }}>{plan.name}</h3>
              <div style={{ fontSize: '2rem', fontWeight: 900, color: plan.color, marginBottom: '0.25rem' }}>
                {plan.price}<span style={{ fontSize: '1rem', fontWeight: 400, color: '#94a3b8' }}>{plan.period}</span>
              </div>
              <p style={{ fontSize: '0.85rem', color: '#64748b', marginBottom: '1.5rem' }}>{plan.description}</p>
              
              {/* Profit Margin for Premium */}
              {plan.id === 'premium' && (
                <div style={{ padding: '0.75rem', background: 'rgba(139,92,246,0.1)', borderRadius: '8px', marginBottom: '1rem', border: '1px solid rgba(139,92,246,0.2)' }}>
                  <div style={{ fontSize: '0.8rem', color: '#a78bfa', fontWeight: 600 }}>Lucro Líquido Mensal</div>
                  <div style={{ fontSize: '1.2rem', fontWeight: 700, color: '#a78bfa' }}>{plan.profit}</div>
                  <div style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '0.25rem' }}>Sustenta melhorias futuras de IA</div>
                </div>
              )}

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {plan.features.map((f, i) => (
                  <div key={i} style={{ fontSize: '0.9rem', color: '#94a3b8', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span style={{ color: plan.color }}>✓</span> {f}
                  </div>
                ))}
              </div>

              {selectedPlan === plan.id && (
                <div style={{ marginTop: '1rem', padding: '0.5rem', background: `rgba(${plan.id === 'premium' ? '139,92,246' : '16,185,129'},0.2)`, borderRadius: '8px', fontSize: '0.85rem', color: plan.color, textAlign: 'center' }}>
                  ✓ Selecionado
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} style={{ background: 'rgba(30,41,59,0.95)', borderRadius: '20px', padding: '2.5rem', border: '1px solid rgba(255,255,255,0.1)', backdropFilter: 'blur(10px)' }}>
          {error && (
            <div style={{ padding: '1rem', background: 'rgba(239,68,68,0.1)', borderRadius: '10px', border: '1px solid rgba(239,68,68,0.3)', color: '#fca5a5', marginBottom: '1.5rem' }}>
              ⚠️ {error}
            </div>
          )}

          {/* Business Name */}
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: 600, color: '#94a3b8', marginBottom: '0.5rem' }}>
              Nome do Negócio *
            </label>
            <input
              type="text"
              value={businessName}
              onChange={(e) => setBusinessName(e.target.value)}
              placeholder="Ex: Bella Pizza, Barber Shop, Clínica..."
              style={{ width: '100%', padding: '1rem', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', color: 'white', fontSize: '1rem' }}
            />
          </div>

          {/* Business Type */}
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: 600, color: '#94a3b8', marginBottom: '0.5rem' }}>
              Tipo de Negócio *
            </label>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
              {businessTypes.map((b) => (
                <div
                  key={b.type}
                  onClick={() => setBusinessType(b.type)}
                  style={{
                    padding: '1rem',
                    background: businessType === b.type ? 'rgba(16,185,129,0.15)' : 'rgba(255,255,255,0.03)',
                    border: businessType === b.type ? '2px solid #10b981' : '2px solid rgba(255,255,255,0.1)',
                    borderRadius: '10px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    transition: 'all 0.3s ease',
                  }}
                >
                  <span style={{ fontSize: '1.5rem' }}>{b.icon}</span>
                  <span style={{ fontWeight: 600, color: businessType === b.type ? 'white' : '#94a3b8' }}>{b.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Optional Fields */}
          <div style={{ marginBottom: '1.5rem', padding: '1.5rem', background: 'rgba(255,255,255,0.02)', borderRadius: '10px', border: '1px dashed rgba(255,255,255,0.1)' }}>
            <div style={{ fontSize: '0.85rem', color: '#64748b', marginBottom: '1rem' }}>Campos Opcionais (a IA preenche se vazios)</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email (opcional)"
                style={{ padding: '0.75rem', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: 'white', fontSize: '0.9rem' }}
              />
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Telefone (opcional)"
                style={{ padding: '0.75rem', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: 'white', fontSize: '0.9rem' }}
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              padding: '1.25rem',
              background: loading ? 'rgba(16,185,129,0.5)' : 'linear-gradient(135deg, #10b981, #059669)',
              color: 'white',
              border: 'none',
              borderRadius: '12px',
              fontWeight: 700,
              fontSize: '1.1rem',
              cursor: loading ? 'not-allowed' : 'pointer',
              transition: 'all 0.3s ease',
            }}
          >
            {loading ? '🤖 IA Criando Site...' : '🚀 Criar Site com IA (100% Autônomo)'}
          </button>

          <p style={{ textAlign: 'center', color: '#64748b', fontSize: '0.85rem', marginTop: '1rem' }}>
            A IA vai inferir: estilo, dores, soluções, paleta, animações e componentes automaticamente
          </p>
        </form>
      </div>
    </main>
  );
}
