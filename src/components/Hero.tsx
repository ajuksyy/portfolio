"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import FallingShapes from "./FallingShapes";

export default function Hero() {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center relative pt-20 pb-10 text-center">
      <FallingShapes />
      
      <div className="z-10 flex flex-col items-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
          className="w-32 h-32 md:w-40 md:h-40 rounded-full p-1 bg-gradient-to-tr from-[#b026ff] via-[#00f0ff] to-[#39ff14] mb-8 relative"
        >
          <div className="w-full h-full rounded-full overflow-hidden relative bg-[#050505]">
            <Image 
              src="/myImage.png" 
              alt="Mohamed Ajmal Ahmed" 
              fill 
              className="object-cover"
              priority
            />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-4 font-mono tracking-tight text-white leading-tight">
            Hi. I'm <span className="text-[#b026ff]">Mohamed Ajmal Ahmed</span>.<br />
            <span className="text-[#b026ff]">A Frontend Developer.</span>
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="mt-8"
        >
          {/* Hand-drawn curly line SVG */}
          <svg width="250" height="60" viewBox="0 0 250 60" fill="none" xmlns="http://www.w3.org/2000/svg">
            <motion.path 
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2, ease: "easeInOut", delay: 0.8 }}
              d="M10 30 C 30 10, 50 50, 70 30 C 90 10, 110 50, 130 30 C 150 10, 170 50, 190 30 C 210 10, 230 50, 240 30" 
              stroke="#b026ff" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              className="sketch-path" 
            />
          </svg>
        </motion.div>
      </div>
    </section>
  );
}
