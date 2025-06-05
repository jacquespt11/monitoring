"use client";

import { useState } from "react";
import { AlertCircle, CheckCircle } from "lucide-react";
import Button from "@/components/ui/button";

const alertes = [
  { id: 1, type: "Latence", niveau: "critique", message: "Latence élevée détectée sur Réseau A", date: "2025-06-03 13:45" },
  { id: 2, type: "Panne", niveau: "moyenne", message: "Panne temporaire sur Réseau B", date: "2025-06-03 12:30" },
  { id: 3, type: "Bande Passante", niveau: "critique", message: "Saturation de la bande passante sur Réseau C", date: "2025-06-03 11:00" },
];

export default function AlertesPage() {
  const [filtre, setFiltre] = useState<string | null>(null);
  const [accusees, setAccusees] = useState<number[]>([]);

  const filteredAlertes = filtre
    ? alertes.filter((a) => a.type === filtre)
    : alertes;

  const accuserReception = (id: number) => {
    setAccusees((prev) => [...prev, id]);
  };

  return (
    <div className="p-6 text-gray-200">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">📣 Alertes Réseau</h1>
        <div className="flex gap-2">
          {["Latence", "Panne", "Bande Passante"].map((type) => (
            <Button onClick={() => console.log("Alerte déclenchée !")}>
              Ajouter une alerte
            </Button>

          ))}
        </div>
    </div>

      <div className="overflow-x-auto rounded-lg border border-gray-800">
        <table className="w-full table-auto bg-gray-950">
          <thead className="bg-gray-900">
            <tr>
              <th className="text-left p-4">Type</th>
              <th className="text-left p-4">Message</th>
              <th className="text-left p-4">Date</th>
              <th className="text-left p-4">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredAlertes.map((alerte) => (
              <tr
                key={alerte.id}
                className={`border-t border-gray-800 ${
                  alerte.niveau === "critique"
                    ? "bg-red-900/20"
                    : "bg-yellow-900/10"
                }`}
              >
                <td className="p-4 font-medium flex items-center gap-2">
                  <AlertCircle
                    size={18}
                    className={`${
                      alerte.niveau === "critique" ? "text-red-500" : "text-yellow-500"
                    }`}
                  />
                  {alerte.type}
                </td>
                <td className="p-4">{alerte.message}</td>
                <td className="p-4 text-sm text-gray-400">{alerte.date}</td>
                <td className="p-4">
                  {accusees.includes(alerte.id) ? (
                    <span className="text-green-500 flex items-center gap-1">
                      <CheckCircle size={16} /> Accusé
                    </span>
                  ) : (
                    <Button
                      variant="outline"
                      onClick={() => accuserReception(alerte.id)}
                    >
                      Accuser réception
                    </Button>
                  )}
                </td>
              </tr>
            ))}
            {filteredAlertes.length === 0 && (
              <tr>
                <td colSpan={4} className="p-4 text-center text-gray-400">
                  Aucune alerte pour ce type.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
