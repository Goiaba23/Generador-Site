// Expanded templates for various business types based on market research
// Each template is optimized for the specific business type and market

import { TemplateConfig, SiteContent, Section } from './templates';

// ==================== PADARIA / CONFEITARIA ====================
export const bakeryTemplate: TemplateConfig = {
  id: 'bakery-ecommerce',
  businessType: 'BAKERY',
  style: 'ECOMMERCE',
  name: 'Padaria Premium',
  description: 'Loja completa para padarias e confeitarias com catálogo de produtos, encomendas online e destaque para produtos artesanais',
  thumbnail: '/templates/bakery-premium.png',
  defaultContent: {
    hero: {
      title: '{{businessName}}',
      subtitle: 'Padaria artesanal com os melhores pães e doces da região',
      backgroundImage: 'https://images.unsplash.com/photo-1509440159596-0249088772e8?w=1200',
      ctaText: 'Ver Cardápio',
      ctaLink: '#products',
    },
    sections: [
      {
        type: 'about',
        title: 'Nossa História',
        content: {
          text: '{{businessDescription}}',
          image: 'https://images.unsplash.com/photo-1555507036-ab1f703260e8?w=800',
          stats: [
            { number: '15+', label: 'Anos de Tradição' },
            { number: '50+', label: 'Tipos de Pães' },
            { number: '100%', label: 'Ingredientes Frescos' },
          ],
        },
      },
      {
        type: 'menu',
        title: 'Nossos Produtos',
        content: {
          categories: [
            {
              name: 'Pães Artesanais',
              items: [
                { name: 'Pão Francês', price: 0.50, description: 'Tradicional, crocante por fora e macio por dentro' },
                { name: 'Pão de Ló', price: 25.90, description: 'Fofinho e perfeito para bolos' },
                { name: 'Pão Integral', price: 12.90, description: 'Com grãos selecionados' },
                { name: 'Croissant', price: 8.90, description: 'Folhado e amanteigado' },
              ],
            },
            {
              name: 'Doces & Confeitaria',
              items: [
                { name: 'Brigadeiro Gourmet', price: 5.90, description: 'Cacau belga e creme de leite' },
                { name: 'Bolo de Chocolate', price: 45.90, description: 'Cobertura de ganache' },
                { name: 'Cupcake', price: 8.90, description: 'Várias coberturas disponíveis' },
                { name: 'Torta de Morango', price: 55.90, description: 'Morangos frescos e creme' },
              ],
            },
            {
              name: 'Salgados',
              items: [
                { name: 'Coxinha', price: 6.90, description: 'Frágua desfiada temperada' },
                { name: 'Pão de Queijo', price: 4.90, description: 'Minas tradicional' },
                { name: 'Empada', price: 7.90, description: 'Frango com palmito' },
              ],
            },
          ],
        },
      },
      {
        type: 'services',
        title: 'Serviços Especiais',
        content: {
          services: [
            { name: 'Encomendas de Bolos', description: 'Bolos personalizados para eventos', icon: 'cake' },
            { name: 'Café da Manhã', description: 'Combos para empresas', icon: 'coffee' },
            { name: 'Entrega em Domicílio', description: 'Delivery rápido na região', icon: 'delivery' },
          ],
        },
      },
      {
        type: 'gallery',
        title: 'Nossas Criações',
        content: {
          images: [
            'https://images.unsplash.com/photo-1509440159596-0249088772e8?w=600',
            'https://images.unsplash.com/photo-1555507036-ab1f703260e8?w=600',
            'https://images.unsplash.com/photo-1578985545062-69928ae9adec?w=600',
            'https://images.unsplash.com/photo-1563729784474-d77dbb933a5e?w=600',
          ],
        },
      },
      {
        type: 'testimonials',
        title: 'O que dizem nossos clientes',
        content: {
          testimonials: [
            { name: 'Maria Silva', text: 'Melhor padaria da região! Pães sempre fresquinhos.', rating: 5 },
            { name: 'João Santos', text: 'Os bolos de aniversário são espetaculares.', rating: 5 },
            { name: 'Ana Costa', text: 'Adoro os doces artesanais, qualidade excepcional.', rating: 4 },
          ],
        },
      },
      {
        type: 'contact',
        title: 'Faça seu Pedido',
        content: {
          address: '{{businessAddress}}',
          phone: '{{businessPhone}}',
          email: '{{businessEmail}}',
          hours: 'Seg-Sex: 6h-20h | Sáb-Dom: 6h-18h',
          whatsapp: '{{businessPhone}}',
          deliveryAreas: 'Raio de 10km',
        },
      },
    ],
    footer: {
      copyright: '© 2026 {{businessName}}. Todos os direitos reservados.',
      links: [
        { label: 'Instagram', href: '#' },
        { label: 'WhatsApp', href: '#' },
        { label: 'Cardápio', href: '#products' },
        { label: 'Encomendas', href: '#contact' },
      ],
    },
  },
};

