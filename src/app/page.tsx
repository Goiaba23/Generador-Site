'use client';

import { useState, useRef, useEffect } from 'react';

type Message = {
  role: 'user' | 'assistant';
  text: string;
  intent?: string;
  toolResults?: any[];
};

const CAPABILITIES = [
  { icon: '🧠', label: 'Conversar', desc: 'Respondo perguntas, escrevo código, analiso dados' },
  { icon: '📺', label: 'YouTube', desc: 'Pesquiso vídeos e tendências sobre qualquer assunto' },
  { icon: '🔥', label: 'Web', desc: 'Acesso qualquer site e extraio conteúdo' },
  { icon: '🎨', label: 'Imagens', desc: 'Gero imagens com DALL-E 3 ou FLUX' },
  { icon: '🖼️', label: 'Stock Photos', desc: 'Busco fotos profissionais no Unsplash/Pexels' },
  { icon: '🌐', label: 'Sites', desc: 'Crio sites completos para qualquer propósito' },
  { icon: '🏷️', label: 'Marcas', desc: 'Busco logos e dados de qualquer empresa' },
  { icon: '🎬', label: 'Vídeos', desc: 'Crio vídeos com roteiro e cenas' },
  { icon: '📐', label: 'Design', desc: 'Pesquiso tendências em 10 plataformas' },
  { icon: '✏️', label: 'Editar', desc: 'Removo fundo, upscalo e edito imagens' },
];

const EXAMPLE_PROMPTS = [
  'Pesquise no YouTube sobre as tendências de design de sites para 2026',
  'Crie uma imagem de um logo moderno para uma marca de tecnologia',
  'Busque fotos de restaurantes sofisticados no Unsplash',
  'Acesse o site httpster.net e me mostre os designs em destaque',
  'Me ajude a escrever um código React para um componente de modal',
  'Crie um site completo para um café moderno',
];

