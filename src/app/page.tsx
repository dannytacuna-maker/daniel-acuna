import { About } from "@/components/About";
import { Contact } from "@/components/Contact";
import { Experience } from "@/components/Experience";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { LaptopStudio } from "@/components/LaptopStudio";
import { Skills } from "@/components/Skills";

export default function Home() {
  return (
    <>
      <Header />
      <main id="content">
        <Hero />
        <About />
        <LaptopStudio />
        <Experience />
        <Skills />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
