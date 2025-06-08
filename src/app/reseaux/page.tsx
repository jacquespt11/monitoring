'use client';

import useSWR from 'swr';
import { useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import NetworkModal from '@/components/NetworkModal';
import { ClipLoader } from 'react-spinners';

interface Reseau {
  id: number;
  nom: string;
  ip: string;
  statut: 'OK' | 'HS' | 'Lent' | 'Perte';
  temps: string;
  test: string;
}

const fetcher = (url: string) => axios.get(url).then(res => res.data);

export default function ReseauxPage() {
  const { data: reseaux, error, isLoading, mutate } = useSWR<Reseau[]>('/api/reseaux', fetcher);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedReseau, setSelectedReseau] = useState<Reseau | null>(null);

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`/api/reseaux/${id}`);
      toast.success("✅ Réseau supprimé !");
      mutate(); // re-fetch data
    } catch (err) {
      toast.error("❌ Erreur lors de la suppression");
    }
  };

  const handleSave = async (reseau: Partial<Reseau>) => {
    try {
      if (reseau.id) {
        await axios.put(`/api/reseaux/${reseau.id}`, reseau);
        toast.success("✅ Réseau modifié !");
      } else {
        await axios.post(`/api/reseaux`, reseau);
        toast.success("✅ Réseau ajouté !");
      }
      setModalOpen(false);
      mutate();
    } catch (err) {
      toast.error("❌ Échec de l'enregistrement du réseau.");
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <ClipLoader size={45} color="#4F46E5" />
      </div>
    );
  }

  if (error) {
    return <p className="text-red-400 text-center">Erreur de chargement des réseaux.</p>;
  }

  return (
    <div className="p-6 text-white">
      <h2 className="text-2xl font-bold mb-4">🌐 Réseaux Surveillés</h2>

      <button
        onClick={() => {
          setSelectedReseau(null);
          setModalOpen(true);
        }}
        className="mb-4 bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded text-white"
      >
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
            {reseaux?.map((r) => (
              <tr key={r.id} className="border-b border-gray-700 hover:bg-gray-800 transition-colors">
                <td className="px-4 py-2">{r.nom}</td>
                <td className="px-4 py-2">{r.ip}</td>
                <td className="px-4 py-2">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      r.statut === 'OK'
                        ? 'bg-green-600'
                        : r.statut === 'Lent'
                        ? 'bg-yellow-600'
                        : r.statut === 'Perte'
                        ? 'bg-orange-600'
                        : 'bg-red-600'
                    }`}
                  >
                    {r.statut}
                  </span>
                </td>
                <td className="px-4 py-2">{r.temps}</td>
                <td className="px-4 py-2">{r.test}</td>
                <td className="px-4 py-2 space-x-2">
                  <button
                    onClick={() => {
                      setSelectedReseau(r);
                      setModalOpen(true);
                    }}
                    className="bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded text-sm"
                  >
                    Modifier
                  </button>
                  <button
                    onClick={() => handleDelete(r.id)}
                    className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded text-sm"
                  >
                    Supprimer
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {modalOpen && (
        <NetworkModal
          reseau={selectedReseau}
          onClose={() => setModalOpen(false)}
          onSave={handleSave}
        />
      )}

      {/* Notifications */}
      <ToastContainer position="bottom-right" autoClose={4000} />
    </div>
  );
}
