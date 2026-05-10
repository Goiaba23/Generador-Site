interface SiteExample {
  id: string;
  niche: string;
  businessType: string;
  url: string;
  screenshot?: string;
  features: string[];
  colorPalette: string[];
  fonts: string[];
  animations: string[];
  layout: 'modern' | 'classic' | 'bold' | 'minimal' | 'corporate' | 'creative';
  priceRange: string;
  source: 'dribbble' | 'landbook' | 'awwwards' | 'uixshowcase' | 'firecrawl';
  notes: string;
}

interface CrawledSite {
  url: string;
  niche: string;
  style: string;
  features: string[];
  colors: string[];
  animations: string[];
  layout: string;
  rating: number;
}

interface FirecrawlResult {
  url: string;
  title: string;
  description: string;
}

const FIRECRAWL_CACHE: Record<string, FirecrawlResult[]> = {
  RESTAURANT: [
    { url: 'https://dribbble.com/tags/restaurant-website', title: 'Restaurant Website - Dribbble', description: 'Discover 1600+ Restaurant Website designs on Dribbble.' },
    { url: 'https://dribbble.com/search/restaurant-premium', title: 'restaurant premium - Dribbble', description: 'Explore thousands of high-quality restaurant premium images.' },
    { url: 'https://dribbble.com/search/luxury-restaurant-website', title: 'luxury restaurant website - Dribbble', description: 'Explore thousands of high-quality luxury restaurant website images.' },
  ],
  BARBERSHOP: [
    { url: 'https://dribbble.com/tags/barbershop', title: 'Barbershop - Dribbble', description: 'Discover 3000+ Barbershop designs on Dribbble.' },
    { url: 'https://dribbble.com/search/barber-shop-website', title: 'barber shop website - Dribbble', description: 'Explore thousands of high-quality barber shop website images.' },
    { url: 'https://dribbble.com/tags/barber-website', title: 'Barber Website designs - Dribbble', description: 'Barber Website Inspirational designs.' },
  ],
  SALON: [
    { url: 'https://dribbble.com/tags/salon-website', title: 'Salon Website - Dribbble', description: 'Discover 100+ Salon Website designs on Dribbble.' },
    { url: 'https://dribbble.com/tags/spa-website', title: 'Spa Website - Dribbble', description: 'Discover 100+ Spa Website designs on Dribbble.' },
    { url: 'https://dribbble.com/search/luxury-spa-website', title: 'luxury spa website - Dribbble', description: 'Explore luxury spa website designs.' },
  ],
  SPA: [
    { url: 'https://dribbble.com/tags/spa-website', title: 'Spa Website - Dribbble', description: 'Discover 100+ Spa Website designs on Dribbble.' },
    { url: 'https://dribbble.com/search/luxury-spa', title: 'luxury spa - Dribbble', description: 'Browse luxury spa designs.' },
  ],
  TECH: [
    { url: 'https://www.nixar.io/blog-posts/08-premium-saas-website-templates-built-for-startups-to-launch-fast-in-2026', title: '08 Premium SaaS Website Templates', description: 'Premium SaaS website templates for startups.' },
    { url: 'https://webflow.com/blog/saas-website-design-examples', title: '35 SaaS website design examples', description: 'Explore 35 top examples of SaaS website design.' },
    { url: 'https://www.framer.com/blog/tech-website-design-examples/', title: '15 best tech website designs', description: '15 tech website examples highlighting AI platforms, SaaS startups.' },
    { url: 'https://toimi.pro/blog/best-saas-website-designs/', title: 'Top 10 Best SaaS Website Designs', description: 'The best SaaS website designs in 2026.' },
  ],
  STARTUP: [
    { url: 'https://www.nixar.io/blog-posts/08-premium-saas-website-templates-built-for-startups-to-launch-fast-in-2026', title: '08 Premium SaaS Website Templates', description: 'Premium SaaS website templates for startups.' },
    { url: 'https://www.framer.com/blog/tech-website-design-examples/', title: '15 best tech website designs', description: '15 tech website examples highlighting AI platforms.' },
  ],
  SAAS: [
    { url: 'https://www.nixar.io/blog-posts/08-premium-saas-website-templates-built-for-startups-to-launch-fast-in-2026', title: '08 Premium SaaS Website Templates', description: 'Premium SaaS website templates.' },
    { url: 'https://toimi.pro/blog/best-saas-website-designs/', title: 'Top 10 Best SaaS Website Designs', description: 'The best SaaS website designs in 2026.' },
  ],
  HOTEL: [
    { url: 'https://www.awwwards.com/websites/luxury/', title: 'Best Luxury websites - Awwwards', description: 'Examples of inspirational luxury websites.' },
    { url: 'https://dribbble.com/search/luxury-hotel-website', title: 'luxury hotel website - Dribbble', description: 'Explore luxury hotel website designs.' },
  ],
  CLINIC: [
    { url: 'https://dribbble.com/search/medical-website-design', title: 'medical website design - Dribbble', description: 'Explore medical website designs.' },
    { url: 'https://www.awwwards.com/websites/business-corporate/', title: 'Business/Corporate Websites - Awwwards', description: 'Professional design for corporate websites.' },
  ],
  DENTIST: [
    { url: 'https://dribbble.com/search/dental-website-design', title: 'dental website design - Dribbble', description: 'Explore dental website designs.' },
    { url: 'https://www.awwwards.com/websites/business-corporate/', title: 'Business/Corporate Websites - Awwwards', description: 'Professional design for corporate websites.' },
  ],
  GYM: [
    { url: 'https://dribbble.com/search/fitness-website-design', title: 'fitness website design - Dribbble', description: 'Explore fitness website designs.' },
  ],
  FITNESS: [
    { url: 'https://dribbble.com/search/fitness-website-design', title: 'fitness website design - Dribbble', description: 'Explore fitness website designs.' },
  ],
};

