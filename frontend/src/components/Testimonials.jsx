import { useState, useEffect } from "react";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { TESTIMONIALS } from "../data/mock";

export default function Testimonials() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setActive((p) => (p + 1) % TESTIMONIALS.length), 7000);
    return () => clearInterval(t);
  }, []);

  return (
    <section className="section-pad bg-[#f5f1ec] relative overflow-hidden">
      <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] rounded-full bg-[#FF5722]/8 blur-3xl pointer-events-none" />
      <div className="max-w-[1600px] mx-auto px-6 relative">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div className="max-w-2xl">
            <span className="inline-block px-3 py-1 rounded-full bg-[#FF5722]/10 text-[#FF5722] text-xs font-semibold uppercase tracking-wider mb-4">Відгуки клієнтів</span>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.05]">
              Нам довіряють <span className="text-[#FF5722]">тисячі</span>
            </h2>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={() => setActive((p) => (p - 1 + TESTIMONIALS.length) % TESTIMONIALS.length)} className="p-3 rounded-full border border-[#1a1a1a] hover:bg-[#1a1a1a] hover:text-white transition-colors">
              <ChevronLeft size={18} />
            </button>
            <button onClick={() => setActive((p) => (p + 1) % TESTIMONIALS.length)} className="p-3 rounded-full border border-[#1a1a1a] hover:bg-[#1a1a1a] hover:text-white transition-colors">
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {[0, 1, 2].map((offset) => {
            const idx = (active + offset) % TESTIMONIALS.length;
            const t = TESTIMONIALS[idx];
            return (
              <div key={`${idx}-${offset}`} className={`p-8 md:p-10 rounded-3xl transition-all duration-500 ${offset === 0 ? "bg-[#1a1a1a] text-white" : "bg-white"}`}>
                <Quote size={36} className={offset === 0 ? "text-[#FF5722] mb-4" : "text-[#FF5722]/40 mb-4"} />
                <div className="flex gap-1 mb-5">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} size={16} fill="#FF5722" stroke="#FF5722" />
                  ))}
                </div>
                <p className={`text-base leading-relaxed mb-7 ${offset === 0 ? "text-white/90" : "text-[#1a1a1a]"}`}>{t.text}</p>
                <div className="flex items-center gap-3">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center font-display font-bold text-lg ${offset === 0 ? "bg-[#FF5722] text-white" : "bg-[#FF5722]/10 text-[#FF5722]"}`}>
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <div className={`font-semibold ${offset === 0 ? "text-white" : "text-[#1a1a1a]"}`}>{t.name}</div>
                    <div className={`text-xs ${offset === 0 ? "text-white/60" : "text-[#999]"}`}>{t.city}</div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="flex justify-center gap-2 mt-10">
          {TESTIMONIALS.map((_, i) => (
            <button key={i} onClick={() => setActive(i)} className={`h-1.5 rounded-full transition-all ${i === active ? "w-10 bg-[#FF5722]" : "w-4 bg-[#1a1a1a]/20"}`} />
          ))}
        </div>
      </div>
    </section>
  );
}
