"use client";

import { useEffect, useRef, useMemo } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

interface Project {
  title: string;
  org: string;
  date: string;
  description: string;
  tech: string[];
  link?: string;
}

const TECH_GROUPS: { title: string; note: string; items: string[] }[] = [
  {
    title: "Interface & motion",
    note: "Where layout, type, and movement meet.",
    items: [
      "React",
      "Next.js",
      "TypeScript",
      "JavaScript",
      "Tailwind CSS",
      "Framer Motion",
      "Three.js",
      "Figma",
    ],
  },
  {
    title: "Content & data",
    note: "Shipping things people update in production.",
    items: ["Payload CMS", "Laravel", "PostgreSQL"],
  },
  {
    title: "Languages",
    note: "Outside the usual component tree.",
    items: ["Java", "Python", "C++", "R"],
  },
];

const PROJECTS: Project[] = [
  {
    title: "Sahana App",
    org: "Maldives National University",
    date: "2025 – Present",
    description:
      "Degree capstone: a single place for coordination when things go wrong — routing info, teams, and comms so responders are not chasing spreadsheets.",
    tech: ["React", "Laravel", "PostgreSQL", "Tailwind CSS"],
  },
  {
    title: "Space Explorer",
    org: "Self Learning",
    date: "2025",
    description:
      "Orbits, lighting, and camera work in the browser — a playground for WebGL habits without a template scene.",
    tech: ["Next.js", "React", "TypeScript", "Three.js"],
    link: "https://space-explorerr.vercel.app/",
  },
  {
    title: "From Maldives",
    org: "Loopcraft",
    date: "2025",
    description:
      "Fisheries sector site with editorial rhythm: products, stories, and a CMS editors can actually use.",
    tech: ["Next.js", "React", "Payload CMS"],
  },
  {
    title: "IGMH Website",
    org: "Loopcraft",
    date: "2025",
    description:
      "Hospital presence with services, people, and facilities — structured content, not a wall of PDFs.",
    tech: ["Next.js", "React", "Payload CMS"],
  },
  {
    title: "AI Face Model",
    org: "Maldives National University",
    date: "2025",
    description:
      "A small deep-learning experiment: map faces against a trained set and talk about similarity in a controlled, honest way.",
    tech: ["Python", "Deep Learning"],
  },
  {
    title: "Note Taking App",
    org: "Self Learning",
    date: "2024",
    description:
      "Notes with structure — fast list/detail flow, typed models, and UI that stays out of the way.",
    tech: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
  },
];

function seededRandom(seed: number): number {
  const x = Math.sin(seed * 127.1 + 12.9898) * 43758.5453;
  return x - Math.floor(x);
}

