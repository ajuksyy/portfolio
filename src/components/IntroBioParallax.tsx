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

/** Keeps each word on one line; per-letter spans are only inside the word (line breaks happen between words). */
function WordLetters({ word, wordKey }: { word: string; wordKey: string }) {
  return (
    <span className="inline-block whitespace-nowrap">
      {Array.from(word).map((char, ci) => (
        <span key={`${wordKey}-${ci}`} className="bio-letter inline-block">
          {char}
        </span>
      ))}
    </span>
  );
}

function renderParagraphWithWordBreaks(paragraph: string, paragraphIndex: number) {
  return paragraph.split(/(\s+)/).map((segment, si) => {
    if (/^\s+$/.test(segment)) {
      return (
        <span key={`${paragraphIndex}-sp-${si}`} className="whitespace-pre">
          {segment}
        </span>
      );
    }
    if (!segment) return null;
    return <WordLetters key={`${paragraphIndex}-w-${si}`} word={segment} wordKey={`${paragraphIndex}-${si}`} />;
  });
}

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
            {renderParagraphWithWordBreaks(paragraph, pi)}
          </motion.p>
        ))}
      </div>
    </motion.div>
  );
}
