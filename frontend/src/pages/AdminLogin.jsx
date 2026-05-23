import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Lock, LogIn, Mail } from "lucide-react";
import { login } from "../lib/api";
import { toast } from "sonner";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Будь ласка, заповніть усі поля");
      return;
    }
    setLoading(true);
    try {
      const user = await login(email, password);
      toast.success("Вхід успішний!");
      navigate("/admin/leads", { replace: true, state: { user } });
    } catch (err) {
      console.error(err);
      const msg = err.response?.data?.detail || "Помилка входу. Перевірте логін та пароль";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div data-testid="admin-login-page" className="min-h-screen bg-[#f5f1ec] flex items-center justify-center px-5">
      <div className="max-w-md w-full bg-white rounded-3xl border border-[#e6dfd5] p-8 md:p-10 shadow-sm">
        <div className="w-14 h-14 rounded-2xl bg-[#FF5722]/10 flex items-center justify-center mb-6">
          <Lock size={22} className="text-[#FF5722]" />
        </div>
        <h1 className="font-display text-3xl font-bold mb-2">Адмін-панель</h1>
        <p className="text-[#5a5a5a] text-sm mb-8">
          Доступ дозволено лише власникам акаунта Viknar'off. Увійдіть за допомогою вашого e-mail та пароля.
        </p>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs uppercase tracking-wider text-[#888] mb-2 font-semibold">E-mail</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-gray-400">
                <Mail size={16} />
              </span>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="example@gmail.com"
                className="w-full bg-white border border-[#e6dfd5] rounded-xl pl-11 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#FF5722]/30"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider text-[#888] mb-2 font-semibold">Пароль</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-gray-400">
                <Lock size={16} />
              </span>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-white border border-[#e6dfd5] rounded-xl pl-11 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#FF5722]/30"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            data-testid="admin-google-login-btn"
            className="w-full mt-2 inline-flex items-center justify-center gap-3 px-6 py-4 rounded-full bg-[#1a1a1a] hover:bg-[#FF5722] disabled:bg-gray-400 text-white transition-colors font-medium text-sm shadow-md"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                <LogIn size={16} />
                Увійти
              </>
            )}
          </button>
        </form>

        <p className="mt-6 text-[11px] text-[#888] text-center">
          Сесія діє 7 днів. Усі дії логуються.
        </p>
      </div>
    </div>
  );
}
