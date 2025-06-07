"use client";

import { Globe2 } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";

function Skeleton({ height }: { height: number }) {
  return (
    <div
      style={{ height, backgroundColor: "#27272a", borderRadius: 4 }}
      className="w-full animate-pulse mb-1"
    />
  );
}

export default function GeoIpPage() {
  const [ip, setIp] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState<any>(null);
  const [history, setHistory] = useState<any[]>([]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    setResult(null);

    try {
      const res = await fetch("/api/geoip", {
        method: "POST",
        body: JSON.stringify({ ip }),
      });

      const data = await res.json();
      if (!data.success) {
        setError(data.error || "Erreur inattendue.");
      } else {
        setResult(data.data);
        setHistory((prev) => [{ ip, data: data.data }, ...prev.slice(0, 4)]);
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
        <Globe2 size={28} className="text-green-400" />
        <h1 className="text-2xl font-bold text-white">GeoIP Lookup</h1>
      </div>

      <p className="text-gray-400">
        Entrez une adresse IP pour localiser géographiquement sa provenance.
      </p>

      <form onSubmit={handleSubmit} className="bg-gray-900 p-5 rounded-lg border border-gray-800 space-y-4">
        <div className="space-y-2">
          <label htmlFor="ip" className="text-sm text-gray-300">
            Adresse IP
          </label>
          <input
            id="ip"
            type="text"
            required
            placeholder="ex: 8.8.8.8"
            value={ip}
            onChange={(e) => setIp(e.target.value)}
            className="w-full px-4 py-2 rounded bg-gray-800 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-green-500 text-black px-6 py-2 rounded hover:bg-green-600 transition"
        >
          {loading ? "Chargement..." : "Localiser"}
        </button>

        {error && <p className="text-red-500 text-sm">{error}</p>}
      </form>
      {loading && (
        <div className="space-y-2 mt-4">
          <Skeleton height={20} />
          <Skeleton height={20} />
          <Skeleton height={20} />
        </div>
      )}
      {result && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gray-950 border border-gray-800 p-5 rounded-lg space-y-2"
        >
          <h2 className="text-lg text-white font-semibold mb-3">Résultat</h2>
          <div className="text-sm text-green-400 space-y-1">
            <div><strong>IP :</strong> {ip}</div>
            <div><strong>Pays :</strong> {result.country}</div>
            <div><strong>Région :</strong> {result.region}</div>
            <div><strong>Ville :</strong> {result.city}</div>
            <div><strong>Latitude / Longitude :</strong> {result.ll?.join(" / ")}</div>
            <div><strong>Fournisseur :</strong> {result.org || "Non spécifié"}</div>
          </div>
        </motion.div>
      )}

      {history.length > 0 && (
        <div className="bg-gray-900 border border-gray-700 rounded-lg p-4 mt-4">
          <h3 className="text-white font-semibold mb-2">Historique</h3>
          <ul className="text-sm text-gray-400 space-y-1">
            {history.map((entry, index) => (
              <li key={index}>
                <strong>{entry.ip}</strong> - {entry.data.country}, {entry.data.city}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
