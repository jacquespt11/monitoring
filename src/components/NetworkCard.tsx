import { WifiOff, CheckCircle2, AlertTriangle, TimerReset } from "lucide-react";

type Props = {
  name: string;
  status: "OK" | "HS" | "LENT" | "PERTE";
  latency: number;
  lastTest: string;
};

const statusStyles = {
  OK: {
    icon: <CheckCircle2 className="text-green-500" size={24} />,
    label: "En ligne",
  },
  HS: {
    icon: <WifiOff className="text-red-500" size={24} />,
    label: "Hors service",
  },
  LENT: {
    icon: <AlertTriangle className="text-yellow-500" size={24} />,
    label: "Lent",
  },
  PERTE: {
    icon: <TimerReset className="text-orange-500" size={24} />,
    label: "Perte de paquets",
  },
};

export default function NetworkCard({ name, status, latency, lastTest }: Props) {
  const state = statusStyles[status];

  return (
    <div className="bg-gray-800 rounded-lg p-4 text-white shadow-md hover:shadow-lg transition">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">{name}</h3>
        {state.icon}
      </div>
      <p className="text-sm mt-1">{state.label}</p>
      <div className="mt-4 text-sm space-y-1">
        <p>⏱ Latence : <span className="font-medium">{latency} ms</span></p>
        <p>🧪 Dernier test : {lastTest}</p>
      </div>
    </div>
  );
}
