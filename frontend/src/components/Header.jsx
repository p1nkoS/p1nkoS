import { useEffect, useState } from "react";
import { Phone, Mail, Clock, ChevronDown, MapPin, Menu, X } from "lucide-react";
import { Button } from "../components/ui/button";
import { SITE_CONFIG, NAV_MENU } from "../data/mock";

export default function Header({ onOpenForm }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDrop, setOpenDrop] = useState(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      {/* Top contact bar */}
      <div
        className={`hidden md:block transition-all duration-500 ${
          scrolled ? "opacity-0 -translate-y-full h-0 overflow-hidden" : "opacity-100"
        }`}
        style={{ background: "linear-gradient(180deg, rgba(0,0,0,0.55), rgba(0,0,0,0))" }}
      >
        <div className="max-w-[1400px] mx-auto px-6 py-3 flex items-center justify-between text-white text-[13px]">
          <div className="flex items-center gap-6">
            <a href={`tel:${SITE_CONFIG.hotline.replace(/\s/g, "")}`} className="flex items-center gap-2 hover:text-[#FF5722] transition-colors">
              <Phone size={14} /> {SITE_CONFIG.hotline}
            </a>
            <a href={`mailto:${SITE_CONFIG.email}`} className="flex items-center gap-2 hover:text-[#FF5722] transition-colors">
              <Mail size={14} /> {SITE_CONFIG.email}
            </a>
            <span className="flex items-center gap-2 opacity-80">
              <Clock size={14} /> 9:00 - 17:30 <span className="opacity-60">(гаряча лінія)</span>
            </span>
          </div>
          <div className="flex items-center gap-6">
            <a href="#about" className="hover:text-[#FF5722] transition-colors">Виробництво</a>
            <a href="#about" className="hover:text-[#FF5722] transition-colors">Про нас</a>
            <a href="#contact" className="hover:text-[#FF5722] transition-colors">Кар'єра</a>
            <a href="#contact" className="hover:text-[#FF5722] transition-colors">Контакти</a>
            <a href="#contact" className="hover:text-[#FF5722] transition-colors">Новини</a>
          </div>
        </div>
      </div>

      {/* Main nav */}
      <div className="max-w-[1400px] mx-auto px-4 md:px-6">
        <nav className={`mt-3 rounded-full transition-all duration-500 ${scrolled ? "bg-white shadow-lg" : "bg-white/95 backdrop-blur-md shadow-md"}`}>
          <div className="flex items-center justify-between px-4 md:px-6 py-3">
            {/* Logo */}
            <a href="#home" className="flex items-center gap-3 shrink-0">
              <span className="font-display font-extrabold text-2xl md:text-[26px] tracking-tight text-[#1a1a1a]">
                VIKNAR<span className="text-[#FF5722]">'</span>OFF
              </span>
              <span className="hidden lg:inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#FF5722]/10 text-[#FF5722] text-[11px] font-semibold uppercase tracking-wider">
                <MapPin size={11} /> {SITE_CONFIG.badge}
              </span>
            </a>

            {/* Desktop menu */}
            <ul className="hidden lg:flex items-center gap-1">
              {NAV_MENU.map((item) => (
                <li
                  key={item.title}
                  className="relative"
                  onMouseEnter={() => setOpenDrop(item.title)}
                  onMouseLeave={() => setOpenDrop(null)}
                >
                  <a
                    href={item.href}
                    className="flex items-center gap-1 px-3 py-2 text-[14px] font-medium text-[#1a1a1a] hover:text-[#FF5722] transition-colors"
                  >
                    {item.title}
                    <ChevronDown size={14} className={`transition-transform ${openDrop === item.title ? "rotate-180" : ""}`} />
                  </a>
                  {openDrop === item.title && (
                    <div className="absolute left-0 top-full pt-2 min-w-[260px]">
                      <div className="bg-white rounded-2xl shadow-xl border border-[#f0e9e0] overflow-hidden p-2">
                        {item.submenu.map((sub) => (
                          <a
                            key={sub.name}
                            href={sub.href}
                            className="block px-4 py-2.5 text-[13px] text-[#1a1a1a] rounded-xl hover:bg-[#FF5722]/8 hover:text-[#FF5722] transition-colors"
                          >
                            {sub.name}
                          </a>
                        ))}
                      </div>
                    </div>
                  )}
                </li>
              ))}
            </ul>

            {/* Right side */}
            <div className="flex items-center gap-2">
              <button className="hidden md:inline-flex items-center gap-1 px-4 py-2 rounded-full border border-[#e6dfd5] text-[13px] font-medium hover:bg-[#f5f1ec] transition-colors">
                Для дилера
              </button>
              <span className="hidden md:inline-flex items-center gap-1 px-3 py-2 text-[13px] font-medium">UK <ChevronDown size={12} /></span>
              <Button
                onClick={onOpenForm}
                className="btn-shimmer rounded-full bg-[#FF5722] hover:bg-[#e64a17] text-white px-5 py-5 md:px-6 md:py-5 font-semibold text-[13px] shadow-md"
              >
                Залишити заявку
              </Button>
              <button
                aria-label="menu"
                className="lg:hidden p-2 rounded-full hover:bg-[#f5f1ec]"
                onClick={() => setMobileOpen(!mobileOpen)}
              >
                {mobileOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </div>
        </nav>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 top-[80px] bg-white z-40 overflow-y-auto">
          <div className="p-6 space-y-2">
            {NAV_MENU.map((item) => (
              <details key={item.title} className="group border-b border-[#f0e9e0] pb-2">
                <summary className="flex items-center justify-between py-3 font-semibold cursor-pointer">
                  {item.title}
                  <ChevronDown size={16} className="group-open:rotate-180 transition-transform" />
                </summary>
                <div className="pl-2 pb-2">
                  {item.submenu.map((s) => (
                    <a key={s.name} href={s.href} onClick={() => setMobileOpen(false)} className="block py-2 text-sm text-[#555] hover:text-[#FF5722]">
                      {s.name}
                    </a>
                  ))}
                </div>
              </details>
            ))}
            <Button onClick={() => { setMobileOpen(false); onOpenForm(); }} className="w-full mt-4 bg-[#FF5722] hover:bg-[#e64a17] rounded-full py-6">
              Залишити заявку
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
