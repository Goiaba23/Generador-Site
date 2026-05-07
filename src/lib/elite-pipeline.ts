import { researchService } from './research-service';
import { getAnimationsForNiche } from './animations';
import { getComponentsForNiche } from './21dev-components';
import { generateLogoInspiration } from './uxshowcase-logos';
import crawlerService from './crawler-service';
import { BusinessDetails, GeneratedSite, PlanType } from './ai-generator';

// Stitch API integration (using REST API if available, otherwise mock for now)
const STITCH_API_KEY = process.env.STITCH_API_KEY || 'mock-key';
const STITCH_BASE_URL = 'https://stitch.withgoogle.com/api';

async function stitch_generate_screen_from_text(params: any) {
  console.log('[Stitch] Generating screen with prompt:', params.prompt?.substring(0, 100));
  // Mock response for now - in production, call real Stitch API
  return {
    screenId: `stitch-${Date.now()}`,
    previewUrl: `https://stitch.withgoogle.com/preview/stitch-${Date.now()}`
  };
}

async function stitch_edit_screens(params: any) {
  console.log('[Stitch] Editing screens:', params.selectedScreenIds);
  return { success: true };
}

/**
 * Integrates ALL tools for a complete site generation
 */
async function integrateAllTools(details: BusinessDetails, researchResult: any) {
  console.log('[Tools] Integrating all design tools for', details.type);
  const result: any = {};
  
  try {
    // 1. Get niche-specific animations from animations.ts
    result.animations = getAnimationsForNiche(details.type) || [];
    console.log(`[Tools] ✓ Animations loaded: ${result.animations.length} configs`);
  } catch (e) {
    console.error('[Tools] ✗ Animations failed:', e);
    result.animations = [];
  }
  
  try {
    // 2. Get 21.dev components for this niche
    result.components = getComponentsForNiche(details.type) || [];
    console.log(`[Tools] ✓ Components loaded: ${result.components.length} suggestions`);
  } catch (e) {
    console.error('[Tools] ✗ Components failed:', e);
    result.components = [];
  }
  
  try {
    // 3. Generate logo inspiration from UXShowcase
    result.logoInspiration = generateLogoInspiration(details.type);
    console.log(`[Tools] ✓ Logo inspiration generated`);
  } catch (e) {
    console.error('[Tools] ✗ Logo inspiration failed:', e);
    result.logoInspiration = null;
  }
    
  try {
    // 4. Crawl competitor sites for real-world examples
    result.crawledData = await crawlerService.performLiveResearch(details.type);
    console.log(`[Tools] ✓ Crawler data acquired`);
  } catch (e) {
    console.error('[Tools] ✗ Crawler failed (non-fatal):', e);
    result.crawledData = null;
  }
  
  result.researchInsights = researchResult;
  return result;
}

export class ElitePipeline {
  /**
   * COMMON PLAN WORKFLOW
   * 1. User Choice -> 2. YouTube Research -> 3. Stitch Generation -> 4. AI Polish
   */
  async runCommonWorkflow(details: BusinessDetails): Promise<any> {
    console.log(`[Common Workflow] Starting for ${details.name}...`);

    // 1. YouTube Research (Trends & How-to)
    const research = await researchService.performDeepResearch(details.type);
    console.log(`[Common Workflow] YouTube research synthesized: ${research.youtubeInsights.length} insights.`);

    // 2. Stitch Generation with Master Prompt
    const masterPrompt = `Create an impeccable ${details.type} site. 
      Insights from Elite Tutorials: ${research.youtubeInsights.join(' ')}.
      Layout: ${research.trends.join(', ')}. Fonts: Inter/Playfair. 
      Style: Modern, High-conversion.`;
    
    const initialDesign = await stitch_generate_screen_from_text({
      projectId: 'common-project',
      prompt: masterPrompt,
      deviceType: 'DESKTOP'
    });

    // 3. AI Polish & Harmonic Correction
    console.log(`[Common Workflow] Polishing design for harmony and animations...`);
    await stitch_edit_screens({
      projectId: 'common-project',
      selectedScreenIds: [initialDesign.screenId],
      prompt: `Add smooth GSAP animations to all sections. 
        Improve visual hierarchy. Add micro-interactions to buttons. 
        Ensure perfect harmony between fonts and colors.`
    });

    return { success: true, screenId: initialDesign.screenId };
  }

