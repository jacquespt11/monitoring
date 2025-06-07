"use client";

import { useState } from "react";
import { Globe, Trash2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type DnsEntry = {
  id: number;
  domain: string;
  timestamp: string;
  records?: Record<string, any[]>;
  error?: string;
};

export default function DNSLookupPage() {
  const [input, setInput] = useState("");
  const [entries, setEntries] = useState<DnsEntry[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const timestamp = new Date().toLocaleString();
    const entry: DnsEntry = { id: Date.now(), domain: input, timestamp };

    try {
      const res = await fetch("/api/dns", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ domain: input }),
      });
      const data = await res.json();

      if (!res.ok || !data.success) {
        entry.error = data.error || "Erreur DNS Lookup";
      } else {
        entry.records = data.records;
      }
    } catch {
      entry.error = "Erreur réseau / API DNS";
    }

    setEntries((prev) => [entry, ...prev]);
    setInput("");
    setLoading(false);
  };

  const clearHistory = () => setEntries([]);

  return (
    <div className="max-w-3xl mx-auto space-y-6 p-6">
      <div className="flex items-center gap-3 mb-4">
        <Globe size={28} className="text-blue-400" />
        <h1 className="text-2xl font-bold text-white">DNS Lookup</h1>
      </div>
      <p className="text-gray-300">
        Entrez un nom de domaine pour obtenir les enregistrements DNS associés.
      </p>
      <form
        onSubmit={handleSubmit}
        className="bg-gray-900 border border-gray-800 p-5 rounded-lg flex gap-2 mb-4"
      >
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="ex: example.com"
          required
          className="flex-1 px-4 py-2 rounded bg-gray-800 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <motion.button
          type="submit"
          disabled={loading}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-blue-600 text-white px-6 py-2 rounded disabled:opacity-50"
        >
          {loading ? "Recherche..." : "Rechercher"}
        </motion.button>
      </form>

      <AnimatePresence>
        {entries.map((e, idx) => (
          <motion.div
            key={e.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="bg-gray-950 border border-gray-800 p-5 rounded-lg space-y-3"
          >
            <div className="flex justify-between">
              <span className="font-semibold text-white">{e.domain}</span>
              <span className="text-xs text-gray-400">{e.timestamp}</span>
            </div>

            {e.error ? (
              <div className="text-red-400">{e.error}</div>
            ) : (
              <div className="text-sm text-gray-300 space-y-2">
                {e.records && (
                  Object.entries(e.records).map(([type, list]) => (
                    <div key={type}>
                      <strong>{type}:</strong>{" "}
                      {list.length > 0 ? list.join(", ") : <span className="text-gray-500">Aucun</span>}
                    </div>
                  ))
                )}
              </div>
            )}

            {idx === entries.length - 1 && entries.length > 1 && (
              <button
                onClick={clearHistory}
                className="mt-2 text-sm text-red-400 hover:text-red-600 flex items-center gap-1"
              >
                <Trash2 size={14} /> Vider l'historique
              </button>
            )}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
