"use client";

import { Lock, Loader2 } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";

// Simple Skeleton component for loading placeholders
function Skeleton({ height }: { height: number }) {
  return (
    <div
      style={{ height, backgroundColor: "#27272a", borderRadius: 4 }}
      className="w-full animate-pulse mb-1"
    />
  );
}

export default function SslCheckerPage() {
  const [domain, setDomain] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState<any>(null);
  const [history, setHistory] = useState<any[]>([]);
  const [successMsg, setSuccessMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setResult(null);
    setSuccessMsg("");
    setLoading(true);

    try {
      const res = await fetch("/api/ssl", {
        method: "POST",
        body: JSON.stringify({ domain }),
      });

      const data = await res.json();
      if (!data.success) {
        setError(data.error || "Erreur inattendue.");
      } else if (!data.data) {
        setError("Aucune donnée reçue.");
      } else {
        setResult(data.data);
        setSuccessMsg("✅ Vérification réussie.");
        setHistory((prev) => [{ domain, data: data.data }, ...prev.slice(0, 4)]);
      }
    } catch (err) {
      setError("Erreur de connexion serveur.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="flex items-center gap-3 mb-4">
        <Lock size={28} className="text-yellow-400" />
        <h1 className="text-2xl font-bold text-white">SSL Checker</h1>
      </div>

      <p className="text-gray-400">
        Vérifiez les informations de certificat SSL d’un domaine.
      </p>

      <form
        onSubmit={handleSubmit}
        className="bg-gray-900 border border-gray-800 p-5 rounded-lg space-y-4"
      >
        <div className="space-y-2">
          <input
            id="domain"
            type="text"
            required
            placeholder="ex: facebook.com"
            value={domain}
            onChange={(e) => setDomain(e.target.value)}
            className="w-full px-4 py-2 rounded bg-gray-800 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="bg-yellow-400 text-black px-6 py-2 rounded hover:bg-yellow-500 transition"
        >
          {loading ? <Loader2 className="animate-spin inline-block mr-2" /> : "Vérifier SSL"}
        </button>
        {error && <p className="text-red-500 text-sm">{error}</p>}
        {successMsg && <p className="text-green-400 text-sm">{successMsg}</p>}
      </form>

      {/* 🔄 Skeleton Loader */}
      {loading && (
        <div className="animate-pulse bg-gray-950 border border-gray-800 p-5 rounded-lg space-y-2">
          <div className="h-4 w-1/2 bg-gray-800 rounded" />
          <div className="h-3 w-full bg-gray-800 rounded" />
          <div className="h-3 w-3/4 bg-gray-800 rounded" />
          <div className="h-3 w-2/3 bg-gray-800 rounded" />
        </div>
      )}
      {loading && (
        <div className="space-y-2">
          <Skeleton height={20} />
          <Skeleton height={20} />
          <Skeleton height={20} />
        </div>
      )}

      {/* ✅ Résultat */}
      {result && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gray-950 border border-gray-800 p-5 rounded-lg space-y-2"
        >
          <h2 className="text-lg text-white font-semibold mb-3">Détails SSL</h2>
          <div className="text-sm text-green-400 space-y-1">
            <div><strong>Domaine :</strong> {domain}</div>
            <div><strong>Valide :</strong> {result.valid ? "✅ Oui" : "❌ Non"}</div>
            <div><strong>Date de début :</strong> {result.valid_from || "N/A"}</div>
            <div><strong>Date d’expiration :</strong> {result.valid_to || "N/A"}</div>
            <div><strong>Autorité :</strong> {result.issuer || "Inconnue"}</div>
            <div><strong>Chiffrement :</strong> {result.protocol || "N/A"} - {result.key_type || "N/A"}</div>
          </div>
        </motion.div>
      )}

      {/* 🕘 Historique sécurisé */}
      {history.length > 0 && (
        <div className="bg-gray-900 border border-gray-700 rounded-lg p-4 mt-4">
          <h3 className="text-white font-semibold mb-2">Historique</h3>
          <ul className="text-sm text-gray-400 space-y-1">
            {history.map((entry, index) => (
              <li key={index}>
                <strong>{entry.domain}</strong> – expire le{" "}
                {entry.data?.valid_to ?? "Date inconnue"}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
