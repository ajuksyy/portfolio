import Hero from "@/components/Hero";
import Skills from "@/components/Skills";
import Journey from "@/components/Journey";
import Projects from "@/components/Projects";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-[#050505] text-[#ededed] overflow-hidden selection:bg-[#b026ff] selection:text-white">
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <Hero />
        <Skills />
        <Journey />
        <Projects />
      </div>
    </main>
  );
}
