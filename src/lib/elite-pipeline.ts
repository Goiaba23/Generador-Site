import { researchService } from './research-service';
import { getAnimationsForNiche } from './animations';
import { getComponentsForNiche } from './21dev-components';
import { generateLogoInspiration } from './uxshowcase-logos';
import crawlerService from './crawler-service';
import { BusinessDetails, GeneratedSite, PlanType } from './ai-generator';
import { generateSiteHTMLWithFallback, refineSiteHTML } from './gemini-generator';
import { stitch } from '@google/stitch-sdk';
import { fetchBrandData, extractBrandLogo, enrichDesignTokensWithBrand } from './brand-service';
import { getFormSchemaForNiche, generateFormHTML, buildFallbackFormHTML } from './form-service';
import { getLogoURL } from './logo-service';
import { runSEOAudit } from './seo-service';
import { extractMetadata } from './metascrape-service';
import { removeBackground } from './poof-service';
import { captureScreenshot } from './screenshot-service';

// ─── Stitch Phase: Gera template base via Stitch SDK ───

interface StitchInput {
  projectId: string;
  prompt: string;
  designTokens?: any;
  businessDetails: BusinessDetails;
}

interface StitchOutput {
  html: string;
  source: 'stitch-api' | 'gemini-fallback';
}

async function stitchPhase(input: StitchInput): Promise<StitchOutput> {
  const { businessDetails, designTokens } = input;

  // 1. Tenta Stitch SDK real
  try {
    console.log('[Stitch] Using SDK to generate screen...');
    const project = stitch.project(input.projectId);
    const deviceType = 'DESKTOP';
    const screen = await project.generate(input.prompt, deviceType);
    console.log('[Stitch] Screen generated, fetching HTML...');
    const htmlUrl = await screen.getHtml();
    if (htmlUrl) {
      const htmlRes = await fetch(htmlUrl);
      if (htmlRes.ok) {
        const html = await htmlRes.text();
        if (html && html.length > 100) {
          console.log(`[Stitch] ✓ SDK success (${html.length} chars)`);
          return { html, source: 'stitch-api' };
        }
      }
    }
    console.warn('[Stitch] SDK returned empty HTML');
  } catch (e) {
    console.warn('[Stitch] SDK failed, using Gemini fallback:', e instanceof Error ? e.message : e);
  }

  // 2. Fallback: Gemini gera o template inicial (age como Stitch)
  console.log('[Stitch] Gemini generating initial template...');
  const html = await generateSiteHTMLWithFallback({
    businessName: businessDetails.name,
    businessType: businessDetails.type,
    businessDescription: businessDetails.description,
    style: businessDetails.style,
    sections: designTokens?.sections || ['Hero', 'Sobre', 'Servicos', 'Diferenciais', 'Contato', 'Footer'],
    sandwichLayers: designTokens?.sandwichLayers || {
      foundation: { layout: 'modern full-width', structure: ['Hero', 'Content', 'Footer'] },
      colors: { palette: ['#0A0A0F', '#06B6D4', '#3B82F6', '#F0F0F5', '#14141E'], psychology: 'Modern tech', scheme: 'dark' },
      typography: { heading: 'Inter', body: 'Inter', pairing: 'Inter + Inter' },
      animation: { type: 'scroll reveal', intensity: 'medium', library: 'GSAP', patterns: ['fade up', 'stagger'] },
      premium: { glassmorphism: true, bentoGrid: true, noise: false },
    },
    objective: 'professional_presence',
  });
  return { html, source: 'gemini-fallback' };
}

// ─── Gemini Refinement: Skills + design tokens aplicados no template ───

interface RefinementInput {
  templateHTML: string;
  businessDetails: BusinessDetails;
  designTokens: any;
  researchInsights?: any;
  intensity: 'standard' | 'premium';
}

async function geminiRefine(input: RefinementInput): Promise<string> {
  console.log(`[Gemini Refine] Applying ${input.intensity} refinement with 15 skills...`);

  const { businessDetails, designTokens, researchInsights } = input;

  const sections = designTokens?.sections || ['Hero', 'Sobre', 'Servicos', 'Diferenciais', 'Contato', 'Footer'];

  const refined = await refineSiteHTML(input.templateHTML, {
    businessName: businessDetails.name,
    businessType: businessDetails.type,
    businessDescription: businessDetails.description,
    style: businessDetails.style,
    sections,
    sandwichLayers: designTokens?.sandwichLayers || {
      foundation: { layout: 'modern full-width', structure: sections },
      colors: { palette: ['#0A0A0F', '#06B6D4', '#3B82F6', '#F0F0F5', '#14141E'], psychology: 'Modern tech', scheme: 'dark' },
      typography: { heading: 'Inter', body: 'Inter', pairing: 'Inter + Inter' },
      animation: { type: 'scroll reveal', intensity: 'medium', library: 'GSAP', patterns: ['fade up', 'stagger'] },
      premium: { glassmorphism: true, bentoGrid: true, noise: false },
    },
    objective: businessDetails.description || 'professional_presence',
    researchInsights,
    intensity: input.intensity,
  });

  return refined;
}

