import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/home/Hero";
import { ImpactStats } from "@/components/home/ImpactStats";
import { Process } from "@/components/home/Process";
import { ProjectsGrid } from "@/components/home/ProjectsGrid";
import { About } from "@/components/home/About";
import { Allies } from "@/components/home/Allies";
import { FinalCta } from "@/components/home/FinalCta";

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <Hero />
        <ImpactStats />
        <Process />
        <ProjectsGrid />
        <About />
        <Allies />
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}
