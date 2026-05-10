'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function Scene3D() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color('#0A0A0F');
    scene.fog = new THREE.FogExp2(0x0A0A0F, 0.035);

    const camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 0.1, 100);
    camera.position.set(0, 0, 7);

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: false });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.5;

    const ambient = new THREE.AmbientLight(0x404060, 1.2);
    scene.add(ambient);

    const key = new THREE.DirectionalLight(0x06b6d4, 3);
    key.position.set(4, 3, 5);
    scene.add(key);

    const fill = new THREE.DirectionalLight(0xd4a574, 1.5);
    fill.position.set(-3, 1, 2);
    scene.add(fill);

    const rim = new THREE.DirectionalLight(0x3b82f6, 2.5);
    rim.position.set(0, -2, -4);
    scene.add(rim);

    const layers: { group: THREE.Group; speed: number; tilt?: boolean; baseZ: number }[] = [];

    const bgCount = 1200;
    const bgPos = new Float32Array(bgCount * 3);
    for (let i = 0; i < bgCount; i++) {
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
      size: 0.025, color: 0x06b6d4, transparent: true, opacity: 0.12,
      sizeAttenuation: true, blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const bgPts = new THREE.Points(bgG, bgM);

    const netCount = 200;
    const netPos = new Float32Array(netCount * 3);
    const netColorArr = new Float32Array(netCount * 3);
    const palette = [new THREE.Color('#06B6D4'), new THREE.Color('#3B82F6'), new THREE.Color('#D4A574')];
    for (let i = 0; i < netCount; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = 2 + Math.random() * 1.5;
      netPos[i * 3] = Math.sin(phi) * Math.cos(theta) * r;
      netPos[i * 3 + 1] = Math.sin(phi) * Math.sin(theta) * r * 0.7;
      netPos[i * 3 + 2] = Math.cos(phi) * r - 1;
      const c = palette[Math.floor(Math.random() * palette.length)];
      netColorArr[i * 3] = c.r;
      netColorArr[i * 3 + 1] = c.g;
      netColorArr[i * 3 + 2] = c.b;
    }
    const netGeo = new THREE.BufferGeometry();
    netGeo.setAttribute('position', new THREE.BufferAttribute(netPos, 3));
    netGeo.setAttribute('color', new THREE.BufferAttribute(netColorArr, 3));
    const netMat = new THREE.PointsMaterial({
      size: 0.04, vertexColors: true, transparent: true, opacity: 0.3,
      sizeAttenuation: true, blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const netPts = new THREE.Points(netGeo, netMat);

    const linePairs: number[] = [];
    for (let i = 0; i < netCount; i++) {
      const nearest = [];
      for (let j = i + 1; j < netCount; j++) {
        const dx = netPos[i * 3] - netPos[j * 3];
        const dy = netPos[i * 3 + 1] - netPos[j * 3 + 1];
        const dz = netPos[i * 3 + 2] - netPos[j * 3 + 2];
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
        if (dist < 3) nearest.push({ idx: j, dist });
      }
      nearest.sort((a, b) => a.dist - b.dist);
      nearest.slice(0, 2).forEach((n) => {
        linePairs.push(i, n.idx);
      });
    }
    const lineCount = linePairs.length;
    const linePositions = new Float32Array(lineCount * 3);
    const lineColors = new Float32Array(lineCount * 3);
    for (let i = 0; i < lineCount; i++) {
      const idx = linePairs[i];
      linePositions[i * 3] = netPos[idx * 3];
      linePositions[i * 3 + 1] = netPos[idx * 3 + 1];
      linePositions[i * 3 + 2] = netPos[idx * 3 + 2];
      lineColors[i * 3] = netColorArr[idx * 3];
      lineColors[i * 3 + 1] = netColorArr[idx * 3 + 1];
      lineColors[i * 3 + 2] = netColorArr[idx * 3 + 2];
    }
    const lineGeo = new THREE.BufferGeometry();
    lineGeo.setAttribute('position', new THREE.BufferAttribute(linePositions, 3));
    lineGeo.setAttribute('color', new THREE.BufferAttribute(lineColors, 3));
    const lineMat = new THREE.LineBasicMaterial({
      vertexColors: true, transparent: true, opacity: 0.08,
    });
    const lines = new THREE.LineSegments(lineGeo, lineMat);

    const netGroup = new THREE.Group();
    netGroup.add(netPts);
    netGroup.add(lines);
    netGroup.position.z = -1.5;
    scene.add(netGroup);

    const bgGroup = new THREE.Group();
    bgGroup.add(bgPts);
    bgGroup.position.z = -3;
    scene.add(bgGroup);

    const icoGeo = new THREE.IcosahedronGeometry(1.2, 0);
    const icoMat = new THREE.MeshBasicMaterial({
      color: 0x3b82f6, wireframe: true, transparent: true, opacity: 0.08,
    });
    const ico = new THREE.Mesh(icoGeo, icoMat);
    ico.position.z = -1;
    const icoGroup = new THREE.Group();
    icoGroup.add(ico);
    scene.add(icoGroup);

    const dodecGeo = new THREE.DodecahedronGeometry(1, 0);
    const dodecMat = new THREE.MeshPhysicalMaterial({
      color: 0x06b6d4, emissive: 0x06b6d4, emissiveIntensity: 0.08,
      metalness: 0.2, roughness: 0.03, clearcoat: 1,
      clearcoatRoughness: 0.08, transparent: true, opacity: 0.75,
      envMapIntensity: 2.5, wireframe: false,
    });
    const dodec = new THREE.Mesh(dodecGeo, dodecMat);

    const innerGeo = new THREE.SphereGeometry(0.4, 16, 16);
    const innerMat = new THREE.MeshBasicMaterial({
      color: 0x06b6d4, transparent: true, opacity: 0.15,
    });
    const innerSphere = new THREE.Mesh(innerGeo, innerMat);

    const mainGroup = new THREE.Group();
    mainGroup.add(dodec);
    mainGroup.add(innerSphere);
    scene.add(mainGroup);

    const ring1Geo = new THREE.TorusGeometry(1.3, 0.012, 24, 80);
    const ring1Mat = new THREE.MeshBasicMaterial({
      color: 0x06b6d4, transparent: true, opacity: 0.1,
    });
    const ring1 = new THREE.Mesh(ring1Geo, ring1Mat);
    ring1.rotation.x = Math.PI * 0.4;

    const ring2Geo = new THREE.TorusGeometry(1.5, 0.01, 16, 80);
    const ring2Mat = new THREE.MeshBasicMaterial({
      color: 0xd4a574, transparent: true, opacity: 0.08,
    });
    const ring2 = new THREE.Mesh(ring2Geo, ring2Mat);
    ring2.rotation.z = Math.PI * 0.3;

    const ringGroup = new THREE.Group();
    ringGroup.add(ring1);
    ringGroup.add(ring2);
    scene.add(ringGroup);

    const sphereMat = new THREE.MeshPhysicalMaterial({
      color: 0xd4a574, emissive: 0xd4a574, emissiveIntensity: 0.12,
      metalness: 0.3, roughness: 0.2, clearcoat: 0.5,
    });
    const orbs: THREE.Mesh[] = [];
    for (let i = 0; i < 10; i++) {
      const s = new THREE.Mesh(new THREE.SphereGeometry(0.05, 6, 6), sphereMat);
      s.userData = {
        angle: (i / 10) * Math.PI * 2, radius: 1.8 + Math.random() * 0.4,
        speed: 0.2 + Math.random() * 0.15, zOff: (Math.random() - 0.5) * 2,
      };
      mainGroup.add(s);
      orbs.push(s);
    }

    const fgCount = 200;
    const fgPos = new Float32Array(fgCount * 3);
    const fgCol = new Float32Array(fgCount * 3);
    for (let i = 0; i < fgCount; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = 1 + Math.random() * 3;
      fgPos[i * 3] = Math.sin(phi) * Math.cos(theta) * r;
      fgPos[i * 3 + 1] = Math.sin(phi) * Math.sin(theta) * r * 0.5;
      fgPos[i * 3 + 2] = Math.cos(phi) * r + 2;
      const c = palette[Math.floor(Math.random() * palette.length)];
      fgCol[i * 3] = c.r; fgCol[i * 3 + 1] = c.g; fgCol[i * 3 + 2] = c.b;
    }
    const fgGeo = new THREE.BufferGeometry();
    fgGeo.setAttribute('position', new THREE.BufferAttribute(fgPos, 3));
    fgGeo.setAttribute('color', new THREE.BufferAttribute(fgCol, 3));
    const fgMat = new THREE.PointsMaterial({
      size: 0.05, vertexColors: true, transparent: true, opacity: 0.5,
      sizeAttenuation: true, blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const fgPts = new THREE.Points(fgGeo, fgMat);
    const fgGroup = new THREE.Group();
    fgGroup.add(fgPts);
    scene.add(fgGroup);

    bgGroup.position.z = -4;
    netGroup.position.z = -1.8;
    icoGroup.position.z = -0.8;
    ringGroup.position.z = 0.5;
    fgGroup.position.z = 2.5;

    layers.push(
      { group: bgGroup, speed: 0.05, baseZ: -4 },
      { group: netGroup, speed: 0.10, baseZ: -1.8 },
      { group: icoGroup, speed: 0.14, baseZ: -0.8 },
      { group: mainGroup, speed: 0.22, tilt: true, baseZ: 0 },
      { group: ringGroup, speed: 0.25, baseZ: 0.5 },
      { group: fgGroup, speed: 0.40, baseZ: 2.5 },
    );

    const mouse = { x: 0, y: 0 };
    const target = { x: 0, y: 0 };

    const onMouse = (e: MouseEvent) => {
      target.x = (e.clientX / window.innerWidth) * 2 - 1;
      target.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', onMouse);

    const netPosAttr = netGeo.attributes.position;
    const linePosAttr = lineGeo.attributes.position;
    const netArray = netPosAttr.array as Float32Array;
    const lineArray = linePosAttr.array as Float32Array;

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
      time += 0.004;

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

      dodec.rotation.x += 0.003 * (1 + scrollProgress * 0.5);
      dodec.rotation.y += 0.005 * (1 + scrollProgress * 0.5);
      dodecMat.emissiveIntensity = 0.08 + scrollProgress * 0.12;
      dodec.scale.setScalar(1 + scrollProgress * 0.06);

      innerSphere.rotation.x += 0.002;
      innerSphere.rotation.y += 0.003;

      ico.rotation.x += 0.002;
      ico.rotation.z += 0.001;

      ring1.rotation.z += 0.002;
      ring2.rotation.x += 0.003;

      bgGroup.rotation.y += 0.001;
      bgGroup.rotation.x = Math.sin(time * 0.005) * 0.01;

      netGroup.rotation.y += 0.002;
      netGroup.rotation.x = Math.sin(time * 0.003) * 0.02;

      for (let i = 0; i < netCount; i++) {
        const i3 = i * 3;
        const theta = Math.sin(time * 0.1 + i * 0.05) * 0.3;
        const phi = Math.cos(time * 0.08 + i * 0.03) * 0.2;
        netArray[i3] += theta * 0.002;
        netArray[i3 + 1] += phi * 0.002;
      }
      netPosAttr.needsUpdate = true;

      for (let i = 0; i < lineCount; i++) {
        const srcIdx = linePairs[i];
        const i3 = i * 3;
        lineArray[i3] = netArray[srcIdx * 3];
        lineArray[i3 + 1] = netArray[srcIdx * 3 + 1];
        lineArray[i3 + 2] = netArray[srcIdx * 3 + 2];
      }
      linePosAttr.needsUpdate = true;

      orbs.forEach((s) => {
        const d = s.userData as { angle: number; radius: number; speed: number; zOff: number };
        d.angle += d.speed * 0.02;
        s.position.x = Math.cos(d.angle + time * 0.35) * d.radius;
        s.position.y = Math.sin(d.angle + time * 0.35) * d.radius * 0.5;
        s.position.z = d.zOff;
      });

      fgGroup.rotation.y += 0.0015;
      fgGroup.rotation.x = Math.sin(time * 0.004) * 0.015;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      window.removeEventListener('mousemove', onMouse);
      window.removeEventListener('resize', onResize);
      window.removeEventListener('scroll', onScroll);
      renderer.dispose();
    };
  }, []);

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
