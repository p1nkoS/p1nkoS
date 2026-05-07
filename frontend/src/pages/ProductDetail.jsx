import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import FormModal from "../components/FormModal";
import { Button } from "../components/ui/button";
import { ArrowRight, ArrowLeft, ChevronRight, Volume2, Layers, Box, Globe, ShieldCheck, CheckCircle2, Phone, Send, Mail, MessageCircle, Sparkles, Award, Wrench } from "lucide-react";
import { getProductBySlug, getProductsByCategory, CATEGORIES } from "../data/products";
import { SITE_CONFIG } from "../data/mock";

export default function ProductDetail() {
  const { slug } = useParams();
  const product = getProductBySlug(slug);
  const [formOpen, setFormOpen] = useState(false);
  const [activeImg, setActiveImg] = useState(0);
  const [showFloating, setShowFloating] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    setActiveImg(0);
    const onScroll = () => setShowFloating(window.scrollY > 600);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [slug]);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">Продукт не знайдено</h1>
          <Link to="/" className="text-[#FF5722] hover:underline">Додому →</Link>
        </div>
      </div>
    );
  }

  const category = CATEGORIES[product.category];
  const related = getProductsByCategory(product.category).filter((p) => p.slug !== slug).slice(0, 3);

  return (
    <div className="min-h-screen bg-[#f5f1ec]">
      <Header onOpenForm={() => setFormOpen(true)} />

      {/* Breadcrumbs */}
      <div className="pt-28 lg:pt-32 pb-4">
        <div className="max-w-[1400px] mx-auto px-6">
          <nav className="flex items-center gap-2 text-xs text-[#888] flex-wrap">
            <Link to="/" className="hover:text-[#FF5722]">Головна</Link>
            <ChevronRight size={12} />
            <Link to={`/catalog/${category.slug}`} className="hover:text-[#FF5722]">{category.title}</Link>
            <ChevronRight size={12} />
            <span className="text-[#1a1a1a]">{product.name}</span>
          </nav>
        </div>
      </div>

      {/* Main */}
      <section className="pb-12 lg:pb-16">
        <div className="max-w-[1400px] mx-auto px-6 grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Gallery */}
          <div>
            <div className="relative bg-white rounded-3xl overflow-hidden aspect-[4/3] mb-4">
              {product.badge && <span className="ribbon-tag">{product.badge}</span>}
              <img src={product.images[activeImg]} alt={product.name} className="w-full h-full object-cover" />
            </div>
            {product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-3">
                {product.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImg(i)}
                    className={`aspect-square rounded-2xl overflow-hidden border-2 transition-all ${
                      i === activeImg ? "border-[#FF5722]" : "border-transparent opacity-60 hover:opacity-100"
                    }`}
                  >
                    <img src={img} alt={`thumb-${i}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Info */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="px-3 py-1 rounded-full bg-[#FF5722]/10 text-[#FF5722] text-xs font-semibold uppercase tracking-wider">{product.brand}</span>
              <span className="px-3 py-1 rounded-full bg-white border border-[#e6dfd5] text-xs text-[#5a5a5a]">{product.country}</span>
            </div>
            <h1 className="font-display text-4xl lg:text-5xl font-bold mb-4 leading-tight">{product.name}</h1>
            <p className="text-[#5a5a5a] text-base mb-7 leading-relaxed">{product.description}</p>

            {/* Price card */}
            <div className="bg-white rounded-3xl p-7 mb-6 border border-[#f0e9e0]">
              <div className="flex items-end justify-between mb-5">
                <div>
                  <div className="text-xs text-[#888] uppercase tracking-wider mb-1">Ціна від</div>
                  <div className="font-display text-4xl font-bold text-[#1a1a1a]">
                    {product.price.toLocaleString()} <span className="text-2xl text-[#FF5722]">₴</span>
                    <span className="text-sm text-[#888] font-normal">/м²</span>
                  </div>
                </div>
                <span className="px-3 py-1 rounded-full bg-green-50 text-green-700 text-xs font-semibold">в наявності</span>
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <Button onClick={() => setFormOpen(true)} className="btn-shimmer flex-1 bg-[#FF5722] hover:bg-[#e64a17] text-white rounded-full py-7 font-semibold">
                  <Send size={16} className="mr-2" /> Отримати розрахунок
                </Button>
                <a href={`tel:+38${SITE_CONFIG.phones[0].replace(/\D/g, "")}`} className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-full border-2 border-[#1a1a1a] hover:bg-[#1a1a1a] hover:text-white transition-all text-sm font-medium">
                  <Phone size={16} /> Зателефонувати
                </a>
              </div>
            </div>

            {/* Quick contact */}
            <div className="grid grid-cols-2 gap-3">
              <a href={SITE_CONFIG.telegram} target="_blank" rel="noreferrer" className="flex items-center gap-3 p-4 rounded-2xl bg-white hover:bg-[#1a1a1a] hover:text-white transition-colors border border-[#f0e9e0] group">
                <span className="w-10 h-10 rounded-xl bg-[#0088cc]/10 group-hover:bg-[#0088cc] flex items-center justify-center transition-colors">
                  <MessageCircle size={18} className="text-[#0088cc] group-hover:text-white" />
                </span>
                <div>
                  <div className="text-[10px] uppercase tracking-wider opacity-60">Telegram</div>
                  <div className="text-sm font-semibold">@viknaroffvin</div>
                </div>
              </a>
              <a href={SITE_CONFIG.mailto} className="flex items-center gap-3 p-4 rounded-2xl bg-white hover:bg-[#1a1a1a] hover:text-white transition-colors border border-[#f0e9e0] group">
                <span className="w-10 h-10 rounded-xl bg-[#FF5722]/10 group-hover:bg-[#FF5722] flex items-center justify-center transition-colors">
                  <Mail size={18} className="text-[#FF5722] group-hover:text-white" />
                </span>
                <div>
                  <div className="text-[10px] uppercase tracking-wider opacity-60">Email</div>
                  <div className="text-sm font-semibold">{SITE_CONFIG.email}</div>
                </div>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Specs */}
      <section className="pb-12 lg:pb-16">
        <div className="max-w-[1400px] mx-auto px-6">
          <h2 className="font-display text-3xl lg:text-4xl font-bold mb-8"><span className="text-[#FF5722]">Характеристики</span> та переваги</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-3xl p-7 border border-[#f0e9e0]">
              <h3 className="font-display font-bold text-lg mb-5">Технічні дані</h3>
              <ul className="space-y-4">
                {product.soundproof > 0 && (
                  <li className="flex items-center justify-between pb-4 border-b border-[#f0e9e0]">
                    <span className="flex items-center gap-3 text-[#5a5a5a]"><Volume2 size={18} className="text-[#FF5722]" /> Шумоізоляція</span>
                    <span className="font-semibold">до {product.soundproof} дБ</span>
                  </li>
                )}
                {product.depth > 0 && (
                  <li className="flex items-center justify-between pb-4 border-b border-[#f0e9e0]">
                    <span className="flex items-center gap-3 text-[#5a5a5a]"><Layers size={18} className="text-[#FF5722]" /> Монтажна глибина</span>
                    <span className="font-semibold">{product.depth} мм</span>
                  </li>
                )}
                {product.chambers > 0 && (
                  <li className="flex items-center justify-between pb-4 border-b border-[#f0e9e0]">
                    <span className="flex items-center gap-3 text-[#5a5a5a]"><Box size={18} className="text-[#FF5722]" /> Кількість камер</span>
                    <span className="font-semibold">{product.chambers}</span>
                  </li>
                )}
                <li className="flex items-center justify-between pb-4 border-b border-[#f0e9e0]">
                  <span className="flex items-center gap-3 text-[#5a5a5a]"><Sparkles size={18} className="text-[#FF5722]" /> Склопакет</span>
                  <span className="font-semibold">{product.glass}</span>
                </li>
                <li className="flex items-center justify-between pb-4 border-b border-[#f0e9e0]">
                  <span className="flex items-center gap-3 text-[#5a5a5a]"><Award size={18} className="text-[#FF5722]" /> Бренд</span>
                  <span className="font-semibold">{product.brand}</span>
                </li>
                <li className="flex items-center justify-between">
                  <span className="flex items-center gap-3 text-[#5a5a5a]"><Globe size={18} className="text-[#FF5722]" /> Країна-виробник</span>
                  <span className="font-semibold">{product.country}</span>
                </li>
              </ul>
            </div>

            <div className="bg-[#1a1a1a] text-white rounded-3xl p-7 relative overflow-hidden">
              <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-[#FF5722]/30 blur-3xl pointer-events-none" />
              <h3 className="font-display font-bold text-lg mb-5 relative">Особливості</h3>
              <ul className="space-y-4 relative">
                {product.features.map((f, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle2 size={20} className="text-[#FF5722] shrink-0 mt-0.5" />
                    <span className="text-white/90">{f}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-7 pt-7 border-t border-white/10 grid grid-cols-3 gap-3 text-center relative">
                <div>
                  <ShieldCheck size={22} className="mx-auto mb-2 text-[#FF5722]" />
                  <div className="text-xs text-white/70">Гарантія</div>
                  <div className="font-semibold text-sm">15 років</div>
                </div>
                <div>
                  <Wrench size={22} className="mx-auto mb-2 text-[#FF5722]" />
                  <div className="text-xs text-white/70">Монтаж</div>
                  <div className="font-semibold text-sm">1–3 дні</div>
                </div>
                <div>
                  <Award size={22} className="mx-auto mb-2 text-[#FF5722]" />
                  <div className="text-xs text-white/70">Якість</div>
                  <div className="font-semibold text-sm">Європа</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related */}
      {related.length > 0 && (
        <section className="pb-16">
          <div className="max-w-[1400px] mx-auto px-6">
            <div className="flex items-end justify-between mb-8">
              <h2 className="font-display text-3xl lg:text-4xl font-bold">Може <span className="text-[#FF5722]">сподобатися</span></h2>
              <Link to={`/catalog/${category.slug}`} className="hidden sm:inline-flex items-center gap-1.5 text-[#FF5722] hover:gap-2 transition-all text-sm font-medium">
                Усі {category.title.toLowerCase()} <ArrowRight size={16} />
              </Link>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {related.map((p) => (
                <Link key={p.slug} to={`/product/${p.slug}`} className="bg-white rounded-3xl overflow-hidden card-hover relative group">
                  {p.badge && <span className="ribbon-tag">{p.badge}</span>}
                  <div className="img-zoom h-52 overflow-hidden">
                    <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="p-6">
                    <h3 className="font-display text-xl font-bold mb-2 group-hover:text-[#FF5722] transition-colors">{p.name}</h3>
                    <div className="flex items-center justify-between">
                      <div className="font-display font-bold">{p.price.toLocaleString()} ₴<span className="text-xs text-[#888] font-normal">/м²</span></div>
                      <ArrowRight size={16} className="text-[#FF5722] group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <Footer />
      <FormModal open={formOpen} onOpenChange={setFormOpen} />

      <a
        href="tel:+380687239722"
        className={`fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full bg-[#FF5722] hover:bg-[#e64a17] text-white shadow-2xl shadow-[#FF5722]/40 flex items-center justify-center transition-all duration-300 ${
          showFloating ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <span className="absolute inset-0 rounded-full bg-[#FF5722] animate-ping opacity-30" />
        <Phone size={20} className="relative" />
      </a>
    </div>
  );
}
