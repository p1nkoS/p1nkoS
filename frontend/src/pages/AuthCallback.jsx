import { useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { exchangeSession } from "../lib/api";

export default function AuthCallback() {
  const navigate = useNavigate();
  const location = useLocation();
  const hasProcessed = useRef(false);

  useEffect(() => {
    if (hasProcessed.current) return;
    hasProcessed.current = true;

    const hash = location.hash || window.location.hash;
    const m = hash.match(/session_id=([^&]+)/);
    if (!m) {
      navigate("/admin", { replace: true });
      return;
    }
    const sessionId = m[1];

    (async () => {
      try {
        const user = await exchangeSession(sessionId);
        // strip hash
        window.history.replaceState(null, "", "/admin/leads");
        navigate("/admin/leads", { replace: true, state: { user } });
      } catch (e) {
        console.error("Auth exchange failed", e);
        navigate("/admin?error=auth", { replace: true });
      }
    })();
  }, [location.hash, navigate]);

  return (
    <div data-testid="auth-callback-loading" className="min-h-screen bg-[#f5f1ec] flex items-center justify-center">
      <div className="text-center">
        <div className="w-10 h-10 border-3 border-[#FF5722] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-[#5a5a5a] text-sm">Вхід…</p>
      </div>
    </div>
  );
}
