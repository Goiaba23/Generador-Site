'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { getNiche3DConfig, Niche3DConfig } from '@/lib/niche-3d-scenes';

export default function NicheScene3D({ businessType = 'DEFAULT' }: { businessType?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const config = getNiche3DConfig(businessType);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color('#0A0A0F');
    scene.fog = new THREE.FogExp2(config.fog.color, config.fog.density);

    const camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 0.1, 100);
    camera.position.set(0, 0, 7);

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: false });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.5;

    const ambient = new THREE.AmbientLight(0x404060, 1.2);
    scene.add(ambient);

    const key = new THREE.DirectionalLight(config.lights.key[0], config.lights.key[1]);
    key.position.set(4, 3, 5);
    scene.add(key);

    const fill = new THREE.DirectionalLight(config.lights.fill[0], config.lights.fill[1]);
    fill.position.set(-3, 1, 2);
    scene.add(fill);

    const rim = new THREE.DirectionalLight(config.lights.rim[0], config.lights.rim[1]);
    rim.position.set(0, -2, -4);
    scene.add(rim);

    const bgPos = new Float32Array(config.particleCount * 3);
    for (let i = 0; i < config.particleCount; i++) {
      const r = 4 + Math.random() * 8;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      bgPos[i * 3] = Math.sin(phi) * Math.cos(theta) * r;
      bgPos[i * 3 + 1] = Math.sin(phi) * Math.sin(theta) * r * 0.6;
      bgPos[i * 3 + 2] = Math.cos(phi) * r - 3;
    }
    const bgG = new THREE.BufferGeometry();
    bgG.setAttribute('position', new THREE.BufferAttribute(bgPos, 3));
    const bgM = new THREE.PointsMaterial({
      size: 0.025, color: config.primaryColor, transparent: true, opacity: 0.12,
      sizeAttenuation: true, blending: THREE.AdditiveBlending, depthWrite: false,
    });
    const bgPts = new THREE.Points(bgG, bgM);
    const bgGroup = new THREE.Group();
    bgGroup.add(bgPts);
    bgGroup.position.z = -3;
    scene.add(bgGroup);

    const mainGroup = new THREE.Group();
    const meshColor = new THREE.Color(config.primaryColor);
    const meshEmissive = new THREE.Color(config.secondaryColor);

    config.objects.forEach((geoType, i) => {
      const offset = (i - (config.objects.length - 1) / 2) * 1.8;
      let geo: THREE.BufferGeometry;
      switch (geoType) {
        case 'icosahedron': geo = new THREE.IcosahedronGeometry(0.6, 0); break;
        case 'dodecahedron': geo = new THREE.DodecahedronGeometry(0.5, 0); break;
        case 'torus': geo = new THREE.TorusGeometry(0.5, 0.15, 16, 40); break;
        case 'torusKnot': geo = new THREE.TorusKnotGeometry(0.4, 0.15, 64, 8); break;
        default: geo = new THREE.SphereGeometry(0.5, 16, 16);
      }
      const mat = new THREE.MeshPhysicalMaterial({
        color: meshColor, emissive: meshEmissive, emissiveIntensity: 0.08,
        metalness: 0.2, roughness: 0.03, clearcoat: 1, clearcoatRoughness: 0.08,
        transparent: true, opacity: 0.75, envMapIntensity: 2.5,
      });
      const mesh = new THREE.Mesh(geo, mat);
      mesh.position.x = offset;
      mesh.userData = { offset, speed: 0.3 + Math.random() * 0.2, phase: Math.random() * Math.PI * 2 };
      mainGroup.add(mesh);

      const innerMat = new THREE.MeshBasicMaterial({
        color: config.primaryColor, transparent: true, opacity: 0.12,
      });
      const inner = new THREE.Mesh(new THREE.SphereGeometry(0.25, 12, 12), innerMat);
      inner.position.x = offset;
      mainGroup.add(inner);
    });

    scene.add(mainGroup);

    const ring1Geo = new THREE.TorusGeometry(1.8, 0.012, 24, 80);
    const ring1Mat = new THREE.MeshBasicMaterial({ color: config.primaryColor, transparent: true, opacity: 0.08 });
    const ring1 = new THREE.Mesh(ring1Geo, ring1Mat);
    ring1.rotation.x = Math.PI * 0.4;

    const ring2Geo = new THREE.TorusGeometry(2.0, 0.01, 16, 80);
    const ring2Mat = new THREE.MeshBasicMaterial({ color: config.accentColor, transparent: true, opacity: 0.06 });
    const ring2 = new THREE.Mesh(ring2Geo, ring2Mat);
    ring2.rotation.z = Math.PI * 0.3;

    const ringGroup = new THREE.Group();
    ringGroup.add(ring1);
    ringGroup.add(ring2);
    scene.add(ringGroup);

    const orbMat = new THREE.MeshPhysicalMaterial({
      color: config.accentColor, emissive: config.accentColor, emissiveIntensity: 0.12,
      metalness: 0.3, roughness: 0.2, clearcoat: 0.5,
    });
    const orbs: THREE.Mesh[] = [];
    const orbCount = config.sceneType === 'neural-network' ? 20 : 10;
    for (let i = 0; i < orbCount; i++) {
      const s = new THREE.Mesh(new THREE.SphereGeometry(0.04, 6, 6), orbMat);
      s.userData = {
        angle: (i / orbCount) * Math.PI * 2, radius: 2.2 + Math.random() * 0.6,
        speed: 0.2 + Math.random() * 0.15, zOff: (Math.random() - 0.5) * 2.5,
      };
      mainGroup.add(s);
      orbs.push(s);
    }

    const layers = [
      { group: bgGroup, speed: 0.05, baseZ: -4 },
      { group: mainGroup, speed: 0.22, tilt: true, baseZ: 0 },
      { group: ringGroup, speed: 0.25, baseZ: 0.5 },
    ];

    const mouse = { x: 0, y: 0 };
    const target = { x: 0, y: 0 };

    const onMouse = (e: MouseEvent) => {
      target.x = (e.clientX / window.innerWidth) * 2 - 1;
      target.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', onMouse);

    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', onResize);

    let time = 0;
    let scrollProgress = 0;
    const onScroll = () => {
      const docEl = document.documentElement;
      const max = docEl.scrollHeight - window.innerHeight;
      scrollProgress = Math.min(1, Math.max(0, window.scrollY / max));
    };
    window.addEventListener('scroll', onScroll);
    const SCALE = 0.8;

    const animate = () => {
      requestAnimationFrame(animate);
      time += config.rotationSpeed;

      mouse.x += (target.x - mouse.x) * 0.035;
      mouse.y += (target.y - mouse.y) * 0.035;

      camera.fov = 40 + scrollProgress * 10;
      camera.updateProjectionMatrix();

      const speed = 1 + scrollProgress * 0.3;

      layers.forEach((layer) => {
        const g = layer.group;
        const f = layer.speed * SCALE * speed;
        g.position.x = mouse.x * f * 2;
        g.position.y = mouse.y * f * 1.5;
        if (layer.tilt) {
          g.rotation.x = mouse.y * 0.12;
          g.rotation.y = mouse.x * 0.18;
        }
      });

      mainGroup.children.forEach((child) => {
        if (child.type === 'Mesh' && 'userData' in child) {
          const mesh = child as THREE.Mesh;
          if (mesh.geometry.type !== 'SphereGeometry') {
            const d = child.userData as { offset: number; speed: number; phase: number };
            child.rotation.x += 0.005 * d.speed;
            child.rotation.y += 0.008 * d.speed;
            child.position.y = Math.sin(time * d.speed + d.phase) * 0.2;
          }
        }
      });

      ring1.rotation.z += 0.002;
      ring2.rotation.x += 0.003;
      bgGroup.rotation.y += 0.001;

      orbs.forEach((s) => {
        const d = s.userData as { angle: number; radius: number; speed: number; zOff: number };
        d.angle += d.speed * 0.02;
        s.position.x = Math.cos(d.angle + time * 0.35) * d.radius;
        s.position.y = Math.sin(d.angle + time * 0.35) * d.radius * 0.5;
        s.position.z = d.zOff;
      });

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      window.removeEventListener('mousemove', onMouse);
      window.removeEventListener('resize', onResize);
      window.removeEventListener('scroll', onScroll);
      renderer.dispose();
    };
  }, [config]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed', inset: 0, width: '100%', height: '100%',
        pointerEvents: 'none', zIndex: 0,
      }}
    />
  );
}
