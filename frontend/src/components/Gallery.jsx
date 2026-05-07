import { GALLERY } from "../data/mock";
import SmartImage from "./SmartImage";

export default function Gallery() {
  return (
    <section className="section-pad bg-white">
      <div className="max-w-[1400px] mx-auto px-6">
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
          {GALLERY.map((src, i) => {
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
                <SmartImage src={src} alt={`gallery ${i}`} width={800} className="absolute inset-0 w-full h-full transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity z-[2]" />
                <div className="absolute bottom-4 left-4 right-4 text-white opacity-0 group-hover:opacity-100 transition-all translate-y-2 group-hover:translate-y-0 z-[3]">
                  <span className="text-xs uppercase tracking-wider text-[#FF5722]">Проєкт #{(i + 1).toString().padStart(2, "0")}</span>
                  <div className="font-semibold mt-1">Монтаж Viknar'off</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
