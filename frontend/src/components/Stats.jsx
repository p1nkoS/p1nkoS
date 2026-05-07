import { useEffect, useRef, useState } from "react";
import { STATS } from "../data/mock";

function Counter({ value, suffix }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    const obs = new IntersectionObserver((entries) => {
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
    }, { threshold: 0.3 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [value]);

  return (
    <span ref={ref} className="font-display text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight">
      {count.toLocaleString()}<span className="text-[#FF5722]">{suffix}</span>
    </span>
  );
}

export default function Stats() {
  return (
    <section className="py-20 bg-[#1a1a1a] text-white relative overflow-hidden grain-overlay">
      <div className="absolute inset-0 opacity-30 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#FF5722]/30 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#FF5722]/20 rounded-full blur-3xl" />
      </div>
      <div className="max-w-[1400px] mx-auto px-6 relative">
        <div className="text-center mb-14">
          <span className="inline-block px-3 py-1 rounded-full bg-white/10 text-white text-xs font-semibold uppercase tracking-wider mb-4">VIKNAR'OFF у цифрах</span>
          <h2 className="font-display text-3xl md:text-5xl font-bold leading-tight">Надійний партнер з <span className="text-[#FF5722]">19-річним досвідом</span></h2>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-4">
          {STATS.map((s) => (
            <div key={s.label} className="text-center md:text-left">
              <Counter value={s.value} suffix={s.suffix} />
              <div className="text-white/60 text-sm mt-3 uppercase tracking-wider">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
