'use client';

import { useState, useEffect } from 'react';

type TrainingStats = {
  totalGenerations: number;
  successfulGenerations: number;
  successRate: string;
  totalPatterns: number;
  nichesCovered: number;
  topPatterns: { pattern: string; niche: string; successRate: number; uses: number; lastUsed: string }[];
  recentGenerations: { businessName: string; businessType: string; success: boolean; timestamp: string; style: string }[];
};

export default function TrainingPage() {
  const [stats, setStats] = useState<TrainingStats | null>(null);
  const [report, setReport] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch('/api/ai-training')
      .then(r => r.json())
      .then(data => {
        if (data.success) {
          setStats(data.stats);
          setReport(data.report);
        } else {
          setError('Erro ao carregar dados');
        }
      })
      .catch(() => setError('Falha na conexão'))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <main style={{ minHeight: '100vh', background: 'var(--bg-deep)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Carregando...</div>
      </main>
    );
  }

  if (error || !stats) {
    return (
      <main style={{ minHeight: '100vh', background: 'var(--bg-deep)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '1rem' }}>
        <div style={{ fontSize: '3rem' }}>📊</div>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>{error || 'Sem dados'}</p>
        <a href="/" style={{ color: 'var(--cyan)', fontSize: '0.85rem' }}>← Voltar</a>
      </main>
    );
  }

  return (
    <main style={{ minHeight: '100vh', background: 'var(--bg-deep)', overflowY: 'auto' }}>
      <div style={{ maxWidth: '720px', margin: '0 auto', padding: '3rem 1.5rem' }}>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem' }}>
          <div>
            <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.5rem', fontWeight: 700, color: 'var(--text-heading)', margin: 0 }}>
              📊 Treinamento da IA
            </h1>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginTop: '0.25rem' }}>Cada geração melhora a próxima</p>
          </div>
          <a href="/" style={{ color: 'var(--text-muted)', fontSize: '0.8rem', textDecoration: 'none' }}>← Voltar</a>
        </div>

        {/* Stats Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: '0.5rem', marginBottom: '2rem' }}>
          {[
            { label: 'Gerações', value: stats.totalGenerations, color: 'var(--cyan)' },
            { label: 'Sucesso', value: stats.successRate, color: '#10b981' },
            { label: 'Padrões', value: stats.totalPatterns, color: '#8b5cf6' },
            { label: 'Nichos', value: stats.nichesCovered, color: '#f59e0b' },
          ].map(card => (
            <div key={card.label} style={{
              padding: '1rem', borderRadius: '0.75rem',
              background: 'var(--bg-card)', border: '1px solid var(--border)',
              textAlign: 'center',
            }}>
              <div style={{ fontSize: '1.5rem', fontWeight: 700, color: card.color, fontFamily: 'var(--font-heading)' }}>{card.value}</div>
              <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '0.25rem', fontWeight: 500 }}>{card.label}</div>
            </div>
          ))}
        </div>

        {/* Top Patterns */}
        <div style={{ marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--text-heading)', marginBottom: '0.75rem' }}>🏆 Padrões Mais Usados</h2>
          {stats.topPatterns.length === 0 ? (
            <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>Nenhum padrão ainda — crie alguns sites primeiro!</p>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
              {stats.topPatterns.map((p, i) => (
                <div key={p.pattern} style={{
                  display: 'flex', alignItems: 'center', gap: '0.75rem',
                  padding: '0.6rem 0.75rem', borderRadius: '0.5rem',
                  background: 'var(--bg-card)', border: '1px solid var(--border)',
                  fontSize: '0.8rem',
                }}>
                  <span style={{ color: 'var(--text-muted)', fontWeight: 600, minWidth: '1.2rem' }}>#{i + 1}</span>
                  <div style={{ flex: 1, color: 'var(--text-body)' }}>{p.pattern}</div>
                  <span style={{ color: p.successRate > 0.7 ? '#10b981' : p.successRate > 0.4 ? '#f59e0b' : '#ef4444', fontWeight: 600, fontSize: '0.75rem' }}>
                    {Math.round(p.successRate * 100)}%
                  </span>
                  <span style={{ color: 'var(--text-muted)', fontSize: '0.7rem' }}>{p.uses}x</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Recent Generations */}
        <div style={{ marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--text-heading)', marginBottom: '0.75rem' }}>🕐 Últimas Gerações</h2>
          {stats.recentGenerations.length === 0 ? (
            <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>Nenhuma geração ainda.</p>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
              {stats.recentGenerations.map((g, i) => (
                <div key={i} style={{
                  display: 'flex', alignItems: 'center', gap: '0.75rem',
                  padding: '0.6rem 0.75rem', borderRadius: '0.5rem',
                  background: 'var(--bg-card)', border: '1px solid var(--border)',
                  fontSize: '0.8rem',
                }}>
                  <span style={{ fontSize: '1rem' }}>{g.success ? '✅' : '❌'}</span>
                  <div style={{ flex: 1 }}>
                    <span style={{ color: 'var(--text-body)', fontWeight: 500 }}>{g.businessName}</span>
                    <span style={{ color: 'var(--text-muted)', marginLeft: '0.5rem', fontSize: '0.75rem' }}>
                      {g.businessType?.replace(/_/g, ' ').toLowerCase()} · {g.style}
                    </span>
                  </div>
                  <span style={{ color: 'var(--text-muted)', fontSize: '0.7rem' }}>
                    {new Date(g.timestamp).toLocaleDateString()}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Full Report */}
        {report && (
          <div>
            <h2 style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--text-heading)', marginBottom: '0.75rem' }}>📋 Relatório Completo</h2>
            <pre style={{
              padding: '1rem', borderRadius: '0.75rem',
              background: 'var(--bg-card)', border: '1px solid var(--border)',
              color: 'var(--text-muted)', fontSize: '0.75rem', lineHeight: 1.8,
              whiteSpace: 'pre-wrap', fontFamily: 'monospace', overflowX: 'auto',
            }}>
              {report}
            </pre>
          </div>
        )}
      </div>
    </main>
  );
}
