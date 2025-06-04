"use client";
import { useState } from "react";
import Modal from "./Modal";
import { LocateIcon } from "lucide-react";

export default function PortScanCard() {
  const [isOpen, setIsOpen] = useState(false);
  const [target, setTarget] = useState("");
  const [result, setResult] = useState<string[]>([]);

  const handleScan = () => {
    setResult([
      `Scan de ${target}`,
      `Port 22 (SSH) : ouvert`,
      `Port 80 (HTTP) : ouvert`,
      `Port 443 (HTTPS) : fermé`,
      `Port 3306 (MySQL) : fermé`,
    ]);
  };

  return (
    <>
      <div
        onClick={() => setIsOpen(true)}
        className="bg-gray-800 p-5 rounded-lg shadow-md text-white cursor-pointer hover:bg-gray-700"
      >
        <div className="flex flex-row items-center mb-4 gap-4">
          <LocateIcon className="text-white" />
            <div>
                <h4 className="text-lg font-semibold mb-2">Scan de Port</h4>
                <p className="text-sm text-gray-400">Scanner les ports d’un hôte</p>
            </div>
        </div>
        
      </div>

      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title="Scan de Ports">
        <input
          type="text"
          placeholder="ex: 192.168.1.1"
          value={target}
          onChange={(e) => setTarget(e.target.value)}
          className="w-full px-4 py-2 mb-4 bg-gray-700 border border-gray-600 rounded text-white"
        />
        <button
          onClick={handleScan}
          className="bg-rose-600 hover:bg-rose-700 px-4 py-2 rounded text-white mb-4"
        >
          Scanner
        </button>

        <pre className="bg-black p-3 rounded text-pink-300 text-sm overflow-auto">
          {result.map((line, i) => <div key={i}>{line}</div>)}
        </pre>
      </Modal>
    </>
  );
}
