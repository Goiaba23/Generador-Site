'use client';

import { useState } from 'react';

type Tab = 'generate' | 'stock' | 'edit';

interface ImageResult {
  id: string;
  url: string;
  thumb: string;
  source: string;
  description?: string;
  photographer?: string;
}

export default function ProductImagesPage() {
  const [tab, setTab] = useState<Tab>('generate');

  const [productName, setProductName] = useState('');
  const [description, setDescription] = useState('');
  const [style, setStyle] = useState('white');
  const [angle, setAngle] = useState('three_quarter');
  const [brand, setBrand] = useState('');

  const [stockQuery, setStockQuery] = useState('');

  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<ImageResult[]>([]);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [editResult, setEditResult] = useState<string | null>(null);
  const [error, setError] = useState('');

  const handleGenerate = async () => {
    if (!productName) return;
    setLoading(true);
    setError('');
    setResults([]);
    try {
      const res = await fetch('/api/generate-product-image', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productName, description, style, angle, brand }),
      });
      const data = await res.json();
      if (data.success) {
        setResults([{ id: 'gen_1', url: data.imageUrl, thumb: data.imageUrl, source: data.source }]);
      } else {
        setError(data.error || 'Falha ao gerar imagem');
      }
    } catch {
      setError('Erro de conexão');
    } finally {
      setLoading(false);
    }
  };

  const handleSearchStock = async () => {
    if (!stockQuery) return;
    setLoading(true);
    setError('');
    setResults([]);
    try {
      const res = await fetch(`/api/search-stock-images?q=${encodeURIComponent(stockQuery)}&per_page=12`);
      const data = await res.json();
      if (data.success) {
        setResults(data.images.map((img: any) => ({
          id: img.id, url: img.url, thumb: img.small,
          source: img.source, description: img.description, photographer: img.photographer,
        })));
      } else {
        setError(data.error || 'Nenhuma imagem encontrada');
      }
    } catch {
      setError('Erro de conexão');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = async (action: 'remove-bg' | 'upscale') => {
    if (!selectedImage) return;
    setLoading(true);
    setEditResult(null);
    try {
      const res = await fetch('/api/edit-image', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action, imageUrl: selectedImage }),
      });
      const data = await res.json();
      if (data.success) {
        setEditResult(data.resultUrl);
      } else {
        if (data.fallback) setEditResult(null);
        else setError(data.error || `Falha ao executar ${action}`);
      }
    } catch {
      setError('Erro de conexão');
    } finally {
      setLoading(false);
    }
  };

  const STYLE_OPTIONS = [
    { value: 'white', label: 'Fundo Branco (Amazon)' },
    { value: 'studio', label: 'Studio Profissional' },
    { value: 'lifestyle', label: 'Lifestyle' },
    { value: 'luxury', label: 'Luxo' },
    { value: 'macro', label: 'Macro Detalhe' },
    { value: 'flatlay', label: 'Flat Lay' },
  ];

  const ANGLE_OPTIONS = [
    { value: 'front', label: 'Frontal' },
    { value: 'side', label: 'Perfil' },
    { value: 'three_quarter', label: 'Três Quartos' },
    { value: 'top', label: 'Superior' },
    { value: 'packshot', label: '360° Packshot' },
  ];

  const downloadImage = async (url: string, filename: string) => {
    const res = await fetch(url);
    const blob = await res.blob();
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = filename;
    a.click();
    URL.revokeObjectURL(a.href);
  };

  return (
    <main style={{ backgroundColor: '#07070E', minHeight: '100vh', color: '#EEEEF5' }}>
      <div style={{ maxWidth: 1400, margin: '0 auto', padding: '2rem' }}>
        <h1 style={{ fontSize: '3.5rem', fontWeight: 900, marginBottom: '0.5rem', letterSpacing: '-0.04em' }}>
          Product<span style={{ background: 'linear-gradient(to right, #06B6D4, #3B82F6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Studio</span>
        </h1>
        <p style={{ color: '#94a3b8', fontSize: '1.125rem', marginBottom: '2rem' }}>
          Gere imagens profissionais de produto com IA, busque fotos reais ou edite
        </p>

        <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '2rem' }}>
          {(['generate', 'stock', 'edit'] as Tab[]).map(t => (
            <button key={t} onClick={() => setTab(t)} style={{
              padding: '0.75rem 1.5rem', borderRadius: '0.75rem', border: 'none',
              background: tab === t ? 'linear-gradient(135deg, #06B6D4, #3B82F6)' : 'rgba(30, 41, 59, 0.6)',
              color: 'white', fontSize: '0.95rem', fontWeight: 600, cursor: 'pointer',
              transition: 'all 0.2s',
            }}>
              {t === 'generate' ? '🎨 Gerar com IA' : t === 'stock' ? '📸 Buscar Stock' : '✂️ Editar Imagem'}
            </button>
          ))}
        </div>

        {error && (
          <div style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', borderRadius: '0.75rem', padding: '1rem', marginBottom: '1.5rem', color: '#ef4444' }}>
            {error}
            <button onClick={() => setError('')} style={{ marginLeft: '1rem', background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer' }}>✕</button>
          </div>
        )}

        <div style={{ display: 'grid', gridTemplateColumns: '380px 1fr', gap: '2rem' }}>
          <div style={{ background: 'rgba(30,41,59,0.4)', borderRadius: '1.25rem', padding: '1.5rem', border: '1px solid rgba(51,65,85,0.4)', height: 'fit-content' }}>
            {tab === 'generate' && (
              <div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '1.5rem' }}>Gerar Imagem de Produto</h3>
                <div style={{ marginBottom: '1rem' }}>
                  <label style={{ display: 'block', color: '#94a3b8', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.35rem' }}>Nome do Produto *</label>
                  <input value={productName} onChange={e => setProductName(e.target.value)} placeholder="Ex: Perfume masculino 100ml" style={inputStyle} />
                </div>
                <div style={{ marginBottom: '1rem' }}>
                  <label style={{ display: 'block', color: '#94a3b8', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.35rem' }}>Descrição (opcional)</label>
                  <textarea value={description} onChange={e => setDescription(e.target.value)} placeholder="Fragrância amadeirada, vidro escuro, tampa dourada..." rows={3} style={{ ...inputStyle, resize: 'vertical' }} />
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '1rem' }}>
                  <div>
                    <label style={{ display: 'block', color: '#94a3b8', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.35rem' }}>Estilo</label>
                    <select value={style} onChange={e => setStyle(e.target.value)} style={inputStyle}>
                      {STYLE_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
                    </select>
                  </div>
                  <div>
                    <label style={{ display: 'block', color: '#94a3b8', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.35rem' }}>Ângulo</label>
                    <select value={angle} onChange={e => setAngle(e.target.value)} style={inputStyle}>
                      {ANGLE_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
                    </select>
                  </div>
                </div>
                <div style={{ marginBottom: '1.5rem' }}>
                  <label style={{ display: 'block', color: '#94a3b8', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.35rem' }}>Marca (opcional)</label>
                  <input value={brand} onChange={e => setBrand(e.target.value)} placeholder="Ex: Natura, L\'Oréal" style={inputStyle} />
                </div>
                <div style={{ fontSize: '0.75rem', color: '#64748b', marginBottom: '1rem' }}>
                  {style === 'white' ? 'Recomendado para Amazon, Shopee, Mercado Livre' :
                   style === 'lifestyle' ? 'Produto em uso, ambiente real' :
                   style === 'studio' ? 'Fundo limpo, iluminação profissional' : ''}
                </div>
                <button onClick={handleGenerate} disabled={loading || !productName} style={{
                  width: '100%', padding: '1rem', borderRadius: '0.75rem', border: 'none',
                  background: loading ? 'rgba(79,70,229,0.4)' : 'linear-gradient(135deg, #06B6D4, #3B82F6)',
                  color: 'white', fontSize: '1rem', fontWeight: 700, cursor: loading ? 'not-allowed' : 'pointer',
                  boxShadow: '0 8px 24px rgba(79,70,229,0.4)',
                }}>
                  {loading ? 'Gerando...' : '🚀 Gerar Imagem'}
                </button>
              </div>
            )}

            {tab === 'stock' && (
              <div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '1.5rem' }}>Buscar Fotos Reais</h3>
                <p style={{ color: '#64748b', fontSize: '0.875rem', marginBottom: '1rem' }}>
                  Unsplash + Pexels — fotos reais e gratuitas
                </p>
                <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
                  <input value={stockQuery} onChange={e => setStockQuery(e.target.value)}
                    placeholder="Ex: perfume luxury, candle, jewelry..."
                    style={{ ...inputStyle, flex: 1 }}
                    onKeyDown={e => e.key === 'Enter' && handleSearchStock()}
                  />
                </div>
                <button onClick={handleSearchStock} disabled={loading || !stockQuery} style={{
                  width: '100%', padding: '0.85rem', borderRadius: '0.75rem', border: 'none',
                  background: loading ? 'rgba(79,70,229,0.4)' : 'linear-gradient(135deg, #06B6D4, #3B82F6)',
                  color: 'white', fontSize: '1rem', fontWeight: 700, cursor: loading ? 'not-allowed' : 'pointer',
                }}>
                  {loading ? 'Buscando...' : '🔍 Buscar Imagens'}
                </button>
              </div>
            )}

            {tab === 'edit' && (
              <div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '1.5rem' }}>Editar Imagem</h3>
                <p style={{ color: '#64748b', fontSize: '0.875rem', marginBottom: '1rem' }}>
                  Selecione uma imagem nos resultados abaixo ou cole uma URL
                </p>
                <div style={{ marginBottom: '1rem' }}>
                  <label style={{ display: 'block', color: '#94a3b8', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.35rem' }}>URL da Imagem</label>
                  <input value={selectedImage || ''} onChange={e => setSelectedImage(e.target.value)} placeholder="https://..." style={inputStyle} />
                </div>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <button onClick={() => handleEdit('remove-bg')} disabled={loading || !selectedImage} style={{
                    flex: 1, padding: '0.85rem', borderRadius: '0.75rem', border: 'none',
                    background: loading ? 'rgba(16,185,129,0.3)' : 'rgba(16,185,129,0.2)',
                    color: '#10b981', fontSize: '0.9rem', fontWeight: 700, cursor: loading ? 'not-allowed' : 'pointer',
                  }}>
                    {loading ? '...' : 'Remover Fundo'}
                  </button>
                  <button onClick={() => handleEdit('upscale')} disabled={loading || !selectedImage} style={{
                    flex: 1, padding: '0.85rem', borderRadius: '0.75rem', border: 'none',
                    background: loading ? 'rgba(59,130,246,0.3)' : 'rgba(59,130,246,0.2)',
                    color: '#3b82f6', fontSize: '0.9rem', fontWeight: 700, cursor: loading ? 'not-allowed' : 'pointer',
                  }}>
                    {loading ? '...' : 'Upscale 2x'}
                  </button>
                </div>
              </div>
            )}
          </div>

          <div>
            {editResult && (
              <div style={{ marginBottom: '2rem', background: 'rgba(30,41,59,0.4)', borderRadius: '1.25rem', padding: '1.5rem', border: '1px solid rgba(51,65,85,0.4)' }}>
                <h3 style={{ fontWeight: 700, marginBottom: '1rem' }}>Resultado da Edição</h3>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  {selectedImage && (
                    <div>
                      <p style={{ color: '#94a3b8', fontSize: '0.8rem', marginBottom: '0.5rem' }}>Original</p>
                      <img src={selectedImage} alt="original" style={{ width: '100%', borderRadius: '0.75rem' }} />
                    </div>
                  )}
                  <div>
                    <p style={{ color: '#94a3b8', fontSize: '0.8rem', marginBottom: '0.5rem' }}>Editado</p>
                    <img src={editResult} alt="editado" style={{ width: '100%', borderRadius: '0.75rem' }} />
                  </div>
                </div>
                <button onClick={() => downloadImage(editResult, 'edited-product.png')} style={{
                  marginTop: '1rem', padding: '0.75rem 1.5rem', borderRadius: '0.75rem', border: 'none',
                  background: 'rgba(16,185,129,0.2)', color: '#10b981', cursor: 'pointer', fontWeight: 700,
                }}>
                  ⬇️ Download
                </button>
              </div>
            )}

            {results.length > 0 && (
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                  <h3 style={{ fontWeight: 700 }}>
                    {tab === 'generate' ? 'Imagem Gerada' : 'Resultados'} ({results.length})
                  </h3>
                  <span style={{ color: '#64748b', fontSize: '0.8rem' }}>
                    Fonte: {results[0]?.source}
                  </span>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: results.length > 1 ? 'repeat(auto-fill, minmax(280px, 1fr))' : '1fr', gap: '1.5rem' }}>
                  {results.map(img => (
                    <div key={img.id} style={{
                      background: 'rgba(30,41,59,0.4)', borderRadius: '1rem', overflow: 'hidden',
                      border: selectedImage === img.url ? '2px solid #06B6D4' : '1px solid rgba(51,65,85,0.4)',
                      cursor: 'pointer', transition: 'all 0.2s',
                    }}
                      onClick={() => setSelectedImage(img.url)}
                    >
                      <img src={img.thumb} alt={img.description || ''}
                        style={{ width: '100%', height: results.length > 1 ? '240px' : '400px', objectFit: 'cover', display: 'block' }}
                      />
                      <div style={{ padding: '1rem' }}>
                        <p style={{ fontSize: '0.8rem', color: '#94a3b8' }}>
                          {img.source} {img.photographer ? `• ${img.photographer}` : ''}
                        </p>
                        <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
                          <button onClick={(e) => { e.stopPropagation(); downloadImage(img.url, `product-${img.id}.png`); }} style={{
                            padding: '0.5rem 1rem', borderRadius: '0.5rem', border: 'none',
                            background: 'rgba(6,182,212,0.15)', color: '#06B6D4', cursor: 'pointer', fontSize: '0.8rem', fontWeight: 600,
                          }}>
                            ⬇️ Download
                          </button>
                          {tab !== 'generate' && (
                            <button onClick={(e) => { e.stopPropagation(); setSelectedImage(img.url); setTab('edit'); }} style={{
                              padding: '0.5rem 1rem', borderRadius: '0.5rem', border: 'none',
                              background: 'rgba(16,185,129,0.15)', color: '#10b981', cursor: 'pointer', fontSize: '0.8rem', fontWeight: 600,
                            }}>
                              ✂️ Editar
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {!loading && results.length === 0 && !editResult && (
              <div style={{ textAlign: 'center', padding: '4rem 2rem', color: '#64748b' }}>
                <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>
                  {tab === 'generate' ? '🎨' : tab === 'stock' ? '📸' : '✂️'}
                </div>
                <p style={{ fontSize: '1.125rem', color: '#94a3b8' }}>
                  {tab === 'generate' ? 'Descreva seu produto e gere imagens profissionais' :
                   tab === 'stock' ? 'Busque fotos reais em bancos de imagens gratuitos' :
                   'Remova fundo ou aumente resolução das suas imagens'}
                </p>
              </div>
            )}

            {loading && (
              <div style={{ textAlign: 'center', padding: '4rem 0' }}>
                <div style={{ width: 40, height: 40, border: '3px solid rgba(129,140,248,0.3)', borderTopColor: '#818cf8', borderRadius: '50%', animation: 'spin 1s linear infinite', margin: '0 auto 1rem' }} />
                <p style={{ color: '#94a3b8' }}>Processando...</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}

const inputStyle: React.CSSProperties = {
  width: '100%', padding: '0.75rem 1rem', background: 'rgba(15,23,42,0.8)',
  border: '1px solid rgba(51,65,85,0.5)', borderRadius: '0.75rem',
  color: 'white', fontSize: '0.9rem', outline: 'none', boxSizing: 'border-box',
};
