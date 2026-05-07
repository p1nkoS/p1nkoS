import { Link } from "react-router-dom";
import { ArrowRight, Bug, Layers, Layers3, Sun, Square, Wrench, ArrowLeftRight } from "lucide-react";
import { getProductsByCategory } from "../data/products";
import SmartImage from "./SmartImage";

const ICON_MAP = {
  "antimoskitni": Bug,
  "hpl-paneli": Layers,
  "pidvikonnya": Square,
  "rolety": Sun,
  "vidlyvy": Layers3,
  "furnitura": Wrench,
  "sklopackety": Layers,
  "laminacia": Layers,
  "dovidnyky": Wrench,
  "zhalyzi": Sun,
  "alu-rozsuvni": ArrowLeftRight,
  "metalo-rozsuvni": ArrowLeftRight,
};

export default function DoorsAndExtras() {
  const doors = getProductsByCategory("doors");
  const sliding = getProductsByCategory("sliding");
  const additional = getProductsByCategory("additional");

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
                className="group bg-[#f5f1ec] hover:bg-white rounded-3xl overflow-hidden card-hover reveal flex flex-col border border-transparent hover:border-[#e6dfd5]"
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

      {/* Sliding Systems — featured cards with image */}
      <section id="sliding" className="section-pad bg-[#f5f1ec]">
        <div className="max-w-[1400px] mx-auto px-5 md:px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div className="max-w-3xl">
              <span className="inline-block px-3 py-1 rounded-full bg-[#FF5722]/10 text-[#FF5722] text-xs font-semibold uppercase tracking-wider mb-4">Розсувні системи</span>
              <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.05]">
                Панорамні <span className="text-[#FF5722]">розсувні</span> рішення
              </h2>
            </div>
            <Link to="/catalog/sliding" className="group inline-flex items-center gap-2 px-6 py-4 rounded-full border-2 border-[#1a1a1a] text-[#1a1a1a] hover:bg-[#1a1a1a] hover:text-white transition-all font-medium text-sm whitespace-nowrap self-start">
              Дізнатись більше <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {sliding.map((p) => (
              <Link
                key={p.slug}
                to={`/product/${p.slug}`}
                className="group relative overflow-hidden rounded-3xl card-hover reveal bg-white"
              >
                <div className="grid sm:grid-cols-2 min-h-[320px]">
                  <div className="relative h-56 sm:h-full overflow-hidden">
                    <SmartImage src={p.image} alt={p.name} width={700} className="absolute inset-0 w-full h-full transition-transform duration-700 group-hover:scale-110" />
                    {p.badge && (
                      <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-[#FF5722] text-white text-[10px] font-bold uppercase tracking-wider z-[3]">
                        {p.badge}
                      </span>
                    )}
                  </div>
                  <div className="p-6 md:p-7 flex flex-col">
                    <div className="text-[10px] uppercase tracking-[0.2em] text-[#FF5722] font-semibold mb-2">
                      {p.brand} · {p.country}
                    </div>
                    <h3 className="font-display text-xl md:text-2xl font-bold mb-3 leading-tight group-hover:text-[#FF5722] transition-colors">
                      {p.name}
                    </h3>
                    <p className="text-[#5a5a5a] text-sm mb-5 line-clamp-3 leading-relaxed">
                      {p.description}
                    </p>
                    <ul className="space-y-1.5 mb-5">
                      {p.features.slice(0, 3).map((f) => (
                        <li key={f} className="flex items-center gap-2 text-xs text-[#1a1a1a]">
                          <span className="w-1 h-1 rounded-full bg-[#FF5722]" />
                          {f}
                        </li>
                      ))}
                    </ul>
                    <div className="mt-auto flex items-end justify-between pt-4 border-t border-[#f0e9e0]">
                      <div>
                        <div className="text-[10px] uppercase tracking-wider text-[#888]">від</div>
                        <div className="font-display font-bold text-xl text-[#1a1a1a]">
                          {p.price.toLocaleString()} ₴
                        </div>
                      </div>
                      <span className="inline-flex items-center gap-1.5 text-[#FF5722] text-sm font-semibold group-hover:gap-2 transition-all">
                        Детальніше <ArrowRight size={14} />
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Additional accessories — info cards (no random photos) */}
      <section id="additional" className="section-pad bg-white">
        <div className="max-w-[1400px] mx-auto px-5 md:px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div className="max-w-3xl">
              <span className="inline-block px-3 py-1 rounded-full bg-[#FF5722]/10 text-[#FF5722] text-xs font-semibold uppercase tracking-wider mb-4">Додаткові продукти</span>
              <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.05]">
                Все для <span className="text-[#FF5722]">завершення</span> проєкту
              </h2>
            </div>
            <Link to="/catalog/additional" className="group inline-flex items-center gap-2 px-6 py-4 rounded-full border-2 border-[#1a1a1a] text-[#1a1a1a] hover:bg-[#1a1a1a] hover:text-white transition-all font-medium text-sm whitespace-nowrap self-start">
              Усі аксесуари <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5">
            {additional.map((p) => {
              const Icon = ICON_MAP[p.slug] || Layers;
              return (
                <Link
                  key={p.slug}
                  to={`/product/${p.slug}`}
                  className="group relative bg-[#f5f1ec] hover:bg-white rounded-3xl p-6 md:p-7 card-hover reveal flex flex-col border border-transparent hover:border-[#e6dfd5]"
                >
                  <div className="flex items-start justify-between mb-5">
                    <div className="w-12 h-12 rounded-2xl bg-white group-hover:bg-[#FF5722] border border-[#e6dfd5] group-hover:border-[#FF5722] flex items-center justify-center transition-colors">
                      <Icon size={20} className="text-[#FF5722] group-hover:text-white transition-colors" />
                    </div>
                    {p.badge && (
                      <span className="px-2 py-0.5 rounded-md bg-white border border-[#e6dfd5] text-[#5a5a5a] text-[10px] font-medium uppercase tracking-wider">
                        {p.badge}
                      </span>
                    )}
                  </div>
                  <h3 className="font-display text-base md:text-lg font-bold mb-2 leading-tight group-hover:text-[#FF5722] transition-colors">
                    {p.name}
                  </h3>
                  <p className="text-[#5a5a5a] text-xs leading-relaxed mb-4 line-clamp-2">
                    {p.description}
                  </p>
                  <div className="text-[10px] text-[#888] mb-1 uppercase tracking-wider">{p.brand}</div>
                  <div className="mt-auto pt-3 border-t border-[#e6dfd5] flex items-center justify-between">
                    <div className="font-display font-bold text-[#1a1a1a]">
                      від {p.price.toLocaleString()} ₴
                    </div>
                    <ArrowRight size={14} className="text-[#FF5722] group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
