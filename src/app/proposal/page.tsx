'use client';

import { Suspense, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';

function ProposalContent() {
  const searchParams = useSearchParams();
  const [clientData, setClientData] = useState<any>(null);

  useEffect(() => {
    const dataParam = searchParams.get('data');
    if (dataParam) {
      try {
        // atob is browser-only - decode base64
        const decoded = JSON.parse(decodeURIComponent(atob(dataParam)));
        setClientData(decoded);
      } catch (e) {
        console.error('Failed to parse proposal data', e);
      }
    }
  }, [searchParams]);

  if (!clientData) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#09090b', color: 'white' }}>
        <p>Carregando proposta mágica...</p>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', background: '#09090b', color: '#f8fafc', fontFamily: 'Inter, sans-serif' }}>
      {/* Header */}
      <header style={{ padding: '2rem 5%', borderBottom: '1px solid #1e293b', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ fontSize: '1.5rem', fontWeight: 800, background: 'linear-gradient(to right, #60efff, #0061ff)', WebkitBackgroundClip: 'text', color: 'transparent' }}>
          Agência Elite
        </div>
        <a href={`https://wa.me/5511999999999`} style={{ padding: '0.75rem 1.5rem', background: 'white', color: 'black', borderRadius: '50px', textDecoration: 'none', fontWeight: 600, fontSize: '0.9rem' }}>
          Falar com Consultor
        </a>
      </header>

      <main style={{ padding: '4rem 5%', maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <p style={{ color: '#60efff', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '1rem' }}>
            Análise de Presença Digital Exclusiva
          </p>
          <h1 style={{ fontSize: '3.5rem', fontWeight: 800, lineHeight: 1.1, marginBottom: '1.5rem' }}>
            Transformando o futuro da <br/><span style={{ color: '#c084fc' }}>{clientData.name}</span>
          </h1>
          <p style={{ color: '#94a3b8', fontSize: '1.2rem', maxWidth: '600px', margin: '0 auto' }}>
            Analisamos a presença digital do seu negócio de {clientData.niche.toLowerCase()} na região de {clientData.location} e encontramos oportunidades críticas.
          </p>
        </div>

        {/* Competitor Warning (if available) */}
        {clientData.competitors && clientData.competitors.length > 0 && (
          <div style={{ background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.2)', padding: '2rem', borderRadius: '16px', marginBottom: '4rem', textAlign: 'center' }}>
            <h3 style={{ color: '#ef4444', marginBottom: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
              ⚠️ Atenção: Seus concorrentes estão dominando o Google
            </h3>
            <p style={{ color: '#cbd5e1', marginBottom: '1rem' }}>Identificamos que a maioria dos clientes digitais na sua região estão indo para:</p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              {clientData.competitors.map((comp: any, idx: number) => (
                <div key={idx} style={{ background: '#1e293b', padding: '0.5rem 1rem', borderRadius: '8px', fontSize: '0.9rem', color: '#94a3b8' }}>
                  {comp.name}
                </div>
              ))}
            </div>
          </div>
        )}

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginBottom: '4rem' }}>
          {/* Dores */}
          <div style={{ background: '#1e293b', padding: '3rem', borderRadius: '24px' }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '2rem', color: '#f8fafc' }}>
              Falhas Identificadas
            </h2>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {clientData.issues?.map((issue: string, idx: number) => (
                <li key={idx} style={{ display: 'flex', gap: '1rem', color: '#cbd5e1' }}>
                  <span style={{ color: '#ef4444' }}>✕</span>
                  {issue}
                </li>
              ))}
            </ul>
          </div>

          {/* Oportunidades */}
          <div style={{ background: 'linear-gradient(135deg, rgba(96, 239, 255, 0.1) 0%, rgba(0, 97, 255, 0.1) 100%)', border: '1px solid rgba(96, 239, 255, 0.2)', padding: '3rem', borderRadius: '24px' }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '2rem', color: '#f8fafc' }}>
              O que nós implementamos
            </h2>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {clientData.opportunities?.map((opp: string, idx: number) => (
                <li key={idx} style={{ display: 'flex', gap: '1rem', color: '#cbd5e1' }}>
                  <span style={{ color: '#10b981' }}>✓</span>
                  {opp}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Mockup Simulation */}
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <h2 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '1rem' }}>
            Veja como ficaria o seu Novo Site
          </h2>
          <p style={{ color: '#94a3b8', marginBottom: '3rem' }}>
            Geramos uma simulação baseada em design premium de alta conversão.
          </p>

          <div style={{ background: '#1e293b', borderRadius: '12px 12px 0 0', padding: '1rem', display: 'flex', gap: '0.5rem', width: '100%', maxWidth: '900px', margin: '0 auto', borderBottom: '1px solid #334155' }}>
            <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ef4444' }} />
            <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#f59e0b' }} />
            <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#10b981' }} />
          </div>
          <div style={{ background: '#000', width: '100%', maxWidth: '900px', margin: '0 auto', height: '500px', borderRadius: '0 0 12px 12px', position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
             {/* Mockup Content */}
             <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'radial-gradient(circle at center, #1e293b 0%, #000 100%)', opacity: 0.5 }} />
             <h3 style={{ fontSize: '3rem', fontWeight: 800, zIndex: 1, textShadow: '0 4px 20px rgba(0,0,0,0.5)', maxWidth: '80%', marginBottom: '1rem' }}>
               A Melhor Experiência de {clientData.niche.toLowerCase()} em {clientData.location}
             </h3>
             <p style={{ zIndex: 1, fontSize: '1.2rem', color: '#94a3b8', marginBottom: '2rem', maxWidth: '60%' }}>
               Bem-vindo ao novo padrão da {clientData.name}. Moderno, rápido e focado em converter seus visitantes em clientes reais.
             </p>
             <button style={{ zIndex: 1, padding: '1rem 2rem', background: 'white', color: 'black', border: 'none', borderRadius: '8px', fontSize: '1.1rem', fontWeight: 600, cursor: 'pointer' }}>
               Descobrir Mais
             </button>
          </div>
        </div>

        {/* CTA Final */}
        <div style={{ textAlign: 'center', padding: '4rem 0', borderTop: '1px solid #1e293b' }}>
          <h2 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '1rem' }}>
            Pronto para dominar seu mercado?
          </h2>
          <p style={{ color: '#94a3b8', fontSize: '1.1rem', marginBottom: '2rem' }}>
            Deixe seus concorrentes para trás. Agende uma consultoria gratuita de 15 minutos.
          </p>
          <a href={`https://wa.me/5511999999999`} style={{ padding: '1rem 2.5rem', background: 'linear-gradient(135deg, #60efff 0%, #0061ff 100%)', color: 'white', borderRadius: '50px', textDecoration: 'none', fontWeight: 700, fontSize: '1.1rem', display: 'inline-block' }}>
            Quero este site agora
          </a>
        </div>
      </main>
    </div>
  );
}

export default function ProposalPage() {
  return (
    <Suspense fallback={
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#09090b', color: 'white' }}>
        <p>Carregando proposta mágica...</p>
      </div>
    }>
      <ProposalContent />
    </Suspense>
  );
}
