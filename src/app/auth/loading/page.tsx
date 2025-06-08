'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { motion } from 'framer-motion';
import { FaCheckCircle } from 'react-icons/fa';

export default function AuthLoadingPage() {
  const router = useRouter();
  const { data: session } = useSession();

  useEffect(() => {
    const timeout = setTimeout(() => {
      router.push('/dashboard');
    }, 2500);
    return () => clearTimeout(timeout);
  }, [router]);

  const userName =
    session?.user?.name || session?.user?.email?.split('@')[0] || 'utilisateur';

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-blue-600 to-purple-700 text-white">
      <motion.div
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ duration: 0.8, type: 'spring' }}
        className="flex flex-col items-center gap-4"
      >
        <FaCheckCircle size={60} className="text-green-300" />
        <h1 className="text-3xl font-bold">Bienvenue {userName} !</h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="text-sm text-center"
        >
          Tu es connecté avec succès. Pret à explorer de ton tableau de bord...
        </motion.p>
      </motion.div>
    </div>
  );
}
