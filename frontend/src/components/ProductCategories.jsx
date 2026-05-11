import { Link } from "react-router-dom";
import { ArrowUpRight, CheckCircle2 } from "lucide-react";
import { CATEGORIES, getProductsByCategory, PRODUCTS } from "../data/products";
import SmartImage from "./SmartImage";

const CONFIG = [
  {
    id: "windows",
    accent: "Енергозбереження",
    bullets: [
      "Профілі Gealan, Decco",
      "5 / 6 / 7 камер",
      "Гарантія до 15 років",
    ],
  },
  {
    id: "doors",
    accent: "Безпека · RC2",
    bullets: [
      "Багатоточкове замикання",
      "Утеплений профіль",
      "Вхідні · балконні · офісні",
    ],
  },
  {
    id: "sliding",
    accent: "Економія простору",
    bullets: [
      "HS-Portal · паралельно-зсувні",
      "Великі панорамні прорізи",
      "Gealan, Decco",
    ],
  },
  {
    id: "aluminum",
    accent: "Aluprof · Польща",
    bullets: [
      "Алюмінієві вікна та двері",
      "Розсувні системи з терморозривом",
      "Офісні та комерційні рішення",
    ],
  },
  {
    id: "additional",
    accent: "Комплектація",
    bullets: [
      "Москітні сітки, ролети",
      "Підвіконня, відливи",
      "Ламінація 50+ кольорів",
    ],
  },
];

export default function ProductCategories() {
  return (
    <section id="products" className="section-pad relative">
      <div className="max-w-[1600px] mx-auto px-5 md:px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 md:mb-14">
          <div className="max-w-2xl">
            <span className="inline-block px-3 py-1 rounded-full bg-[#FF5722]/10 text-[#FF5722] text-xs font-semibold uppercase tracking-wider mb-4">
              Продукція
            </span>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.05]">
              Повний асортимент <span className="text-[#FF5722]">конструкцій</span> від
              виробника
            </h2>
          </div>
          <p className="text-[#5a5a5a] text-base md:max-w-md">
            Виробництво на сучасному німецькому обладнанні. Європейські профілі, фурнітура та склопакети.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
          {CONFIG.map((cfg, i) => {
            const cat = CATEGORIES[cfg.id];
            const items = getProductsByCategory(cfg.id);
            const count = items.length;
            const minPrice = items.length ? Math.min(...items.map((x) => x.price)) : 0;
            const brands = [...new Set(items.map((x) => x.brand))].slice(0, 4);

            return (
              <Link
                key={cfg.id}
                to={`/catalog/${cfg.id}`}
                data-cursor="hover"
                data-testid={`category-card-${cfg.id}`}
                className="group relative bg-white rounded-3xl overflow-hidden card-hover flex flex-col reveal"
              >
                {/* Top: large photo with overlay number + accent */}
                <div className="relative h-52 sm:h-56 md:h-60 overflow-hidden bg-[#f5f1ec]">
                  <SmartImage
                    src={cat.image}
                    alt={cat.title}
                    width={800}
                    fit="cover"
                    className="w-full h-full transition-transform duration-700 group-hover:scale-110"
                  />
                  {/* Soft gradient overlay for text legibility */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/15 to-transparent pointer-events-none" />
                  {/* Number badge */}
                  <span className="absolute top-4 right-4 font-display font-bold text-3xl md:text-4xl text-white/90 mix-blend-screen drop-shadow-md">
                    0{i + 1}
                  </span>
                  {/* Title + subtitle on photo */}
                  <div className="absolute bottom-0 left-0 right-0 px-5 pb-4 text-white">
                    <div className="text-[10px] uppercase tracking-[0.2em] text-[#FFB59C] font-semibold mb-1">
                      {cfg.accent}
                    </div>
                    <h3 className="font-display font-bold text-2xl md:text-[28px] leading-tight drop-shadow-md">
                      {cat.title}
                    </h3>
                    <p className="text-white/85 text-xs md:text-sm mt-1 drop-shadow">{cat.subtitle}</p>
                  </div>
                </div>

                {/* Body */}
                <div className="p-5 md:p-6 flex-1 flex flex-col">
                  <ul className="space-y-2.5 mb-5">
                    {cfg.bullets.map((b) => (
                      <li key={b} className="flex items-start gap-2 text-sm text-[#1a1a1a]">
                        <CheckCircle2 size={16} className="text-[#FF5722] shrink-0 mt-0.5" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Brands chips */}
                  {brands.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mb-5">
                      {brands.map((b) => (
                        <span
                          key={b}
                          className="px-2 py-0.5 rounded-md bg-[#f5f1ec] text-[#5a5a5a] text-[10px] font-medium uppercase tracking-wider"
                        >
                          {b}
                        </span>
                      ))}
                    </div>
                  )}

                  <div className="mt-auto pt-4 border-t border-[#f0e9e0] flex items-center justify-between">
                    <div>
                      <div className="text-[10px] uppercase tracking-wider text-[#888]">
                        {count} моделей · від
                      </div>
                      <div className="font-display font-bold text-lg text-[#1a1a1a]">
                        {minPrice.toLocaleString()} ₴
                        <span className="text-xs text-[#888] font-normal">
                          {cfg.id === "windows" || cfg.id === "doors" ? "/м²" : ""}
                        </span>
                      </div>
                    </div>
                    <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-[#f5f1ec] group-hover:bg-[#FF5722] group-hover:text-white transition-colors">
                      <ArrowUpRight size={16} />
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Stats strip below cards */}
        <div className="mt-10 md:mt-14 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 px-2 md:px-0">
          {[
            { num: PRODUCTS.length, label: "моделей у каталозі" },
            { num: 8, label: "європейських брендів" },
            { num: "1-3", label: "дні монтаж" },
            { num: "15", label: "років гарантії" },
          ].map((s) => (
            <div
              key={s.label}
              className="text-center md:text-left p-5 rounded-2xl bg-[#f5f1ec] border border-[#e6dfd5]"
            >
              <div className="font-display text-3xl md:text-4xl font-bold text-[#1a1a1a]">
                {s.num}
                <span className="text-[#FF5722]">+</span>
              </div>
              <div className="text-xs text-[#5a5a5a] mt-1.5 uppercase tracking-wider">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
