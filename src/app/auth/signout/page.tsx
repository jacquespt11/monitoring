'use client';

import { signOut } from 'next-auth/react';

export default function SignOutPage() {
  return (
    <div className="h-screen flex items-center justify-center bg-gray-900 text-white">
      <div className="text-center space-y-4">
        <h1 className="text-2xl font-bold">Déconnexion</h1>
        <p>Voulez-vous vraiment vous déconnecter ?</p>
        <button
          onClick={() => signOut({ callbackUrl: '/' })}
          className="bg-red-600 px-4 py-2 rounded hover:bg-red-700"
        >
          Confirmer
        </button>
      </div>
    </div>
  );
}
