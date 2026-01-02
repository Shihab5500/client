
import { getAuth } from "firebase/auth";

const API_BASE_URL =
  import.meta.env.VITE_API_URL ||
  (import.meta.env.MODE === "development" ? "http://localhost:5000" : "");

const getAuthToken = async () => {
  const user = getAuth().currentUser;
  if (!user) return null;
  return await user.getIdToken(true);
};

const api = async (endpoint, options = {}) => {
  if (!API_BASE_URL) {
    throw new Error("VITE_API_URL is missing. Set it in Vercel env variables.");
  }

  const token = await getAuthToken();

  const headers = {
    "Content-Type": "application/json",
    ...options.headers,
  };

  if (token) headers.Authorization = `Bearer ${token}`;

  const config = { ...options, headers };
  if (options.body) config.body = JSON.stringify(options.body);

  const res = await fetch(`${API_BASE_URL}${endpoint}`, config);

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(text || "Request failed");
  }

  if (res.status === 204) return null;

  const ct = res.headers.get("content-type") || "";
  if (ct.includes("application/json")) return await res.json();
  return await res.text();
};

export default api;