// ==================== FARMÁCIA ====================
export const pharmacyTemplate: TemplateConfig = {
  id: 'pharmacy-professional',
  businessType: 'PHARMACY',
  style: 'ECOMMERCE',
  name: 'Farmácia Saúde & Bem-estar',
  description: 'Site profissional para farmácias com catálogo de produtos, upload de receitas médicas e foco em confiança e saúde',
  thumbnail: '/templates/pharmacy-pro.png',
  defaultContent: {
    hero: {
      title: '{{businessName}}',
      subtitle: 'Sua saúde em boas mãos. Medicamentos, cosméticos e muito mais.',
      backgroundImage: 'https://images.unsplash.com/photo-1576671738953-cc1264d7d8e9?w=1200',
      ctaText: 'Comprar Online',
      ctaLink: '#products',
    },
    sections: [
      {
        type: 'about',
        title: 'Compromisso com sua Saúde',
        content: {
          text: '{{businessDescription}}',
          image: 'https://images.unsplash.com/photo-1576671738953-cc1264d7d8e9?w=800',
          badges: [
            { text: 'Autorizada pela ANVISA', icon: 'certificate' },
            { text: 'Farmaceútico Responsável', icon: 'user-md' },
            { text: 'Entrega Rápida', icon: 'truck' },
          ],
        },
      },
      {
        type: 'services',
        title: 'Nossos Serviços',
        content: {
          services: [
            { name: 'Upload de Receita', description: 'Envie sua receita médica online e retire na loja ou receba em casa', icon: 'prescription' },
            { name: 'Aferição de Pressão', description: 'Gratuito para clientes', icon: 'heartbeat' },
            { name: 'Teste de Glicemia', description: 'Rápido e preciso', icon: 'tint' },
            { name: 'Orientação Farmacêutica', description: 'Tire suas dúvidas com nosso farmacêutico', icon: 'comments' },
          ],
        },
      },
      {
        type: 'menu',
        title: 'Produtos em Destaque',
        content: {
          categories: [
            {
              name: 'Medicamentos',
              items: [
                { name: 'Paracetamol 500mg', price: 12.90, description: 'Caixa com 20 comprimidos', badge: 'Mais Vendido' },
                { name: 'Vitamina C 1g', price: 29.90, description: 'Frasco com 30 comprimidos efervescentes' },
                { name: 'Dipirona 500mg', price: 8.90, description: 'Caixa com 10 comprimidos' },
              ],
            },
            {
              name: 'Cosméticos & Beleza',
              items: [
                { name: 'Protetor Solar FPS 60', price: 45.90, description: 'Toque seco, 60ml' },
                { name: 'Hidratante Facial', price: 38.90, description: 'Com ácido hialurônico' },
                { name: 'Shampoo Antiqueda', price: 42.90, description: 'Frasco 200ml' },
              ],
            },
            {
              name: 'Suplementos',
              items: [
                { name: 'Whey Protein', price: 129.90, description: '1kg - Vários sabores' },
                { name: 'Creatina Monohidratada', price: 89.90, description: '300g' },
                { name: 'Multivitamínico', price: 59.90, description: '60 comprimidos' },
              ],
            },
          ],
        },
      },
      {
        type: 'gallery',
        title: 'Nossa Estrutura',
        content: {
          images: [
            'https://images.unsplash.com/photo-1576671738953-cc1264d7d8e9?w=600',
            'https://images.unsplash.com/photo-1583912267554-7755e6b63811?w=600',
            'https://images.unsplash.com/photo-1471864190281-dc3baa14c98d?w=600',
          ],
        },
      },
      {
        type: 'contact',
        title: 'Contato & Localização',
        content: {
          address: '{{businessAddress}}',
          phone: '{{businessPhone}}',
          email: '{{businessEmail}}',
          hours: 'Seg-Sex: 8h-22h | Sáb-Dom: 8h-20h | Plantão 24h',
          mapEmbed: '',
          emergencyPhone: '{{businessPhone}}',
        },
      },
    ],
    footer: {
      copyright: '© 2026 {{businessName}}. Todos os direitos reservados. Venda sob prescrição médica.',
      links: [
        { label: 'Política de Privacidade', href: '#' },
        { label: 'Termos de Uso', href: '#' },
        { label: 'WhatsApp', href: '#' },
        { label: 'Upload de Receita', href: '#services' },
      ],
    },
  },
};

// ==================== PET SHOP ====================
export const petShopTemplate: TemplateConfig = {
  id: 'pet-shop-store',
  businessType: 'PET_SHOP',
  style: 'ECOMMERCE',
  name: 'Pet Shop Amigo',
  description: 'Loja completa para pets com produtos, serviços de banho & tosa e agendamento online',
  thumbnail: '/templates/pet-shop.png',
  defaultContent: {
    hero: {
      title: '{{businessName}}',
      subtitle: 'Tudo para seu pet com amor e dedicação',
      backgroundImage: 'https://images.unsplash.com/photo-1587300003388-59208cc247b9?w=1200',
      ctaText: 'Ver Produtos',
      ctaLink: '#products',
    },
    sections: [
      {
        type: 'services',
        title: 'Serviços para seu Pet',
        content: {
          services: [
            { name: 'Banho & Tosa', price: 45.00, duration: '1h30min', description: 'Inclui corte de unhas e limpeza de orelhas' },
            { name: 'Consultoria Veterinária', price: 80.00, duration: '45min', description: 'Atendimento especializado' },
            { name: 'Day Care', price: 35.00, duration: 'Por dia', description: 'Seu pet brincando com segurança' },
            { name: 'Hotel para Pets', price: 60.00, duration: 'Por diária', description: 'Conforto e cuidado 24h' },
          ],
        },
      },
      {
        type: 'menu',
        title: 'Produtos em Destaque',
        content: {
          categories: [
            {
              name: 'Rações',
              items: [
                { name: 'Raão Premium Cães Pequenos', price: 89.90, description: '15kg - Frango e Arroz' },
                { name: 'Raão Gatos Castrados', price: 69.90, description: '10kg - Salmão' },
                { name: 'Petiscos Naturals', price: 24.90, description: 'Pacote 500g' },
              ],
            },
            {
              name: 'Brinquedos',
              items: [
                { name: 'Osso de Borracha', price: 29.90, description: 'Indestrutível' },
                { name: 'Bola Interativa', price: 34.90, description: 'Para estimulação mental' },
                { name: 'Arranhador Gato', price: 89.90, description: 'Com catnip' },
              ],
            },
            {
              name: 'Higiene',
              items: [
                { name: 'Shampoo Hipoalergênico', price: 39.90, description: '500ml' },
                { name: 'Tapetinho Higiênico', price: 49.90, description: 'Pacote com 30 unidades' },
                { name: 'Escova Dental Pet', price: 19.90, description: 'Cerdas suaves' },
              ],
            },
          ],
        },
      },
      {
        type: 'booking',
        title: 'Agende um Horário',
        content: {
          message: 'Garanta o melhor cuidado para seu pet',
          phone: '{{businessPhone}}',
          whatsapp: '{{businessPhone}}',
          availableTimes: 'Seg-Sex: 8h-18h | Sáb: 8h-14h',
        },
      },
      {
        type: 'gallery',
        title: 'Nossos Clientes Felizes',
        content: {
          images: [
            'https://images.unsplash.com/photo-1587300003388-59208cc247b9?w=600',
            'https://images.unsplash.com/photo-1548199973-03cce0abb68e?w=600',
            'https://images.unsplash.com/photo-1518717758536-85ae29035b6d?w=600',
            'https://images.unsplash.com/photo-1530041686259-763d5f9d4f9c?w=600',
          ],
        },
      },
      {
        type: 'contact',
        title: 'Visite-nos',
        content: {
          address: '{{businessAddress}}',
          phone: '{{businessPhone}}',
          email: '{{businessEmail}}',
          hours: 'Seg-Sex: 8h-20h | Sáb: 8h-18h | Dom: 9h-14h',
          emergencyPhone: '(11) 99999-9999',
        },
      },
    ],
    footer: {
      copyright: '© 2026 {{businessName}}. Todos os direitos reservados.',
      links: [
        { label: 'Instagram', href: '#' },
        { label: 'WhatsApp', href: '#' },
        { label: 'Serviços', href: '#services' },
        { label: 'Produtos', href: '#products' },
      ],
    },
  },
};

