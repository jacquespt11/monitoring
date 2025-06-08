"use client";

import {
  Home,
  Globe,
  Settings,
  AlertCircle,
  BarChart,
  Wrench,
  Menu,
  ChevronLeft,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import AuthButton from "./AuthButton";

const navItems = [
  { name: "Dashboard", icon: Home, href: "/dashboard" },
  { name: "Réseaux", icon: Globe, href: "/reseaux" },
  { name: "Tests & Outils", icon: Wrench, href: "/outils" },
  { name: "Statistiques", icon: BarChart, href: "/statistiques" },
  { name: "Alertes", icon: AlertCircle, href: "/alertes" },
  { name: "Paramètres", icon: Settings, href: "/parametres" },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={`${
        collapsed ? "w-20" : "w-64"
      } h-screen bg-gray-950 text-gray-500 px-4 py-6 flex flex-col fixed left-0 top-0 z-40 transition-all duration-300`}
    >
      {/* Toggle Collapse Button */}
        <div className="flex flex-row items-center mb-8">
        {!collapsed && (
          <>
            <img
              className="rounded-full mb-2"
              src="https://pfst.cf2.poecdn.net/base/image/64c3850b614193d3055da1fa4d03ac86fc68f7315418746e6ffabd98e01f8064?w=1024&h=768&pmaid=392086489"
              alt="Système de Surveillance"
              width={70}
              height={80}
            />
            <h1 className="text-lg font-bold text-gray-400 text-center">
              <strong>Système</strong> de Surveillance
            </h1>
          </>
        )}
      </div>
      <button
        className="text-gray-400 hover:text-white"
        onClick={() => setCollapsed(!collapsed)}
      >
        {collapsed ? <Menu size={20} /> : <ChevronLeft size={20} />}
      </button>

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
            {!collapsed && <span>{name}</span>}
          </Link>
        ))}
        {/* AuthButton personnalisé */}
          <div className="mt-6 px-3">
            <AuthButton />
          </div>
      </nav>
    </aside>
  );
}