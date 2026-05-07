import { Phone, MessageCircle } from "lucide-react";
import { Button } from "../components/ui/button";
import { PROCESS_STEPS } from "../data/mock";

export default function Process({ onOpenForm }) {
  return (
    <section className="section-pad bg-white relative">
      <div className="max-w-[1400px] mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div className="max-w-2xl">
            <span className="inline-block px-3 py-1 rounded-full bg-[#FF5722]/10 text-[#FF5722] text-xs font-semibold uppercase tracking-wider mb-4">Як ми працюємо</span>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.05]">
              Від заявки до <span className="text-[#FF5722]">готового вікна</span>
            </h2>
          </div>
          <p className="text-[#5a5a5a] md:max-w-md">Чіткий процес без прихованих комплікацій. Кожний етап контролюється відповідальним менеджером.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-14">
          {PROCESS_STEPS.map((step, i) => (
            <div key={step.num} className="relative p-7 md:p-8 rounded-3xl bg-[#f5f1ec] hover:bg-[#FF5722] transition-all duration-500 group cursor-default">
              <div className="font-display text-7xl md:text-8xl font-bold num-stroke group-hover:[-webkit-text-stroke:none] group-hover:text-white transition-all leading-none mb-6">{step.num}</div>
              <h3 className="font-display text-xl font-bold mb-3 group-hover:text-white transition-colors">{step.title}</h3>
              <p className="text-[#5a5a5a] text-sm leading-relaxed group-hover:text-white/90 transition-colors">{step.text}</p>
              {i < PROCESS_STEPS.length - 1 && (
                <div className="hidden lg:block absolute top-12 -right-3 w-6 h-px bg-[#e6dfd5] group-hover:bg-white transition-colors" />
              )}
            </div>
          ))}
        </div>

        <div className="rounded-3xl bg-[#1a1a1a] text-white p-10 md:p-14 grid md:grid-cols-2 gap-8 items-center relative overflow-hidden">
          <div className="absolute -top-20 -right-20 w-72 h-72 rounded-full bg-[#FF5722]/30 blur-3xl pointer-events-none" />
          <div className="relative">
            <h3 className="font-display text-3xl md:text-4xl font-bold mb-4 leading-tight">
              Готові оновити ваші <span className="text-[#FF5722]">вікна</span>?
            </h3>
            <p className="text-white/70 mb-0">Залиште заявку і отримайте безкоштовний замір та розрахунок вартості вже сьогодні!</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 justify-end">
            <Button onClick={onOpenForm} className="btn-shimmer rounded-full bg-[#FF5722] hover:bg-[#e64a17] text-white px-7 py-7 text-sm font-semibold">
              <Phone size={16} className="mr-2" /> Замовити замір
            </Button>
            <a href="https://t.me/viknaroffvin" target="_blank" rel="noreferrer" className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-full border border-white/30 text-white hover:bg-white hover:text-[#1a1a1a] transition-all text-sm font-medium">
              <MessageCircle size={16} /> Написати в Telegram
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
