
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "@/services/auth";

export default function Login() {
  const [username, setU] = useState("");
  const [password, setP] = useState("");
  const [loading, setL] = useState(false);
  const [error, setE] = useState<string | null>(null);
  const nav = useNavigate();

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setL(true); setE(null);
    try {
      await login(username, password);
      nav("/");
    } catch {
      setE("Invalid credentials");
    } finally { setL(false); }
  };

  return (
    <form onSubmit={submit} className="max-w-sm mx-auto space-y-3 mt-16">
      <input className="border p-2 w-full" placeholder="Username" value={username} onChange={e=>setU(e.target.value)} />
      <input className="border p-2 w-full" placeholder="Password" type="password" value={password} onChange={e=>setP(e.target.value)} />
      {error && <div className="text-red-600 text-sm">{error}</div>}
      <button disabled={loading} className="bg-black text-white px-4 py-2 rounded">{loading ? "Signing in..." : "Sign in"}</button>
    </form>
  );
}
