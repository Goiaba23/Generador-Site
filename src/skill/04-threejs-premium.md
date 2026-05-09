# Skill: Three.js Premium Scenes & Shaders

**Fonte:** Three.js Journey (Bruno Simon), React Three Fiber, Codrops, JavaScript Mastery

## Técnicas de 3D Premium para Landing Pages

### 1. Arquitetura de Cena para Sites

**Camadas de uma cena premium:**
```
Background (shader/partículas) 
  → Objetos principais (geo personalizada, GLTF)
    → Iluminação (HDRI + direcionais + point lights)
      → Atmosfera (fog, depth, bloom)
        → Overlay UI (HTML por cima)
```

### 2. React Three Fiber Setup Ideal
```tsx
// Scene3D.tsx — componente principal
'use client';
import { Canvas } from '@react-three/fiber';
import { Environment, OrbitControls, PerspectiveCamera } from '@react-three/drei';

export default function Scene3D() {
  return (
    <Canvas dpr={[1, 2]} gl={{ antialias: true, alpha: true }}>
      <PerspectiveCamera makeDefault position={[0, 0, 5]} fov={45} />
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={1} />
      <Environment preset="city" />
      <mesh>
        <torusKnotGeometry args={[1, 0.3, 128, 16]} />
        <meshStandardMaterial color="#06B6D4" metalness={0.6} roughness={0.2} />
      </mesh>
    </Canvas>
  );
}
```

### 3. Técnicas de Iluminação
- **HDRI Environment**: reflexões realistas (presets: city, studio, sunset)
- **Three-point lighting**: key (principal) + fill (preenchimento) + rim (contorno)
- **Point lights** para destaque de produto
- **Spot lights** para dramaticidade
- **MeshPhysicalMaterial** para superfícies realistas (clearcoat, roughness, metalness)

### 4. Efeitos Visuais que Impressionam
- **Bloom** (pós-processamento): glow nos objetos claros
- **Depth of Field** (desfoque): sensação cinematográfica
- **Grain/Noise**: textura analógica sobre 3D
- **Gradients animados** em shaders GLSL
- **Partículas** (PointsMaterial): fundos vivos sem pesar

### 5. Técnicas de Interação
- **Mouse tracking**: objetos seguem cursor com lerp suave
- **Scroll-reactive**: camera ou objetos respondem ao scroll (Lenis + GSAP)
- **Click-to-change**: cores, estados, modelos
- **Hover distortion**: malha distorce ao passar mouse
- **Auto-rotation**: objeto gira lentamente (0.2-0.5 rad/s)

### 6. Performance Optimization
- `dpr={[1, 2]}` — cap no pixel ratio (nunca 3x em desktop)
- Usar `instancedMesh` para múltiplos objetos iguais
- `useBounds` para frustum culling automático
- Texturas comprimidas (KTX2) em vez de PNG/JPG
- `useFrame` otimizado (não usar em muitos componentes)
- Lazy load com `Suspense` + fallback shimmer

### 7. Shader GLSL Custom (assinatura visual)
```glsl
// Fragment shader para fundo animado
uniform float uTime;
uniform vec2 uResolution;

void main() {
  vec2 uv = gl_FragCoord.xy / uResolution;
  vec3 color1 = vec3(0.02, 0.02, 0.06);
  vec3 color2 = vec3(0.02, 0.71, 0.83);
  float mixFactor = sin(uv.x * 3.0 + uv.y * 2.0 + uTime * 0.3) * 0.5 + 0.5;
  gl_FragColor = vec4(mix(color1, color2, mixFactor), 1.0);
}
```

### 8. Estrutura de Projeto para Sites 3D
```
components/
  Scene3D.tsx          ← Canvas principal
  three/
    Shapes.tsx         ← Geometrias customizadas
    Particles.tsx      ← Sistema de partículas
    Lighting.tsx       ← Setup de luzes
    PostProcessing.tsx ← Bloom, DOF
    ShaderPlane.tsx    ← Fundo com shader
    Model.tsx          ← GLTF loader
```
