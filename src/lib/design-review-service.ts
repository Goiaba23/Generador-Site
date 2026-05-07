import { stitch_edit_screens } from './mcp-bridge';

export class DesignReviewService {
  /**
   * Performs a granular review of the generated screen across multiple design pillars
   */
  async reviewAndRefine(projectId: string, screenId: string, niche: string) {
    const pillars = [
      { name: 'Typography', prompt: 'Evaluate typography hierarchy. Ensure headings are bold and body text is readable. Fix line heights.' },
      { name: 'Color Harmony', prompt: 'Check color contrast and harmony. Ensure the palette is premium and consistent with the niche.' },
      { name: 'Layout & Spacing', prompt: 'Refine whitespace and alignment. Ensure perfect balance and "breathing room" between sections.' },
      { name: 'Micro-animations', prompt: 'Add subtle hover effects and entrance animations to make the site feel alive.' }
    ];

    for (const pillar of pillars) {
      console.log(`[QA Swarm] Refining Pillar: ${pillar.name}...`);
      await stitch_edit_screens({
        projectId,
        selectedScreenIds: [screenId],
        prompt: `Action: ${pillar.name}. ${pillar.prompt}. Niche: ${niche}. Standard: $10k+ Elite.`
      });
    }

    return true;
  }
}

export const designReview = new DesignReviewService();
