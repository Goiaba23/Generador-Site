// Pippit Service - AI Video Generator (CapCut)
// Docs: https://www.pippit.ai/
// Features: Link-to-Video, AI Avatars, Image-to-Video, Batch Creation

export interface PippitConfig {
  apiKey?: string; // Pippit API key (from CapCut)
  baseUrl?: string; // API base URL
}

export interface PippitVideoRequest {
  type: 'link-to-video' | 'script-to-video' | 'image-to-video' | 'avatar-video';
  // For link-to-video
  productUrl?: string; // TikTok Shop, Amazon, Shopify link
  // For script-to-video
  script?: string;
  // For image-to-video
  imageUrls?: string[];
  // Common
  voice?: string; // Voice ID or 'custom'
  avatarId?: string; // AI avatar ID
  language?: string; // 'en', 'es', 'pt', etc.
  duration?: number; // seconds (max 60)
  style?: 'marketing' | 'tutorial' | 'social' | 'cinematic';
  aspectRatio?: '16:9' | '9:16' | '1:1';
  captions?: boolean;
}

export interface PippitVideoResult {
  success: boolean;
  videoUrl?: string;
  thumbnailUrl?: string;
  duration: number;
  avatarUsed?: string;
  voiceUsed?: string;
  script?: string; // Generated script
  error?: string;
}

export interface PippitAvatar {
  id: string;
  name: string;
  gender: 'male' | 'female' | 'neutral';
  style: string; // 'professional', 'casual', 'animated'
  languages: string[];
  previewUrl?: string;
}

export interface PippitVoice {
  id: string;
  name: string;
  gender: 'male' | 'female';
  accent: string;
  language: string;
  emotion: string[]; // 'calm', 'energetic', 'dramatic'
}

export class PippitService {
  private static instance: PippitService;
  private config: PippitConfig;

  constructor() {
    this.config = {
      apiKey: process.env.PIPPIT_API_KEY || '',
      baseUrl: process.env.PIPPIT_BASE_URL || 'https://api.pippit.ai/v1',
    };
  }

  public static getInstance(): PippitService {
    if (!PippitService.instance) {
      PippitService.instance = new PippitService();
    }
    return PippitService.instance;
  }

  /**
   * Get an asset (image or video) for a specific niche
   */
  async getAssetForNiche(businessName: string, type: 'video' | 'image'): Promise<string | null> {
    console.log(`[Pippit] Getting asset for niche: ${businessName} (${type})...`);
    // Placeholder URL for now
    return `https://storage.pippit.ai/assets/${type}/${businessName.toLowerCase().replace(/ /g, '-')}.mp4`;
  }

  /**
   * Check if Pippit is available
   */
  async isAvailable(): Promise<boolean> {
    if (!this.config.apiKey) {
      console.log('[Pippit] No API key available');
      return false;
    }
    return true;
  }

  /**
   * Generate video from product link (TikTok Shop, Amazon, Shopify)
   * Best for: E-commerce product showcases
   */
  async generateFromLink(request: {
    productUrl: string;
    style?: 'marketing' | 'tutorial' | 'social';
    duration?: number;
    voice?: string;
    avatarId?: string;
  }): Promise<PippitVideoResult> {
    try {
      if (!(await this.isAvailable())) {
        throw new Error('Pippit API not available');
      }

      console.log(`[Pippit] Generating video from link: ${request.productUrl}`);

      // Pippit API call (hypothetical - real API may differ)
      const response = await fetch(`${this.config.baseUrl}/videos/generate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.config.apiKey}`,
        },
        body: JSON.stringify({
          type: 'link_to_video',
          source_url: request.productUrl,
          style: request.style || 'marketing',
          duration: request.duration || 30,
          voice: request.voice || 'auto',
          avatar_id: request.avatarId || 'none',
          generate_script: true,
          add_captions: true,
        }),
      });

      if (!response.ok) {
        throw new Error(`Pippit API error: ${response.statusText}`);
      }

      const data = await response.json();

