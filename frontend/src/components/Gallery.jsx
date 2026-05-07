import { GALLERY } from "../data/mock";
import SmartImage from "./SmartImage";
import { ArrowUpRight } from "lucide-react";

export default function Gallery() {
  return (
    <section className="section-pad bg-white">
      <div className="max-w-[1400px] mx-auto px-5 md:px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <span className="inline-block px-3 py-1 rounded-full bg-[#FF5722]/10 text-[#FF5722] text-xs font-semibold uppercase tracking-wider mb-4">Портфоліо</span>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.05]">
              Наші <span className="text-[#FF5722]">роботи</span>
            </h2>
          </div>
          <p className="text-[#5a5a5a] md:max-w-md">Реальні проєкти у Вінниці та області. Від квартир до котеджів — ми втілюємо найскладніші рішення.</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          {GALLERY.map((item, i) => {
            const layouts = [
              "row-span-2 aspect-[3/5]",
              "aspect-square",
              "aspect-square",
              "row-span-2 aspect-[3/5]",
              "aspect-square",
              "aspect-square",
              "col-span-2 aspect-[16/9]",
              "col-span-2 md:col-span-1 row-span-2 aspect-[3/5]",
            ];
            return (
              <div key={i} className={`relative overflow-hidden rounded-2xl group reveal ${layouts[i % layouts.length]}`}>
                <SmartImage
                  src={item.src}
                  alt={item.title}
                  width={800}
                  className="absolute inset-0 w-full h-full transition-transform duration-700 group-hover:scale-110"
                />
                {/* Always-visible bottom gradient + label */}
                <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/85 via-black/40 to-transparent z-[2]" />

                {/* Top-left chip */}
                <div className="absolute top-3 left-3 z-[3]">
                  <span className="inline-block px-2.5 py-1 rounded-full bg-white/90 backdrop-blur text-[#1a1a1a] text-[10px] font-semibold uppercase tracking-wider">
                    {item.category}
                  </span>
                </div>

                {/* Top-right arrow */}
                <div className="absolute top-3 right-3 z-[3] w-9 h-9 rounded-full bg-white/15 backdrop-blur border border-white/30 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity">
                  <ArrowUpRight size={16} />
                </div>

                {/* Always-visible bottom label */}
                <div className="absolute bottom-3 left-3 right-3 z-[3] text-white">
                  <div className="text-[10px] uppercase tracking-[0.18em] text-[#FF5722] font-semibold mb-1">
                    Проєкт #{(i + 1).toString().padStart(2, "0")}
                  </div>
                  <div className="font-display font-bold text-sm md:text-base leading-tight">
                    {item.title}
                  </div>
                  <div className="text-white/70 text-[11px] mt-1">{item.tag}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
