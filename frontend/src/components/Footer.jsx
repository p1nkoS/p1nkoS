import { Phone, Mail, MapPin, Facebook, Instagram, Youtube } from "lucide-react";
import { SITE_CONFIG, NAV_MENU } from "../data/mock";

export default function Footer() {
  return (
    <footer className="bg-[#1a1a1a] text-white pt-20 pb-8 relative overflow-hidden grain-overlay">
      <div className="absolute -top-40 -left-40 w-[500px] h-[500px] rounded-full bg-[#FF5722]/10 blur-3xl pointer-events-none" />
      <div className="max-w-[1400px] mx-auto px-6 relative">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-10 mb-14">
          <div className="col-span-2 lg:col-span-2">
            <div className="font-display font-extrabold text-3xl mb-5">VIKNAR<span className="text-[#FF5722]">'</span>OFF</div>
            <p className="text-white/60 text-sm leading-relaxed mb-6 max-w-sm">
              Салон магазин у Вінниці. Металопластикові вікна, двері, балкони та розсувні системи від виробника. Європейська якість за доступною ціною.
            </p>
            <div className="flex gap-3">
              {[Facebook, Instagram, Youtube].map((Icon, i) => (
                <a key={i} href="#" className="w-10 h-10 rounded-full bg-white/5 hover:bg-[#FF5722] flex items-center justify-center transition-colors">
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {NAV_MENU.slice(0, 2).map((m) => (
            <div key={m.title}>
              <h4 className="font-display font-bold mb-5 text-sm uppercase tracking-wider">{m.title}</h4>
              <ul className="space-y-2.5">
                {m.submenu.slice(0, 5).map((s) => (
                  <li key={s.name}>
                    <a href={s.href} className="text-white/60 hover:text-[#FF5722] text-sm transition-colors link-underline">{s.name}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <h4 className="font-display font-bold mb-5 text-sm uppercase tracking-wider">Контакти</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-white/70 text-sm">
                <MapPin size={15} className="mt-0.5 text-[#FF5722] shrink-0" /> {SITE_CONFIG.address}
              </li>
              {SITE_CONFIG.phones.map((p) => (
                <li key={p} className="flex items-center gap-2">
                  <Phone size={15} className="text-[#FF5722]" />
                  <a href={`tel:+38${p.replace(/\D/g, "")}`} className="text-white/70 hover:text-[#FF5722] text-sm transition-colors">{p}</a>
                </li>
              ))}
              <li className="flex items-center gap-2">
                <Mail size={15} className="text-[#FF5722]" />
                <a href={`mailto:${SITE_CONFIG.email}`} className="text-white/70 hover:text-[#FF5722] text-sm transition-colors break-all">{SITE_CONFIG.email}</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 text-white/40 text-xs">
          <p>© {new Date().getFullYear()} VIKNAR'OFF Вінниця. Всі права захищені.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors">Політика конфіденційності</a>
            <a href="#" className="hover:text-white transition-colors">Публічна оферта</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
