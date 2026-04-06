import { SparklesText } from "@/components/ui/sparkles-text";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full flex-col items-center justify-center bg-white dark:bg-black">
        <section className="flex w-full flex-1 items-center justify-center px-4">
          <SparklesText
            text="Hello Its Ajmal"
            className="text-center text-6xl font-normal tracking-tight text-zinc-900 dark:text-white sm:text-7xl md:text-8xl lg:text-9xl"
            sparklesCount={14}
            colors={{ first: "#9E7AFF", second: "#FE8BBB" }}
          />
        </section>
      </main>
    </div>
  );
}
