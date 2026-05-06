'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { getAnimationsForNiche } from '@/lib/animations';
import { getComponentsForNiche } from '@/lib/21dev-components';
import { generateLogoInspiration } from '@/lib/uxshowcase-logos';

// ===== TYPE DEFINITIONS =====

interface BusinessOption {
  type: string;
  label: string;
  icon: string;
  category: string;
}

interface PainOption {
  id: string;
  label: string;
}

interface SolutionOption {
  id: string;
  label: string;
  description: string;
  icon: string;
}

interface StyleOption {
  style: string;
  label: string;
  image: string;
  description: string;
}

// ===== CATALOG DATA =====

const businessCatalog: BusinessOption[] = [
  // Alimentacao
  { type: 'RESTAURANT', label: 'Restaurante', icon: '🍽️', category: 'Alimentacao' },
  { type: 'BURGER_JOINT', label: 'Hamburgueria', icon: '🍔', category: 'Alimentacao' },
  { type: 'PIZZERIA', label: 'Pizzaria', icon: '🍕', category: 'Alimentacao' },
  { type: 'COFFEE_SHOP', label: 'Cafeteria', icon: '☕', category: 'Alimentacao' },
  { type: 'BAR', label: 'Bar/Pub', icon: '🍺', category: 'Alimentacao' },
  { type: 'BAKERY', label: 'Padaria', icon: '🥖', category: 'Alimentacao' },
  { type: 'ICE_CREAM', label: 'Sorveteria', icon: '🍦', category: 'Alimentacao' },
  { type: 'SUSHI', label: 'Sushi/Japones', icon: '🍣', category: 'Alimentacao' },
  { type: 'PASTRY_SHOP', label: 'Pastelaria', icon: '🥟', category: 'Alimentacao' },
  { type: 'BUTCHER', label: 'Acougue', icon: '🥩', category: 'Alimentacao' },
  { type: 'FOOD_TRUCK', label: 'Food Truck', icon: '🚐', category: 'Alimentacao' },
  { type: 'VEGAN_REST', label: 'Restaurante Vegano', icon: '🥗', category: 'Alimentacao' },
  { type: 'STEAKHOUSE', label: 'Churrascaria', icon: '🍖', category: 'Alimentacao' },
  { type: 'BREWERY', label: 'Cervejaria Artesanal', icon: '🍻', category: 'Alimentacao' },

  // Beleza & Bem-estar
  { type: 'SALON', label: 'Salao de Beleza', icon: '💇', category: 'Beleza' },
  { type: 'BARBERSHOP', label: 'Barbearia', icon: '💈', category: 'Beleza' },
  { type: 'SPA', label: 'SPA/Massagem', icon: '💆', category: 'Beleza' },
  { type: 'NAIL_SALON', label: 'Esmalteria', icon: '💅', category: 'Beleza' },
  { type: 'AESTHETICS', label: 'Clinica de Estetica', icon: '✨', category: 'Beleza' },
  { type: 'TATTOO_STUDIO', label: 'Estudio de Tatuagem', icon: '🖋️', category: 'Beleza' },
  { type: 'MAKEUP_ARTIST', label: 'Maquiador(a)', icon: '💄', category: 'Beleza' },

  // Saude
  { type: 'CLINIC', label: 'Clinica Medica', icon: '🏥', category: 'Saude' },
  { type: 'DENTIST', label: 'Dentista', icon: '🦷', category: 'Saude' },
  { type: 'PSYCHOLOGIST', label: 'Psicologo', icon: '🧠', category: 'Saude' },
  { type: 'PHYSIOTHERAPY', label: 'Fisioterapia', icon: '🦴', category: 'Saude' },
  { type: 'NUTRITIONIST', label: 'Nutricionista', icon: '🍎', category: 'Saude' },
  { type: 'PEDIATRICIAN', label: 'Pediatra', icon: '👶', category: 'Saude' },
  { type: 'VETERINARY', label: 'Clinica Veterinaria', icon: '🐕', category: 'Saude' },
  { type: 'PODIATRIST', label: 'Podologia', icon: '🦶', category: 'Saude' },

  // Automotivo
  { type: 'MECHANIC', label: 'Oficina Mecanica', icon: '🔧', category: 'Automotivo' },
  { type: 'CAR_WASH', label: 'Lava Rapido', icon: '🧽', category: 'Automotivo' },
  { type: 'AUTO_PARTS', label: 'Auto Pecas', icon: '⚙️', category: 'Automotivo' },
  { type: 'CAR_AESTHETICS', label: 'Estetica Automotiva', icon: '🏎️', category: 'Automotivo' },
  { type: 'TIRE_SHOP', label: 'Borracharia', icon: '🛞', category: 'Automotivo' },
  { type: 'DEALERSHIP', label: 'Concessionaria', icon: '🚗', category: 'Automotivo' },

  // Fitness
  { type: 'GYM', label: 'Academia', icon: '💪', category: 'Fitness' },
  { type: 'PERSONAL_TRAINER', label: 'Personal Trainer', icon: '🏋️', category: 'Fitness' },
  { type: 'YOGA_STUDIO', label: 'Studio de Yoga', icon: '🧘', category: 'Fitness' },
  { type: 'CROSSFIT', label: 'Box de Crossfit', icon: '🏃', category: 'Fitness' },
  { type: 'MARTIAL_ARTS', label: 'Artes Marciais', icon: '🥋', category: 'Fitness' },
  { type: 'PILATES', label: 'Studio de Pilates', icon: '🤸', category: 'Fitness' },

  // Servicos Manuais e Casa
  { type: 'PLUMBING', label: 'Encanador', icon: '🪠', category: 'Servicos' },
  { type: 'ELECTRICIAN', label: 'Eletricista', icon: '⚡', category: 'Servicos' },
  { type: 'CLEANING', label: 'Limpeza', icon: '🧹', category: 'Servicos' },
  { type: 'PAINTER', label: 'Pintor', icon: '🎨', category: 'Servicos' },
  { type: 'CARPENTER', label: 'Marceneiro', icon: '🪚', category: 'Servicos' },
  { type: 'LOCKSMITH', label: 'Chaveiro', icon: '🔑', category: 'Servicos' },
  { type: 'HANDYMAN', label: 'Marido de Aluguel', icon: '🛠️', category: 'Servicos' },
  { type: 'LANDSCAPING', label: 'Paisagismo/Jardinagem', icon: '🌿', category: 'Servicos' },

  // Profissionais Liberais
  { type: 'LAWYER', label: 'Advogado', icon: '⚖️', category: 'Servicos Profissionais' },
  { type: 'ARCHITECT', label: 'Arquiteto', icon: '🏗️', category: 'Servicos Profissionais' },
  { type: 'ENGINEER', label: 'Engenheiro', icon: '⚙️', category: 'Servicos Profissionais' },
  { type: 'ACCOUNTANT', label: 'Contador', icon: '🧮', category: 'Servicos Profissionais' },
  { type: 'CONSULTANT', label: 'Consultor', icon: '💼', category: 'Servicos Profissionais' },
  { type: 'REALTOR', label: 'Corretor de Imoveis', icon: '🏠️', category: 'Servicos Profissionais' },
  { type: 'PHOTOGRAPHER', label: 'Fotografo', icon: '📸', category: 'Servicos Profissionais' },
  { type: 'EVENT_PLANNER', label: 'Cerimonialista', icon: '🎊', category: 'Servicos Profissionais' },
  { type: 'PERSONAL_CHEF', label: 'Chef Particular', icon: '👨‍🍳', category: 'Servicos Profissionais' },
  { type: 'PERSONAL_SHOPPER', label: 'Personal Shopper', icon: '🛍️', category: 'Servicos Profissionais' },
  { type: 'LANGUAGE_TEACHER', label: 'Professor de Idiomas', icon: '🗣️', category: 'Servicos Profissionais' },
  { type: 'MUSIC_TEACHER', label: 'Professor de Musica', icon: '🎵', category: 'Servicos Profissionais' },
  { type: 'DRIVING_INSTRUCTOR', label: 'Instrutor de Direcao', icon: '🚘', category: 'Servicos Profissionais' },

  // Educacao
  { type: 'SCHOOL', label: 'Escola/Curso', icon: '🏫', category: 'Educacao' },
  { type: 'DAYCARE', label: 'Creche', icon: '👶', category: 'Educacao' },
  { type: 'TUTORING', label: 'Aula Particular', icon: '📚', category: 'Educacao' },
  { type: 'LANGUAGE_SCHOOL', label: 'Escola de Idiomas', icon: '🗣️', category: 'Educacao' },

  // Pets
  { type: 'VET_CLINIC', label: 'Clinica Veterinaria', icon: '🐕', category: 'Pets' },
  { type: 'PET_GROOMING', label: 'Tosquia/Pet Shop', icon: '✂️', category: 'Pets' },
  { type: 'PET_SITTER', label: 'Pet Sitter', icon: '🏠️', category: 'Pets' },
  { type: 'DOG_TRAINER', label: 'Adestrador', icon: '🦮', category: 'Pets' },

  // Tecnologia
  { type: 'IT_SUPPORT', label: 'Suporte TI', icon: '💻', category: 'Tecnologia' },
  { type: 'WEB_DEV', label: 'Desenvolvimento Web', icon: '🌐', category: 'Tecnologia' },
  { type: 'APP_DEV', label: 'Desenvolvimento App', icon: '📱', category: 'Tecnologia' },
  { type: 'DIGITAL_MARKETING', label: 'Marketing Digital', icon: '📈', category: 'Tecnologia' },
  { type: 'SOFTWARE_HOUSE', label: 'Software House', icon: '🏢', category: 'Tecnologia' },

  // Entretenimento e Lazer
  { type: 'PARTY_SUPPLIES', label: 'Aluguel para Festas', icon: '🎉', category: 'Lazer' },
  { type: 'PHOTO_VIDEO', label: 'Foto e Video', icon: '📷', category: 'Lazer' },
  { type: 'MUSIC_BAND', label: 'Banda Musical', icon: '🎸', category: 'Lazer' },
  { type: 'DJ', label: 'DJ', icon: '🎧', category: 'Lazer' },
  { type: 'TOUR_GUIDE', label: 'Guia Turistico', icon: '🗺️', category: 'Lazer' },
  { type: 'TRAVEL_AGENCY', label: 'Agencia de Viagens', icon: '✈️', category: 'Lazer' },

  // Bebes e Criancas
  { type: 'DAYCARE_CENTER', label: 'Creche/Berçario', icon: '👶', category: 'Bebes' },
  { type: 'KIDS_PARTY', label: 'Festa Infantil', icon: '🎈', category: 'Bebes' },
  { type: 'TOY_STORE', label: 'Loja de Brinquedos', icon: '🧸', category: 'Bebes' },
  { type: 'BABY_SITTER', label: 'Baba', icon: '👩‍🍼', category: 'Bebes' },

  // Outros
  { type: 'MOVING', label: 'Mudancas', icon: '📦', category: 'Outros' },
  { type: 'STORAGE', label: 'Guarda-Volumes', icon: '📫', category: 'Outros' },
  { type: 'DRY_CLEANING', label: 'Lavanderia', icon: '👔', category: 'Outros' },
  { type: 'TAXI', label: 'Taxi/Motorista', icon: '🚕', category: 'Outros' },
  { type: 'CLEANING_POOL', label: 'Limpeza de Piscina', icon: '🏊', category: 'Outros' },
  { type: 'PEST_CONTROL', label: 'Controle de Pragas', icon: '🐭', category: 'Outros' },
  { type: 'HOME_SECURITY', label: 'Seguranca Residencial', icon: '🔒', category: 'Outros' },
  { type: 'SOLAR_PANELS', label: 'Energia Solar', icon: '☀️', category: 'Outros' },
  { type: 'TATTOO_REMOVAL', label: 'Remocao de Tatuagem', icon: '🖋️', category: 'Outros' },
  { type: 'CEMETERY', label: 'Funeraria', icon: '⚰️', category: 'Outros' },
  { type: 'CHURCH', label: 'Igreja/Templo', icon: '⛪', category: 'Outros' },
  { type: 'GYMNASTICS', label: 'Ginastica', icon: '🤸', category: 'Fitness' },
  { type: 'SWIMMING', label: 'Natacao', icon: '🏊', category: 'Fitness' },
  { type: 'DANCE', label: 'Danca', icon: '💃', category: 'Fitness' },
  { type: 'INTERIOR_DESIGN', label: 'Design de Interiores', icon: '🛋️', category: 'Servicos Profissionais' },
  { type: 'MASSAGE', label: 'Massagem', icon: '💆', category: 'Beleza' },
  { type: 'THERAPIST', label: 'Terapeuta', icon: '🧠', category: 'Saude' },
  { type: 'SPEECH_THERAPY', label: 'Fonoaudiologo', icon: '🗣️', category: 'Saude' },
  { type: 'OCUPATIONAL_THERAPY', label: 'Terapia Ocupacional', icon: '🧠', category: 'Saude' },
  { type: 'PHYSICAL_EDUCATION', label: 'Educacao Fisica', icon: '🏋️', category: 'Educacao' },
  { type: 'BAKERY_CAFE', label: 'Cafeteria e Padaria', icon: '☕', category: 'Alimentacao' },
  { type: 'MOBILE_FOOD', label: 'Comida de Rua', icon: '🍕', category: 'Alimentacao' },
  { type: 'CATERING', label: 'Servico de Buffet', icon: '🍽️', category: 'Alimentacao' },
  { type: 'DELIVERY', label: 'Entrega/Delivery', icon: '🛵', category: 'Alimentacao' },
  { type: 'CAR_RENTAL', label: 'Locadora de Veiculos', icon: '🚗', category: 'Automotivo' },
  { type: 'DRIVING_SCHOOL', label: 'Auto Escola', icon: '🚘', category: 'Automotivo' },
  { type: 'BIKE_REPAIR', label: 'Oficina de Bicicletas', icon: '🚲', category: 'Automotivo' },
  { type: 'TRUCK_REPAIR', label: 'Oficina de Caminhoes', icon: '🚛', category: 'Automotivo' },
  { type: 'CAR_DETAILING', label: 'Lavagem Detalhada', icon: '🧽', category: 'Automotivo' },
  { type: 'WINDOW_CLEANING', label: 'Limpeza de Vidros', icon: '🪟', category: 'Servicos' },
  { type: 'ROOFING', label: 'Telhado', icon: '🏠️', category: 'Servicos' },
  { type: 'FENCING', label: 'Cercas', icon: '🏡', category: 'Servicos' },
  { type: 'GUTTER_CLEANING', label: 'Limpeza de Calhas', icon: '🌧️', category: 'Servicos' },
  { type: 'PEST_CONTROL', label: 'Controle de Pragas', icon: '🐭', category: 'Servicos' },
  { type: 'HOME_SECURITY', label: 'Seguranca Residencial', icon: '🔒', category: 'Servicos' },
  { type: 'SOLAR_PANELS', label: 'Energia Solar', icon: '☀️', category: 'Servicos' },
  { type: 'TATTOO_REMOVAL', label: 'Remocao de Tatuagem', icon: '🖋️', category: 'Beleza' },
  { type: 'CEMETERY', label: 'Funeraria', icon: '⚰️', category: 'Servicos' },
  { type: 'CHURCH', label: 'Igreja/Templo', icon: '⛪', category: 'Servicos' },
  { type: 'GYMNASTICS', label: 'Ginastica', icon: '🤸', category: 'Fitness' },
  { type: 'SWIMMING', label: 'Natacao', icon: '🏊', category: 'Fitness' },
  { type: 'DANCE', label: 'Danca', icon: '💃', category: 'Fitness' },
  { type: 'INTERIOR_DESIGN', label: 'Design de Interiores', icon: '🛋️', category: 'Servicos Profissionais' },
  { type: 'MASSAGE', label: 'Massagem', icon: '💆', category: 'Beleza' },
  { type: 'THERAPIST', label: 'Terapeuta', icon: '🧠', category: 'Saude' },
  { type: 'SPEECH_THERAPY', label: 'Fonoaudiologo', icon: '🗣️', category: 'Saude' },
  { type: 'OCUPATIONAL_THERAPY', label: 'Terapia Ocupacional', icon: '🧠', category: 'Saude' },
  { type: 'PHYSICAL_EDUCATION', label: 'Educacao Fisica', icon: '🏋️', category: 'Educacao' },
  { type: 'BAKERY_CAFE', label: 'Cafeteria e Padaria', icon: '☕', category: 'Alimentacao' },
  { type: 'MOBILE_FOOD', label: 'Comida de Rua', icon: '🍕', category: 'Alimentacao' },
  { type: 'CATERING', label: 'Servico de Buffet', icon: '🍽️', category: 'Alimentacao' },
  { type: 'DELIVERY', label: 'Entrega/Delivery', icon: '🛵', category: 'Alimentacao' },
  { type: 'CAR_RENTAL', label: 'Locadora de Veiculos', icon: '🚗', category: 'Automotivo' },
  { type: 'DRIVING_SCHOOL', label: 'Auto Escola', icon: '🚘', category: 'Automotivo' },
  { type: 'BIKE_REPAIR', label: 'Oficina de Bicicletas', icon: '🚲', category: 'Automotivo' },
  { type: 'TRUCK_REPAIR', label: 'Oficina de Caminhoes', icon: '🚛', category: 'Automotivo' },
  { type: 'CAR_DETAILING', label: 'Lavagem Detalhada', icon: '🧽', category: 'Automotivo' },
  { type: 'WINDOW_CLEANING', label: 'Limpeza de Vidros', icon: '🪟', category: 'Servicos' },
  { type: 'ROOFING', label: 'Telhado', icon: '🏠️', category: 'Servicos' },
  { type: 'FENCING', label: 'Cercas', icon: '🏡', category: 'Servicos' },
  { type: 'GUTTER_CLEANING', label: 'Limpeza de Calhas', icon: '🌧️', category: 'Servicos' },
];

