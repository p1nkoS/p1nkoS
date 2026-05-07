import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "../components/ui/button";
import { ArrowRight, ShieldCheck, Award, Star, Phone, Sparkles } from "lucide-react";
import SmartImage from "./SmartImage";

const HERO_IMAGES = [
  {
    src: "https://viknaroff.ua/wp-content/uploads/2024/08/1.-Gealan-9000-1.webp",
    label: "Gealan S 9000",
    sub: "Преміум профіль",
    detail: "82,5 мм · 6 камер · до 42 дБ",
  },
  {
    src: "https://viknaroff.ua/wp-content/uploads/2024/08/Decco-82-3-scaled-e1771938971151.webp",
    label: "Decco 82",
    sub: "Польська якість",
    detail: "81 мм · 6 камер · до 42 дБ",
  },
  {
    src: "https://viknaroff.ua/wp-content/uploads/2024/10/Alyuminiyevi-vikna.webp",
    label: "Aluprof MB-86",
    sub: "Алюмінієві системи",
    detail: "77 мм · терморозрив · до 43 дБ",
  },
];

export default function Hero({ onOpenForm }) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setActive((p) => (p + 1) % HERO_IMAGES.length), 6000);
    return () => clearInterval(t);
  }, []);

  return (
    <section
      id="home"
      className="relative pt-28 sm:pt-32 lg:pt-36 pb-12 lg:pb-20 min-h-[100vh] overflow-hidden bg-[#f5f1ec]"
    >
      {/* Background patterns */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-[#FF5722]/8 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-1/3 w-96 h-96 bg-[#FF5722]/5 rounded-full blur-3xl" />
        <svg
          className="absolute top-0 right-0 w-1/2 h-full opacity-[0.04] hidden md:block"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          <defs>
            <pattern id="grid" width="5" height="5" patternUnits="userSpaceOnUse">
              <path d="M 5 0 L 0 0 0 5" fill="none" stroke="#1a1a1a" strokeWidth="0.2" />
            </pattern>
          </defs>
          <rect width="100" height="100" fill="url(#grid)" />
        </svg>
      </div>

      <div className="relative max-w-[1400px] mx-auto px-5 md:px-6 grid lg:grid-cols-12 gap-10 lg:gap-12 items-center">
        {/* LEFT — content */}
        <div className="lg:col-span-6 z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-[#FF5722]/20 text-[#FF5722] text-[11px] sm:text-[12px] font-semibold uppercase tracking-[0.15em] mb-6 sm:mb-7 shadow-sm">
            <Sparkles size={12} className="fill-[#FF5722]" />
            Салон магазин · Вінниця
          </div>

          <h1 className="font-display font-extrabold text-[#1a1a1a] text-[36px] sm:text-[52px] md:text-[64px] lg:text-[72px] xl:text-[80px] leading-[1.0] mb-5 sm:mb-6">
            Вікна, що{" "}
            <span className="relative inline-block text-[#FF5722]">
              вимикають
              <svg
                className="absolute -bottom-1.5 sm:-bottom-2 left-0 w-full h-2 sm:h-3"
                viewBox="0 0 200 12"
                fill="none"
                preserveAspectRatio="none"
              >
                <path
                  d="M2 9C40 4 80 2 120 4C160 6 180 8 198 6"
                  stroke="#FF5722"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
              </svg>
            </span>{" "}
            усе зайве
          </h1>

          <p className="text-[#5a5a5a] text-[15px] sm:text-base lg:text-lg max-w-xl mb-7 sm:mb-9 leading-relaxed">
            Металопластикові вікна, двері та розсувні системи від виробника Viknar'off. Європейські
            профілі Gealan, Decco, Aluprof. Гарантія до 15 років, монтаж за 1–3 дні.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 mb-8 sm:mb-10">
            <Button
              onClick={onOpenForm}
              className="btn-shimmer group bg-[#FF5722] hover:bg-[#e64a17] text-white rounded-full px-7 py-7 text-[14px] font-semibold shadow-xl shadow-[#FF5722]/25"
            >
              Безкоштовний замір
              <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={17} />
            </Button>
            <Link
              to="/catalog/windows"
              className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full bg-white hover:bg-[#1a1a1a] hover:text-white text-[#1a1a1a] border border-[#e6dfd5] transition-all text-[14px] font-medium"
            >
              Каталог вікон
            </Link>
          </div>

          {/* Trust row */}
          <div className="grid grid-cols-3 gap-3 sm:gap-4 max-w-md">
            <div className="flex items-start gap-2">
              <ShieldCheck className="text-[#FF5722] shrink-0 mt-0.5" size={18} />
              <div>
                <div className="font-display font-bold text-[#1a1a1a] text-sm sm:text-base leading-none">
                  15 років
                </div>
                <div className="text-[10px] sm:text-[11px] text-[#888] mt-1">гарантії</div>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <Award className="text-[#FF5722] shrink-0 mt-0.5" size={18} />
              <div>
                <div className="font-display font-bold text-[#1a1a1a] text-sm sm:text-base leading-none">
                  19+ років
                </div>
                <div className="text-[10px] sm:text-[11px] text-[#888] mt-1">на ринку</div>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <Star className="text-[#FF5722] shrink-0 mt-0.5 fill-[#FF5722]" size={18} />
              <div>
                <div className="font-display font-bold text-[#1a1a1a] text-sm sm:text-base leading-none">
                  5000+
                </div>
                <div className="text-[10px] sm:text-[11px] text-[#888] mt-1">клієнтів</div>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT — split image collage */}
        <div className="lg:col-span-6 relative">
          <div className="relative grid grid-cols-12 grid-rows-6 gap-3 h-[420px] sm:h-[520px] lg:h-[600px] xl:h-[640px]">
            {/* Main image */}
            <div className="col-span-12 sm:col-span-8 row-span-6 relative overflow-hidden rounded-[24px] sm:rounded-[28px] group">
              {HERO_IMAGES.map((img, i) => (
                <div
                  key={i}
                  className={`absolute inset-0 transition-opacity duration-1000 ${
                    i === active ? "opacity-100" : "opacity-0"
                  }`}
                >
                  <SmartImage
                    src={img.src}
                    alt={img.label}
                    eager={i === 0}
                    width={1400}
                    className="w-full h-full"
                  />
                </div>
              ))}
              <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />

              {/* Label badge */}
              <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between gap-3">
                <div className="text-white">
                  <div className="text-[10px] sm:text-[11px] uppercase tracking-[0.25em] opacity-80">
                    {HERO_IMAGES[active].sub}
                  </div>
                  <div className="font-display font-bold text-lg sm:text-2xl mt-1">
                    {HERO_IMAGES[active].label}
                  </div>
                  <div className="text-white/70 text-[11px] sm:text-xs mt-1">
                    {HERO_IMAGES[active].detail}
                  </div>
                </div>
                <div className="flex gap-1.5 shrink-0">
                  {HERO_IMAGES.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setActive(i)}
                      aria-label={`slide ${i + 1}`}
                      className={`h-1.5 rounded-full transition-all ${
                        i === active ? "w-8 bg-[#FF5722]" : "w-3 bg-white/50"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Top right card */}
            <div className="hidden sm:block col-span-4 row-span-3 relative overflow-hidden rounded-[24px] group">
              <SmartImage
                src="https://viknaroff.ua/wp-content/uploads/2024/10/vhidni-plastikovi-dveri.webp"
                alt="Двері Viknar'off"
                width={600}
                className="absolute inset-0 w-full h-full transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-[2]" />
              <span className="absolute top-3 left-3 z-[3] inline-block px-2.5 py-1 rounded-full bg-white/95 text-[#FF5722] text-[10px] font-bold uppercase tracking-wider">
                18 моделей
              </span>
              <Link to="/catalog/doors" className="absolute bottom-3 left-3 right-3 text-white z-[3]">
                <div className="text-[10px] uppercase tracking-[0.18em] text-[#FF5722] font-semibold">Категорія</div>
                <div className="font-display font-bold text-base mt-0.5">Двері</div>
                <div className="text-white/75 text-[10px] mt-0.5 leading-tight">Вхідні · балконні · офісні</div>
                <div className="mt-1.5 inline-flex items-center gap-1 text-white text-[11px] font-medium group-hover:gap-1.5 transition-all">
                  Перейти <ArrowRight size={12} />
                </div>
              </Link>
            </div>

            {/* Bottom right card */}
            <div className="hidden sm:block col-span-4 row-span-3 relative overflow-hidden rounded-[24px] group">
              <SmartImage
                src="https://viknaroff.ua/wp-content/uploads/2024/06/35bca50cf6e23ca7c41cabde2431ed37.webp"
                alt="Розсувні системи"
                width={600}
                className="absolute inset-0 w-full h-full transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-[2]" />
              <span className="absolute top-3 left-3 z-[3] inline-block px-2.5 py-1 rounded-full bg-white/95 text-[#FF5722] text-[10px] font-bold uppercase tracking-wider">
                Преміум
              </span>
              <Link to="/catalog/sliding" className="absolute bottom-3 left-3 right-3 text-white z-[3]">
                <div className="text-[10px] uppercase tracking-[0.18em] text-[#FF5722] font-semibold">Категорія</div>
                <div className="font-display font-bold text-base mt-0.5">Розсувні</div>
                <div className="text-white/75 text-[10px] mt-0.5 leading-tight">Aluprof · HS-Portal · тераса</div>
                <div className="mt-1.5 inline-flex items-center gap-1 text-white text-[11px] font-medium group-hover:gap-1.5 transition-all">
                  Перейти <ArrowRight size={12} />
                </div>
              </Link>
            </div>
          </div>

          {/* Floating CTA card */}
          <button
            onClick={onOpenForm}
            className="absolute -bottom-5 -left-3 hidden md:flex items-center gap-3 bg-white p-3 pr-5 rounded-full shadow-2xl border border-[#f0e9e0] hover:border-[#FF5722] transition-all group z-20"
          >
            <span className="w-10 h-10 rounded-full bg-[#FF5722] flex items-center justify-center text-white">
              <Phone size={16} />
            </span>
            <span className="text-left">
              <span className="block text-[10px] uppercase tracking-wider text-[#888] leading-none">
                Дзвоніть зараз
              </span>
              <span className="block text-[#1a1a1a] font-semibold text-sm group-hover:text-[#FF5722] transition-colors">
                (068) 723-97-22
              </span>
            </span>
          </button>

          {/* Static rating badge (no float animation) */}
          <div className="absolute -top-3 right-2 hidden md:flex items-center gap-2 bg-[#1a1a1a] text-white px-4 py-2.5 rounded-2xl shadow-2xl z-20">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={13} fill="#FF5722" stroke="#FF5722" />
              ))}
            </div>
            <span className="text-xs font-medium">5.0 · 327 відгуків</span>
          </div>
        </div>
      </div>
    </section>
  );
}
