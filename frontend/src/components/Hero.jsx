import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "../components/ui/button";
import { ArrowRight, ShieldCheck, Award, Star, Phone, Sparkles } from "lucide-react";

const HERO_IMAGES = [
  {
    src: "https://images.unsplash.com/photo-1772563139470-9232b4e435c2",
    label: "Gealan S 9000",
    sub: "Преміум профіль",
  },
  {
    src: "https://images.unsplash.com/photo-1638885930125-85350348d266",
    label: "Decco 82",
    sub: "Польська якість",
  },
  {
    src: "https://images.unsplash.com/photo-1700308232171-aa0d87ee1a88",
    label: "Aluprof MB-86",
    sub: "Алюмінієві системи",
  },
];

export default function Hero({ onOpenForm }) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setActive((p) => (p + 1) % HERO_IMAGES.length), 5500);
    return () => clearInterval(t);
  }, []);

  return (
    <section
      id="home"
      className="relative pt-32 lg:pt-36 pb-12 lg:pb-20 min-h-[100vh] overflow-hidden bg-[#f5f1ec]"
    >
      {/* Background patterns */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-[#FF5722]/8 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-1/3 w-96 h-96 bg-[#FF5722]/5 rounded-full blur-3xl" />
        <svg className="absolute top-0 right-0 w-1/2 h-full opacity-[0.04]" viewBox="0 0 100 100" preserveAspectRatio="none">
          <defs>
            <pattern id="grid" width="5" height="5" patternUnits="userSpaceOnUse">
              <path d="M 5 0 L 0 0 0 5" fill="none" stroke="#1a1a1a" strokeWidth="0.2" />
            </pattern>
          </defs>
          <rect width="100" height="100" fill="url(#grid)" />
        </svg>
      </div>

      <div className="relative max-w-[1400px] mx-auto px-6 grid lg:grid-cols-12 gap-10 lg:gap-12 items-center">
        {/* LEFT — content */}
        <div className="lg:col-span-6 z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-[#FF5722]/20 text-[#FF5722] text-[12px] font-semibold uppercase tracking-[0.15em] mb-7 animate-fade-up shadow-sm">
            <Sparkles size={12} className="fill-[#FF5722]" />
            Салон магазин · Вінниця
          </div>

          <h1
            className="font-display font-extrabold text-[#1a1a1a] text-[44px] sm:text-[60px] lg:text-[76px] leading-[0.98] mb-6 animate-fade-up"
            style={{ animationDelay: "0.1s" }}
          >
            Вікна, що{" "}
            <span className="relative inline-block text-[#FF5722]">
              вимикають
              <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 200 12" fill="none">
                <path d="M2 9C40 4 80 2 120 4C160 6 180 8 198 6" stroke="#FF5722" strokeWidth="3" strokeLinecap="round" />
              </svg>
            </span>{" "}
            усе зайве
          </h1>

          <p
            className="text-[#5a5a5a] text-base lg:text-lg max-w-xl mb-9 leading-relaxed animate-fade-up"
            style={{ animationDelay: "0.2s" }}
          >
            Металопластикові вікна, двері та розсувні системи від виробника Viknar'off. Європейські
            профілі Gealan, Decco, Aluprof. Гарантія до 15 років, монтаж за 1–3 дні.
          </p>

          <div
            className="flex flex-col sm:flex-row gap-3 mb-10 animate-fade-up"
            style={{ animationDelay: "0.3s" }}
          >
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
          <div
            className="grid grid-cols-3 gap-4 max-w-md animate-fade-up"
            style={{ animationDelay: "0.4s" }}
          >
            <div className="flex items-start gap-2">
              <ShieldCheck className="text-[#FF5722] shrink-0 mt-0.5" size={18} />
              <div>
                <div className="font-display font-bold text-[#1a1a1a] text-base leading-none">15 років</div>
                <div className="text-[11px] text-[#888] mt-1">гарантії</div>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <Award className="text-[#FF5722] shrink-0 mt-0.5" size={18} />
              <div>
                <div className="font-display font-bold text-[#1a1a1a] text-base leading-none">19+ років</div>
                <div className="text-[11px] text-[#888] mt-1">на ринку</div>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <Star className="text-[#FF5722] shrink-0 mt-0.5 fill-[#FF5722]" size={18} />
              <div>
                <div className="font-display font-bold text-[#1a1a1a] text-base leading-none">5000+</div>
                <div className="text-[11px] text-[#888] mt-1">клієнтів</div>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT — split image collage */}
        <div className="lg:col-span-6 relative">
          <div className="relative grid grid-cols-12 grid-rows-6 gap-3 h-[480px] sm:h-[560px] lg:h-[640px]">
            {/* Main image */}
            <div className="col-span-12 sm:col-span-8 row-span-6 relative overflow-hidden rounded-[28px] group">
              {HERO_IMAGES.map((img, i) => (
                <img
                  key={i}
                  src={img.src}
                  alt={img.label}
                  className={`absolute inset-0 w-full h-full object-cover transition-all duration-1000 ${
                    i === active ? "opacity-100 scale-100" : "opacity-0 scale-105"
                  }`}
                />
              ))}
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

              {/* Label badge */}
              <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between">
                <div className="text-white">
                  <div className="text-[11px] uppercase tracking-[0.25em] opacity-80">
                    {HERO_IMAGES[active].sub}
                  </div>
                  <div className="font-display font-bold text-2xl mt-1">{HERO_IMAGES[active].label}</div>
                </div>
                <div className="flex gap-1.5">
                  {HERO_IMAGES.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setActive(i)}
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
              <img
                src="https://images.unsplash.com/photo-1626556504142-f9ec02f05d67"
                alt="Doors"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <Link
                to="/catalog/doors"
                className="absolute bottom-3 left-3 right-3 text-white"
              >
                <div className="text-[10px] uppercase tracking-[0.2em] opacity-80">Категорія</div>
                <div className="font-display font-bold text-base flex items-center gap-1 group-hover:gap-2 transition-all">
                  Двері <ArrowRight size={14} />
                </div>
              </Link>
            </div>

            {/* Bottom right card */}
            <div className="hidden sm:block col-span-4 row-span-3 relative overflow-hidden rounded-[24px] group">
              <img
                src="https://images.unsplash.com/photo-1700308232171-aa0d87ee1a88"
                alt="Sliding"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <Link
                to="/catalog/sliding"
                className="absolute bottom-3 left-3 right-3 text-white"
              >
                <div className="text-[10px] uppercase tracking-[0.2em] opacity-80">Категорія</div>
                <div className="font-display font-bold text-base flex items-center gap-1 group-hover:gap-2 transition-all">
                  Розсувні <ArrowRight size={14} />
                </div>
              </Link>
            </div>
          </div>

          {/* Floating CTA card */}
          <button
            onClick={onOpenForm}
            className="absolute -bottom-6 -left-4 hidden md:flex items-center gap-3 bg-white p-3 pr-5 rounded-full shadow-2xl border border-[#f0e9e0] hover:border-[#FF5722] transition-all group z-20"
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

          {/* Floating rating */}
          <div className="absolute -top-2 right-2 hidden md:flex items-center gap-2 bg-[#1a1a1a] text-white px-4 py-3 rounded-2xl shadow-2xl z-20 animate-float">
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
