"use client";

import { Globe2 } from "lucide-react";

export default function GeoIpPage() {
  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="flex items-center gap-3 mb-4">
        <Globe2 size={28} className="text-green-400" />
        <h1 className="text-2xl font-bold text-white">GeoIP Lookup</h1>
      </div>

      <p className="text-gray-400">
        Entrez une adresse IP pour localiser géographiquement sa provenance. Cet outil fournit des
        informations comme le pays, la ville, le fournisseur d'accès, etc.
      </p>

      <form
        className="bg-gray-900 border border-gray-800 p-5 rounded-lg space-y-4"
        onSubmit={(e) => {
          e.preventDefault();
          // future intégration API ici
        }}
      >
        <div className="space-y-2">
          <label htmlFor="ip" className="text-sm text-gray-300">
            Adresse IP
          </label>
          <input
            id="ip"
            type="text"
            required
            placeholder="ex: 8.8.8.8"
            className="w-full px-4 py-2 rounded bg-gray-800 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        <button
          type="submit"
          className="bg-green-500 text-black px-6 py-2 rounded hover:bg-green-600 transition"
        >
          Localiser
        </button>
      </form>

      {/* Résultats simulés */}
      <div className="bg-gray-950 border border-gray-800 p-5 rounded-lg space-y-2">
        <h2 className="text-lg text-white font-semibold mb-3">Résultat simulé</h2>
        <div className="text-sm text-green-400 space-y-1">
          <div><strong>Adresse IP :</strong> 8.8.8.8</div>
          <div><strong>Pays :</strong> United States</div>
          <div><strong>Région :</strong> California</div>
          <div><strong>Ville :</strong> Mountain View</div>
          <div><strong>Latitude / Longitude :</strong> 37.4056 / -122.0775</div>
          <div><strong>Fuseau horaire :</strong> America/Los_Angeles</div>
          <div><strong>Fournisseur d'accès :</strong> Google LLC</div>
          <div><strong>Horodatage :</strong> 2025-06-05 17:04:40</div>
        </div>
      </div>
    </div>
  );
}