// ==================== LIVRARIA / BOOKSTORE ====================
export const bookstoreTemplate: TemplateConfig = {
  id: 'bookstore-literary',
  businessType: 'BOOKSTORE',
  style: 'ECOMMERCE',
  name: 'Livraria Cultura Literária',
  description: 'Loja de livros com catálogo organizado, resenhas, eventos de autógrafos e clube de leitura',
  thumbnail: '/templates/bookstore.png',
  defaultContent: {
    hero: {
      title: '{{businessName}}',
      subtitle: 'Onde as histórias ganham vida',
      backgroundImage: 'https://images.unsplash.com/photo-1521587760476-6c12a4a9a2e?w=1200',
      ctaText: 'Explorar Catálogo',
      ctaLink: '#products',
    },
    sections: [
      {
        type: 'about',
        title: 'Sobre Nossa Livraria',
        content: {
          text: '{{businessDescription}}',
          image: 'https://images.unsplash.com/photo-1521587760476-6c12a4a9a2e?w=800',
          features: [
            'Mais de 10.000 títulos disponíveis',
            'Espaço de leitura aconchegante',
            'Eventos literários mensais',
          ],
        },
      },
      {
        type: 'menu',
        title: 'Destaques Literários',
        content: {
          categories: [
            {
              name: 'Lançamentos',
              items: [
                { name: 'O Algoritmo da Sorte', price: 59.90, description: 'Romance contemporâneo', author: 'Ana Silva', pages: 320 },
                { name: 'Código Limpo', price: 89.90, description: 'Manual de boas práticas', author: 'Robert Martin', pages: 431 },
                { name: 'A Arte de Viver', price: 45.90, description: 'Filosofia prática', author: 'Thich Nhat Hanh', pages: 198 },
              ],
            },
            {
              name: 'Infantis',
              items: [
                { name: 'O Pequeno Príncipe', price: 29.90, description: 'Edição luxo', author: 'Antoine de Saint-Exupéry', pages: 96 },
                { name: 'Harry Potter Vol. 1', price: 49.90, description: 'Edição com capa dura', author: 'J.K. Rowling', pages: 264 },
                { name: 'Contos de Fadas', price: 34.90, description: 'Clássicos ilustrados', author: 'Irmãos Grimm', pages: 150 },
              ],
            },
            {
              name: 'Educação',
              items: [
                { name: 'Matemática Básica', price: 65.90, description: 'Ensino médio', author: 'José Silva', pages: 400 },
                { name: 'Gramática Contextualizada', price: 55.90, description: 'Português', author: 'Maria Santos', pages: 350 },
                { name: 'Inglês para Iniciantes', price: 49.90, description: 'Livro + Audio', author: 'John Smith', pages: 200 },
              ],
            },
          ],
        },
      },
      {
        type: 'services',
        title: 'Eventos & Serviços',
        content: {
          services: [
            { name: 'Clube de Leitura', description: 'Encontros mensais para discutir livros', icon: 'book-open' },
            { name: 'Sessão de Autógrafos', description: 'Encontre seus autores favoritos', icon: 'pen-nib' },
            { name: 'Café Literário', description: 'Espaço com café e leitura', icon: 'coffee' },
            { name: 'Encomendas Especiais', description: 'Trazemos qualquer livro', icon: 'search' },
          ],
        },
      },
      {
        type: 'testimonials',
        title: 'O que nossos leitores dizem',
        content: {
          testimonials: [
            { name: 'Carlos Eduardo', text: 'A melhor livraria da cidade. Atendimento nota 10!', rating: 5 },
            { name: 'Fernanda Lima', text: 'Adoro o clube de leitura. Conheci pessoas incríveis.', rating: 5 },
            { name: 'Roberto Alves', text: 'Ótimo acervo e preços justos.', rating: 4 },
          ],
        },
      },
      {
        type: 'contact',
        title: 'Visite Nossa Livraria',
        content: {
          address: '{{businessAddress}}',
          phone: '{{businessPhone}}',
          email: '{{businessEmail}}',
          hours: 'Seg-Sex: 9h-20h | Sáb: 9h-18h | Dom: 10h-16h',
          mapEmbed: '',
        },
      },
    ],
    footer: {
      copyright: '© 2026 {{businessName}}. Todos os direitos reservados.',
      links: [
        { label: 'Instagram', href: '#' },
        { label: 'Facebook', href: '#' },
        { label: 'Catálogo', href: '#products' },
        { label: 'Eventos', href: '#services' },
      ],
    },
  },
};

// ==================== FLORICULTURA ====================
export const floristTemplate: TemplateConfig = {
  id: 'florist-occasions',
  businessType: 'FLORIST',
  style: 'ECOMMERCE',
  name: 'Floricultura Flores & Eventos',
  description: 'Site para floriculturas com arranjos para todas as ocasiões, entrega em domicílio e catálogo sazonal',
  thumbnail: '/templates/florist.png',
  defaultContent: {
    hero: {
      title: '{{businessName}}',
      subtitle: 'Em cada flor, uma emoção. Arranjos para todas as ocasiões.',
      backgroundImage: 'https://images.unsplash.com/photo-1487530811176-512ecf6b1f80?w=1200',
      ctaText: 'Ver Arranjos',
      ctaLink: '#products',
    },
    sections: [
      {
        type: 'menu',
        title: 'Arranjos por Ocasião',
        content: {
          categories: [
            {
              name: 'Casamento',
              items: [
                { name: 'Buquê Noiva Clássico', price: 189.90, description: 'Rosas brancas e lírios' },
                { name: 'Centro de Mesa', price: 129.90, description: 'Arranjo em vaso de cristal' },
                { name: 'Lembrança de Casamento', price: 49.90, description: 'Mini buquê para convidados' },
              ],
            },
            {
              name: 'Aniversário',
              items: [
                { name: 'Buquê Colorido', price: 89.90, description: 'Tulipas e margaridas' },
                { name: 'Cesta de Flores', price: 149.90, description: 'Com chocolates e pelúcias' },
                { name: 'Arranjo em Balão', price: 119.90, description: 'Flores dentro de balão transparente' },
              ],
            },
            {
              name: 'Sazonal',
              items: [
                { name: 'Arranjo de Natal', price: 159.90, description: 'Pinheirinho e flores vermelhas' },
                { name: 'Buquê de Dia das Mães', price: 99.90, description: 'Orquídeas e rosas' },
                { name: 'Coroa de Advento', price: 79.90, description: 'Para porta de entrada' },
              ],
            },
          ],
        },
      },
      {
        type: 'services',
        title: 'Nossos Serviços',
        content: {
          services: [
            { name: 'Decoração de Eventos', description: 'Casamentos, formaturas e festas corporativas', icon: 'calendar' },
            { name: 'Entrega Expressa', description: 'Entregamos em até 2 horas', icon: 'truck' },
            { name: 'Assinatura Floral', description: 'Flores frescas toda semana no seu endereço', icon: 'refresh' },
            { name: 'Plantas de Interior', description: 'Consultoria e manutenção', icon: 'leaf' },
          ],
        },
      },
      {
        type: 'gallery',
        title: 'Nossos Trabalhos',
        content: {
          images: [
            'https://images.unsplash.com/photo-1487530811176-512ecf6b1f80?w=600',
            'https://images.unsplash.com/photo-1455659817273-f96807779b8d?w=600',
            'https://images.unsplash.com/photo-1471696035578-3d8c78d949a?w=600',
            'https://images.unsplash.com/photo-1490750967868-88aa4f44baee?w=600',
          ],
        },
      },
      {
        type: 'booking',
        title: 'Agende sua Decoração',
        content: {
          message: 'Vamos transformar seu evento em algo inesquecível',
          phone: '{{businessPhone}}',
          whatsapp: '{{businessPhone}}',
          formLink: '#contact',
        },
      },
      {
        type: 'contact',
        title: 'Faça seu Pedido',
        content: {
          address: '{{businessAddress}}',
          phone: '{{businessPhone}}',
          email: '{{businessEmail}}',
          hours: 'Seg-Sex: 8h-20h | Sáb: 8h-18h | Dom: 9h-13h',
          deliveryAreas: 'Entrega em toda a cidade',
        },
      },
    ],
    footer: {
      copyright: '© 2026 {{businessName}}. Todos os direitos reservados.',
      links: [
        { label: 'Instagram', href: '#' },
        { label: 'WhatsApp', href: '#' },
        { label: 'Catálogo', href: '#products' },
        { label: 'Decoração de Eventos', href: '#services' },
      ],
    },
  },
};

