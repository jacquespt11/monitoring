"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Lock, Mail } from "lucide-react";
import { toast } from "react-hot-toast";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation rapide
    if (!email || !password) {
      toast.error("Tous les champs sont requis.");
      return;
    }

    // Simulation d'authentification
    if (email === "admin@reseau.com" && password === "123456") {
      localStorage.setItem("token", "faketoken123"); // ou appeler une vraie API
      toast.success("Connexion réussie !");
      router.push("/dashboard");
    } else {
      toast.error("Identifiants incorrects.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-950">
      <form
        onSubmit={handleLogin}
        className="bg-gray-900 p-8 rounded-lg shadow-md w-full max-w-md space-y-6"
      >
        <h2 className="text-2xl font-bold text-center text-white">Connexion</h2>

        <div className="flex items-center border border-gray-700 rounded px-3 py-2 bg-gray-800">
          <Mail className="text-gray-400 mr-2" />
          <input
            type="email"
            placeholder="Adresse email"
            className="bg-transparent outline-none w-full text-white"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="flex items-center border border-gray-700 rounded px-3 py-2 bg-gray-800">
          <Lock className="text-gray-400 mr-2" />
          <input
            type="password"
            placeholder="Mot de passe"
            className="bg-transparent outline-none w-full text-white"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 transition text-white font-semibold py-2 rounded"
        >
          Se connecter
        </button>

        <p className="text-center text-sm text-gray-500">
          Utilise : <code>admin@reseau.com</code> / <code>123456</code>
        </p>
      </form>
    </div>
  );
}
