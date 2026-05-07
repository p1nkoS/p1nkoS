import { ArrowRight } from "lucide-react";
import { DOOR_TYPES, ADDITIONAL_PRODUCTS } from "../data/mock";

export default function DoorsAndExtras() {
  return (
    <>
      {/* Doors */}
      <section id="doors" className="section-pad bg-white">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="max-w-3xl mb-12">
            <span className="inline-block px-3 py-1 rounded-full bg-[#FF5722]/10 text-[#FF5722] text-xs font-semibold uppercase tracking-wider mb-4">Двері</span>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.05] mb-4">
              Стильні та надійні <span className="text-[#FF5722]">двері</span>
            </h2>
            <p className="text-[#5a5a5a]">Підберемо комплектацію дверей під будь-які потреби — офіс, балкон, вхідні, міжкімнатні та більше.</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5">
            {DOOR_TYPES.map((d) => (
              <a key={d.name} href="#contact" className="group relative overflow-hidden rounded-2xl aspect-[3/4] img-zoom card-hover">
                <img src={d.image} alt={d.name} className="absolute inset-0 w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
                <div className="relative z-10 h-full p-5 flex flex-col justify-end">
                  <h3 className="text-white font-semibold text-base md:text-lg leading-tight">{d.name}</h3>
                  <span className="mt-2 inline-flex items-center gap-1.5 text-white/70 group-hover:text-[#FF5722] text-xs transition-colors">Детальніше <ArrowRight size={12} /></span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Sliding & Additional */}
      <section id="sliding" className="section-pad bg-[#f5f1ec]">
        <div className="max-w-[1400px] mx-auto px-6">
          <div id="additional" className="max-w-3xl mb-12">
            <span className="inline-block px-3 py-1 rounded-full bg-[#FF5722]/10 text-[#FF5722] text-xs font-semibold uppercase tracking-wider mb-4">Додаткова продукція</span>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.05] mb-4">
              Розсувні системи та <span className="text-[#FF5722]">аксесуари</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {ADDITIONAL_PRODUCTS.map((p, i) => (
              <a key={p.name} href="#contact" className={`group relative overflow-hidden rounded-3xl img-zoom card-hover ${i === 0 ? "md:col-span-2 md:row-span-2 min-h-[400px] md:min-h-[480px]" : "min-h-[260px]"}`}>
                <img src={p.image} alt={p.name} className="absolute inset-0 w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                <div className="relative z-10 h-full p-7 flex flex-col justify-end min-h-[260px]">
                  <h3 className="text-white font-display text-xl md:text-2xl font-bold mb-3 leading-tight">{p.name}</h3>
                  <span className="inline-flex items-center gap-2 text-white/80 group-hover:text-[#FF5722] text-sm font-medium transition-colors">Детальніше <ArrowRight size={14} /></span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
