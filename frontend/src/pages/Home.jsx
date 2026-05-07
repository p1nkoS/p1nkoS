import { useEffect, useState } from "react";
import Header from "../components/Header";
import Hero from "../components/Hero";
import ProductCategories from "../components/ProductCategories";
import WindowsTabs from "../components/WindowsTabs";
import WindowModels from "../components/WindowModels";
import Features from "../components/Features";
import Stats from "../components/Stats";
import DoorsAndExtras from "../components/DoorsAndExtras";
import Process from "../components/Process";
import Testimonials from "../components/Testimonials";
import Gallery from "../components/Gallery";
import FAQAndPartners from "../components/FAQAndPartners";
import Contact from "../components/Contact";
import Footer from "../components/Footer";
import FormModal from "../components/FormModal";
import FloatingActions from "../components/FloatingActions";

export default function Home() {
  const [formOpen, setFormOpen] = useState(false);

  // Reveal on scroll
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add("is-visible");
        });
      },
      { threshold: 0.12 }
    );
    document.querySelectorAll(".reveal").forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  const openForm = () => setFormOpen(true);

  return (
    <div className="min-h-screen bg-[#f5f1ec] overflow-x-hidden">
      <Header onOpenForm={openForm} />
      <main>
        <Hero onOpenForm={openForm} />
        <ProductCategories />
        <WindowsTabs />
        <WindowModels />
        <Features />
        <Stats />
        <DoorsAndExtras />
        <Gallery />
        <Process onOpenForm={openForm} />
        <Testimonials />
        <FAQAndPartners />
        <Contact />
      </main>
      <Footer />

      <FloatingActions />
      <FormModal open={formOpen} onOpenChange={setFormOpen} />
    </div>
  );
}