function TropicalLeaf({
  shade = 0,
  className = "",
  style = {},
}: {
  shade?: number;
  className?: string;
  style?: React.CSSProperties;
}) {
  const colors = ["#0b2210", "#0d2818", "#122e1a", "#163520", "#1a4d2e"];
  const fill = colors[shade % colors.length];
  return (
    <svg
      viewBox="0 0 100 200"
      className={className}
      style={style}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M50,0 C62,12 82,42 89,72 C96,102 91,142 79,168 C67,192 56,199 50,200 C44,199 33,192 21,168 C9,142 4,102 11,72 C18,42 38,12 50,0Z"
        fill={fill}
      />
      <path
        d="M50,18 L50,188"
        stroke="rgba(255,255,255,0.035)"
        strokeWidth="1.5"
        fill="none"
      />
      <path
        d="M50,52 L26,74 M50,52 L74,74"
        stroke="rgba(255,255,255,0.025)"
        strokeWidth="1"
        fill="none"
      />
      <path
        d="M50,88 L20,116 M50,88 L80,116"
        stroke="rgba(255,255,255,0.025)"
        strokeWidth="1"
        fill="none"
      />
      <path
        d="M50,124 L24,154 M50,124 L76,154"
        stroke="rgba(255,255,255,0.025)"
        strokeWidth="1"
        fill="none"
      />
    </svg>
  );
}

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);

  const fireflies = useMemo(
    () =>
      Array.from({ length: 20 }, (_, i) => ({
        id: i,
        left: `${seededRandom(i * 3) * 90 + 5}%`,
        top: `${seededRandom(i * 7 + 1) * 80 + 10}%`,
        size: 2 + seededRandom(i * 11) * 3,
      })),
    [],
  );

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const lenis = new Lenis({
      duration: 1.4,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });
    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add((time) => lenis.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);

    const ctx = gsap.context(() => {
      const heroTl = gsap.timeline({
        scrollTrigger: {
          trigger: ".hero-section",
          start: "top top",
          end: "+=250%",
          pin: true,
          scrub: 1.5,
          anticipatePin: 1,
        },
      });
      heroTl.to(
        ".hero-section .leaf-el",
        {
          x: (i: number) => [-120, 140, -60][i] ?? 0,
          y: (i: number) => [0, 48, -110][i] ?? 0,
          opacity: 0,
          stagger: 0.08,
          duration: 1,
          ease: "power2.in",
        },
        0,
      );
      heroTl.to(".vignette-overlay", { opacity: 0, duration: 1 }, 0);
      heroTl.to(".mist-layer", { opacity: 0, scale: 1.3, duration: 0.8 }, 0);
      heroTl.to(
        ".hero-text-container",
        { scale: 2.5, opacity: 0, duration: 0.8, ease: "power2.in" },
        0.1,
      );
      heroTl.to(".firefly", { opacity: 0, duration: 0.5 }, 0);
      heroTl.to(".light-rays", { opacity: 0.15, duration: 0.3, ease: "none" }, 0);
      heroTl.to(".light-rays", { opacity: 0, duration: 0.7, ease: "power1.in" }, 0.3);

      [".tech-section", ".experience-section", ".projects-section"].forEach((s) => {
        gsap.from(`${s} .section-title`, {
          scrollTrigger: {
            trigger: s,
            start: "top 88%",
            toggleActions: "play none none none",
          },
          y: 36,
          opacity: 0,
          duration: 0.85,
          ease: "power2.out",
        });
      });

      gsap.from(".tech-pill", {
        scrollTrigger: {
          trigger: ".tech-bento",
          start: "top 90%",
          toggleActions: "play none none none",
        },
        y: 22,
        opacity: 0,
        stagger: 0.03,
        duration: 0.55,
        ease: "power2.out",
      });

      gsap.from(".exp-card", {
        scrollTrigger: {
          trigger: ".experience-section",
          start: "top 82%",
          toggleActions: "play none none none",
        },
        y: 48,
        opacity: 0,
        stagger: 0.18,
        duration: 0.85,
        ease: "power2.out",
      });

      gsap.utils.toArray<HTMLElement>(".project-card").forEach((el, i) => {
        const fromLeft = i % 2 === 0;
        gsap.from(el, {
          scrollTrigger: {
            trigger: el,
            start: "top 90%",
            toggleActions: "play none none none",
          },
          x: fromLeft ? -72 : 72,
          opacity: 0,
          rotation: fromLeft ? -1.5 : 1.5,
          duration: 0.85,
          ease: "power2.out",
        });
      });

      gsap.utils.toArray<HTMLElement>(".ghost-number").forEach((el) => {
        gsap.to(el, {
          scrollTrigger: {
            trigger: el.parentElement,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
          y: -72,
        });
      });

      gsap.utils
        .toArray<HTMLElement>(".parallax-leaf")
        .forEach((leaf, i) => {
          const dir = i % 2 === 0 ? 1 : -1;
          gsap.to(leaf, {
            scrollTrigger: {
              trigger: leaf,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
            y: -40 * (0.45 + (i % 3) * 0.25),
            rotation: `+=${dir * 10}`,
            x: dir * 8,
          });
        });

      gsap.utils.toArray<HTMLElement>(".firefly").forEach((el, i) => {
        gsap.to(el, {
          x: `random(-70, 70)`,
          y: `random(-70, 70)`,
          opacity: `random(0.1, 0.8)`,
          duration: 3 + (i % 4),
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: i * 0.3,
        });
      });
    }, containerRef);

    const refresh = () => ScrollTrigger.refresh();
    requestAnimationFrame(refresh);
    const t1 = window.setTimeout(refresh, 150);
    const t2 = window.setTimeout(refresh, 600);

    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
      ctx.revert();
      lenis.destroy();
    };
  }, []);

  return (
    <div ref={containerRef} className="bg-[#030a06]">
      <section className="hero-section relative h-screen w-full overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-b from-[#081a0e] via-[#0d2818] to-[#061208]" />
        <div className="light-rays absolute inset-0 pointer-events-none opacity-[0.06]">
          <div className="absolute left-[22%] top-0 h-[70%] w-[50px] rotate-12 bg-linear-to-b from-[#52b788] via-[#52b78830] to-transparent blur-2xl" />
          <div className="absolute left-[46%] top-0 h-[60%] w-[35px] -rotate-[5deg] bg-linear-to-b from-[#74c69d] via-[#74c69d20] to-transparent blur-2xl" />
          <div className="absolute left-[72%] top-0 h-[65%] w-[45px] rotate-[9deg] bg-linear-to-b from-[#52b788] via-[#52b78825] to-transparent blur-2xl" />
        </div>
        <div
          className="vignette-overlay absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 55% 50% at center, transparent 0%, #030a06ee 100%)",
          }}
        />
        <div className="mist-layer absolute bottom-0 left-0 right-0 h-[40%] bg-linear-to-t from-[#0d281830] via-[#1a4d2e0d] to-transparent blur-md pointer-events-none" />
        <div className="mist-layer absolute top-0 left-0 right-0 h-[28%] bg-linear-to-b from-[#081a0e90] via-[#0d281812] to-transparent blur-sm pointer-events-none" />

        {fireflies.map((f) => (
          <div
            key={f.id}
            className="firefly absolute rounded-full pointer-events-none"
            style={{
              width: f.size,
              height: f.size,
              left: f.left,
              top: f.top,
              background: "radial-gradient(circle, #74c69d, #52b78800)",
              boxShadow: "0 0 8px 3px rgba(116,198,157,0.3)",
              opacity: 0.5,
            }}
          />
        ))}

        <div className="hero-text-container absolute inset-0 flex flex-col items-center justify-center z-10 px-6">
          <p
            className="text-sm tracking-[0.35em] uppercase mb-6 opacity-75"
            style={{ color: "#74c69d", fontFamily: "var(--font-inter)" }}
          >
            Hello, I&apos;m
          </p>
          <h1
            className="text-6xl md:text-8xl lg:text-[10rem] font-bold tracking-tight leading-none"
            style={{ color: "#e8f5e9", fontFamily: "var(--font-playfair)" }}
          >
            Ajmal
          </h1>
          <div className="w-16 h-px bg-linear-to-r from-transparent via-[#52b788] to-transparent my-6" />
          <p
            className="text-base md:text-lg max-w-md text-center leading-relaxed opacity-70"
            style={{ color: "#a8d5ba", fontFamily: "var(--font-inter)" }}
          >
            Frontend developer in the Maldives — interfaces, design handoff, and
            the occasional 3D rabbit hole.
          </p>
          <div className="absolute bottom-12 flex flex-col items-center gap-3 opacity-50">
            <span
              className="text-[10px] tracking-[0.3em] uppercase"
              style={{ color: "#52b788", fontFamily: "var(--font-inter)" }}
            >
              Scroll
            </span>
            <div className="w-px h-8 bg-linear-to-b from-[#52b788] to-transparent animate-pulse" />
          </div>
        </div>
      </section>

      <section className="tech-section relative px-5 sm:px-8 py-24 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-b from-[#061208] via-[#050f0a] to-[#040d08]" />

        <div className="relative z-10 max-w-6xl mx-auto">
          <div className="section-title mb-4 md:mb-6 md:text-left text-center">
            <p
              className="text-xs tracking-[0.35em] uppercase mb-3"
              style={{ color: "#52b788", fontFamily: "var(--font-inter)" }}
            >
              Toolkit
            </p>
            <h2
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[1.05]"
              style={{ color: "#e8f5e9", fontFamily: "var(--font-playfair)" }}
            >
              What I actually use
            </h2>
            <p
              className="mt-4 max-w-xl md:mx-0 mx-auto text-sm md:text-base opacity-55 leading-relaxed"
              style={{ color: "#a8d5ba", fontFamily: "var(--font-inter)" }}
            >
              Grouped by how it shows up in real work — not a keyword dump.
            </p>
            <div className="w-20 h-px bg-linear-to-r from-[#2d6a4f] to-transparent mt-6 md:mx-0 mx-auto" />
          </div>

          <div className="tech-bento mt-14 grid grid-cols-1 gap-5 md:gap-6 lg:grid-cols-12">
            <article className="lg:col-span-8 rounded-3xl border border-[#2d6a4f]/30 bg-[#0b1711]/95 p-6 md:p-8 backdrop-blur-sm shadow-[0_20px_60px_-38px_rgba(0,0,0,0.9)]">
              <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
                <div>
                  <p
                    className="text-[10px] uppercase tracking-[0.28em] opacity-70"
                    style={{ color: "#74c69d", fontFamily: "var(--font-inter)" }}
                  >
                    Working kit
                  </p>
                  <h3
                    className="mt-2 text-2xl md:text-3xl leading-tight"
                    style={{ color: "#e8f5e9", fontFamily: "var(--font-playfair)" }}
                  >
                    My go-to stack when shipping
                  </h3>
                </div>
                <span
                  className="rounded-full border border-[#52b788]/35 bg-[#52b788]/10 px-3 py-1 text-[10px] uppercase tracking-[0.2em]"
                  style={{ color: "#95d5b2", fontFamily: "var(--font-inter)" }}
                >
                  {TECH_GROUPS[0].items.length} core tools
                </span>
              </div>

              <div className="mb-7 grid grid-cols-1 gap-3 sm:grid-cols-2">
                {[
                  "Starts with layout and type rhythm",
                  "Animations only where they support reading",
                  "Design handoff stays true to spacing",
                  "Built for maintainers, not demos",
                ].map((point) => (
                  <div
                    key={point}
                    className="rounded-xl border border-[#2d6a4f]/25 bg-[#0a1410] px-3.5 py-3 text-sm"
                    style={{ color: "#ccecd6", fontFamily: "var(--font-inter)" }}
                  >
                    {point}
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-2.5">
                {TECH_GROUPS[0].items.map((name) => (
                  <span
                    key={name}
                    className="tech-pill inline-flex items-center rounded-full border border-[#2d6a4f]/45 bg-[#08120d] px-3.5 py-2 text-sm text-[#d8f3dc] transition-colors hover:border-[#52b788]/45 hover:bg-[#52b788]/8 cursor-default"
                    style={{ fontFamily: "var(--font-inter)" }}
                  >
                    {name}
                  </span>
                ))}
              </div>
            </article>

            <aside className="lg:col-span-4 flex flex-col gap-5 md:gap-6">
              <article className="rounded-3xl border border-[#2d6a4f]/30 bg-[#0a1510] p-6 md:p-7">
                <p
                  className="mb-2 text-[10px] uppercase tracking-[0.25em]"
                  style={{ color: "#74c69d", fontFamily: "var(--font-inter)" }}
                >
                  Currently building with
                </p>
                <div className="mb-4 h-px w-full bg-linear-to-r from-[#2d6a4f] to-transparent" />
                <div className="space-y-2.5">
                  {TECH_GROUPS[1].items.map((name) => (
                    <div
                      key={name}
                      className="rounded-lg border border-[#2d6a4f]/30 bg-[#08120d] px-3 py-2 text-sm"
                      style={{ color: "#bfe6cd", fontFamily: "var(--font-inter)" }}
                    >
                      {name}
                    </div>
                  ))}
                </div>
              </article>

              <article className="rounded-3xl border border-[#2d6a4f]/30 bg-linear-to-br from-[#0d1b13] to-[#08110d] p-6 md:p-7">
                <h4
                  className="mb-2 text-lg"
                  style={{ color: "#e8f5e9", fontFamily: "var(--font-playfair)" }}
                >
                  Outside frontend
                </h4>
                <p
                  className="mb-4 text-xs opacity-65"
                  style={{ color: "#a8d5ba", fontFamily: "var(--font-inter)" }}
                >
                  Used for experiments, data tasks, and quick internal tooling.
                </p>
                <div className="flex flex-wrap gap-2">
                  {TECH_GROUPS[2].items.map((name) => (
                    <span
                      key={name}
                      className="tech-pill inline-flex rounded-md border border-white/6 bg-black/25 px-3 py-1.5 text-xs font-medium text-[#95d5b2] transition-colors hover:text-[#d8f3dc] cursor-default"
                      style={{ fontFamily: "var(--font-inter)" }}
                    >
                      {name}
                    </span>
                  ))}
                </div>
              </article>
            </aside>
          </div>
        </div>
      </section>

      <section className="experience-section relative px-5 sm:px-8 py-24 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-b from-[#040d08] via-[#050f0a] to-[#040d08]" />
        <div className="relative z-10 max-w-4xl mx-auto">
          <div className="section-title text-center mb-16 md:mb-20">
            <p
              className="text-xs tracking-[0.35em] uppercase mb-4"
              style={{ color: "#52b788", fontFamily: "var(--font-inter)" }}
            >
              Work
            </p>
            <h2
              className="text-4xl md:text-6xl lg:text-7xl leading-tight"
              style={{ color: "#e8f5e9", fontFamily: "var(--font-playfair)" }}
            >
              Experience
            </h2>
            <div className="w-20 h-px bg-linear-to-r from-transparent via-[#2d6a4f] to-transparent mx-auto mt-6" />
          </div>

          <div className="relative">
            <div className="absolute left-6 md:left-8 top-0 bottom-0 w-px bg-linear-to-b from-[#2d6a4f60] via-[#2d6a4f30] to-transparent" />

            <div className="exp-card relative pl-16 md:pl-20 pb-14">
              <div className="absolute left-[18px] md:left-[26px] top-2 w-3 h-3 rounded-full bg-[#52b788] shadow-[0_0_12px_rgba(82,183,136,0.4)]" />
              <div className="flex flex-col md:flex-row md:items-baseline gap-1 md:gap-4 mb-4">
                <h3
                  className="text-2xl md:text-3xl font-semibold"
                  style={{
                    color: "#e8f5e9",
                    fontFamily: "var(--font-playfair)",
                  }}
                >
                  Frontend Developer
                </h3>
                <span
                  className="text-sm opacity-50"
                  style={{ color: "#74c69d", fontFamily: "var(--font-inter)" }}
                >
                  Feb 2025 – Present
                </span>
              </div>
              <p
                className="text-lg mb-4 font-medium"
                style={{ color: "#52b788", fontFamily: "var(--font-inter)" }}
              >
                Loopcraft — Male City, Maldives
              </p>
              <ul className="space-y-2.5">
                {[
                  "Responsive UIs with React, TypeScript, Tailwind, Next.js",
                  "Figma → components without losing spacing or hierarchy",
                  "APIs wired up; state that matches what the backend actually returns",
                  "12+ shipped projects with designers and other devs in the loop",
                ].map((item, i) => (
                  <li
                    key={i}
                    className="flex gap-3 text-sm leading-relaxed"
                    style={{
                      color: "#a8d5ba",
                      fontFamily: "var(--font-inter)",
                    }}
                  >
                    <span className="mt-1.5 shrink-0 w-1 h-1 rounded-full bg-[#2d6a4f]" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="exp-card relative pl-16 md:pl-20">
              <div className="absolute left-[18px] md:left-[26px] top-2 w-3 h-3 rounded-full border-2 border-[#2d6a4f] bg-[#0a1f0a]" />
              <div className="flex flex-col md:flex-row md:items-baseline gap-1 md:gap-4 mb-4">
                <h3
                  className="text-2xl md:text-3xl font-semibold"
                  style={{
                    color: "#e8f5e9",
                    fontFamily: "var(--font-playfair)",
                  }}
                >
                  Intern
                </h3>
                <span
                  className="text-sm opacity-50"
                  style={{ color: "#74c69d", fontFamily: "var(--font-inter)" }}
                >
                  Jan 2024 – Sep 2025
                </span>
              </div>
              <p
                className="text-lg mb-4 font-medium"
                style={{ color: "#52b788", fontFamily: "var(--font-inter)" }}
              >
                Loopcraft — Male City, Maldives
              </p>
              <ul className="space-y-2.5">
                {[
                  "Real client work instead of tutorial islands",
                  "HTML, CSS, JavaScript, Tailwind, Next.js — in that messy real order",
                  "Kept pace with the team’s stack and review habits",
                ].map((item, i) => (
                  <li
                    key={i}
                    className="flex gap-3 text-sm leading-relaxed"
                    style={{
                      color: "#a8d5ba",
                      fontFamily: "var(--font-inter)",
                    }}
                  >
                    <span className="mt-1.5 shrink-0 w-1 h-1 rounded-full bg-[#2d6a4f]" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="projects-section relative px-5 sm:px-8 py-24 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-b from-[#040d08] via-[#050f0a] to-[#040d08]" />
        <div className="relative z-10 max-w-5xl mx-auto">
          <div className="section-title text-center mb-16 md:mb-20">
            <p
              className="text-xs tracking-[0.35em] uppercase mb-4"
              style={{ color: "#52b788", fontFamily: "var(--font-inter)" }}
            >
              Selected builds
            </p>
            <h2
              className="text-4xl md:text-6xl lg:text-7xl leading-tight"
              style={{ color: "#e8f5e9", fontFamily: "var(--font-playfair)" }}
            >
              Projects
            </h2>
            <div className="w-20 h-px bg-linear-to-r from-transparent via-[#2d6a4f] to-transparent mx-auto mt-6" />
          </div>

          <div className="absolute left-1/2 top-[260px] bottom-36 w-px bg-linear-to-b from-transparent via-[#2d6a4f]/15 to-transparent hidden md:block" />

          <div className="space-y-16 md:space-y-24">
            {PROJECTS.map((project, i) => {
              const isLeft = i % 2 === 0;
              return (
                <div key={project.title} className="project-card relative">
                  <span
                    className={`ghost-number absolute top-0 text-[100px] md:text-[140px] font-bold leading-none select-none pointer-events-none hidden md:block ${isLeft ? "right-2 md:right-[6%]" : "left-2 md:left-[6%]"}`}
                    style={{ color: "#0d2818", fontFamily: "var(--font-playfair)" }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>

                  <div className="absolute left-1/2 top-5 -translate-x-1/2 w-2 h-2 rounded-full bg-[#0a1f0a] border border-[#2d6a4f]/50 hidden md:block z-10" />

                  <div className={`relative md:w-[54%] ${isLeft ? "" : "md:ml-auto"}`}>
                    <div className="group relative overflow-hidden rounded-2xl border border-[#2d6a4f]/20 bg-[#0c1812]/90 p-6 md:p-8 transition-all duration-500 hover:border-[#52b788]/30 hover:shadow-[0_0_40px_-12px_rgba(82,183,136,0.12)]">
                      <div className="absolute inset-0 bg-linear-to-br from-[#52b78805] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                      <span
                        className="md:hidden text-4xl font-bold absolute top-4 right-4 leading-none select-none pointer-events-none"
                        style={{ color: "#0d2818", fontFamily: "var(--font-playfair)" }}
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>

                      <div className="relative z-10">
                        <div className="flex items-center gap-3 mb-1">
                          <h3
                            className="text-xl md:text-2xl font-semibold"
                            style={{
                              color: "#e8f5e9",
                              fontFamily: "var(--font-playfair)",
                            }}
                          >
                            {project.title}
                          </h3>
                          {project.link && (
                            <a
                              href={project.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="shrink-0 text-[#52b788] hover:text-[#74c69d] transition-colors"
                            >
                              <svg
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              >
                                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                                <polyline points="15 3 21 3 21 9" />
                                <line x1="10" y1="14" x2="21" y2="3" />
                              </svg>
                            </a>
                          )}
                        </div>
                        <p
                          className="text-xs mb-3 opacity-50"
                          style={{
                            color: "#74c69d",
                            fontFamily: "var(--font-inter)",
                          }}
                        >
                          {project.org} · {project.date}
                        </p>
                        <p
                          className="text-sm leading-relaxed mb-5"
                          style={{
                            color: "#a8d5ba",
                            fontFamily: "var(--font-inter)",
                          }}
                        >
                          {project.description}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {project.tech.map((t) => (
                            <span
                              key={t}
                              className="text-[10px] tracking-wider uppercase px-2.5 py-1 rounded-md border border-[#2d6a4f]/30 bg-[#071208]/60"
                              style={{
                                color: "#52b788",
                                fontFamily: "var(--font-inter)",
                              }}
                            >
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="education-section relative px-5 sm:px-8 py-24 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-b from-[#040d08] via-[#050f0a] to-[#040d08]" />
        <div className="relative z-10 max-w-5xl mx-auto">
          <header className="mb-12 md:mb-16 md:flex md:items-end md:justify-between gap-8">
            <div>
              <p
                className="text-xs tracking-[0.35em] uppercase mb-3"
                style={{ color: "#52b788", fontFamily: "var(--font-inter)" }}
              >
                Formal path
              </p>
              <h2
                className="text-4xl md:text-6xl lg:text-7xl leading-tight"
                style={{ color: "#e8f5e9", fontFamily: "var(--font-playfair)" }}
              >
                Education
              </h2>
            </div>
            <p
              className="mt-4 md:mt-0 max-w-sm text-sm opacity-50 leading-relaxed md:text-right"
              style={{ color: "#a8d5ba", fontFamily: "var(--font-inter)" }}
            >
              Degrees and certs, plain and readable — no animation hiding this
              block.
            </p>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6 mb-16">
            {[
              {
                degree: "B.Sc. Computer Science",
                school: "Maldives National University",
                date: "2023 – Present",
              },
              {
                degree: "High School Diploma",
                school: "Centre for Higher Secondary Education",
                date: "2020 – 2022",
              },
            ].map((edu) => (
              <article
                key={edu.degree}
                className="rounded-2xl border border-[#2d6a4f]/30 bg-[#0c1812] p-7 md:p-8 shadow-[0_12px_40px_-20px_rgba(0,0,0,0.5)] hover:border-[#52b788]/35 transition-colors"
              >
                <h3
                  className="text-xl font-semibold mb-2"
                  style={{
                    color: "#e8f5e9",
                    fontFamily: "var(--font-playfair)",
                  }}
                >
                  {edu.degree}
                </h3>
                <p
                  className="text-sm mb-2"
                  style={{ color: "#52b788", fontFamily: "var(--font-inter)" }}
                >
                  {edu.school}
                </p>
                <p
                  className="text-xs opacity-55"
                  style={{ color: "#a8d5ba", fontFamily: "var(--font-inter)" }}
                >
                  {edu.date} · Male&apos;, Maldives
                </p>
              </article>
            ))}
          </div>

          <div className="border-t border-[#2d6a4f]/20 pt-14">
            <h3
              className="text-2xl md:text-3xl mb-10"
              style={{ color: "#e8f5e9", fontFamily: "var(--font-playfair)" }}
            >
              Certifications &amp; awards
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {[
                {
                  title: "Robotics Hackathon 2025",
                  detail: "Gold",
                  sub: "Cube-collector robot — mechanical layout and control logic with the team.",
                },
                {
                  title: "CCNA 1",
                  detail: "Cisco",
                  sub: "Routers, switches, IP basics, and a first pass at securing small nets.",
                },
                {
                  title: "CCNA 2",
                  detail: "Cisco",
                  sub: "VLANs, routing protocols, ACLs, wireless, multi-site WAN thinking.",
                },
              ].map((cert) => (
                <article
                  key={cert.title}
                  className="rounded-2xl border border-[#2d6a4f]/25 bg-[#0a1410] p-6 md:p-7 hover:border-[#52b788]/30 transition-colors"
                >
                  <p
                    className="text-[10px] tracking-[0.2em] uppercase mb-2"
                    style={{
                      color: "#52b788",
                      fontFamily: "var(--font-inter)",
                    }}
                  >
                    {cert.detail}
                  </p>
                  <h4
                    className="text-lg font-semibold mb-2"
                    style={{
                      color: "#e8f5e9",
                      fontFamily: "var(--font-playfair)",
                    }}
                  >
                    {cert.title}
                  </h4>
                  <p
                    className="text-xs leading-relaxed opacity-65"
                    style={{
                      color: "#a8d5ba",
                      fontFamily: "var(--font-inter)",
                    }}
                  >
                    {cert.sub}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="contact-section relative px-5 sm:px-8 py-24 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-b from-[#040d08] via-[#050f0a] to-[#030a06]" />
        <div className="relative z-10 max-w-3xl mx-auto">
          <div className="md:text-left text-center mb-10">
            <p
              className="text-xs tracking-[0.35em] uppercase mb-3"
              style={{ color: "#52b788", fontFamily: "var(--font-inter)" }}
            >
              Contact
            </p>
            <h2
              className="text-4xl md:text-6xl lg:text-7xl leading-tight mb-4"
              style={{ color: "#e8f5e9", fontFamily: "var(--font-playfair)" }}
            >
              Say hello
            </h2>
            <p
              className="text-sm md:text-base leading-relaxed max-w-lg opacity-55 md:mx-0 mx-auto"
              style={{ color: "#a8d5ba", fontFamily: "var(--font-inter)" }}
            >
              Hulhumale, Maldives · open to remote roles and interesting
              collaborations. Pick whatever channel you actually check.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row md:flex-row flex-wrap md:justify-start justify-center gap-3 sm:gap-4">
            <a
              href="mailto:ajmalpomp124@gmail.com"
              className="group inline-flex items-center justify-center gap-3 px-5 py-3.5 rounded-xl border border-[#2d6a4f]/40 bg-[#0c1812] transition-all duration-300 hover:border-[#52b788]/50 hover:bg-[#0f2218]"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#52b788"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="group-hover:stroke-[#74c69d] transition-colors shrink-0"
              >
                <rect width="20" height="16" x="2" y="4" rx="2" />
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
              </svg>
              <span
                className="text-sm break-all sm:break-normal text-left"
                style={{ color: "#e8f5e9", fontFamily: "var(--font-inter)" }}
              >
                ajmalpomp124@gmail.com
              </span>
            </a>
            <a
              href="https://www.linkedin.com/in/mohamed-ajmal-5abb432b7/"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center justify-center gap-3 px-5 py-3.5 rounded-xl border border-[#2d6a4f]/40 bg-[#0c1812] transition-all duration-300 hover:border-[#52b788]/50 hover:bg-[#0f2218]"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="#52b788"
                className="group-hover:fill-[#74c69d] transition-colors shrink-0"
              >
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                <rect width="4" height="12" x="2" y="9" />
                <circle cx="4" cy="4" r="2" />
              </svg>
              <span
                className="text-sm"
                style={{ color: "#e8f5e9", fontFamily: "var(--font-inter)" }}
              >
                LinkedIn
              </span>
            </a>
            <a
              href="https://gitlab.com/ajuksyy"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center justify-center gap-3 px-5 py-3.5 rounded-xl border border-[#2d6a4f]/40 bg-[#0c1812] transition-all duration-300 hover:border-[#52b788]/50 hover:bg-[#0f2218]"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="#52b788"
                className="group-hover:fill-[#74c69d] transition-colors shrink-0"
              >
                <path d="m22 13.29-3.33-10a.42.42 0 0 0-.14-.18.38.38 0 0 0-.22-.11.39.39 0 0 0-.23.07.42.42 0 0 0-.14.18l-2.26 6.67H8.32L6.06 3.26a.42.42 0 0 0-.14-.18.38.38 0 0 0-.23-.07.39.39 0 0 0-.22.11.42.42 0 0 0-.14.18L2 13.29a.74.74 0 0 0 .27.83L12 21l9.69-6.88a.71.71 0 0 0 .31-.83Z" />
              </svg>
              <span
                className="text-sm"
                style={{ color: "#e8f5e9", fontFamily: "var(--font-inter)" }}
              >
                GitLab
              </span>
            </a>
          </div>
        </div>
      </section>

      <footer className="relative px-6 py-10 text-center border-t border-[#2d6a4f]/10">
        <div className="absolute inset-0 bg-[#030a06]" />
        <div className="relative z-10 flex flex-col items-center gap-3">
          <div className="w-6 h-6 opacity-[0.08]">
            <TropicalLeaf shade={3} />
          </div>
          <p
            className="text-xs opacity-35"
            style={{ color: "#74c69d", fontFamily: "var(--font-inter)" }}
          >
            Mohamed Ajmal Ahmed · {new Date().getFullYear()}
          </p>
        </div>
      </footer>
    </div>
  );
}
