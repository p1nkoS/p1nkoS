import { ArrowUpRight } from "lucide-react";
import { PRODUCT_CATEGORIES } from "../data/mock";

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
          {PRODUCT_CATEGORIES.map((cat, i) => (
            <a
              key={cat.id}
              href={`#${cat.id}`}
              className={`group relative overflow-hidden rounded-3xl card-hover img-zoom ${i === 0 ? "md:row-span-2 md:min-h-[640px]" : "min-h-[300px]"}`}
            >
              <img src={cat.image} alt={cat.title} className="absolute inset-0 w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent" />
              <div className="relative z-10 p-8 md:p-10 h-full flex flex-col justify-between min-h-[300px]">
                <div className="flex justify-between items-start">
                  <span className="text-white/70 text-sm font-medium">0{i + 1}</span>
                  <span className="px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-xs">{cat.items} моделей</span>
                </div>
                <div>
                  <h3 className="font-display text-white text-3xl md:text-4xl lg:text-5xl font-bold mb-3 leading-tight">{cat.title}</h3>
                  <p className="text-white/80 text-sm md:text-base mb-6 max-w-md">{cat.description}</p>
                  <span className="inline-flex items-center gap-2 text-white text-sm font-medium group-hover:gap-3 transition-all">
                    Детальніше <ArrowUpRight size={18} className="group-hover:rotate-12 transition-transform" />
                  </span>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
