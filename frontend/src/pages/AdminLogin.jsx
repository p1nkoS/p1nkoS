import { Lock, LogIn } from "lucide-react";

export default function AdminLogin() {
  const handleLogin = () => {
    // REMINDER: DO NOT HARDCODE THE URL, OR ADD ANY FALLBACKS OR REDIRECT URLS, THIS BREAKS THE AUTH
    const redirectUrl = window.location.origin + "/admin/leads";
    window.location.href = `https://auth.emergentagent.com/?redirect=${encodeURIComponent(redirectUrl)}`;
  };

  return (
    <div data-testid="admin-login-page" className="min-h-screen bg-[#f5f1ec] flex items-center justify-center px-5">
      <div className="max-w-md w-full bg-white rounded-3xl border border-[#e6dfd5] p-8 md:p-10 shadow-sm">
        <div className="w-14 h-14 rounded-2xl bg-[#FF5722]/10 flex items-center justify-center mb-6">
          <Lock size={22} className="text-[#FF5722]" />
        </div>
        <h1 className="font-display text-3xl font-bold mb-2">Адмін-панель</h1>
        <p className="text-[#5a5a5a] text-sm mb-8">
          Доступ дозволено лише власникам акаунта Viknar'off. Увійдіть через Google,
          щоб переглядати заявки клієнтів.
        </p>
        <button
          data-testid="admin-google-login-btn"
          onClick={handleLogin}
          className="w-full inline-flex items-center justify-center gap-3 px-6 py-4 rounded-full bg-[#1a1a1a] hover:bg-[#FF5722] text-white transition-colors font-medium text-sm"
        >
          <LogIn size={16} />
          Увійти через Google
        </button>
        <p className="mt-6 text-[11px] text-[#888] text-center">
          Сесія діє 7 днів. Усі дії логуються.
        </p>
      </div>
    </div>
  );
}
