import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { LogOut, Search, Download, Trash2, RefreshCw, Filter, ShieldCheck, Phone, MapPin, Calendar } from "lucide-react";
import {
  fetchMe, logout, adminListLeads, adminUpdateStatus,
  adminDeleteLead, adminStats, adminExportCsv,
} from "../lib/api";

const STATUS_OPTIONS = [
  { value: "new", label: "Нова", color: "bg-[#FF5722] text-white" },
  { value: "contacted", label: "В роботі", color: "bg-amber-500 text-white" },
  { value: "converted", label: "Закрита", color: "bg-emerald-600 text-white" },
  { value: "rejected", label: "Відмова", color: "bg-zinc-500 text-white" },
];

function StatusPill({ value, onChange }) {
  return (
    <select
      data-testid={`lead-status-select-${value}`}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="px-3 py-1.5 rounded-full text-xs font-semibold bg-white border border-[#e6dfd5] focus:outline-none focus:border-[#FF5722]"
    >
      {STATUS_OPTIONS.map((s) => (
        <option key={s.value} value={s.value}>{s.label}</option>
      ))}
    </select>
  );
}

function StatCard({ label, value, accent }) {
  return (
    <div className="bg-white border border-[#e6dfd5] rounded-2xl p-4 md:p-5">
      <div className="text-[10px] uppercase tracking-wider text-[#888] mb-1">{label}</div>
      <div className={`font-display text-2xl md:text-3xl font-bold ${accent || "text-[#1a1a1a]"}`}>{value}</div>
    </div>
  );
}