const painOptions = {
  default: [
    { id: 'visibility', label: 'Pouca visibilidade online' },
    { id: 'old_design', label: 'Site antigo/feio' },
    { id: 'mobile_issues', label: 'Nao funciona no celular' },
    { id: 'no_sales', label: 'Nao gera vendas' },
    { id: 'slow_site', label: 'Site lento' },
  ],
  food: [
    { id: 'delivery', label: 'Precisam de delivery eficiente' },
    { id: 'menu', label: 'Cardapio dificil de achar' },
    { id: 'reservation', label: 'Reservas complicadas' },
    { id: 'photos', label: 'Fotos dos pratos ruins' },
    { id: 'reviews', label: 'Avaliacoes negativas' },
  ],
  beauty: [
    { id: 'booking', label: 'Agendamento confuso' },
    { id: 'portfolio', label: 'Portfolio nao mostra trabalhos' },
    { id: 'pricing', label: 'Precos nao visiveis' },
    { id: 'location', label: 'Dificil de achar local' },
    { id: 'hours', label: 'Horarios confusos' },
  ],
  health: [
    { id: 'appointments', label: 'Agendamento dificil' },
    { id: 'info', label: 'Informacoes medicas vagas' },
    { id: 'insurance', label: 'Nao mostra convenios' },
    { id: 'emergency', label: 'Nao passa urgencia' },
    { id: 'reviews', label: 'Avaliacoes negativas' },
  ],
};

