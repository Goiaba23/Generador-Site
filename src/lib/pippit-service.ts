import { chromium, Browser, Page } from 'playwright';

/**
 * PippitService handles autonomous asset generation by creating temporary accounts
 * on pippit.ai using temp-mail.org to bypass credit limits.
 */
export class PippitService {
  private static instance: PippitService;
  private browser: Browser | null = null;

  private constructor() {}

  public static getInstance(): PippitService {
    if (!PippitService.instance) {
      PippitService.instance = new PippitService();
    }
    return PippitService.instance;
  }

  /**
   * Main entry point to get an asset for a niche
   */
  async getAssetForNiche(niche: string, type: 'video' | 'image' = 'video'): Promise<string | null> {
    try {
      console.log(`[PippitService] Starting asset generation for niche: ${niche}`);
      const email = await this.getTempEmail();
      if (!email) throw new Error('Failed to get temp email');

      const page = await this.signUpOnPippit(email);
      if (!page) throw new Error('Failed to sign up on Pippit');

      const assetUrl = await this.generateAsset(page, niche, type);
      return assetUrl;
    } catch (error) {
      console.error('[PippitService] Error in asset generation:', error);
      return null;
    } finally {
      if (this.browser) {
        await this.browser.close();
        this.browser = null;
      }
    }
  }

  private async getTempEmail(): Promise<string | null> {
    this.browser = await chromium.launch({ headless: true });
    const context = await this.browser.newContext();
    const page = await context.newPage();
    
    console.log('[PippitService] Fetching temp email from temp-mail.org...');
    await page.goto('https://temp-mail.org/en/');
    
    // Wait for the email to be generated in the input field
    await page.waitForSelector('#mail', { timeout: 30000 });
    const email = await page.inputValue('#mail');
    console.log(`[PippitService] Temp email acquired: ${email}`);
    return email;
  }

  private async signUpOnPippit(email: string): Promise<Page | null> {
    if (!this.browser) return null;
    const context = this.browser.contexts()[0];
    const page = await context.newPage();

    console.log('[PippitService] Navigating to Pippit.ai signup...');
    await page.goto('https://www.pippit.ai/pt-br');
    
    // Logic to click login -> continue with email -> create account
    await page.click('text=Login');
    await page.click('text=Continuar com e-mail');
    await page.click('text=Crie uma conta');

    // Fill email and send code
    await page.fill('input[type="email"]', email);
    await page.click('button:has-text("Enviar código")');
    console.log('[PippitService] Verification code sent. Waiting for email...');

    // Switch back to temp-mail to get the code
    const tempMailPage = this.browser.contexts()[0].pages()[0];
    await tempMailPage.bringToFront();
    
    // Poll for the email to arrive (wait up to 2 minutes)
    let code: string | null = null;
    for (let i = 0; i < 24; i++) {
      await tempMailPage.waitForTimeout(5000);
      const emailContent = await tempMailPage.textContent('.inbox-dataList');
      if (emailContent && emailContent.includes('Pippit')) {
        // Click the email to see the code
        await tempMailPage.click('text=Pippit');
        await tempMailPage.waitForSelector('text=Seu código de verificação');
        const fullText = await tempMailPage.textContent('body');
        const match = fullText?.match(/\d{6}/); // 6 digit code
        if (match) {
          code = match[0];
          break;
        }
      }
    }

    if (!code) throw new Error('Verification code not found');
    console.log(`[PippitService] Code acquired: ${code}`);

    // Back to Pippit to enter code and password
    await page.bringToFront();
    await page.fill('input[placeholder="Código de verificação"]', code);
    await page.fill('input[type="password"]', 'PippitMaster123!');
    await page.click('button:has-text("Criar conta")');

    // Handle age confirmation if needed
    try {
      await page.waitForSelector('text=Eu tenho 18 anos', { timeout: 5000 });
      await page.click('text=Eu tenho 18 anos');
      await page.click('button:has-text("Confirmar")');
    } catch (e) {
      // Might not appear if already confirmed or redirect happened
    }

    return page;
  }

  private async generateAsset(page: Page, niche: string, type: 'video' | 'image'): Promise<string | null> {
    console.log(`[PippitService] Generating ${type} for ${niche}...`);
    // Example prompt based on niche
    const prompt = `Premium high-end 4k ${type} for a ${niche} business, professional lighting, cinematic, 8k resolution`;
    
    await page.click('text=Criar'); // Hypothetical button name
    await page.fill('textarea', prompt);
    await page.click('button:has-text("Gerar")');

    // Wait for generation to finish (Pippit can take 30-60s)
    await page.waitForSelector('.generation-complete', { timeout: 120000 });
    
    // Get the result URL
    const assetUrl = await page.getAttribute('img.result, video.result', 'src');
    console.log(`[PippitService] Asset generated successfully: ${assetUrl}`);
    return assetUrl;
  }
}
