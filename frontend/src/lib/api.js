import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
export const API = `${BACKEND_URL}/api`;

const client = axios.create({
  baseURL: API,
  timeout: 15000,
  headers: { "Content-Type": "application/json" },
});

export async function createLead(payload) {
  const res = await client.post("/leads", payload);
  return res.data;
}

export async function listLeads(params = {}) {
  const res = await client.get("/leads", { params });
  return res.data;
}

export default client;
