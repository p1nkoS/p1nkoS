import { Link } from "react-router-dom";
import { ArrowRight, ShieldCheck, Volume2 } from "lucide-react";
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
        <div className="max-w-[1400px] mx-auto px-5 md:px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div className="max-w-3xl">
              <span className="inline-block px-3 py-1 rounded-full bg-[#FF5722]/10 text-[#FF5722] text-xs font-semibold uppercase tracking-wider mb-4">Двері</span>
              <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.05] mb-4">
                Стильні та надійні <span className="text-[#FF5722]">двері</span>
              </h2>
              <p className="text-[#5a5a5a]">Підбираємо комплектацію дверей під будь-які потреби — офіс, балкон, вхідні, міжкімнатні та більше.</p>
            </div>
            <Link to="/catalog/doors" className="group inline-flex items-center gap-2 px-6 py-4 rounded-full border-2 border-[#1a1a1a] text-[#1a1a1a] hover:bg-[#1a1a1a] hover:text-white transition-all font-medium text-sm whitespace-nowrap self-start">
              Усі двері <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
            {doors.slice(0, 8).map((d) => (
              <Link
                key={d.slug}
                to={`/product/${d.slug}`}
                className="group bg-[#f5f1ec] hover:bg-white rounded-3xl overflow-hidden card-hover reveal flex flex-col"
              >
                <div className="relative h-52 overflow-hidden">
                  <SmartImage src={d.image} alt={d.name} width={500} className="absolute inset-0 w-full h-full transition-transform duration-700 group-hover:scale-110" />
                  {d.badge && (
                    <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-white text-[#FF5722] text-[10px] font-bold uppercase tracking-wider z-[3]">
                      {d.badge}
                    </span>
                  )}
                </div>
                <div className="p-5 flex-1 flex flex-col">
                  <h3 className="font-display text-lg font-bold mb-2 group-hover:text-[#FF5722] transition-colors leading-snug">
                    {d.name}
                  </h3>
                  <p className="text-[#5a5a5a] text-xs leading-relaxed mb-4 line-clamp-2">
                    {d.description}
                  </p>
                  <div className="mt-auto flex items-end justify-between pt-3 border-t border-[#e6dfd5]">
                    <div>
                      <div className="text-[10px] text-[#888] uppercase">від</div>
                      <div className="font-display font-bold text-[#1a1a1a]">{d.price.toLocaleString()} ₴<span className="text-[10px] text-[#888] font-normal">/м²</span></div>
                    </div>
                    <span className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-white group-hover:bg-[#FF5722] group-hover:text-white border border-[#e6dfd5] transition-colors">
                      <ArrowRight size={14} />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Sliding & Additional */}
      <section id="sliding" className="section-pad bg-[#f5f1ec]">
        <div className="max-w-[1400px] mx-auto px-5 md:px-6">
          <div id="additional" className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div className="max-w-3xl">
              <span className="inline-block px-3 py-1 rounded-full bg-[#FF5722]/10 text-[#FF5722] text-xs font-semibold uppercase tracking-wider mb-4">Розсувні системи та аксесуари</span>
              <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.05]">
                Все для <span className="text-[#FF5722]">завершення</span> проєкту
              </h2>
            </div>
            <Link to="/catalog/additional" className="group inline-flex items-center gap-2 px-6 py-4 rounded-full border-2 border-[#1a1a1a] text-[#1a1a1a] hover:bg-[#1a1a1a] hover:text-white transition-all font-medium text-sm whitespace-nowrap self-start">
              Усі аксесуари <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {additional.map((p, i) => (
              <Link
                key={p.slug}
                to={`/product/${p.slug}`}
                className={`group relative overflow-hidden rounded-3xl card-hover reveal bg-white ${
                  i === 0 ? "md:col-span-2 md:row-span-2 min-h-[400px] md:min-h-[480px]" : "min-h-[260px]"
                }`}
              >
                <SmartImage src={p.image} alt={p.name} width={i === 0 ? 1200 : 600} className="absolute inset-0 w-full h-full transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent z-[2]" />
                <div className="relative z-[3] h-full p-6 md:p-7 flex flex-col justify-end min-h-[260px] text-white">
                  {p.badge && (
                    <span className="self-start mb-3 px-2.5 py-1 rounded-full bg-[#FF5722] text-white text-[10px] font-bold uppercase tracking-wider">
                      {p.badge}
                    </span>
                  )}
                  <h3 className="font-display text-xl md:text-2xl font-bold mb-2 leading-tight">{p.name}</h3>
                  {i === 0 ? (
                    <p className="text-white/85 text-sm mb-4 max-w-md leading-relaxed line-clamp-3">{p.description}</p>
                  ) : (
                    <p className="text-white/75 text-xs mb-3 line-clamp-2">{p.description}</p>
                  )}
                  <div className="flex items-center justify-between pt-3 border-t border-white/15">
                    <span className="font-display font-bold text-base">від {p.price.toLocaleString()} ₴</span>
                    <span className="inline-flex items-center gap-1.5 text-white/90 group-hover:text-[#FF5722] text-xs font-semibold group-hover:gap-2 transition-all">
                      Детальніше <ArrowRight size={14} />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
