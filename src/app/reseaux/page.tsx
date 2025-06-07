"use client";

import { useEffect, useState } from "react";
import NetworkModal from "@/components/NetworkModal";

interface Reseau {
  id: number;
  nom: string;
  ip: string;
  statut: "OK" | "HS" | "Lent" | "Perte";
  temps: string;
  test: string;
}

export default function ReseauxPage() {
  const [reseaux, setReseaux] = useState<Reseau[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [reseauActuel, setReseauActuel] = useState<Reseau | null>(null);
  const [loading, setLoading] = useState(false);
  const [erreur, setErreur] = useState<string | null>(null);

  // Charger les réseaux depuis l'API
  useEffect(() => {
    const chargerReseaux = async () => {
      setLoading(true);
      try {
        const response = await fetch("/api/reseaux");
        if (!response.ok) {
          throw new Error("Erreur lors du chargement des réseaux");
        }
        const data = await response.json();
        setReseaux(data);
      } catch (err: any) {
        setErreur(err.message);
      } finally {
        setLoading(false);
      }
    };

    chargerReseaux();
  }, []);

  const handleAjouter = () => {
    setReseauActuel(null); // Nouveau réseau
    setModalOpen(true);
  };

  const handleModifier = (reseau: Reseau) => {
    setReseauActuel(reseau);
    setModalOpen(true);
  };

  const handleSauvegarde = async (newR: Reseau) => {
    try {
      const response = await fetch("/api/reseaux", {
        method: reseauActuel ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newR),
      });

      if (!response.ok) {
        throw new Error("Erreur lors de la sauvegarde du réseau");
      }

      const savedReseau = await response.json();

      if (reseauActuel) {
        // Mise à jour
        setReseaux((prev) =>
          prev.map((r) => (r.id === savedReseau.id ? savedReseau : r))
        );
      } else {
        // Ajout
        setReseaux((prev) => [savedReseau, ...prev]);
      }

      setModalOpen(false);
    } catch (err: any) {
      setErreur(err.message);
    }
  };

  const handleSupprimer = async (id: number) => {
    const confirm = window.confirm("Confirmer la suppression de ce réseau ?");
    if (!confirm) return;

    try {
      const response = await fetch(`/api/reseaux/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Erreur lors de la suppression du réseau");
      }

      setReseaux((prev) => prev.filter((r) => r.id !== id));
    } catch (err: any) {
      setErreur(err.message);
    }
  };

  return (
    <div className="p-6 text-white">
      <h2 className="text-2xl font-bold mb-4">🌐 Réseaux Surveillés</h2>

      <button
        className="mb-4 bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded text-white"
        onClick={handleAjouter}
      >
        ➕ Ajouter un réseau
      </button>

      {erreur && (
        <div className="mb-4 text-red-500">
          <strong>Erreur :</strong> {erreur}
        </div>
      )}

      {loading ? (
        <div className="text-gray-400">Chargement des réseaux...</div>
      ) : (
        <div className="overflow-x-auto rounded-lg shadow border border-gray-700">
          <table className="w-full text-sm text-left bg-gray-900">
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
              {reseaux.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-4 py-4 text-center text-gray-400">
                    Aucun réseau enregistré pour l’instant.
                  </td>
                </tr>
              ) : (
                reseaux.map((r) => (
                  <tr
                    key={r.id}
                    className="border-b border-gray-700 hover:bg-gray-800 transition"
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
                      <button
                        onClick={() => handleModifier(r)}
                        className="bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded text-sm"
                      >
                        Modifier
                      </button>
                      <button
                        onClick={() => handleSupprimer(r.id)}
                        className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded text-sm"
                      >
                        Supprimer
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}

      {modalOpen && (
        <NetworkModal
          reseau={reseauActuel}
          onClose={() => setModalOpen(false)}
          onSave={handleSauvegarde}
        />
      )}
    </div>
  );
}
