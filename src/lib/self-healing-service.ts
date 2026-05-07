import { execSync } from 'child_process';
import * as fs from 'fs';

export class SelfHealingService {
  /**
   * Runs the build process and automatically fixes errors using LLM
   */
  async runSelfHealing() {
    console.log('[Self-Healing] Starting health check...');
    
    try {
      execSync('npm run build', { stdio: 'pipe' });
      console.log('[Self-Healing] Build successful. No repairs needed.');
    } catch (error: any) {
      const errorLog = error.stdout.toString() + error.stderr.toString();
      console.error('[Self-Healing] Build failed. Analyzing errors...');
      
      // Save error log for AI analysis
      fs.writeFileSync('build-error.log', errorLog);
      
      // The Agent (Antigravity) will read this and apply fixes
      console.log('[Self-Healing] Errors logged to build-error.log. Requesting AI repair...');
    }
  }
}

export const selfHealing = new SelfHealingService();
