"use client";

import { useState } from "react";
import { Wifi, Clock, Trash2 } from "lucide-react";

type PingResult = {
  id: number;
  target: string;
  success: boolean;
  responseTime?: number;
  timestamp: string;
};

export default function PingPage() {
  const [target, setTarget] = useState("");
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState<PingResult[]>([]);

  const handlePing = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);
    setError(null);

    const timestamp = new Date().toLocaleString();
    const entry: PingResult = {
      id: Date.now(),
      target,
      success: false,
      timestamp,
    };

    try {
      const start = performance.now();
      await fetch(`https://${target}`, {
        method: "HEAD",
        mode: "no-cors",
        cache: "no-store",
      });
      const end = performance.now();
      const time = Math.round(end - start);
      setResult(`✔ Ping vers ${target} : ${time} ms`);
      entry.success = true;
      entry.responseTime = time;
    } catch {
      setError(`✖ Échec du ping vers ${target}`);
    } finally {
      setLoading(false);
      setHistory((prev) => [entry, ...prev]);
    }
  };

  const clearHistory = () => setHistory([]);

  return (
    <div className="max-w-3xl mx-auto space-y-6 p-6">
      <div className="flex items-center gap-3 mb-4">
        <Wifi size={28} className="text-green-400" />
        <h1 className="text-2xl font-bold text-white">Ping</h1>
      </div>

      <p className="text-gray-400">
        Entrez un nom de domaine ou une IP pour tester le temps de réponse réseau (simulation).
      </p>

      <form
        onSubmit={handlePing}
        className="bg-gray-900 border border-gray-800 p-5 rounded-lg space-y-4"
      >
        <div className="space-y-2">
          <label htmlFor="target" className="text-sm text-gray-300">
            Domaine cible
          </label>
          <input
            id="target"
            type="text"
            required
            placeholder="ex: google.com"
            value={target}
            onChange={(e) => setTarget(e.target.value)}
            className="w-full px-4 py-2 rounded bg-gray-800 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition"
        >
          {loading ? "Ping en cours..." : "Lancer le ping"}
        </button>
      </form>

      {result && (
        <div className="bg-gray-950 border border-gray-800 p-5 rounded-lg text-green-400">
          {result}
        </div>
      )}
      {error && (
        <div className="bg-gray-950 border border-gray-800 p-5 rounded-lg text-red-400">
          {error}
        </div>
      )}

      {history.length > 0 && (
        <div className="bg-gray-950 border border-gray-800 p-5 rounded-lg space-y-4">
          <div className="flex justify-between items-center mb-2">
            <div className="flex items-center gap-2 text-white">
              <Clock size={18} />
              <h2 className="text-lg font-semibold">Historique</h2>
            </div>
            <button
              onClick={clearHistory}
              className="flex items-center gap-1 text-sm text-red-400 hover:text-red-600"
            >
              <Trash2 size={14} /> Vider
            </button>
          </div>

          <ul className="space-y-2">
            {history.map((h) => (
              <li
                key={h.id}
                className={`p-3 rounded border ${
                  h.success
                    ? "border-green-600 bg-green-900/20 text-green-300"
                    : "border-red-600 bg-red-900/20 text-red-300"
                }`}
              >
                <div className="flex justify-between">
                  <span>{h.target}</span>
                  <span className="text-xs">{h.timestamp}</span>
                </div>
                <div className="text-sm">
                  {h.success
                    ? `✔ ${h.responseTime} ms`
                    : "✖ Échec du ping"}
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
