"use client";

import { useState } from "react";
import { FileSearch, Trash2 } from "lucide-react";

type WhoisResult = {
  id: number;
  domain: string;
  timestamp: string;
  data: {
    owner: string;
    registrar: string;
    creationDate: string;
    expirationDate: string;
    status: string;
  };
};

export default function WhoisPage() {
  const [domain, setDomain] = useState("");
  const [results, setResults] = useState<WhoisResult[]>([]);
  const [error, setError] = useState<string | null>(null);

  const simulateWhois = (): WhoisResult["data"] => {
    return {
      owner: "Perfect Tshibangu (Simulation)",
      registrar: "NameCheap, Inc.",
      creationDate: "2020-05-18",
      expirationDate: "2025-05-18",
      status: "active",
    };
  };

  const handleWhois = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!domain.trim() || !/^[a-zA-Z0-9.-]+\.[a-z]{2,}$/.test(domain)) {
      setError("Veuillez entrer un nom de domaine valide (ex: example.com)");
      return;
    }

    const newResult: WhoisResult = {
      id: Date.now(),
      domain,
      timestamp: new Date().toLocaleString(),
      data: simulateWhois(),
    };

    setResults((prev) => [newResult, ...prev]);
    setDomain("");
  };

  const clearResults = () => setResults([]);

  return (
    <div className="max-w-3xl mx-auto space-y-6 p-6">
      <div className="flex items-center gap-3 mb-4">
        <FileSearch size={28} className="text-blue-400" />
        <h1 className="text-2xl font-bold text-white">Analyse WHOIS</h1>
      </div>

      <p className="text-gray-400">
        Consultez les informations d’enregistrement d’un nom de domaine. Cela vous permet
        de connaître le propriétaire, le registrar et les dates importantes.
      </p>

      <form
        onSubmit={handleWhois}
        className="bg-gray-900 border border-gray-800 p-5 rounded-lg space-y-4"
      >
        <div className="space-y-2">
          <label htmlFor="domain" className="text-sm text-gray-300">
            Nom de domaine
          </label>
          <input
            id="domain"
            type="text"
            required
            value={domain}
            onChange={(e) => setDomain(e.target.value)}
            placeholder="ex: example.com"
            className="w-full px-4 py-2 rounded bg-gray-800 border border-gray-700 text-white"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-black px-6 py-2 rounded hover:bg-blue-600 transition"
        >
          Analyser
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
            <h2 className="text-white font-semibold text-lg">Historique des WHOIS</h2>
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
                {res.domain} —{" "}
                <span className="text-xs text-gray-400">{res.timestamp}</span>
              </div>
              <div className="text-sm text-gray-300 space-y-1">
                <div>
                  <strong>Propriétaire:</strong> {res.data.owner}
                </div>
                <div>
                  <strong>Registrar:</strong> {res.data.registrar}
                </div>
                <div>
                  <strong>Créé le:</strong> {res.data.creationDate}
                </div>
                <div>
                  <strong>Expire le:</strong> {res.data.expirationDate}
                </div>
                <div>
                  <strong>Statut:</strong>{" "}
                  <span
                    className={
                      res.data.status === "active"
                        ? "text-green-400"
                        : "text-yellow-400"
                    }
                  >
                    {res.data.status}
                  </span>
                </div>
              </div>
              <hr className="border-gray-700 mt-3" />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
