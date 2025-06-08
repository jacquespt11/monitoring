'use client';

import { signIn } from 'next-auth/react';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { FaGithub } from 'react-icons/fa';
import { motion } from 'framer-motion';
import AuthPageWrapper from '@/components/AuthPageWrapper';

export default function SignInPage() {
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const params = useSearchParams();
  const error = params.get('error');

  useEffect(() => {
    if (error) {
      setErrorMsg("Erreur d'authentification. Veuillez réessayer.");
    }
  }, [error]);

  return (
    <AuthPageWrapper>
      <motion.div
        className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md space-y-6"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        <h1 className="text-2xl font-bold text-center text-gray-800">Connexion</h1>

        {errorMsg && (
          <motion.div
            className="bg-red-100 border border-red-400 text-red-700 p-2 rounded"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {errorMsg}
          </motion.div>
        )}

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => signIn('google')}
          className="flex items-center justify-center gap-3 w-full bg-white border px-4 py-2 rounded hover:bg-gray-100"
        >
          <FcGoogle size={22} />
          Se connecter avec Google
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => signIn('github')}
          className="flex items-center justify-center gap-3 w-full bg-black text-white px-4 py-2 rounded hover:bg-gray-900"
        >
          <FaGithub size={22} />
          Se connecter avec GitHub
        </motion.button>

        <div className="text-center text-gray-500 text-sm">— ou utiliser votre identifiant —</div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            const form = e.currentTarget;
            const email = form.email.value;
            const password = form.password.value;
            setLoading(true);
            signIn('credentials', {
              redirect: true,
              email,
              password,
              callbackUrl: '/auth/loading',
            }).catch(() => {
              setLoading(false);
              setErrorMsg('Identifiants incorrects.');
            });
          }}
          className="space-y-4"
        >
          <motion.input
            type="email"
            name="email"
            required
            placeholder="Adresse e-mail"
            className="w-full border p-2 rounded"
            whileFocus={{ scale: 1.02 }}
          />
          <motion.input
            type="password"
            name="password"
            required
            placeholder="Mot de passe"
            className="w-full border p-2 rounded"
            whileFocus={{ scale: 1.02 }}
          />
          <motion.button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
            disabled={loading}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.97 }}
          >
            {loading ? 'Connexion...' : 'Se connecter'}
          </motion.button>
        </form>
      </motion.div>
    </AuthPageWrapper>
  );
}
