"use client";

import { useState } from "react";
import { Network, Trash2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type WhoisEntry = {
  id: number;
  domain: string;
  timestamp: string;
  data?: Record<string, any>;
  error?: string;
};

export default function WhoisPage() {
  const [input, setInput] = useState("");
  const [entries, setEntries] = useState<WhoisEntry[]>([]);
  const [loading, setLoading] = useState(false);

  const handleWhois = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const timestamp = new Date().toLocaleString();
    const entry: WhoisEntry = { id: Date.now(), domain: input, timestamp };

    try {
      const res = await fetch("/api/whois", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ domain: input }),
      });
      const data = await res.json();

      if (!res.ok || !data.success) {
        entry.error = data.error || "Erreur WHOIS";
      } else {
        entry.data = data.data;
      }
    } catch (e: any) {
      entry.error = "Erreur réseau / API WHOIS";
    }

    setEntries((prev) => [entry, ...prev]);
    setInput("");
    setLoading(false);
  };

  const clearHistory = () => setEntries([]);

  return (
    <div className="max-w-3xl mx-auto space-y-6 p-6">
      <div className="flex items-center gap-3 mb-4">
        <Network size={28} className="text-purple-400" />
        <h1 className="text-2xl font-bold text-white">Whois</h1>
      </div>
      <p className="text-gray-300">
        Entrez un nom de domaine pour obtenir des informations WHOIS.
      </p>
      <form
        onSubmit={handleWhois}
        className="bg-gray-900 border border-gray-800 p-5 rounded-lg flex gap-2"
      >
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="ex: example.com"
          required
          className="flex-1 px-4 py-2 rounded bg-gray-800 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
        <motion.button
          type="submit"
          disabled={loading}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-purple-600 text-white px-6 py-2 rounded disabled:opacity-50"
        >
          {loading ? "Chargement..." : "Analyser"}
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
            <div className="flex justify-between items-center">
              <span className="font-semibold text-white">{e.domain}</span>
              <span className="text-xs text-gray-400">{e.timestamp}</span>
            </div>

            {e.error ? (
              <div className="text-red-400">{e.error}</div>
            ) : (
              <div className="text-sm text-gray-300 space-y-1">
                {Object.entries(e.data!).slice(0, 6).map(([key, val]) => (
                  <div key={key}>
                    <strong>{key}:</strong> {String(val)}
                  </div>
                ))}
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
