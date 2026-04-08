import type { ISourceOptions } from "@tsparticles/engine";

/** Simple pastel accents that stay readable on the light hero. */
const HERO_COLORS = ["#93c5fd", "#c4b5fd", "#fda4af", "#86efac", "#fde047", "#7dd3fc"];

const TOOLKIT_COLORS = ["#a5b4fc", "#67e8f9", "#fcd34d", "#f9a8d4"];

export const heroParticleOptions: ISourceOptions = {
  fullScreen: { enable: false, zIndex: 0 },
  fpsLimit: 60,
  pauseOnBlur: true,
  particles: {
    number: { value: 72, density: { enable: true, width: 480, height: 480 } },
    color: { value: HERO_COLORS },
    shape: { type: "circle" },
    opacity: { value: { min: 0.35, max: 0.9 } },
    size: { value: { min: 2.2, max: 5.5 } },
    links: {
      enable: true,
      distance: 118,
      color: { value: "#94a3b8" },
      opacity: 0.22,
      width: 1,
      triangles: { enable: false },
    },
    move: {
      enable: true,
      speed: { min: 0.35, max: 1.05 },
      direction: "none",
      random: true,
      straight: false,
      outModes: { default: "bounce" },
      attract: { enable: false },
    },
    rotate: {
      value: { min: 0, max: 360 },
      direction: "random",
      animation: { enable: true, speed: 4, sync: false },
    },
    life: { count: 0 },
  },
  interactivity: {
    detectsOn: "canvas",
    events: {
      onHover: { enable: true, mode: "repulse" },
      onClick: { enable: true, mode: "push" },
    },
    modes: {
      repulse: { distance: 88, duration: 0.35, factor: 55, speed: 1.2, maxSpeed: 3, easing: "ease-out-quad" },
      push: { quantity: 4 },
    },
  },
  detectRetina: true,
};

export const toolkitParticleOptions: ISourceOptions = {
  fullScreen: { enable: false, zIndex: 0 },
  fpsLimit: 55,
  pauseOnBlur: true,
  particles: {
    number: { value: 48, density: { enable: true, width: 900, height: 400 } },
    color: { value: TOOLKIT_COLORS },
    shape: { type: "circle" },
    opacity: { value: { min: 0.2, max: 0.55 } },
    size: { value: { min: 1.2, max: 3.2 } },
    links: {
      enable: true,
      distance: 95,
      color: { value: "#64748b" },
      opacity: 0.12,
      width: 0.8,
    },
    move: {
      enable: true,
      speed: { min: 0.2, max: 0.65 },
      direction: "none",
      random: true,
      straight: false,
      outModes: { default: "out" },
    },
  },
  interactivity: {
    detectsOn: "window",
    events: {
      onHover: { enable: true, mode: "grab" },
      onClick: { enable: false },
    },
    modes: {
      grab: { distance: 155, links: { opacity: 0.38 } },
    },
  },
  detectRetina: true,
};

const PROJECTS_COLORS = ["#fdba74", "#a5b4fc", "#5eead4", "#f0abfc"];

export const projectsParticleOptions: ISourceOptions = {
  fullScreen: { enable: false, zIndex: 0 },
  fpsLimit: 50,
  pauseOnBlur: true,
  particles: {
    number: { value: 38, density: { enable: true, width: 960, height: 560 } },
    color: { value: PROJECTS_COLORS },
    shape: { type: "circle" },
    opacity: { value: { min: 0.22, max: 0.5 } },
    size: { value: { min: 1.4, max: 3.4 } },
    links: {
      enable: true,
      distance: 88,
      color: { value: "#78716c" },
      opacity: 0.1,
      width: 0.7,
    },
    move: {
      enable: true,
      speed: { min: 0.12, max: 0.48 },
      direction: "none",
      random: true,
      straight: false,
      outModes: { default: "out" },
    },
  },
  interactivity: {
    detectsOn: "window",
    events: {
      onHover: { enable: true, mode: "repulse" },
      onClick: { enable: false },
    },
    modes: {
      repulse: { distance: 92, duration: 0.4, factor: 42, speed: 0.9, maxSpeed: 2.2, easing: "ease-out-quad" },
    },
  },
  detectRetina: true,
};