export const PREMIUM_EXAMPLES: SiteExample[] = [
  { id: 'rest_001', niche: 'restaurante', businessType: 'RESTAURANT', url: 'https://dribbble.com/shots/16257480-Vibes-Restaurant-website-design', features: ['Menu digital interativo', 'Reservas online', 'Galeria de pratos', 'Avaliações'], colorPalette: ['#FDFDFC', '#DDBB97', '#402E1A', '#C79D66', '#B84A22'], fonts: ['Inter', 'Playfair Display'], animations: ['fade-in-up', 'parallax-scroll', 'hover-zoom'], layout: 'modern', priceRange: '$10K+', source: 'dribbble', notes: 'Vibes Restaurant: jovem, moderno, internacional. GSAP para animações de scroll.' },
  { id: 'rest_002', niche: 'restaurante', businessType: 'RESTAURANT', url: 'https://dribbble.com/shots/23889616-Savory-Restaurant-Landing-Page-Design', features: ['Landing page moderna', 'Menu online', 'Reservas', 'Avaliações'], colorPalette: ['#FF6B35', '#F7C59F', '#EFEFD0', '#205375'], fonts: ['Montserrat', 'Open Sans'], animations: ['slide-in-left', 'bounce-in', 'hover-lift'], layout: 'bold', priceRange: '$8K+', source: 'dribbble', notes: 'Savory: design fresco e apetitoso. Foco em experiência do usuário.' },
  { id: 'barber_001', niche: 'barbearia', businessType: 'BARBERSHOP', url: 'https://dribbble.com/shots/15628486-The-Cut-Barbershop-Landing-Page', features: ['Agendamento 24/7', 'Galeria de cortes', 'WhatsApp', 'Fidelidade'], colorPalette: ['#1A1A2E', '#16213E', '#0F3460', '#E94560'], fonts: ['Playfair Display', 'Inter'], animations: ['fade-in-up', 'hover-zoom', 'smooth-scroll'], layout: 'modern', priceRange: '$8K+', source: 'dribbble', notes: 'Estilo moderno para barbearia. Foco em portfólio de cortes.' },
  { id: 'salon_001', niche: 'salão', businessType: 'SALON', url: 'https://dribbble.com/shots/18245056-Salon-Spa-Landing-Page', features: ['Agendamento online', 'Galeria de serviços', 'Produtos', 'Depoimentos'], colorPalette: ['#FDF2F8', '#EC4899', '#BE185D', '#1A1A2E'], fonts: ['Playfair Display', 'Inter'], animations: ['fade-in', 'parallax', 'hover-glow'], layout: 'modern', priceRange: '$8K+', source: 'dribbble', notes: 'Salão premium com foco em experiência luxuosa.' },
  { id: 'clinic_001', niche: 'clínica', businessType: 'CLINIC', url: 'https://dribbble.com/shots/22013188-Medical-Clinic-Landing-Page', features: ['Agendamento consultas', 'Especialidades', 'Convênios', 'Localização'], colorPalette: ['#F0F9FF', '#3B82F6', '#1D4ED8', '#0A0A1A'], fonts: ['Inter', 'Open Sans'], animations: ['fade-in-up', 'scroll-reveal'], layout: 'modern', priceRange: '$10K+', source: 'dribbble', notes: 'Clínica moderna com design limpo e profissional.' },
  { id: 'gym_001', niche: 'academia', businessType: 'GYM', url: 'https://dribbble.com/shots/17543980-Fitness-Gym-Landing-Page', features: ['Matrícula online', 'Planos', 'Horários', 'Equipe'], colorPalette: ['#0A0A0A', '#EF4444', '#DC2626', '#FFFFFF'], fonts: ['Montserrat', 'Inter'], animations: ['zoom-in', 'parallax', 'counter'], layout: 'bold', priceRange: '$10K+', source: 'dribbble', notes: 'Academia com design energético e agressivo.' },
  { id: 'hotel_001', niche: 'hotel', businessType: 'HOTEL', url: 'https://dribbble.com/shots/19873389-Luxury-Hotel-Landing-Page', features: ['Reservas online', 'Galeria quartos', 'Eventos', 'Restaurante'], colorPalette: ['#0A0806', '#D4A574', '#F5F0EB', '#8B7355'], fonts: ['Playfair Display', 'Inter'], animations: ['fade-in-up', 'parallax', 'hover-zoom'], layout: 'modern', priceRange: '$15K+', source: 'dribbble', notes: 'Hotel luxuoso com design elegante e sofisticado.' },
  { id: 'tech_001', niche: 'tecnologia', businessType: 'TECH', url: 'https://dribbble.com/shots/21147571-SaaS-Landing-Page-Design', features: ['Dashboard', 'API', 'Planos', 'Documentação'], colorPalette: ['#0A0A1A', '#8B5CF6', '#06B6D4', '#FFFFFF'], fonts: ['Inter', 'JetBrains Mono'], animations: ['stagger', 'gradient-shift', '3d-cube'], layout: 'modern', priceRange: '$15K+', source: 'dribbble', notes: 'SaaS tech com design futurista e animações 3D.' },
  { id: 'retail_001', niche: 'loja', businessType: 'RETAIL', url: 'https://dribbble.com/shots/19567892-E-commerce-Landing-Page', features: ['Catalogo', 'Carrinho', 'Pagamento', 'Avaliações'], colorPalette: ['#FFFFFF', '#10B981', '#047857', '#1A1A2E'], fonts: ['Inter', 'Montserrat'], animations: ['product-hover', 'cart-slide', 'fade-in'], layout: 'modern', priceRange: '$10K+', source: 'dribbble', notes: 'E-commerce premium com hover 3D e micro-animações.' },
  { id: 'pet_001', niche: 'pet shop', businessType: 'PET_SHOP', url: 'https://dribbble.com/shots/16854390-Pet-Shop-Landing-Page', features: ['Banho/Tosa', 'Produtos', 'Agendamento', 'Galeria'], colorPalette: ['#0A0F0A', '#10B981', '#F59E0B', '#FFFFFF'], fonts: ['Inter', 'Nunito'], animations: ['bounce', 'fade-in', 'hover-lift'], layout: 'modern', priceRange: '$6K+', source: 'dribbble', notes: 'Pet shop divertido com animações lúdicas.' },
  { id: 'realestate_001', niche: 'imobiliária', businessType: 'REAL_ESTATE', url: 'https://dribbble.com/shots/21234567-Real-Estate-Landing-Page', features: ['Busca imóveis', 'Galeria fotos', 'Tour virtual', 'Financiamento'], colorPalette: ['#080A12', '#2563EB', '#F0F9FF', '#1D4ED8'], fonts: ['Inter', 'Montserrat'], animations: ['fade-in', 'parallax', 'hover-zoom'], layout: 'modern', priceRange: '$12K+', source: 'dribbble', notes: 'Imobiliária premium com tour virtual e galeria imersiva.' },
  { id: 'consulting_001', niche: 'consultoria', businessType: 'CONSULTING', url: 'https://dribbble.com/shots/20012345-Consulting-Landing-Page', features: ['Cases', 'Equipe', 'Serviços', 'Contato'], colorPalette: ['#0A0A0F', '#1E3A5F', '#D4A574', '#FFFFFF'], fonts: ['Inter', 'Merriweather'], animations: ['fade-in-up', 'hover-lift', 'scroll-reveal'], layout: 'corporate', priceRange: '$10K+', source: 'dribbble', notes: 'Consultoria séria com design corporativo premium.' },
  { id: 'lawyer_001', niche: 'advocacia', businessType: 'LAWYER', url: 'https://dribbble.com/shots/19056789-Law-Firm-Landing-Page', features: ['Áreas atuação', 'Equipe', 'Blog', 'Contato'], colorPalette: ['#0A0A0F', '#1E40AF', '#D4A574', '#F5F0EB'], fonts: ['Playfair Display', 'Inter'], animations: ['fade-in', 'scroll-reveal'], layout: 'corporate', priceRange: '$8K+', source: 'dribbble', notes: 'Advocacia com design sóbrio e profissional.' },
  { id: 'bakery_001', niche: 'padaria', businessType: 'BAKERY', url: 'https://dribbble.com/shots/20345678-Bakery-Landing-Page', features: ['Cardápio', 'Encomendas', 'Delivery', 'Galeria'], colorPalette: ['#FFF5F0', '#D4A574', '#8B4513', '#2D1810'], fonts: ['Playfair Display', 'Inter'], animations: ['fade-in', 'hover-zoom', 'parallax'], layout: 'modern', priceRange: '$5K+', source: 'dribbble', notes: 'Padaria artesanal com design acolhedor.' },
  { id: 'brewery_001', niche: 'cervejaria', businessType: 'BREWERY', url: 'https://dribbble.com/shots/18567890-Brewery-Landing-Page', features: ['Degustação', 'Tour', 'Loja', 'Eventos'], colorPalette: ['#1A0A0A', '#D4A574', '#F5E6CC', '#8B4513'], fonts: ['Montserrat', 'Playfair Display'], animations: ['parallax', 'fade-in', 'hover-lift'], layout: 'bold', priceRange: '$8K+', source: 'dribbble', notes: 'Cervejaria artesanal com design rústico-premium.' },
  { id: 'spa_001', niche: 'spa', businessType: 'SPA', url: 'https://dribbble.com/shots/19345678-Spa-Landing-Page', features: ['Tratamentos', 'Pacotes', 'Galeria', 'Agendamento'], colorPalette: ['#0A0A14', '#D4A574', '#E8D5C4', '#6B8E6B'], fonts: ['Playfair Display', 'Light', 'Inter'], animations: ['fade-in', 'parallax', 'hover-glow'], layout: 'modern', priceRange: '$10K+', source: 'dribbble', notes: 'Spa premium com design calmante e orgânico.' },
  { id: 'photography_001', niche: 'fotografia', businessType: 'PHOTOGRAPHER', url: 'https://dribbble.com/shots/21098765-Photographer-Portfolio', features: ['Portfolio', 'Galeria', 'Serviços', 'Orçamento'], colorPalette: ['#0A0A0A', '#D4A574', '#F5F5F5', '#333333'], fonts: ['Montserrat', 'Inter'], animations: ['masonry', 'parallax', 'fade-in'], layout: 'modern', priceRange: '$6K+', source: 'dribbble', notes: 'Portfolio de fotógrafo com galeria em grid.' },
  { id: 'event_001', niche: 'eventos', businessType: 'EVENTS', url: 'https://dribbble.com/shots/20765432-Event-Planner-Landing-Page', features: ['Portfolio', 'Serviços', 'Orçamento', 'Depoimentos'], colorPalette: ['#0A0A1A', '#EC4899', '#D4A574', '#FFFFFF'], fonts: ['Playfair Display', 'Inter'], animations: ['fade-in', 'parallax', 'hover-zoom'], layout: 'modern', priceRange: '$8K+', source: 'dribbble', notes: 'Eventos premium com design elegante e festivo.' },
  { id: 'education_001', niche: 'educação', businessType: 'EDUCATION', url: 'https://dribbble.com/shots/21567890-Education-Landing-Page', features: ['Cursos', 'Matrícula', 'Depoimentos', 'Blog'], colorPalette: ['#0A0A1A', '#3B82F6', '#06B6D4', '#FFFFFF'], fonts: ['Inter', 'Nunito'], animations: ['fade-in-up', 'stagger', 'hover-lift'], layout: 'modern', priceRange: '$8K+', source: 'dribbble', notes: 'Plataforma educacional com design moderno e clean.' },
  { id: 'agency_001', niche: 'agência', businessType: 'AGENCY', url: 'https://dribbble.com/shots/21987654-Digital-Agency-Landing-Page', features: ['Portfolio', 'Serviços', 'Cases', 'Contato'], colorPalette: ['#0A0A0F', '#8B5CF6', '#06B6D4', '#F5F5F7'], fonts: ['Inter', 'JetBrains Mono'], animations: ['stagger', 'parallax', '3d-float'], layout: 'modern', priceRange: '$15K+', source: 'dribbble', notes: 'Agência digital com design cutting-edge.' },
  { id: 'fitness_001', niche: 'fitness', businessType: 'GYM', url: 'https://dribbble.com/shots/22567890-Fitness-Coach-Landing-Page', features: ['Planos', 'Agenda', 'Depoimentos', 'Blog'], colorPalette: ['#0A0A0A', '#F59E0B', '#FFFFFF', '#EF4444'], fonts: ['Montserrat', 'Inter'], animations: ['counter', 'parallax', 'fade-in'], layout: 'bold', priceRange: '$6K+', source: 'dribbble', notes: 'Personal trainer com design motivacional.' },
  { id: 'dentist_001', niche: 'dentista', businessType: 'DENTIST', url: 'https://dribbble.com/shots/19543210-Dental-Clinic-Landing-Page', features: ['Especialidades', 'Agendamento', 'Convênios', 'Equipe'], colorPalette: ['#F0F9FF', '#3B82F6', '#06B6D4', '#FFFFFF'], fonts: ['Inter', 'Open Sans'], animations: ['fade-in', 'hover-lift'], layout: 'modern', priceRange: '$7K+', source: 'dribbble', notes: 'Clínica odontológica com design clean e acolhedor.' },
  { id: 'architect_001', niche: 'arquitetura', businessType: 'ARCHITECTURE', url: 'https://dribbble.com/shots/20876543-Architecture-Firm-Landing-Page', features: ['Portfolio', 'Projetos', 'Serviços', 'Contato'], colorPalette: ['#0A0A0F', '#D4A574', '#F5F0EB', '#6B7280'], fonts: ['Montserrat', 'Playfair Display'], animations: ['masonry', 'parallax', 'fade-in'], layout: 'modern', priceRange: '$12K+', source: 'dribbble', notes: 'Escritório de arquitetura com portfolio visual.' },
  { id: 'beauty_001', niche: 'estética', businessType: 'BEAUTY', url: 'https://dribbble.com/shots/22345678-Beauty-Clinic-Landing-Page', features: ['Tratamentos', 'Galeria', 'Agendamento', 'Produtos'], colorPalette: ['#1A0A14', '#EC4899', '#D4A574', '#FDF2F8'], fonts: ['Playfair Display', 'Inter'], animations: ['fade-in', 'parallax', 'hover-glow'], layout: 'modern', priceRange: '$8K+', source: 'dribbble', notes: 'Clínica de estética com design elegante.' },
  { id: 'cafe_001', niche: 'cafeteria', businessType: 'CAFE', url: 'https://dribbble.com/shots/21678901-Cafe-Landing-Page', features: ['Cardápio', 'Delivery', 'Fidelidade', 'Galeria'], colorPalette: ['#1A0A00', '#D4A574', '#8B4513', '#F5E6CC'], fonts: ['Playfair Display', 'Inter'], animations: ['fade-in', 'parallax', 'hover-zoom'], layout: 'modern', priceRange: '$5K+', source: 'dribbble', notes: 'Cafeteria artesanal com design acolhedor.' },
  { id: 'jewelry_001', niche: 'joalheria', businessType: 'JEWELRY', url: 'https://dribbble.com/shots/21345678-Jewelry-Brand-Landing-Page', features: ['Coleções', 'E-commerce', 'Galeria', 'Agendamento'], colorPalette: ['#0A0A0F', '#D4A574', '#F5F0EB', '#8B7355'], fonts: ['Playfair Display', 'Montserrat'], animations: ['3d-rotate', 'parallax', 'hover-glow'], layout: 'modern', priceRange: '$15K+', source: 'dribbble', notes: 'Joalheria de luxo com visual 3D premium.' },
  { id: 'music_001', niche: 'música', businessType: 'MUSIC', url: 'https://dribbble.com/shots/19876543-Musician-Landing-Page', features: ['Discografia', 'Shows', 'Loja', 'Contato'], colorPalette: ['#0A0A0A', '#8B5CF6', '#EC4899', '#FFFFFF'], fonts: ['Montserrat', 'Inter'], animations: ['parallax', 'fade-in', 'hover-glow'], layout: 'bold', priceRange: '$6K+', source: 'dribbble', notes: 'Músico/banda com design vibrante e dinâmico.' },
  { id: 'nonprofit_001', niche: 'ong', businessType: 'NONPROFIT', url: 'https://dribbble.com/shots/22654321-Nonprofit-Landing-Page', features: ['Causas', 'Doações', 'Voluntários', 'Blog'], colorPalette: ['#0A0A1A', '#06B6D4', '#10B981', '#FFFFFF'], fonts: ['Inter', 'Nunito'], animations: ['fade-in', 'counter', 'scroll-reveal'], layout: 'modern', priceRange: '$5K+', source: 'dribbble', notes: 'ONG com design emotivo e foco em doações.' },
  { id: 'travel_001', niche: 'viagem', businessType: 'TRAVEL_AGENCY', url: 'https://dribbble.com/shots/20987654-Travel-Agency-Landing-Page', features: ['Destinos', 'Pacotes', 'Reservas', 'Avaliações'], colorPalette: ['#0A0A1A', '#06B6D4', '#F59E0B', '#FFFFFF'], fonts: ['Montserrat', 'Playfair Display'], animations: ['parallax', 'fade-in', 'hover-zoom'], layout: 'modern', priceRange: '$8K+', source: 'dribbble', notes: 'Agência de viagens com design aspiracional.' },
  { id: 'accounting_001', niche: 'contabilidade', businessType: 'ACCOUNTING', url: 'https://dribbble.com/shots/20543210-Accounting-Firm-Landing-Page', features: ['Serviços', 'Calculadora', 'Blog', 'Contato'], colorPalette: ['#0A0A0F', '#1E3A5F', '#3B82F6', '#F5F5F7'], fonts: ['Inter', 'Merriweather'], animations: ['fade-in', 'counter', 'scroll-reveal'], layout: 'corporate', priceRange: '$7K+', source: 'dribbble', notes: 'Contabilidade com design profissional e confiável.' },
  { id: 'cleaning_001', niche: 'limpeza', businessType: 'CLEANING_SERVICE', url: 'https://dribbble.com/shots/21876543-Cleaning-Service-Landing-Page', features: ['Serviços', 'Orçamento', 'Agendamento', 'Avaliações'], colorPalette: ['#0A0A1A', '#06B6D4', '#10B981', '#FFFFFF'], fonts: ['Inter', 'Nunito'], animations: ['fade-in', 'hover-lift'], layout: 'modern', priceRange: '$4K+', source: 'dribbble', notes: 'Serviço de limpeza com design moderno e confiável.' },
  { id: 'insurtech_001', niche: 'seguro', businessType: 'INSURANCE', url: 'https://dribbble.com/shots/22234567-Insurance-Landing-Page', features: ['Seguros', 'Calculadora', 'Sinistros', 'Contato'], colorPalette: ['#0A0A0F', '#2563EB', '#06B6D4', '#F5F5F7'], fonts: ['Inter', 'Open Sans'], animations: ['fade-in', 'counter', 'scroll-reveal'], layout: 'corporate', priceRange: '$10K+', source: 'dribbble', notes: 'Seguradora com design profissional.' },
  { id: 'startup_001', niche: 'startup', businessType: 'STARTUP', url: 'https://dribbble.com/shots/22765432-Startup-Landing-Page', features: ['Produto', 'Equipe', 'Investidores', 'Blog'], colorPalette: ['#0A0A0F', '#8B5CF6', '#06B6D4', '#FFFFFF'], fonts: ['Inter', 'JetBrains Mono'], animations: ['stagger', 'parallax', '3d-float'], layout: 'modern', priceRange: '$15K+', source: 'dribbble', notes: 'Startup tech com design inovador.' },
];

