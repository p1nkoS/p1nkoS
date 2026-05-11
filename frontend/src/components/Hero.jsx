import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "../components/ui/button";
import { ArrowRight, ShieldCheck, Award, Star, Phone } from "lucide-react";
import SmartImage from "./SmartImage";
import { PRODUCTS } from "../data/products";

const HERO_ITEMS = [
  PRODUCTS.find(p => p.slug === "gealan-s9000"),
  PRODUCTS.find(p => p.slug === "neo-81"),
  PRODUCTS.find(p => p.slug === "hst-portal")
].filter(Boolean);

const HERO_IMAGES = HERO_ITEMS.map(p => ({
  src: p.image,
  category: p.category,
  label: p.category === "windows" ? "Енергоефективні вікна" : "Розсувні системи",
  sub: `${p.name} · ${p.brand}`,
  detail: p.features.slice(0, 3).join(" · ")
}));

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

      <div className="relative max-w-[1600px] mx-auto px-5 md:px-6 grid lg:grid-cols-12 gap-10 lg:gap-12 items-center">
        <div className="lg:col-span-6 z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-[#FF5722]/20 text-[#FF5722] text-[11px] sm:text-[12px] font-semibold uppercase tracking-[0.15em] mb-6 sm:mb-7 shadow-sm">
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

        <div className="lg:col-span-6 relative">
          <div className="relative grid grid-cols-12 grid-rows-6 gap-3 h-[420px] sm:h-[520px] lg:h-[600px] xl:h-[640px]">
            <div className="col-span-12 sm:col-span-8 row-span-6 relative overflow-hidden rounded-[24px] sm:rounded-[28px] group bg-gradient-to-br from-[#ece4d8] via-[#f5f1ec] to-[#e2d8c7]">
              <div className="absolute top-4 right-4 hidden sm:flex items-center gap-2 bg-white/90 backdrop-blur-md text-[#1a1a1a] px-3 py-2 rounded-2xl shadow-lg z-20">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={12} fill="#FF5722" stroke="#FF5722" />
                  ))}
                </div>
                <span className="text-[11px] font-bold">5.0 · 327 відгуків</span>
              </div>
              
              {HERO_IMAGES.map((img, i) => (
                <Link
                  key={i}
                  to={`/catalog/${img.category}`}
                  className={`absolute inset-0 transition-opacity duration-1000 ${
                    i === active ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
                  }`}
                >
                  <SmartImage
                    src={img.src}
                    alt={img.label}
                    eager={i === 0}
                    width={1400}
                    fit="cover"
                    className="w-full h-full transition-transform duration-700 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent pointer-events-none z-10" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 z-20">
                    <div className="max-w-xl text-white drop-shadow-xl">
                      <div className="text-[10px] sm:text-[12px] uppercase tracking-[0.3em] opacity-90 font-bold mb-1">
                        {img.sub}
                      </div>
                      <div className="font-display font-bold text-2xl sm:text-4xl leading-tight">
                        {img.label}
                      </div>
                      <div className="text-white/80 text-xs sm:text-base mt-2 font-medium flex items-center gap-2">
                        {img.detail} <ArrowRight size={16} className="text-[#FF5722]" />
                      </div>
                    </div>
                  </div>
                </Link>
              ))}

              <div className="absolute bottom-4 right-4 flex gap-1.5 shrink-0 z-20">
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

            <div className="hidden sm:block col-span-4 row-span-3 relative overflow-hidden rounded-[24px] group bg-[#f5f1ec]">
              <SmartImage
                src="/viknaroff_photos/doors_for_house/doors_for_house_01.jpg"
                alt="Двері Viknar'off"
                width={600}
                fit="cover"
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

            <div className="hidden sm:block col-span-4 row-span-3 relative overflow-hidden rounded-[24px] group">
              <SmartImage
                src="/viknaroff_photos/sliding_doors/sliding_doors_01.jpg"
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
        </div>
      </div>
    </section>
  );
}
