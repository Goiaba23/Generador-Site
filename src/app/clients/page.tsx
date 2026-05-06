'use client';

import { useState } from 'react';
import { analyzeExamplesForAI, getExamplesByNiche } from '@/lib/crawler-service';
import { generateLogoInspiration } from '@/lib/uxshowcase-logos';

interface AnalysisResult {
  success: boolean;
  analysis?: {
    url: string;
    businessType: string;
    currentDesign: string;
    painPoints: string[];
    seoMetrics: { score: number; issues: string[]; opportunities: string[] };
    improvements: Array<{ feature: string; impact: string; effort: string; description: string }>;
    growthPotential: { score: number; modules: string[] };
  };
  message: string;
}

interface ClientSearchResult {
  success: boolean;
  count: number;
  clients: Array<{
    name: string;
    website: string;
    niche: string;
    location: string;
    issues: string[];
    opportunities: string[];
    priority: string;
    contactEmail?: string;
    contactPhone?: string;
    competitors?: Array<{ name: string; website: string }>;
  }>;
  message: string;
}

export default function ClientsPage() {
  const [url, setUrl] = useState('');
  const [niche, setNiche] = useState('');
  const [location, setLocation] = useState('Brasil');
  const [loading, setLoading] = useState(false);
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);
  const [clients, setClients] = useState<ClientSearchResult | null>(null);
  const [activeTab, setActiveTab] = useState<'analyze' | 'find'>('analyze');
  const [crawlerData, setCrawlerData] = useState<any>(null);

  const handleAnalyze = async () => {
    if (!url) return;
    setLoading(true);
    setAnalysis(null);
    try {
      const res = await fetch(`/api/clients/find?url=${encodeURIComponent(url)}`);
      const data = await res.json();
      setAnalysis(data);
      
      if (data?.analysis?.businessType) {
        const niche = data.analysis.businessType;
        const examples = getExamplesByNiche(niche);
        const logoInspiration = generateLogoInspiration(niche);
        setCrawlerData({
          niche,
          examples,
          logoInspiration,
          uxshowcase: 'https://uixshowcase.com/logo-inspiration/'
        });
      }
    } catch (error) {
      console.error('Erro ao analisar site:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFindClients = async () => {
    if (!niche) return;
    setLoading(true);
    setClients(null);
    try {
      const res = await fetch('/api/clients/find', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ niche, location })
      });
      const data = await res.json();
      setClients(data);
    } catch (error) {
      console.error('Erro ao buscar clientes:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #16213e 100%)', padding: '2rem' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <h1 style={{ fontSize: '4rem', fontWeight: 800, color: 'white', marginBottom: '1rem', textAlign: 'center' }}>
          Client Finder
        </h1>
        <p style={{ color: '#a0a0a0', fontSize: '1.25rem', textAlign: 'center', marginBottom: '3rem' }}>
          Encontre clientes potenciais e analise seus sites com IA
        </p>

        <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', justifyContent: 'center' }}>
          <button onClick={() => setActiveTab('analyze')} style={{
            padding: '1rem 2rem', borderRadius: '0.5rem', border: 'none',
            background: activeTab === 'analyze' ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' : '#1a1a2e',
            color: 'white', fontSize: '1.125rem', fontWeight: 600, cursor: 'pointer'
          }}>Analisar Site</button>
          <button onClick={() => setActiveTab('find')} style={{
            padding: '1rem 2rem', borderRadius: '0.5rem', border: 'none',
            background: activeTab === 'find' ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' : '#1a1a2e',
            color: 'white', fontSize: '1.125rem', fontWeight: 600, cursor: 'pointer'
          }}>Buscar Clientes</button>
        </div>

        {activeTab === 'analyze' && (
          <div style={{ background: 'rgba(26, 26, 46, 0.8)', borderRadius: '1rem', padding: '2rem', backdropFilter: 'blur(10px)' }}>
            <h2 style={{ color: 'white', fontSize: '2rem', marginBottom: '1.5rem' }}>Analisar Site Existente</h2>
            <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
              <input type="url" value={url} onChange={(e) => setUrl(e.target.value)} placeholder="https://exemplo.com" style={{
                flex: 1, padding: '1rem', borderRadius: '0.5rem', border: '1px solid #333',
                background: '#0a0a0a', color: 'white', fontSize: '1rem'
              }} />
              <button onClick={handleAnalyze} disabled={loading || !url} style={{
                padding: '1rem 2rem', borderRadius: '0.5rem', border: 'none',
                background: loading ? '#666' : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: 'white', fontSize: '1rem', fontWeight: 600, cursor: loading ? 'not-allowed' : 'pointer'
              }}>
                {loading ? 'Analisando...' : 'Analisar'}
              </button>
            </div>

            {analysis && analysis.success && analysis.analysis && (
              <div style={{ color: 'white' }}>
                <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Resultado da Análise</h3>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginBottom: '2rem' }}>
                  <div>
                    <h4 style={{ color: '#667eea', marginBottom: '0.5rem' }}>Informações Básicas</h4>
                    <p>URL: {analysis.analysis.url}</p>
                    <p>Tipo: {analysis.analysis.businessType}</p>
                    <p>Design Atual: {analysis.analysis.currentDesign}</p>
                  </div>
                  <div>
                    <h4 style={{ color: '#667eea', marginBottom: '0.5rem' }}>SEO Score</h4>
                    <div style={{ width: '100%', height: '10px', background: '#333', borderRadius: '5px', overflow: 'hidden' }}>
                      <div style={{
                        width: `${analysis.analysis.seoMetrics.score}%`, height: '100%',
                        background: analysis.analysis.seoMetrics.score > 70 ? '#10b981' : analysis.analysis.seoMetrics.score > 40 ? '#f59e0b' : '#ef4444'
                      }} />
                    </div>
                    <p>{analysis.analysis.seoMetrics.score}/100</p>
                  </div>
                </div>

                {crawlerData && (
                  <div style={{ padding: '1.5rem', background: 'rgba(255,255,255,0.05)', borderRadius: '0.75rem', marginBottom: '2rem' }}>
                    <h4 style={{ color: '#c084fc', marginBottom: '1rem' }}>Dados Premium (Crawler + UXShowcase)</h4>
                    <p style={{ marginBottom: '0.5rem' }}>Nicho: {crawlerData.niche}</p>
                    <p style={{ marginBottom: '0.5rem' }}>Exemplos Dribbble: {crawlerData.examples?.length || 0} sites $10K+</p>
                    <p style={{ marginBottom: '0.5rem' }}>Logo Inspiration: <a href={crawlerData.uxshowcase} style={{ color: '#818cf8' }}>UXShowcase</a></p>
                    <div style={{ marginTop: '1rem' }}>
                      <strong>Logos para este nicho:</strong>
                      <p style={{ fontSize: '0.875rem', color: '#a0a0a0', marginTop: '0.5rem' }}>{crawlerData.logoInspiration}</p>
                    </div>
                  </div>
                )}

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                  <div>
                    <h4 style={{ color: '#667eea', marginBottom: '0.5rem' }}>Pontos de Dor</h4>
                    <ul style={{ listStyle: 'none', padding: 0 }}>
                      {analysis.analysis.painPoints.map((point, i) => (
                        <li key={i} style={{ marginBottom: '0.5rem', paddingLeft: '1rem', position: 'relative' }}>
                          <span style={{ position: 'absolute', left: 0, color: '#ef4444' }}>•</span>
                          {point}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 style={{ color: '#667eea', marginBottom: '0.5rem' }}>Melhorias Sugeridas</h4>
                    <ul style={{ listStyle: 'none', padding: 0 }}>
                      {analysis.analysis.improvements.map((imp, i) => (
                        <li key={i} style={{ marginBottom: '1rem', padding: '1rem', background: 'rgba(255,255,255,0.05)', borderRadius: '0.5rem' }}>
                          <strong>{imp.feature}</strong> ({imp.impact} impacto)
                          <p style={{ color: '#a0a0a0', fontSize: '0.875rem', marginTop: '0.25rem' }}>{imp.description}</p>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === 'find' && (
          <div style={{ background: 'rgba(26, 26, 46, 0.8)', borderRadius: '1rem', padding: '2rem', backdropFilter: 'blur(10px)' }}>
            <h2 style={{ color: 'white', fontSize: '2rem', marginBottom: '1.5rem' }}>Buscar Clientes Potenciais</h2>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr auto', gap: '1rem', marginBottom: '2rem' }}>
              <select value={niche} onChange={(e) => setNiche(e.target.value)} style={{
                padding: '1rem', borderRadius: '0.5rem', border: '1px solid #333',
                background: '#0a0a0a', color: 'white', fontSize: '1rem'
              }}>
                <option value="">Selecione um nicho</option>
                <option value="BARBERSHOP">Barbearia</option>
                <option value="SALON">Salão de Beleza</option>
                <option value="RESTAURANT">Restaurante</option>
                <option value="CLINIC">Clínica</option>
                <option value="GYM">Academia</option>
                <option value="RETAIL">Loja</option>
                <option value="REAL_ESTATE">Imobiliária</option>
                <option value="TECH">Tech</option>
                <option value="PET_SHOP">Pet Shop</option>
                <option value="HOTEL">Hotel</option>
              </select>
              <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} placeholder="Localização (ex: São Paulo)" style={{
                padding: '1rem', borderRadius: '0.5rem', border: '1px solid #333',
                background: '#0a0a0a', color: 'white', fontSize: '1rem'
              }} />
              <button onClick={handleFindClients} disabled={loading || !niche} style={{
                padding: '1rem 2rem', borderRadius: '0.5rem', border: 'none',
                background: loading ? '#666' : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: 'white', fontSize: '1rem', fontWeight: 600, cursor: loading ? 'not-allowed' : 'pointer'
              }}>
                {loading ? 'Buscando...' : 'Buscar'}
              </button>
            </div>

            {clients && clients.success && (
              <div style={{ color: 'white' }}>
                <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>{clients.count} Clientes Encontrados na Região</h3>
                <div style={{ display: 'grid', gap: '1rem' }}>
                  {clients.clients.map((client, i) => (
                    <div key={i} style={{ padding: '1.5rem', background: 'rgba(255,255,255,0.05)', borderRadius: '0.5rem', borderLeft: '4px solid #f59e0b' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                        <div>
                          <h4 style={{ fontSize: '1.25rem', margin: 0, color: 'white' }}>{client.name}</h4>
                          <a href={client.website} target="_blank" rel="noreferrer" style={{ color: '#667eea', fontSize: '0.9rem', textDecoration: 'none' }}>{client.website}</a>
                        </div>
                        <span style={{
                          padding: '0.25rem 0.75rem', borderRadius: '1rem',
                          background: client.priority === 'high' ? 'rgba(239,68,68,0.2)' : 'rgba(245,158,11,0.2)',
                          color: client.priority === 'high' ? '#ef4444' : '#f59e0b',
                          fontSize: '0.875rem', fontWeight: 600
                        }}>Alvo Perfeito</span>
                      </div>
                      
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                        <div>
                          <p style={{ color: '#a0a0a0', fontSize: '0.8rem', textTransform: 'uppercase', marginBottom: '0.2rem' }}>Contato Extraído (IA)</p>
                          <p style={{ margin: 0 }}>📞 {client.contactPhone || 'Não encontrado no site'}</p>
                          <p style={{ margin: 0 }}>✉️ {client.contactEmail || 'Não encontrado no site'}</p>
                        </div>
                        <div>
                          <p style={{ color: '#a0a0a0', fontSize: '0.8rem', textTransform: 'uppercase', marginBottom: '0.2rem' }}>Dores Atuais</p>
                          <ul style={{ margin: 0, paddingLeft: '1rem', color: '#fca5a5', fontSize: '0.9rem', marginBottom: '1rem' }}>
                            {client.issues?.map((issue, idx) => <li key={idx}>{issue}</li>)}
                          </ul>
                        </div>
                        {client.competitors && client.competitors.length > 0 && (
                          <div style={{ gridColumn: 'span 2' }}>
                            <p style={{ color: '#a0a0a0', fontSize: '0.8rem', textTransform: 'uppercase', marginBottom: '0.2rem' }}>Concorrentes Locais (Espião IA)</p>
                            <ul style={{ margin: 0, paddingLeft: '1rem', color: '#10b981', fontSize: '0.9rem' }}>
                              {client.competitors.map((comp, idx) => (
                                <li key={idx}>
                                  {comp.name} <a href={comp.website} target="_blank" rel="noreferrer" style={{ color: '#667eea', textDecoration: 'none' }}>[Ver Site]</a>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>

                      <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
                        {client.contactPhone && (
                           <a 
                             href={`https://wa.me/${client.contactPhone.replace(/\\D/g,'')}?text=Olá, somos especialistas em sites para ${client.niche}. Notamos que os seus concorrentes estão roubando seus clientes...`}
                             target="_blank" rel="noreferrer"
                             style={{ padding: '0.5rem 1rem', background: '#22c55e', color: 'white', textDecoration: 'none', borderRadius: '4px', fontSize: '0.9rem', fontWeight: 600 }}
                           >
                             Chamar no WhatsApp
                           </a>
                        )}
                        <button 
                          onClick={() => {
                             const data = btoa(encodeURIComponent(JSON.stringify(client)));
                             window.open(`/proposal?data=${data}`, '_blank');
                          }}
                          style={{ padding: '0.5rem 1rem', background: 'linear-gradient(135deg, #c084fc 0%, #764ba2 100%)', color: 'white', border: 'none', borderRadius: '4px', fontSize: '0.9rem', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
                        >
                          ✨ Gerar Proposta Mágica
                        </button>
                      </div>
                     </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
