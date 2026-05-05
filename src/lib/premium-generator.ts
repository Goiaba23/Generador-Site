// Premium Template Generator v6.0
// Integração completa: Dribbble/Landbook + Crawler + GSAP + 21dev + $10K Designs

import { BusinessType, TemplateStyle } from '@prisma/client';
import { analyzeExamplesForAI, getExamplesByNiche, getAllExamples } from './crawler-service';
import { getAnimationsForNiche, generateGSAPCode } from './animations';
import { get21DevComponent, getComponentsForNiche } from './21dev-components';
import { generateLogoInspiration, extractAllUXShowcaseLogos } from './uxshowcase-logos';

export interface PremiumTemplateRequest {
  businessType: string;
  businessName: string;
  style?: string;
  objective?: string;
  diferencial?: string;
  useCrawler?: boolean; // Se true, usa dados do crawleamento
  use21Dev?: boolean; // Se true, usa componentes 21dev
  useGSAP?: boolean; // Se true, adiciona animações GSAP
}

export interface PremiumTemplateResult {
  template: any;
  animations: string[];
  gsapCode: string;
  components21Dev: any[];
  premiumExamples: any[];
  crawlerData?: any;
  priceLevel: string; // "$10K+", "$5K", etc.
  notes: string;
}

// Gerar template premium completo (Dribbble + Crawler + 21dev + GSAP)
export async function generatePremiumTemplate(request: PremiumTemplateRequest): Promise<PremiumTemplateResult> {
  const {
    businessType,
    businessName,
    style = 'modern',
    objective = 'growth',
    diferencial = '',
    useCrawler = true,
    use21Dev = true,
    useGSAP = true,
  } = request;

  // 1. Buscar exemplos premium (Dribbble/Landbook)
  const premiumExamples = getExamplesByNiche(businessType);
  const allExamples = getAllExamples();
  
  // 2. Animações específicas do nicho
  const nicheAnimations = getAnimationsForNiche(businessType);
  
  // 3. Componentes 21dev para o nicho
  const components21Dev = use21Dev ? getComponentsForNiche(businessType) : [];
  
  // 4. Gerar código GSAP (se habilitado)
  const gsapCode = useGSAP ? generateGSAPCode(nicheAnimations) : '';
  
  // 5. Dados do crawler (se habilitado)
  let crawlerData = null;
  let logoInspiration = null;
  
  if (useCrawler && premiumExamples.length > 0) {
    // Simular dados do crawler baseados nos exemplos reais
    crawlerData = {
      sources: premiumExamples.map(e => ({
        url: e.url,
        niche: e.niche,
        layout: e.layout,
        colors: e.colorPalette,
        fonts: e.fonts,
        animations: e.animations,
        features: e.features,
      })),
      analysis: analyzeExamplesForAI(businessType),
      uxshowcaseLogos: await extractAllUXShowcaseLogos(),
    };
    
    // Gerar inspiração de logo para o nicho
    logoInspiration = generateLogoInspiration(businessType);
  }
  
  // 6. Montar template final
  const template = {
    id: `premium-${businessType.toLowerCase()}-${Date.now()}`,
    name: `${businessName} Premium`,
    businessType,
    style: style.toUpperCase(),
    description: `Site premium $10K+ baseado em ${premiumExamples.map(e => e.source).join(' + ')}`,
    designTokens: {
      colors: premiumExamples[0]?.colorPalette || ['#4f46e5', '#7c3aed', '#ffffff'],
      fonts: premiumExamples[0]?.fonts || ['Inter', 'Montserrat'],
      layout: premiumExamples[0]?.layout || 'modern',
    },
    animations: {
      library: useGSAP ? 'GSAP' : 'CSS',
      scrollTrigger: true,
      animations: nicheAnimations,
      gsapCode,
    },
    components: {
      use21Dev: use21Dev,
      components: components21Dev.map(c => ({
        id: c.id,
        name: c.name,
        category: c.category,
        animationType: c.animationType,
      })),
    },
    crawler: crawlerData,
    logoInspiration,
    content: {
      hero: {
        title: businessName,
        subtitle: diferencial || objective,
        animation: nicheAnimations[0] || 'hero-fade-in-up',
        cta: 'Criar Site Agora',
      },
      sections: [
        { type: 'problem_solution', animation: nicheAnimations[1] || 'scroll-fade-in' },
        { type: 'features', animation: nicheAnimations[2] || 'scroll-slide-left' },
        { type: 'growth_modules', animation: nicheAnimations[3] || 'scroll-zoom-in' },
      ],
    },
    premiumMetadata: {
      priceRange: premiumExamples[0]?.priceRange || '$10K+',
      sources: premiumExamples.map(e => e.source),
      notes: premiumExamples.map(e => e.notes).join('\n\n'),
    },
  };
  
  return {
    template,
    animations: nicheAnimations,
    gsapCode,
    components21Dev,
    premiumExamples,
    crawlerData,
    priceLevel: premiumExamples[0]?.priceRange || '$10K+',
    notes: `Template premium gerado com ${premiumExamples.length} exemplos do Dribbble/Landbook. Animações: ${nicheAnimations.length}. Componentes 21dev: ${components21Dev.length}. Logo UXShowcase: ${logoInspiration ? 'incluído' : 'não usado'}.`,
  };
}

