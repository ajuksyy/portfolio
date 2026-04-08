"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { CustomCursor } from "@/components/CustomCursor";
import { FilmGrain } from "@/components/FilmGrain";
import { HeroThreeInteractive } from "@/components/HeroThreeInteractive";
import { SectionParticles } from "@/components/SectionParticles";
import { projectsParticleOptions } from "@/lib/particlePresets";
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
    tech: ["Next.js", "React", "Payload CMS", "Typescript"],
  },
  {
    title: "AI Face Model",
    org: "Maldives National University",
    date: "2025",
    description:
      "A small deep-learning experiment: map faces against a trained set and talk about similarity in a controlled, honest way.",
    tech: ["Python", "Deep Learning", "DLib", "Cmake"],
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

const EDUCATION_ENTRIES = [
  {
    range: "2023 – Present",
    title: "B.Sc. Computer Science",
    school: "Maldives National University",
    place: "Malé, Maldives",
  },
  {
    range: "2020 – 2022",
    title: "High School Diploma",
    school: "Centre for Higher Secondary Education",
    place: "Malé, Maldives",
  },
] as const;

const CERT_SPOTLIGHT = {
  label: "Gold · team",
  title: "Robotics Hackathon 2025",
  body: "Cube-collector robot — mechanical layout and control logic with the team.",
} as const;

const CERT_CISCO = [
  {
    title: "CCNA 1",
    body: "Routers, switches, IP basics, and a first pass at securing small nets.",
  },
  {
    title: "CCNA 2",
    body: "VLANs, routing protocols, ACLs, wireless, multi-site WAN thinking.",
  },
] as const;

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);

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
      heroTl.to(".hero-backdrop", { opacity: 0, duration: 0.9 }, 0);
      heroTl.to(
        ".hero-three-wrap",
        { opacity: 0, scale: 0.92, filter: "blur(8px)", duration: 0.85, ease: "power2.in" },
        0.05,
      );
      heroTl.to(
        ".hero-text-container",
        { y: -48, opacity: 0, duration: 0.8, ease: "power2.in" },
        0.06,
      );

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
    <div
      ref={containerRef}
      className="relative min-h-screen bg-[#eef0f3] text-[var(--ink)]"
    >
      <FilmGrain />
      <CustomCursor />

      <div className="relative z-[2]">
      <section className="hero-section relative flex min-h-screen w-full items-center overflow-hidden">
        <div
          className="hero-backdrop pointer-events-none absolute inset-0 bg-linear-to-b from-[#f7f8fa] to-[#e8ebef]"
          aria-hidden
        />

        <div className="relative z-10 mx-auto grid w-full max-w-6xl gap-12 px-6 py-20 md:gap-16 lg:grid-cols-[1fr_1.05fr] lg:items-center lg:gap-10 lg:py-0">
          <div className="hero-text-container flex flex-col items-center text-center lg:items-start lg:text-left">
            <p
              className="text-[13px] text-[var(--ink)]/45"
              style={{ fontFamily: "var(--font-inter)", letterSpacing: "0.02em" }}
            >
              Hello — I&apos;m
            </p>
            <h1
              className="mt-3 text-[clamp(3rem,11vw,5.5rem)] font-light leading-none tracking-[-0.03em] text-[var(--ink)]"
              style={{ fontFamily: "var(--font-outfit)" }}
            >
              Ajmal
            </h1>
            <p
              className="mt-5 max-w-sm text-[15px] leading-snug text-[var(--mist-muted)]"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              Frontend developer. Interfaces, motion, and clear design handoff.
            </p>
            <a
              href="#toolkit"
              className="explore-cta mt-10 inline-flex items-center border-b border-[var(--ink)]/25 pb-1 text-sm text-[var(--ink)] transition-colors hover:border-[var(--ink)]"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              View work
            </a>
          </div>

          <div className="hero-three-wrap relative mx-auto aspect-square w-full max-w-[min(100%,380px)] sm:max-w-[420px] lg:max-w-none lg:justify-self-end">
            <HeroThreeInteractive />
          </div>
        </div>

        <p
          className="pointer-events-none absolute bottom-8 left-1/2 -translate-x-1/2 text-[11px] text-[var(--ink)]/30"
          style={{ fontFamily: "var(--font-inter)", letterSpacing: "0.2em" }}
        >
          SCROLL
        </p>
      </section>

      <section
        id="toolkit"
        className="tech-section relative px-5 sm:px-8 py-24 md:py-32 overflow-hidden"
      >
        <div className="absolute inset-0 bg-linear-to-b from-[#e8eaef]/92 via-[#f0f1f5]/88 to-[#e4e6ec]/93 backdrop-blur-sm" />
        <SectionParticles id="tsparticles-toolkit" className="z-1" />

        <div className="relative z-10 max-w-6xl mx-auto">
          <div className="section-title mb-4 md:mb-6 md:text-left text-center">
            <p
              className="text-xs tracking-[0.35em] uppercase mb-3"
              style={{ color: "var(--mist-accent)", fontFamily: "var(--font-inter)" }}
            >
              Toolkit
            </p>
            <h2
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[1.05]"
              style={{ color: "var(--ink)", fontFamily: "var(--font-outfit)" }}
            >
              What I actually use
            </h2>
            <p
              className="mt-4 max-w-xl md:mx-0 mx-auto text-sm md:text-base opacity-55 leading-relaxed"
              style={{ color: "var(--mist-muted)", fontFamily: "var(--font-inter)" }}
            >
              Grouped by how it shows up in real work — not a keyword dump.
            </p>
            <div className="mx-auto mt-6 h-px w-20 bg-linear-to-r from-transparent via-[var(--ink)]/20 to-transparent md:mx-0" />
          </div>

          <div className="tech-bento mt-14 grid grid-cols-1 gap-5 md:gap-6 lg:grid-cols-12">
            <article className="lg:col-span-8 rounded-3xl border border-black/10 bg-white/72 p-6 md:p-8 backdrop-blur-md shadow-[0_24px_80px_-40px_rgba(15,18,24,0.18)]">
              <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
                <div>
                  <p
                    className="text-[10px] uppercase tracking-[0.28em] opacity-70"
                    style={{ color: "var(--mist-muted)", fontFamily: "var(--font-inter)" }}
                  >
                    Working kit
                  </p>
                  <h3
                    className="mt-2 text-2xl md:text-3xl leading-tight"
                    style={{ color: "var(--ink)", fontFamily: "var(--font-outfit)" }}
                  >
                    My go-to stack when shipping
                  </h3>
                </div>
                <span
                  className="rounded-full border border-black/14 bg-black/[0.04] px-3 py-1 text-[10px] uppercase tracking-[0.2em]"
                  style={{ color: "var(--mist-muted)", fontFamily: "var(--font-inter)" }}
                >
                  {TECH_GROUPS[0].items.length} core tools
                </span>
              </div>

              <div className="mb-7 grid grid-cols-1 gap-3 sm:grid-cols-2">
                {[
                  "Proficient in Frontend Development",
                  "API Intergrations",
                  "Minimalistic designs",
                  "Familiar with Libraries and Frameworks",
                ].map((point) => (
                  <div
                    key={point}
                    className="rounded-xl border border-black/10 bg-white/55 px-3.5 py-3 text-sm"
                    style={{ color: "var(--ink-soft)", fontFamily: "var(--font-inter)" }}
                  >
                    {point}
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-2.5">
                {TECH_GROUPS[0].items.map((name) => (
                  <span
                    key={name}
                    className="tech-pill inline-flex items-center rounded-full border border-black/12 bg-white/50 px-3.5 py-2 text-sm text-[var(--ink)] transition-colors hover:border-black/22 hover:bg-black/[0.05] cursor-default"
                    style={{ fontFamily: "var(--font-inter)" }}
                  >
                    {name}
                  </span>
                ))}
              </div>
            </article>

            <aside className="lg:col-span-4 flex flex-col gap-5 md:gap-6">
              <article className="rounded-3xl border border-black/10 bg-white/60 p-6 md:p-7">
                <p
                  className="mb-2 text-[10px] uppercase tracking-[0.25em]"
                  style={{ color: "var(--mist-muted)", fontFamily: "var(--font-inter)" }}
                >
                  Currently building with
                </p>
                <div className="mb-4 h-px w-full bg-linear-to-r from-transparent via-[var(--ink)]/18 to-transparent" />
                <div className="space-y-2.5">
                  {TECH_GROUPS[1].items.map((name) => (
                    <div
                      key={name}
                      className="rounded-lg border border-black/10 bg-white/50 px-3 py-2 text-sm"
                      style={{ color: "var(--ink-soft)", fontFamily: "var(--font-inter)" }}
                    >
                      {name}
                    </div>
                  ))}
                </div>
              </article>

              <article className="rounded-3xl border border-black/10 bg-linear-to-br from-white/65 to-[#e6e8ee]/85 p-6 md:p-7">
                <h4
                  className="mb-2 text-lg"
                  style={{ color: "var(--ink)", fontFamily: "var(--font-outfit)" }}
                >
                  Outside frontend
                </h4>
                <p
                  className="mb-4 text-xs opacity-65"
                  style={{ color: "var(--mist-muted)", fontFamily: "var(--font-inter)" }}
                >
                  Used for experiments, data tasks, and quick internal tooling.
                </p>
                <div className="flex flex-wrap gap-2">
                  {TECH_GROUPS[2].items.map((name) => (
                    <span
                      key={name}
                      className="tech-pill inline-flex rounded-md border border-white/6 bg-black/25 px-3 py-1.5 text-xs font-medium text-[var(--mist-muted)] transition-colors hover:text-[var(--ink)] cursor-default"
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
        <div className="absolute inset-0 bg-linear-to-b from-[#e6e8ed]/90 via-[#eef0f4]/85 to-[#e2e5ea]/92 backdrop-blur-sm" />
        <div className="relative z-10 max-w-4xl mx-auto">
          <div className="section-title text-center mb-16 md:mb-20">
            <p
              className="text-xs tracking-[0.35em] uppercase mb-4"
              style={{ color: "var(--mist-accent)", fontFamily: "var(--font-inter)" }}
            >
              Work
            </p>
            <h2
              className="text-4xl md:text-6xl lg:text-7xl leading-tight"
              style={{ color: "var(--ink)", fontFamily: "var(--font-outfit)" }}
            >
              Experience
            </h2>
            <div className="mx-auto mt-6 h-px w-20 bg-linear-to-r from-transparent via-[var(--ink)]/22 to-transparent" />
          </div>

          <div className="relative">
            <div className="absolute left-6 md:left-8 top-0 bottom-0 w-px bg-linear-to-b from-black/18 via-black/10 to-transparent" />

            <div className="exp-card relative pl-16 md:pl-20 pb-14">
              <div className="absolute left-[18px] md:left-[26px] top-2 w-3 h-3 rounded-full bg-[var(--ink)] shadow-[0_0_14px_rgba(12,12,14,0.2)]" />
              <div className="flex flex-col md:flex-row md:items-baseline gap-1 md:gap-4 mb-4">
                <h3
                  className="text-2xl md:text-3xl font-semibold"
                  style={{
                    color: "var(--ink)",
                    fontFamily: "var(--font-outfit)",
                  }}
                >
                  Frontend Developer
                </h3>
                <span
                  className="text-sm opacity-50"
                  style={{ color: "var(--mist-muted)", fontFamily: "var(--font-inter)" }}
                >
                  Feb 2025 – Present
                </span>
              </div>
              <p
                className="text-lg mb-4 font-medium"
                style={{ color: "var(--mist-accent)", fontFamily: "var(--font-inter)" }}
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
                      color: "var(--mist-muted)",
                      fontFamily: "var(--font-inter)",
                    }}
                  >
                    <span className="mt-1.5 shrink-0 w-1 h-1 rounded-full bg-[var(--ink)]" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="exp-card relative pl-16 md:pl-20">
              <div className="absolute left-[18px] md:left-[26px] top-2 w-3 h-3 rounded-full border-2 border-[var(--ink)]/35 bg-white" />
              <div className="flex flex-col md:flex-row md:items-baseline gap-1 md:gap-4 mb-4">
                <h3
                  className="text-2xl md:text-3xl font-semibold"
                  style={{
                    color: "var(--ink)",
                    fontFamily: "var(--font-outfit)",
                  }}
                >
                  Intern
                </h3>
                <span
                  className="text-sm opacity-50"
                  style={{ color: "var(--mist-muted)", fontFamily: "var(--font-inter)" }}
                >
                  Jan 2024 – Sep 2025
                </span>
              </div>
              <p
                className="text-lg mb-4 font-medium"
                style={{ color: "var(--mist-accent)", fontFamily: "var(--font-inter)" }}
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
                      color: "var(--mist-muted)",
                      fontFamily: "var(--font-inter)",
                    }}
                  >
                    <span className="mt-1.5 shrink-0 w-1 h-1 rounded-full bg-[var(--ink)]" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="projects-section relative px-5 sm:px-8 py-24 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-b from-[#e6e8ed]/90 via-[#eef0f4]/85 to-[#e2e5ea]/92 backdrop-blur-sm" />
        <SectionParticles id="tsparticles-projects" className="z-1" options={projectsParticleOptions} />
        <div className="relative z-10 max-w-5xl mx-auto">
          <div className="section-title text-center mb-16 md:mb-20">
            <p
              className="text-xs tracking-[0.35em] uppercase mb-4"
              style={{ color: "var(--mist-accent)", fontFamily: "var(--font-inter)" }}
            >
              Selected builds
            </p>
            <h2
              className="text-4xl md:text-6xl lg:text-7xl leading-tight"
              style={{ color: "var(--ink)", fontFamily: "var(--font-outfit)" }}
            >
              Projects
            </h2>
            <div className="mx-auto mt-6 h-px w-20 bg-linear-to-r from-transparent via-[var(--ink)]/22 to-transparent" />
          </div>

          <div className="absolute left-1/2 top-[260px] bottom-36 w-px bg-linear-to-b from-transparent via-[var(--ink)]/15 to-transparent hidden md:block" />

          <div className="space-y-16 md:space-y-24">
            {PROJECTS.map((project, i) => {
              const isLeft = i % 2 === 0;
              return (
                <div key={project.title} className="project-card relative">
                  <span
                    className={`ghost-number absolute top-0 text-[100px] md:text-[140px] font-bold leading-none select-none pointer-events-none hidden md:block ${isLeft ? "right-2 md:right-[6%]" : "left-2 md:left-[6%]"}`}
                    style={{ color: "rgba(12,14,18,0.07)", fontFamily: "var(--font-outfit)" }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>

                  <div className="absolute left-1/2 top-5 -translate-x-1/2 w-2 h-2 rounded-full bg-white border border-black/12 hidden md:block z-10" />

                  <div className={`relative md:w-[54%] ${isLeft ? "" : "md:ml-auto"}`}>
                    <div className="group relative overflow-hidden rounded-2xl border border-black/8 bg-white/72 p-6 md:p-8 backdrop-blur-md transition-all duration-500 hover:border-black/18 hover:shadow-[0_20px_50px_-24px_rgba(15,18,24,0.12)]">
                      <div className="absolute inset-0 bg-linear-to-br from-black/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                      <span
                        className="md:hidden text-4xl font-bold absolute top-4 right-4 leading-none select-none pointer-events-none"
                        style={{ color: "rgba(12,14,18,0.07)", fontFamily: "var(--font-outfit)" }}
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>

                      <div className="relative z-10">
                        <div className="flex items-center gap-3 mb-1">
                          <h3
                            className="text-xl md:text-2xl font-semibold"
                            style={{
                              color: "var(--ink)",
                              fontFamily: "var(--font-outfit)",
                            }}
                          >
                            {project.title}
                          </h3>
                          {project.link && (
                            <a
                              href={project.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="shrink-0 text-[var(--mist-accent)] hover:text-[var(--ink)] transition-colors"
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
                            color: "var(--mist-muted)",
                            fontFamily: "var(--font-inter)",
                          }}
                        >
                          {project.org} · {project.date}
                        </p>
                        <p
                          className="text-sm leading-relaxed mb-5"
                          style={{
                            color: "var(--mist-muted)",
                            fontFamily: "var(--font-inter)",
                          }}
                        >
                          {project.description}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {project.tech.map((t) => (
                            <span
                              key={t}
                              className="text-[10px] tracking-wider uppercase px-2.5 py-1 rounded-md border border-black/10 bg-white/45"
                              style={{
                                color: "var(--mist-accent)",
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
        <div className="absolute inset-0 bg-linear-to-b from-[#e6e8ed]/90 via-[#eef0f4]/85 to-[#e2e5ea]/92 backdrop-blur-sm" />
        <div
          className="pointer-events-none absolute right-[8%] top-[42%] hidden lg:block h-48 w-48 rounded-full border border-black/6"
          aria-hidden
        />
        <div className="relative z-10 max-w-4xl mx-auto">
          <header className="mb-14 md:mb-20">
            <p
              className="text-[11px] tracking-[0.28em] uppercase mb-4"
              style={{ color: "var(--mist-accent)", fontFamily: "var(--font-inter)" }}
            >
              Formal path
            </p>
            <div className="md:flex md:items-baseline md:justify-between gap-8 md:gap-12">
              <h2
                className="text-4xl md:text-5xl lg:text-6xl leading-[1.05] font-light tracking-[-0.02em]"
                style={{ color: "var(--ink)", fontFamily: "var(--font-outfit)" }}
              >
                Education
              </h2>
              <p
                className="mt-5 md:mt-0 max-w-[16rem] text-[13px] leading-relaxed md:text-right"
                style={{ color: "var(--mist-muted)", fontFamily: "var(--font-inter)" }}
              >
                Started my education in Malé — Currently pursuing a B.Sc. of Computer Science at MNU
              </p>
            </div>
          </header>

          <div className="relative mb-20 md:mb-24">
            {/* Single axis: line + dots share center (w-px centered with -translate-x-1/2) */}
            <div
              className="absolute left-[15px] top-2 bottom-2 w-px -translate-x-1/2 bg-linear-to-b from-black/12 via-black/8 to-transparent"
              aria-hidden
            />
            <ul className="space-y-14 md:space-y-16">
              {EDUCATION_ENTRIES.map((edu) => (
                <li key={edu.title} className="relative pl-10 md:pl-11">
                  <span
                    className="absolute left-[15px] top-[0.35rem] size-2 -translate-x-1/2 rounded-full border-2 border-white bg-(--ink)/25 shadow-[0_0_0_1px_rgba(15,18,24,0.08)]"
                    aria-hidden
                  />
                  <time
                    className="block text-[11px] tabular-nums tracking-[0.12em] uppercase mb-2"
                    style={{ color: "var(--mist-muted)", fontFamily: "var(--font-inter)" }}
                  >
                    {edu.range}
                  </time>
                  <h3
                    className="text-xl md:text-2xl font-normal leading-snug mb-1.5"
                    style={{ color: "var(--ink)", fontFamily: "var(--font-outfit)" }}
                  >
                    {edu.title}
                  </h3>
                  <p
                    className="text-sm"
                    style={{ color: "var(--mist-accent)", fontFamily: "var(--font-inter)" }}
                  >
                    {edu.school}
                  </p>
                  <p
                    className="mt-2 text-xs opacity-60"
                    style={{ color: "var(--mist-muted)", fontFamily: "var(--font-inter)" }}
                  >
                    {edu.place}
                  </p>
                </li>
              ))}
            </ul>
          </div>

          <div className="border-t border-black/10 pt-16 md:pt-20">
            <h3
              className="text-xl md:text-2xl font-light tracking-[-0.02em] mb-2"
              style={{ color: "var(--ink)", fontFamily: "var(--font-outfit)" }}
            >
              Certifications &amp; awards
            </h3>
            <p
              className="text-xs mb-10 max-w-md opacity-70"
              style={{ color: "var(--mist-muted)", fontFamily: "var(--font-inter)" }}
            >
              Hackathon hardware win plus two Cisco modules — the networking pair
              belongs together.
            </p>

            <article className="mb-8 rounded-2xl border border-amber-950/10 bg-linear-to-br from-amber-50/80 via-white/60 to-white/40 p-6 md:p-8 backdrop-blur-sm">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:gap-6">
                <span
                  className="inline-flex w-fit shrink-0 rounded-lg border border-amber-900/15 bg-amber-100/60 px-2.5 py-1 text-[10px] font-medium tracking-wide text-amber-950/75"
                  style={{ fontFamily: "var(--font-inter)" }}
                >
                  {CERT_SPOTLIGHT.label}
                </span>
                <div className="min-w-0">
                  <h4
                    className="text-lg md:text-xl font-normal leading-tight mb-2"
                    style={{ color: "var(--ink)", fontFamily: "var(--font-outfit)" }}
                  >
                    {CERT_SPOTLIGHT.title}
                  </h4>
                  <p
                    className="text-sm leading-relaxed"
                    style={{ color: "var(--mist-muted)", fontFamily: "var(--font-inter)" }}
                  >
                    {CERT_SPOTLIGHT.body}
                  </p>
                </div>
              </div>
            </article>

            <div className="rounded-2xl border border-slate-400/15 bg-white/45 p-6 md:p-8 backdrop-blur-sm">
              <p
                className="text-[10px] tracking-[0.22em] uppercase mb-6 opacity-55"
                style={{ color: "var(--mist-muted)", fontFamily: "var(--font-inter)" }}
              >
                Cisco · networking track
              </p>
              <div className="grid gap-8 md:grid-cols-2 md:gap-0 md:divide-x md:divide-black/8">
                {CERT_CISCO.map((c, i) => (
                  <div key={c.title} className={i === 1 ? "md:pl-10" : "md:pr-10"}>
                    <h4
                      className="text-base font-normal mb-2"
                      style={{ color: "var(--ink)", fontFamily: "var(--font-outfit)" }}
                    >
                      {c.title}
                    </h4>
                    <p
                      className="text-[13px] leading-relaxed opacity-80"
                      style={{ color: "var(--mist-muted)", fontFamily: "var(--font-inter)" }}
                    >
                      {c.body}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="contact-section relative px-5 sm:px-8 py-24 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-b from-[#e2e4ea]/93 via-[#eceef3]/88 to-[#dfe2e8]/94 backdrop-blur-sm" />
        <div className="relative z-10 max-w-3xl mx-auto">
          <div className="md:text-left text-center mb-10">
            <p
              className="text-xs tracking-[0.35em] uppercase mb-3"
              style={{ color: "var(--mist-accent)", fontFamily: "var(--font-inter)" }}
            >
              Contact
            </p>
            <h2
              className="text-4xl md:text-6xl lg:text-7xl leading-tight mb-4"
              style={{ color: "var(--ink)", fontFamily: "var(--font-outfit)" }}
            >
              Say hello
            </h2>
            <p
              className="text-sm md:text-base leading-relaxed max-w-lg opacity-55 md:mx-0 mx-auto"
              style={{ color: "var(--mist-muted)", fontFamily: "var(--font-inter)" }}
            >
              Hulhumale, Maldives · open to remote roles and interesting
              collaborations. Pick whatever channel you actually check.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row md:flex-row flex-wrap md:justify-start justify-center gap-3 sm:gap-4">
            <a
              href="mailto:ajmalpomp124@gmail.com"
              className="group inline-flex items-center justify-center gap-3 px-5 py-3.5 rounded-xl border border-black/12 bg-white/70 backdrop-blur-sm transition-all duration-300 hover:border-black/25 hover:bg-white/92"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="var(--mist-accent)"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="group-hover:stroke-[var(--ink)] transition-colors shrink-0"
              >
                <rect width="20" height="16" x="2" y="4" rx="2" />
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
              </svg>
              <span
                className="text-sm break-all sm:break-normal text-left"
                style={{ color: "var(--ink)", fontFamily: "var(--font-inter)" }}
              >
                ajmalpomp124@gmail.com
              </span>
            </a>
            <a
              href="https://www.linkedin.com/in/mohamed-ajmal-5abb432b7/"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center justify-center gap-3 px-5 py-3.5 rounded-xl border border-black/12 bg-white/70 backdrop-blur-sm transition-all duration-300 hover:border-black/25 hover:bg-white/92"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="var(--mist-accent)"
                className="group-hover:fill-[var(--ink)] transition-colors shrink-0"
              >
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                <rect width="4" height="12" x="2" y="9" />
                <circle cx="4" cy="4" r="2" />
              </svg>
              <span
                className="text-sm"
                style={{ color: "var(--ink)", fontFamily: "var(--font-inter)" }}
              >
                LinkedIn
              </span>
            </a>
            <a
              href="https://gitlab.com/ajuksyy"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center justify-center gap-3 px-5 py-3.5 rounded-xl border border-black/12 bg-white/70 backdrop-blur-sm transition-all duration-300 hover:border-black/25 hover:bg-white/92"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="var(--mist-accent)"
                className="group-hover:fill-[var(--ink)] transition-colors shrink-0"
              >
                <path d="m22 13.29-3.33-10a.42.42 0 0 0-.14-.18.38.38 0 0 0-.22-.11.39.39 0 0 0-.23.07.42.42 0 0 0-.14.18l-2.26 6.67H8.32L6.06 3.26a.42.42 0 0 0-.14-.18.38.38 0 0 0-.23-.07.39.39 0 0 0-.22.11.42.42 0 0 0-.14.18L2 13.29a.74.74 0 0 0 .27.83L12 21l9.69-6.88a.71.71 0 0 0 .31-.83Z" />
              </svg>
              <span
                className="text-sm"
                style={{ color: "var(--ink)", fontFamily: "var(--font-inter)" }}
              >
                GitLab
              </span>
            </a>
          </div>
        </div>
      </section>

      <footer className="relative border-t border-black/6 px-6 py-10 text-center">
        <div className="absolute inset-0 bg-[#e4e6eb]/95 backdrop-blur-sm" />
        <div className="relative z-10 flex flex-col items-center gap-3">
          <div
            className="h-px w-10 bg-linear-to-r from-transparent via-[var(--ink)]/25 to-transparent"
            aria-hidden
          />
          <p
            className="text-xs text-[var(--mist-muted)]/80"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            Mohamed Ajmal Ahmed · {new Date().getFullYear()}
          </p>
        </div>
      </footer>
      </div>
    </div>
  );
}
