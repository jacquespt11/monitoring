"use client";
import dynamic from "next/dynamic";
import useSWR from "swr";
import { BarChart3, Activity, AlertTriangle } from "lucide-react";
import { toast } from "sonner";
import { ClipLoader } from "react-spinners";
import type { ApexOptions } from "apexcharts";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function StatistiquesPage() {
  const { data, error, isLoading } = useSWR("/api/statistiques", fetcher);

  if (error) {
    toast.error("Erreur lors du chargement des statistiques !");
    return <p className="text-red-500 p-4">Erreur de chargement.</p>;
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <ClipLoader size={45} color="#4ade80" />
      </div>
    );
  }

  const trafficData = {
    series: [
      {
        name: "Trafic (Mbps)",
        data: data?.traffic.map((t: any) => t.valeur) || [],
      },
    ],
    options: {
      chart: { type: "line", height: 350, toolbar: { show: false } },
      xaxis: { categories: data?.traffic.map((t: any) => t.jour) || [] },
      colors: ["#4ade80"],
      stroke: { curve: "smooth" as const },
      grid: { borderColor: "#374151" },
    } as ApexOptions,
  };

  const alertesData = {
    series: [
      {
        name: "Alertes",
        data: data?.alertes.map((a: any) => a.total) || [],
      },
    ],
    options: {
      chart: { type: "bar", height: 350, toolbar: { show: false } },
      xaxis: { categories: data?.alertes.map((a: any) => a.jour) || [] },
      colors: ["#f87171"],
      grid: { borderColor: "#374151" },
    } as ApexOptions,
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      <div className="flex items-center gap-3 mb-6">
        <BarChart3 size={28} className="text-blue-400" />
        <h1 className="text-3xl font-bold text-white">Statistiques Réseau</h1>
      </div>

      <div className="grid grid-cols-1 gap-6">
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