// ==================== SERVIÇO DE LIMPEZA ====================
export const cleaningServiceTemplate: TemplateConfig = {
  id: 'cleaning-trust',
  businessType: 'CLEANING_SERVICE',
  style: 'LANDING',
  name: 'Limpeza Profissional',
  description: 'Site institucional para empresas de limpeza com foco em confiança, reservas online e depoimentos de clientes',
  thumbnail: '/templates/cleaning.png',
  defaultContent: {
    hero: {
      title: '{{businessName}}',
      subtitle: 'Limpeza profissional com qualidade e confiança',
      backgroundImage: 'https://images.unsplash.com/photo-1581578731548-c64695ad8d4?w=1200',
      ctaText: 'Solicitar Orçamento',
      ctaLink: '#contact',
    },
    sections: [
      {
        type: 'about',
        title: 'Sobre Nossa Empresa',
        content: {
          text: '{{businessDescription}}',
          image: 'https://images.unsplash.com/photo-1581578731548-c64695ad8d4?w=800',
          stats: [
            { number: '500+', label: 'Clientes Satisfeitos' },
            { number: '10+', label: 'Anos de Experiência' },
            { number: '100%', label: 'Seguro e Fiança' },
          ],
        },
      },
      {
        type: 'services',
        title: 'Nossos Serviços',
        content: {
          services: [
            { name: 'Limpeza Residencial', price: 120.00, description: 'Apartamentos e casas', icon: 'home' },
            { name: 'Limpeza Comercial', price: 200.00, description: 'Escritórios e comércios', icon: 'building' },
            { name: 'Faxina Pós-Obra', price: 350.00, description: 'Remoção de detritos e limpeza profunda', icon: 'hard-hat' },
            { name: 'Limpeza de Estofados', price: 80.00, description: 'Sofás, cadeiras e colchões', icon: 'couch' },
            { name: 'Lavagem de Fachada', price: 300.00, description: 'Vidros e paredes externas', icon: 'spray-can' },
            { name: 'Jardinagem', price: 150.00, description: 'Poda e manutenção de jardins', icon: 'leaf' },
          ],
        },
      },
      {
        type: 'testimonials',
        title: 'Clientes Satisfeitos',
        content: {
          testimonials: [
            { name: 'Marcos Oliveira', text: 'Serviço impecável! Minha casa nunca esteve tão limpa.', rating: 5 },
            { name: 'Patrícia Mendes', text: 'Contratamos para limpeza comercial e superou expectativas.', rating: 5 },
            { name: 'Empresa XYZ', text: 'Parceria de anos. Sempre pontuais e eficientes.', rating: 5 },
          ],
        },
      },
      {
        type: 'contact',
        title: 'Solicite seu Orçamento',
        content: {
          address: '{{businessAddress}}',
          phone: '{{businessPhone}}',
          email: '{{businessEmail}}',
          hours: 'Seg-Sex: 7h-19h | Sáb: 7h-14h',
          areas: 'Atendemos toda a região metropolitana',
          formFields: ['name', 'phone', 'email', 'service', 'address', 'date', 'message'],
        },
      },
    ],
    footer: {
      copyright: '© 2026 {{businessName}}. Todos os direitos reservados.',
      links: [
        { label: 'WhatsApp', href: '#' },
        { label: 'Orçamento', href: '#contact' },
        { label: 'Serviços', href: '#services' },
        { label: 'Depoimentos', href: '#testimonials' },
      ],
    },
  },
};