/**
 * Integrates ALL tools for a complete site generation
 */
async function integrateAllTools(details: BusinessDetails, researchResult: any) {
  console.log('[Tools] Integrating all design tools for', details.type);
  const result: any = {};
  
  try {
    result.animations = getAnimationsForNiche(details.type) || [];
    console.log(`[Tools] ✓ Animations loaded: ${result.animations.length} configs`);
  } catch (e) {
    console.error('[Tools] ✗ Animations failed:', e);
    result.animations = [];
  }
  
  try {
    result.components = getComponentsForNiche(details.type) || [];
    console.log(`[Tools] ✓ Components loaded: ${result.components.length} suggestions`);
  } catch (e) {
    console.error('[Tools] ✗ Components failed:', e);
    result.components = [];
  }
  
  try {
    result.logoInspiration = generateLogoInspiration(details.type);
    console.log(`[Tools] ✓ Logo inspiration generated`);
  } catch (e) {
    console.error('[Tools] ✗ Logo inspiration failed:', e);
    result.logoInspiration = null;
  }
    
  try {
    result.crawledData = await crawlerService.performLiveResearch(details.type);
    console.log(`[Tools] ✓ Crawler data acquired`);
  } catch (e) {
    console.error('[Tools] ✗ Crawler failed (non-fatal):', e);
    result.crawledData = null;
  }

  // Brand.dev enrichment — logo, colors, socials from domain
  try {
    if (details.domain) {
      const brandData = await fetchBrandData(details.domain);
      if (brandData) {
        result.brandData = brandData;
        result.brandLogo = extractBrandLogo(brandData);
        result.brandColors = brandData.colors.map((c: any) => c.hex);
        console.log(`[Tools] ✓ Brand data: ${brandData.title} (${brandData.colors?.length || 0} colors, ${brandData.logos?.length || 0} logos)`);
      }
    } else {
      console.log('[Tools] ℹ No domain provided, skipping brand enrichment');
    }
  } catch (e) {
    console.error('[Tools] ✗ Brand enrichment failed (non-fatal):', e);
    result.brandData = null;
  }

  // FormForge — generate HTML form for the niche
  try {
    const formSchema = getFormSchemaForNiche(details.type);
    const formResult = await generateFormHTML(formSchema);
    if (formResult?.html) {
      result.formHTML = formResult.html;
      result.formSchema = formSchema;
      console.log(`[Tools] ✓ Form generated: ${formSchema.title} (via FormForge API)`);
    } else {
      result.formHTML = buildFallbackFormHTML(formSchema);
      result.formSchema = formSchema;
      console.log(`[Tools] ✓ Form generated: ${formSchema.title} (fallback HTML)`);
    }
  } catch (e) {
    console.error('[Tools] ✗ Form generation failed:', e);
    result.formHTML = null;
  }

  // Logo.dev — real logo from domain
  try {
    if (details.domain) {
      result.logoURL = await getLogoURL(details.domain);
      if (result.logoURL) console.log(`[Tools] ✓ Logo.dev: logo found for ${details.domain}`);
      else console.log('[Tools] ℹ Logo.dev: no logo found');
    }
  } catch (e) {
    console.warn('[Tools] ℹ Logo.dev skipped:', e);
  }

  // SEO Score — audit the generated site (if we have a preview URL)
  try {
    if (details.domain) {
      const audit = await runSEOAudit(`https://${details.domain}`);
      if (audit) {
        result.seoAudit = audit;
        console.log(`[Tools] ✓ SEO Score: ${audit.score}/100 (${audit.grade})`);
      }
    }
  } catch (e) {
    console.warn('[Tools] ℹ SEO audit skipped:', e);
  }

  // MetaScrape — extract metadata from competitors
  try {
    if (details.domain) {
      const meta = await extractMetadata(`https://${details.domain}`);
      if (meta) {
        result.metaData = meta;
        console.log(`[Tools] ✓ MetaScrape: ${meta.title}`);
      }
    }
  } catch (e) {
    console.warn('[Tools] ℹ MetaScrape skipped:', e);
  }

  // Poof — remove bg from hero image (placeholder)
  try {
    result.poofEnabled = !!process.env.POOF_KEY;
    if (result.poofEnabled) console.log('[Tools] ✓ Poof: background removal ready');
  } catch (e) {
    console.warn('[Tools] ℹ Poof skipped:', e);
  }

  // Screenshot Scout — capture preview
  try {
    if (details.domain) {
      const shot = await captureScreenshot(`https://${details.domain}`);
      if (shot.url) {
        result.screenshotURL = shot.url;
        console.log('[Tools] ✓ Screenshot Scout: preview capture ready');
      }
    }
  } catch (e) {
    console.warn('[Tools] ℹ Screenshot Scout skipped:', e);
  }

  result.researchInsights = researchResult;
  return result;
}

// ─── Elite Pipeline ───

