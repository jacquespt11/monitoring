"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
function cn(...classes: (string | undefined | false)[]) {
  return classes.filter(Boolean).join(" ");
}

const tools = [
  { name: "Home tools", path: "/outils/home" },
  { name: "Ping", path: "/outils/ping" },
  { name: "Traceroute", path: "/outils/traceroute" },
  { name: "Port Scan", path: "/outils/ports" },
  { name: "DNS Lookup", path: "/outils/dns" },
  { name: "Whois", path: "/outils/whois" },
  { name: "GeoIP", path: "/outils/geoip" },
  { name: "SSL Checker", path: "/outils/ssl" },
];

export default function NavigationBar() {
  const pathname = usePathname();

  return (
    <nav className="w-full bg-gray-950 border-b border-gray-800 px-4 py-3">
      <div className="max-w-6xl mx-auto flex flex-wrap gap-3">
        {tools.map((tool) => (
          <Link
            key={tool.path}
            href={tool.path}
            className={cn(
              "text-sm px-3 py-2 rounded-md font-medium transition",
              pathname === tool.path ? "bg-blue-600 text-white" : "text-gray-300 hover:bg-gray-800 hover:text-white"
            )}
          >
            {tool.name}
          </Link>
        ))}
      </div>
    </nav>
  );
}