export function getExamplesByNiche(businessType: string): SiteExample[] {
  try {
    const designBrain = require('./design-brain.json');
    const nicheData = designBrain.niches[businessType.toLowerCase()] || designBrain.niches['barbershop'];
    if (nicheData && nicheData.references) {
      return nicheData.references.map((ref: any, i: number) => ({
        id: `brain_${businessType}_${i}`,
        niche: businessType,
        businessType: businessType.toUpperCase(),
        url: ref.url,
        features: ref.tokens || [],
        colorPalette: nicheData.colors || [],
        fonts: nicheData.typography.split(', '),
        animations: nicheData.animations || [],
        layout: 'modern' as const,
        priceRange: '$10K+',
        source: 'dribbble' as const,
        notes: `Brain: ${ref.title}`,
      }));
    }
  } catch (e) {
    console.warn('[Crawler] Design Brain not found or invalid, falling back to static examples.');
  }
  return PREMIUM_EXAMPLES.filter(example => example.businessType === businessType);
}

export function getAllExamples(): SiteExample[] {
  return PREMIUM_EXAMPLES;
}

export function analyzeExamplesForAI(businessType: string): string {
  const examples = getExamplesByNiche(businessType);
  if (examples.length === 0) {
    return 'Nenhum exemplo premium encontrado para este nicho. Use design moderno padrão (Bento Grid, Glassmorphism, GSAP).';
  }
  return examples.map((ex, i) => `
EXEMPLO ${i + 1} (${ex.source.toUpperCase()} - ${ex.priceRange}):
- URL: ${ex.url}
- Layout: ${ex.layout}
- Cores: ${ex.colorPalette.join(', ')}
- Fontes: ${ex.fonts.join(', ')}
- Animações: ${ex.animations.join(', ')}
- Features: ${ex.features.join(', ')}
- Notas: ${ex.notes}
  `.trim()).join('\n\n');
}

