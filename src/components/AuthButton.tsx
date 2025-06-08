"use client";

import { signIn, signOut, useSession } from "next-auth/react";

export default function AuthButton() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <p className="text-sm text-gray-400">Chargement...</p>;
  }

  return session ? (
    <button
      onClick={() => signOut()}
      className="text-red-500 hover:text-red-700"
    >
      Déconnexion
    </button>
  ) : (
    <button
      onClick={() => signIn()}
      className="text-green-500 hover:text-green-700"
    >
      Connexion
    </button>
  );
}
