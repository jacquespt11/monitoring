// src/components/NetworkModal.tsx
"use client";

import { useState, useEffect } from "react";

interface Network {
  id?: number;
  nom: string;
  ip: string;
  statut: "OK" | "HS" | "Lent" | "Perte";
}

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (network: Network) => void;
  initialData?: Network;
}

export default function NetworkModal({ isOpen, onClose, onSubmit, initialData }: Props) {
  const [nom, setNom] = useState("");
  const [ip, setIp] = useState("");
  const [statut, setStatut] = useState<Network["statut"]>("OK");

  useEffect(() => {
    if (initialData) {
      setNom(initialData.nom);
      setIp(initialData.ip);
      setStatut(initialData.statut);
    } else {
      setNom("");
      setIp("");
      setStatut("OK");
    }
  }, [initialData]);

  const handleSubmit = () => {
    if (!nom || !ip) return;
    onSubmit({ ...initialData, nom, ip, statut });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center">
      <div className="bg-gray-900 p-6 rounded-lg w-full max-w-md">
        <h3 className="text-xl font-bold text-white mb-4">
          {initialData ? "Modifier le Réseau" : "Ajouter un Réseau"}
        </h3>

        <div className="space-y-4 text-white">
          <div>
            <label className="block mb-1">Nom du réseau</label>
            <input
              value={nom}
              onChange={(e) => setNom(e.target.value)}
              className="w-full px-3 py-2 rounded bg-gray-800 border border-gray-600 focus:outline-none"
            />
          </div>

          <div>
            <label className="block mb-1">Adresse IP</label>
            <input
              value={ip}
              onChange={(e) => setIp(e.target.value)}
              className="w-full px-3 py-2 rounded bg-gray-800 border border-gray-600 focus:outline-none"
            />
          </div>

          <div>
            <label className="block mb-1">Statut</label>
            <select
              value={statut}
              onChange={(e) => setStatut(e.target.value as Network["statut"])}
              className="w-full px-3 py-2 rounded bg-gray-800 border border-gray-600"
            >
              <option>OK</option>
              <option>Lent</option>
              <option>HS</option>
              <option>Perte</option>
            </select>
          </div>
        </div>

        <div className="mt-6 flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded"
          >
            Annuler
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 rounded text-white"
          >
            {initialData ? "Modifier" : "Ajouter"}
          </button>
        </div>
      </div>
    </div>
  );
}
