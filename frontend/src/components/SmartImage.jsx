import { useState, useEffect, useRef } from "react";
import { optimizeUnsplash, blurPlaceholder } from "../lib/img";

/**
 * SmartImage – performant image with:
 * - tiny blurred placeholder
 * - intersection observer based lazy load (loads when 200px from viewport)
 * - fade-in on load
 * - automatic Unsplash optimization (webp + width)
 */
export default function SmartImage({
  src,
  alt = "",
  className = "",
  width = 1200,
  quality = 75,
  eager = false,
  ...rest
}) {
  const [loaded, setLoaded] = useState(false);
  const [inView, setInView] = useState(eager);
  const ref = useRef(null);

  useEffect(() => {
    if (eager) return;
    const node = ref.current;
    if (!node || typeof IntersectionObserver === "undefined") {
      setInView(true);
      return;
    }
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setInView(true);
            obs.disconnect();
          }
        });
      },
      { rootMargin: "200px 0px" }
    );
    obs.observe(node);
    return () => obs.disconnect();
  }, [eager]);

  const optimized = optimizeUnsplash(src, { w: width, q: quality });
  const blur = blurPlaceholder(src);

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`} {...rest}>
      {blur && (
        <img
          src={blur}
          alt=""
          aria-hidden="true"
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 scale-110 ${
            loaded ? "opacity-0" : "opacity-100"
          }`}
          style={{ filter: "blur(20px)" }}
        />
      )}
      {(inView || eager) && (
        <img
          src={optimized}
          alt={alt}
          loading={eager ? "eager" : "lazy"}
          decoding="async"
          onLoad={() => setLoaded(true)}
          className={`relative z-[1] w-full h-full object-cover transition-opacity duration-700 ${
            loaded ? "opacity-100" : "opacity-0"
          }`}
        />
      )}
    </div>
  );
}
