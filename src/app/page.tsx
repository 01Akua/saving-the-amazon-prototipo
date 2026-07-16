import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ScrollExpandHero } from "@/components/home/ScrollExpandHero";
import { ImpactStats } from "@/components/home/ImpactStats";
import { Comparison } from "@/components/home/Comparison";
import { Process } from "@/components/home/Process";
import { ProjectsGrid } from "@/components/home/ProjectsGrid";
import { Quote } from "@/components/home/Quote";
import { About } from "@/components/home/About";
import { Allies } from "@/components/home/Allies";
import { FinalCta } from "@/components/home/FinalCta";

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <ScrollExpandHero />
        <ImpactStats />
        <Comparison />
        <Process />
        <ProjectsGrid />
        <Quote />
        <About />
        <Allies />
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}