const solutionOptions: SolutionOption[] = [
  { id: 'modern-site', label: 'Site Moderno Premium', description: 'Design de $10K+ com animacoes', icon: '🎨' },
  { id: 'booking-system', label: 'Sistema de Agendamento', description: 'Agenda online integrada', icon: '📅' },
  { id: 'ecommerce', label: 'Loja Virtual', description: 'Venda produtos e servicos', icon: '🛒' },
  { id: 'seo-optimization', label: 'SEO Otimizado', description: 'Apareca no Google', icon: '🔍' },
  { id: 'mobile-app', label: 'App Mobile', description: 'Aplicativo personalizado', icon: '📱' },
  { id: 'delivery-system', label: 'Sistema Delivery', description: 'Gestao de pedidos', icon: '🛵' },
  { id: 'crm', label: 'CRM Integracao', description: 'Gestao de clientes', icon: '👥' },
  { id: 'analytics', label: 'Analytics Dashboard', description: 'Relatorios de performance', icon: '📊' },
  { id: 'ai-chatbot', label: 'Chatbot IA', description: 'Atendimento 24/7', icon: '🤖' },
  { id: 'membership', label: 'Area de Membros', description: 'Conteudo exclusivo', icon: '🔐' },
  { id: 'courses', label: 'Plataforma de Cursos', description: 'Venda online', icon: '🎓' },
  { id: 'portfolio', label: 'Portfolio Premium', description: 'Showcase profissional', icon: '🖼️' },
  { id: 'reviews', label: 'Gestao de Avaliacoes', description: 'Reputacao online', icon: '⭐' },
  { id: 'multi-language', label: 'Multi-idiomas', description: 'Traducao automatica', icon: '🌐' },
  { id: 'payments', label: 'Gateway de Pagamento', description: 'Pix, cartao, boleto', icon: '💳' },
  { id: 'inventory', label: 'Gestao de Estoque', description: 'Controle de produtos', icon: '📦' },
  { id: 'blog', label: 'Blog Premium', description: 'Conteudo de autoridade', icon: '📝' },
  { id: 'social-media', label: 'Integracao Redes Sociais', description: 'Feed automatico', icon: '📸' },
  { id: 'email-marketing', label: 'Email Marketing', description: 'Newsletters automaticas', icon: '📧' },
  { id: 'whatsapp', label: 'WhatsApp Business', description: 'Integracao direta', icon: '💬' },
  { id: 'loyalty', label: 'Programa de Fidelidade', description: 'Pontos e recompensas', icon: '🎁' },
  { id: 'virtual-tour', label: 'Tour Virtual 360°', description: 'Imersao completa', icon: '🏛️' },
  { id: 'qr-code', label: 'QR Code Menu', description: 'Cardapio digital', icon: '📱' },
  { id: 'digital-menu', label: 'Cardapio Digital', description: 'Atualizacao em tempo real', icon: '🍽️' },
  { id: 'reservation', label: 'Sistema de Reservas', description: 'Mesa e eventos', icon: '🍽️' },
  { id: 'events', label: 'Gestao de Eventos', description: 'Ingressos e RSVP', icon: '🎫' },
  { id: 'rentals', label: 'Aluguel de Equipamentos', description: 'Reserva de itens', icon: '🎪' },
  { id: 'classes', label: 'Agendamento de Aulas', description: 'Horarios e pacotes', icon: '🎓' },
  { id: 'donations', label: 'Doacoes Online', description: 'Pix e cartao', icon: '❤️' },
  { id: 'subscriptions', label: 'Assinaturas', description: 'Recorrencia', icon: '🔄' },
  { id: 'affiliates', label: 'Programa de Afiliados', description: 'Comissoes', icon: '🤝' },
  { id: 'marketplace', label: 'Marketplace', description: 'Varios vendedores', icon: '🏪' },
  { id: 'auctions', label: 'Leiloes Online', description: 'Lances em tempo real', icon: '🔨' },
  { id: 'crowdfunding', label: 'Crowdfunding', description: 'Financiamento coletivo', icon: '💰' },
  { id: 'job-board', label: 'Board de Vagas', description: 'Recrutamento', icon: '💼' },
  { id: 'real-estate', label: 'Imobiliaria Virtual', description: 'Tour e compra', icon: '🏠️' },
  { id: 'automotive-service', label: 'Gestao Automotiva', description: 'Ordem de servico', icon: '🚗' },
  { id: 'pet-service', label: 'Gestao Pet', description: 'Prontuario e agendamento', icon: '🐕' },
  { id: 'fitness-tracking', label: 'Acompanhamento Fitness', description: 'Metas e progresso', icon: '💪' },
  { id: 'meal-plans', label: 'Planos Alimentares', description: 'Nutricao personalizada', icon: '🥗' },
  { id: 'telemedicine', label: 'Telemedicina', description: 'Consultas online', icon: '💻' },
  { id: 'elearning', label: 'E-learning Platform', description: 'Cursos e certificados', icon: '🎓' },
  { id: 'webinars', label: 'Webinars e Lives', description: 'Transmissao ao vivo', icon: '📹' },
  { id: 'podcast', label: 'Podcast Studio', description: 'Audio episodios', icon: '🎙️' },
  { id: 'live-streaming', label: 'Live Streaming', description: 'Eventos ao vivo', icon: '📹' },
  { id: 'membership-site', label: 'Site de Membros', description: 'Conteudo exclusivo', icon: '🔐' },
  { id: 'directory', label: 'Directory Listing', description: 'Listagem de empresas', icon: '📋' },
  { id: 'classifieds', label: 'Classificados', description: 'Anuncios pagos', icon: '📰' },
  { id: 'booking-marketplace', label: 'Marketplace de Reservas', description: 'Agendamento multi-vendedor', icon: '📅' },
  { id: 'service-marketplace', label: 'Marketplace de Servicos', description: 'Prestadores multiplos', icon: '🛠️' },
  { id: 'product-customizer', label: 'Personalizador de Produto', description: 'Designer visual', icon: '🎨' },
  { id: 'quote-builder', label: 'Gerador de Orcamentos', description: 'Calculo automatico', icon: '🧮' },
  { id: 'invoice-system', label: 'Sistema de Notas Fiscais', description: 'Emissao e gestao', icon: '🧾' },
  { id: 'inventory-pos', label: 'PDV + Estoque', description: 'Ponto de venda integrado', icon: '🏪' },
  { id: 'shipping', label: 'Gestao de Frete', description: 'Etiquetas e rastreamento', icon: '📦' },
  { id: 'tax-calculator', label: 'Calculadora de Impostos', description: 'Gestao tributaria', icon: '🧾' },
  { id: 'multi-currency', label: 'Multi-moeda', description: 'Venda internacional', icon: '💱' },
  { id: 'language-translation', label: 'Traducao Automatica', description: 'Conteudo multi-idioma', icon: '🌐' },
];

