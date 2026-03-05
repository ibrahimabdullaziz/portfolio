import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Projects } from "@/components/Projects";
import { Skills } from "@/components/Skills";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center w-full">
      <Hero />
      <About />
      <Projects />
      <Skills />
    </main>
  );
}
