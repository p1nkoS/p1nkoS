import { useMemo, useState, useEffect } from "react";
import { useParams, Link, useSearchParams } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import FormModal from "../components/FormModal";
import { Slider } from "../components/ui/slider";
import { Checkbox } from "../components/ui/checkbox";
import { Button } from "../components/ui/button";
import { CATEGORIES, getProductsByCategory } from "../data/products";
import { ArrowRight, ChevronRight, Filter, X, Volume2, Layers, Box, Globe, SlidersHorizontal } from "lucide-react";
import { Phone as PhoneIcon } from "lucide-react";
import SmartImage from "../components/SmartImage";
import FloatingActions from "../components/FloatingActions";

export default function CategoryPage() {
  const { slug } = useParams();
  const [searchParams] = useSearchParams();
  const category = CATEGORIES[slug];
  const all = useMemo(() => getProductsByCategory(slug), [slug]);

  const [formOpen, setFormOpen] = useState(false);
  const [filtersOpen, setFiltersOpen] = useState(false);

  // Filters
  const initBrand = searchParams.get("brand");
  const initCountry = searchParams.get("country");
  const [brands, setBrands] = useState(initBrand ? [initBrand] : []);
  const [countries, setCountries] = useState(initCountry ? [initCountry] : []);
  const [chambers, setChambers] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 20000]);
  const [soundMin, setSoundMin] = useState(0);
  const [sortBy, setSortBy] = useState("recommended");

  // Reset filters when category slug or query params change
  useEffect(() => {
    const b = searchParams.get("brand");
    const c = searchParams.get("country");
    setBrands(b ? [b] : []);
    setCountries(c ? [c] : []);
    setChambers([]);
    setSoundMin(0);
    setSortBy("recommended");
    window.scrollTo(0, 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug, searchParams.toString()]);

  // Reveal-on-scroll observer (re-attach when filtered items change)
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add("is-visible");
        });
      },
      { threshold: 0.05 }
    );
    document.querySelectorAll(".reveal").forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  });

  const allBrands = useMemo(() => [...new Set(all.map((p) => p.brand))].sort(), [all]);
  const allCountries = useMemo(() => [...new Set(all.map((p) => p.country))].sort(), [all]);
  const allChambers = useMemo(() => [...new Set(all.map((p) => p.chambers).filter((c) => c > 0))].sort((a, b) => a - b), [all]);
  const maxPrice = useMemo(() => Math.max(...all.map((p) => p.price), 0), [all]);

  useEffect(() => {
    setPriceRange([0, maxPrice]);
  }, [maxPrice]);

  const filtered = useMemo(() => {
    let res = all.filter((p) => {
      if (brands.length && !brands.includes(p.brand)) return false;
      if (countries.length && !countries.includes(p.country)) return false;
      if (chambers.length && !chambers.includes(p.chambers)) return false;
      if (p.price < priceRange[0] || p.price > priceRange[1]) return false;
      if (p.soundproof < soundMin) return false;
      return true;
    });
    if (sortBy === "price-asc") res = [...res].sort((a, b) => a.price - b.price);
    if (sortBy === "price-desc") res = [...res].sort((a, b) => b.price - a.price);
    if (sortBy === "sound") res = [...res].sort((a, b) => b.soundproof - a.soundproof);
    return res;
  }, [all, brands, countries, chambers, priceRange, soundMin, sortBy]);

  const toggle = (arr, setArr, val) => {
    setArr(arr.includes(val) ? arr.filter((x) => x !== val) : [...arr, val]);
  };

  const clearAll = () => {
    setBrands([]);
    setCountries([]);
    setChambers([]);
    setPriceRange([0, maxPrice]);
    setSoundMin(0);
  };

  if (!category) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">Категорію не знайдено</h1>
          <Link to="/" className="text-[#FF5722] hover:underline">Додому →</Link>
        </div>
      </div>
    );
  }

  const FilterPanel = () => (
    <div className="space-y-7">
      {/* Sort */}
      <div>
        <label className="block text-xs uppercase tracking-wider text-[#888] mb-3 font-semibold">Сортування</label>
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="w-full bg-white border border-[#e6dfd5] rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#FF5722]/30">
          <option value="recommended">Рекомендовані</option>
          <option value="price-asc">Спочатку дешевші</option>
          <option value="price-desc">Спочатку дорожчі</option>
          <option value="sound">Шумоізоляція</option>
        </select>
      </div>

      {/* Brands */}
      {allBrands.length > 0 && (
        <div>
          <label className="block text-xs uppercase tracking-wider text-[#888] mb-3 font-semibold">Бренд</label>
          <div className="space-y-2">
            {allBrands.map((b) => (
              <label key={b} className="flex items-center gap-3 cursor-pointer group">
                <Checkbox checked={brands.includes(b)} onCheckedChange={() => toggle(brands, setBrands, b)} className="data-[state=checked]:bg-[#FF5722] data-[state=checked]:border-[#FF5722]" />
                <span className="text-sm text-[#1a1a1a] group-hover:text-[#FF5722] transition-colors">{b}</span>
                <span className="text-xs text-[#999] ml-auto">{all.filter((p) => p.brand === b).length}</span>
              </label>
            ))}
          </div>
        </div>
      )}

      {/* Country */}
      <div>
        <label className="block text-xs uppercase tracking-wider text-[#888] mb-3 font-semibold">Країна</label>
        <div className="space-y-2">
          {allCountries.map((c) => (
            <label key={c} className="flex items-center gap-3 cursor-pointer group">
              <Checkbox checked={countries.includes(c)} onCheckedChange={() => toggle(countries, setCountries, c)} className="data-[state=checked]:bg-[#FF5722] data-[state=checked]:border-[#FF5722]" />
              <span className="text-sm text-[#1a1a1a] group-hover:text-[#FF5722] transition-colors">{c}</span>
              <span className="text-xs text-[#999] ml-auto">{all.filter((p) => p.country === c).length}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Chambers */}
      {allChambers.length > 0 && (
        <div>
          <label className="block text-xs uppercase tracking-wider text-[#888] mb-3 font-semibold">Камери</label>
          <div className="flex flex-wrap gap-2">
            {allChambers.map((c) => (
              <button
                key={c}
                onClick={() => toggle(chambers, setChambers, c)}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all border ${
                  chambers.includes(c)
                    ? "bg-[#FF5722] text-white border-[#FF5722]"
                    : "bg-white text-[#1a1a1a] border-[#e6dfd5] hover:border-[#FF5722]"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Price range */}
      <div>
        <label className="block text-xs uppercase tracking-wider text-[#888] mb-3 font-semibold">Ціна, ₴/м²</label>
        <Slider
          value={priceRange}
          onValueChange={setPriceRange}
          min={0}
          max={maxPrice}
          step={100}
          className="my-3"
        />
        <div className="flex items-center justify-between text-sm text-[#1a1a1a]">
          <span className="px-3 py-1 bg-[#f5f1ec] rounded-lg font-medium">{priceRange[0].toLocaleString()} ₴</span>
          <span className="px-3 py-1 bg-[#f5f1ec] rounded-lg font-medium">{priceRange[1].toLocaleString()} ₴</span>
        </div>
      </div>

      {/* Sound */}
      <div>
        <label className="block text-xs uppercase tracking-wider text-[#888] mb-3 font-semibold">Шумоізоляція від, дБ</label>
        <Slider value={[soundMin]} onValueChange={(v) => setSoundMin(v[0])} min={0} max={45} step={1} className="my-3" />
        <div className="text-sm text-[#1a1a1a] font-medium">від {soundMin} дБ</div>
      </div>

      <button onClick={clearAll} className="w-full py-3 rounded-xl border border-[#e6dfd5] hover:bg-[#1a1a1a] hover:text-white hover:border-[#1a1a1a] text-sm font-medium transition-all">
        Скинути фільтри
      </button>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#f5f1ec]">
      <Header onOpenForm={() => setFormOpen(true)} />

      {/* Header banner */}
      <section className="relative pt-32 pb-12 lg:pt-40 lg:pb-16 overflow-hidden">
        <div className="absolute inset-0">
          <SmartImage src={category.image} alt={category.title} eager width={1800} className="w-full h-full" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#1a1a1a]/90 via-[#1a1a1a]/75 to-[#1a1a1a]/40 z-[2]" />
        </div>
        <div className="relative z-[3] max-w-[1400px] mx-auto px-6 text-white">
          <nav className="flex items-center gap-2 text-xs text-white/70 mb-5">
            <Link to="/" className="hover:text-white">Головна</Link>
            <ChevronRight size={12} />
            <span className="text-white">{category.title}</span>
          </nav>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight">
            {category.title} <span className="text-[#FF5722]">від виробника</span>
          </h1>
          <p className="text-white/80 max-w-2xl text-base lg:text-lg">{category.description}</p>
        </div>
      </section>

      {/* Listing */}
      <section className="py-10 lg:py-14">
        <div className="max-w-[1400px] mx-auto px-6 grid lg:grid-cols-12 gap-8">
          {/* Sidebar filters - desktop */}
          <aside className="hidden lg:block lg:col-span-3">
            <div className="sticky top-32 bg-white rounded-3xl p-7 border border-[#f0e9e0]">
              <div className="flex items-center gap-2 mb-6">
                <SlidersHorizontal size={18} className="text-[#FF5722]" />
                <h3 className="font-display font-bold text-lg">Фільтри</h3>
              </div>
              <FilterPanel />
            </div>
          </aside>

          {/* Mobile filters trigger */}
          <div className="lg:hidden flex items-center justify-between gap-3">
            <button onClick={() => setFiltersOpen(true)} className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-white border border-[#e6dfd5] font-medium text-sm">
              <Filter size={16} /> Фільтри
            </button>
            <span className="text-sm text-[#888]">{filtered.length} результатів</span>
          </div>

          {/* Products grid */}
          <div className="lg:col-span-9">
            <div className="hidden lg:flex items-center justify-between mb-6">
              <p className="text-[#5a5a5a] text-sm">Знайдено <span className="font-bold text-[#1a1a1a]">{filtered.length}</span> з {all.length} продуктів</p>
              {(brands.length || countries.length || chambers.length || soundMin > 0) ? (
                <button onClick={clearAll} className="text-sm text-[#FF5722] hover:underline">Скинути всі</button>
              ) : null}
            </div>

            {filtered.length === 0 ? (
              <div className="bg-white rounded-3xl p-14 text-center">
                <div className="text-5xl mb-4">🔍</div>
                <h3 className="font-display text-xl font-bold mb-2">Нічого не знайдено</h3>
                <p className="text-[#888] text-sm mb-6">Спробуйте змінити фільтри</p>
                <Button onClick={clearAll} className="bg-[#FF5722] hover:bg-[#e64a17] rounded-full">Скинути фільтри</Button>
              </div>
            ) : (
              <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-5">
                {filtered.map((p) => (
                  <Link
                    key={p.slug}
                    to={`/product/${p.slug}`}
                    className="bg-white rounded-3xl overflow-hidden card-hover relative group reveal"
                  >
                    {p.badge && <span className="ribbon-tag">{p.badge}</span>}
                    <div className="h-56 overflow-hidden">
                      <SmartImage src={p.image} alt={p.name} width={600} className="w-full h-full transition-transform duration-700 group-hover:scale-110" />
                    </div>
                    <div className="p-6">
                      <h3 className="font-display text-xl font-bold mb-3 group-hover:text-[#FF5722] transition-colors">{p.name}</h3>
                      <div className="grid grid-cols-2 gap-2 mb-4 text-xs">
                        {p.soundproof > 0 && (
                          <span className="flex items-center gap-1.5 text-[#5a5a5a]"><Volume2 size={13} className="text-[#FF5722]" /> {p.soundproof} дБ</span>
                        )}
                        {p.depth > 0 && (
                          <span className="flex items-center gap-1.5 text-[#5a5a5a]"><Layers size={13} className="text-[#FF5722]" /> {p.depth} мм</span>
                        )}
                        {p.chambers > 0 && (
                          <span className="flex items-center gap-1.5 text-[#5a5a5a]"><Box size={13} className="text-[#FF5722]" /> {p.chambers} камер</span>
                        )}
                        <span className="flex items-center gap-1.5 text-[#5a5a5a]"><Globe size={13} className="text-[#FF5722]" /> {p.country}</span>
                      </div>
                      <div className="flex items-end justify-between pt-4 border-t border-[#f0e9e0]">
                        <div>
                          <div className="text-[11px] text-[#888] uppercase">від</div>
                          <div className="font-display text-xl font-bold text-[#1a1a1a]">{p.price.toLocaleString()} ₴<span className="text-xs text-[#888] font-normal">/м²</span></div>
                        </div>
                        <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-[#f5f1ec] group-hover:bg-[#FF5722] group-hover:text-white transition-colors">
                          <ArrowRight size={16} />
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* CTA Strip */}
      <section className="py-14">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="rounded-3xl bg-[#1a1a1a] text-white p-10 md:p-14 grid md:grid-cols-2 gap-8 items-center relative overflow-hidden">
            <div className="absolute -top-20 -right-20 w-72 h-72 rounded-full bg-[#FF5722]/30 blur-3xl pointer-events-none" />
            <div className="relative">
              <h3 className="font-display text-2xl md:text-4xl font-bold mb-3 leading-tight">Не впевнені в виборі?</h3>
              <p className="text-white/70">Наш консультант допоможе підібрати ідеальне рішення безкоштовно.</p>
            </div>
            <div className="flex sm:justify-end">
              <Button onClick={() => setFormOpen(true)} className="btn-shimmer bg-[#FF5722] hover:bg-[#e64a17] rounded-full px-7 py-7 text-sm font-semibold">
                <PhoneIcon size={16} className="mr-2" /> Замовити консультацію
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <FormModal open={formOpen} onOpenChange={setFormOpen} />

      {/* Mobile filter drawer */}
      {filtersOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/60" onClick={() => setFiltersOpen(false)} />
          <div className="absolute right-0 top-0 bottom-0 w-[85%] max-w-md bg-white overflow-y-auto p-7 animate-fade-up">
            <div className="flex items-center justify-between mb-7">
              <h3 className="font-display font-bold text-xl">Фільтри</h3>
              <button onClick={() => setFiltersOpen(false)} className="p-2 hover:bg-[#f5f1ec] rounded-full"><X size={18} /></button>
            </div>
            <FilterPanel />
            <Button onClick={() => setFiltersOpen(false)} className="w-full mt-6 bg-[#1a1a1a] rounded-full py-6">Показати {filtered.length} результатів</Button>
          </div>
        </div>
      )}

      <FloatingActions />
    </div>
  );
}