// ==================== AUTOMOTIVO ====================
export const automotiveTemplate: TemplateConfig = {
  id: 'automotive-service',
  businessType: 'AUTOMOTIVE',
  style: 'BOOKING',
  name: 'Oficina Mecânica & Auto Peças',
  description: 'Site para oficinas e lojas de autopeças com agendamento de serviços, catálogo de peças e orçamentos online',
  thumbnail: '/templates/automotive.png',
  defaultContent: {
    hero: {
      title: '{{businessName}}',
      subtitle: 'Seu carro em boas mãos. Especialistas em mecânica automotiva.',
      backgroundImage: 'https://images.unsplash.com/photo-1530040442044-7699006cce5?w=1200',
      ctaText: 'Agendar Serviço',
      ctaLink: '#booking',
    },
    sections: [
      {
        type: 'services',
        title: 'Nossos Serviços',
        content: {
          services: [
            { name: 'Revisão Completa', price: 450.00, duration: '4h', description: 'Troca de óleo, filtros, velas e inspeção geral' },
            { name: 'Troca de Óleo', price: 120.00, duration: '30min', description: 'Óleo sintético ou mineral + filtro' },
            { name: 'Alinhamento e Balanceamento', price: 180.00, duration: '1h', description: 'Para 4 rodas' },
            { name: 'Freios', price: 250.00, duration: '2h', description: 'Troca de pastilhas e fluido' },
            { name: 'Ar Condicionado', price: 200.00, duration: '1h30min', description: 'Recarga e manutenção' },
            { name: 'Elétrica Automotiva', price: 150.00, duration: '1h', description: 'Diagnóstico e reparo' },
          ],
        },
      },
      {
        type: 'menu',
        title: 'Autopeças em Destaque',
        content: {
          categories: [
            {
              name: 'Motor',
              items: [
                { name: 'Filtro de Óleo', price: 35.90, description: 'Para diversos modelos' },
                { name: 'Correia Dentada', price: 89.90, description: 'Conjunto completo' },
                { name: 'Vela de Ignição', price: 25.90, description: 'Kit com 4 unidades' },
              ],
            },
            {
              name: 'Freios',
              items: [
                { name: 'Pastilha de Freio', price: 89.90, description: 'Dianteira' },
                { name: 'Disco de Freio', price: 189.90, description: 'Par dianteiro' },
                { name: 'Fluido de Freio', price: 29.90, description: '500ml DOT 4' },
              ],
            },
          ],
        },
      },
      {
        type: 'about',
        title: 'Sobre Nossa Oficina',
        content: {
          text: '{{businessDescription}}',
          image: 'https://images.unsplash.com/photo-1530040442044-7699006cce5?w=800',
          features: [
            'Mecânicos certificados',
            'Garantia em todos os serviços',
            'Peças originais e paralelas de qualidade',
          ],
        },
      },
      {
        type: 'booking',
        title: 'Agende seu Horário',
        content: {
          message: 'Atendemos com hora marcada para sua comodidade',
          phone: '{{businessPhone}}',
          whatsapp: '{{businessPhone}}',
          availableTimes: 'Seg-Sex: 8h-18h | Sáb: 8h-12h',
          formFields: ['name', 'phone', 'vehicle', 'year', 'service', 'date', 'time'],
        },
      },
      {
        type: 'contact',
        title: 'Visite-nos',
        content: {
          address: '{{businessAddress}}',
          phone: '{{businessPhone}}',
          email: '{{businessEmail}}',
          hours: 'Seg-Sex: 8h-18h | Sáb: 8h-13h | Dom: Emergências',
          emergencyPhone: '(11) 99999-9999',
        },
      },
    ],
    footer: {
      copyright: '© 2026 {{businessName}}. Todos os direitos reservados.',
      links: [
        { label: 'WhatsApp', href: '#' },
        { label: 'Agendamento', href: '#booking' },
        { label: 'Serviços', href: '#services' },
        { label: 'Peças', href: '#products' },
      ],
    },
  },
};

// ==================== ELETROÔNICOS ====================
export const electronicsTemplate: TemplateConfig = {
  id: 'electronics-store',
  businessType: 'ELECTRONICS',
  style: 'ECOMMERCE',
  name: 'Loja de Eletrônicos Tech',
  description: 'E-commerce completo para eletrônicos com comparação de produtos, especificações técnicas e avaliações',
  thumbnail: '/templates/electronics.png',
  defaultContent: {
    hero: {
      title: '{{businessName}}',
      subtitle: 'Tecnologia de ponta ao melhor preço',
      backgroundImage: 'https://images.unsplash.com/photo-1498049794561-4e21d87b865?w=1200',
      ctaText: 'Ver Produtos',
      ctaLink: '#products',
    },
    sections: [
      {
        type: 'menu',
        title: 'Produtos em Destaque',
        content: {
          categories: [
            {
              name: 'Smartphones',
              items: [
                { name: 'iPhone 16 Pro', price: 8999.00, description: '256GB - Titânio Natural', brand: 'Apple', specs: 'Tela 6.1", A18 Pro, 48MP' },
                { name: 'Samsung Galaxy S25', price: 5499.00, description: '256GB - Grafite', brand: 'Samsung', specs: 'Tela 6.2", Snapdragon 8 Gen 4, 50MP' },
                { name: 'Xiaomi 15', price: 3999.00, description: '256GB - Preto', brand: 'Xiaomi', specs: 'Tela 6.36", Snapdragon 8 Elite, 50MP' },
              ],
            },
            {
              name: 'Notebooks',
              items: [
                { name: 'MacBook Pro M4', price: 12999.00, description: '14" - 16GB RAM - 512GB', brand: 'Apple', specs: 'Chip M4, 14h bateria' },
                { name: 'Dell XPS 15', price: 8999.00, description: '15" - i7 - 16GB RAM - 512GB', brand: 'Dell', specs: 'Intel i7, RTX 4050' },
                { name: 'Lenovo ThinkPad X1', price: 7999.00, description: '14" - i5 - 16GB RAM - 512GB', brand: 'Lenovo', specs: 'Intel i5, 12h bateria' },
              ],
            },
            {
              name: 'Smart Home',
              items: [
                { name: 'Alexa Echo Dot 5', price: 299.00, description: 'Assistente virtual' },
                { name: 'Smart TV 55" 4K', price: 2499.00, description: 'LED, HDR, WiFi, Bluetooth' },
                { name: 'Fechadura Digital', price: 899.00, description: 'Biometria e senha' },
              ],
            },
          ],
        },
      },
      {
        type: 'services',
        title: 'Serviços Especiais',
        content: {
          services: [
            { name: 'Garantia Estendida', description: 'Até 3 anos de cobertura', icon: 'shield' },
            { name: 'Troca Garantida', description: '7 dias para devolução', icon: 'refresh' },
            { name: 'Instalação', description: 'Profissionais qualificados', icon: 'tools' },
            { name: 'Consultoria', description: 'Ajudamos você a escolher', icon: 'question-circle' },
          ],
        },
      },
      {
        type: 'about',
        title: 'Por que escolher a {{businessName}}?',
        content: {
          text: '{{businessDescription}}',
          image: 'https://images.unsplash.com/photo-1498049794561-4e21d87b865?w=800',
          features: [
            'Mais de 1000 produtos em estoque',
            'Preços imbatíveis',
            'Garantia em todos os produtos',
            'Entrega em até 24h',
          ],
        },
      },
      {
        type: 'contact',
        title: 'Fale Conosco',
        content: {
          address: '{{businessAddress}}',
          phone: '{{businessPhone}}',
          email: '{{businessEmail}}',
          hours: 'Seg-Sex: 9h-20h | Sáb: 9h-18h | Dom: 10h-16h',
          whatsapp: '{{businessPhone}}',
        },
      },
    ],
    footer: {
      copyright: '© 2026 {{businessName}}. Todos os direitos reservados.',
      links: [
        { label: 'WhatsApp', href: '#' },
        { label: 'Produtos', href: '#products' },
        { label: 'Política de Troca', href: '#' },
        { label: 'Garantia', href: '#' },
      ],
    },
  },
};