const styleOptions: StyleOption[] = [
  { 
    style: 'MODERN', 
    label: 'Moderno Limpo', 
    image: 'https://images.unsplash.com/photo-149995136情境?w=400&h=300&fit=crop',
    description: 'Linhas limpas, tipografia moderna'
  },
  { 
    style: 'BOLD', 
    label: 'Ousado Vibrante', 
    image: 'https://images.unsplash.com/photo-1557682250-33bd709cbe85?w=400&h=300&fit=crop',
    description: 'Cores vibrantes, design impactante'
  },
  { 
    style: 'MINIMAL', 
    label: 'Minimalista', 
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop',
    description: 'Foco no essencial, simplicidade'
  },
  { 
    style: 'CLASSIC', 
    label: 'Elegante Clássico', 
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop',
    description: 'Elegância atemporal, serif fonts'
  },
  { 
    style: 'LUXURY', 
    label: 'Luxo Premium', 
    image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=400&h=300&fit=crop',
    description: 'Gold accents, dark theme, premium'
  },
  { 
    style: 'CREATIVE', 
    label: 'Criativo Arte', 
    image: 'https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=400&h=300&fit=crop',
    description: 'Artístico, único, memorável'
  },
];

// ===== STITCH PROMPT GENERATOR =====

function generateStitchPrompt(business: BusinessOption, solutions: string[], style: string): string {
  const businessName = business.label;
  const features = solutions.map(id => {
    const opt = solutionOptions.find(s => s.id === id);
    return opt?.label || id;
  }).join(', ');
  
  const styleDesc = styleOptions.find(s => s.style === style)?.description || 'modern';
  
  return `Create a premium ${styleDesc} website for a ${businessName}. 
Features needed: ${features}.
Style: ${styleDesc}, high-converting, $10K+ quality.
Use GSAP animations, modern typography, mobile-first design.`;
}

