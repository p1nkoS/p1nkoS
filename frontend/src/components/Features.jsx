import { Factory, Globe, Ruler, ShieldCheck, Zap, BadgePercent } from "lucide-react";
import { FEATURES } from "../data/mock";

const iconMap = { Factory, Globe, Ruler, ShieldCheck, Zap, BadgePercent };

export default function Features() {
  return (
    <section id="features" className="section-pad bg-white relative overflow-hidden">
      <div className="absolute -top-32 -right-40 w-[500px] h-[500px] rounded-full bg-[#FF5722]/5 blur-3xl pointer-events-none" />
      <div className="max-w-[1600px] mx-auto px-6 relative">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div className="max-w-2xl">
            <span className="inline-block px-3 py-1 rounded-full bg-[#FF5722]/10 text-[#FF5722] text-xs font-semibold uppercase tracking-wider mb-4">Наші переваги</span>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.05]">
              Чому обирають <span className="text-[#FF5722]">VIKNAR'OFF</span>
            </h2>
          </div>
          <p className="text-[#5a5a5a] md:max-w-md">Ми — салон магазин у Вінниці з бездоганною репутацією та 19+ роками досвіду на ринку.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {FEATURES.map((f, i) => {
            const Icon = iconMap[f.icon];
            return (
              <div key={f.title} className="group p-8 rounded-3xl bg-[#f5f1ec] hover:bg-[#1a1a1a] transition-all duration-500 cursor-default">
                <div className="flex items-start justify-between mb-8">
                  <div className="w-14 h-14 rounded-2xl bg-white group-hover:bg-[#FF5722] flex items-center justify-center transition-colors">
                    <Icon size={26} className="text-[#FF5722] group-hover:text-white transition-colors" />
                  </div>
                  <span className="font-display text-3xl font-bold text-[#FF5722]/30 group-hover:text-[#FF5722]/60 transition-colors">0{i + 1}</span>
                </div>
                <h3 className="font-display text-xl font-bold mb-3 group-hover:text-white transition-colors">{f.title}</h3>
                <p className="text-[#5a5a5a] text-sm leading-relaxed group-hover:text-white/70 transition-colors">{f.text}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
