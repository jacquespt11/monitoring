"use client";
import { Metadata } from "next";
import { BarChart3, Activity, AlertTriangle } from "lucide-react";
import dynamic from "next/dynamic";
import { ApexOptions } from "apexcharts";


// Chargement dynamique du composant Chart pour éviter les problèmes SSR
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

export default function StatistiquesPage() {
  // Données simulées pour les graphiques
  const trafficData = {
    series: [
      {
        name: "Trafic (Mbps)",
        data: [120, 200, 150, 80, 70, 110, 130],
      },
    ],
    options: {
      chart: {
        type: "line" as const,
        height: 350,
        toolbar: {
          show: false,
        },
      },
      xaxis: {
        categories: ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"],
      },
      colors: ["#4ade80"],
      stroke: {
        curve: "smooth" as "smooth",
      },
      grid: {
        borderColor: "#374151",
      },
    },
  };

  const alertesData = {
    series: [
      {
        name: "Alertes",
        data: [5, 3, 6, 2, 4, 1, 0],
      },
    ],
    options: {
      chart: {
        type: "bar" as const,
        height: 350,
        toolbar: {
          show: false,
        },
      },
      xaxis: {
        categories: ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"],
      },
      colors: ["#f87171"],
      grid: {
        borderColor: "#374151",
      },
    },
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      <div className="flex items-center gap-3 mb-6">
        <BarChart3 size={28} className="text-blue-400" />
        <h1 className="text-3xl font-bold text-white">Statistiques Réseau</h1>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {/* Carte du trafic réseau */}
        <div className="bg-gray-900 border border-gray-800 p-5 rounded-lg">
          <div className="flex items-center gap-2 mb-4">
            <Activity size={20} className="text-green-400" />
            <h2 className="text-xl text-white font-semibold">Trafic Réseau</h2>
          </div>
          <Chart
            options={trafficData.options}
            series={trafficData.series}
            type="line"
            height={300}
          />
        </div>

        {/* Carte des alertes */}
        <div className="bg-gray-900 border border-gray-800 p-5 rounded-lg">
          <div className="flex items-center gap-2 mb-4">
            <AlertTriangle size={20} className="text-red-400" />
            <h2 className="text-xl text-white font-semibold">Alertes</h2>
          </div>
          <Chart
            options={alertesData.options}
            series={alertesData.series}
            type="bar"
            height={300}
          />
        </div>
      </div>
    </div>
  );
}
