"use client";

import { Lock } from "lucide-react";

export default function SslCheckerPage() {
  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="flex items-center gap-3 mb-4">
        <Lock size={28} className="text-yellow-400" />
        <h1 className="text-2xl font-bold text-white">SSL Checker</h1>
      </div>

      <p className="text-gray-400">
        Vérifiez les informations de certificat SSL d’un domaine. Vous pouvez voir la validité, l’autorité de certification, les dates d’expiration, etc.
      </p>

      <form
        className="bg-gray-900 border border-gray-800 p-5 rounded-lg space-y-4"
        onSubmit={(e) => {
          e.preventDefault();
          // future logique backend ici
        }}
      >
        <div className="space-y-2">
          <label htmlFor="domain" className="text-sm text-gray-300">
            Nom de domaine
          </label>
          <input
            id="domain"
            type="text"
            required
            placeholder="ex: example.com"
            className="w-full px-4 py-2 rounded bg-gray-800 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
          />
        </div>

        <button
          type="submit"
          className="bg-yellow-400 text-black px-6 py-2 rounded hover:bg-yellow-500 transition"
        >
          Vérifier SSL
        </button>
      </form>

      {/* Résultat simulé */}
      <div className="bg-gray-950 border border-gray-800 p-5 rounded-lg space-y-2">
        <h2 className="text-lg text-white font-semibold mb-3">Résultat SSL (simulé)</h2>
        <div className="text-sm text-green-400 space-y-1">
          <div><strong>Domaine :</strong> example.com</div>
          <div><strong>Valide :</strong> ✅</div>
          <div><strong>Date de début :</strong> 1 Jan 2025</div>
          <div><strong>Date d’expiration :</strong> 1 Jan 2026</div>
          <div><strong>Autorité :</strong> Let's Encrypt</div>
          <div><strong>Chiffrement :</strong> TLS 1.3, RSA 2048 bits</div>
        </div>
      </div>
    </div>
  );
}
