"use client";

import { useState, useEffect } from "react";

interface Reseau {
  id?: number;
  nom: string;
  ip: string;
  statut?: "OK" | "HS" | "Lent" | "Perte";
  temps?: string;
  test?: string;
}

interface Props {
  reseau: Reseau | null;
  onClose: () => void;
  onSave: (newReseau: Reseau) => void;
}

export default function NetworkModal({ reseau, onClose, onSave }: Props) {
  const [nom, setNom] = useState("");
  const [ip, setIp] = useState("");
  const [isTesting, setIsTesting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (reseau) {
      setNom(reseau.nom);
      setIp(reseau.ip);
    } else {
      setNom("");
      setIp("");
    }
  }, [reseau]);

  const simulateTest = async (ip: string): Promise<{ statut: string; temps: string }> => {
    // Simule un "test réseau" (remplace plus tard par un appel réel à ton API backend)
    return new Promise((resolve) => {
      setTimeout(() => {
        const rand = Math.random();
        if (rand < 0.1) {
          resolve({ statut: "HS", temps: "N/A" });
        } else if (rand < 0.3) {
          resolve({ statut: "Lent", temps: "180ms" });
        } else if (rand < 0.5) {
          resolve({ statut: "Perte", temps: "300ms" });
        } else {
          resolve({ statut: "OK", temps: "45ms" });
        }
      }, 1500);
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!nom || !ip) return setError("Tous les champs sont requis.");

    setIsTesting(true);
    setError("");

    try {
      const { statut, temps } = await simulateTest(ip);

      const newReseau: Reseau = {
        id: reseau?.id ?? Date.now(),
        nom,
        ip,
        statut: statut as Reseau["statut"],
        temps,
        test: new Date().toLocaleString(),
      };

      onSave(newReseau);
    } catch (err) {
      setError("Échec du test de connectivité.");
    } finally {
      setIsTesting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 transition-all">
      <form
        onSubmit={handleSubmit}
        className="bg-white text-black rounded-lg shadow-lg p-6 w-full max-w-md animate-fade-in"
      >
        <h3 className="text-xl font-bold mb-4">
          {reseau ? "Modifier le réseau" : "Ajouter un réseau"}
        </h3>

        {error && <div className="text-red-600 mb-2">{error}</div>}

        <div className="mb-4">
          <label className="block mb-1 font-medium">Nom du réseau</label>
          <input
            type="text"
            value={nom}
            onChange={(e) => setNom(e.target.value)}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1 font-medium">Adresse IP</label>
          <input
            type="text"
            value={ip}
            onChange={(e) => setIp(e.target.value)}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>

        <div className="flex justify-end gap-2 mt-6">
          <button
            type="button"
            onClick={onClose}
            className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded"
            disabled={isTesting}
          >
            Annuler
          </button>
          <button
            type="submit"
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded"
            disabled={isTesting}
          >
            {isTesting ? "Test en cours..." : "Ajouter"}
          </button>
        </div>
      </form>
    </div>
  );
}
