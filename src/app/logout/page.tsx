"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

export default function LogoutPage() {
  const router = useRouter();

  useEffect(() => {
    // 1. Supprimer les infos de session (cookie/localStorage/token)
    localStorage.removeItem("token"); // selon ton système d'authentification

    // 2. Rediriger vers /login après un petit délai
    const timer = setTimeout(() => {
      router.push("/login");
    }, 1500);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gray-950 text-gray-200">
      <Loader2 className="animate-spin text-blue-500 mb-4" size={36} />
      <p className="text-lg">Déconnexion en cours...</p>
    </div>
  );
}
