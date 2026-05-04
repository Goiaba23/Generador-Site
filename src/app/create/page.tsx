'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { BusinessType, TemplateStyle } from '@prisma/client';
import { getAllTemplates, getTemplateByType } from '@/lib/templates';

export default function CreateSitePage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    type: 'RESTAURANT' as keyof typeof BusinessType,
    description: '',
    address: '',
    phone: '',
    email: '',
    style: 'CATALOG' as keyof typeof TemplateStyle,
    diferencial: '',
    targetAudience: '',
    services: '',
    toneOfVoice: 'casual',
  });

  const templates = getAllTemplates();
  const selectedTemplate = getTemplateByType(
    formData.type as any,
    formData.style as any
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Call API to create business and generate site
      const response = await fetch('/api/sites/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          services: formData.services.split(',').map(s => s.trim()).filter(Boolean),
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create site');
      }

      const data = await response.json();
      router.push(`/dashboard/${data.business.slug}`);
    } catch (error) {
      console.error('Error creating site:', error);
      alert('Erro ao criar site. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8 text-center">
          Crie seu site profissional
        </h1>

        {/* Progress indicator */}
        <div className="flex mb-8 justify-center">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  s === step
                    ? 'bg-blue-600 text-white'
                    : s < step
                    ? 'bg-green-500 text-white'
                    : 'bg-gray-300 text-gray-600'
                }`}
              >
                {s < step ? '✓' : s}
              </div>
              {s < 3 && (
                <div
                  className={`w-24 h-1 ${
                    s < step ? 'bg-green-500' : 'bg-gray-300'
                  }`}
                />
              )}
            </div>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-lg p-8">
          {step === 1 && (
            <div>
              <h2 className="text-xl font-semibold mb-6">Informações Básicas</h2>
              
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">
                  Nome do Comércio *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Ex: Hamburgueria do João"
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">
                  Tipo de Comércio *
                </label>
                <select
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value as any })}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="RESTAURANT">Restaurante/Hamburgueria</option>
                  <option value="BARBERSHOP">Barbearia</option>
                  <option value="SALON">Salão de Beleza</option>
                  <option value="GYM">Academia</option>
                  <option value="RETAIL">Loja</option>
                  <option value="CAFE">Café</option>
                  <option value="BAKERY">Padaria</option>
                  <option value="PHARMACY">Farmácia</option>
                  <option value="HOTEL">Hotel</option>
                  <option value="OTHER">Outro</option>
                </select>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">
                  Descrição curta
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  rows={3}
                  placeholder="Ex: Os melhores hambúrgueres da cidade com ingredientes frescos"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
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

              <div className="mb-6">
                <label className="block text-sm font-medium mb-2">Email</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg"
                  placeholder="contato@exemplo.com"
                />
              </div>

              <button
                type="button"
                onClick={() => setStep(2)}
                className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
              >
                Próximo: Escolher Template
              </button>
            </div>
          )}

          {step === 2 && (
            <div>
              <h2 className="text-xl font-semibold mb-6">Escolha o Estilo do Site</h2>
              
              <div className="mb-6">
                <label className="block text-sm font-medium mb-2">Estilo do Site</label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {['CATALOG', 'BOOKING', 'PORTFOLIO', 'LANDING', 'ECOMMERCE', 'BLOG'].map((style) => (
                    <div
                      key={style}
                      onClick={() => setFormData({ ...formData, style: style as any })}
                      className={`border rounded-lg p-4 cursor-pointer transition ${
                        formData.style === style
                          ? 'border-blue-600 bg-blue-50'
                          : 'hover:border-gray-400'
                      }`}
                    >
                      <p className="font-semibold">
                        {style === 'CATALOG' ? 'Cardápio/Cardápio' :
                         style === 'BOOKING' ? 'Agendamento' :
                         style === 'PORTFOLIO' ? 'Portfólio' :
                         style === 'LANDING' ? 'Landing Page' :
                         style === 'ECOMMERCE' ? 'Loja Online' : 'Blog'}
                      </p>
                      <p className="text-sm text-gray-600 mt-1">
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

              <div className="mb-6">
                <label className="block text-sm font-medium mb-2">
                  O que diferencia seu negócio? (opcional)
                </label>
                <textarea
                  value={formData.diferencial}
                  onChange={(e) => setFormData({ ...formData, diferencial: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg"
                  rows={2}
                  placeholder="Ex: Usamos ingredientes orgânicos e carnes premium"
                />
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium mb-2">
                  Público-alvo (opcional)
                </label>
                <input
                  type="text"
                  value={formData.targetAudience}
                  onChange={(e) => setFormData({ ...formData, targetAudience: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg"
                  placeholder="Ex: Jovens adultos, famílias"
                />
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium mb-2">
                  Serviços/Produtos (separados por vírgula)
                </label>
                <input
                  type="text"
                  value={formData.services}
                  onChange={(e) => setFormData({ ...formData, services: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg"
                  placeholder="Ex: Hambúrguer clássico, Bacon burger, Milk shake"
                />
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium mb-2">Tom de Voz</label>
                <select
                  value={formData.toneOfVoice}
                  onChange={(e) => setFormData({ ...formData, toneOfVoice: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg"
                >
                  <option value="casual">Casual e descontraído</option>
                  <option value="formal">Formal e profissional</option>
                  <option value="fun">Divertido e energético</option>
                  <option value="luxury">Luxuoso e elegante</option>
                </select>
              </div>

              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="flex-1 bg-gray-300 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-400 transition"
                >
                  Voltar
                </button>
                <button
                  type="button"
                  onClick={() => setStep(3)}
                  className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
                >
                  Próximo: Revisar
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
                    <dd className="font-medium">{formData.style}</dd>
                  </div>
                  <div>
                    <dt className="text-sm text-gray-600">Tom de Voz</dt>
                    <dd className="font-medium">{formData.toneOfVoice}</dd>
                  </div>
                  {formData.description && (
                    <div className="md:col-span-2">
                      <dt className="text-sm text-gray-600">Descrição</dt>
                      <dd className="font-medium">{formData.description}</dd>
                    </div>
                  )}
                </dl>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                <p className="text-sm text-blue-800">
                  <strong>✨ IA vai gerar seu site:</strong> Com base nas informações fornecidas, 
                  nossa IA criará um site personalizado com textos otimizados para SEO e design atrativo.
                </p>
              </div>

              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="flex-1 bg-gray-300 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-400 transition"
                >
                  Voltar
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition disabled:opacity-50"
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
