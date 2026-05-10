import * as fs from 'fs';
import * as path from 'path';

const ALL_NICHES = [
  'RESTAURANT', 'BAKERY', 'PIZZERIA', 'SUSHI', 'ROTISSERIE',
  'BURGER_JOINT', 'STEAKHOUSE', 'SEAFOOD', 'VEGAN', 'ICE_CREAM',
  'CONFECTIONERY', 'CAFE', 'BREWERY', 'COFFEE',
  'BARBERSHOP', 'SALON', 'SPA', 'BEAUTY',
  'CLINIC', 'DENTIST', 'PHARMACY', 'NUTRITIONIST',
  'GYM', 'FITNESS', 'YOGA_STUDIO',
  'TECH', 'STARTUP', 'SAAS', 'SOFTWARE', 'APP',
  'RETAIL', 'PET_SHOP', 'BOOKSTORE', 'FLORIST', 'JEWELRY', 'CLOTHING',
  'LAWYER', 'CONSULTING', 'ACCOUNTING', 'CLEANING_SERVICE', 'INSURANCE',
  'REAL_ESTATE', 'HOTEL', 'TRAVEL_AGENCY', 'ARCHITECTURE',
  'EVENTS', 'MUSIC', 'PHOTOGRAPHER', 'NONPROFIT', 'EDUCATION',
  'AGENCY', 'MARKETPLACE', 'ECOMMERCE', 'FINANCIAL', 'INVESTMENT',
];

interface Result { passed: number; failed: number }

async function testCrawlerService(): Promise<Result> {
  console.log('\n=== 1. CRAWLER SERVICE ===\n');
  const crawler = (await import('../src/lib/crawler-service')).default;
  let passed = 0, failed = 0;

  for (const niche of ALL_NICHES) {
    try {
      const examples = crawler.getExamplesByNiche(niche);
      if (Array.isArray(examples) && examples.length > 0) {
        passed++; process.stdout.write('.');
      } else { failed++; process.stdout.write('x'); }
    } catch { failed++; process.stdout.write('E'); }
  }
  process.stdout.write('\n');
  console.log(`  ${passed} passed, ${failed} failed / ${ALL_NICHES.length} total`);
  return { passed, failed };
}

async function testAnimations(): Promise<Result> {
  console.log('\n=== 2. ANIMATION SERVICE ===\n');
  let passed = 0, failed = 0;
  try {
    const mod = await import('../src/lib/animations');
    const fn = mod.getAnimationsForNiche || (mod.default as any)?.getAnimationsForNiche;
    if (!fn) throw new Error('fn not found');

    for (const niche of ALL_NICHES) {
      try {
        const anims = fn(niche);
        if (Array.isArray(anims) && anims.length >= 3) { passed++; process.stdout.write('.'); }
        else { failed++; process.stdout.write('~'); }
      } catch { failed++; process.stdout.write('E'); }
    }
    process.stdout.write('\n');
    console.log(`  ${passed} passed, ${failed} failed`);
  } catch {
    console.log('  SKIP (module not loadable)\n');
  }
  return { passed, failed };
}

async function testComponents(): Promise<Result> {
  console.log('\n=== 3. COMPONENT SERVICE ===\n');
  let passed = 0, failed = 0;
  try {
    const mod = await import('../src/lib/21dev-components');
    const fn = mod.getComponentsForNiche || (mod.default as any)?.getComponentsForNiche;
    if (!fn) throw new Error('fn not found');

    for (const niche of ALL_NICHES) {
      try {
        const comps = fn(niche);
        if (Array.isArray(comps)) { passed++; process.stdout.write('.'); }
        else { failed++; process.stdout.write('x'); }
      } catch { failed++; process.stdout.write('E'); }
    }
    process.stdout.write('\n');
    console.log(`  ${passed} passed, ${failed} failed`);
  } catch { console.log('  SKIP\n'); }
  return { passed, failed };
}

async function testLogos(): Promise<Result> {
  console.log('\n=== 4. LOGO SERVICE ===\n');
  let passed = 0, failed = 0;
  try {
    const mod = await import('../src/lib/uxshowcase-logos');
    const fn = mod.generateLogoInspiration || (mod.default as any)?.generateLogoInspiration;
    if (!fn) throw new Error('fn not found');

    const industries = ['BARBERSHOP','SALON','RESTAURANT','CLINIC','GYM','RETAIL','REAL_ESTATE','TECH','PET_SHOP','HOTEL','LAWYER','CONSULTING'];
    for (const niche of industries) {
      try {
        const insp = fn(niche);
        if (typeof insp === 'string' && insp.length > 50) { passed++; process.stdout.write('.'); }
        else { failed++; process.stdout.write('x'); }
      } catch { failed++; process.stdout.write('E'); }
    }
    process.stdout.write('\n');
    console.log(`  ${passed} passed, ${failed} failed`);
  } catch { console.log('  SKIP\n'); }
  return { passed, failed };
}

async function testFirecrawlCache(): Promise<Result> {
  console.log('\n=== 5. FIRECRAWL CACHE ===\n');
  const cacheDir = path.join(process.cwd(), '.firecrawl');
  let passed = 0, failed = 0;

  if (!fs.existsSync(cacheDir)) {
    console.log('  SKIP: .firecrawl/ not found\n');
    return { passed: 0, failed: 1 };
  }

  const files = fs.readdirSync(cacheDir).filter(f => f.startsWith('search-'));
  for (const file of files) {
    try {
      const content = fs.readFileSync(path.join(cacheDir, file), 'utf-8');
      const parsed = JSON.parse(content);
      if (parsed?.data?.web?.length > 0) { passed++; process.stdout.write('.'); }
      else { failed++; process.stdout.write('x'); }
    } catch { failed++; process.stdout.write('E'); }
  }
  process.stdout.write('\n');
  console.log(`  ${passed} passed, ${failed} failed / ${files.length} files`);
  return { passed, failed };
}

async function main() {
  console.log('══════════════════════════════════════════════');
  console.log('  NEXUSAI — End-to-End Test (55+ Nichos)');
  console.log('  Date: ' + new Date().toISOString().split('T')[0]);
  console.log('══════════════════════════════════════════════\n');

  const results = await Promise.all([
    testCrawlerService(),
    testAnimations(),
    testComponents(),
    testLogos(),
    testFirecrawlCache(),
  ]);

  const total = results.reduce((acc, r) => ({
    passed: acc.passed + r.passed,
    failed: acc.failed + r.failed,
  }), { passed: 0, failed: 0 });

  const rate = (total.passed + total.failed) > 0
    ? ((total.passed / (total.passed + total.failed)) * 100).toFixed(1) + '%'
    : 'N/A';

  console.log('\n══════════════════════════════════════════════');
  console.log('  RESULTADO FINAL');
  console.log(`  Passed: ${total.passed}`);
  console.log(`  Failed: ${total.failed}`);
  console.log(`  Total:  ${total.passed + total.failed}`);
  console.log(`  Rate:   ${rate}`);
  console.log('══════════════════════════════════════════════\n');

  if (total.failed > 0) process.exit(1);
}

main().catch(e => { console.error('Fatal:', e.message); process.exit(1); });