// ==================== LOJA DE BRINQUEDOS ====================
export const toyStoreTemplate: TemplateConfig = {
  id: 'toy-store-kids',
  businessType: 'TOY_STORE',
  style: 'ECOMMERCE',
  name: 'Brincar & Aprender',
  description: 'Loja de brinquedos com categorias por idade, brinquedos educativos e entrega rápida',
  thumbnail: '/templates/toy-store.png',
  defaultContent: {
    hero: {
      title: '{{businessName}}',
      subtitle: 'Onde a diversão encontra a aprendizagem',
      backgroundImage: 'https://images.unsplash.com/photo-1566576912321-3ec9fc44a41c?w=1200',
      ctaText: 'Ver Brinquedos',
      ctaLink: '#products',
    },
    sections: [
      {
        type: 'menu',
        title: 'Brinquedos por Idade',
        content: {
          categories: [
            {
              name: '0 a 2 Anos',
              items: [
                { name: 'Móbile Musical', price: 89.90, description: 'Estimulação visual e auditiva', age: '0-2 anos' },
                { name: 'Blocos de Madeira', price: 59.90, description: 'Conjunto com 50 peças', age: '1-3 anos' },
                { name: 'Pelúcia Macio', price: 49.90, description: 'Urso 30cm - Lavável', age: '0-2 anos' },
              ],
            },
            {
              name: '3 a 6 Anos',
              items: [
                { name: 'Lego Juniors', price: 129.90, description: 'Conjunto com 150 peças', age: '4-6 anos' },
                { name: 'Quebra-Cabeça 50pc', price: 39.90, description: 'Diversos temas', age: '3-5 anos' },
                { name: 'Bicicleta Infantil', price: 399.90, description: 'Roda de 16" com rodinhas', age: '4-6 anos' },
              ],
            },
            {
              name: '7 a 12 Anos',
              items: [
                { name: 'Video Game Portátil', price: 599.90, description: '1080p, 32GB', age: '8+ anos' },
                { name: 'Kit Robótica', price: 249.90, description: 'Monte seus robôs', age: '8-12 anos' },
                { name: 'Skate Completo', price: 299.90, description: 'Maple 7 camadas', age: '10+ anos' },
              ],
            },
          ],
        },
      },
      {
        type: 'services',
        title: 'Por que comprar conosco?',
        content: {
          services: [
            { name: 'Brinquedos Educativos', description: 'Seleção que estimula o desenvolvimento', icon: 'graduation-cap' },
            { name: 'Embalagem para Presente', description: 'Grátis para todas as idades', icon: 'gift' },
            { name: 'Troca Garantida', description: '30 dias para trocar', icon: 'refresh' },
            { name: 'Entrega no Dia', description: 'Para a região central', icon: 'truck' },
          ],
        },
      },
      {
        type: 'gallery',
        title: 'Nossos Brinquedos',
        content: {
          images: [
            'https://images.unsplash.com/photo-1566576912321-3ec9fc44a41c?w=600',
            'https://images.unsplash.com/photo-1515488042361-ee41e4f63b9?w=600',
            'https://images.unsplash.com/photo-1596461404969-9ae9c8aae0f8?w=600',
            'https://images.unsplash.com/photo-1563269873-3907b2d29944?w=600',
          ],
        },
      },
      {
        type: 'contact',
        title: 'Faça seu Pedido',
        content: {
          address: '{{businessAddress}}',
          phone: '{{businessPhone}}',
          email: '{{businessEmail}}',
          hours: 'Seg-Sex: 9h-20h | Sáb: 9h-18h | Dom: 10h-14h',
          whatsapp: '{{businessPhone}}',
        },
      },
    ],
    footer: {
      copyright: '© 2026 {{businessName}}. Todos os direitos reservados.',
      links: [
        { label: 'Instagram', href: '#' },
        { label: 'WhatsApp', href: '#' },
        { label: 'Brinquedos', href: '#products' },
        { label: 'Por Idade', href: '#products' },
      ],
    },
  },
};

// ==================== LOJA DE ARTIGOS ESPORTIVOS ====================
export const sportsStoreTemplate: TemplateConfig = {
  id: 'sports-store-champion',
  businessType: 'SPORTS_STORE',
  style: 'ECOMMERCE',
  name: 'Artigos Esportivos Champion',
  description: 'Loja completa de artigos esportivos com equipamentos, roupas e acessórios para diversas modalidades',
  thumbnail: '/templates/sports-store.png',
  defaultContent: {
    hero: {
      title: '{{businessName}}',
      subtitle: 'Equipe-se para a vitória',
      backgroundImage: 'https://images.unsplash.com/photo-1461896836934-47eafb40c30?w=1200',
      ctaText: 'Ver Produtos',
      ctaLink: '#products',
    },
    sections: [
      {
        type: 'menu',
        title: 'Equipamentos por Esporte',
        content: {
          categories: [
            {
              name: 'Futebol',
              items: [
                { name: 'Bola de Futebol', price: 129.90, description: 'Oficial FIFA' },
                { name: 'Chuteira Nike', price: 399.90, description: 'Campo, grama sintética' },
                { name: 'Uniforme Completo', price: 249.90, description: 'Camisa, calção e meiões' },
              ],
            },
            {
              name: 'Academia & Fitness',
              items: [
                { name: 'Kit Halteres', price: 299.90, description: '2kg a 10kg' },
                { name: 'Esteira Elétrica', price: 2499.00, description: '2.5HP, até 16km/h' },
                { name: 'Cama de Ginástica', price: 399.90, description: '90cm x 2m' },
              ],
            },
            {
              name: 'Natação',
              items: [
                { name: 'Óculos de Natação', price: 89.90, description: 'Lente antiembaçante' },
                { name: 'Cabo de Natação', price: 129.90, description: 'Resistente à cloro' },
                { name: 'Sunga Competição', price: 69.90, description: 'Tecnologia seco rápido' },
              ],
            },
          ],
        },
      },
      {
        type: 'services',
        title: 'Nossos Serviços',
        content: {
          services: [
            { name: 'Personal Trainer', description: 'Agende sessões personalizadas', icon: 'user' },
            { name: 'Customização de Uniformes', description: 'Estampe sua logo', icon: 'tshirt' },
            { name: 'Troca de Produtos', description: '30 dias garantidos', icon: 'refresh' },
            { name: 'Entrega para Academias', description: 'Parcerias especiais', icon: 'truck' },
          ],
        },
      },
      {
        type: 'about',
        title: 'Nossa Paixão pelo Esporte',
        content: {
          text: '{{businessDescription}}',
          image: 'https://images.unsplash.com/photo-1461896836934-47eafb40c30?w=800',
          features: [
            'Mais de 5000 produtos esportivos',
            'Marcas líderes no mercado',
            'Consultoria especializada',
          ],
        },
      },
      {
        type: 'contact',
        title: 'Visite Nossa Loja',
        content: {
          address: '{{businessAddress}}',
          phone: '{{businessPhone}}',
          email: '{{businessEmail}}',
          hours: 'Seg-Sex: 9h-20h | Sáb: 9h-18h | Dom: 10h-14h',
          whatsapp: '{{businessPhone}}',
        },
      },
    ],
    footer: {
      copyright: '© 2026 {{businessName}}. Todos os direitos reservados.',
      links: [
        { label: 'Instagram', href: '#' },
        { label: 'WhatsApp', href: '#' },
        { label: 'Futebol', href: '#products' },
        { label: 'Fitness', href: '#products' },
      ],
    },
  },
};

