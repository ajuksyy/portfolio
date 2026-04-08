"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

type HeroThreeInteractiveProps = {
  className?: string;
};

export function HeroThreeInteractive({ className = "" }: HeroThreeInteractiveProps) {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 100);
    camera.position.z = 4.8;

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0xffffff, 0);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    mount.appendChild(renderer.domElement);

    scene.add(new THREE.AmbientLight(0xffffff, 0.52));
    const key = new THREE.DirectionalLight(0xffffff, 0.9);
    key.position.set(5, 8, 6);
    scene.add(key);
    const rim = new THREE.DirectionalLight(0xc5d0e0, 0.4);
    rim.position.set(-5, -2, 4);
    scene.add(rim);

    const group = new THREE.Group();
    scene.add(group);

    const knotGeo = new THREE.TorusKnotGeometry(0.82, 0.26, 100, 14);
    const knotMat = new THREE.MeshStandardMaterial({
      color: 0x3d4552,
      metalness: 0.22,
      roughness: 0.38,
      transparent: true,
      opacity: 0.94,
    });
    const knot = new THREE.Mesh(knotGeo, knotMat);
    group.add(knot);

    const ringGeo = new THREE.TorusGeometry(1.42, 0.018, 12, 80);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0x9aa3b0,
      transparent: true,
      opacity: 0.32,
    });
    const ring = new THREE.Mesh(ringGeo, ringMat);
    ring.rotation.x = Math.PI / 2.35;
    group.add(ring);

    const orbs: THREE.Mesh[] = [];
    const orbGeo = new THREE.SphereGeometry(0.055, 20, 20);
    for (let i = 0; i < 10; i++) {
      const orbMat = new THREE.MeshStandardMaterial({
        color: new THREE.Color().setHSL(0.58, 0.06, 0.45 + (i % 3) * 0.06),
        metalness: 0.35,
        roughness: 0.35,
      });
      const orb = new THREE.Mesh(orbGeo, orbMat);
      const a = (i / 10) * Math.PI * 2;
      const r = 1.65 + (i % 2) * 0.12;
      orb.position.set(Math.cos(a) * r, Math.sin(a * 1.7) * 0.35, Math.sin(a) * r);
      group.add(orb);
      orbs.push(orb);
    }

    let targetX = 0;
    let targetY = 0;
    let curX = 0;
    let curY = 0;

    const onMove = (e: MouseEvent) => {
      targetX = (e.clientX / window.innerWidth) * 2 - 1;
      targetY = (e.clientY / window.innerHeight) * 2 - 1;
    };

    const resize = () => {
      const w = mount.clientWidth;
      const h = mount.clientHeight;
      if (w < 1 || h < 1) return;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener("mousemove", onMove);
    const ro = new ResizeObserver(resize);
    ro.observe(mount);
    resize();

    const t0 = performance.now();
    let raf = 0;

    const loop = () => {
      raf = requestAnimationFrame(loop);
      const t = (performance.now() - t0) * 0.001;
      curX += (targetX - curX) * 0.07;
      curY += (targetY - curY) * 0.07;

      group.rotation.y = t * 0.12 + curX * 0.55;
      group.rotation.x = curY * 0.28;
      knot.rotation.x = t * 0.18;
      knot.rotation.z = t * 0.1;
      ring.rotation.z = t * 0.06;

      orbs.forEach((orb, i) => {
        orb.position.y += Math.sin(t * 1.8 + i * 0.7) * 0.0015;
      });

      renderer.render(scene, camera);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      ro.disconnect();
      knotGeo.dispose();
      knotMat.dispose();
      ringGeo.dispose();
      ringMat.dispose();
      orbGeo.dispose();
      orbs.forEach((o) => (o.material as THREE.Material).dispose());
      renderer.dispose();
      mount.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className={`relative h-full min-h-[240px] w-full [&_canvas]:h-full [&_canvas]:w-full [&_canvas]:block ${className}`}
      aria-hidden
    />
  );
}
