// src/app/reseaux/page.tsx
"use client";

import { useState } from "react";
import NetworkModal from "@/components/NetworkModal";


interface Reseau {
  id: number;
  nom: string;
  ip: string;
  statut: "OK" | "HS" | "Lent" | "Perte";
  temps: string;
  test: string;
}

const reseauxMock: Reseau[] = [
  {
    id: 1,
    nom: "Site Principal",
    ip: "192.168.1.1",
    statut: "OK",
    temps: "15ms",
    test: "2025-06-03 10:00",
  },
  {
    id: 2,
    nom: "Backup 1",
    ip: "192.168.1.2",
    statut: "Lent",
    temps: "120ms",
    test: "2025-06-03 10:15",
  },
  {
    id: 3,
    nom: "Remote Site",
    ip: "10.0.0.5",
    statut: "HS",
    temps: "N/A",
    test: "2025-06-03 09:45",
  },
];

export default function ReseauxPage() {
  const [reseaux, setReseaux] = useState<Reseau[]>(reseauxMock);

  return (
    <div className="p-6 text-white">
      <h2 className="text-2xl font-bold mb-4">🌐 Réseaux Surveillés</h2>
      <button className="mb-4 bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded text-white">
        ➕ Ajouter un réseau
      </button>

      <div className="overflow-x-auto rounded-lg">
        <table className="w-full text-sm text-left border-collapse bg-gray-900">
          <thead className="bg-gray-700 text-gray-300">
            <tr>
              <th className="px-4 py-3">Nom</th>
              <th className="px-4 py-3">IP</th>
              <th className="px-4 py-3">Statut</th>
              <th className="px-4 py-3">Temps de réponse</th>
              <th className="px-4 py-3">Dernier test</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {reseaux.map((r) => (
              <tr
                key={r.id}
                className="border-b border-gray-700 hover:bg-gray-800"
              >
                <td className="px-4 py-2">{r.nom}</td>
                <td className="px-4 py-2">{r.ip}</td>
                <td className="px-4 py-2">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      r.statut === "OK"
                        ? "bg-green-600"
                        : r.statut === "Lent"
                        ? "bg-yellow-600"
                        : r.statut === "Perte"
                        ? "bg-orange-600"
                        : "bg-red-600"
                    }`}
                  >
                    {r.statut}
                  </span>
                </td>
                <td className="px-4 py-2">{r.temps}</td>
                <td className="px-4 py-2">{r.test}</td>
                <td className="px-4 py-2 space-x-2">
                  <button className="bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded text-sm">
                    Modifier
                  </button>
                  <button className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded text-sm">
                    Supprimer
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