// ==================== AGÊNCIA DE VIAGENS ====================
export const travelAgencyTemplate: TemplateConfig = {
  id: 'travel-agency-explore',
  businessType: 'TRAVEL_AGENCY',
  style: 'BOOKING',
  name: 'Agência de Viagens Explore',
  description: 'Site para agências de viagens com pacotes turísticos, reservas de hotéis e pacotes personalizados',
  thumbnail: '/templates/travel-agency.png',
  defaultContent: {
    hero: {
      title: '{{businessName}}',
      subtitle: 'Realize o sonho da sua próxima viagem',
      backgroundImage: 'https://images.unsplash.com/photo-1488646953014-85cb44e20c88?w=1200',
      ctaText: 'Ver Pacotes',
      ctaLink: '#products',
    },
    sections: [
      {
        type: 'menu',
        title: 'Pacotes em Destaque',
        content: {
          categories: [
            {
              name: 'Praia & Sol',
              items: [
                { name: 'Porto de Galinhas 5 dias', price: 1899.00, description: 'Resort All Inclusive', nights: 4, people: '2 pessoas' },
                { name: 'Fernando de Noronha 7 dias', price: 3299.00, description: 'Pousada com café', nights: 6, people: '2 pessoas' },
                { name: 'Cancún 10 dias', price: 5999.00, description: 'Hotel 5 estrelas', nights: 9, people: '2 pessoas' },
              ],
            },
            {
              name: 'Turismo Cultural',
              items: [
                { name: 'Paris 7 dias', price: 4999.00, description: 'Hotel + City Tour + Louvre', nights: 6, people: '2 pessoas' },
                { name: 'Roma 5 dias', price: 3499.00, description: 'Vaticano + Coliseu', nights: 4, people: '2 pessoas' },
                { name: 'Machu Picchu 4 dias', price: 2499.00, description: 'Cuzco + Aguas Calientes', nights: 3, people: '2 pessoas' },
              ],
            },
          ],
        },
      },
      {
        type: 'services',
        title: 'Nossos Serviços',
        content: {
          services: [
            { name: 'Passagens Aéreas', description: 'Melhores tarifas garantidas', icon: 'plane' },
            { name: 'Hotéis & Resorts', description: 'Das pousadas ao 5 estrelas', icon: 'hotel' },
            { name: 'Seguro Viagem', description: 'Cobertura internacional', icon: 'shield' },
            { name: 'Aluguel de Carros', description: 'Todas as categorias', icon: 'car' },
          ],
        },
      },
      {
        type: 'testimonials',
        title: 'Clientes que já viajaram',
        content: {
          testimonials: [
            { name: 'Casal Silva', text: 'Viagem perfeita para Porto de Galinhas. Tudo impecável!', rating: 5 },
            { name: 'Família Santos', text: 'O pacote para Disney superou expectativas.', rating: 5 },
            { name: 'João Pereira', text: 'Melhor agência de viagens da cidade.', rating: 5 },
          ],
        },
      },
      {
        type: 'booking',
        title: 'Monte sua Viagem',
        content: {
          message: 'Conte-nos seu sonho e nós realizamos',
          phone: '{{businessPhone}}',
          whatsapp: '{{businessPhone}}',
          formFields: ['name', 'phone', 'email', 'destination', 'dates', 'people', 'budget'],
        },
      },
      {
        type: 'contact',
        title: 'Fale Conosco',
        content: {
          address: '{{businessAddress}}',
          phone: '{{businessPhone}}',
          email: '{{businessEmail}}',
          hours: 'Seg-Sex: 9h-19h | Sáb: 9h-13h',
          whatsapp: '{{businessPhone}}',
          emergencyPhone: '(11) 99999-9999',
        },
      },
    ],
    footer: {
      copyright: '© 2026 {{businessName}}. Todos os direitos reservados.',
      links: [
        { label: 'Instagram', href: '#' },
        { label: 'WhatsApp', href: '#' },
        { label: 'Pacotes', href: '#products' },
        { label: 'Destinos', href: '#products' },
      ],
    },
  },
};

