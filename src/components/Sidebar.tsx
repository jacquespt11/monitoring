"use client";

import {
  Home,
  Globe,
  Settings,
  AlertCircle,
  BarChart,
  Wrench,
  LogOut,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { name: "Dashboard", icon: Home, href: "/dashboard" },
  { name: "Réseaux", icon: Globe, href: "/reseaux" },
  { name: "Tests & Outils", icon: Wrench, href: "/outils" },
  { name: "Statistiques", icon: BarChart, href: "/statistiques" },
  { name: "Alertes", icon: AlertCircle, href: "/alertes" },
  { name: "Paramètres", icon: Settings, href: "/parametres" },
  { name: "Déconnexion", icon: LogOut, href: "/logout" },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 h-screen bg-gray-1000 text-gray-500 p-4 flex flex-col">
      {/* Header avec Logo + Titre */}
      <div className="flex flex-col items-center mb-8">
        <img
          className="rounded-full mb-2"
          src="https://pfst.cf2.poecdn.net/base/image/64c3850b614193d3055da1fa4d03ac86fc68f7315418746e6ffabd98e01f8064?w=1024&h=768&pmaid=392086489"
          alt="Système de Surveillance"
          width={80}
          height={80}
        />
        <h1 className="text-lg font-bold text-gray-400 text-center">
          <strong>Système</strong> de Surveillance
        </h1>
      </div>
      
      {/* Navigation */}
      <nav className="flex flex-col gap-4">
        {navItems.map(({ name, icon: Icon, href }) => (
          <Link
            key={name}
            href={href}
            className={`flex items-center gap-3 px-3 py-2 rounded-md hover:bg-gray-800 transition ${
              pathname === href ? "bg-gray-800" : ""
            }`}
          >
            {Icon ? <Icon size={20} /> : <span>🛠️</span>}
            <span>{name}</span>
          </Link>
        ))}
      </nav>
    </aside>
  );
}