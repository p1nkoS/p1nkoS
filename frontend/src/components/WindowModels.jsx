import { ArrowRight, Volume2, Layers, Box, Globe } from "lucide-react";
import { WINDOW_MODELS } from "../data/mock";

export default function WindowModels({ onOpenForm }) {
  return (
    <section className="section-pad bg-[#f5f1ec]">
      <div className="max-w-[1400px] mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <span className="inline-block px-3 py-1 rounded-full bg-[#FF5722]/10 text-[#FF5722] text-xs font-semibold uppercase tracking-wider mb-4">Модельний ряд</span>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.05]">
              Вікна для твого <span className="text-[#FF5722]">комфорту</span>
            </h2>
          </div>
          <p className="text-[#5a5a5a] md:max-w-md">Обирайте серед кращих європейських профілів Gealan, Decco, Aluprof та українських виробників.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {WINDOW_MODELS.map((m) => (
            <div key={m.name} className="bg-white rounded-3xl overflow-hidden card-hover relative">
              <span className="ribbon-tag">{m.badge}</span>
              <div className="img-zoom h-56 overflow-hidden">
                <img src={m.image} alt={m.name} className="w-full h-full object-cover" />
              </div>
              <div className="p-6">
                <h3 className="font-display text-2xl font-bold mb-4">{m.name}</h3>
                <div className="grid grid-cols-2 gap-3 mb-5 text-sm">
                  <div className="flex items-start gap-2">
                    <Volume2 size={16} className="text-[#FF5722] mt-0.5 shrink-0" />
                    <div>
                      <div className="text-[#999] text-[11px] uppercase">Шумоіз.</div>
                      <div className="font-medium">{m.soundproof}</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <Layers size={16} className="text-[#FF5722] mt-0.5 shrink-0" />
                    <div>
                      <div className="text-[#999] text-[11px] uppercase">Глибина</div>
                      <div className="font-medium">{m.depth}</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <Box size={16} className="text-[#FF5722] mt-0.5 shrink-0" />
                    <div>
                      <div className="text-[#999] text-[11px] uppercase">Камери</div>
                      <div className="font-medium">{m.chambers}</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <Globe size={16} className="text-[#FF5722] mt-0.5 shrink-0" />
                    <div>
                      <div className="text-[#999] text-[11px] uppercase">Країна</div>
                      <div className="font-medium">{m.country}</div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between pt-4 border-t border-[#f0e9e0]">
                  <span className="text-xs text-[#999]">Склопакет {m.glass}</span>
                  <button onClick={onOpenForm} className="inline-flex items-center gap-1.5 text-[#FF5722] text-sm font-semibold hover:gap-2 transition-all">
                    Запитати ціну <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
