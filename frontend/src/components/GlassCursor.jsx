import { useEffect, useRef } from "react";

/**
 * Glass Cursor — m'якiй "скляний" курсор iз iнерцiєю.
 * Активний тiльки на десктопi (без сенсорних пристроїв).
 * Ховається коли мишка покидає вiкно.
 */
export default function GlassCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);

  useEffect(() => {
    // Не показуємо на сенсорних пристроях / у браузерах без hover
    if (typeof window === "undefined") return;
    const isTouch = window.matchMedia("(hover: none), (pointer: coarse)").matches;
    if (isTouch) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let mx = window.innerWidth / 2;
    let my = window.innerHeight / 2;
    let rx = mx, ry = my;       // ring (із інерцією)
    let dx = mx, dy = my;       // dot (швидкий)
    let visible = false;
    let raf = 0;

    const onMove = (e) => {
      mx = e.clientX;
      my = e.clientY;
      if (!visible) {
        visible = true;
        dot.style.opacity = "1";
        ring.style.opacity = "1";
      }
    };
    const onLeave = () => {
      visible = false;
      dot.style.opacity = "0";
      ring.style.opacity = "0";
    };
    const onDown = () => ring.classList.add("gc-active");
    const onUp = () => ring.classList.remove("gc-active");

    const isHoverable = (el) => {
      if (!el) return false;
      if (el.closest("a, button, [role=button], input, label, select, textarea, [data-cursor=hover]")) return true;
      return false;
    };
    const onOver = (e) => {
      if (isHoverable(e.target)) ring.classList.add("gc-hover");
      else ring.classList.remove("gc-hover");
    };

    const tick = () => {
      // ring slowly follows mouse (lerp 0.18)
      rx += (mx - rx) * 0.18;
      ry += (my - ry) * 0.18;
      // dot follows almost instantly (lerp 0.55)
      dx += (mx - dx) * 0.55;
      dy += (my - dy) * 0.55;
      dot.style.transform = `translate3d(${dx - 3}px, ${dy - 3}px, 0)`;
      ring.style.transform = `translate3d(${rx - 18}px, ${ry - 18}px, 0)`;
      raf = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseover", onOver, { passive: true });
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    document.documentElement.addEventListener("mouseleave", onLeave);
    document.documentElement.classList.add("gc-on");
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      document.documentElement.removeEventListener("mouseleave", onLeave);
      document.documentElement.classList.remove("gc-on");
    };
  }, []);

  return (
    <>
      <div ref={ringRef} className="glass-cursor-ring" data-testid="glass-cursor-ring" aria-hidden="true" />
      <div ref={dotRef} className="glass-cursor-dot" data-testid="glass-cursor-dot" aria-hidden="true" />
    </>
  );
}
