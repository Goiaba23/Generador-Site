# SaaS Sites Platform

Plataforma SaaS para criação de sites profissionais para comércios e empresas que não têm site ou presença online.

## Funcionalidades

### 🎨 Template Pronto (2 minutos)
- Site profissional baseado no tipo de comércio
- Design otimizado para cada nicho
- Personalização básica de cores e textos

### 🤖 IA Personalizada
- IA faz perguntas sobre seu negócio
- Entende problemas e objetivos (agendamentos, vendas, visibilidade)
- Gera site 100% único e alinhado com sua marca

## 30+ Tipos de Comércios Suportados

### Food & Beverage
- 🍔 Restaurante/Hamburgueria
- 🍸 Bar/Lounge
- 🍕 Pizzaria
- 🍣 Sushi/Japanese
- 🥩 Steakhouse/Churrascaria
- 🍦 Ice Cream/Sorveteria
- 🥐 Cervejaria Artesanal
- 🍞 Bakery/Confeitaria
- 🍬 Confeitaria (Doces)

### Services
- ✂️ Barbearia
- 💇 Salão de Beleza
- 💆 Spa & Wellness
- 💪 Academia/Gym
- 🧘 Yoga Studio
- 💃 Dance Studio

### Retail & Shops
- 🛒 Loja em geral
- 🐕 Pet Shop
- 📚 Livraria
- 🌸 Floricultura
- 🧸 Loja de Brinquedos
- 📱 Loja de Eletrônicos
- 👔 Loja de Roupas
- 💍 Joalheria

### Health & Wellness
- 💊 Farmácia
- 🏥 Clínica Médica
- 🦷 Dentista
- 👓 Optica
- 🥗 Nutricionista

### Home & Services
- 🧹 Serviço de Limpeza
- 🛁 Encanador
- ⚡️ Eletricista
- 🌳 Paisagismo
- 🚛 Mudanças

### Automotive
- 🔧 Oficina/Autopeças
- 🚗 Lavagem de Carros
- 🛞 Pneus/Tire Shop
- 🔩 Detailing/Estética Automotiva

### Other
- ✈️ Agência de Viagens
- 🏠 Imobiliária
- 📸 Eventos
- 📷 Fotógrafo

## Arquitetura

- **Frontend**: Next.js 15 (App Router) + TypeScript + Tailwind CSS
- **Backend**: Next.js API Routes
- **Database**: PostgreSQL + Prisma ORM
- **AI**: OpenAI GPT-4o para geração dinâmica
- **Auth**: NextAuth.js
- **Deploy**: Vercel

## Design Baseado em Pesquisa

Cada template é cuidadosamente desenhado baseado em pesquisa de mercado:

- **Padaria/Confeitaria**: Cores quentes (amarelo, laranja), fontes acolhedoras, foco em produtos artesanais
- **Loja de Eletrônicos**: Cores frias (azul, cinza), fontes modernas, layout minimalista
- **Barbearia**: Cores neutras (preto, cinza, madeira), fontes clássicas, foco em portfólio
- **Farmácia**: Cores de confiança (azul, branco), fontes limpas, foco em saúde
- **Pet Shop**: Cores alegres (verde, laranja), fontes divertidas, foco em serviços
- **Yoga/Spa**: Cores zen (verde, bege), fontes calmas, foco em bem-estar

## Objetivos e Funcionalidades

O sistema mapeia objetivos para funcionalidades específicas:

| Objetivo | Funcionalidade | CTA Principal |
|-----------|---------------|------------------|
| Agendamentos | Sistema de booking, formulários, WhatsApp | "Agendar Horário" |
| Vendas Online | E-commerce, carrinho, pagamentos | "Comprar Agora" |
| Visibilidade | SEO otimizado, Google Maps, redes sociais | "Ver Localização" |
| Leads | Formulários de contato, WhatsApp, newsletter | "Fale Conosco" |
| Portfólio | Galeria de fotos, depoimentos | "Ver Trabalhos" |

## Espaços para Imagens

Cada template tem espaços estrategicamente posicionados para imagens:
- **Hero Section**: Imagem de fundo em full-screen
- **About Section**: Imagem lateral com texto
- **Gallery Section**: Grid de imagens do negócio
- **Services Section**: Ícones ou imagens para cada serviço
- **Menu/Products**: Imagens para cada item do cardápio/produto

## Deploy no Vercel

### 1. Preparação
```bash
cd saas-sites
npm install
cp .env.local .env.local.example
```

### 2. Configurar Banco de Dados
- Opção 1: Vercel Postgres (recomendado)
- Opção 2: Neon.tech (grátis)
- Opção 3: Supabase

### 3. Deploy
```bash
# Instalar Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
vercel --prod
```

### 4. Configurar Variáveis de Ambiente
No dashboard da Vercel:
- `DATABASE_URL`: URL do seu banco PostgreSQL
- `OPENAI_API_KEY`: Sua chave da OpenAI
- `NEXTAUTH_SECRET`: Gere com `openssl rand -base64 32`

## Desenvolvimento Local

```bash
# Instalar dependências
npm install

# Configurar banco de dados
npx prisma migrate dev
npx prisma generate

# Rodar dev server
npm run dev
```

Acesse: http://localhost:3000

## Estrutura do Projeto

```
saas-sites/
├── src/
│   ├── app/
│   │   ├── page.tsx          # Página inicial
│   │   ├── create/           # Criação de sites (2 opções)
│   │   ├── dashboard/       # Dashboard do cliente
│   │   ├── preview/        # Preview de sites
│   │   └── api/              # API Routes
│   │       └── sites/         # Gerenciamento de sites
│   ├── lib/
│   │   ├── templates.ts        # Templates básicos
│   │   ├── templates-v2.ts    # 14+ templates expandidos
│   │   ├── templates-v3-massive.ts # 30+ templates massivos
│   │   ├── ai-generator.ts    # IA de geração
│   │   └── ai-conversational.ts # IA conversacional
│   └── components/          # Componentes React
├── prisma/
│   └── schema.prisma     # Schema do banco (30+ tipos)
├── public/
│   └── templates/          # Imagens de preview
└── package.json
```

## Licença

MIT

## Contato

Para suporte: contato@saas-sites.com
WhatsApp: (11) 99999-9999
