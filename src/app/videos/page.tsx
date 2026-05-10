'use client';

import { useState } from 'react';

interface VideoScene {
  id: number;
  imageUrl: string;
  narration: string;
  duration: number;
  transition: string;
}

interface VideoResult {
  success: boolean;
  title: string;
  scenes: VideoScene[];
  totalDuration: number;
  error?: string;
}

const BUSINESS_TYPES = [
  'restaurante', 'pizzaria', 'hamburgueria', 'cafeteria', 'sorveteria',
  'pet-shop', 'clinica', 'advocacia', 'academia', 'salão-beleza',
  'loja-roupa', 'mercearia', 'padaria', 'oficina', 'imobiliaria',
];

const STYLES = [
  { value: 'modern', label: 'Moderno' },
  { value: 'luxury', label: 'Luxo' },
  { value: 'fun', label: 'Divertido' },
  { value: 'minimal', label: 'Minimalista' },
  { value: 'bold', label: 'Impactante' },
];

export default function VideosPage() {
  const [businessName, setBusinessName] = useState('');
  const [businessType, setBusinessType] = useState('');
  const [style, setStyle] = useState('modern');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<VideoResult | null>(null);
  const [currentScene, setCurrentScene] = useState(0);
  const [error, setError] = useState('');

  async function generateVideo() {
    if (!businessName || !businessType) {
      setError('Preencha o nome e tipo de negócio');
      return;
    }

    setLoading(true);
    setError('');
    setResult(null);
    setCurrentScene(0);

    try {
      const res = await fetch('/api/generate-video', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ businessName, businessType, style }),
      });

      const data = await res.json();
      if (data.success && data.scenes?.length > 0) {
        setResult(data);
      } else {
        setError(data.error || 'Falha ao gerar vídeo');
      }
    } catch {
      setError('Erro ao conectar com o servidor');
    } finally {
      setLoading(false);
    }
  }

  const nextScene = () => {
    if (result && currentScene < result.scenes.length - 1) {
      setCurrentScene(c => c + 1);
    }
  };

  const prevScene = () => {
    if (currentScene > 0) {
      setCurrentScene(c => c - 1);
    }
  };

  return (
    <main style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #0f0f1a 0%, #1a1a2e 100%)', color: '#fff', padding: '2rem' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '0.5rem', background: 'linear-gradient(135deg, #6366f1, #a855f7)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          Gerador de Vídeo AI
        </h1>
        <p style={{ color: '#94a3b8', marginBottom: '2rem' }}>
          Crie vídeos marketing profissionais para seu negócio com IA
        </p>

        <div style={{ background: 'rgba(255,255,255,0.05)', borderRadius: '16px', padding: '1.5rem', marginBottom: '2rem', border: '1px solid rgba(255,255,255,0.1)' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.875rem', color: '#94a3b8', marginBottom: '0.25rem' }}>Nome do Negócio</label>
              <input
                value={businessName}
                onChange={e => setBusinessName(e.target.value)}
                placeholder="Ex: Sorveteria do João"
                style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(0,0,0,0.3)', color: '#fff', fontSize: '1rem' }}
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.875rem', color: '#94a3b8', marginBottom: '0.25rem' }}>Tipo de Negócio</label>
              <select
                value={businessType}
                onChange={e => setBusinessType(e.target.value)}
                style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(0,0,0,0.3)', color: '#fff', fontSize: '1rem' }}
              >
                <option value="">Selecione...</option>
                {BUSINESS_TYPES.map(t => (
                  <option key={t} value={t}>{t.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())}</option>
                ))}
              </select>
            </div>
          </div>

          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', fontSize: '0.875rem', color: '#94a3b8', marginBottom: '0.25rem' }}>Estilo Visual</label>
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              {STYLES.map(s => (
                <button
                  key={s.value}
                  onClick={() => setStyle(s.value)}
                  style={{
                    padding: '0.5rem 1rem',
                    borderRadius: '999px',
                    border: style === s.value ? '2px solid #6366f1' : '1px solid rgba(255,255,255,0.2)',
                    background: style === s.value ? 'rgba(99,102,241,0.2)' : 'transparent',
                    color: '#fff',
                    cursor: 'pointer',
                    fontSize: '0.875rem',
                  }}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={generateVideo}
            disabled={loading}
            style={{
              width: '100%',
              padding: '0.875rem',
              borderRadius: '12px',
              border: 'none',
              background: loading ? '#374151' : 'linear-gradient(135deg, #6366f1, #a855f7)',
              color: '#fff',
              fontSize: '1rem',
              fontWeight: '600',
              cursor: loading ? 'not-allowed' : 'pointer',
              opacity: loading ? 0.7 : 1,
            }}
          >
            {loading ? 'Gerando Vídeo...' : 'Gerar Vídeo Marketing'}
          </button>

          {error && (
            <p style={{ color: '#ef4444', marginTop: '0.75rem', fontSize: '0.875rem' }}>{error}</p>
          )}
        </div>

        {result && result.scenes.length > 0 && (
          <div>
            <h2 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1rem' }}>{result.title}</h2>
            <p style={{ color: '#94a3b8', marginBottom: '1rem', fontSize: '0.875rem' }}>
              {result.scenes.length} cenas · {result.totalDuration}s de duração
            </p>

            <div style={{ position: 'relative', borderRadius: '16px', overflow: 'hidden', marginBottom: '1rem', aspectRatio: '16/9', background: '#000' }}>
              {result.scenes[currentScene]?.imageUrl ? (
                <img
                  src={result.scenes[currentScene].imageUrl}
                  alt={`Cena ${currentScene + 1}`}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'opacity 0.5s' }}
                />
              ) : (
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', color: '#6b7280' }}>
                  Imagem não disponível
                </div>
              )}

              <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '2rem 1rem 1rem', background: 'linear-gradient(transparent, rgba(0,0,0,0.8))' }}>
                <p style={{ fontSize: '1rem', fontWeight: '500', marginBottom: '0.25rem' }}>
                  Cena {currentScene + 1}
                </p>
                <p style={{ fontSize: '0.875rem', color: '#d1d5db' }}>
                  {result.scenes[currentScene]?.narration || ''}
                </p>
              </div>

              <div style={{ position: 'absolute', top: '1rem', right: '1rem', background: 'rgba(0,0,0,0.6)', padding: '0.25rem 0.75rem', borderRadius: '999px', fontSize: '0.75rem', color: '#fff' }}>
                {result.scenes[currentScene]?.duration}s
              </div>
            </div>

            <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center', marginBottom: '1.5rem' }}>
              <button
                onClick={prevScene}
                disabled={currentScene === 0}
                style={{
                  padding: '0.5rem 1.5rem',
                  borderRadius: '8px',
                  border: '1px solid rgba(255,255,255,0.2)',
                  background: 'rgba(255,255,255,0.05)',
                  color: currentScene === 0 ? '#6b7280' : '#fff',
                  cursor: currentScene === 0 ? 'not-allowed' : 'pointer',
                }}
              >
                ← Anterior
              </button>

              <div style={{ display: 'flex', gap: '0.375rem', alignItems: 'center' }}>
                {result.scenes.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentScene(i)}
                    style={{
                      width: currentScene === i ? '24px' : '8px',
                      height: '8px',
                      borderRadius: '999px',
                      border: 'none',
                      background: currentScene === i ? '#6366f1' : 'rgba(255,255,255,0.3)',
                      cursor: 'pointer',
                      transition: 'all 0.3s',
                    }}
                  />
                ))}
              </div>

              <button
                onClick={nextScene}
                disabled={currentScene === result.scenes.length - 1}
                style={{
                  padding: '0.5rem 1.5rem',
                  borderRadius: '8px',
                  border: '1px solid rgba(255,255,255,0.2)',
                  background: 'rgba(255,255,255,0.05)',
                  color: currentScene === result.scenes.length - 1 ? '#6b7280' : '#fff',
                  cursor: currentScene === result.scenes.length - 1 ? 'not-allowed' : 'pointer',
                }}
              >
                Próxima →
              </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: '0.75rem' }}>
              {result.scenes.map((scene, i) => (
                <button
                  key={scene.id}
                  onClick={() => setCurrentScene(i)}
                  style={{
                    borderRadius: '8px',
                    overflow: 'hidden',
                    border: currentScene === i ? '2px solid #6366f1' : '2px solid transparent',
                    cursor: 'pointer',
                    padding: 0,
                    background: 'none',
                  }}
                >
                  {scene.imageUrl ? (
                    <img src={scene.imageUrl} alt={`Cena ${i + 1}`} style={{ width: '100%', aspectRatio: '16/9', objectFit: 'cover' }} />
                  ) : (
                    <div style={{ width: '100%', aspectRatio: '16/9', background: 'rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#6b7280', fontSize: '0.75rem' }}>
                      Cena {i + 1}
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
