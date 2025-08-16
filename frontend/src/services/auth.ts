
import { api } from "@/api/client";
export async function login(username: string, password: string) {
  const { data } = await api.post("/auth/token/", { username, password });
  localStorage.setItem("token", data.access);
  localStorage.setItem("refresh", data.refresh);
  return data;
}
export function logout() { localStorage.removeItem("token"); localStorage.removeItem("refresh"); }
