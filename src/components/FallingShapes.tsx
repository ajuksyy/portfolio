"use client";

import { useState, useEffect, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

const colors = ["#b026ff", "#39ff14", "#00f0ff", "#ff0055", "#ffaa00"];
const types = ["box", "sphere", "torus", "plus"];

function Shape({ position, type, color }: { position: [number, number, number]; type: string; color: string }) {
  const meshRef = useRef<THREE.Group>(null);
  
  // Random initial velocity (explode outwards slightly, mostly up)
  const velocity = useRef([
    (Math.random() - 0.5) * 4,
    Math.random() * 2 + 2,
    (Math.random() - 0.5) * 4,
  ]);
  
  const rotationSpeed = useRef([
    (Math.random() - 0.5) * 5,
    (Math.random() - 0.5) * 5,
    (Math.random() - 0.5) * 5,
  ]);

  useFrame((state, delta) => {
    if (!meshRef.current) return;
    
    // Gravity effect
    velocity.current[1] -= delta * 15;
    
    meshRef.current.position.x += velocity.current[0] * delta;
    meshRef.current.position.y += velocity.current[1] * delta;
    meshRef.current.position.z += velocity.current[2] * delta;

    meshRef.current.rotation.x += rotationSpeed.current[0] * delta;
    meshRef.current.rotation.y += rotationSpeed.current[1] * delta;
    meshRef.current.rotation.z += rotationSpeed.current[2] * delta;
  });

  const material = new THREE.MeshStandardMaterial({
    color: color,
    roughness: 0.2,
    metalness: 0.8,
    emissive: color,
    emissiveIntensity: 0.5,
  });

  return (
    <group ref={meshRef} position={position}>
      {type === "box" && (
        <mesh material={material}>
          <boxGeometry args={[0.5, 0.5, 0.5]} />
        </mesh>
      )}
      {type === "sphere" && (
        <mesh material={material}>
          <sphereGeometry args={[0.3, 16, 16]} />
        </mesh>
      )}
      {type === "torus" && (
        <mesh material={material}>
          <torusGeometry args={[0.3, 0.1, 16, 32]} />
        </mesh>
      )}
      {type === "plus" && (
        <group>
          <mesh material={material}>
            <boxGeometry args={[0.6, 0.2, 0.2]} />
          </mesh>
          <mesh material={material}>
            <boxGeometry args={[0.2, 0.6, 0.2]} />
          </mesh>
        </group>
      )}
    </group>
  );
}

function Spawner() {
  const [shapes, setShapes] = useState<any[]>([]);
  const { viewport } = useThree();
  const lastSpawn = useRef(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const now = Date.now();
      if (now - lastSpawn.current > 50) {
        // 50ms throttle
        const x = (e.clientX / window.innerWidth) * 2 - 1;
        const y = -(e.clientY / window.innerHeight) * 2 + 1;
        
        // Map to viewport coordinates
        const pos = [
          (x * viewport.width) / 2,
          (y * viewport.height) / 2,
          0,
        ];

        const newShape = {
          id: now + Math.random(),
          position: pos,
          type: types[Math.floor(Math.random() * types.length)],
          color: colors[Math.floor(Math.random() * colors.length)],
        };

        setShapes((prev) => [...prev.slice(-40), newShape]); // Keep max 40 shapes
        lastSpawn.current = now;
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [viewport]);

  return (
    <>
      {shapes.map((s) => (
        <Shape key={s.id} position={s.position} type={s.type} color={s.color} />
      ))}
    </>
  );
}

export default function FallingShapes() {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
      <Canvas camera={{ position: [0, 0, 10], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 10]} intensity={1} />
        <Spawner />
      </Canvas>
    </div>
  );
}
