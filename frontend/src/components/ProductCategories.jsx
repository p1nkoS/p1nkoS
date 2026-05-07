import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { CATEGORIES, getProductsByCategory } from "../data/products";
import SmartImage from "./SmartImage";

const CARDS = ["windows", "doors", "sliding", "additional"];

export default function ProductCategories() {
  return (
    <section id="products" className="section-pad relative">
      <div className="max-w-[1400px] mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div className="max-w-2xl">
            <span className="inline-block px-3 py-1 rounded-full bg-[#FF5722]/10 text-[#FF5722] text-xs font-semibold uppercase tracking-wider mb-4">Продукція</span>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.05]">
              Повний асортимент <span className="text-[#FF5722]">конструкцій</span> від виробника
            </h2>
          </div>
          <p className="text-[#5a5a5a] text-base md:max-w-md">
            Вікна, двері, розсувні системи та аксесуари — все, що потрібно для ідеального дому. Виробництво на сучасному німецькому обладнанні.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {CARDS.map((id, i) => {
            const cat = CATEGORIES[id];
            const count = getProductsByCategory(id).length;
            return (
              <Link
                key={id}
                to={`/catalog/${id}`}
                className={`group relative overflow-hidden rounded-3xl card-hover ${i === 0 ? "md:row-span-2 md:min-h-[640px]" : "min-h-[300px]"}`}
              >
                <SmartImage
                  src={cat.image}
                  alt={cat.title}
                  width={i === 0 ? 1200 : 800}
                  className="absolute inset-0 w-full h-full transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent z-[2]" />
                <div className="relative z-[3] p-8 md:p-10 h-full flex flex-col justify-between min-h-[300px]">
                  <div className="flex justify-between items-start">
                    <span className="text-white/70 text-sm font-medium">0{i + 1}</span>
                    <span className="px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-xs">
                      {count} моделей
                    </span>
                  </div>
                  <div>
                    <h3 className="font-display text-white text-3xl md:text-4xl lg:text-5xl font-bold mb-3 leading-tight">{cat.title}</h3>
                    <p className="text-white/80 text-sm md:text-base mb-6 max-w-md">{cat.subtitle}</p>
                    <span className="inline-flex items-center gap-2 text-white text-sm font-medium group-hover:gap-3 transition-all">
                      Перейти до каталогу <ArrowUpRight size={18} className="group-hover:rotate-12 transition-transform" />
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
