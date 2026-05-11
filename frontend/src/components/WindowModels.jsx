import { Link } from "react-router-dom";
import { ArrowRight, Volume2, Layers, Box, Globe } from "lucide-react";
import { getProductsByCategory } from "../data/products";
import SmartImage from "./SmartImage";

export default function WindowModels() {
  const models = getProductsByCategory("windows");
  return (
    <section className="section-pad bg-[#f5f1ec]">
      <div className="max-w-[1600px] mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <span className="inline-block px-3 py-1 rounded-full bg-[#FF5722]/10 text-[#FF5722] text-xs font-semibold uppercase tracking-wider mb-4">Модельний ряд</span>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.05]">
              Вікна для твого <span className="text-[#FF5722]">комфорту</span>
            </h2>
          </div>
          <Link to="/catalog/windows" className="group inline-flex items-center gap-2 px-6 py-4 rounded-full border-2 border-[#1a1a1a] text-[#1a1a1a] hover:bg-[#1a1a1a] hover:text-white transition-all font-medium text-sm">
            Усі вікна з фільтрами <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {models.map((m) => (
            <Link key={m.slug} to={`/product/${m.slug}`} className="bg-white rounded-3xl overflow-hidden card-hover relative group reveal">
              <span className="ribbon-tag">{m.badge}</span>
              <div className="h-56 overflow-hidden bg-[#f5f1ec]">
                <SmartImage src={m.image} alt={m.name} width={600} fit="cover" className="w-full h-full transition-transform duration-700 group-hover:scale-105" />
              </div>
              <div className="p-6">
                <h3 className="font-display text-2xl font-bold mb-4 group-hover:text-[#FF5722] transition-colors">{m.name}</h3>
                <div className="grid grid-cols-2 gap-3 mb-5 text-sm">
                  <div className="flex items-start gap-2">
                    <Volume2 size={16} className="text-[#FF5722] mt-0.5 shrink-0" />
                    <div>
                      <div className="text-[#999] text-[11px] uppercase">Шумоіз.</div>
                      <div className="font-medium">до {m.soundproof} дБ</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <Layers size={16} className="text-[#FF5722] mt-0.5 shrink-0" />
                    <div>
                      <div className="text-[#999] text-[11px] uppercase">Глибина</div>
                      <div className="font-medium">{m.depth} мм</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <Box size={16} className="text-[#FF5722] mt-0.5 shrink-0" />
                    <div>
                      <div className="text-[#999] text-[11px] uppercase">Камери</div>
                      <div className="font-medium">{m.chambers || "—"}</div>
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
                  <div>
                    <div className="text-[10px] text-[#888] uppercase">від</div>
                    <div className="font-display font-bold text-lg">{m.price.toLocaleString()} ₴<span className="text-xs text-[#888] font-normal">/м²</span></div>
                  </div>
                  <span className="inline-flex items-center gap-1.5 text-[#FF5722] text-sm font-semibold group-hover:gap-2 transition-all">
                    Детальніше <ArrowRight size={14} />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
