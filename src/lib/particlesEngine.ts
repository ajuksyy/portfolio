import { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";

let engineReady: Promise<void> | null = null;

/** Single init for all tsparticles surfaces (particles.js–style engine). */
export function getParticlesEngine(): Promise<void> {
  if (!engineReady) {
    engineReady = initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    });
  }
  return engineReady;
}
