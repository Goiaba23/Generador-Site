export async function getLogoURL(domain: string): Promise<string | null> {
  const key = process.env.LOGO_DEV_KEY || '';
  if (!key || !domain) return null;
  const clean = domain.replace(/^https?:\/\//, '').replace(/^www\./, '').split('/')[0].split('?')[0].toLowerCase();
  try {
    const res = await fetch(`https://img.logo.dev/${clean}?token=${key}&format=webp`, { method: 'HEAD' });
    if (res.ok) return `https://img.logo.dev/${clean}?token=${key}&format=webp`;
  } catch { }
  return null;
}

export async function searchLogoByDomain(domain: string): Promise<{ url: string | null; format: string }> {
  const url = await getLogoURL(domain);
  return { url, format: url ? 'webp' : 'none' };
}
