import { useEffect, useState } from "react";
import { Button } from "../components/ui/button";
import { ArrowRight, Award, Mouse, ChevronLeft, ChevronRight } from "lucide-react";
import { HERO_SLIDES } from "../data/mock";

export default function Hero({ onOpenForm }) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setActive((p) => (p + 1) % HERO_SLIDES.length), 6500);
    return () => clearInterval(t);
  }, []);

  const current = HERO_SLIDES[active];

  return (
    <section id="home" className="relative min-h-[100vh] w-full overflow-hidden">
      {/* Slides */}
      {HERO_SLIDES.map((s, i) => (
        <div
          key={i}
          className={`absolute inset-0 transition-opacity duration-1000 ${i === active ? "opacity-100" : "opacity-0"}`}
        >
          <img
            src={s.image}
            alt={s.title}
            className="absolute inset-0 w-full h-full object-cover animate-slow-zoom"
          />
          <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.65) 50%, rgba(0,0,0,0.85) 100%)" }} />
          <div className="absolute inset-0 bg-[#1a1a1a]/30" />
        </div>
      ))}

      {/* Floating accent */}
      <div className="absolute top-32 right-10 hidden lg:flex items-center gap-2 text-white/80 text-xs uppercase tracking-[0.3em] z-10">
        <span className="w-12 h-px bg-white/40" />
        Vinnytsia
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-[1400px] mx-auto px-6 pt-40 pb-20 min-h-[100vh] flex flex-col justify-center">
        <div className="max-w-4xl">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white/90 text-[13px] mb-6 animate-fade-up">
            <Award size={14} className="text-[#FF5722]" />
            Салон магазин у Вінниці
          </div>

          <h1 className="font-display font-extrabold text-white text-[40px] sm:text-[56px] md:text-[72px] lg:text-[88px] leading-[1.0] mb-6 animate-fade-up" style={{ animationDelay: "0.15s" }}>
            {current.title.split(" ").slice(0, -2).join(" ")} <span className="text-[#FF5722]">{current.title.split(" ").slice(-2).join(" ")}</span>
          </h1>

          <p className="text-white/80 text-lg md:text-xl max-w-2xl mb-10 animate-fade-up" style={{ animationDelay: "0.3s" }}>
            {current.subtitle}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 animate-fade-up" style={{ animationDelay: "0.45s" }}>
            <Button
              onClick={onOpenForm}
              className="btn-shimmer group bg-[#FF5722] hover:bg-[#e64a17] text-white rounded-full px-8 py-7 text-[15px] font-semibold shadow-2xl shadow-[#FF5722]/30"
            >
              {current.cta}
              <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={18} />
            </Button>
            <a
              href="#products"
              className="inline-flex items-center justify-center gap-2 px-8 py-5 rounded-full border border-white/30 text-white hover:bg-white hover:text-[#1a1a1a] transition-all backdrop-blur-sm text-[15px] font-medium"
            >
              Переглянути продукцію
            </a>
          </div>
        </div>

        {/* Bottom row: stats + dots */}
        <div className="absolute left-6 right-6 bottom-10 flex items-end justify-between gap-8">
          <div className="hidden md:grid grid-cols-3 gap-10 text-white">
            <div>
              <div className="font-display text-3xl font-bold">15<span className="text-[#FF5722]">+</span></div>
              <div className="text-xs uppercase tracking-wider text-white/60 mt-1">років гарантії</div>
            </div>
            <div>
              <div className="font-display text-3xl font-bold">5000<span className="text-[#FF5722]">+</span></div>
              <div className="text-xs uppercase tracking-wider text-white/60 mt-1">клієнтів</div>
            </div>
            <div>
              <div className="font-display text-3xl font-bold">100<span className="text-[#FF5722]">%</span></div>
              <div className="text-xs uppercase tracking-wider text-white/60 mt-1">якість</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button onClick={() => setActive((p) => (p - 1 + HERO_SLIDES.length) % HERO_SLIDES.length)} className="p-3 rounded-full bg-white/10 hover:bg-[#FF5722] backdrop-blur-md border border-white/20 text-white transition-colors">
              <ChevronLeft size={18} />
            </button>
            <div className="flex gap-2">
              {HERO_SLIDES.map((_, i) => (
                <button key={i} onClick={() => setActive(i)} className={`h-1.5 rounded-full transition-all ${i === active ? "w-10 bg-[#FF5722]" : "w-4 bg-white/40"}`} />
              ))}
            </div>
            <button onClick={() => setActive((p) => (p + 1) % HERO_SLIDES.length)} className="p-3 rounded-full bg-white/10 hover:bg-[#FF5722] backdrop-blur-md border border-white/20 text-white transition-colors">
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute left-1/2 -translate-x-1/2 bottom-32 text-white/60 hidden lg:flex flex-col items-center gap-2 animate-float">
          <Mouse size={20} />
        </div>
      </div>
    </section>
  );
}
