"use client";
import { useState } from "react";
import Modal from "./Modal";
import { Network } from "lucide-react";

export default function TracerouteCard() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [result, setResult] = useState<string[]>([]);

  const handleTraceroute = () => {
    setResult([
      `traceroute to ${input} (8.8.8.8), 30 hops max`,
      `1  192.168.0.1  2.123 ms`,
      `2  10.20.0.1  4.543 ms`,
      `3  172.16.5.1  8.512 ms`,
      `4  8.8.8.8  15.023 ms`,
      `Trace complete.`
    ]);
  };

  return (
    <>
      <div
        className="bg-gray-800 p-5 rounded-lg shadow-md text-white cursor-pointer hover:bg-gray-700"
        onClick={() => setIsOpen(true)}
      >
        <div className="flex flex-row items-center mb-4 gap-4">
          <Network className="text-white" />
          <div>
            <h4 className="text-lg font-semibold mb-2">Traceroute</h4>
            <p className="text-sm text-gray-400">Tracer le chemin jusqu’à une IP</p>
          </div>
        </div>
        
      </div>

      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title="Traceroute réseau">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="ex: 8.8.8.8 ou google.com"
          className="w-full px-4 py-2 mb-4 bg-gray-700 border border-gray-600 rounded text-white"
        />
        <button
          onClick={handleTraceroute}
          className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded text-white mb-4"
        >
          Lancer Traceroute
        </button>

        <pre className="bg-black p-3 rounded text-yellow-300 text-sm overflow-auto">
          {result.map((line, i) => <div key={i}>{line}</div>)}
        </pre>
      </Modal>
    </>
  );
}
