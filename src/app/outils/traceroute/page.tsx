"use client";

import { useState } from "react";
import { SatelliteDish, Trash2 } from "lucide-react";

type Hop = {
  hop: number;
  ip: string;
  location: string;
  latency: string;
};

type TracerouteResult = {
  id: number;
  target: string;
  timestamp: string;
  hops: Hop[];
};

export default function TraceroutePage() {
  const [target, setTarget] = useState("");
  const [results, setResults] = useState<TracerouteResult[]>([]);
  const [error, setError] = useState<string | null>(null);

  const simulateTraceroute = (): Hop[] => {
    return [
      { hop: 1, ip: "192.168.1.1", location: "Local Network", latency: "1 ms" },
      { hop: 2, ip: "10.10.0.1", location: "ISP Gateway", latency: "4 ms" },
      { hop: 3, ip: "196.192.44.12", location: "Kinshasa", latency: "12 ms" },
      { hop: 4, ip: "145.24.89.1", location: "Bruxelles", latency: "45 ms" },
      { hop: 5, ip: "93.184.216.34", location: "example.com (USA)", latency: "98 ms" },
    ];
  };

  const handleTraceroute = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!target.trim() || !/^[a-zA-Z0-9.-]+\.[a-z]{2,}$/.test(target)) {
      setError("Veuillez entrer un domaine ou IP valide (ex: example.com)");
      return;
    }

    const newResult: TracerouteResult = {
      id: Date.now(),
      target,
      timestamp: new Date().toLocaleString(),
      hops: simulateTraceroute(),
    };

    setResults((prev) => [newResult, ...prev]);
    setTarget("");
  };

  const clearResults = () => setResults([]);

  return (
    <div className="max-w-3xl mx-auto space-y-6 p-6">
      <div className="flex items-center gap-3 mb-4">
        <SatelliteDish size={28} className="text-purple-400" />
        <h1 className="text-2xl font-bold text-white">Traceroute</h1>
      </div>

      <p className="text-gray-400">
        Simulez le chemin qu’un paquet emprunte jusqu’à une IP ou un domaine cible. Idéal
        pour diagnostiquer les retards et identifier les points de passage.
      </p>

      <form
        onSubmit={handleTraceroute}
        className="bg-gray-900 border border-gray-800 p-5 rounded-lg space-y-4"
      >
        <div className="space-y-2">
          <label htmlFor="target" className="text-sm text-gray-300">
            Cible (IP ou domaine)
          </label>
          <input
            id="target"
            type="text"
            required
            value={target}
            onChange={(e) => setTarget(e.target.value)}
            placeholder="ex: example.com"
            className="w-full px-4 py-2 rounded bg-gray-800 border border-gray-700 text-white"
          />
        </div>

        <button
          type="submit"
          className="bg-purple-500 text-black px-6 py-2 rounded hover:bg-purple-600 transition"
        >
          Lancer
        </button>
      </form>

      {error && (
        <div className="bg-red-900 text-red-300 border border-red-700 p-4 rounded">
          {error}
        </div>
      )}

      {results.length > 0 && (
        <div className="bg-gray-950 border border-gray-800 p-5 rounded-lg space-y-6">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-white font-semibold text-lg">Historique</h2>
            <button
              onClick={clearResults}
              className="flex items-center gap-1 text-sm text-red-400 hover:text-red-600"
            >
              <Trash2 size={14} /> Vider
            </button>
          </div>

          {results.map((res) => (
            <div key={res.id} className="space-y-2">
              <div className="text-white font-semibold">
                {res.target} —{" "}
                <span className="text-xs text-gray-400">{res.timestamp}</span>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-gray-300 mt-2 border-collapse">
                  <thead className="bg-gray-800 text-left">
                    <tr>
                      <th className="py-2 px-3 border border-gray-700">Hop</th>
                      <th className="py-2 px-3 border border-gray-700">IP</th>
                      <th className="py-2 px-3 border border-gray-700">Localisation</th>
                      <th className="py-2 px-3 border border-gray-700">Latence</th>
                    </tr>
                  </thead>
                  <tbody>
                    {res.hops.map((hop) => (
                      <tr key={hop.hop}>
                        <td className="py-1 px-3 border border-gray-700">
                          {hop.hop}
                        </td>
                        <td className="py-1 px-3 border border-gray-700">{hop.ip}</td>
                        <td className="py-1 px-3 border border-gray-700">
                          {hop.location}
                        </td>
                        <td className="py-1 px-3 border border-gray-700">
                          {hop.latency}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <hr className="border-gray-700 mt-4" />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
