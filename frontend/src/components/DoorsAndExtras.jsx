import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { getProductsByCategory } from "../data/products";
import SmartImage from "./SmartImage";

export default function DoorsAndExtras() {
  const doors = getProductsByCategory("doors");
  const additional = [
    ...getProductsByCategory("sliding"),
    ...getProductsByCategory("additional").slice(0, 4),
  ];

  return (
    <>
      {/* Doors */}
      <section id="doors" className="section-pad bg-white">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div className="max-w-3xl">
              <span className="inline-block px-3 py-1 rounded-full bg-[#FF5722]/10 text-[#FF5722] text-xs font-semibold uppercase tracking-wider mb-4">Двері</span>
              <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.05] mb-4">
                Стильні та надійні <span className="text-[#FF5722]">двері</span>
              </h2>
              <p className="text-[#5a5a5a]">Підбираємо комплектацію дверей під будь-які потреби — офіс, балкон, вхідні, міжкімнатні та більше.</p>
            </div>
            <Link to="/catalog/doors" className="group inline-flex items-center gap-2 px-6 py-4 rounded-full border-2 border-[#1a1a1a] text-[#1a1a1a] hover:bg-[#1a1a1a] hover:text-white transition-all font-medium text-sm whitespace-nowrap">
              Усі двері <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5">
            {doors.slice(0, 8).map((d) => (
              <Link key={d.slug} to={`/product/${d.slug}`} className="group relative overflow-hidden rounded-2xl aspect-[3/4] card-hover reveal">
                <SmartImage src={d.image} alt={d.name} width={500} className="absolute inset-0 w-full h-full transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent z-[2]" />
                <div className="relative z-[3] h-full p-5 flex flex-col justify-end">
                  <h3 className="text-white font-semibold text-base md:text-lg leading-tight">{d.name}</h3>
                  <span className="mt-2 inline-flex items-center gap-1.5 text-white/70 group-hover:text-[#FF5722] text-xs transition-colors">
                    від {d.price.toLocaleString()} ₴ <ArrowRight size={12} />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Sliding & Additional */}
      <section id="sliding" className="section-pad bg-[#f5f1ec]">
        <div className="max-w-[1400px] mx-auto px-6">
          <div id="additional" className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div className="max-w-3xl">
              <span className="inline-block px-3 py-1 rounded-full bg-[#FF5722]/10 text-[#FF5722] text-xs font-semibold uppercase tracking-wider mb-4">Розсувні системи та аксесуари</span>
              <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.05]">
                Все для <span className="text-[#FF5722]">завершення</span> проєкту
              </h2>
            </div>
            <Link to="/catalog/additional" className="group inline-flex items-center gap-2 px-6 py-4 rounded-full border-2 border-[#1a1a1a] text-[#1a1a1a] hover:bg-[#1a1a1a] hover:text-white transition-all font-medium text-sm whitespace-nowrap">
              Усі аксесуари <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {additional.map((p, i) => (
              <Link key={p.slug} to={`/product/${p.slug}`} className={`group relative overflow-hidden rounded-3xl card-hover reveal ${i === 0 ? "md:col-span-2 md:row-span-2 min-h-[400px] md:min-h-[480px]" : "min-h-[260px]"}`}>
                <SmartImage src={p.image} alt={p.name} width={i === 0 ? 1200 : 600} className="absolute inset-0 w-full h-full transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent z-[2]" />
                <div className="relative z-[3] h-full p-7 flex flex-col justify-end min-h-[260px]">
                  <h3 className="text-white font-display text-xl md:text-2xl font-bold mb-3 leading-tight">{p.name}</h3>
                  <span className="inline-flex items-center gap-2 text-white/80 group-hover:text-[#FF5722] text-sm font-medium transition-colors">
                    від {p.price.toLocaleString()} ₴ <ArrowRight size={14} />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
