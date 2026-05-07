import { exa_search, youtube_transcript_get_transcript, g_search, firecrawl_search, firecrawl_scrape, stitch_generate_screen_from_text, stitch_edit_screens } from './mcp-bridge';
import crawlerService from './crawler-service';
import { BusinessDetails } from './ai-generator';

export class ArtDirectorService {
  /**
   * The "Elite" generation loop: Autonomous Research -> Stitch -> Correction
   */
  async generateEliteSite(details: BusinessDetails, projectId: string) {
    console.log(`[Art Director] Starting Elite Autonomous Research for ${details.name}...`);
    
    // 1. Deep Research (Visual & Conceptual)
    const searchResults = await firecrawl_search({
      query: `premium award winning ${details.type} website landing page design trends 2026`,
      limit: 3
    });

    const visualInsights: any[] = [];
    const results = searchResults.web || searchResults.data || [];
    
    for (const result of (Array.isArray(results) ? results : [])) {
      console.log(`[Art Director] Analyzing reference: ${result.url}`);
      const analysis = await firecrawl_scrape({
        url: result.url,
        formats: ['markdown', 'screenshot', 'branding'],
        onlyMainContent: true
      });
      visualInsights.push(analysis);
    }

    // 2. Initial Generation with Stitch (Visual-first)
    console.log(`[Art Director] Generating initial screens via Stitch...`);
    const prompt = `Create a $10K+ elite landing page for ${details.name}, a ${details.type}. 
      Style based on these researched insights: ${JSON.stringify(visualInsights.map(v => v.branding))}.
      Include Bento Grid, Glassmorphism, and GSAP-ready elements.`;
    
    const initialScreen = await stitch_generate_screen_from_text({
      projectId,
      prompt,
      deviceType: 'DESKTOP'
    });

    // 3. Review & Auto-Correction
    console.log(`[Art Director] Self-reviewing and correcting design...`);
    const correctionPrompt = `Refine the hero section of the previous screen. 
      Make the typography more dramatic, add a subtle mesh gradient background, 
      and ensure the CTA is more prominent. Align perfectly with the premium branding.`;
    
    await stitch_edit_screens({
      projectId,
      selectedScreenIds: [initialScreen.screenId],
      prompt: correctionPrompt
    });

    return {
      success: true,
      screenId: initialScreen.screenId,
      insights: visualInsights
    };
  }
}

export const artDirector = new ArtDirectorService();
