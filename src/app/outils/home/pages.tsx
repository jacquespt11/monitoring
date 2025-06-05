"use client";

import Link from "next/link";
import { Globe, Network, Wifi, Route, Server, Map } from "lucide-react";

export default function OutilsAccueil() {
  const outils = [
    { nom: "DNS Lookup", chemin: "/outils/dns", icone: <Globe size={20} /> },
    { nom: "Ping", chemin: "/outils/ping", icone: <Wifi size={20} /> },
    { nom: "Scan Ports", chemin: "/outils/ports", icone: <Server size={20} /> },
    { nom: "Whois", chemin: "/outils/whois", icone: <Network size={20} /> },
    { nom: "Traceroute", chemin: "/outils/traceroute", icone: <Route size={20} /> },
    { nom: "Ssl Checker", chemin: "/outils/ssl", icone: <Network size={20} /> },
    { nom: "Geoip", chemin: "/outils/geoip", icone: <Map size={20} /> },
  ];

  return (
    <main className="p-6 text-gray-100 min-h-screen bg-gray-950">
      <h1 className="text-3xl font-bold mb-6">🧰 Outils de Diagnostic Réseau</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {outils.map((outil) => (
          <Link
            key={outil.nom}
            href={outil.chemin}
            className="bg-gray-900 hover:bg-gray-800 transition-colors border border-gray-700 rounded-lg p-5 flex items-center gap-4 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label={`Aller à l'outil ${outil.nom}`}
          >
            <div className="text-blue-400">{outil.icone}</div>
            <span className="text-lg font-medium">{outil.nom}</span>
          </Link>
        ))}
      </div>
    </main>
  );
}
