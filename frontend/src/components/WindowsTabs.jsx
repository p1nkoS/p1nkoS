import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { WINDOW_TABS } from "../data/mock";

export default function WindowsTabs() {
  const tabKeys = Object.keys(WINDOW_TABS);
  const [active, setActive] = useState(tabKeys[0]);

  return (
    <section id="windows" className="section-pad bg-white">
      <div className="max-w-[1400px] mx-auto px-6">
        <div className="max-w-3xl mb-12">
          <span className="inline-block px-3 py-1 rounded-full bg-[#FF5722]/10 text-[#FF5722] text-xs font-semibold uppercase tracking-wider mb-4">Вікна</span>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.05] mb-4">
            Вікна, як окремий <span className="text-[#FF5722]">вид мистецтва</span>
          </h2>
          <p className="text-[#5a5a5a]">Обирайте вікна за призначенням, функціями, дизайном або брендом — у нас є рішення на будь-який запит.</p>
        </div>

        <div className="flex flex-wrap gap-2 mb-10">
          {tabKeys.map((k) => (
            <button
              key={k}
              onClick={() => setActive(k)}
              className={`px-5 py-3 rounded-full text-sm font-medium transition-all border ${
                active === k
                  ? "bg-[#1a1a1a] text-white border-[#1a1a1a]"
                  : "bg-white text-[#1a1a1a] border-[#e6dfd5] hover:border-[#1a1a1a]"
              }`}
            >
              {WINDOW_TABS[k].label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-5">
          {WINDOW_TABS[active].items.map((item, i) => (
            <Link
              key={`${active}-${i}`}
              to="/catalog/windows"
              className="group relative overflow-hidden rounded-2xl aspect-[4/5] img-zoom card-hover"
            >
              <img src={item.image} alt={item.name} className="absolute inset-0 w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="relative z-10 h-full p-5 md:p-6 flex flex-col justify-end">
                <h3 className="text-white font-semibold text-base md:text-lg mb-2 leading-tight">{item.name}</h3>
                <span className="inline-flex items-center gap-1.5 text-white/80 text-xs group-hover:text-[#FF5722] group-hover:gap-2 transition-all">
                  Детальніше <ArrowRight size={13} />
                </span>
              </div>
            </Link>
          ))}
        </div>

        <div className="flex justify-center mt-10">
          <Link to="/catalog/windows" className="inline-flex items-center gap-2 px-7 py-4 rounded-full border-2 border-[#1a1a1a] text-[#1a1a1a] hover:bg-[#1a1a1a] hover:text-white transition-all font-medium text-sm">
            Переглянути всі вікна <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
