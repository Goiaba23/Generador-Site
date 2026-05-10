import { elitePipeline } from './elite-pipeline';

export type BusinessType = string;
export type PlanType = 'COMMON' | 'PREMIUM' | 'ELITE';

export interface BusinessDetails {
  name: string;
  type: BusinessType;
  plan: PlanType;
  description?: string;
  domain?: string;
  brandAssets?: {
    logoUrl?: string;
    imageUrls?: string[];
    primaryColor?: string;
  };
  diferencial?: string;
  style?: string;
}

export interface GeneratedSite {
  id: string;
  name: string;
  status: 'processing' | 'completed' | 'failed';
  previewUrl: string;
  plan: PlanType;
  content: any;
  title?: string;
  metaDescription?: string;
  designTokens?: any;
  nicheProposal?: any;
  premium?: any;
  rufloSwarm?: any;
  customCss?: string;
  variants?: string[];
  // Integrated tools data
  animations?: any[];
  components?: any[];
  logoInspiration?: any;
  crawledData?: any;
  youtubeInsights?: string[];
  trends?: string[];
}

export { generateSiteWithInsights } from './master-generator-loop';
export { getNicheProposalLocal } from './niche-proposals';

export function createSlug(name: string): string {
  return name.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
}
