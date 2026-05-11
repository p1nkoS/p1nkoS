// Image optimization helper for Unsplash URLs
// Adds width, quality, format params and provides blur placeholder

export const optimizeUnsplash = (url, opts = {}) => {
  if (!url || !url.includes("unsplash.com")) return url;
  const { w = 1200, q = 75, fm = "webp" } = opts;
  const sep = url.includes("?") ? "&" : "?";
  // strip existing query
  const base = url.split("?")[0];
  return `${base}?auto=format&fit=crop&w=${w}&q=${q}&fm=${fm}`;
};

// Tiny blur placeholder (10px wide jpeg)
export const blurPlaceholder = (url) => {
  if (!url || !url.includes("unsplash.com")) return null;
  const base = url.split("?")[0];
  return `${base}?auto=format&fit=crop&w=20&q=20&blur=50`;
};