export default function AdminLeads() {
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState(location.state?.user || null);
  const [authChecked, setAuthChecked] = useState(!!location.state?.user);
  const [loading, setLoading] = useState(true);
  const [leads, setLeads] = useState([]);
  const [total, setTotal] = useState(0);
  const [stats, setStats] = useState(null);
  const [q, setQ] = useState("");
  const [status, setStatus] = useState("all");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [error, setError] = useState("");

  // Auth check
  useEffect(() => {
    if (authChecked) return;
    (async () => {
      try {
        const u = await fetchMe();
        if (!u.is_admin) {
          setError("Цей акаунт не має доступу до адмінки.");
          setTimeout(() => navigate("/admin", { replace: true }), 1500);
          return;
        }
        setUser(u);
      } catch (e) {
        navigate("/admin", { replace: true });
      } finally {
        setAuthChecked(true);
      }
    })();
  }, [authChecked, navigate]);

  const load = async () => {
    setLoading(true);
    try {
      const params = {};
      if (q) params.q = q;
      if (status !== "all") params.status = status;
      if (dateFrom) params.date_from = dateFrom;
      if (dateTo) params.date_to = dateTo;
      const [data, st] = await Promise.all([adminListLeads(params), adminStats()]);
      setLeads(data.items || []);
      setTotal(data.total || 0);
      setStats(st);
    } catch (e) {
      console.error(e);
      if (e?.response?.status === 401) navigate("/admin", { replace: true });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const handleSearch = (e) => { e.preventDefault(); load(); };

  const handleStatus = async (id, newStatus) => {
    try {
      await adminUpdateStatus(id, newStatus);
      setLeads((arr) => arr.map((l) => (l.id === id ? { ...l, status: newStatus } : l)));
      adminStats().then(setStats).catch(() => {});
    } catch (e) { console.error(e); }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Видалити заявку безповоротно?")) return;
    await adminDeleteLead(id);
    setLeads((arr) => arr.filter((l) => l.id !== id));
    setTotal((t) => Math.max(0, t - 1));
    adminStats().then(setStats).catch(() => {});
  };

  const handleLogout = async () => {
    try { await logout(); } catch {}
    navigate("/admin", { replace: true });
  };

  const handleExport = async () => {
    try {
      await adminExportCsv();
    } catch (e) {
      console.error("Export failed", e);
    }
  };

  const formatted = useMemo(() => leads.map((l) => ({
    ...l,
    _date: l.created_at ? new Date(l.created_at).toLocaleString("uk-UA", {
      day: "2-digit", month: "2-digit", year: "numeric",
      hour: "2-digit", minute: "2-digit",
    }) : "",
  })), [leads]);

  if (!authChecked) {
    return (
      <div className="min-h-screen bg-[#f5f1ec] flex items-center justify-center">
        <div className="w-10 h-10 border-3 border-[#FF5722] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div data-testid="admin-leads-page" className="min-h-screen bg-[#f5f1ec]">
      {/* Header */}
      <header className="bg-white border-b border-[#e6dfd5] sticky top-0 z-10">
        <div className="max-w-[1600px] mx-auto px-5 md:px-8 py-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#FF5722]/10 flex items-center justify-center">
              <ShieldCheck size={18} className="text-[#FF5722]" />
            </div>
            <div>
              <div className="font-display font-bold text-base md:text-lg">Адмін-панель Viknar'off</div>
              <div className="text-[11px] text-[#888]">{user?.email}</div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              data-testid="admin-refresh-btn"
              onClick={load}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#e6dfd5] text-sm hover:border-[#1a1a1a] transition-colors"
              disabled={loading}
            >
              <RefreshCw size={14} className={loading ? "animate-spin" : ""} /> Оновити
            </button>
            <button
              data-testid="admin-logout-btn"
              onClick={handleLogout}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm text-[#5a5a5a] hover:text-[#FF5722] transition-colors"
            >
              <LogOut size={14} /> Вийти
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-[1600px] mx-auto px-5 md:px-8 py-6 md:py-8">
        {error && (
          <div data-testid="admin-error" className="mb-4 p-4 rounded-2xl bg-red-50 border border-red-200 text-red-700 text-sm">
            {error}
          </div>
        )}

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 md:gap-4 mb-6">
          <StatCard label="Всього" value={stats?.total ?? "—"} />
          <StatCard label="Нові" value={stats?.new ?? "—"} accent="text-[#FF5722]" />
          <StatCard label="В роботі" value={stats?.contacted ?? "—"} accent="text-amber-600" />
          <StatCard label="Закриті" value={stats?.converted ?? "—"} accent="text-emerald-600" />
          <StatCard label="Відмови" value={stats?.rejected ?? "—"} accent="text-zinc-500" />
        </div>

        {/* Filters */}
        <form onSubmit={handleSearch} className="bg-white border border-[#e6dfd5] rounded-2xl p-4 md:p-5 mb-6 flex flex-col md:flex-row gap-3 md:items-end flex-wrap">
          <div className="flex-1 min-w-[200px]">
            <label className="text-[10px] uppercase tracking-wider text-[#888] mb-1 block">Пошук</label>
            <div className="relative">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#888]" />
              <input
                data-testid="admin-search-input"
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Імʼя, телефон, місто, продукт…"
                className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-[#e6dfd5] focus:outline-none focus:border-[#FF5722] text-sm"
              />
            </div>
          </div>
          <div>
            <label className="text-[10px] uppercase tracking-wider text-[#888] mb-1 block">Статус</label>
            <select
              data-testid="admin-status-filter"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="px-3 py-2.5 rounded-xl border border-[#e6dfd5] focus:outline-none focus:border-[#FF5722] text-sm bg-white"
            >
              <option value="all">Усі</option>
              {STATUS_OPTIONS.map((s) => <option key={s.value} value={s.value}>{s.label}</option>)}
            </select>
          </div>
          <div>
            <label className="text-[10px] uppercase tracking-wider text-[#888] mb-1 block">З дати</label>
            <input
              data-testid="admin-date-from"
              type="date" value={dateFrom} onChange={(e) => setDateFrom(e.target.value)}
              className="px-3 py-2.5 rounded-xl border border-[#e6dfd5] focus:outline-none focus:border-[#FF5722] text-sm"
            />
          </div>
          <div>
            <label className="text-[10px] uppercase tracking-wider text-[#888] mb-1 block">По дату</label>
            <input
              data-testid="admin-date-to"
              type="date" value={dateTo} onChange={(e) => setDateTo(e.target.value)}
              className="px-3 py-2.5 rounded-xl border border-[#e6dfd5] focus:outline-none focus:border-[#FF5722] text-sm"
            />
          </div>
          <div className="flex gap-2">
            <button
              data-testid="admin-apply-filter-btn"
              type="submit"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#1a1a1a] text-white text-sm hover:bg-[#FF5722] transition-colors"
            >
              <Filter size={14} /> Застосувати
            </button>
            <button
              data-testid="admin-export-csv-btn"
              type="button"
              onClick={handleExport}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border-2 border-[#1a1a1a] text-[#1a1a1a] text-sm hover:bg-[#1a1a1a] hover:text-white transition-colors"
            >
              <Download size={14} /> CSV
            </button>
          </div>
        </form>

        {/* Table */}
        <div className="bg-white border border-[#e6dfd5] rounded-2xl overflow-hidden">
          <div className="px-5 py-3 border-b border-[#e6dfd5] flex items-center justify-between">
            <div className="text-sm text-[#5a5a5a]">
              Показано <b className="text-[#1a1a1a]">{formatted.length}</b> з <b className="text-[#1a1a1a]">{total}</b>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-[#f5f1ec] text-[10px] uppercase tracking-wider text-[#888]">
                  <th className="text-left p-3 font-semibold">Дата</th>
                  <th className="text-left p-3 font-semibold">Імʼя</th>
                  <th className="text-left p-3 font-semibold">Телефон</th>
                  <th className="text-left p-3 font-semibold">Місто</th>
                  <th className="text-left p-3 font-semibold">Послуга</th>
                  <th className="text-left p-3 font-semibold">Продукт</th>
                  <th className="text-left p-3 font-semibold">Повідомлення</th>
                  <th className="text-left p-3 font-semibold">Статус</th>
                  <th className="p-3"></th>
                </tr>
              </thead>
              <tbody data-testid="admin-leads-table-body">
                {loading && (
                  <tr><td colSpan="9" className="p-10 text-center text-[#888]">Завантаження…</td></tr>
                )}
                {!loading && formatted.length === 0 && (
                  <tr><td colSpan="9" className="p-10 text-center text-[#888]">Заявок не знайдено</td></tr>
                )}
                {!loading && formatted.map((l) => (
                  <tr key={l.id} data-testid={`lead-row-${l.id}`} className="border-t border-[#e6dfd5] hover:bg-[#f5f1ec]/50">
                    <td className="p-3 whitespace-nowrap text-[#5a5a5a]">
                      <div className="flex items-center gap-1.5"><Calendar size={12} />{l._date}</div>
                    </td>
                    <td className="p-3 font-semibold">{l.name}</td>
                    <td className="p-3 whitespace-nowrap">
                      <a href={`tel:${l.phone}`} className="inline-flex items-center gap-1.5 text-[#1a1a1a] hover:text-[#FF5722]">
                        <Phone size={12} /> {l.phone}
                      </a>
                    </td>
                    <td className="p-3">
                      {l.city ? (<span className="inline-flex items-center gap-1 text-[#5a5a5a]"><MapPin size={12} />{l.city}</span>) : <span className="text-[#bbb]">—</span>}
                    </td>
                    <td className="p-3 text-[#5a5a5a]">{l.service || <span className="text-[#bbb]">—</span>}</td>
                    <td className="p-3 text-[#5a5a5a]">{l.product_name || l.product_slug || <span className="text-[#bbb]">—</span>}</td>
                    <td className="p-3 max-w-xs truncate text-[#5a5a5a]" title={l.message || ""}>{l.message || <span className="text-[#bbb]">—</span>}</td>
                    <td className="p-3">
                      <StatusPill value={l.status} onChange={(v) => handleStatus(l.id, v)} />
                    </td>
                    <td className="p-3">
                      <button
                        data-testid={`lead-delete-${l.id}`}
                        onClick={() => handleDelete(l.id)}
                        className="p-2 rounded-lg text-[#888] hover:text-red-600 hover:bg-red-50 transition-colors"
                        title="Видалити"
                      >
                        <Trash2 size={14} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
