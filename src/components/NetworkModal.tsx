'use client';

import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

interface Reseau {
  id?: number;
  nom: string;
  ip: string;
}

interface NetworkModalProps {
  reseau: Reseau | null;
  onClose: () => void;
  onSave: (data: Reseau) => void;
}

const schema = Yup.object().shape({
  nom: Yup.string().required('Le nom est requis'),
  ip: Yup.string()
    .matches(
      /^(25[0-5]|2[0-4]\d|1\d{2}|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d{2}|[1-9]?\d)){3}$/,
      'Adresse IP invalide'
    )
    .required('L\'adresse IP est requise'),
});

export default function NetworkModal({ reseau, onClose, onSave }: NetworkModalProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Reseau>({
    resolver: yupResolver(schema),
    defaultValues: reseau || { nom: '', ip: '' },
  });

  useEffect(() => {
    reset(reseau || { nom: '', ip: '' });
  }, [reseau, reset]);

  const onSubmit = (data: Reseau) => {
    onSave({ ...reseau, ...data });
    toast.success('✅ Réseau enregistré avec succès !');
  };

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="bg-white rounded-lg p-6 w-full max-w-md"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
        >
          <h2 className="text-xl font-semibold mb-4">
            {reseau ? 'Modifier le réseau' : 'Ajouter un réseau'}
          </h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Nom</label>
              <input
                type="text"
                {...register('nom')}
                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              />
              {errors.nom && <p className="text-red-500 text-sm mt-1">{errors.nom.message}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Adresse IP</label>
              <input
                type="text"
                {...register('ip')}
                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              />
              {errors.ip && <p className="text-red-500 text-sm mt-1">{errors.ip.message}</p>}
            </div>
            <div className="flex justify-end space-x-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              >
                Annuler
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Enregistrer
              </button>
            </div>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
