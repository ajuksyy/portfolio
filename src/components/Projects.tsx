"use client";

import { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";
import { motion } from "framer-motion";

function Starfield() {
  const ref = useRef<THREE.Points>(null);
  const [sphere] = useState(() => {
    const positions = new Float32Array(5000 * 3);
    for (let i = 0; i < 5000; i++) {
      const theta = Math.random() * 2 * Math.PI;
      const phi = Math.acos(Math.random() * 2 - 1);
      const r = Math.cbrt(Math.random()) * 1.5;
      
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);
    }
    return positions;
  });

  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.x -= delta / 10;
      ref.current.rotation.y -= delta / 15;
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color="#00f0ff"
          size={0.005}
          sizeAttenuation={true}
          depthWrite={false}
        />
      </Points>
    </group>
  );
}

const projects = [
  {
    title: "Space Explorer App",
    description: "An interactive platform to explore the cosmos. Built with React and Three.js.",
    tags: ["React", "Three.js", "Tailwind CSS"],
    color: "from-[#00f0ff] to-[#b026ff]",
    has3D: true,
  },
  {
    title: "Sahana App",
    description: "A comprehensive disaster management platform ensuring rapid response and coordination.",
    tags: ["React", "Laravel", "PostgreSQL"],
    color: "from-[#39ff14] to-[#00f0ff]",
    has3D: false,
  },
  {
    title: "Robotics Gold",
    description: "Winning project at the MNU Robotics Hackathon 2025. An autonomous navigation system.",
    tags: ["C++", "Python", "ROS"],
    color: "from-[#b026ff] to-[#39ff14]",
    has3D: false,
  },
];

export default function Projects() {
  return (
    <section className="py-32 relative">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-mono font-bold text-[#39ff14] mb-4">
          Featured Projects
        </h2>
        <p className="text-gray-400 max-w-2xl mx-auto">
          A selection of my best work, from interactive web apps to award-winning robotics.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            className={`relative rounded-2xl overflow-hidden group border border-gray-800 bg-gray-900/50 hover:border-gray-600 transition-colors h-[400px] flex flex-col`}
          >
            {/* 3D Background for Space Explorer */}
            {project.has3D && (
              <div className="absolute inset-0 z-0 opacity-50 group-hover:opacity-100 transition-opacity duration-700">
                <Canvas camera={{ position: [0, 0, 1] }}>
                  <ambientLight intensity={0.5} />
                  <Starfield />
                </Canvas>
              </div>
            )}

            {/* Gradient Overlay */}
            <div className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-5 group-hover:opacity-10 transition-opacity duration-500 z-0`}></div>

            <div className="relative z-10 p-8 flex flex-col h-full justify-end bg-gradient-to-t from-[#050505] via-[#050505]/80 to-transparent pointer-events-none">
              <h3 className="text-2xl font-bold font-mono mb-2 text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-400 transition-all">
                {project.title}
              </h3>
              <p className="text-gray-400 mb-6 flex-grow">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-2 mt-auto">
                {project.tags.map((tag, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 text-xs font-mono rounded-full border border-gray-700 bg-gray-800/50 text-gray-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