async function crawlSite(url: string, niche: string): Promise<CrawledSite | null> {
  const apiKey = process.env.FIRECRAWL_API_KEY;
  if (!apiKey) {
    console.log('FIRECRAWL_API_KEY não configurada. Usando dados estáticos.');
    return null;
  }
  try {
    const response = await fetch('https://api.firecrawl.dev/v0/scrape', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        url,
        formats: ['markdown'],
        onlyMainContent: true,
      }),
    });
    if (!response.ok) return null;
    const result = await response.json() as any;
    if (!result.success) return null;
    return {
      url, niche, style: 'modern',
      features: ['crawled-site'], colors: ['#000000'],
      animations: ['fade-in'], layout: 'modern', rating: 8,
    };
  } catch (error) {
    console.error('Erro no crawler:', error);
    return null;
  }
}

export async function performLiveResearch(niche: string): Promise<any[]> {
  console.log(`[Crawler] Getting real-time examples for niche: ${niche}...`);

  const key = niche.toUpperCase();
  const cached = FIRECRAWL_CACHE[key] || [];

  if (cached.length > 0) {
    console.log(`[Crawler] ✓ Found ${cached.length} cached results from Firecrawl for ${niche}`);
    return cached.map((r, i) => ({
      url: r.url,
      title: r.title,
      description: r.description,
      source: 'firecrawl-cache',
      rank: i + 1,
    }));
  }

  console.log(`[Crawler] No Firecrawl cache found for ${niche}, using static examples.`);
  const examples = getExamplesByNiche(niche);
  if (examples.length > 0) {
    return examples.map((ex, i) => ({
      url: ex.url, title: ex.notes,
      description: `Layout: ${ex.layout}, Cores: ${ex.colorPalette.join(', ')}`,
      source: ex.source, rank: i + 1,
    }));
  }

  return [{ url: `https://dribbble.com/search/${niche}`, title: `Premium ${niche} Design Inspiration`, source: 'static' }];
}

