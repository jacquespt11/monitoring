"use client";
import { useState } from "react";
import Modal from "./Modal";
import { SearchCode } from "lucide-react";

export default function DnsLookupCard() {
  const [isOpen, setIsOpen] = useState(false);
  const [domain, setDomain] = useState("");
  const [result, setResult] = useState<string[]>([]);

  const handleLookup = () => {
    setResult([
      `Nom de domaine : ${domain}`,
      `A Record : 142.250.184.238`,
      `NS Record : ns1.google.com`,
      `MX Record : 10 alt1.aspmx.l.google.com.`,
      `TTL : 300`,
    ]);
  };

  return (
    <>
      <div
        onClick={() => setIsOpen(true)}
        className="bg-gray-800 p-5 rounded-lg shadow-md text-white cursor-pointer hover:bg-gray-700"
      >
        <div className="flex flex-row items-center mb-4 gap-4">
          <SearchCode className="text-white" />
          <div>
            <h4 className="text-lg font-semibold mb-2">DNS Lookup</h4>
            <p className="text-sm text-gray-400">Résoudre les infos DNS</p>
          </div>
        </div>

        <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title="DNS Lookup">
          <input
            type="text"
            placeholder="ex: google.com"
            value={domain}
            onChange={(e) => setDomain(e.target.value)}
            className="w-full px-4 py-2 mb-4 bg-gray-700 border border-gray-600 rounded text-white"
          />
          <button
            onClick={handleLookup}
            className="bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded text-white mb-4"
          >
            Rechercher
          </button>

          <pre className="bg-black p-3 rounded text-green-300 text-sm overflow-auto">
            {result.map((line, i) => <div key={i}>{line}</div>)}
          </pre>
        </Modal>
      </div>
    </>
  );
}