export class ElitePipeline {
  /**
   * SIMPLE WORKFLOW: Stitch (template) → Gemini Refine (skills) → HTML
   */
  async runCommonWorkflow(details: BusinessDetails, designTokens?: any): Promise<any> {
    console.log(`[Simple Workflow] ${details.name}...`);

    // 1. Brand + Form enrichment (lightweight)
    const enrichment: any = {};
    try {
      if (details.domain) {
        const brandData = await fetchBrandData(details.domain);
        if (brandData) {
          enrichment.brandData = brandData;
          enrichment.brandLogo = extractBrandLogo(brandData);
          console.log(`[Simple Workflow] ✓ Brand data: ${brandData.title}`);
        }
      }
    } catch (e) {
      console.warn('[Simple Workflow] Brand enrichment skipped:', e);
    }
    try {
      const formSchema = getFormSchemaForNiche(details.type);
      const formResult = await generateFormHTML(formSchema);
      enrichment.formHTML = formResult?.html || buildFallbackFormHTML(formSchema);
      enrichment.formSchema = formSchema;
      console.log(`[Simple Workflow] ✓ Form: ${formSchema.title}`);
    } catch (e) {
      console.warn('[Simple Workflow] Form generation skipped:', e);
    }

    // 2. Stitch Phase — gera template base
    const stitchResult = await stitchPhase({
      projectId: `simple-${Date.now()}`,
      prompt: `Create a ${details.type} landing page for ${details.name}. Style: ${details.style || 'modern'}.`,
      designTokens,
      businessDetails: details,
    });
    console.log(`[Simple Workflow] Template from: ${stitchResult.source}`);

    // 3. Gemini Refinement — aplica 15 skills + design tokens
    const finalHTML = await geminiRefine({
      templateHTML: stitchResult.html,
      businessDetails: details,
      designTokens,
      intensity: 'standard',
    });

    // Logo.dev enrichment
    try {
      if (details.domain) {
        enrichment.logoURL = await getLogoURL(details.domain);
      }
    } catch (e) { /* skip */ }

    // SEO audit
    try {
      if (details.domain) {
        const audit = await runSEOAudit(`https://${details.domain}`);
        if (audit) enrichment.seoAudit = audit;
      }
    } catch (e) { /* skip */ }

    // MetaScrape
    try {
      if (details.domain) {
        const meta = await extractMetadata(`https://${details.domain}`);
        if (meta) enrichment.metaData = meta;
      }
    } catch (e) { /* skip */ }

    // Screenshot
    try {
      if (details.domain) {
        const shot = await captureScreenshot(`https://${details.domain}`);
        if (shot.url) enrichment.screenshotURL = shot.url;
      }
    } catch (e) { /* skip */ }

    return {
      html: finalHTML,
      source: stitchResult.source,
      ...enrichment,
    };
  }

  /**
   * PREMIUM WORKFLOW: Stitch (template) → Gemini Refine Premium → HTML
   */
  async runPremiumWorkflow(details: BusinessDetails, designTokens?: any): Promise<any> {
    console.log(`[Premium Workflow] ${details.name}...`);

    // 1. Research
    const deepResearch = await researchService.performDeepResearch(`${details.type} website best design 2026 premium trends`);
    
    // 2. Tools
    const toolsData = await integrateAllTools(details, deepResearch);

    // 3. Stitch Phase
    const stitchResult = await stitchPhase({
      projectId: `premium-${Date.now()}`,
      prompt: `ULTRA-PREMIUM ${details.type} site for ${details.name}. Style: ${details.style || 'modern luxury'}. Components: ${toolsData.components?.join(', ') || 'Bento Grid, Glassmorphism'}. Animations: ${toolsData.animations?.map((a: any) => a.name).join(', ') || 'GSAP, Three.js'}.`,
      designTokens,
      businessDetails: details,
    });

    // 4. Gemini Premium Refinement
    const finalHTML = await geminiRefine({
      templateHTML: stitchResult.html,
      businessDetails: details,
      designTokens,
      researchInsights: { youtube: deepResearch.youtubeInsights, trends: deepResearch.trends },
      intensity: 'premium',
    });

    return {
      success: true,
      html: finalHTML,
      source: stitchResult.source,
      animations: toolsData.animations || [],
      components: toolsData.components || [],
      logoInspiration: toolsData.logoInspiration,
      brandData: toolsData.brandData || null,
      brandLogo: toolsData.brandLogo || null,
      brandColors: toolsData.brandColors || [],
      logoURL: toolsData.logoURL || null,
      seoAudit: toolsData.seoAudit || null,
      metaData: toolsData.metaData || null,
      poofEnabled: toolsData.poofEnabled || false,
      screenshotURL: toolsData.screenshotURL || null,
      formHTML: toolsData.formHTML || null,
      formSchema: toolsData.formSchema || null,
      crawledData: toolsData.crawledData,
      youtubeInsights: toolsData.researchInsights?.youtubeInsights || [],
      trends: toolsData.researchInsights?.trends || [],
    };
  }
}

export const elitePipeline = new ElitePipeline();
