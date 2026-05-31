import { useState } from "react";
import { MapPin, Phone, Mail, Clock, Send, Globe, MessageCircle, Loader2 } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { toast } from "sonner";
import { SITE_CONFIG } from "../data/mock";
import { createLead } from "../lib/api";

export default function Contact() {
  const [form, setForm] = useState({ name: "", phone: "", service: "", message: "" });
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.phone.trim()) {
      toast.error("Вкажіть ім'я та телефон");
      return;
    }
    if (form.phone.replace(/\D/g, "").length < 5) {
      toast.error("Введіть коректний телефон");
      return;
    }
    setLoading(true);
    try {
      await createLead({
        name: form.name.trim(),
        phone: form.phone.trim(),
        service: form.service || null,
        message: form.message.trim() || null,
        source: "contact-form",
      });
      toast.success("Заявку відправлено!", {
        description: "Ми зв'яжемося з вами протягом 15 хвилин",
      });
      setForm({ name: "", phone: "", service: "", message: "" });
    } catch (err) {
      const msg = err?.response?.data?.detail || err?.message || "Помилка відправки";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="section-pad bg-white">
      <div className="max-w-[1600px] mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="inline-block px-3 py-1 rounded-full bg-[#FF5722]/10 text-[#FF5722] text-xs font-semibold uppercase tracking-wider mb-4">Контакти</span>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.05] mb-4">
            Зв'яжіться <span className="text-[#FF5722]">з нами</span>
          </h2>
          <p className="text-[#5a5a5a]">Ми завжди раді відповісти на ваші запитання та допомогти підібрати найкраще рішення.</p>
        </div>

        <div className="grid lg:grid-cols-5 gap-6">
          {/* Info side */}
          <div className="lg:col-span-2 space-y-4">
            <div className="p-7 rounded-3xl bg-[#1a1a1a] text-white">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-11 h-11 rounded-xl bg-[#FF5722] flex items-center justify-center">
                  <MapPin size={20} />
                </div>
                <h3 className="font-display text-xl font-bold">Адреса</h3>
              </div>
              <p className="text-white/70">{SITE_CONFIG.address}</p>
            </div>
            <div className="p-7 rounded-3xl bg-[#f5f1ec]">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-11 h-11 rounded-xl bg-white flex items-center justify-center">
                  <Phone size={20} className="text-[#FF5722]" />
                </div>
                <h3 className="font-display text-xl font-bold">Телефони</h3>
              </div>
              <div className="space-y-2">
                {SITE_CONFIG.phones.map((p) => (
                  <a key={p} href={`tel:+38${p.replace(/\D/g, "")}`} className="block text-[#1a1a1a] hover:text-[#FF5722] transition-colors font-medium">{p}</a>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-5 rounded-3xl bg-[#f5f1ec]">
                <Clock size={22} className="text-[#FF5722] mb-3" />
                <h4 className="font-semibold mb-1 text-sm">Графік</h4>
                <p className="text-xs text-[#5a5a5a]">Пн-Пт 9:00-17:00<br />Сб, Нд: Вихідний</p>
              </div>
              <div className="p-5 rounded-3xl bg-[#f5f1ec]">
                <Mail size={22} className="text-[#FF5722] mb-3" />
                <h4 className="font-semibold mb-1 text-sm">Email</h4>
                <a href={`mailto:${SITE_CONFIG.email}`} className="text-xs text-[#5a5a5a] hover:text-[#FF5722] break-all">{SITE_CONFIG.email}</a>
              </div>
            </div>
            <div className="p-7 rounded-3xl bg-gradient-to-br from-[#FF5722] to-[#e64a17] text-white">
              <Globe size={28} className="mb-3" />
              <h3 className="font-display text-xl font-bold mb-2">12 країн світу</h3>
              <p className="text-white/90 text-sm mb-5">Наші представництва: Україна, Норвегія, Італія, Нідерланди, Німеччина, Франція, Іспанія, Литва</p>
              <div className="grid grid-cols-2 gap-2">
                <a href={SITE_CONFIG.telegram} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center gap-2 py-2.5 rounded-full bg-white/15 hover:bg-white/25 text-white text-xs font-medium transition-colors backdrop-blur-md">
                  <MessageCircle size={14} /> Telegram
                </a>
                <a href={SITE_CONFIG.viber} className="inline-flex items-center justify-center gap-2 py-2.5 rounded-full bg-white/15 hover:bg-white/25 text-white text-xs font-medium transition-colors backdrop-blur-md">
                  <Phone size={14} /> Viber
                </a>
                <a href={SITE_CONFIG.instagram} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center gap-2 py-2.5 rounded-full bg-white/15 hover:bg-white/25 text-white text-xs font-medium transition-colors backdrop-blur-md">
                  Instagram
                </a>
                <a href={SITE_CONFIG.facebook} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center gap-2 py-2.5 rounded-full bg-white/15 hover:bg-white/25 text-white text-xs font-medium transition-colors backdrop-blur-md">
                  Facebook
                </a>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-3 p-8 md:p-10 rounded-3xl bg-[#f5f1ec]">
            <h3 className="font-display text-2xl md:text-3xl font-bold mb-2">Залишити заявку</h3>
            <p className="text-[#5a5a5a] mb-7 text-sm">Обіцяємо не телефонувати о шостій ранку</p>
            <form onSubmit={onSubmit} className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium mb-2 text-[#5a5a5a]">Ваше ім'я *</label>
                  <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Іван" className="bg-white rounded-xl h-12 border-[#e6dfd5] focus-visible:ring-[#FF5722]" />
                </div>
                <div>
                  <label className="block text-xs font-medium mb-2 text-[#5a5a5a]">Телефон *</label>
                  <Input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="+380 (XX) XXX-XX-XX" className="bg-white rounded-xl h-12 border-[#e6dfd5] focus-visible:ring-[#FF5722]" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium mb-2 text-[#5a5a5a]">Послуга</label>
                <Select value={form.service} onValueChange={(v) => setForm({ ...form, service: v })}>
                  <SelectTrigger className="bg-white rounded-xl h-12 border-[#e6dfd5]"><SelectValue placeholder="Оберіть послугу" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="vikna">Металопластикові вікна</SelectItem>
                    <SelectItem value="dveri">Вхідні двері</SelectItem>
                    <SelectItem value="balcony">Балкони та лоджії</SelectItem>
                    <SelectItem value="sliding">Розсувні системи</SelectItem>
                    <SelectItem value="rolety">Ролети та жалюзі</SelectItem>
                    <SelectItem value="pidvik">Підвіконня</SelectItem>
                    <SelectItem value="sitka">Москітні сітки</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="block text-xs font-medium mb-2 text-[#5a5a5a]">Повідомлення</label>
                <Textarea value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} placeholder="Додаткова інформація..." rows={4} className="bg-white rounded-xl border-[#e6dfd5] focus-visible:ring-[#FF5722]" />
              </div>
              <Button type="submit" disabled={loading} className="btn-shimmer w-full bg-[#FF5722] hover:bg-[#e64a17] rounded-full h-14 font-semibold text-[15px] disabled:opacity-70">
                {loading ? (<><Loader2 size={16} className="mr-2 animate-spin" /> Відправляємо...</>) : (<><Send size={16} className="mr-2" /> Надіслати заявку</>)}
              </Button>
            </form>
          </div>
        </div>

        {/* Map */}
        <div className="mt-10 rounded-3xl overflow-hidden shadow-xl">
          <iframe
            title="map"
            src="https://www.openstreetmap.org/export/embed.html?bbox=28.4500%2C49.2200%2C28.5000%2C49.2400&layer=mapnik&marker=49.2293%2C28.4711"
            className="w-full h-[420px] border-0"
            loading="lazy"
          />
        </div>
      </div>
    </section>
  );
}
