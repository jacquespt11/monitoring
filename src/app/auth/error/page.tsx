'use client';

import { useSearchParams } from 'next/navigation';

export default function ErrorPage() {
  const params = useSearchParams();
  const error = params.get('error');

  return (
    <div className="h-screen flex items-center justify-center bg-red-100">
      <div className="bg-white p-6 rounded shadow text-center">
        <h1 className="text-2xl font-bold text-red-600">Erreur</h1>
        <p className="mt-2 text-gray-700">
          {error ? decodeURIComponent(error) : 'Une erreur est survenue pendant la connexion.'}
        </p>
        <a href="/auth/signin" className="mt-4 inline-block text-blue-600 hover:underline">
          Retour à la page de connexion
        </a>
      </div>
    </div>
  );
}
