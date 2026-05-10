import { elitePipeline } from './elite-pipeline';
import { PlanType, BusinessDetails, GeneratedSite } from './ai-generator';

export async function generateSiteWithInsights(
  businessDetails: BusinessDetails,
  insights: any
): Promise<GeneratedSite> {
  // Extrai design tokens do research
  const designTokens = insights?.skillResearch || null;

  if (businessDetails.plan === 'COMMON') {
    console.log(`[AI Generator] COMMON Workflow — Stitch + Gemini Refine...`);
    const result = await elitePipeline.runCommonWorkflow(businessDetails, designTokens);

    return {
      id: `nexus-${Date.now()}`,
      name: businessDetails.name,
      status: 'completed',
      previewUrl: `/sites/${businessDetails.name.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-').substring(0, 50)}`,
      plan: 'COMMON',
      content: result.html,
      title: businessDetails.name,
      metaDescription: `Site premium gerado por IA para ${businessDetails.name}`,
      brandData: result.brandData || null,
      brandLogo: result.brandLogo || null,
      formHTML: result.formHTML || null,
      formSchema: result.formSchema || null,
      logoURL: result.logoURL || null,
      seoAudit: result.seoAudit || null,
      metaData: result.metaData || null,
      poofEnabled: result.poofEnabled || false,
      screenshotURL: result.screenshotURL || null,
    } as any;
  }

  if (businessDetails.plan === 'PREMIUM' || businessDetails.plan === 'ELITE') {
    console.log(`[AI Generator] PREMIUM Workflow — Stitch + Gemini Premium Refine...`);
    const result = await elitePipeline.runPremiumWorkflow(businessDetails, designTokens);

    return {
      id: `nexus-premium-${Date.now()}`,
      name: businessDetails.name,
      status: 'completed',
      previewUrl: `/sites/${businessDetails.name.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-').substring(0, 50)}`,
      plan: 'PREMIUM',
      content: result.html,
      title: businessDetails.name,
      metaDescription: `Site ultra-premium gerado por IA para ${businessDetails.name}`,
      animations: result.animations || [],
      components: result.components || [],
      logoInspiration: result.logoInspiration,
      brandData: result.brandData || null,
      brandLogo: result.brandLogo || null,
      brandColors: result.brandColors || [],
      formHTML: result.formHTML || null,
      formSchema: result.formSchema || null,
      crawledData: result.crawledData,
      youtubeInsights: result.youtubeInsights || [],
      trends: result.trends || [],
    } as any;
  }

  throw new Error('Invalid plan selected');
}
