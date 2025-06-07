"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import { useState } from "react";

function cn(...classes: (string | undefined | false)[]) {
  return classes.filter(Boolean).join(" ");
}

const tools = [
  { name: "🏠 Home", path: "/outils/home" },
  { name: "📶 Ping", path: "/outils/ping" },
  { name: "🧭 Traceroute", path: "/outils/traceroute" },
  { name: "🔌 Port Scan", path: "/outils/ports" },
  { name: "🌐 DNS Lookup", path: "/outils/dns" },
  { name: "🔍 Whois", path: "/outils/whois" },
  { name: "📍 GeoIP", path: "/outils/geoip" },
  { name: "🔒 SSL Checker", path: "/outils/ssl" },
  { name: "📡 Réseau", path: "/outils/network" }, // Port + Header
];

export default function NavigationBar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <nav className="w-full bg-gray-950 border-b border-gray-800 px-4 py-3 shadow-md">
      <div className="max-w-6xl mx-auto flex items-center justify-between flex-wrap">
        {/* Logo */}
        <div className="text-white text-lg font-bold tracking-tight">  DEVTOOLS</div>

        {/* Mobile menu button */}
        <button
          onClick={() => setOpen(!open)}
          className="sm:hidden text-gray-300 hover:text-white focus:outline-none"
        >
          <Menu />
        </button>

        {/* Menu */}
        <div
          className={cn(
            "w-full sm:flex sm:w-auto flex-col sm:flex-row gap-2 sm:gap-3 mt-3 sm:mt-0 transition-all duration-300 ease-in-out",
            open ? "flex" : "hidden"
          )}
        >
          {tools.map((tool) => (
            <Link
              key={tool.path}
              href={tool.path}
              className={cn(
                "text-sm px-4 py-2 rounded-md font-medium transition duration-200 ease-in-out",
                pathname === tool.path
                  ? "bg-blue-600 text-white"
                  : "text-gray-300 hover:bg-gray-800 hover:text-white"
              )}
              onClick={() => setOpen(false)} // close mobile menu on click
            >
              {tool.name}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
