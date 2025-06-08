"use client";
import Header from "@/components/Header";
import NetworkCard from "@/components/NetworkCard";
import ChartCard from "@/components/ChartCard";
import NetworkToolCard from "@/components/NetworkToolCard";
import { Globe } from "lucide-react";
import PingCard from "@/components/PingCard";
import TracerouteCard from "@/components/TracerouteCard";
import DnsLookupCard from "@/components/DnsLookupCard";
import PortScanCard from "@/components/PortScanCard";
import { getAuthSession } from "@/lib/auth";
import { redirect } from "next/navigation";


const latencyData = [
  { name: "12h", value: 34 },
  { name: "14h", value: 40 },
  { name: "16h", value: 60 },
  { name: "18h", value: 45 },
  { name: "20h", value: 70 },
  { name: "22h", value: 50 },
];

const bandwidthData = [
  { name: "12h", value: 200 },
  { name: "14h", value: 180 },
  { name: "16h", value: 230 },
  { name: "18h", value: 250 },
  { name: "20h", value: 220 },
  { name: "22h", value: 240 },
];

const lossRateData = [
  { name: "12h", value: 2 },
  { name: "14h", value: 4 },
  { name: "16h", value: 1 },
  { name: "18h", value: 3 },
  { name: "20h", value: 2 },
  { name: "22h", value: 5 },
];


type NetworkStatus = "OK" | "LENT" | "HS" | "PERTE";

const networks: {
  name: string;
  status: NetworkStatus;
  latency: number;
  lastTest: string;
}[] = [
  {
    name: "Réseau Principal",
    status: "OK",
    latency: 42,
    lastTest: "2025-06-03 14:12",
  },
  {
    name: "Bureau Limete",
    status: "LENT",
    latency: 180,
    lastTest: "2025-06-03 14:05",
  },
  {
    name: "Agence Gombe",
    status: "HS",
    latency: 0,
    lastTest: "2025-06-03 13:58",
  },
  {
    name: "Serveur Cloud",
    status: "PERTE",
    latency: 120,
    lastTest: "2025-06-03 14:15",
  },
];

export default async function DashboardPage() {
  const session = await getAuthSession();

  if (!session) {
    redirect("/api/auth/signin");
  }
  return (
    <>
      <Header title="Dashboard" />
      <main className="p-6 text-white w-full h-full">
        <section className="mb-10">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">État des Réseaux</h2>
            <button className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-md text-sm font-medium">
              + Ajouter un réseau
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
            {networks.map((net, idx) => (
              <NetworkCard key={idx} {...net} />
            ))}
          </div>
        </section>
        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-6">Outils Réseaux</h2>
          <div className="grid grid-cols-1 h- sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <NetworkToolCard title="Adresse IP"
              description="Renseigner une IP cible ou un domaine"
              icon={<Globe className="text-white" />}
            />
            < PingCard />

            <TracerouteCard />

            <DnsLookupCard />

            <PortScanCard />
          </div>
        </section>
        <section>
          <h2 className="text-2xl font-bold mb-6">Surveillance Technique</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-6">
            <ChartCard title="Latence (ms)" data={latencyData} color="#f97316" />
            <ChartCard title="Bande Passante (Mbps)" data={bandwidthData} color="#10b981" />
            <ChartCard title="Taux de Perte (%)" data={lossRateData} color="#ef4444" />
          </div>
          <div className="bg-red-700 text-white p-4 rounded-md shadow">
            <p>🚨 <strong>Alerte :</strong> Latence élevée détectée sur le réseau WAN !</p>
          </div>
        </section>
      </main>
    </>
  );
}
