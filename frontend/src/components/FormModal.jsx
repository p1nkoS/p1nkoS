import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Phone, User, MapPin, Send, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { createLead } from "../lib/api";

export default function FormModal({ open, onOpenChange, productSlug, productName }) {
  const [form, setForm] = useState({ name: "", phone: "", city: "", service: "Замір" });
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.phone.trim()) {
      toast.error("Вкажіть ім'я та телефон");
      return;
    }
    if (form.name.trim().length < 2) {
      toast.error("Ім'я надто коротке");
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
        city: form.city.trim() || null,
        service: form.service,
        product_slug: productSlug || null,
        product_name: productName || null,
        source: "modal-quick",
      });
      toast.success("Заявку успішно прийнято!", {
        description: "Ми передзвонимо протягом 15 хвилин",
      });
      setForm({ name: "", phone: "", city: "", service: "Замір" });
      onOpenChange(false);
    } catch (err) {
      const msg = err?.response?.data?.detail || err?.message || "Не вдалося відправити заявку";
      toast.error(msg, { description: "Спробуйте ще раз або зателефонуйте напряму" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md rounded-3xl border-0 p-0 overflow-hidden max-h-[95vh] overflow-y-auto">
        <div className="bg-gradient-to-br from-[#FF5722] to-[#e64a17] p-6 sm:p-8 text-white">
          <DialogHeader>
            <DialogTitle className="font-display text-xl sm:text-2xl md:text-3xl font-bold leading-tight text-white">
              Заявка на безкоштовний замір
            </DialogTitle>
            <DialogDescription className="text-white/90 text-sm">
              {productName ? `Розрахунок для: ${productName}` : "Обіцяємо не телефонувати о шостій ранку"}
            </DialogDescription>
          </DialogHeader>
        </div>
        <form onSubmit={submit} className="p-6 sm:p-7 space-y-4">
          <div className="relative">
            <User size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#999]" />
            <Input
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="Ваше ім'я"
              className="pl-11 h-12 rounded-xl border-[#e6dfd5] focus-visible:ring-[#FF5722]"
            />
          </div>
          <div className="relative">
            <Phone size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#999]" />
            <Input
              type="tel"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              placeholder="+380 (XX) XXX-XX-XX"
              className="pl-11 h-12 rounded-xl border-[#e6dfd5] focus-visible:ring-[#FF5722]"
            />
          </div>
          <div className="relative">
            <MapPin size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#999] z-10" />
            <Input
              value={form.city}
              onChange={(e) => setForm({ ...form, city: e.target.value })}
              placeholder="Місто (необов'язково)"
              className="pl-11 h-12 rounded-xl border-[#e6dfd5] focus-visible:ring-[#FF5722]"
            />
          </div>
          <Select value={form.service} onValueChange={(v) => setForm({ ...form, service: v })}>
            <SelectTrigger className="h-12 rounded-xl border-[#e6dfd5]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Консультація">Консультація</SelectItem>
              <SelectItem value="Замір">Безкоштовний замір</SelectItem>
              <SelectItem value="Розрахунок">Розрахунок вартості</SelectItem>
            </SelectContent>
          </Select>
          <Button
            type="submit"
            disabled={loading}
            className="btn-shimmer w-full h-14 bg-[#FF5722] hover:bg-[#e64a17] rounded-full text-base font-semibold disabled:opacity-70"
          >
            {loading ? (
              <>
                <Loader2 size={16} className="mr-2 animate-spin" /> Відправляємо...
              </>
            ) : (
              <>
                <Send size={16} className="mr-2" /> Замовити
              </>
            )}
          </Button>
          <p className="text-[11px] text-[#888] text-center leading-relaxed">
            Натискаючи кнопку, ви погоджуєтесь з обробкою персональних даних
          </p>
        </form>
      </DialogContent>
    </Dialog>
  );
}
