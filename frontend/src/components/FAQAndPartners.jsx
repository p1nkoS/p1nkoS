import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./ui/accordion";
import { FAQ_ITEMS, PARTNERS } from "../data/mock";
import { CheckCircle2 } from "lucide-react";
import SmartImage from "./SmartImage";

export default function FAQAndPartners() {
  return (
    <>
      {/* About */}
      <section id="about" className="section-pad bg-[#f5f1ec]">
        <div className="max-w-[1600px] mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <div className="relative">
              <div className="rounded-3xl overflow-hidden h-[480px] md:h-[560px]">
                <SmartImage src="https://viknaroff.ua/wp-content/uploads/2024/05/banner.webp" alt="Viknar'off виробництво" width={1000} className="w-full h-full object-cover transition-transform duration-1000 hover:scale-105" />
              </div>
              <div className="absolute -bottom-4 right-0 md:-right-2 bg-[#FF5722] text-white p-6 md:p-8 rounded-3xl shadow-2xl max-w-xs z-10">
                <div className="font-display text-5xl md:text-6xl font-bold leading-none">19<span className="text-white/70 text-3xl">+</span></div>
                <div className="text-sm mt-2 text-white/90">років досвіду на ринку європейських вікон</div>
              </div>
            </div>

            <div className="relative z-20">
              <span className="inline-block px-3 py-1 rounded-full bg-[#FF5722]/10 text-[#FF5722] text-xs font-semibold uppercase tracking-wider mb-4">Про компанію</span>
              <h2 className="font-display text-4xl md:text-5xl font-bold leading-[1.05] mb-6">
                VIKNAR'OFF — <span className="text-[#FF5722]">майстер</span> віконної справи
              </h2>
              <p className="text-[#5a5a5a] mb-4 leading-relaxed">
                Один з найбільших виробників ПВХ конструкцій в Україні. Потужність заводу — 50 000 м², що дозволяє виготовляти більше 100 000 конструкцій будь-якого типу.
              </p>
              <p className="text-[#5a5a5a] mb-8 leading-relaxed">
                Наш салон магазин у Вінниці працює для того, щоб кожен мешканець міста отримав вікна найвищої якості за справедливою ціною.
              </p>
              <ul className="space-y-3">
                {[
                  "Повний цикл виробництва",
                  "Власний імпорт матеріалів з ЄС",
                  "Європейське обладнання Schirmer, Urban, Rotox",
                  "Експорт у 12 країн світу",
                  "Сертифіковане виробництво",
                ].map((t) => (
                  <li key={t} className="flex items-center gap-3">
                    <CheckCircle2 size={20} className="text-[#FF5722] shrink-0" />
                    <span className="text-[#1a1a1a]">{t}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Partners marquee */}
      <section className="py-14 bg-white border-y border-[#f0e9e0] overflow-hidden">
        <div className="max-w-[1600px] mx-auto px-6 mb-8">
          <div className="flex items-center gap-4">
            <span className="text-xs uppercase tracking-[0.3em] text-[#999]">Наші партнери</span>
            <div className="flex-1 h-px bg-[#e6dfd5]" />
          </div>
        </div>
        <div className="relative">
          <div className="flex gap-16 animate-marquee whitespace-nowrap">
            {[...PARTNERS, ...PARTNERS].map((p, i) => (
              <span key={i} className="font-display text-4xl md:text-5xl font-bold text-[#1a1a1a]/15 hover:text-[#FF5722] transition-colors cursor-default">
                {p}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-pad bg-[#f5f1ec]">
        <div className="max-w-[1100px] mx-auto px-6">
          <div className="text-center mb-14">
            <span className="inline-block px-3 py-1 rounded-full bg-[#FF5722]/10 text-[#FF5722] text-xs font-semibold uppercase tracking-wider mb-4">FAQ</span>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.05]">
              Часто ставлять <span className="text-[#FF5722]">запитання</span>
            </h2>
          </div>
          <Accordion type="single" collapsible className="space-y-3">
            {FAQ_ITEMS.map((f, i) => (
              <AccordionItem key={i} value={`item-${i}`} className="bg-white rounded-2xl border border-[#f0e9e0] px-6 data-[state=open]:shadow-md transition-shadow">
                <AccordionTrigger className="font-display text-base md:text-lg font-semibold text-left hover:text-[#FF5722] py-5 hover:no-underline">
                  {f.q}
                </AccordionTrigger>
                <AccordionContent className="text-[#5a5a5a] text-sm md:text-base leading-relaxed pb-5">
                  {f.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>
    </>
  );
}