      return {
        success: true,
        videoUrl: data.video_url || '',
        thumbnailUrl: data.thumbnail_url || '',
        duration: data.duration || request.duration || 30,
        avatarUsed: data.avatar?.name,
        voiceUsed: data.voice?.name,
        script: data.script,
      };
    } catch (error: any) {
      console.error('[Pippit] Link-to-video failed:', error);
      return {
        success: false,
        duration: 0,
        error: error.message,
      };
    }
  }

  /**
   * Generate video from script with AI avatar
   * Best for: Tutorials, explainer videos, social content
   */
  async generateFromScript(request: {
    script: string;
    avatarId?: string;
    voice?: string;
    language?: string;
    style?: 'marketing' | 'tutorial' | 'social' | 'cinematic';
  }): Promise<PippitVideoResult> {
    try {
      if (!(await this.isAvailable())) {
        throw new Error('Pippit API not available');
      }

      console.log(`[Pippit] Generating video from script (${request.script.length} chars)...`);

      const response = await fetch(`${this.config.baseUrl}/videos/generate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.config.apiKey}`,
        },
        body: JSON.stringify({
          type: 'script_to_video',
          script: request.script,
          avatar_id: request.avatarId || 'default',
          voice: request.voice || 'auto',
          language: request.language || 'en',
          style: request.style || 'marketing',
          add_captions: true,
          aspect_ratio: '16:9',
        }),
      });

      if (!response.ok) {
        throw new Error(`Pippit script-to-video failed: ${response.statusText}`);
      }

      const data = await response.json();

      return {
        success: true,
        videoUrl: data.video_url || '',
        thumbnailUrl: data.thumbnail_url || '',
        duration: data.duration || 30,
        avatarUsed: data.avatar?.name,
        voiceUsed: data.voice?.name,
        script: request.script,
      };
    } catch (error: any) {
      console.error('[Pippit] Script-to-video failed:', error);
      return {
        success: false,
        duration: 0,
        error: error.message,
      };
    }
  }

  /**
   * Animate static images into dynamic videos
   * Best for: Product showcases, before/after, image galleries
   */
  async animateImages(request: {
    imageUrls: string[];
    prompt: string; // Animation description
    duration?: number;
    transition?: 'fade' | 'slide' | 'zoom' | 'none';
  }): Promise<PippitVideoResult> {
    try {
      if (!(await this.isAvailable())) {
        throw new Error('Pippit API not available');
      }

      console.log(`[Pippit] Animating ${request.imageUrls.length} images...`);

      const response = await fetch(`${this.config.baseUrl}/videos/image-to-video`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.config.apiKey}`,
        },
        body: JSON.stringify({
          type: 'image_to_video',
          images: request.imageUrls,
          animation_prompt: request.prompt,
          duration: request.duration || 15,
          transition: request.transition || 'fade',
          add_music: true,
        }),
      });

      if (!response.ok) {
        throw new Error(`Pippit image-to-video failed: ${response.statusText}`);
      }

      const data = await response.json();

      return {
        success: true,
        videoUrl: data.video_url || '',
        thumbnailUrl: data.thumbnail_url || '',
        duration: data.duration || request.duration || 15,
      };
    } catch (error: any) {
      console.error('[Pippit] Image-to-video failed:', error);
      return {
        success: false,
        duration: 0,
        error: error.message,
      };
    }
  }

  /**
   * Get available AI avatars
   */
  async getAvatars(): Promise<PippitAvatar[]> {
    try {
      if (!this.config.apiKey) return this.getMockAvatars();

      const response = await fetch(`${this.config.baseUrl}/avatars`, {
        headers: { 'Authorization': `Bearer ${this.config.apiKey}` },
      });

      if (!response.ok) return this.getMockAvatars();

      const data = await response.json();
      return data.avatars || this.getMockAvatars();
    } catch {
      return this.getMockAvatars();
    }
  }

  /**
   * Get available voices
   */
  async getVoices(language?: string): Promise<PippitVoice[]> {
    try {
      if (!this.config.apiKey) return this.getMockVoices();

      const url = language
        ? `${this.config.baseUrl}/voices?language=${language}`
        : `${this.config.baseUrl}/voices`;

      const response = await fetch(url, {
        headers: { 'Authorization': `Bearer ${this.config.apiKey}` },
      });

      if (!response.ok) return this.getMockVoices();

      const data = await response.json();
      return data.voices || this.getMockVoices();
    } catch {
      return this.getMockVoices();
    }
  }

  /**
   * Build super prompt for Pippit integration
   */
  buildPippitPrompt(
    businessType: string,
    objective: string,
    style: string
  ): string {
    return `
=== PIPPIT AI VIDEO INTEGRATION ===
BUSINESS TYPE: ${businessType}
OBJECTIVE: ${objective}
STYLE: ${style}

PIPPIT CAPABILITIES TO USE:
1. LINK-TO-VIDEO: Convert product pages into marketing videos
2. SCRIPT-TO-VIDEO: AI avatars with lip-sync for tutorials/testimonials
3. IMAGE-TO-VIDEO: Animate static product images with smooth transitions
4. BATCH CREATION: Generate multiple video variants for A/B testing
5. AI AVATARS: 500+ realistic avatars in 28+ languages
6. AUTO-CAPTIONS: Perfect for social media (TikTok, Reels, Shorts)

VIDEO PROMPTS TO GENERATE:
1. Hero Video: "Create 15s marketing video for ${businessType}, ${style} style, dynamic cuts, upbeat music"
2. Product Showcase: "Animate product images with zoom effects, smooth transitions, professional lighting"
3. Tutorial Video: "AI avatar explains ${objective}, clear speech, engaging gestures, captions enabled"
4. Social Media: "Create 9:16 vertical video for TikTok/Reels, trendy effects, fast-paced editing"

INTEGRATION WITH SITE:
- Embed Pippit videos in <video> tags with GSAP scroll-triggered playback
- Use Pippit avatars for testimonial sections
- Auto-generate social media content for sharing buttons

EXAMPLE PIPPIT SCRIPT FOR AI AVATAR:
"Hi! Welcome to ${businessType}. We specialize in ${objective}. 
Our team is here to provide you with the best service possible. 
Book now and see the difference!"

PIPPIT MODELS AVAILABLE:
- Pippit Max: Highest quality, 4K upscaling
- Pippit Lite: Fast generation, good for bulk content
- Pippit Standard: Balanced speed/quality
`;
  }

  // Mock data for when API is not available
  private getMockAvatars(): PippitAvatar[] {
    return [
      { id: 'avatar-001', name: 'Professional Male', gender: 'male', style: 'professional', languages: ['en', 'es', 'pt'] },
      { id: 'avatar-002', name: 'Friendly Female', gender: 'female', style: 'casual', languages: ['en', 'pt', 'fr'] },
      { id: 'avatar-003', name: 'Corporate Male', gender: 'male', style: 'professional', languages: ['en', 'es'] },
    ];
  }

  private getMockVoices(): PippitVoice[] {
    return [
      { id: 'voice-001', name: 'James', gender: 'male', accent: 'American', language: 'en', emotion: ['calm', 'professional'] },
      { id: 'voice-002', name: 'Maria', gender: 'female', accent: 'Neutral', language: 'en', emotion: ['energetic', 'friendly'] },
      { id: 'voice-003', name: 'Carlos', gender: 'male', accent: 'Latin American', language: 'es', emotion: ['calm', 'warm'] },
    ];
  }
}

// Export singleton
export const pippitService = new PippitService();
