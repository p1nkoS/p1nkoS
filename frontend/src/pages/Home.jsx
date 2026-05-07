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
import { Phone } from "lucide-react";

export default function Home() {
  const [formOpen, setFormOpen] = useState(false);
  const [showFloating, setShowFloating] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowFloating(window.scrollY > 800);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Reveal on scroll
  useEffect(() => {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) e.target.classList.add("is-visible");
      });
    }, { threshold: 0.12 });
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
        <WindowModels onOpenForm={openForm} />
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

      {/* Floating call button */}
      <a
        href="tel:+380687239722"
        className={`fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full bg-[#FF5722] hover:bg-[#e64a17] text-white shadow-2xl shadow-[#FF5722]/40 flex items-center justify-center transition-all duration-300 ${
          showFloating ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10 pointer-events-none"
        }`}
      >
        <span className="absolute inset-0 rounded-full bg-[#FF5722] animate-ping opacity-30" />
        <Phone size={20} className="relative" />
      </a>

      <FormModal open={formOpen} onOpenChange={setFormOpen} />
    </div>
  );
}
