"use client";

import { motion, type Variants } from "framer-motion";

type IntroBioParallaxProps = {
  paragraphs: readonly string[];
};

const container: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.14,
      delayChildren: 0.08,
    },
  },
};

const paragraphVariant: Variants = {
  hidden: { opacity: 0, y: 36, filter: "blur(8px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      type: "spring",
      stiffness: 95,
      damping: 22,
      mass: 0.85,
    },
  },
};

export function IntroBioParallax({ paragraphs }: IntroBioParallaxProps) {
  return (
    <motion.div
      className="intro-bio-playful w-full max-w-2xl lg:max-w-3xl"
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.35, margin: "0px 0px -12% 0px" }}
    >
      <div className="intro-bio-text space-y-8 text-center md:space-y-10">
        {paragraphs.map((paragraph, pi) => (
          <motion.p
            key={pi}
            variants={paragraphVariant}
            className="text-[1.28rem] leading-[1.74] text-(--ink-soft) md:text-[1.48rem] md:leading-[1.8] lg:text-[1.65rem] lg:leading-[1.84] text-pretty"
            style={{
              fontFamily: "var(--font-source-serif)",
              fontWeight: 400,
              letterSpacing: "0.01em",
            }}
          >
            {Array.from(paragraph).map((char, ci) => (
              <span key={`${pi}-${ci}`} className="bio-letter inline-block">
                {char === " " ? "\u00A0" : char}
              </span>
            ))}
          </motion.p>
        ))}
      </div>
    </motion.div>
  );
}
