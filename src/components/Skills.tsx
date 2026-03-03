"use client";

import { motion } from "framer-motion";

const skills = [
  { name: "React", color: "text-[#00f0ff]", border: "border-[#00f0ff]" },
  { name: "Next.js", color: "text-[#b026ff]", border: "border-[#b026ff]" },
  { name: "TypeScript", color: "text-[#39ff14]", border: "border-[#39ff14]" },
  { name: "Tailwind CSS", color: "text-[#00f0ff]", border: "border-[#00f0ff]" },
  { name: "Framer Motion", color: "text-[#b026ff]", border: "border-[#b026ff]" },
  { name: "Three.js", color: "text-[#39ff14]", border: "border-[#39ff14]" },
  { name: "Payload CMS", color: "text-[#00f0ff]", border: "border-[#00f0ff]" },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function Skills() {
  return (
    <section className="py-20 relative flex flex-col items-center">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-mono font-bold text-white mb-4">
          Skills
        </h2>
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="flex flex-wrap justify-center gap-4 max-w-3xl mx-auto"
      >
        {skills.map((skill, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            whileHover={{
              scale: 1.1,
              rotate: [0, -3, 3, -3, 0],
              transition: {
                rotate: {
                  repeat: Infinity,
                  duration: 0.4,
                  ease: "easeInOut",
                },
                scale: { type: "spring", stiffness: 300 },
              },
            }}
            className={`px-6 py-2 rounded-full border-2 bg-transparent text-sm md:text-base font-bold font-mono cursor-pointer transition-colors duration-300 ${skill.border} ${skill.color}`}
          >
            {skill.name}
          </motion.div>
        ))}
      </motion.div>

      {/* Downward connecting doodle */}
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="mt-20"
      >
        <svg width="100" height="200" viewBox="0 0 100 200" fill="none" xmlns="http://www.w3.org/2000/svg">
          <motion.path 
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            d="M50 0 C 80 50, 20 100, 50 150 C 70 180, 40 190, 45 200" 
            stroke="#ffaa00" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            className="sketch-path" 
          />
          {/* Arrow head */}
          <motion.path
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 1.5 }}
            d="M40 195 L45 200 L55 195"
            stroke="#ffaa00"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </motion.div>
    </section>
  );
}
