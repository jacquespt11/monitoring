"use client";

import { useState } from "react";
import { ScanLine, Trash2 } from "lucide-react";

type PortStatus = {
  port: number;
  service: string;
  isOpen: boolean;
};

type ScanResult = {
  id: number;
  target: string;
  timestamp: string;
  ports: PortStatus[];
};

export default function PortScanPage() {
  const [target, setTarget] = useState("");
  const [scanMode, setScanMode] = useState<"custom" | "select">("custom");
  const [customPorts, setCustomPorts] = useState("");
  const [selectedPort, setSelectedPort] = useState<number | "">("");
  const [results, setResults] = useState<ScanResult[]>([]);
  const [error, setError] = useState<string | null>(null);

  const simulateScan = (ports: number[]): PortStatus[] => {
    return ports.map((port) => ({
      port,
      service: `Service ${port}`,
      isOpen: Math.random() > 0.4,
    }));
  };

  const handleScan = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!target.trim()) {
      setError("Veuillez entrer une IP ou un domaine.");
      return;
    }

    let ports: number[] = [];

    if (scanMode === "custom") {
      const parsed = customPorts
        .split(",")
        .map((p) => parseInt(p.trim()))
        .filter((p) => !isNaN(p) && p >= 1 && p <= 65535);
      if (parsed.length === 0) {
        setError("Aucun port valide détecté.");
        return;
      }
      ports = parsed;
    } else {
      if (!selectedPort) {
        setError("Veuillez sélectionner un port.");
        return;
      }
      ports = [selectedPort];
    }

    const simulatedPorts = simulateScan(ports);
    const timestamp = new Date().toLocaleString();

    const newResult: ScanResult = {
      id: Date.now(),
      target,
      timestamp,
      ports: simulatedPorts,
    };

    setResults((prev) => [newResult, ...prev]);
    setTarget("");
    setCustomPorts("");
    setSelectedPort("");
  };

  const clearHistory = () => setResults([]);

  return (
    <div className="max-w-3xl mx-auto space-y-6 p-6">
      <div className="flex items-center gap-3 mb-4">
        <ScanLine size={28} className="text-red-400" />
        <h1 className="text-2xl font-bold text-white">Scan de Ports</h1>
      </div>

      <p className="text-gray-400">
        Analysez les ports ouverts d’une machine via son adresse IP ou nom de domaine.
      </p>

      <form
        className="bg-gray-900 border border-gray-800 p-5 rounded-lg space-y-4"
        onSubmit={handleScan}
      >
        <div className="space-y-2">
          <label htmlFor="target" className="text-sm text-gray-300">
            IP ou Domaine à scanner
          </label>
          <input
            id="target"
            type="text"
            required
            value={target}
            onChange={(e) => setTarget(e.target.value)}
            placeholder="ex: 192.168.1.1 ou example.com"
            className="w-full px-4 py-2 rounded bg-gray-800 border border-gray-700 text-white"
          />
        </div>

        {/* Choix du mode de scan */}
        <div className="space-y-2">
          <label className="text-sm text-gray-300">Mode de sélection des ports</label>
          <div className="flex gap-4">
            <label className="text-sm text-gray-300 flex gap-2 items-center">
              <input
                type="radio"
                value="custom"
                checked={scanMode === "custom"}
                onChange={() => setScanMode("custom")}
              />
              Liste personnalisée
            </label>
            <label className="text-sm text-gray-300 flex gap-2 items-center">
              <input
                type="radio"
                value="select"
                checked={scanMode === "select"}
                onChange={() => setScanMode("select")}
              />
              Choisir un port (1–100)
            </label>
          </div>
        </div>

        {/* Champs conditionnels */}
        {scanMode === "custom" ? (
          <div className="space-y-2">
            <label htmlFor="customPorts" className="text-sm text-gray-300">
              Ports séparés par une virgule (ex: 22,80,443)
            </label>
            <input
              id="customPorts"
              type="text"
              value={customPorts}
              onChange={(e) => setCustomPorts(e.target.value)}
              className="w-full px-4 py-2 rounded bg-gray-800 border border-gray-700 text-white"
            />
          </div>
        ) : (
          <div className="space-y-2">
            <label className="text-sm text-gray-300">Sélectionnez un port</label>
            <select
              value={selectedPort}
              onChange={(e) => setSelectedPort(Number(e.target.value))}
              className="w-full px-4 py-2 rounded bg-gray-800 border border-gray-700 text-white"
            >
              <option value="">-- Sélectionnez un port --</option>
              {Array.from({ length: 100 }, (_, i) => i + 1).map((port) => (
                <option key={port} value={port}>
                  Port {port}
                </option>
              ))}
            </select>
          </div>
        )}

        <button
          type="submit"
          className="bg-red-500 text-black px-6 py-2 rounded hover:bg-red-600 transition"
        >
          Scanner
        </button>
      </form>

      {error && (
        <div className="bg-red-900 text-red-300 border border-red-700 p-4 rounded">
          {error}
        </div>
      )}

      {/* Résultats */}
      {results.length > 0 && (
        <div className="bg-gray-950 border border-gray-800 p-5 rounded-lg space-y-6">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-white font-semibold text-lg">Historique des scans</h2>
            <button
              onClick={clearHistory}
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
              <div className="text-sm space-y-1">
                {res.ports.map((p) => (
                  <div
                    key={p.port}
                    className={p.isOpen ? "text-green-400" : "text-red-400"}
                  >
                    <strong>Port {p.port}:</strong> {p.service} —{" "}
                    {p.isOpen ? "Ouvert" : "Fermé"}
                  </div>
                ))}
              </div>
              <hr className="border-gray-700 mt-3" />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
