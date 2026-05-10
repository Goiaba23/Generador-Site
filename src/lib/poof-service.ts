export async function removeBackground(imageUrl: string): Promise<string | null> {
  const key = process.env.POOF_KEY || '';
  if (!key || !imageUrl) return null;
  try {
    const imageRes = await fetch(imageUrl);
    if (!imageRes.ok) { console.warn('[Poof] Could not fetch source image'); return null; }
    const blob = await imageRes.blob();
    const form = new FormData();
    form.append('image_file', blob, 'image.jpg');
    const res = await fetch('https://api.poof.bg/v1/remove', {
      method: 'POST',
      headers: { 'x-api-key': key },
      body: form,
    });
    if (!res.ok) { console.warn(`[Poof] API error ${res.status}`); return null; }
    const buffer = await res.arrayBuffer();
    const base64 = Buffer.from(buffer).toString('base64');
    return `data:image/png;base64,${base64}`;
  } catch (err) {
    console.warn('[Poof] Failed:', err instanceof Error ? err.message : err);
    return null;
  }
}