  /**
   * PREMIUM/ELITE ULTRA-REFINED WORKFLOW (V8.0)
   * UNIFIED ON STITCH ENGINE
   */
  async runPremiumWorkflow(details: BusinessDetails): Promise<any> {
    console.log(`[Elite V8.0] Starting Recursive Premium Pipeline for ${details.name}...`);

    // STAGE 1: MULTI-SOURCE RESEARCH (YouTube + Dribbble + Landbook)
    const researchQuery = `${details.type} website best design 2026 premium trends`;
    const deepResearch = await researchService.performDeepResearch(researchQuery);
    
    // STAGE 2: MOCK RUFLO SWARM (replace with real integration later)
    const swarmResults = {
      componentSuggestions: ['Bento Grid', 'Glassmorphism 2.0', 'GSAP Animations', 'Three.js 3D']
    };

    // STAGE 3: INTEGRATE ALL TOOLS (animations.ts, 21dev-components.ts, uxshowcase-logos.ts, crawler-service.ts)
    const toolsData = await integrateAllTools(details, deepResearch);
    console.log(`[Elite V8.0] Tools integrated. Animations: ${toolsData.animations?.length}, Components: ${toolsData.components?.length}`);

    // STAGE 4: STITCH GENERATION (Variant 1)
    const masterPrompt = `ULTRA-PREMIUM ${details.type} SITE.
      CONCEPT: ${details.style || 'MODERN LUXURY'}.
      RESEARCH SECRETS: ${JSON.stringify(deepResearch.youtubeInsights || [])}.
      COMPONENTS: ${toolsData.components?.join(', ') || 'Bento Grid, Glassmorphism'}.
      ANIMATIONS: ${toolsData.animations?.map((a: any) => a.name).join(', ') || 'GSAP, Three.js'}.
      LOGO INSPIRATION: ${JSON.stringify(toolsData.logoInspiration)}.
      CRAWLED DATA: ${JSON.stringify(toolsData.crawledData?.competitors?.slice(0, 3) || [])}.
      FEEL: High-conversion, $10k Agency Standard.`;

    const initialScreen = await stitch_generate_screen_from_text({
      projectId: 'elite-swarm-project',
      prompt: masterPrompt
    });

    // STAGE 4: AI ANALYSIS & SELF-CORRECTION (Recursive Loop)
    // The AI "watches" the generated screen and searches for even better references to fix it
    console.log(`[Elite V8.0] AI Analyzing Generation... Searching for Landbook/Dribbble improvements.`);
    const refinementResearch = await researchService.performDeepResearch(`${details.type} modern web layout refinement references`);

    // STAGE 5: STITCH EDIT (The "Improvement" Phase)
    await stitch_edit_screens({
      projectId: 'elite-swarm-project',
      selectedScreenIds: [initialScreen.screenId],
      prompt: `REFINEMENT PHASE: Based on latest Landbook trends (${refinementResearch.trends.join(', ')}), 
        fix any visual inconsistencies. Add custom 3D mesh gradients. 
        Implement magnetic button logic for all CTAs. Ensure perfect typography rhythm.`
    });

    // STAGE 6: FINAL 3D INJECTION & GSAP SYNC
    // This part is handled by the platform's renderer injecting the Three.js and GSAP code
    
    return { 
      success: true, 
      screenId: initialScreen.screenId,
      variants: [initialScreen.screenId], // Array for compatibility
      insights: deepResearch.bestPractices,
      // Integrated tools data from STAGE 3
      animations: toolsData.animations || [],
      components: toolsData.components || [],
      logoInspiration: toolsData.logoInspiration,
      crawledData: toolsData.crawledData,
      youtubeInsights: toolsData.researchInsights?.youtubeInsights || [],
      trends: toolsData.researchInsights?.trends || []
    };
  }
}

export const elitePipeline = new ElitePipeline();
