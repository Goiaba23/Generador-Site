'use client';

import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

interface ProductViewer3DProps {
  imageUrl?: string;
  height?: number;
  autoRotate?: boolean;
}

export default function ProductViewer3D({ imageUrl, height = 400, autoRotate = true }: ProductViewer3DProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0a0a0f);

    const camera = new THREE.PerspectiveCamera(35, canvas.clientWidth / canvas.clientHeight, 0.1, 100);
    camera.position.z = 4;

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    renderer.setSize(canvas.clientWidth, canvas.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.5;

    const ambient = new THREE.AmbientLight(0x404060, 1);
    scene.add(ambient);

    const key = new THREE.DirectionalLight(0x06b6d4, 4);
    key.position.set(3, 4, 5);
    scene.add(key);

    const fill = new THREE.DirectionalLight(0x3b82f6, 2);
    fill.position.set(-3, 1, 2);
    scene.add(fill);

    const rim = new THREE.DirectionalLight(0xffffff, 1.5);
    rim.position.set(0, -2, -3);
    scene.add(rim);

    const group = new THREE.Group();

    const boxGeo = new THREE.BoxGeometry(1.2, 1.2, 1.2);
    const boxMat = new THREE.MeshPhysicalMaterial({
      color: 0x06b6d4, metalness: 0.3, roughness: 0.1,
      clearcoat: 1, clearcoatRoughness: 0.05,
      transparent: true, opacity: 0.9,
    });
    const box = new THREE.Mesh(boxGeo, boxMat);
    group.add(box);

    const edgeGeo = new THREE.EdgesGeometry(boxGeo);
    const edgeMat = new THREE.LineBasicMaterial({
      color: 0x3b82f6, transparent: true, opacity: 0.3,
    });
    const edges = new THREE.LineSegments(edgeGeo, edgeMat);
    group.add(edges);

    const sphereGeo = new THREE.SphereGeometry(0.8, 24, 24);
    const sphereMat = new THREE.MeshPhysicalMaterial({
      color: 0x0a0a0f, metalness: 0.8, roughness: 0.05,
      clearcoat: 1, envMapIntensity: 3,
    });
    const sphere = new THREE.Mesh(sphereGeo, sphereMat);

    const ringGeo = new THREE.TorusGeometry(1.5, 0.015, 16, 60);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0x06b6d4, transparent: true, opacity: 0.15,
    });
    const ring = new THREE.Mesh(ringGeo, ringMat);
    ring.rotation.x = Math.PI * 0.5;

    const ring2 = ring.clone();
    ring2.scale.set(0.7, 0.7, 0.7);
    ring2.material = ringMat.clone();
    (ring2.material as THREE.MeshBasicMaterial).color.setHex(0x3b82f6);
    (ring2.material as THREE.MeshBasicMaterial).opacity = 0.1;

    group.add(sphere);
    group.add(ring);
    group.add(ring2);

    scene.add(group);

    const particlesGeo = new THREE.BufferGeometry();
    const particleCount = 200;
    const pos = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i++) {
      pos[i] = (Math.random() - 0.5) * 8;
    }
    particlesGeo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    const particlesMat = new THREE.PointsMaterial({
      size: 0.02, color: 0x06b6d4, transparent: true, opacity: 0.2,
      blending: THREE.AdditiveBlending, sizeAttenuation: true,
    });
    const particles = new THREE.Points(particlesGeo, particlesMat);
    scene.add(particles);

    let time = 0;

    const animate = () => {
      requestAnimationFrame(animate);
      time += 0.01;

      const rotSpeed = autoRotate && !isHovered ? 0.01 : 0.003;
      group.rotation.x += rotSpeed * 0.3;
      group.rotation.y += rotSpeed;

      sphere.rotation.x = group.rotation.x * -0.5;
      sphere.rotation.y = group.rotation.y * -0.5;

      ring.rotation.z += 0.005;
      ring2.rotation.z -= 0.008;

      const s = 1 + Math.sin(time * 0.5) * 0.03;
      group.scale.setScalar(s);

      particles.rotation.y += 0.001;

      renderer.render(scene, camera);
    };

    animate();

    const onResize = () => {
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', onResize);

    return () => {
      window.removeEventListener('resize', onResize);
      renderer.dispose();
    };
  }, [imageUrl, autoRotate, isHovered]);

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        width: '100%', height, borderRadius: '1.25rem',
        overflow: 'hidden', position: 'relative',
        background: 'linear-gradient(135deg, #0A0A0F, #14141E)',
        border: '1px solid rgba(255,255,255,0.06)',
      }}
    >
      <canvas
        ref={canvasRef}
        style={{ width: '100%', height: '100%', display: 'block' }}
      />
      {imageUrl && (
        <div style={{
          position: 'absolute', bottom: '1rem', left: '1rem', right: '1rem',
          textAlign: 'center',
        }}>
          <span style={{
            padding: '0.4rem 1rem', borderRadius: '999px',
            background: 'rgba(6,182,212,0.15)', border: '1px solid rgba(6,182,212,0.3)',
            color: '#06B6D4', fontSize: '0.7rem', fontWeight: 700,
          }}>
            3D PREVIEW
          </span>
        </div>
      )}
    </div>
  );
}
