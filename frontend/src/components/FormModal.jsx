import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Phone, User, MapPin, Send } from "lucide-react";
import { toast } from "sonner";

export default function FormModal({ open, onOpenChange }) {
  const [form, setForm] = useState({ name: "", phone: "", city: "", service: "Замір" });

  const submit = (e) => {
    e.preventDefault();
    if (!form.name || !form.phone) {
      toast.error("Вкажіть ім'я та телефон");
      return;
    }
    toast.success("Ваша заявка успішно прийнята!", {
      description: "Ми передзвонимо протягом 15 хвилин",
    });
    setForm({ name: "", phone: "", city: "", service: "Замір" });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md rounded-3xl border-0 p-0 overflow-hidden">
        <div className="bg-gradient-to-br from-[#FF5722] to-[#e64a17] p-8 text-white">
          <DialogHeader>
            <DialogTitle className="font-display text-2xl md:text-3xl font-bold leading-tight text-white">Заявка на безкоштовний замір</DialogTitle>
            <DialogDescription className="text-white/90">Обіцяємо не телефонувати о шостій ранку</DialogDescription>
          </DialogHeader>
        </div>
        <form onSubmit={submit} className="p-7 space-y-4">
          <div className="relative">
            <User size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#999]" />
            <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Ваше ім'я" className="pl-11 h-12 rounded-xl border-[#e6dfd5] focus-visible:ring-[#FF5722]" />
          </div>
          <div className="relative">
            <Phone size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#999]" />
            <Input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="+380 (XX) XXX-XX-XX" className="pl-11 h-12 rounded-xl border-[#e6dfd5] focus-visible:ring-[#FF5722]" />
          </div>
          <div className="relative">
            <MapPin size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#999] z-10" />
            <Input value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} placeholder="Місто" className="pl-11 h-12 rounded-xl border-[#e6dfd5] focus-visible:ring-[#FF5722]" />
          </div>
          <Select value={form.service} onValueChange={(v) => setForm({ ...form, service: v })}>
            <SelectTrigger className="h-12 rounded-xl border-[#e6dfd5]"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="Консультація">Консультація</SelectItem>
              <SelectItem value="Замір">Замір</SelectItem>
            </SelectContent>
          </Select>
          <Button type="submit" className="btn-shimmer w-full h-14 bg-[#FF5722] hover:bg-[#e64a17] rounded-full text-base font-semibold">
            <Send size={16} className="mr-2" /> Замовити
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
