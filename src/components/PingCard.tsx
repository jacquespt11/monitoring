"use client";
import { useState } from "react";
import Modal from "./Modal";
import { Radar } from "lucide-react";

export default function PingCard() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [result, setResult] = useState<string[]>([]);

  const handlePing = () => {
    // Simuler un "ping"
    setResult([
      `PING ${input} (192.168.1.1) 56(84) bytes of data.`,
      `64 bytes from ${input}: icmp_seq=1 ttl=64 time=12.3 ms`,
      `64 bytes from ${input}: icmp_seq=2 ttl=64 time=11.9 ms`,
      `--- ${input} ping statistics ---`,
      `2 packets transmitted, 2 received, 0% packet loss, time 1002ms`
    ]);
  };

  return (
    <>
      <div
        className="bg-gray-800 p-5 rounded-lg shadow-md text-white cursor-pointer hover:bg-gray-700"
        onClick={() => setIsOpen(true)}
      >
        <div className="flex flex-row items-center mb-4 gap-4">
            <Radar className="text-white mb-2" />
            <div>
                <h4 className="text-lg font-semibold mb-2">Ping</h4>
                <p className="text-sm text-gray-400">Tester la connectivité d’un domaine/IP</p>
            </div>
        </div>    
      </div>

      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title="Ping réseau">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="ex: 8.8.8.8 ou google.com"
          className="w-full px-4 py-2 mb-4 bg-gray-700 border border-gray-600 rounded text-white"
        />
        <button
          onClick={handlePing}
          className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded text-white mb-4"
          >
          Lancer Ping
        </button>

        <pre className="bg-black p-3 rounded text-green-400 text-sm overflow-auto">
          {result.map((line, i) => <div key={i}>{line}</div>)}
        </pre>
      </Modal>
    </>
  );
}