// ===== MAIN COMPONENT =====

export default function CreateSitePage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [showProgress, setShowProgress] = useState(false);
  const [progressStep, setProgressStep] = useState(0);
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [rufloData, setRufloData] = useState<any>(null);
  
  // Form state
  const [formData, setFormData] = useState({
    businessType: '',
    businessName: '',
    painPoints: [] as string[],
    solutions: [] as string[],
    style: '',
    phone: '',
    email: '',
    address: '',
    logoUrl: '',
    imageUrls: '',
    primaryColor: '',
  });

  const categories = [...new Set(businessCatalog.map(b => b.category))];
  const selectedBusiness = businessCatalog.find(b => b.type === formData.businessType);
  
  const getPainOptions = () => {
    if (!selectedBusiness) return painOptions.default;
    const cat = selectedBusiness.category.toLowerCase();
    if (cat === 'alimentacao') return painOptions.food;
    if (cat === 'beleza') return painOptions.beauty;
    if (cat === 'saude') return painOptions.health;
    return painOptions.default;
  };
  
  const togglePain = (id: string) => {
    setFormData(prev => ({
      ...prev,
      painPoints: prev.painPoints.includes(id) 
        ? prev.painPoints.filter(p => p !== id)
        : [...prev.painPoints, id]
    }));
  };
  
  const toggleSolution = (id: string) => {
    setFormData(prev => ({
      ...prev,
      solutions: prev.solutions.includes(id)
        ? prev.solutions.filter(s => s !== id)
        : [...prev.solutions, id]
    }));
  };
  
  const handleSubmit = async () => {
    if (!formData.businessType || !formData.businessName || formData.solutions.length === 0 || !formData.style) {
      alert('Preencha: Nicho, Nome, Estilo e pelo menos 1 solucao!');
      return;
    }
    
    setLoading(true);
    setShowProgress(true);
    setProgressStep(0);
    
    // Generate visual suggestions from memory (animations, components, logos)
    const anims = getAnimationsForNiche(formData.businessType);
    const comps = getComponentsForNiche(formData.businessType);
    const logoInsp = generateLogoInspiration(formData.businessType);
    
    const visualSuggestions = [
      { step: 0, icon: '🎨', title: 'Analisando estilo', desc: `Aplicando ${formData.style} baseado no World Class Design System` },
      { step: 1, icon: '✨', title: 'Carregando animações', desc: `${anims.length} animações GSAP: ${anims.map(a => a.name).join(', ')}` },
      { step: 2, icon: '🧩', title: 'Preparando componentes', desc: `${comps.length} componentes 21dev: ${comps.map(c => c.name).join(', ')}` },
      { step: 3, icon: '🎯', title: 'Logo inspiration', desc: `UXShowcase: ${logoInsp.substring(0, 60)}...` },
      { step: 4, icon: '🤖', title: 'IA processando', desc: 'Usando templates premium $10K+ do Dribbble/Landbook' },
      { step: 5, icon: '🚀', title: 'Site quase pronto', desc: 'Finalizando...' },
    ];
    
    setSuggestions(visualSuggestions);
    
    try {
      // Simulate progress
      const progressInterval = setInterval(() => {
        setProgressStep(prev => {
          if (prev >= 5) { clearInterval(progressInterval); return 5; }
          return prev + 1;
        });
      }, 800);
      
      const response = await fetch('/api/sites/ultimate-create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          businessName: formData.businessName,
          businessType: formData.businessType,
          painPoints: formData.painPoints,
          solutions: formData.solutions,
          style: formData.style,
          phone: formData.phone,
          email: formData.email,
          address: formData.address,
          brandAssets: {
            logoUrl: formData.logoUrl,
            imageUrls: formData.imageUrls.split(',').map(url => url.trim()).filter(Boolean),
            primaryColor: formData.primaryColor,
          }
        }),
      });
      
      clearInterval(progressInterval);
      setProgressStep(5);
      
      const data = await response.json();
      
      if (!response.ok) {
        alert(data.error || 'Erro ao criar site');
        setLoading(false);
        setShowProgress(false);
        return;
      }
      
      // Store Ruflo data to show agents in progress panel
      if (data.rufloSwarm) {
        setRufloData(data.rufloSwarm);
      }
      
      if (data.upgrade) {
        const wantsUpgrade = window.confirm('Limite do plano gratis atingido! Deseja fazer o upgrade para o Plano Premium para criar sites ilimitados?');
        if (wantsUpgrade) {
          try {
            const checkoutRes = await fetch('/api/checkout', { method: 'POST' });
            const checkoutData = await checkoutRes.json();
            if (checkoutData.url) {
              window.location.href = checkoutData.url;
            } else {
              alert('Erro ao iniciar o pagamento. Tente novamente mais tarde.');
            }
          } catch (e) {
            console.error(e);
            alert('Erro de conexao ao iniciar o pagamento.');
          }
        }
        setLoading(false);
        setShowProgress(false);
        return;
      }
      
      // Redirect to the newly created site
      setTimeout(() => {
        router.push(data.previewUrl || `/sites/${data.site?.slug}`);
      }, 1000);
    } catch (error) {
      console.error('Error:', error);
      alert('Erro ao criar site');
      setLoading(false);
      setShowProgress(false);
    }
  };
  
  return (
    <main style={{ backgroundColor: '#0a0a1a', minHeight: '100vh', color: '#fff' }}>
      {/* Background */}
      <div style={{ position: 'fixed', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
        <div style={{ position: 'absolute', top: '-20%', left: '-10%', width: '600px', height: '600px', background: 'radial-gradient(circle, rgba(79,70,229,0.1), transparent)', borderRadius: '50%', filter: 'blur(80px)' }} />
        <div style={{ position: 'absolute', bottom: '10%', right: '-10%', width: '500px', height: '500px', background: 'radial-gradient(circle, rgba(192,132,252,0.08), transparent)', borderRadius: '50%', filter: 'blur(80px)' }} />
      </div>
      
      {/* Header */}
      <header style={{ position: 'fixed', top: 0, left: 0, right: 0, background: 'rgba(10,10,26,0.95)', backdropFilter: 'blur(20px)', borderBottom: '1px solid rgba(255,255,255,0.1)', zIndex: 100 }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '1rem 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', textDecoration: 'none' }}>
            <div style={{ width: '40px', height: '40px', background: 'linear-gradient(135deg, #4f46e5, #7c3aed)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '1.25rem' }}>S</div>
            <span style={{ fontWeight: 800, fontSize: '1.5rem', color: 'white' }}>SitesSaaS</span>
          </Link>
          <Link href="/sites" style={{ color: '#94a3b8', textDecoration: 'none', fontSize: '0.9rem' }}>← Meus Sites</Link>
        </div>
      </header>
      
      {/* Main Content - Single Scroll */}
      <div style={{ paddingTop: '100px', paddingBottom: '100px', maxWidth: '1200px', margin: '0 auto', paddingLeft: '2rem', paddingRight: '2rem' }}>
        
        {/* Title */}
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h1 style={{ fontSize: '2.5rem', fontWeight: 900, marginBottom: '0.5rem', background: 'linear-gradient(to right, #818cf8, #c084fc)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            Crie site premium para seu cliente
          </h1>
          <p style={{ color: '#64748b', fontSize: '1.1rem', marginBottom: '1.5rem' }}>O sistema criará tudo automaticamente usando IA.</p>
          
          <div style={{ display: 'inline-flex', background: 'rgba(30,41,59,0.8)', padding: '0.5rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)' }}>
            <button style={{ padding: '0.5rem 1.5rem', background: '#4f46e5', color: 'white', border: 'none', borderRadius: '8px', fontWeight: 600 }}>Modo Automatico (IA)</button>
            <Link href="/builder" style={{ padding: '0.5rem 1.5rem', background: 'transparent', color: '#94a3b8', border: 'none', borderRadius: '8px', fontWeight: 600, textDecoration: 'none' }}>Modo Manual (Builder)</Link>
          </div>
        </div>
        
        {/* Stepper */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginBottom: '3rem' }}>
          {[1, 2, 3].map((s) => (
            <div key={s} onClick={() => setStep(s)} style={{ width: '40px', height: '40px', borderRadius: '50%', background: step === s ? 'linear-gradient(135deg, #4f46e5, #7c3aed)' : 'rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, cursor: 'pointer', border: step === s ? 'none' : '2px solid rgba(255,255,255,0.2)' }}>
              {s}
            </div>
          ))}
        </div>
        
        {/* Visual Progress Panel (shows while loading) */}
        {showProgress && (
          <div style={{ background: 'rgba(30,41,59,0.95)', borderRadius: '20px', padding: '2.5rem', border: '1px solid rgba(255,255,255,0.1)', marginBottom: '2rem', backdropFilter: 'blur(10px)' }}>
            <h2 style={{ fontSize: '1.8rem', fontWeight: 700, marginBottom: '0.5rem', color: '#818cf8' }}>🤖 IA trabalhando nos bastidores</h2>
            <p style={{ color: '#94a3b8', marginBottom: '2rem' }}>Usando memória completa: animations.ts, 21dev-components.ts, client-finder.ts, uxshowcase-logos.ts</p>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {suggestions.map((sug, idx) => (
                <div key={idx} style={{
                  padding: '1rem 1.5rem',
                  background: progressStep >= sug.step ? 'rgba(79,70,229,0.15)' : 'rgba(255,255,255,0.03)',
                  border: progressStep >= sug.step ? '2px solid #4f46e5' : '2px solid rgba(255,255,255,0.1)',
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                  opacity: progressStep >= sug.step ? 1 : 0.4,
                  transform: progressStep === sug.step ? 'scale(1.02)' : 'scale(1)',
                  transition: 'all 0.5s ease'
                }}>
                  <span style={{ fontSize: '2rem' }}>{sug.icon}</span>
                  <div>
                    <div style={{ fontWeight: 600, color: progressStep >= sug.step ? 'white' : '#64748b' }}>
                      {sug.title}
                      {progressStep === sug.step && <span style={{ marginLeft: '0.5rem', fontSize: '0.75rem', color: '#818cf8' }}>Processando...</span>}
                      {progressStep > sug.step && <span style={{ marginLeft: '0.5rem', fontSize: '0.75rem', color: '#34d399' }}>✓ Completo</span>}
                    </div>
                    <div style={{ fontSize: '0.85rem', color: '#94a3b8', marginTop: '0.25rem' }}>{sug.desc}</div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Ruflo Agents Panel */}
            {rufloData && rufloData.agents && rufloData.agents.length > 0 && (
              <div style={{ marginTop: '2rem', padding: '1.5rem', background: 'rgba(99,102,241,0.08)', borderRadius: '12px', border: '1px solid rgba(99,102,241,0.3)' }}>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#a5b4fc', marginBottom: '1rem' }}>🤖 Agentes Ruflo Trabalhando</h3>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
                  {rufloData.agents.map((agent: any, idx: number) => (
                    <div key={idx} style={{
                      padding: '0.75rem 1rem',
                      background: agent.status === 'completed' ? 'rgba(52,211,153,0.15)' : agent.status === 'error' ? 'rgba(248,113,113,0.15)' : 'rgba(255,255,255,0.05)',
                      borderRadius: '8px',
                      border: `1px solid ${agent.status === 'completed' ? 'rgba(52,211,153,0.4)' : agent.status === 'error' ? 'rgba(248,113,113,0.4)' : 'rgba(255,255,255,0.1)'}`,
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem'
                    }}>
                      <span style={{ fontSize: '1.2rem' }}>
                        {agent.type === 'researcher' ? '🔍' : agent.type === 'coder' ? '💻' : agent.type === 'reviewer' ? '👀' : agent.type === 'tester' ? '🧪' : agent.type === 'coordinator' ? '🎯' : '🤖'}
                      </span>
                      <div>
                        <div style={{ fontSize: '0.85rem', fontWeight: 600, color: 'white' }}>{agent.name}</div>
                        <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>{agent.type} - {agent.status === 'completed' ? '✓ Pronto' : agent.status === 'error' ? '✗ Erro' : '⏳ Trabalhando...'}</div>
                      </div>
                    </div>
                  ))}
                </div>
                {rufloData.componentSuggestions && rufloData.componentSuggestions.length > 0 && (
                  <div style={{ marginTop: '1rem', padding: '1rem', background: 'rgba(255,255,255,0.03)', borderRadius: '8px' }}>
                    <div style={{ fontSize: '0.85rem', fontWeight: 600, color: '#a5b4fc', marginBottom: '0.5rem' }}>💡 Sugestões de Componentes (Ruflo)</div>
                    {rufloData.componentSuggestions.map((sug: string, i: number) => (
                      <div key={i} style={{ fontSize: '0.8rem', color: '#94a3b8', padding: '0.25rem 0' }}>• {sug}</div>
                    ))}
                  </div>
                )}
              </div>
            )}
            
            <div style={{ marginTop: '2rem', padding: '1rem', background: 'rgba(99,102,241,0.1)', borderRadius: '10px', border: '1px solid rgba(99,102,241,0.3)' }}>
              <p style={{ color: '#c7d2fe', fontSize: '0.9rem', margin: 0 }}>
                💡 <strong>Sugestão da IA:</strong> Baseado no nicho {formData.businessType}, recomendamos foco em {formData.solutions.slice(0,2).map(id => {
                  const opt = solutionOptions.find(s => s.id === id);
                  return opt?.label;
                }).filter(Boolean).join(' e ')} para máxima conversão.
              </p>
            </div>
          </div>
        )}

        {/* Step 1: Nicho e Nome */}
        {!showProgress && step === 1 && (
          <div style={{ background: 'rgba(30,41,59,0.6)', borderRadius: '20px', padding: '2.5rem', border: '1px solid rgba(255,255,255,0.1)' }}>
            <h2 style={{ fontSize: '1.8rem', fontWeight: 700, marginBottom: '0.5rem' }}>1. Nicho e Informacoes Basicas</h2>
            <p style={{ color: '#94a3b8', marginBottom: '2rem' }}>Selecione o tipo de negocio e informe os dados.</p>
            
            {/* Business Type */}
            <div style={{ marginBottom: '2rem' }}>
              <label style={{ display: 'block', marginBottom: '0.75rem', fontWeight: 600, fontSize: '1.1rem' }}>Tipo de Negocio *</label>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '0.75rem' }}>
                {categories.map(cat => (
                  <div key={cat}>
                    <h3 style={{ fontSize: '0.9rem', color: '#64748b', marginBottom: '0.5rem', textTransform: 'uppercase' }}>{cat}</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                      {businessCatalog.filter(b => b.category === cat).map(b => (
                        <div key={b.type} onClick={() => setFormData(prev => ({ ...prev, businessType: b.type }))} style={{ padding: '0.75rem 1rem', background: formData.businessType === b.type ? 'rgba(79,70,229,0.2)' : 'rgba(255,255,255,0.05)', border: formData.businessType === b.type ? '2px solid #4f46e5' : '2px solid rgba(255,255,255,0.1)', borderRadius: '10px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.75rem', transition: 'all 0.2s' }}>
                          <span style={{ fontSize: '1.5rem' }}>{b.icon}</span>
                          <span style={{ fontWeight: 600 }}>{b.label}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Business Name */}
            <div style={{ marginBottom: '2rem' }}>
              <label style={{ display: 'block', marginBottom: '0.75rem', fontWeight: 600, fontSize: '1.1rem' }}>Nome do Negocio *</label>
              <input type="text" value={formData.businessName} onChange={e => setFormData(prev => ({ ...prev, businessName: e.target.value }))} placeholder="Ex: Pizzaria do Mario" style={{ width: '100%', padding: '1rem', background: 'rgba(255,255,255,0.05)', border: '2px solid rgba(255,255,255,0.1)', borderRadius: '10px', color: 'white', fontSize: '1rem' }} />
            </div>
            
            {/* Contact Info */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Telefone</label>
                <input type="text" value={formData.phone} onChange={e => setFormData(prev => ({ ...prev, phone: e.target.value }))} placeholder="(11) 99999-9999" style={{ width: '100%', padding: '0.75rem', background: 'rgba(255,255,255,0.05)', border: '2px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: 'white' }} />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>E-mail</label>
                <input type="email" value={formData.email} onChange={e => setFormData(prev => ({ ...prev, email: e.target.value }))} placeholder="contato@exemplo.com" style={{ width: '100%', padding: '0.75rem', background: 'rgba(255,255,255,0.05)', border: '2px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: 'white' }} />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Endereco</label>
                <input type="text" value={formData.address} onChange={e => setFormData(prev => ({ ...prev, address: e.target.value }))} placeholder="Rua Exemplo, 123" style={{ width: '100%', padding: '0.75rem', background: 'rgba(255,255,255,0.05)', border: '2px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: 'white' }} />
              </div>
            </div>
            
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <button onClick={() => setStep(2)} style={{ padding: '0.75rem 2rem', background: 'linear-gradient(135deg, #4f46e5, #7c3aed)', color: 'white', border: 'none', borderRadius: '10px', fontWeight: 600, fontSize: '1rem', cursor: 'pointer', boxShadow: '0 8px 32px rgba(79,70,229,0.4)', transition: 'all 0.3s' }}>
                Avancar →
              </button>
            </div>
          </div>
        )}
        
        {/* Step 2: Dores e Solucoes */}
        {!showProgress && step === 2 && (
          <div style={{ background: 'rgba(30,41,59,0.6)', borderRadius: '20px', padding: '2.5rem', border: '1px solid rgba(255,255,255,0.1)' }}>
            <h2 style={{ fontSize: '1.8rem', fontWeight: 700, marginBottom: '0.5rem' }}>2. Dores e Solucoes</h2>
            <p style={{ color: '#94a3b8', marginBottom: '2rem' }}>Selecione as dores do cliente e as solucoes que o site trará.</p>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
              {/* Pain Points */}
              <div>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 600, marginBottom: '1rem', color: '#f87171' }}>🔴 Dores do Cliente</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  {getPainOptions().map(p => (
                    <div key={p.id} onClick={() => togglePain(p.id)} style={{ padding: '0.75rem 1rem', background: formData.painPoints.includes(p.id) ? 'rgba(248,113,113,0.2)' : 'rgba(255,255,255,0.05)', border: formData.painPoints.includes(p.id) ? '2px solid #f87171' : '2px solid rgba(255,255,255,0.1)', borderRadius: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <div style={{ width: '20px', height: '20px', borderRadius: '4px', background: formData.painPoints.includes(p.id) ? '#f87171' : 'transparent', border: '2px solid #f87171', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        {formData.painPoints.includes(p.id) && <span style={{ color: 'white', fontSize: '0.75rem' }}>✓</span>}
                      </div>
                      <span>{p.label}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Solutions */}
              <div>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 600, marginBottom: '1rem', color: '#34d399' }}>🟢 Solucoes * (pelo menos 1)</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', maxHeight: '400px', overflowY: 'auto', paddingRight: '0.5rem' }}>
                  {solutionOptions.map(s => (
                    <div key={s.id} onClick={() => toggleSolution(s.id)} style={{ padding: '0.75rem 1rem', background: formData.solutions.includes(s.id) ? 'rgba(52,211,153,0.2)' : 'rgba(255,255,255,0.05)', border: formData.solutions.includes(s.id) ? '2px solid #34d399' : '2px solid rgba(255,255,255,0.1)', borderRadius: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <div style={{ width: '20px', height: '20px', borderRadius: '4px', background: formData.solutions.includes(s.id) ? '#34d399' : 'transparent', border: '2px solid #34d399', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        {formData.solutions.includes(s.id) && <span style={{ color: 'white', fontSize: '0.75rem' }}>✓</span>}
                      </div>
                      <span style={{ fontSize: '1.5rem' }}>{s.icon}</span>
                      <div>
                        <div style={{ fontWeight: 600 }}>{s.label}</div>
                        <div style={{ fontSize: '0.85rem', color: '#94a3b8' }}>{s.description}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '2rem' }}>
              <button onClick={() => setStep(1)} style={{ padding: '0.75rem 2rem', background: 'rgba(255,255,255,0.1)', color: 'white', border: 'none', borderRadius: '10px', fontWeight: 600, cursor: 'pointer' }}>
                ← Voltar
              </button>
              <button onClick={() => setStep(3)} style={{ padding: '0.75rem 2rem', background: 'linear-gradient(135deg, #4f46e5, #7c3aed)', color: 'white', border: 'none', borderRadius: '10px', fontWeight: 600, fontSize: '1rem', cursor: 'pointer', boxShadow: '0 8px 32px rgba(79,70,229,0.4)', transition: 'all 0.3s' }}>
                Avancar →
              </button>
            </div>
          </div>
        )}
        
        {/* Step 3: Estilo e Assets */}
        {!showProgress && step === 3 && (
          <div style={{ background: 'rgba(30,41,59,0.6)', borderRadius: '20px', padding: '2.5rem', border: '1px solid rgba(255,255,255,0.1)' }}>
            <h2 style={{ fontSize: '1.8rem', fontWeight: 700, marginBottom: '0.5rem' }}>3. Estilo e Assets da Marca</h2>
            <p style={{ color: '#94a3b8', marginBottom: '2rem' }}>Escolha o estilo visual e adicione assets da marca.</p>
            
            {/* Style Selection */}
            <div style={{ marginBottom: '2rem' }}>
              <label style={{ display: 'block', marginBottom: '0.75rem', fontWeight: 600, fontSize: '1.1rem' }}>Estilo do Site *</label>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '1rem' }}>
                {styleOptions.map(s => (
                  <div key={s.style} onClick={() => setFormData(prev => ({ ...prev, style: s.style }))} style={{ borderRadius: '12px', overflow: 'hidden', border: formData.style === s.style ? '3px solid #4f46e5' : '2px solid rgba(255,255,255,0.1)', cursor: 'pointer', transition: 'all 0.2s', background: 'rgba(255,255,255,0.05)' }}>
                    <img src={s.image} alt={s.label} style={{ width: '100%', height: '150px', objectFit: 'cover' }} />
                    <div style={{ padding: '1rem' }}>
                      <h3 style={{ fontWeight: 700, marginBottom: '0.25rem' }}>{s.label}</h3>
                      <p style={{ color: '#94a3b8', fontSize: '0.85rem' }}>{s.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Brand Assets */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>URL do Logo</label>
                <input type="text" value={formData.logoUrl} onChange={e => setFormData(prev => ({ ...prev, logoUrl: e.target.value }))} placeholder="https://exemplo.com/logo.png" style={{ width: '100%', padding: '0.75rem', background: 'rgba(255,255,255,0.05)', border: '2px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: 'white' }} />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>URLs de Imagens (separadas por virgula)</label>
                <textarea value={formData.imageUrls} onChange={e => setFormData(prev => ({ ...prev, imageUrls: e.target.value }))} placeholder="https://exemplo.com/img1.jpg, https://exemplo.com/img2.jpg" style={{ width: '100%', padding: '0.75rem', background: 'rgba(255,255,255,0.05)', border: '2px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: 'white', minHeight: '80px', resize: 'vertical' }} />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Cor Primaria (hex)</label>
                <input type="text" value={formData.primaryColor} onChange={e => setFormData(prev => ({ ...prev, primaryColor: e.target.value }))} placeholder="#4f46e5" style={{ width: '100%', padding: '0.75rem', background: 'rgba(255,255,255,0.05)', border: '2px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: 'white' }} />
              </div>
            </div>
            
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <button onClick={() => setStep(2)} style={{ padding: '0.75rem 2rem', background: 'rgba(255,255,255,0.1)', color: 'white', border: 'none', borderRadius: '10px', fontWeight: 600, cursor: 'pointer' }}>
                ← Voltar
              </button>
              <button onClick={handleSubmit} disabled={loading} style={{ padding: '0.75rem 2.5rem', background: loading ? 'rgba(255,255,255,0.1)' : 'linear-gradient(135deg, #4f46e5, #7c3aed)', color: 'white', border: 'none', borderRadius: '10px', fontWeight: 600, fontSize: '1rem', cursor: loading ? 'not-allowed' : 'pointer', boxShadow: '0 8px 32px rgba(79,70,229,0.4)', transition: 'all 0.3s' }}>
                {loading ? 'Criando Site Premium...' : '🚀 Criar Site Premium'}
              </button>
            </div>
          </div>
        )}
        
      </div>
    </main>
  );
}
