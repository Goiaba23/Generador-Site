'use client';

interface GrowthModule {
  name: string;
  description?: string;
}

interface GrowthModulesProps {
  modules: string[];
  description: string;
  title?: string;
}

export default function GrowthModulesSection({ modules, description,   title = 'O que seus clientes ganham além do site' }: GrowthModulesProps) {
  return (
    <section className="py-20 px-4 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-4">{title}</h2>
        <p className="text-center text-gray-600 mb-12 text-lg">{description}</p>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {modules.map((module, index) => (
            <div 
              key={index}
              className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all border border-gray-100 hover:border-blue-300 group"
            >
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <span className="text-2xl text-white font-bold">{index + 1}</span>
              </div>
              <h3 className="font-bold text-lg mb-2 text-gray-800">{module}</h3>
              <p className="text-gray-600 text-sm">
                {getModuleDescription(module)}
              </p>
            </div>
          ))}
        </div>

        {/* Revenue Model Explanation */}
        <div className="mt-16 bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl p-8 border border-green-200">
          <div className="flex items-start gap-4">
            <div className="text-4xl">💰</div>
            <div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">Modelo de Receita Recorrente</h3>
              <p className="text-gray-700 mb-4">
                Modelo de receita recorrente para suas agências:
              </p>
              <ul className="space-y-2">
                <li className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Setup para cliente: <strong>R$ 497</strong> (site + configuração + 1º mês)</span>
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Mensalidade por cliente: <strong>R$ 97/mês</strong> (hospedagem + ferramentas)</span>
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Crescimento médio dos clientes: <strong>+200% leads</strong> no primeiro ano</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function getModuleDescription(module: string): string {
  const descriptions: Record<string, string> = {
    'Loyalty Program': 'Fidelidade automática para aumentar retenção',
    'Last-minute slot alerts': 'Preencha horários vazios com alertas automáticos',
    'Review Automation': 'Avaliações automáticas pós-atendimento',
    'QR Table Ordering': 'Pedidos diretos via QR Code na mesa',
    'Google Maps Optimization': 'Apareça no topo das buscas locais',
    'Delivery Integration': 'Integração com iFood, Rappi e outros',
    'Patient Portal': 'Portal do paciente para agendamentos online',
    'Telemedicine': 'Consultas online integradas',
    'Free Trial Automation': 'Aulas experimentais automáticas',
    'Referral Program': 'Programa de indicação para alunos',
    'Abandoned Cart Recovery': 'Recupere carrinhos abandonados automaticamente',
    'Upsell Recommendations': 'Sugestões inteligentes de produtos relacionados',
    'Virtual Tour': 'Tour virtual 360° para imóveis',
     'Lead Scoring': 'Pontuação automática de leads qualificados',
     'API Documentation Portal': 'Portal de documentação para integrações',
  };
  
  for (const [key, value] of Object.entries(descriptions)) {
    if (module.toLowerCase().includes(key.toLowerCase())) {
      return value;
    }
  }
  
    return 'Ferramenta de crescimento inclusa para o cliente';
}
