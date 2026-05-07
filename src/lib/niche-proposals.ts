export function getNicheProposalLocal(businessType: string): any {
  const proposals: Record<string, any> = {
    barbershop: {
      painPoint: 'Dificuldade em gerenciar agendamentos e mostrar portfólio de cortes.',
      solution: 'Sistema de agendamento online 24/7 integrado com galeria visual de alta conversão.',
      expectedOutcome: 'Aumento de 40% na recorrência de clientes e redução de 90% em faltas.',
      growthModules: ['Agendamento Automático', 'Cartão Fidelidade Digital', 'Galeria de Estilos']
    },
    clinic: {
      painPoint: 'Processo de marcação de consultas lento e falta de autoridade digital.',
      solution: 'Plataforma médica premium com agendamento inteligente e depoimentos estruturados.',
      expectedOutcome: 'Dobro de conversões em leads qualificados e maior percepção de autoridade.',
      growthModules: ['Prontuário Digital', 'Agendamento por Convênio', 'Blog de Saúde']
    },
    saas_agency: {
      painPoint: 'Dificuldade em explicar o valor do produto e converter visitantes em trial.',
      solution: 'Site estilo Bento Grid com animações GSAP que demonstram o fluxo do software.',
      expectedOutcome: 'Redução do CAC em 30% e aumento da taxa de trial para pago.',
      growthModules: ['Dashboard Preview', 'Integração Stripe', 'API Documentation']
    },
    restaurant: {
      painPoint: 'Cardápios PDF difíceis de ler e falta de sistema de reservas próprio.',
      solution: 'Menu digital interativo otimizado para mobile com sistema de reserva direto.',
      expectedOutcome: 'Aumento do ticket médio e independência de plataformas de delivery.',
      growthModules: ['Menu Digital QR Code', 'Reservas de Mesa', 'Pedidos Online']
    },
    gym: {
      painPoint: 'Falta de engajamento dos alunos e dificuldade em vender planos online.',
      solution: 'Site dinâmico com planos claros, horários de aulas e integração com CRM.',
      expectedOutcome: 'Maior retenção de alunos e vendas automatizadas 24h.',
      growthModules: ['Cronograma de Aulas', 'Loja de Suplementos', 'Área do Aluno']
    }
  };

  return proposals[businessType.toLowerCase()] || proposals.barbershop;
}
