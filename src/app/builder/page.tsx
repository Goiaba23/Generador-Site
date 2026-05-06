'use client';

import { useState } from 'react';
import Link from 'next/link';

type BlockType = 'Hero' | 'Features' | 'Services' | 'Testimonials' | 'Gallery' | 'Pricing' | 'FAQ' | 'Contact' | 'Footer';

interface Block {
  id: string;
  type: BlockType;
  props: any;
}

export default function BuilderPage() {
  const [blocks, setBlocks] = useState<Block[]>([]);
  const [selectedBlock, setSelectedBlock] = useState<string | null>(null);

  const addBlock = (type: BlockType) => {
    const newBlock: Block = {
      id: Math.random().toString(36).substring(7),
      type,
      props: getDefaultProps(type)
    };
    setBlocks([...blocks, newBlock]);
  };

  const removeBlock = (id: string) => {
    setBlocks(blocks.filter(b => b.id !== id));
    if (selectedBlock === id) setSelectedBlock(null);
  };

  const moveBlock = (index: number, direction: 'up' | 'down') => {
    const newBlocks = [...blocks];
    if (direction === 'up' && index > 0) {
      [newBlocks[index - 1], newBlocks[index]] = [newBlocks[index], newBlocks[index - 1]];
    } else if (direction === 'down' && index < newBlocks.length - 1) {
      [newBlocks[index + 1], newBlocks[index]] = [newBlocks[index], newBlocks[index + 1]];
    }
    setBlocks(newBlocks);
  };

  const updateBlockProps = (id: string, key: string, value: string) => {
    setBlocks(blocks.map(b => b.id === id ? { ...b, props: { ...b.props, [key]: value } } : b));
  };

  const activeBlock = blocks.find(b => b.id === selectedBlock);

  return (
    <main style={{ display: 'flex', height: '100vh', backgroundColor: '#0f172a', color: '#f8fafc', overflow: 'hidden' }}>
      {/* LEFT SIDEBAR: Blocks Palette */}
      <aside style={{ width: '280px', borderRight: '1px solid rgba(255,255,255,0.1)', background: '#1e293b', display: 'flex', flexDirection: 'column' }}>
        <div style={{ padding: '1.5rem', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
          <Link href="/" style={{ color: 'white', textDecoration: 'none', fontWeight: 'bold', fontSize: '1.2rem', display: 'block', marginBottom: '1rem' }}>
            ← SitesSaaS
          </Link>
          <h2 style={{ fontSize: '1rem', fontWeight: 600, color: '#94a3b8' }}>Adicionar Seção</h2>
        </div>
        
        <div style={{ padding: '1rem', overflowY: 'auto', flex: 1, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          {(['Hero', 'Features', 'Services', 'Gallery', 'Testimonials', 'Pricing', 'FAQ', 'Contact', 'Footer'] as BlockType[]).map(type => (
            <button
              key={type}
              onClick={() => addBlock(type)}
              style={{
                background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', padding: '1rem',
                borderRadius: '8px', color: '#e2e8f0', textAlign: 'left', cursor: 'pointer',
                transition: 'all 0.2s'
              }}
              onMouseOver={e => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}
              onMouseOut={e => e.currentTarget.style.background = 'rgba(255,255,255,0.05)'}
            >
              + {type}
            </button>
          ))}
        </div>

        <div style={{ padding: '1rem', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
          <button style={{ width: '100%', background: '#4f46e5', color: 'white', border: 'none', padding: '1rem', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }}>
            Salvar e Publicar
          </button>
        </div>
      </aside>

      {/* CENTER: Canvas */}
      <section style={{ flex: 1, overflowY: 'auto', position: 'relative', padding: '2rem' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto', background: 'white', minHeight: '100%', borderRadius: '8px', boxShadow: '0 20px 40px rgba(0,0,0,0.4)', overflow: 'hidden' }}>
          {blocks.length === 0 ? (
            <div style={{ height: '400px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#64748b' }}>
              Nenhuma seção adicionada. Selecione blocos na lateral esquerda.
            </div>
          ) : (
            blocks.map((block, index) => (
              <div 
                key={block.id} 
                onClick={() => setSelectedBlock(block.id)}
                style={{ 
                  position: 'relative', 
                  border: selectedBlock === block.id ? '2px solid #4f46e5' : '2px solid transparent',
                  cursor: 'pointer',
                  transition: 'border 0.2s'
                }}
              >
                {/* Visualizer Block */}
                <BlockRenderer block={block} />

                {/* Overlay Controls */}
                {selectedBlock === block.id && (
                  <div style={{ position: 'absolute', top: '10px', right: '10px', display: 'flex', gap: '5px', background: '#4f46e5', padding: '5px', borderRadius: '6px' }}>
                    <button onClick={(e) => { e.stopPropagation(); moveBlock(index, 'up'); }} style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer', padding: '4px' }}>↑</button>
                    <button onClick={(e) => { e.stopPropagation(); moveBlock(index, 'down'); }} style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer', padding: '4px' }}>↓</button>
                    <button onClick={(e) => { e.stopPropagation(); removeBlock(block.id); }} style={{ background: 'none', border: 'none', color: '#fca5a5', cursor: 'pointer', padding: '4px', marginLeft: '5px' }}>X</button>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </section>

      {/* RIGHT SIDEBAR: Settings */}
      {selectedBlock && activeBlock && (
        <aside style={{ width: '300px', borderLeft: '1px solid rgba(255,255,255,0.1)', background: '#1e293b', display: 'flex', flexDirection: 'column' }}>
          <div style={{ padding: '1.5rem', borderBottom: '1px solid rgba(255,255,255,0.1)', display: 'flex', justifyContent: 'space-between' }}>
            <h2 style={{ fontSize: '1rem', fontWeight: 600, color: 'white' }}>Editar {activeBlock.type}</h2>
            <button onClick={() => setSelectedBlock(null)} style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer' }}>✕</button>
          </div>
          
          <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem', overflowY: 'auto' }}>
            {Object.keys(activeBlock.props).map(key => (
              <div key={key}>
                <label style={{ display: 'block', fontSize: '0.8rem', color: '#cbd5e1', marginBottom: '0.5rem', textTransform: 'capitalize' }}>{key}</label>
                {typeof activeBlock.props[key] === 'string' && activeBlock.props[key].length > 50 ? (
                   <textarea
                     value={activeBlock.props[key]}
                     onChange={(e) => updateBlockProps(activeBlock.id, key, e.target.value)}
                     style={{ width: '100%', padding: '0.75rem', borderRadius: '6px', background: '#0f172a', border: '1px solid rgba(255,255,255,0.2)', color: 'white', minHeight: '100px' }}
                   />
                ) : (
                  <input 
                    type="text" 
                    value={activeBlock.props[key]}
                    onChange={(e) => updateBlockProps(activeBlock.id, key, e.target.value)}
                    style={{ width: '100%', padding: '0.75rem', borderRadius: '6px', background: '#0f172a', border: '1px solid rgba(255,255,255,0.2)', color: 'white' }}
                  />
                )}
              </div>
            ))}
          </div>
        </aside>
      )}
    </main>
  );
}

// Helper: Component Renderer
function BlockRenderer({ block }: { block: Block }) {
  const { type, props } = block;
  
  // A generic wrapper for styling blocks in the preview
  const wrapperStyle = { padding: '4rem 2rem', color: '#1e293b', fontFamily: 'sans-serif' };

  switch (type) {
    case 'Hero':
      return (
        <div style={{ ...wrapperStyle, textAlign: 'center', background: '#f8fafc', padding: '6rem 2rem' }}>
          <h1 style={{ fontSize: '3rem', fontWeight: 800, marginBottom: '1rem', color: '#0f172a' }}>{props.title}</h1>
          <p style={{ fontSize: '1.2rem', color: '#64748b', maxWidth: '600px', margin: '0 auto 2rem auto' }}>{props.subtitle}</p>
          <button style={{ background: '#4f46e5', color: 'white', border: 'none', padding: '1rem 2rem', borderRadius: '30px', fontSize: '1.1rem', fontWeight: 'bold' }}>{props.cta}</button>
        </div>
      );
    case 'Features':
      return (
        <div style={{ ...wrapperStyle }}>
          <h2 style={{ textAlign: 'center', fontSize: '2rem', fontWeight: 700, marginBottom: '3rem' }}>{props.title}</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem' }}>
            {[1, 2, 3].map(i => (
              <div key={i} style={{ padding: '2rem', background: '#f1f5f9', borderRadius: '12px', textAlign: 'center' }}>
                <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>🚀</div>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 600, marginBottom: '0.5rem' }}>Benefício {i}</h3>
                <p style={{ color: '#64748b', fontSize: '0.9rem' }}>Descrição do benefício incrível que seu negócio oferece aos clientes.</p>
              </div>
            ))}
          </div>
        </div>
      );
    case 'Gallery':
      return (
        <div style={{ ...wrapperStyle, background: '#f8fafc' }}>
          <h2 style={{ textAlign: 'center', fontSize: '2rem', fontWeight: 700, marginBottom: '3rem' }}>{props.title}</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
            {[1, 2, 3, 4, 5, 6].map(i => (
              <div key={i} style={{ width: '100%', height: '200px', background: '#e2e8f0', borderRadius: '8px' }}></div>
            ))}
          </div>
        </div>
      );
    default:
      return (
        <div style={{ ...wrapperStyle, textAlign: 'center', border: '1px dashed #cbd5e1' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 600 }}>[ {type} Section ]</h2>
          <p style={{ color: '#64748b' }}>{props.title}</p>
        </div>
      );
  }
}

// Helper: Default Props
function getDefaultProps(type: BlockType) {
  switch (type) {
    case 'Hero': return { title: 'Transforme seu Negócio Hoje', subtitle: 'A solução definitiva para escalar suas vendas e otimizar processos em tempo recorde.', cta: 'Comece Agora' };
    case 'Features': return { title: 'Por que nos escolher?' };
    case 'Services': return { title: 'Nossos Serviços Premium' };
    case 'Testimonials': return { title: 'O que dizem sobre nós' };
    case 'Gallery': return { title: 'Nosso Portfólio' };
    case 'Pricing': return { title: 'Planos e Preços Transparentes' };
    case 'FAQ': return { title: 'Perguntas Frequentes' };
    case 'Contact': return { title: 'Fale Conosco', email: 'contato@empresa.com' };
    case 'Footer': return { copyright: '© 2026 Empresa. Todos os direitos reservados.' };
    default: return { title: 'Nova Seção' };
  }
}
