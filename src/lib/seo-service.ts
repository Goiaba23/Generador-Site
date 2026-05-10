export interface SEOAuditResult {
  score: number;
  grade: string;
  checks: Record<string, any>;
  priorities: { issue: string; impact: string; fix: string }[];
}

export async function runSEOAudit(url: string): Promise<SEOAuditResult | null> {
  const key = process.env.SEO_SCORE_KEY || '';
  if (!key || !url) return null;
  try {
    const res = await fetch(`https://seoscoreapi.com/audit?url=${encodeURIComponent(url)}`, {
      headers: { 'X-API-Key': key },
    });
    if (!res.ok) { console.warn(`[SEO] API error ${res.status}`); return null; }
    const data = await res.json();
    if (!data || typeof data.score !== 'number') return null;
    return {
      score: data.score,
      grade: data.grade || 'N/A',
      checks: data.checks || {},
      priorities: data.priorities || [],
    };
  } catch (err) {
    console.warn('[SEO] Audit failed:', err instanceof Error ? err.message : err);
    return null;
  }
}
