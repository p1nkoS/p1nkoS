import { useState, useEffect } from "react";
import { Phone, MessageCircle, X, ArrowUp } from "lucide-react";
import { SITE_CONFIG } from "../data/mock";

/**
 * Persistent floating action stack (bottom-right):
 * - Always-visible phone pill (pulsing)
 * - Expandable: Telegram, Viber, Email, Instagram
 * - Auto-shows scroll-to-top when scrolled past hero
 */
export default function FloatingActions() {
  const [open, setOpen] = useState(false);
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 800);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const items = [
    {
      label: "Telegram",
      href: SITE_CONFIG.telegram,
      target: "_blank",
      Icon: MessageCircle,
      bg: "bg-[#0088cc]",
    },
    {
      label: "Viber",
      href: SITE_CONFIG.viber,
      Icon: Phone,
      bg: "bg-[#665CAC]",
    },
  ];

  return (
    <>
      {/* Scroll to top */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        aria-label="Догори"
        className={`fixed bottom-6 left-6 z-40 w-11 h-11 rounded-full bg-white/90 backdrop-blur border border-[#e6dfd5] shadow-lg hover:bg-[#1a1a1a] hover:text-white text-[#1a1a1a] flex items-center justify-center transition-all duration-300 ${
          showTop ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
        }`}
      >
        <ArrowUp size={18} />
      </button>

      {/* Floating contact stack */}
      <div className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-40 flex flex-col items-end gap-3">
        {/* Expanded items */}
        <div
          className={`flex flex-col items-end gap-3 transition-all duration-300 ${
            open ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2 pointer-events-none"
          }`}
        >
          {items.map(({ label, href, Icon, bg, target }) => (
            <a
              key={label}
              href={href}
              target={target}
              rel={target ? "noreferrer" : undefined}
              className="group flex items-center gap-3 pl-3 pr-1.5 py-1.5 bg-white rounded-full shadow-xl border border-[#f0e9e0] hover:border-[#FF5722] transition-all"
            >
              <span className="text-xs font-semibold text-[#1a1a1a] group-hover:text-[#FF5722] transition-colors whitespace-nowrap">
                {label}
              </span>
              <span className={`w-9 h-9 rounded-full ${bg} text-white flex items-center justify-center`}>
                <Icon size={15} />
              </span>
            </a>
          ))}
        </div>

        {/* Main pill: phone + toggle */}
        <div className="flex items-center gap-2">
          {/* Toggle expand */}
          <button
            onClick={() => setOpen(!open)}
            aria-label="Способи зв'язку"
            className={`w-11 h-11 rounded-full bg-white shadow-lg border border-[#f0e9e0] hover:border-[#FF5722] text-[#1a1a1a] hover:text-[#FF5722] flex items-center justify-center transition-all ${
              open ? "rotate-45" : ""
            }`}
          >
            {open ? <X size={18} /> : <MessageCircle size={18} />}
          </button>

          {/* Always-visible call pill */}
          <a
            href={`tel:${SITE_CONFIG.primaryPhone}`}
            className="relative inline-flex items-center gap-2.5 sm:gap-3 pl-3 pr-4 sm:pl-4 sm:pr-5 py-2.5 sm:py-3 rounded-full bg-[#FF5722] hover:bg-[#e64a17] text-white font-semibold shadow-2xl shadow-[#FF5722]/40 transition-colors"
          >
            <span className="absolute inset-0 rounded-full bg-[#FF5722] animate-ping opacity-20" />
            <span className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/15 flex items-center justify-center">
              <Phone size={16} className="sm:w-[18px] sm:h-[18px]" />
            </span>
            <span className="relative hidden sm:flex flex-col leading-tight">
              <span className="text-[10px] uppercase tracking-wider opacity-80">Дзвоніть</span>
              <span className="text-[13px]">{SITE_CONFIG.phones[0]}</span>
            </span>
          </a>
        </div>
      </div>
    </>
  );
}
