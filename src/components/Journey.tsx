"use client";

import { motion } from "framer-motion";

const milestones = [
  {
    year: "2020 - 2022",
    title: "CHSE High School",
    description: "I started my journey studying science and mathematics, laying the groundwork for logical problem-solving.",
    color: "text-[#00f0ff]",
    doodleColor: "#00f0ff",
    align: "left",
  },
  {
    year: "2023 - Present",
    title: "Bachelor’s in Computer Science",
    description: "Started studying at Maldives National University. Explored different programming languages and met great developers.",
    color: "text-[#b026ff]",
    doodleColor: "#b026ff",
    align: "right",
  },
  {
    year: "2024 - 2025",
    title: "Internship at Loopcraft",
    description: "I arrived to do my internship and stayed to learn the basics of modern web design and frontend development.",
    color: "text-[#39ff14]",
    doodleColor: "#39ff14",
    align: "left",
  },
  {
    year: "2025 - Present",
    title: "Frontend Developer",
    description: "Building production-ready web applications and interactive user interfaces at Loopcraft.",
    color: "text-[#00f0ff]",
    doodleColor: "#00f0ff",
    align: "right",
  },
];

export default function Journey() {
  return (
    <section className="py-20 relative flex flex-col items-center">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-mono font-bold text-white mb-4">
          My developer journey
        </h2>
      </div>

      <div className="max-w-4xl w-full mx-auto relative flex flex-col items-center">
        {milestones.map((milestone, index) => (
          <div key={index} className="w-full relative flex flex-col items-center mb-24">
            {/* Connecting Doodle from previous item */}
            {index > 0 && (
              <div className="absolute -top-24 left-1/2 transform -translate-x-1/2 w-full h-24 flex justify-center pointer-events-none">
                <svg width="100" height="100" viewBox="0 0 100 100" fill="none" className="opacity-50">
                  <motion.path
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 1, ease: "easeInOut" }}
                    d={index % 2 === 1 
                      ? "M50 0 C 20 30, 80 70, 50 100" 
                      : "M50 0 C 80 30, 20 70, 50 100"}
                    stroke={milestone.doodleColor}
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeDasharray="4 4"
                  />
                  <motion.path
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ delay: 1 }}
                    d="M45 95 L50 100 L55 95"
                    stroke={milestone.doodleColor}
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            )}

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className={`w-full md:w-1/2 flex flex-col ${
                milestone.align === "left" ? "md:pr-12 md:self-start md:items-end text-center md:text-right" : "md:pl-12 md:self-end md:items-start text-center md:text-left"
              }`}
            >
              <h3 className={`text-3xl font-bold font-mono mb-1 ${milestone.color}`}>
                {milestone.title}
              </h3>
              <span className="block font-mono text-gray-400 mb-4 text-sm">
                {milestone.year}
              </span>
              
              {/* Hand-drawn style card */}
              <div className="relative p-6 max-w-sm">
                {/* Hand-drawn border SVG */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none" preserveAspectRatio="none">
                  <rect 
                    x="2" y="2" width="calc(100% - 4px)" height="calc(100% - 4px)" 
                    rx="15" ry="15" 
                    fill="none" 
                    stroke="rgba(255,255,255,0.2)" 
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeDasharray="10 4"
                  />
                </svg>
                <p className="text-gray-300 font-mono text-sm leading-relaxed relative z-10">
                  {milestone.description}
                </p>
              </div>
            </motion.div>
          </div>
        ))}
      </div>
    </section>
  );
}
