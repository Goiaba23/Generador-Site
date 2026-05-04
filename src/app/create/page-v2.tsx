'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { BusinessType, TemplateStyle } from '@prisma/client';
import { getAllTemplates, getTemplateByType } from '@/lib/templates';
import { getDiscoveryQuestions, generateBusinessInsights, enhanceContentWithInsights } from '@/lib/ai-conversational';

type CreationMode = 'template' | 'ai-conversational';

export default function CreateSitePageV2() {
  const router = useRouter();
  const [mode, setMode] = useState<CreationMode | null>(null);
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  
  // Basic info
  const [formData, setFormData] = useState({
    name: '',
    type: 'RESTAURANT' as keyof typeof BusinessType,
    description: '',
    address: '',
    phone: '',
    email: '',
  });

  // Template selection
  const [selectedStyle, setSelectedStyle] = useState('CATALOG');
  const templates = getAllTemplates();
  const selectedTemplate = getTemplateByType(formData.type as any, selectedStyle as any);

  // AI Conversational
  const [questions, setQuestions] = useState<any[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [aiInsights, setAiInsights] = useState<any>(null);
  const [aiLoading, setAiLoading] = useState(false);

  // Load discovery questions when business type is selected
  useEffect(() => {
    if (mode === 'ai-conversational' && formData.type) {
      const qs = getDiscoveryQuestions(formData.type as any);
      setQuestions(qs);
      setCurrentQuestion(0);
    }
  }, [mode, formData.type]);

  const handleAnswer = (questionId: string, value: any) => {
    setAnswers(prev => ({ ...prev, [questionId]: value }));
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // All questions answered, generate insights
      generateAIInsights();
    }
  };

  const generateAIInsights = async () => {
    setAiLoading(true);
    try {
      const insights = await generateBusinessInsights(
        formData.type as any,
        formData.name,
        answers
      );
      setAiInsights(insights);
      setStep(3); // Move to preview step
    } catch (error) {
      console.error('Error generating insights:', error);
    } finally {
      setAiLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const payload: any = {
        ...formData,
        style: selectedStyle,
      };

      // If AI mode, include insights
      if (mode === 'ai-conversational' && aiInsights) {
        payload.aiInsights = aiInsights;
        payload.answers = answers;
      }

      const response = await fetch('/api/sites/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!response.ok) throw new Error('Failed to create site');
      
      const data = await response.json();
      router.push(`/dashboard/${data.business.slug}`);
    } catch (error) {
      console.error('Error creating site:', error);
      alert('Erro ao criar site. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  // Mode Selection Screen
  if (!mode) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Como você quer criar seu site?</h1>
            <p className="text-xl text-gray-600">Escolha a forma que melhor se adapta ao seu negócio</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            {/* Option 1: Ready-made Template */}
            <div
              onClick={() => setMode('template')}
              className="bg-white rounded-2xl shadow-xl p-8 cursor-pointer hover:shadow-2xl transition transform hover:scale-105 border-2 border-transparent hover:border-blue-500"
            >
              <div className="text-center mb-6">
                <div className="text-6xl mb-4">🎨</div>
                <h2 className="text-2xl font-bold mb-2">Template Pronto</h2>
                <p className="text-gray-600">Ideal para quem quer agilidade</p>
              </div>

              <ul className="space-y-3 mb-6">
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>Site pronto em menos de 2 minutos</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>Design profissional pré-otimizado</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>Baseado no tipo do seu comércio</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>Personalização básica de cores e textos</span>
                </li>
              </ul>

              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="text-sm text-blue-800 font-medium">
                  ⚡ Recomendado para: Padarias, Farmácias, Pet Shops, Lojas em geral
                </p>
              </div>

              <button className="w-full mt-6 bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition">
                Usar Template Pronto →
              </button>
            </div>

            {/* Option 2: AI Conversational */}
            <div
              onClick={() => setMode('ai-conversational')}
              className="bg-white rounded-2xl shadow-xl p-8 cursor-pointer hover:shadow-2xl transition transform hover:scale-105 border-2 border-transparent hover:border-purple-500"
            >
              <div className="text-center mb-6">
                <div className="text-6xl mb-4">🤖</div>
                <h2 className="text-2xl font-bold mb-2">IA Personalizada</h2>
                <p className="text-gray-600">IA entende seu negócio e cria algo único</p>
              </div>

              <ul className="space-y-3 mb-6">
                <li className="flex items-start">
                  <span className="text-purple-500 mr-2">✓</span>
                  <span>IA faz perguntas sobre seu negócio</span>
                </li>
                <li className="flex items-start">
                  <span className="text-purple-500 mr-2">✓</span>
                  <span>Entende problemas e objetivos</span>
                </li>
                <li className="flex items-start">
                  <span className="text-purple-500 mr-2">✓</span>
                  <span>Gera textos otimizados para SEO</span>
                </li>
                <li className="flex items-start">
                  <span className="text-purple-500 mr-2">✓</span>
                  <span>Site 100% alinhado com sua marca</span>
                </li>
              </ul>

              <div className="bg-purple-50 p-4 rounded-lg">
                <p className="text-sm text-purple-800 font-medium">
                  🧠 Recomendado para: Quem busca diferencial competitivo e conversão
                </p>
              </div>

              <button className="w-full mt-6 bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700 transition">
                Usar IA Personalizada →
              </button>
            </div>
          </div>

          <div className="text-center">
            <button
              onClick={() => router.push('/')}
              className="text-gray-600 hover:text-gray-800"
            >
              ← Voltar para início
            </button>
          </div>
        </div>
      </main>
    );
  }

  // Template Mode - Steps 1-3
  if (mode === 'template') {
    return (
      <main className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-4xl mx-auto px-4">
          <div className="mb-8">
            <button
              onClick={() => { setMode(null); setStep(1); }}
              className="text-blue-600 hover:text-blue-800"
            >
              ← Voltar para escolha
            </button>
          </div>

          <h1 className="text-3xl font-bold mb-8 text-center">
            Crie seu site com Template Pronto
          </h1>

          {/* Progress indicator */}
          <div className="flex mb-8 justify-center">
            {[1, 2, 3].map((s) => (
              <div key={s} className="flex items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    s === step ? 'bg-blue-600 text-white' :
                    s < step ? 'bg-green-500 text-white' : 'bg-gray-300 text-gray-600'
                  }`}
                >
                  {s < step ? '✓' : s}
                </div>
                {s < 3 && (
                  <div className={`w-24 h-1 ${s < step ? 'bg-green-500' : 'bg-gray-300'}`} />
                )}
              </div>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-lg p-8">
            {step === 1 && (
              <div>
                <h2 className="text-xl font-semibold mb-6">Informações Básicas</h2>
                
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-2">Nome do Comércio *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="Ex: Hamburgueria do João"
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium mb-2">Tipo de Comércio *</label>
                  <select
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value as any })}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="RESTAURANT">Restaurante/Hamburgueria</option>
                    <option value="BARBERSHOP">Barbearia</option>
                    <option value="SALON">Salão de Beleza</option>
                    <option value="BAKERY">Padaria/Confeitaria</option>
                    <option value="PHARMACY">Farmácia</option>
                    <option value="PET_SHOP">Pet Shop</option>
                    <option value="BOOKSTORE">Livraria</option>
                    <option value="FLORIST">Floricultura</option>
                    <option value="CLEANING_SERVICE">Serviço de Limpeza</option>
                    <option value="AUTOMOTIVE">Oficina/Autopeças</option>
                    <option value="ELECTRONICS">Loja de Eletrônicos</option>
                    <option value="TOY_STORE">Loja de Brinquedos</option>
                    <option value="SPORTS_STORE">Artigos Esportivos</option>
                    <option value="TRAVEL_AGENCY">Agência de Viagens</option>
                    <option value="REAL_ESTATE">Imobiliária</option>
                    <option value="CONFECTIONERY">Confeitaria (Doces)</option>
                    <option value="GYM">Academia</option>
                    <option value="RETAIL">Loja em geral</option>
                    <option value="CAFE">Café</option>
                    <option value="HOTEL">Hotel</option>
                    <option value="OTHER">Outro</option>
                  </select>
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium mb-2">Descrição curta</label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full px-4 py-2 border rounded-lg"
                    rows={3}
                    placeholder="Ex: Os melhores hambúrgueres da cidade"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">Endereço</label>
                    <input
                      type="text"
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      className="w-full px-4 py-2 border rounded-lg"
                      placeholder="Rua Exemplo, 123"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Telefone</label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-2 border rounded-lg"
                      placeholder="(11) 99999-9999"
                    />
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700"
                >
                  Próximo: Escolher Estilo →
                </button>
              </div>
            )}

            {step === 2 && (
              <div>
                <h2 className="text-xl font-semibold mb-6">Escolha o Estilo do Site</h2>
                
                <div className="mb-6">
                  <label className="block text-sm font-medium mb-4">Estilo do Site</label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {['CATALOG', 'BOOKING', 'PORTFOLIO', 'LANDING', 'ECOMMERCE', 'BLOG'].map((style) => (
                      <div
                        key={style}
                        onClick={() => setSelectedStyle(style)}
                        className={`border rounded-lg p-4 cursor-pointer transition ${
                          selectedStyle === style
                            ? 'border-blue-600 bg-blue-50'
                            : 'hover:border-gray-400'
                        }`}
                      >
                        <p className="font-semibold text-center">
                          {style === 'CATALOG' ? 'Catálogo/Cardápio' :
                           style === 'BOOKING' ? 'Agendamento' :
                           style === 'PORTFOLIO' ? 'Portfólio' :
                           style === 'LANDING' ? 'Landing Page' :
                           style === 'ECOMMERCE' ? 'Loja Online' : 'Blog'}
                        </p>
                        <p className="text-xs text-gray-600 mt-1 text-center">
                          {style === 'CATALOG' ? 'Ideal para restaurantes' :
                           style === 'BOOKING' ? 'Ideal para barbearias' :
                           style === 'PORTFOLIO' ? 'Ideal para salões' :
                           style === 'LANDING' ? 'Página de conversão' :
                           style === 'ECOMMERCE' ? 'Venda online' : 'Conteúdo e posts'}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {selectedTemplate && (
                  <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                    <h3 className="font-semibold mb-2">Template: {selectedTemplate.name}</h3>
                    <p className="text-sm text-gray-600">{selectedTemplate.description}</p>
                  </div>
                )}

                <div className="flex gap-4">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="flex-1 bg-gray-300 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-400"
                  >
                    ← Voltar
                  </button>
                  <button
                    type="button"
                    onClick={() => setStep(3)}
                    className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700"
                  >
                    Próximo: Revisar →
                  </button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div>
                <h2 className="text-xl font-semibold mb-6">Revise e Crie seu Site</h2>
                
                <div className="bg-gray-50 rounded-lg p-6 mb-6">
                  <h3 className="font-semibold text-lg mb-4">Resumo</h3>
                  <dl className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <dt className="text-sm text-gray-600">Nome</dt>
                      <dd className="font-medium">{formData.name}</dd>
                    </div>
                    <div>
                      <dt className="text-sm text-gray-600">Tipo</dt>
                      <dd className="font-medium">{formData.type}</dd>
                    </div>
                    <div>
                      <dt className="text-sm text-gray-600">Estilo</dt>
                      <dd className="font-medium">{selectedStyle}</dd>
                    </div>
                    <div>
                      <dt className="text-sm text-gray-600">Modo</dt>
                      <dd className="font-medium">⚡ Template Pronto</dd>
                    </div>
                  </dl>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                  <p className="text-sm text-blue-800">
                    <strong>✨ Template Pronto:</strong> Seu site será gerado instantaneamente 
                    com design profissional otimizado para {formData.type === 'RESTAURANT' ? 'restaurantes' : 
                    formData.type === 'BARBERSHOP' ? 'barbearias' : 'comércios'}.
                  </p>
                </div>

                <div className="flex gap-4">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="flex-1 bg-gray-300 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-400"
                  >
                    ← Voltar
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex-1 bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 disabled:opacity-50"
                  >
                    {loading ? 'Criando seu site...' : '🚀 Criar meu site agora'}
                  </button>
                </div>
              </div>
            )}
          </form>
        </div>
      </main>
    );
  }

  // AI Conversational Mode
  if (mode === 'ai-conversational') {
    return (
      <main className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 py-12">
        <div className="max-w-4xl mx-auto px-4">
          <div className="mb-8">
            <button
              onClick={() => { setMode(null); setStep(1); setCurrentQuestion(0); }}
              className="text-purple-600 hover:text-purple-800"
            >
              ← Voltar para escolha
            </button>
          </div>

          <h1 className="text-3xl font-bold mb-8 text-center text-purple-900">
            🤖 IA Personalizada - Conversa com a IA
          </h1>

          {/* Step 1: Basic Info */}
          {step === 1 && (
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h2 className="text-2xl font-semibold mb-6">Primeiro, vamos nos conhecer</h2>
              
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Nome do Comércio *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-purple-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  placeholder="Ex: Hamburgueria do João"
                />
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium mb-2">Tipo de Comércio *</label>
                <select
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value as any })}
                  className="w-full px-4 py-3 border-2 border-purple-200 rounded-lg focus:ring-2 focus:ring-purple-500"
                >
                  <option value="RESTAURANT">🍔 Restaurante/Hamburgueria</option>
                  <option value="BARBERSHOP">✂️ Barbearia</option>
                  <option value="SALON">💇 Salão de Beleza</option>
                  <option value="BAKERY">🍞 Padaria/Confeitaria</option>
                  <option value="PHARMACY">💊 Farmácia</option>
                  <option value="PET_SHOP">🐕 Pet Shop</option>
                  <option value="BOOKSTORE">📚 Livraria</option>
                  <option value="FLORIST">🌸 Floricultura</option>
                  <option value="CLEANING_SERVICE">🧹 Serviço de Limpeza</option>
                  <option value="AUTOMOTIVE">🔧 Oficina/Autopeças</option>
                  <option value="ELECTRONICS">📱 Loja de Eletrônicos</option>
                  <option value="TOY_STORE">🧸 Loja de Brinquedos</option>
                  <option value="SPORTS_STORE">⚽ Artigos Esportivos</option>
                  <option value="TRAVEL_AGENCY">✈️ Agência de Viagens</option>
                  <option value="REAL_ESTATE">🏠 Imobiliária</option>
                  <option value="CONFECTIONERY">🍬 Confeitaria (Doces)</option>
                </select>
              </div>

              <button
                type="button"
                onClick={() => setStep(2)}
                disabled={!formData.name || !formData.type}
                className="w-full bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700 disabled:opacity-50"
              >
                Começar Conversa com IA →
              </button>
            </div>
          )}

          {/* Step 2: AI Questions */}
          {step === 2 && questions.length > 0 && currentQuestion < questions.length && (
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <div className="mb-6">
                <div className="flex justify-between text-sm text-gray-600 mb-2">
                  <span>Pergunta {currentQuestion + 1} de {questions.length}</span>
                  <span>{Math.round(((currentQuestion + 1) / questions.length) * 100)}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-purple-600 h-2 rounded-full transition-all"
                    style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
                  />
                </div>
              </div>

              <div className="mb-8">
                <div className="text-4xl mb-4">
                  {questions[currentQuestion].options?.[0]?.icon || '🤔'}
                </div>
                <h2 className="text-2xl font-semibold mb-2">
                  {questions[currentQuestion].question}
                </h2>
              </div>

              <div className="space-y-3 mb-8">
                {questions[currentQuestion].type === 'single_choice' && (
                  questions[currentQuestion].options.map((opt: any) => (
                    <div
                      key={opt.value}
                      onClick={() => handleAnswer(questions[currentQuestion].id, opt.value)}
                      className={`border-2 rounded-lg p-4 cursor-pointer transition ${
                        answers[questions[currentQuestion].id] === opt.value
                          ? 'border-purple-600 bg-purple-50'
                          : 'border-gray-200 hover:border-purple-300'
                      }`}
                    >
                      <div className="flex items-center">
                        <span className="text-2xl mr-3">{opt.icon}</span>
                        <span className="font-medium">{opt.label}</span>
                      </div>
                    </div>
                  ))
                )}

                {questions[currentQuestion].type === 'multiple_choice' && (
                  questions[currentQuestion].options.map((opt: any) => (
                    <div
                      key={opt.value}
                      onClick={() => {
                        const current = answers[questions[currentQuestion].id] || [];
                        const updated = current.includes(opt.value)
                          ? current.filter((v: string) => v !== opt.value)
                          : [...current, opt.value];
                        handleAnswer(questions[currentQuestion].id, updated);
                      }}
                      className={`border-2 rounded-lg p-4 cursor-pointer transition ${
                        (answers[questions[currentQuestion].id] || []).includes(opt.value)
                          ? 'border-purple-600 bg-purple-50'
                          : 'border-gray-200 hover:border-purple-300'
                      }`}
                    >
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          checked={(answers[questions[currentQuestion].id] || []).includes(opt.value)}
                          readOnly
                          className="mr-3"
                        />
                        <span className="text-2xl mr-3">{opt.icon}</span>
                        <span className="font-medium">{opt.label}</span>
                      </div>
                    </div>
                  ))
                )}

                {questions[currentQuestion].type === 'text_input' && (
                  <textarea
                    value={answers[questions[currentQuestion].id] || ''}
                    onChange={(e) => handleAnswer(questions[currentQuestion].id, e.target.value)}
                    className="w-full px-4 py-3 border-2 border-purple-200 rounded-lg focus:ring-2 focus:ring-purple-500"
                    rows={3}
                    placeholder={questions[currentQuestion].placeholder}
                  />
                )}
              </div>

              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => currentQuestion > 0 ? setCurrentQuestion(currentQuestion - 1) : setStep(1)}
                  className="flex-1 bg-gray-300 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-400"
                >
                  ← Voltar
                </button>
                <button
                  type="button"
                  onClick={nextQuestion}
                  disabled={!answers[questions[currentQuestion].id]}
                  className="flex-1 bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700 disabled:opacity-50"
                >
                  {currentQuestion < questions.length - 1 ? 'Próxima →' : 'Gerar Insights com IA 🧠'}
                </button>
              </div>
            </div>
          )}

          {/* Loading State */}
          {aiLoading && (
            <div className="bg-white rounded-2xl shadow-xl p-12 text-center">
              <div className="text-6xl mb-4">🧠</div>
              <h2 className="text-2xl font-semibold mb-4">IA está analisando seu negócio...</h2>
              <div className="flex justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
              </div>
              <p className="mt-4 text-gray-600">Processando respostas e gerando insights...</p>
            </div>
          )}

          {/* Step 3: AI Insights & Preview */}
          {step === 3 && aiInsights && (
            <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-xl p-8">
              <h2 className="text-2xl font-semibold mb-6">🧠 Insights da IA</h2>
              
              <div className="bg-purple-50 border border-purple-200 rounded-lg p-6 mb-6">
                <h3 className="font-semibold text-lg mb-3">Análise do seu Negócio</h3>
                
                <div className="mb-4">
                  <h4 className="font-medium text-purple-900 mb-2">🎯 Objetivo Principal:</h4>
                  <p className="text-purple-800">
                    {aiInsights.objectives?.primary === 'sell_online' && 'Vender produtos online (E-commerce)'}
                    {aiInsights.objectives?.primary === 'get_bookings' && 'Gerar agendamentos online'}
                    {aiInsights.objectives?.primary === 'increase_visibility' && 'Aumentar visibilidade'}
                    {aiInsights.objectives?.primary === 'generate_leads' && 'Captar leads e contatos'}
                  </p>
                </div>

                {aiInsights.problems?.length > 0 && (
                  <div className="mb-4">
                    <h4 className="font-medium text-purple-900 mb-2">⚠️ Problemas Identificados:</h4>
                    <ul className="list-disc list-inside text-purple-800">
                      {aiInsights.problems.map((p: any, idx: number) => (
                        <li key={idx}>{p.description}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {aiInsights.differentiators?.length > 0 && (
                  <div className="mb-4">
                    <h4 className="font-medium text-purple-900 mb-2">🌟 Seus Diferenciais:</h4>
                    <div className="flex flex-wrap gap-2">
                      {aiInsights.differentiators.map((d: string, idx: number) => (
                        <span key={idx} className="bg-purple-200 text-purple-900 px-3 py-1 rounded-full text-sm">
                          {d}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                <div>
                  <h4 className="font-medium text-purple-900 mb-2">📊 Estilo Recomendado:</h4>
                  <p className="text-purple-800 font-semibold">{aiInsights.recommendedStyle}</p>
                </div>
              </div>

              <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                <p className="text-sm text-green-800">
                  <strong>✨ IA Personalizada:</strong> Seu site será único, com textos gerados 
                  especificamente para seu negócio, abordando seus problemas e focando no seu objetivo.
                </p>
              </div>

              <div className="bg-gray-50 rounded-lg p-6 mb-6">
                <h3 className="font-semibold mb-4">Resumo Final</h3>
                <dl className="grid grid-cols-2 gap-4">
                  <div>
                    <dt className="text-sm text-gray-600">Nome</dt>
                    <dd className="font-medium">{formData.name}</dd>
                  </div>
                  <div>
                    <dt className="text-sm text-gray-600">Tipo</dt>
                    <dd className="font-medium">{formData.type}</dd>
                  </div>
                  <div>
                    <dt className="text-sm text-gray-600">Modo</dt>
                    <dd className="font-medium">🧠 IA Personalizada</dd>
                  </div>
                  <div>
                    <dt className="text-sm text-gray-600">Estilo</dt>
                    <dd className="font-medium">{aiInsights.recommendedStyle || selectedStyle}</dd>
                  </div>
                </dl>
              </div>

              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => { setStep(2); setCurrentQuestion(questions.length - 1); }}
                  className="flex-1 bg-gray-300 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-400"
                >
                  ← Voltar às Perguntas
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-lg font-semibold hover:from-purple-700 hover:to-pink-700 disabled:opacity-50"
                >
                  {loading ? 'Criando site personalizado...' : '🧠 Criar Site com IA Personalizada'}
                </button>
              </div>
            </form>
          )}
        </div>
      </main>
    );
  }

  return null;
}
