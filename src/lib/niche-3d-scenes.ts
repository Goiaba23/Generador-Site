export interface Niche3DConfig {
  primaryColor: number;
  secondaryColor: number;
  accentColor: number;
  sceneType: 'floating-orbs' | 'neural-network' | 'geometric-shapes' | 'particle-swarm' | 'product-rotate';
  particleCount: number;
  rotationSpeed: number;
  intensity: 'subtle' | 'medium' | 'high';
  objects: ('icosahedron' | 'dodecahedron' | 'torus' | 'sphere' | 'torusKnot')[];
  fog: { color: number; density: number };
  lights: { key: number[]; fill: number[]; rim: number[] };
}

const sceneConfigs: Record<string, Niche3DConfig> = {
  RESTAURANT: {
    primaryColor: 0x06b6d4,
    secondaryColor: 0xf59e0b,
    accentColor: 0xd4a574,
    sceneType: 'floating-orbs',
    particleCount: 1200,
    rotationSpeed: 0.004,
    intensity: 'medium',
    objects: ['torus', 'sphere'],
    fog: { color: 0x0a0a0f, density: 0.035 },
    lights: { key: [0x06b6d4, 3], fill: [0xf59e0b, 1.5], rim: [0xd4a574, 2] },
  },
  BARBERSHOP: {
    primaryColor: 0xd4af37,
    secondaryColor: 0x1a1a2e,
    accentColor: 0x8b7355,
    sceneType: 'geometric-shapes',
    particleCount: 800,
    rotationSpeed: 0.003,
    intensity: 'high',
    objects: ['dodecahedron', 'torus', 'torusKnot'],
    fog: { color: 0x0a0a0a, density: 0.04 },
    lights: { key: [0xd4af37, 4], fill: [0x8b7355, 2], rim: [0xffffff, 1.5] },
  },
  SALON: {
    primaryColor: 0xec4899,
    secondaryColor: 0xfdf2f8,
    accentColor: 0xbe185d,
    sceneType: 'particle-swarm',
    particleCount: 1500,
    rotationSpeed: 0.005,
    intensity: 'medium',
    objects: ['sphere', 'torus'],
    fog: { color: 0x1a0a14, density: 0.03 },
    lights: { key: [0xec4899, 3.5], fill: [0xfdf2f8, 1], rim: [0xbe185d, 2] },
  },
  CLINIC: {
    primaryColor: 0x3b82f6,
    secondaryColor: 0xf0f9ff,
    accentColor: 0x1d4ed8,
    sceneType: 'floating-orbs',
    particleCount: 600,
    rotationSpeed: 0.002,
    intensity: 'subtle',
    objects: ['sphere', 'icosahedron'],
    fog: { color: 0x0a0a1a, density: 0.025 },
    lights: { key: [0x3b82f6, 2.5], fill: [0xf0f9ff, 0.8], rim: [0x1d4ed8, 2] },
  },
  GYM: {
    primaryColor: 0xef4444,
    secondaryColor: 0x0a0a0a,
    accentColor: 0xdc2626,
    sceneType: 'geometric-shapes',
    particleCount: 1000,
    rotationSpeed: 0.006,
    intensity: 'high',
    objects: ['torusKnot', 'dodecahedron', 'icosahedron'],
    fog: { color: 0x050505, density: 0.05 },
    lights: { key: [0xef4444, 4], fill: [0xffffff, 1], rim: [0xdc2626, 3] },
  },
  TECH: {
    primaryColor: 0x8b5cf6,
    secondaryColor: 0x06b6d4,
    accentColor: 0x3b82f6,
    sceneType: 'neural-network',
    particleCount: 2000,
    rotationSpeed: 0.005,
    intensity: 'high',
    objects: ['icosahedron', 'torusKnot', 'dodecahedron'],
    fog: { color: 0x0a0a1a, density: 0.03 },
    lights: { key: [0x8b5cf6, 3], fill: [0x06b6d4, 2], rim: [0x3b82f6, 2.5] },
  },
  RETAIL: {
    primaryColor: 0x10b981,
    secondaryColor: 0xffffff,
    accentColor: 0x047857,
    sceneType: 'product-rotate',
    particleCount: 400,
    rotationSpeed: 0.003,
    intensity: 'subtle',
    objects: ['sphere', 'torus'],
    fog: { color: 0x0a0f0a, density: 0.02 },
    lights: { key: [0x10b981, 3], fill: [0xffffff, 1.5], rim: [0x047857, 2] },
  },
  HOTEL: {
    primaryColor: 0xd4a574,
    secondaryColor: 0xf5f0eb,
    accentColor: 0x8b7355,
    sceneType: 'floating-orbs',
    particleCount: 900,
    rotationSpeed: 0.003,
    intensity: 'subtle',
    objects: ['torus', 'sphere'],
    fog: { color: 0x0a0806, density: 0.025 },
    lights: { key: [0xd4a574, 3], fill: [0xf5f0eb, 1.5], rim: [0x8b7355, 2] },
  },
  PET_SHOP: {
    primaryColor: 0x10b981,
    secondaryColor: 0xf59e0b,
    accentColor: 0x047857,
    sceneType: 'particle-swarm',
    particleCount: 600,
    rotationSpeed: 0.004,
    intensity: 'medium',
    objects: ['sphere', 'torus'],
    fog: { color: 0x0a0f0a, density: 0.03 },
    lights: { key: [0x10b981, 3], fill: [0xf59e0b, 1.5], rim: [0xffffff, 1.5] },
  },
  REAL_ESTATE: {
    primaryColor: 0x2563eb,
    secondaryColor: 0xf0f9ff,
    accentColor: 0x1d4ed8,
    sceneType: 'geometric-shapes',
    particleCount: 700,
    rotationSpeed: 0.002,
    intensity: 'subtle',
    objects: ['icosahedron', 'dodecahedron'],
    fog: { color: 0x080a12, density: 0.02 },
    lights: { key: [0x2563eb, 2.5], fill: [0xf0f9ff, 1], rim: [0x1d4ed8, 2] },
  },
  DEFAULT: {
    primaryColor: 0x06b6d4,
    secondaryColor: 0x3b82f6,
    accentColor: 0xd4a574,
    sceneType: 'floating-orbs',
    particleCount: 1000,
    rotationSpeed: 0.004,
    intensity: 'medium',
    objects: ['icosahedron', 'dodecahedron'],
    fog: { color: 0x0a0a0f, density: 0.035 },
    lights: { key: [0x06b6d4, 3], fill: [0x3b82f6, 1.5], rim: [0xd4a574, 2] },
  },
};

export function getNiche3DConfig(businessType: string): Niche3DConfig {
  return sceneConfigs[businessType] || sceneConfigs.DEFAULT;
}

export function getNiche3DScene(businessType: string): Niche3DConfig['sceneType'] {
  return getNiche3DConfig(businessType).sceneType;
}

export default { getNiche3DConfig, getNiche3DScene };
