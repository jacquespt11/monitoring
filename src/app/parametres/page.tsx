"use client";

import { useState } from "react";
import { User, Moon, Sun, Key, Save } from "lucide-react";
import { Input } from "@/components/ui/input";
import Button from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

export default function ParametresPage() {
  const [nom, setNom] = useState("Jean Dupont");
  const [email, setEmail] = useState("jean.dupont@example.com");
  const [theme, setTheme] = useState("dark");
  const [apiKey, setApiKey] = useState("sk-1234-abcde");

  const handleSave = () => {
    // Implémentez la logique de sauvegarde ici
    console.log("Paramètres enregistrés :", { nom, email, theme, apiKey });
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8 text-gray-200">
      <div className="flex items-center gap-3 mb-6">
        <User size={28} className="text-blue-400" />
        <h1 className="text-3xl font-bold">Paramètres</h1>
      </div>

      {/* Section Profil */}
      <section className="bg-gray-900 border border-gray-800 p-6 rounded-lg space-y-4">
        <h2 className="text-xl font-semibold">Profil</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="nom">Nom</Label>
            <Input
              id="nom"
              value={nom}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
              className="mt-1"
            />
          </div>
        </div>
      </section>

      {/* Section Thème */}
      <section className="bg-gray-900 border border-gray-800 p-6 rounded-lg space-y-4">
        <h2 className="text-xl font-semibold">Préférences</h2>
        <div className="flex items-center gap-4">
          <Switch
            checked={theme === "dark"}
            onCheckedChange={(checked: boolean) => setTheme(checked ? "dark" : "light")}
          />
          <Label htmlFor="theme" className="flex items-center gap-2">
            {theme === "dark" ? <Moon size={20} /> : <Sun size={20} />}
            Mode {theme === "dark" ? "Sombre" : "Clair"}
          </Label>
        </div>
      </section>

      {/* Section Clé API */}
      <section className="bg-gray-900 border border-gray-800 p-6 rounded-lg space-y-4">
        <h2 className="text-xl font-semibold">Clé API</h2>
        <div>
          <Label htmlFor="apiKey">Clé API</Label>
          <Input
            id="apiKey"
            value={apiKey}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
            className="mt-1"
          />
        </div>
      </section>

      {/* Bouton de sauvegarde */}
      <div className="flex justify-end">
        <Button onClick={handleSave} className="flex items-center gap-2">
          <Save size={20} />
          Enregistrer
        </Button>
      </div>
    </div>
  );
}
