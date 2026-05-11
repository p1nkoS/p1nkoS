import { Phone } from "lucide-react";
import { FaTelegramPlane, FaViber } from "react-icons/fa";
import { SITE_CONFIG } from "../data/mock";

/**
 * Mobile-only sticky bottom CTA bar.
 * Goal: maximise inbound calls — phone is the loudest action.
 * Hidden on tablet+ (md and up) — desktop has FloatingActions instead.
 */
export default function MobileCallBar() {
  const phone = SITE_CONFIG.phones[0];
  const phoneTel = `tel:+38${phone.replace(/\D/g, "")}`;

  return (
    <>
      {/* Sticky bar */}
      <div
        data-testid="mobile-call-bar"
        className="md:hidden fixed bottom-0 inset-x-0 z-50 px-3 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] bg-gradient-to-t from-white via-white to-transparent"
      >
        <div className="flex items-stretch gap-2 rounded-full bg-white shadow-[0_-6px_30px_rgba(0,0,0,0.12)] border border-[#f0e9e0] p-1.5">
          {/* Big call CTA */}
          <a
            href={phoneTel}
            data-testid="mobile-call-button"
            aria-label={`Подзвонити ${phone}`}
            className="relative flex-1 flex items-center justify-center gap-2.5 rounded-full bg-[#FF5722] hover:bg-[#e64a17] active:scale-[0.98] text-white font-semibold transition-all py-3.5 px-4 overflow-hidden"
          >
            <span className="absolute inset-0 rounded-full bg-[#FF5722] animate-ping opacity-20 pointer-events-none" />
            <span className="relative w-9 h-9 rounded-full bg-white/20 flex items-center justify-center">
              <Phone size={17} />
            </span>
            <span className="relative flex flex-col leading-tight items-start">
              <span className="text-[10px] uppercase tracking-[0.15em] opacity-80">Дзвоніть зараз</span>
              <span className="text-[13.5px] font-bold tabular-nums">{phone}</span>
            </span>
          </a>

          {/* Telegram */}
          <a
            href={SITE_CONFIG.telegram}
            target="_blank"
            rel="noreferrer"
            aria-label="Написати в Telegram"
            data-testid="mobile-telegram-button"
            className="w-12 rounded-full bg-[#0088cc] hover:bg-[#0077b5] active:scale-95 text-white flex items-center justify-center transition-all"
          >
            <FaTelegramPlane size={17} />
          </a>

          {/* Viber */}
          <a
            href={SITE_CONFIG.viber}
            aria-label="Написати у Viber"
            data-testid="mobile-viber-button"
            className="w-12 rounded-full bg-[#7360F2] hover:bg-[#5e4cdb] active:scale-95 text-white flex items-center justify-center transition-all"
          >
            <FaViber size={18} />
          </a>
        </div>
      </div>
      {/* Spacer so content isn't hidden behind the bar on mobile */}
      <div className="md:hidden h-[88px]" aria-hidden="true" />
    </>
  );
}
