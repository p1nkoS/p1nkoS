import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
export const API = `${BACKEND_URL}/api`;
const TOKEN_KEY = "viknaroff_session_token";

export const getToken = () => localStorage.getItem(TOKEN_KEY);
export const setToken = (t) => { if (t) localStorage.setItem(TOKEN_KEY, t); };
export const clearToken = () => localStorage.removeItem(TOKEN_KEY);

const client = axios.create({
  baseURL: API,
  timeout: 20000,
  headers: { "Content-Type": "application/json" },
});

client.interceptors.request.use((cfg) => {
  const t = getToken();
  if (t) cfg.headers.Authorization = `Bearer ${t}`;
  return cfg;
});

// Public
export async function createLead(payload) {
  const res = await client.post("/leads", payload);
  return res.data;
}

// Auth
export async function login(email, password) {
  const res = await client.post("/auth/login", { email, password });
  if (res.data?.session_token) setToken(res.data.session_token);
  return res.data;
}
export async function exchangeSession(session_id) {
  const res = await client.post("/auth/session", { session_id });
  if (res.data?.session_token) setToken(res.data.session_token);
  return res.data;
}
export async function fetchMe() {
  const res = await client.get("/auth/me");
  return res.data;
}
export async function logout() {
  try { await client.post("/auth/logout"); } finally { clearToken(); }
}

// Admin
export async function adminListLeads(params = {}) {
  const res = await client.get("/admin/leads", { params });
  return res.data;
}
export async function adminUpdateStatus(id, status) {
  const res = await client.patch(`/admin/leads/${id}/status`, null, { params: { status } });
  return res.data;
}
export async function adminDeleteLead(id) {
  const res = await client.delete(`/admin/leads/${id}`);
  return res.data;
}
export async function adminStats() {
  const res = await client.get("/admin/stats");
  return res.data;
}
export async function adminExportCsv() {
  const res = await fetch(`${API}/admin/leads/export.csv`, {
    headers: { Authorization: `Bearer ${getToken() || ""}` },
  });
  if (!res.ok) throw new Error("Export failed");
  const blob = await res.blob();
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url; a.download = "leads.csv";
  document.body.appendChild(a); a.click();
  a.remove(); URL.revokeObjectURL(url);
}

export default client;
