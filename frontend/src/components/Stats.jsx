import { useEffect, useRef, useState } from "react";
import { STATS } from "../data/mock";

function Counter({ value, suffix }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting && !started.current) {
            started.current = true;
            const dur = 1800;
            const start = Date.now();
            const tick = () => {
              const elapsed = Date.now() - start;
              const p = Math.min(elapsed / dur, 1);
              const eased = 1 - Math.pow(1 - p, 3);
              setCount(Math.floor(value * eased));
              if (p < 1) requestAnimationFrame(tick);
            };
            tick();
          }
        });
      },
      { threshold: 0.3 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [value]);

  return (
    <div
      ref={ref}
      className="font-display text-[40px] sm:text-5xl md:text-6xl font-bold tracking-tight leading-none"
    >
      {count.toLocaleString()}
      <span className="text-[#FF5722]">{suffix}</span>
    </div>
  );
}

export default function Stats() {
  return (
    <section className="py-16 md:py-24 bg-[#1a1a1a] text-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-25 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-[#FF5722]/30 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-[#FF5722]/15 rounded-full blur-3xl" />
      </div>

      <div className="max-w-[1400px] mx-auto px-5 md:px-6 relative">
        {/* Header — stacked clean */}
        <div className="max-w-3xl mx-auto text-center mb-12 md:mb-16">
          <span className="inline-block px-3 py-1 rounded-full bg-white/10 text-white text-[11px] font-semibold uppercase tracking-[0.2em] mb-5">
            VIKNAR'OFF у цифрах
          </span>
          <h2 className="font-display text-[28px] sm:text-4xl md:text-5xl font-bold leading-[1.15]">
            Надійний партнер з{" "}
            <span className="text-[#FF5722] whitespace-nowrap">19-річним досвідом</span>
          </h2>
        </div>

        {/* Stats grid — clean rows, no overlap */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-10 md:gap-y-0">
          {STATS.map((s, i) => (
            <div
              key={s.label}
              className={`flex flex-col items-center md:items-start text-center md:text-left ${
                i < STATS.length - 1 ? "md:border-r md:border-white/10 md:pr-4" : ""
              }`}
            >
              <Counter value={s.value} suffix={s.suffix} />
              <div className="text-white/60 text-[11px] sm:text-xs md:text-sm mt-3 md:mt-4 uppercase tracking-wider">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
