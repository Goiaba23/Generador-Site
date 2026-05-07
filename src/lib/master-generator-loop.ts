import { elitePipeline } from './elite-pipeline';
import { PlanType, BusinessDetails, GeneratedSite } from './ai-generator';

export async function generateSiteWithInsights(
  businessDetails: BusinessDetails,
  insights: any
): Promise<GeneratedSite> {
  
  if (businessDetails.plan === 'COMMON') {
    // COMMON PLAN WORKFLOW: User Choice -> YouTube -> Stitch -> Polish
    console.log(`[AI Generator] Executing COMMON Workflow...`);
    const commonResult = await elitePipeline.runCommonWorkflow(businessDetails);
    return {
      id: commonResult.screenId,
      name: businessDetails.name,
      status: 'completed',
      previewUrl: `https://stitch.app/preview/${commonResult.screenId}`,
      plan: 'COMMON'
    } as any;
  } 
  
  if (businessDetails.plan === 'PREMIUM' || businessDetails.plan === 'ELITE') {
    // PREMIUM PLAN Workflow: YouTube -> Stitch -> 3D -> Refinement
    console.log(`[AI Generator] Executing PREMIUM/ELITE Workflow...`);
    const premiumResult = await elitePipeline.runPremiumWorkflow(businessDetails);
    
    // Return ALL data including integrated tools
    return {
      id: premiumResult.screenId || 'premium-' + Date.now(),
      name: businessDetails.name,
      status: 'completed',
      previewUrl: premiumResult.previewUrl || `https://stitch.app/preview/${premiumResult.screenId}`,
      plan: 'PREMIUM',
      // Integrated tools data from STAGE 3
      animations: premiumResult.animations || [],
      components: premiumResult.components || [],
      logoInspiration: premiumResult.logoInspiration,
      crawledData: premiumResult.crawledData,
      youtubeInsights: premiumResult.youtubeInsights || [],
      trends: premiumResult.trends || [],
      nicheProposal: premiumResult.nicheProposal,
      premium: {
        assetGenerationPrompt: premiumResult.masterPrompt || ''
      }
    } as any;
  }
  
  throw new Error('Invalid plan selected');
}
