import { AreasExplorer } from "@/components/AreasExplorer";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { Founder } from "@/components/Founder";
import { Hero } from "@/components/Hero";
import { Nav } from "@/components/Nav";
import { Reasons } from "@/components/Reasons";
import { Stages } from "@/components/Stages";
import { TalentDialogProvider } from "@/components/TalentDialog";
import { TalentGrid } from "@/components/TalentGrid";

export default function Home() {
  return (
    <TalentDialogProvider>
      <a
        href="#como-funciona"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:bg-gold-500 focus:px-4 focus:py-2 focus:font-bold focus:text-navy-950"
      >
        Saltar al contenido
      </a>
      <Nav />
      <main>
        <Hero />
        <Stages />
        <Founder />
        <AreasExplorer />
        <TalentGrid />
        <Reasons />
        <Contact />
      </main>
      <Footer />
    </TalentDialogProvider>
  );
}
