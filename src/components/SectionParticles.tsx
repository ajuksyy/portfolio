"use client";

import type { ISourceOptions } from "@tsparticles/engine";
import Particles from "@tsparticles/react";
import { useEffect, useState } from "react";
import { toolkitParticleOptions } from "@/lib/particlePresets";
import { getParticlesEngine } from "@/lib/particlesEngine";

type SectionParticlesProps = {
  id: string;
  className?: string;
  options?: ISourceOptions;
};

/**
 * tsparticles layer for section backgrounds (particles.js-style physics + links).
 */
export function SectionParticles({
  id,
  className = "",
  options = toolkitParticleOptions,
}: SectionParticlesProps) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let cancelled = false;
    void getParticlesEngine().then(() => {
      if (!cancelled) setReady(true);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  if (!ready) return null;

  return (
    <Particles
      id={id}
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
      options={options}
    />
  );
}
