// Flow Service - Google Flow API Integration for 3D Animations
// Docs: https://labs.google/flow & https://support.google.com/flow/

export interface FlowConfig {
  apiKey?: string; // Google AI API key (same as Gemini)
  subscription: 'free' | 'pro' | 'ultra';
  credits: number;
}

export interface FlowGenerationRequest {
  type: 'text-to-video' | 'image-to-video' | 'ingredients-to-video' | 'animate-image';
  prompt: string;
  imageUrl?: string; // For image-to-video or animate-image
  startFrameUrl?: string;
  endFrameUrl?: string;
  ingredients?: string[]; // Image URLs for consistency
  aspectRatio?: '16:9' | '9:16' | '1:1';
  duration?: number; // seconds (max 60 for free)
  model?: 'veo-3.1' | 'nano-banana-pro';
  cameraMotion?: {
    type: 'pan' | 'zoom' | 'dolly' | 'orbit';
    direction?: string;
  };
}

export interface FlowGenerationResult {
  success: boolean;
  videoUrl?: string;
  thumbnailUrl?: string;
  creditsUsed: number;
  model: string;
  error?: string;
}

export class FlowService {
  private config: FlowConfig;
  private baseUrl = 'https://flow.googleapis.com/v1'; // hypothetical API endpoint

  constructor() {
    this.config = {
      apiKey: process.env.GEMINI_API_KEY || '',
      subscription: (process.env.FLOW_SUBSCRIPTION as any) || 'free',
      credits: parseInt(process.env.FLOW_CREDITS || '100'),
    };
  }

  /**
   * Check if Flow is available
   */
  async isAvailable(): Promise<boolean> {
    if (!this.config.apiKey) {
      console.log('[Flow] No API key available');
      return false;
    }
    return true;
  }

  /**
   * Generate video from text prompt (3D-aware with spatial reasoning)
   */
  async generateTextToVideo(request: FlowGenerationRequest): Promise<FlowGenerationResult> {
    try {
      if (!(await this.isAvailable())) {
        throw new Error('Flow API not available');
      }

      console.log(`[Flow] Generating 3D video: ${request.prompt.substring(0, 50)}...`);

      // Use Veo 3.1 API (Flow's underlying model)
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/veo-3.1:generateVideo?key=${this.config.apiKey}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            instances: [{
              prompt: request.prompt,
            }],
            parameters: {
              aspectRatio: request.aspectRatio || '16:9',
              durationSeconds: request.duration || 5,
              personGeneration: 'allow_adult',
              ...(request.cameraMotion && { cameraMotion: request.cameraMotion }),
            },
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`Flow API error: ${response.statusText}`);
      }

      const data = await response.json();
      