// ==================== IMÓVEIS ====================
export const realEstateTemplate: TemplateConfig = {
  id: 'real-estate-premium',
  businessType: 'REAL_ESTATE',
  style: 'BOOKING',
  name: 'Imobiliária Premium',
  description: 'Portal de imóveis com busca avançada, tour virtual, agendamento de visitas e calculadora de financiamento',
  thumbnail: '/templates/real-estate.png',
  defaultContent: {
    hero: {
      title: '{{businessName}}',
      subtitle: 'Encontre o imóvel dos seus sonhos',
      backgroundImage: 'https://images.unsplash.com/photo-1564013799919-7cf2c6b86fa5?w=1200',
      ctaText: 'Buscar Imóveis',
      ctaLink: '#products',
    },
    sections: [
      {
        type: 'menu',
        title: 'Imóveis em Destaque',
        content: {
          categories: [
            {
              name: 'Venda - Casas',
              items: [
                { name: 'Casa 3 Quartos', price: 450000.00, description: 'Jardim das Flores - 150m²', beds: 3, baths: 2, area: '150m²' },
                { name: 'Casa em Condomínio', price: 680000.00, description: 'Alphaville - 200m²', beds: 4, baths: 3, area: '200m²' },
                { name: 'Casa de Luxo', price: 1200000.00, description: 'Beira Mar - 350m²', beds: 5, baths: 4, area: '350m²' },
              ],
            },
            {
              name: 'Venda - Apartamentos',
              items: [
                { name: 'Ap 2 Quartos', price: 280000.00, description: 'Centro - 70m²', beds: 2, baths: 1, area: '70m²' },
                { name: 'Ap 3 Quartos', price: 420000.00, description: 'Moema - 110m²', beds: 3, baths: 2, area: '110m²' },
                { name: 'Cobertura', price: 890000.00, description: 'Jardins - 180m²', beds: 4, baths: 3, area: '180m²' },
              ],
            },
            {
              name: 'Locação',
              items: [
                { name: 'Ap para Locação', price: 2500.00, description: 'Pinheiros - 80m²', beds: 2, baths: 1, area: '80m²' },
                { name: 'Casa para Locação', price: 3500.00, description: 'Perdizes - 120m²', beds: 3, baths: 2, area: '120m²' },
                { name: 'Kitnet Mobiliada', price: 1200.00, description: 'Centro - 35m²', beds: 1, baths: 1, area: '35m²' },
              ],
            },
          ],
        },
      },
      {
        type: 'services',
        title: 'Nossos Serviços',
        content: {
          services: [
            { name: 'Avaliação Gratuita', description: 'Saiba o valor do seu imóvel', icon: 'calculator' },
            { name: 'Financiamento', description: 'Parcerias com os principais bancos', icon: 'bank' },
            { name: 'Documentação', description: 'Cuidamos de toda a burocracia', icon: 'file-contract' },
            { name: 'Tour Virtual', description: 'Conheça sem sair de casa', icon: 'vr-cardboard' },
          ],
        },
      },
      {
        type: 'about',
        title: 'Sobre Nossa Imobiliária',
        content: {
          text: '{{businessDescription}}',
          image: 'https://images.unsplash.com/photo-1564013799919-7cf2c6b86fa5?w=800',
          stats: [
            { number: '1000+', label: 'Imóveis Vendidos' },
            { number: '15+', label: 'Anos no Mercado' },
            { number: '98%', label: 'Clientes Satisfeitos' },
          ],
        },
      },
      {
        type: 'booking',
        title: 'Agende uma Visita',
        content: {
          message: 'Conheça seu futuro imóvel pessoalmente',
          phone: '{{businessPhone}}',
          whatsapp: '{{businessPhone}}',
          formFields: ['name', 'phone', 'email', 'property-type', 'neighborhood', 'budget', 'date'],
        },
      },
      {
        type: 'contact',
        title: 'Visite nosso Escritório',
        content: {
          address: '{{businessAddress}}',
          phone: '{{businessPhone}}',
          email: '{{businessEmail}}',
          hours: 'Seg-Sex: 9h-18h | Sáb: 9h-13h',
          whatsapp: '{{businessPhone}}',
        },
      },
    ],
    footer: {
      copyright: '© 2026 {{businessName}}. Todos os direitos reservados.',
      links: [
        { label: 'WhatsApp', href: '#' },
        { label: 'Comprar', href: '#products' },
        { label: 'Alugar', href: '#products' },
        { label: 'Avaliação', href: '#services' },
      ],
    },
  },
};

// ==================== CONFEITARIA ====================
export const confectioneryTemplate: TemplateConfig = {
  id: 'confectionery-sweet',
  businessType: 'CONFECTIONERY',
  style: 'ECOMMERCE',
  name: 'Confeitaria Doce Encanto',
  description: 'Loja de doces finos, bombons, guloseimas e personalização de embalagens para presentes',
  thumbnail: '/templates/confectionery.png',
  defaultContent: {
    hero: {
      title: '{{businessName}}',
      subtitle: 'Onde cada doce é uma obra de arte',
      backgroundImage: 'https://images.unsplash.com/photo-1578985545062-69928ae9adec?w=1200',
      ctaText: 'Ver Doces',
      ctaLink: '#products',
    },
    sections: [
      {
        type: 'menu',
        title: 'Nossas Delícias',
        content: {
          categories: [
            {
              name: 'Brigadeiros Gourmet',
              items: [
                { name: 'Brigadeiro Tradicional', price: 5.90, description: 'Cacau belga 70%' },
                { name: 'Brigadeiro de Ninho', price: 6.90, description: 'Com pérolas de chocolate' },
                { name: 'Brigadeiro de Café', price: 6.90, description: 'Para os amantes de café' },
                { name: 'Brigadeiro Vegano', price: 7.90, description: 'Sem derivados de leite' },
              ],
            },
            {
              name: 'Bombons Finos',
              items: [
                { name: 'Bombom de Morango', price: 8.90, description: 'Chocolate branco e morango' },
                { name: 'Bombom Trufado', price: 9.90, description: 'Recheio cremoso' },
                { name: 'Bombom de Licor', price: 10.90, description: 'Toque especial de licor' },
              ],
            },
            {
              name: 'Caixas Presente',
              items: [
                { name: 'Caixa Pequena', price: 29.90, description: '6 unidades' },
                { name: 'Caixa Média', price: 59.90, description: '12 unidades' },
                { name: 'Caixa Grande', price: 99.90, description: '24 unidades' },
              ],
            },
          ],
        },
      },
      {
        type: 'services',
        title: 'Serviços Especiais',
        content: {
          services: [
            { name: 'Personalização', description: 'Embalagens com sua logo', icon: 'tag' },
            { name: 'Eventos', description: 'Bem-casados e bombons para casamentos', icon: 'ring' },
            { name: 'Assinatura Doce', description: 'Receba todo mês em casa', icon: 'refresh' },
            { name: 'Entrega Expressa', description: 'Em até 2 horas', icon: 'truck' },
          ],
        },
      },
      {
        type: 'gallery',
        title: 'Nossos Doces',
        content: {
          images: [
            'https://images.unsplash.com/photo-1578985545062-69928ae9adec?w=600',
            'https://images.unsplash.com/photo-1551024601-bec78daa7d3b?w=600',
            'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=600',
            'https://images.unsplash.com/photo-1589718465724-853566c97011?w=600',
          ],
        },
      },
      {
        type: 'contact',
        title: 'Faça seu Pedido',
        content: {
          address: '{{businessAddress}}',
          phone: '{{businessPhone}}',
          email: '{{businessEmail}}',
          hours: 'Seg-Sex: 9h-19h | Sáb: 9h-17h | Dom: 10h-15h',
          whatsapp: '{{businessPhone}}',
          deliveryAreas: 'Entrega em toda a cidade',
        },
      },
    ],
    footer: {
      copyright: '© 2026 {{businessName}}. Todos os direitos reservados.',
      links: [
        { label: 'Instagram', href: '#' },
        { label: 'WhatsApp', href: '#' },
        { label: 'Doces', href: '#products' },
        { label: 'Eventos', href: '#services' },
      ],
    },
  },
};

// Export all new templates
export const newBusinessTemplates: TemplateConfig[] = [
  bakeryTemplate,
  pharmacyTemplate,
  petShopTemplate,
  bookstoreTemplate,
  floristTemplate,
  cleaningServiceTemplate,
  automotiveTemplate,
  electronicsTemplate,
  toyStoreTemplate,
  sportsStoreTemplate,
  travelAgencyTemplate,
  realEstateTemplate,
  confectioneryTemplate,
];

// Helper to get template by business type
export function getTemplateForBusinessType(businessType: string): TemplateConfig | undefined {
  return newBusinessTemplates.find(t => t.businessType === businessType);
}