// Gerar prompt para OpenAI com TUDO (crawler + exemplos + animações)
export function buildPremiumAIPrompt(request: PremiumTemplateRequest, premiumData: PremiumTemplateResult): string {
  const { businessType, businessName, objective, diferencial } = request;
  
  let prompt = `You are a PREMIUM web designer ($10K+ level) creating a site for: ${businessName} (${businessType}).

===

BASE DE DADOS - SITES PREMIUM ($10K+):

${premiumData.premiumExamples.map((ex, i) => `
EXAMPLE ${i + 1} (${ex.source.toUpperCase()} - ${ex.priceRange}):
- URL: ${ex.url}
- Layout: ${ex.layout}
- Colors: ${ex.colorPalette.join(', ')}
- Fonts: ${ex.fonts.join(', ')}
- Animations: ${ex.animations.join(', ')}
- Features: ${ex.features.join(', ')}
- Notes: ${ex.notes}
`).join('\n')}

===

ANIMAÇÕES GSAP PARA USAR:
${premiumData.animations.map(a => `- ${a}`).join('\n')}

GSAP CODE BASE:
${premiumData.gsapCode}

===

COMPONENTES 21DEV DISPONÍVEIS:
${premiumData.components21Dev.map(c => `- ${c.name} (${c.category}) - Animação: ${c.animationType}`).join('\n')}

===

INSTRUÇÕES PARA IA:
1. Use as CORES dos exemplos acima (${premiumData.premiumExamples[0]?.colorPalette.join(', ') || 'tema premium'})
2. Use as FONTES: ${premiumData.premiumExamples[0]?.fonts.join(', ') || 'Inter, Montserrat'}
3. Implemente TODAS as animações GSAP listadas acima
4. Use componentes 21dev para seções específicas
5. Layout deve ser: ${premiumData.premiumExamples[0]?.layout || 'modern'}
6. Foco no objetivo: ${objective || 'growth'}
7. Diferencial: ${diferencial || 'design premium'}

===

BUSINESS DETAILS:
- Name: ${businessName}
- Type: ${businessType}
- Objective: ${objective || 'Create premium site that converts'}

RETORNE APENAS JSON VÁLIDO COM:
{
  "title": "SEO title",
  "metaDescription": "155 chars max",
  "content": {
    "hero": { "title": "", "subtitle": "", "animation": "${premiumData.animations[0] || 'fade-in'}" },
    "sections": [{ "type": "", "animation": "", "content": {} }],
    "animations": { "gsap": true, "list": [${premiumData.animations.map(a => `"${a}"`).join(', ')}] },
    "components21dev": [${premiumData.components21Dev.map(c => `"${c.id}"`).join(', ')}],
    "designTokens": { "colors": [], "fonts": [] }
  }
}
`;
  
  return prompt;
}

export default {
  generatePremiumTemplate,
  buildPremiumAIPrompt,
};
