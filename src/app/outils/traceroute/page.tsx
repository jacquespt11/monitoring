// app/outils/traceroute/page.tsx
'use client';

import { useState } from 'react';
import { Route, Clock, Trash2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

type TraceResult = {
  id: number;
  target: string;
  output: string;
  timestamp: string;
};

export default function TraceroutePage() {
  const [target, setTarget] = useState('');
  const [output, setOutput] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState<TraceResult[]>([]);

  const handleTrace = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setOutput(null);
    setError(null);

    const timestamp = new Date().toLocaleString();
    const entry: TraceResult = {
      id: Date.now(),
      target,
      output: '',
      timestamp,
    };

    try {
      const res = await fetch('/api/traceroute', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ target }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || 'Erreur serveur');

      setOutput(data.output);
      entry.output = data.output;
    } catch (err: any) {
      setError(`✖ Échec du traceroute vers ${target}`);
    } finally {
      setLoading(false);
      setHistory((prev) => [entry, ...prev]);
    }
  };

  const clearHistory = () => setHistory([]);

  return (
    <div className="max-w-3xl mx-auto space-y-6 p-6">
      <div className="flex items-center gap-3 mb-4">
        <Route size={28} className="text-blue-400" />
        <h1 className="text-2xl font-bold text-white">Traceroute</h1>
      </div>

      <p className="text-gray-400">
        Entrez un nom de domaine ou une IP pour tracer le chemin réseau vers la cible.
      </p>

      <form
        onSubmit={handleTrace}
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
            className="w-full px-4 py-2 rounded bg-gray-800 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <motion.button
          type="submit"
          disabled={loading}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
        >
          {loading ? 'Traceroute en cours...' : 'Lancer le traceroute'}
        </motion.button>
      </form>

      <AnimatePresence>
        {output && (
          <motion.pre
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="bg-gray-950 border border-gray-800 p-5 rounded-lg text-green-400 whitespace-pre-wrap"
          >
            {output}
          </motion.pre>
        )}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="bg-gray-950 border border-gray-800 p-5 rounded-lg text-red-400"
          >
            {error}
          </motion.div>
        )}
      </AnimatePresence>

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
                className="p-3 rounded border border-blue-600 bg-blue-900/20 text-blue-300"
              >
                <div className="flex justify-between">
                  <span>{h.target}</span>
                  <span className="text-xs">{h.timestamp}</span>
                </div>
                <pre className="text-sm whitespace-pre-wrap mt-2">{h.output}</pre>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
