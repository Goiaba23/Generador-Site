// Stub for plan-config
export interface Plan {
  id: string;
  name: string;
  price: number;
  features: string[];
  sitesLimit?: number;
  revisions?: number;
}

export function getPlanById(id: string): Plan | null {
  return { id, name: 'Basic', price: 27, features: [], sitesLimit: 5, revisions: 1 };
}

export function getMethodForPlan(plan: string): string {
  return 'basic';
}

export function canUseOpenCodeWorker(plan: string): boolean {
  return plan === 'premium';
}