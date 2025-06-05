"use client";

import { Bell } from "lucide-react";

export default function Header({ title }: { title: string }) {
  return (
    <header className="fixed left-65 right-0 top-0 z-30 flex items-center justify-between px-6 py-4 bg-gray-950 text-gray-300 shadow border-b border-gray-800">
      <h1 className="text-xl font-semibold">{title}</h1>

      <div className="flex items-center gap-4">
        <input
          type="text"
          placeholder="Recherche..."
          className="px-3 py-1 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:outline-none"
        />
        <div className="relative">
          <Bell size={20} />
          <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
        </div>
        <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center">
          👤
        </div>
      </div>
    </header>
  );
}