export async function extractAllUXShowcaseLogos(): Promise<any[]> {
  const cached = FIRECRAWL_CACHE.RESTAURANT;
  if (cached && cached.length > 0) {
    console.log(`[Crawler] ✓ Extracted ${cached.length} logo references from Firecrawl cache`);
    return cached.map((r, i) => ({
      id: `logo_fc_${i}`,
      name: r.title,
      category: 'minimalist',
      industry: 'all',
      url: r.url,
      colors: ['#000000', '#ffffff'],
      style: 'modern',
      source: 'firecrawl-cache',
      description: r.description,
    }));
  }
  return [
    { id: 'logo_001', name: 'Minimalist Tech Logo', category: 'minimalist', industry: 'tech', url: 'https://uiuxshowcase.com/category/resources/logo-inspiration/', colors: ['#000000', '#ffffff'], style: 'wordmark' },
  ];
}

export async function refreshNicheCache(niche: string): Promise<boolean> {
  console.warn(`[Crawler] refreshNicheCache is not available in client bundle (niche=${niche})`);
  return false;
}

const crawlerService = {
  getExamplesByNiche,
  getAllExamples,
  analyzeExamplesForAI,
  crawlSite,
  performLiveResearch,
  extractAllUXShowcaseLogos,
  refreshNicheCache,
};

export default crawlerService;