export default function PersonalAIChat() {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', text: 'Olá! Eu sou seu assistente pessoal NexusAI. Posso pesquisar no YouTube, acessar sites, gerar imagens, criar sites, buscar marcas e muito mais. **O que você precisa hoje?**' },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [showCapabilities, setShowCapabilities] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    if (!loading && inputRef.current) inputRef.current.focus();
  }, [loading]);

  const sendMessage = async (text?: string) => {
    const msg = (text || input).trim();
    if (!msg || loading) return;

    setInput('');
    setShowCapabilities(false);
    const userMsg: Message = { role: 'user', text: msg };
    setMessages(prev => [...prev, userMsg]);
    setLoading(true);

    try {
      const history = messages.map(m => ({ role: m.role, text: m.text }));
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: msg, history }),
      });
      const data = await res.json();

      let replyText = data.reply || 'Desculpe, não consegui processar.';

      // If tool results exist, add visual indicators
      if (data.toolResults) {
        const toolIcons: Record<string, string> = {
          youtube: '📺', 'image-gen': '🎨', 'stock-photos': '🖼️',
          'design-research': '📐', logo: '🏷️', brand: '🏷️', firecrawl: '🔥',
        };
        const toolUsed = data.toolResults.map((t: any) => toolIcons[t.tool] || '🔧').join(' ');
        replyText = `${toolUsed} ${replyText}`;
      }

      setMessages(prev => [...prev, { role: 'assistant', text: replyText, intent: data.intent, toolResults: data.toolResults }]);
    } catch {
      setMessages(prev => [...prev, { role: 'assistant', text: '❌ Erro de conexão. Verifique se o servidor está rodando.' }]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div style={{
      height: '100dvh', display: 'flex', flexDirection: 'column',
      background: 'var(--bg-deep)', color: 'var(--text-body)',
      fontFamily: 'var(--font-body)',
    }}>
      {/* HEADER */}
      <header style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0.75rem 1.25rem', borderBottom: '1px solid var(--border)',
        background: 'var(--bg-surface)', flexShrink: 0,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span style={{ fontSize: '1.25rem' }}>✦</span>
          <span style={{ fontFamily: 'var(--font-heading)', fontSize: '1rem', fontWeight: 700, color: 'var(--text-heading)' }}>
            Nexus<span style={{ color: 'var(--cyan)' }}>AI</span>
          </span>
          <span style={{
            fontSize: '0.7rem', padding: '0.15rem 0.5rem', borderRadius: '1rem',
            background: 'rgba(6,182,212,0.1)', color: 'var(--cyan)',
            border: '1px solid rgba(6,182,212,0.15)', marginLeft: '0.5rem',
          }}>Pessoal</span>
        </div>
        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
          <button onClick={() => setShowCapabilities(!showCapabilities)} style={{
            padding: '0.35rem 0.75rem', borderRadius: '2rem', fontSize: '0.75rem', fontWeight: 500,
            background: showCapabilities ? 'var(--cyan-dim)' : 'transparent',
            color: showCapabilities ? 'var(--cyan)' : 'var(--text-muted)',
            border: '1px solid var(--border)', cursor: 'pointer',
          }}>
            {showCapabilities ? '▼ Esconder' : '▲ 10 Poderes'}
          </button>
        </div>
      </header>

      {/* MESSAGES */}
      <div style={{ flex: 1, overflow: 'auto', padding: '1rem' }}>
        {showCapabilities && messages.length <= 1 && (
          <div style={{ maxWidth: 700, margin: '1rem auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
              <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>✦</div>
              <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.5rem', fontWeight: 700, color: 'var(--text-heading)' }}>
                Nexus<span style={{ color: 'var(--cyan)' }}>AI</span>
              </h1>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
                Seu assistente pessoal com 10 superpoderes
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '0.5rem', marginBottom: '1.5rem' }}>
              {CAPABILITIES.map(c => (
                <div key={c.label} style={{
                  padding: '0.75rem', borderRadius: '0.75rem',
                  background: 'var(--bg-card)', border: '1px solid var(--border)',
                  textAlign: 'center',
                }}>
                  <div style={{ fontSize: '1.25rem', marginBottom: '0.25rem' }}>{c.icon}</div>
                  <div style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-heading)' }}>{c.label}</div>
                  <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '0.15rem' }}>{c.desc}</div>
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textAlign: 'center', marginBottom: '0.25rem' }}>
                Experimente perguntar:
              </p>
              {EXAMPLE_PROMPTS.map((p, i) => (
                <button key={i} onClick={() => sendMessage(p)} style={{
                  padding: '0.6rem 1rem', borderRadius: '0.75rem', fontSize: '0.8rem',
                  background: 'var(--bg-card)', border: '1px solid var(--border)',
                  color: 'var(--text-body)', cursor: 'pointer', textAlign: 'left',
                  transition: 'all 0.15s',
                }}>
                  {p}
                </button>
              ))}
            </div>
          </div>
        )}

        <div style={{ maxWidth: 700, margin: '0 auto' }}>
          {messages.map((msg, i) => (
            <div key={i} style={{
              display: 'flex', gap: '0.75rem',
              marginBottom: '1.25rem',
              flexDirection: msg.role === 'user' ? 'row-reverse' : 'row',
            }}>
              <div style={{
                width: 32, height: 32, borderRadius: '50%', flexShrink: 0,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '0.85rem',
                background: msg.role === 'user' ? 'var(--cyan-dim)' : 'var(--bg-card)',
                border: `1px solid ${msg.role === 'user' ? 'rgba(6,182,212,0.2)' : 'var(--border)'}`,
              }}>
                {msg.role === 'user' ? '👤' : '✦'}
              </div>
              <div style={{
                maxWidth: '85%',
                padding: '0.75rem 1rem',
                borderRadius: '1rem',
                fontSize: '0.9rem',
                lineHeight: 1.6,
                background: msg.role === 'user' ? 'var(--cyan-dim)' : 'var(--bg-card)',
                border: `1px solid ${msg.role === 'user' ? 'rgba(6,182,212,0.15)' : 'var(--border)'}`,
                color: msg.role === 'user' ? 'var(--text-heading)' : 'var(--text-body)',
                whiteSpace: 'pre-wrap',
              }}>
                {msg.text}
                {msg.toolResults && (
                  <div style={{ marginTop: '0.5rem', fontSize: '0.75rem', color: 'var(--text-muted)', borderTop: '1px solid var(--border)', paddingTop: '0.5rem' }}>
                    🔧 Ferramentas usadas: {msg.toolResults.map((t: any) => t.tool).join(', ')}
                  </div>
                )}
              </div>
            </div>
          ))}

          {loading && (
            <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1.25rem' }}>
              <div style={{
                width: 32, height: 32, borderRadius: '50%', flexShrink: 0,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                background: 'var(--bg-card)', border: '1px solid var(--border)',
              }}>✦</div>
              <div style={{
                padding: '0.75rem 1rem', borderRadius: '1rem', fontSize: '0.9rem',
                background: 'var(--bg-card)', border: '1px solid var(--border)',
              }}>
                <span style={{ opacity: 0.5 }}>pensando</span>
                <span style={{ animation: 'dots 1.5s steps(4, end) infinite' }}>...</span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* INPUT */}
      <div style={{
        padding: '0.75rem 1rem', borderTop: '1px solid var(--border)',
        background: 'var(--bg-surface)', flexShrink: 0,
      }}>
        <div style={{ maxWidth: 700, margin: '0 auto', display: 'flex', gap: '0.5rem' }}>
          <textarea
            ref={inputRef}
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Pergunte qualquer coisa..."
            rows={1}
            style={{
              flex: 1, padding: '0.75rem 1rem', borderRadius: '1rem', fontSize: '0.9rem',
              background: 'var(--bg-deep)', color: 'var(--text-heading)',
              border: '1px solid var(--border)', outline: 'none', resize: 'none',
              fontFamily: 'var(--font-body)', lineHeight: 1.5,
            }}
          />
          <button
            onClick={() => sendMessage()}
            disabled={loading || !input.trim()}
            style={{
              padding: '0.75rem 1.25rem', borderRadius: '1rem', fontSize: '1rem',
              background: input.trim() && !loading ? 'linear-gradient(135deg, var(--cyan), var(--blue))' : 'var(--bg-card)',
              color: input.trim() && !loading ? 'white' : 'var(--text-muted)',
              border: 'none', cursor: input.trim() && !loading ? 'pointer' : 'not-allowed',
              transition: 'all 0.2s',
            }}
          >
            ➤
          </button>
        </div>
        <p style={{
          textAlign: 'center', fontSize: '0.65rem', color: 'var(--text-muted)',
          marginTop: '0.5rem', opacity: 0.5,
        }}>
          NexusAI · Gemini · YouTube · Firecrawl · DALL-E · FLUX · Unsplash · Pexels
        </p>
      </div>

      <style>{`
        @keyframes dots {
          0%, 20% { opacity: 0; }
          40% { opacity: 1; }
          60%, 100% { opacity: 0; }
        }
        textarea:focus { border-color: rgba(6,182,212,0.3); }
        button:hover { opacity: 0.85; }
      `}</style>
    </div>
  );
}
