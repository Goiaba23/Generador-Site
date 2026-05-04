// Ultimate Create Page v3.0
// Features: Objective selection → Image upload → Research-based design preview

'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { BusinessType } from '@prisma/client';
import { generateUltimateTemplate, UltimateTemplateConfig, ImageSlot } from '@/lib/templates-v4-ultimate';

export default function CreateUltimatePage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [businessType, setBusinessType] = useState<BusinessType | ''>('');
  const [objective, setObjective] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [template, setTemplate] = useState<UltimateTemplateConfig | null>(null);
  const [uploadedImages, setUploadedImages] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  const objectives = [
    { value: 'get_bookings', label: 'Agendamentos Online', icon: '📅', desc: 'Sistema de reservas, calendário, confirmação' },
    { value: 'sell_online', label: 'Vendas Online', icon: '🛒', desc: 'Loja virtual, carrinho, pagamentos' },
    { value: 'increase_visibility', label: 'Visibilidade', icon: '👁️', desc: 'SEO, Google Maps, redes sociais' },
    { value: 'generate_leads', label: 'Captar Leads', icon: '📋', desc: 'Formulários, WhatsApp, newsletter' },
    { value: 'showcase_portfolio', label: 'Portfólio', icon: '🖼️', desc: 'Galeria de fotos, trabalhos, depoimentos' },
  ];

  const handleBusinessTypeSelect = (type: BusinessType) => {
    setBusinessType(type);
    setStep(2);
  };

  const handleObjectiveSelect = (obj: string) => {
    setObjective(obj);
    const tmpl = generateUltimateTemplate(businessType as BusinessType, obj);
    setTemplate(tmpl);
    setStep(3);
  };

  const handleImageUpload = (slotId: string, file: File) => {
    // In real app, upload to storage (Vercel Blob, AWS S3, etc.)
    const reader = new FileReader();
    reader.onloadend = () => {
      setUploadedImages(prev => ({ ...prev, [slotId]: reader.result as string }));
    };
    reader.readAsDataURL(file);
  };

  const handleCreateSite = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/sites/ultimate-create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          businessName,
          businessType,
          objective,
          images: uploadedImages,
          templateId: template?.id,
        }),
      });

      const data = await response.json();
      if (data.siteId) {
        router.push(`/preview/${data.siteId}`);
      }
    } catch (error) {
      console.error('Error creating site:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Progress Bar */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            {[1, 2, 3, 4].map((s) => (
              <div key={s} className={`flex items-center ${s < 4 ? 'flex-1' : ''}`}>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold
                  ${step >= s ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'}`}>
                  {s}
                </div>
                {s < 4 && <div className={`flex-1 h-1 ${step > s ? 'bg-blue-600' : 'bg-gray-200'}`} />}
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-2 text-sm">
            <span className={step >= 1 ? 'text-blue-600 font-semibold' : 'text-gray-400'}>Tipo</span>
            <span className={step >= 2 ? 'text-blue-600 font-semibold' : 'text-gray-400'}>Objetivo</span>
            <span className={step >= 3 ? 'text-blue-600 font-semibold' : 'text-gray-400'}>Imagens</span>
            <span className={step >= 4 ? 'text-blue-600 font-semibold' : 'text-gray-400'}>Criar</span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Step 1: Business Type */}
        {step === 1 && (
          <div>
            <h1 className="text-3xl font-bold mb-2">Qual é o seu comércio?</h1>
            <p className="text-gray-600 mb-8">Selecione o tipo do seu negócio para um template personalizado</p>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {Object.values(BusinessType).map((type) => (
                <button
                  key={type}
                  onClick={() => handleBusinessTypeSelect(type)}
                  className="p-4 border-2 border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition"
                >
                  <div className="text-3xl mb-2">
                    {type === 'RESTAURANT' ? '🍔' : type === 'BARBERSHOP' ? '✂️' : type === 'PHARMACY' ? '💊' : '🏪'}
                  </div>
                  <div className="text-sm font-semibold">{type}</div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 2: Objective */}
        {step === 2 && (
          <div>
            <button onClick={() => setStep(1)} className="text-blue-600 mb-4">← Voltar</button>
            <h1 className="text-3xl font-bold mb-2">Qual é o seu objetivo?</h1>
            <p className="text-gray-600 mb-8">Isso define as funcionalidades do seu site</p>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {objectives.map((obj) => (
                <button
                  key={obj.value}
                  onClick={() => handleObjectiveSelect(obj.value)}
                  className="p-6 border-2 border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 text-left transition"
                >
                  <div className="text-3xl mb-2">{obj.icon}</div>
                  <div className="font-bold text-lg mb-1">{obj.label}</div>
                  <div className="text-sm text-gray-600">{obj.desc}</div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 3: Image Upload */}
        {step === 3 && template && (
          <div>
            <button onClick={() => setStep(2)} className="text-blue-600 mb-4">← Voltar</button>
            <h1 className="text-3xl font-bold mb-2">Adicione suas imagens</h1>
            <p className="text-gray-600 mb-4">
              Template: <strong>{template.name}</strong> | Design: <strong>{template.designTheme.name}</strong>
            </p>
            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-8">
              <p className="text-sm">
                <strong>Pesquisa de Design:</strong> {template.designTheme.researchBasedOn}
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {template.imageSlots.map((slot: ImageSlot) => (
                <div key={slot.id} className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <div className="text-4xl mb-2">📷</div>
                  <h3 className="font-bold mb-1">{slot.label}</h3>
                  <p className="text-sm text-gray-600 mb-2">{slot.description}</p>
                  <p className="text-xs text-gray-500 mb-4">Tamanho recomendado: {slot.recommendedSize}</p>
                  {uploadedImages[slot.id] ? (
                    <div>
                      <img src={uploadedImages[slot.id]} alt={slot.label} className="w-full h-40 object-cover rounded mb-2" />
                      <button onClick={() => setUploadedImages(prev => { const next = { ...prev }; delete next[slot.id]; return next; })} className="text-red-600 text-sm">
                        Remover
                      </button>
                    </div>
                  ) : (
                    <label className="cursor-pointer bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                      Escolher Imagem
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => e.target.files?.[0] && handleImageUpload(slot.id, e.target.files[0])}
                      />
                    </label>
                  )}
                  {slot.required && <span className="text-red-600 text-xs">* Obrigatório</span>}
                </div>
              ))}
            </div>

            <div className="mt-8 flex justify-between items-center">
              <div className="text-sm text-gray-600">
                {Object.keys(uploadedImages).length} de {template.imageSlots.filter(s => s.required).length} imagens obrigatórias enviadas
              </div>
              <button
                onClick={() => setStep(4)}
                disabled={template.imageSlots.filter(s => s.required).some(s => !uploadedImages[s.id])}
                className="bg-blue-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-blue-700 disabled:bg-gray-300"
              >
                Continuar →
              </button>
            </div>
          </div>
        )}

        {/* Step 4: Review & Create */}
        {step === 4 && template && (
          <div>
            <button onClick={() => setStep(3)} className="text-blue-600 mb-4">← Voltar</button>
            <h1 className="text-3xl font-bold mb-2">Quase pronto!</h1>
            <p className="text-gray-600 mb-8">Revise e crie seu site</p>

            <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
              <h2 className="font-bold text-xl mb-4">Resumo</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Nome do Negócio</p>
                  <input
                    type="text"
                    value={businessName}
                    onChange={(e) => setBusinessName(e.target.value)}
                    placeholder="Digite o nome..."
                    className="w-full p-2 border rounded mt-1"
                  />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Tipo</p>
                  <p className="font-bold">{businessType}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Objetivo</p>
                  <p className="font-bold">{objective}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Design</p>
                  <p className="font-bold">{template.designTheme.name}</p>
                </div>
              </div>

              <div className="mt-6">
                <p className="font-bold mb-2">Funcionalidades Ativas:</p>
                <div className="flex flex-wrap gap-2">
                  {template.features.filter(f => f.enabled).map(f => (
                    <span key={f.id} className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                      ✓ {f.name}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-6">
                <p className="font-bold mb-2">Imagens Enviadas:</p>
                <div className="grid grid-cols-4 gap-2">
                  {Object.entries(uploadedImages).map(([id, url]) => (
                    <img key={id} src={url} alt={id} className="w-full h-20 object-cover rounded" />
                  ))}
                </div>
              </div>
            </div>

            <button
              onClick={handleCreateSite}
              disabled={loading || !businessName}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 rounded-lg font-bold text-lg hover:opacity-90 disabled:bg-gray-300"
            >
              {loading ? 'Criando Site Mágico...' : '🚀 Criar Meu Site Agora!'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
