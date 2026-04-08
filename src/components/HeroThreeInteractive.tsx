"use client";

import Particles from "@tsparticles/react";
import { useEffect, useState } from "react";
import { heroParticleOptions } from "@/lib/particlePresets";
import { getParticlesEngine } from "@/lib/particlesEngine";

type HeroThreeInteractiveProps = {
  className?: string;
};

export function HeroThreeInteractive({ className = "" }: HeroThreeInteractiveProps) {
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

  return (
    <div
      className={`relative h-full min-h-[240px] w-full overflow-hidden rounded-4xl pointer-events-auto ${className}`}
      aria-hidden
    >
      {ready ? (
        <Particles
          id="tsparticles-hero"
          className="absolute inset-0 h-full w-full"
          options={heroParticleOptions}
        />
      ) : (
        <div className="absolute inset-0 bg-linear-to-br from-[#f0f4f8]/40 to-[#e8ecf2]/30" />
      )}
    </div>
  );
}