      return {
        success: true,
        videoUrl: data.video?.uri || '',
        thumbnailUrl: data.video?.thumbnailUri || '',
        creditsUsed: this.getCreditsForModel(request.model || 'veo-3.1'),
        model: request.model || 'veo-3.1',
      };
    } catch (error: any) {
      console.error('[Flow] Text-to-video failed:', error);
      return {
        success: false,
        creditsUsed: 0,
        model: request.model || 'veo-3.1',
        error: error.message,
      };
    }
  }

  /**
   * Animate static image into 3D video with camera movement
   */
  async animateImage(
    imageUrl: string,
    animationPrompt: string,
    cameraMotion?: { type: 'pan' | 'zoom' | 'dolly'; direction?: string }
  ): Promise<FlowGenerationResult> {
    try {
      if (!(await this.isAvailable())) {
        throw new Error('Flow API not available');
      }

      console.log(`[Flow] Animating image with 3D camera: ${animationPrompt.substring(0, 50)}...`);

      // Use Veo 3.1 image-to-video capability
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/veo-3.1:generateVideo?key=${this.config.apiKey}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            instances: [{
              prompt: animationPrompt,
              image: { gcsUri: imageUrl },
            }],
            parameters: {
              aspectRatio: '16:9',
              durationSeconds: 5,
              ...(cameraMotion && { cameraMotion }),
            },
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`Flow animate image failed: ${response.statusText}`);
      }

      const data = await response.json();

      return {
        success: true,
        videoUrl: data.video?.uri || '',
        thumbnailUrl: data.video?.thumbnailUri || '',
        creditsUsed: 15, // Image animation costs 15 credits on Pro
        model: 'veo-3.1-image-to-video',
      };
    } catch (error: any) {
      console.error('[Flow] Animate image failed:', error);
      return {
        success: false,
        creditsUsed: 0,
        model: 'veo-3.1-image-to-video',
        error: error.message,
      };
    }
  }

  /**
   * Create consistent character/video sequence using ingredients (reference images)
   */
  async generateWithIngredients(
    prompt: string,
    ingredientImages: string[], // Array of image URLs for consistency
    options?: { aspectRatio?: string; duration?: number }
  ): Promise<FlowGenerationResult> {
    try {
      if (!(await this.isAvailable())) {
        throw new Error('Flow API not available');
      }

      console.log(`[Flow] Generating with ${ingredientImages.length} ingredients for consistency...`);

      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/veo-3.1:generateVideo?key=${this.config.apiKey}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            instances: [{
              prompt,
              ingredients: ingredientImages.map((url) => ({ gcsUri: url })),
            }],
            parameters: {
              aspectRatio: options?.aspectRatio || '16:9',
              durationSeconds: options?.duration || 5,
            },
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`Flow ingredients API error: ${response.statusText}`);
      }

      const data = await response.json();

      return {
        success: true,
        videoUrl: data.video?.uri || '',
        thumbnailUrl: data.video?.thumbnailUri || '',
        creditsUsed: 20, // Ingredients cost more
        model: 'veo-3.1-ingredients',
      };
    } catch (error: any) {
      console.error('[Flow] Ingredients generation failed:', error);
      return {
        success: false,
        creditsUsed: 0,
        model: 'veo-3.1-ingredients',
        error: error.message,
      };
    }
  }

  /**
   * Extend existing video (continue the scene)
   */
  async extendVideo(
    videoUrl: string,
    extensionPrompt: string,
    duration: number = 5
  ): Promise<FlowGenerationResult> {
    try {
      if (!(await this.isAvailable())) {
        throw new Error('Flow API not available');
      }

      console.log(`[Flow] Extending video: ${extensionPrompt.substring(0, 50)}...`);

      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/veo-3.1:extendVideo?key=${this.config.apiKey}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            instances: [{
              prompt: extensionPrompt,
              video: { gcsUri: videoUrl },
            }],
            parameters: {
              durationSeconds: duration,
            },
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`Flow extend video failed: ${response.statusText}`);
      }

      const data = await response.json();

      return {
        success: true,
        videoUrl: data.video?.uri || '',
        thumbnailUrl: data.video?.thumbnailUri || '',
        creditsUsed: 12,
        model: 'veo-3.1-extend',
      };
    } catch (error: any) {
      console.error('[Flow] Extend video failed:', error);
      return {
        success: false,
        creditsUsed: 0,
        model: 'veo-3.1-extend',
        error: error.message,
      };
    }
  }

  /**
   * Get credits cost for different models
   */
  private getCreditsForModel(model: string): number {
    const costs: Record<string, number> = {
      'veo-3.1': 20,
      'nano-banana-pro': 10,
      'veo-3.1-image-to-video': 15,
      'veo-3.1-ingredients': 20,
      'veo-3.1-extend': 12,
    };
    return costs[model] || 20;
  }

  /**
   * Get current credits balance
   */
  getCredits(): number {
    return this.config.credits;
  }

  /**
   * Build super prompt for 3D animations using Flow
   */
  build3DAnimationPrompt(
    businessType: string,
    style: string,
    elements: string[] // Elements to animate (logo, product, hero image)
  ): string {
    return `
=== FLOW 3D ANIMATION CONFIGURATION ===
BUSINESS TYPE: ${businessType}
STYLE: ${style}

ELEMENTS TO ANIMATE:
${elements.map((el, i) => `${i + 1}. ${el}`).join('\n')}

FLOW CAPABILITIES TO USE:
1. SPATIAL 3D AWARENESS: Use Veo 3.1's 3D spatial reasoning for realistic camera movements
2. CAMERA MOTIONS: 
   - Dolly: Move camera forward/backward through scene
   - Pan: Horizontal camera movement
   - Zoom: Focal length change
   - Orbit: Rotate camera around subject
3. IMAGE-TO-VIDEO: Animate static images with camera movements
4. INGREDIENTS: Use reference images for character/product consistency
5. SCENE EXTENSION: Extend animations seamlessly

3D ANIMATION PROMPTS TO GENERATE:
1. Hero Section: "Camera slowly dollies through ${businessType} hero scene, 3D parallax effect, depth of field"
2. Logo Animation: "Animate ${businessType} logo with 3D rotation, lighting effects, professional reveal"
3. Product Showcase: "3D product rotation, orbital camera, dramatic lighting, cinematic reveal"
4. Background Animation: "Animate background with 3D particles, depth, camera pan, immersive environment"

INTEGRATION WITH GSAP:
- Use Flow-generated videos as <video> sources
- GSAP controls playback timing, scroll-triggered playback
- Layer Flow 3D videos with GSAP text overlays

EXAMPLE FLOW PROMPT:
"Animate this ${businessType} hero image with a slow dolly-in camera movement, adding 3D depth to the background, subtle parallax on foreground elements, cinematic lighting, 5 seconds duration"
`;
  }
}

// Export singleton
export const flowService = new FlowService();
