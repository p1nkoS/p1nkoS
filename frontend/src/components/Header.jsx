import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Phone, Mail, Clock, ChevronDown, MapPin, Menu, X, MessageCircle } from "lucide-react";
import { Button } from "../components/ui/button";
import { SITE_CONFIG, NAV_MENU } from "../data/mock";

export default function Header({ onOpenForm }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDrop, setOpenDrop] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setOpenDrop(null);
  }, [location.pathname]);

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      {/* Top contact bar */}
      <div
        className={`hidden md:block transition-all duration-500 ${
          scrolled ? "opacity-0 -translate-y-full h-0 overflow-hidden" : "opacity-100"
        }`}
        style={{ background: "rgba(26,26,26,0.92)", backdropFilter: "blur(10px)" }}
      >
        <div className="max-w-[1400px] mx-auto px-6 py-2.5 flex items-center justify-between text-white text-[12px]">
          <div className="flex items-center gap-5">
            <a href={`tel:${SITE_CONFIG.primaryPhone}`} className="flex items-center gap-1.5 hover:text-[#FF5722] transition-colors">
              <Phone size={12} /> {SITE_CONFIG.phones[0]}
            </a>
            <a href={`mailto:${SITE_CONFIG.email}`} className="flex items-center gap-1.5 hover:text-[#FF5722] transition-colors">
              <Mail size={12} /> {SITE_CONFIG.email}
            </a>
            <a href={SITE_CONFIG.telegram} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 hover:text-[#FF5722] transition-colors" aria-label="Telegram">
              <MessageCircle size={12} /> Telegram
            </a>
            <a href={SITE_CONFIG.viber} className="hidden lg:flex items-center gap-1.5 hover:text-[#FF5722] transition-colors" aria-label="Viber">
              Viber
            </a>
            <a href={SITE_CONFIG.instagram} target="_blank" rel="noreferrer" className="hidden lg:flex items-center gap-1.5 hover:text-[#FF5722] transition-colors" aria-label="Instagram">
              Instagram
            </a>
            <span className="hidden xl:flex items-center gap-1.5 opacity-80">
              <Clock size={12} /> {SITE_CONFIG.workingHours}
            </span>
          </div>
          <div className="flex items-center gap-5 text-white/80">
            <a href="#about" className="hover:text-white transition-colors">Про нас</a>
            <a href="#contact" className="hover:text-white transition-colors">Контакти</a>
          </div>
        </div>
      </div>

      {/* Main nav */}
      <div className="max-w-[1400px] mx-auto px-4 md:px-6">
        <nav className={`mt-3 rounded-full transition-all duration-500 ${scrolled ? "bg-white shadow-lg" : "bg-white/95 backdrop-blur-md shadow-md"}`}>
          <div className="flex items-center justify-between px-4 md:px-6 py-3">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 shrink-0">
              <span className="font-display font-extrabold text-2xl md:text-[26px] tracking-tight text-[#1a1a1a]">
                VIKNAR<span className="text-[#FF5722]">'</span>OFF
              </span>
              <span className="hidden lg:inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#FF5722]/10 text-[#FF5722] text-[11px] font-semibold uppercase tracking-wider">
                <MapPin size={11} /> {SITE_CONFIG.badge}
              </span>
            </Link>

            {/* Desktop menu */}
            <ul className="hidden lg:flex items-center gap-1">
              {NAV_MENU.map((item) => (
                <li
                  key={item.title}
                  className="relative"
                  onMouseEnter={() => setOpenDrop(item.title)}
                  onMouseLeave={() => setOpenDrop(null)}
                >
                  <Link
                    to={item.href}
                    className="flex items-center gap-1 px-3 py-2 text-[14px] font-medium text-[#1a1a1a] hover:text-[#FF5722] transition-colors"
                  >
                    {item.title}
                    <ChevronDown size={14} className={`transition-transform ${openDrop === item.title ? "rotate-180" : ""}`} />
                  </Link>
                  {openDrop === item.title && (
                    <div className="absolute left-0 top-full pt-2 min-w-[260px]">
                      <div className="bg-white rounded-2xl shadow-xl border border-[#f0e9e0] overflow-hidden p-2">
                        {item.submenu.map((sub) => (
                          <Link
                            key={sub.name}
                            to={sub.href}
                            className="block px-4 py-2.5 text-[13px] text-[#1a1a1a] rounded-xl hover:bg-[#FF5722]/8 hover:text-[#FF5722] transition-colors"
                          >
                            {sub.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </li>
              ))}
            </ul>

            {/* Right side */}
            <div className="flex items-center gap-2">
              <a
                href={SITE_CONFIG.telegram}
                target="_blank"
                rel="noreferrer"
                className="hidden md:inline-flex items-center justify-center w-10 h-10 rounded-full border border-[#e6dfd5] hover:bg-[#0088cc] hover:border-[#0088cc] hover:text-white transition-colors"
                aria-label="Telegram"
              >
                <MessageCircle size={15} />
              </a>
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
                  <Link to={item.href} className="block py-2 text-sm text-[#FF5722] font-medium">
                    Усі {item.title.toLowerCase()} →
                  </Link>
                  {item.submenu.map((s) => (
                    <Link key={s.name} to={s.href} className="block py-2 text-sm text-[#555] hover:text-[#FF5722]">
                      {s.name}
                    </Link>
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
