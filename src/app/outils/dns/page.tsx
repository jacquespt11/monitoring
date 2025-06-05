"use client";

import { useState } from "react";
import { Globe, Trash2 } from "lucide-react";

type DNSRecord = {
  type: string;
  value: string;
};

type DNSResult = {
  id: number;
  domain: string;
  timestamp: string;
  records: DNSRecord[];
};

export default function DNSLookupPage() {
  const [domain, setDomain] = useState("");
  const [results, setResults] = useState<DNSResult[]>([]);
  const [error, setError] = useState<string | null>(null);

  const simulateDNSLookup = (): DNSRecord[] => {
    return [
      { type: "A", value: "93.184.216.34" },
      { type: "AAAA", value: "2606:2800:220:1:248:1893:25c8:1946" },
      { type: "MX", value: "10 mail.example.com" },
      { type: "CNAME", value: "www.example.com" },
      { type: "NS", value: "ns1.example.com" },
      { type: "TXT", value: "\"v=spf1 include:_spf.google.com ~all\"" },
    ];
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!domain.trim() || !/^[a-zA-Z0-9.-]+\.[a-z]{2,}$/.test(domain)) {
      setError("Veuillez entrer un domaine valide (ex: example.com)");
      return;
    }

    const newResult: DNSResult = {
      id: Date.now(),
      domain,
      timestamp: new Date().toLocaleString(),
      records: simulateDNSLookup(),
    };

    setResults((prev) => [newResult, ...prev]);
    setDomain("");
  };

  const clearResults = () => setResults([]);

  return (
    <div className="max-w-3xl mx-auto space-y-6 p-6">
      <div className="flex items-center gap-3 mb-4">
        <Globe size={28} className="text-yellow-400" />
        <h1 className="text-2xl font-bold text-white">DNS Lookup</h1>
      </div>

      <p className="text-gray-400">
        Découvrez les enregistrements DNS d’un domaine, tels que les A, MX, CNAME, etc.
      </p>

      <form
        onSubmit={handleSubmit}
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
          className="bg-yellow-500 text-black px-6 py-2 rounded hover:bg-blue-600 transition"
        >
          Rechercher
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
                {res.domain} —{" "}
                <span className="text-xs text-gray-400">{res.timestamp}</span>
              </div>
              <table className="w-full text-sm text-gray-300 mt-2 border-collapse">
                <thead className="bg-gray-800 text-left">
                  <tr>
                    <th className="py-2 px-3 border border-gray-700">Type</th>
                    <th className="py-2 px-3 border border-gray-700">Valeur</th>
                  </tr>
                </thead>
                <tbody>
                  {res.records.map((record, i) => (
                    <tr key={i}>
                      <td className="py-1 px-3 border border-gray-700">{record.type}</td>
                      <td className="py-1 px-3 border border-gray-700">{record.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <hr className="border-gray-700 mt-4" />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
