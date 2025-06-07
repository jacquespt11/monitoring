"use client";

import { useState } from "react";
import { Network, Server, Globe } from "lucide-react";
import { PDFDocument, rgb, StandardFonts } from "pdf-lib";

function Skeleton({ height }: { height: number }) {
  return (
    <div
      style={{ height, backgroundColor: "#27272a", borderRadius: 4 }}
      className="w-full animate-pulse mb-1"
    />
  );
}

type User = {
  name: string;
  avatarUrl: string;
};

const mockUser: User = {
  name: "Perfect TSHIBANGU JACQUES",
  avatarUrl:
    "https://pfst.cf2.poecdn.net/base/image/64c3850b614193d3055da1fa4d03ac86fc68f7315418746e6ffabd98e01f8064?w=1024&h=768",
};

export default function NetworkToolsPage() {
  const [domain, setDomain] = useState("");
  const [portsResult, setPortsResult] = useState<any>(null);
  const [headersResult, setHeadersResult] = useState<any>(null);
  const [loadingPorts, setLoadingPorts] = useState(false);
  const [loadingHeaders, setLoadingHeaders] = useState(false);
  const [error, setError] = useState("");

  const handleScanPorts = async () => {
    setLoadingPorts(true);
    setError("");
    try {
      const res = await fetch("/api/port-scan", {
        method: "POST",
        body: JSON.stringify({ domain }),
      });
      const data = await res.json();
      setPortsResult(data);
    } catch {
      setError("Erreur lors du scan des ports.");
    } finally {
      setLoadingPorts(false);
    }
  };

  const handleCheckHeaders = async () => {
    setLoadingHeaders(true);
    setError("");
    try {
      const res = await fetch("/api/header-check", {
        method: "POST",
        body: JSON.stringify({ domain }),
      });
      const data = await res.json();
      setHeadersResult(data);
    } catch {
      setError("Erreur lors de la récupération des headers.");
    } finally {
      setLoadingHeaders(false);
    }
  };

  const generatePDF = async (
    domain: string,
    ports: number[],
    headers: Record<string, string>,
    user: User
  ) => {
    const pdfDoc = await PDFDocument.create();

    // Réponses page de garde
    const coverPage = pdfDoc.addPage();
    const { width, height } = coverPage.getSize();
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

    let y = height - 60;
    const drawCentered = (txt: string, size = 16) => {
      const tw = font.widthOfTextAtSize(txt, size);
      coverPage.drawText(txt, {
        x: (width - tw) / 2,
        y,
        size,
        font: size > 12 ? fontBold : font,
        color: rgb(0.2, 0.2, 0.2),
      });
      y -= size + 12;
    };

    // Logo avatar
    try {
      const imgBytes = await fetch(user.avatarUrl).then((r) => r.arrayBuffer());
      const img = await pdfDoc.embedPng(imgBytes);
      coverPage.drawImage(img, {
        x: width / 2 - 50,
        y: height - 160,
        width: 100,
        height: 100,
      });
      y -= 140;
    } catch {
      y -= 20;
    }

    drawCentered("🔐 Rapport de Diagnostic Réseau", 20);
    drawCentered(`📅 Date : ${new Date().toLocaleDateString("fr-FR")}`, 14);
    drawCentered(`👤 Auteur : ${user.name}`, 14);
    drawCentered(`🌐 Domaine analysé : ${domain}`, 14);

    // Contenu
    const contentPage = pdfDoc.addPage();
    let cy = height - 60;

    contentPage.drawText("✅ Ports ouverts", {
      x: 40,
      y: cy,
      size: 14,
      font: fontBold,
      color: rgb(0, 0.4, 0),
    });
    cy -= 24;
    if (ports.length > 0) {
      ports.forEach((p) => {
        contentPage.drawText(`• Port ${p}`, {
          x: 50,
          y: cy,
          size: 12,
          font,
          color: rgb(0, 0, 0),
        });
        cy -= 16;
      });
    } else {
      contentPage.drawText("Aucun port ouvert détecté.", {
        x: 50,
        y: cy,
        size: 12,
        font,
        color: rgb(0.5, 0, 0),
      });
      cy -= 16;
    }

    cy -= 20;
    contentPage.drawText("🔎 Entêtes HTTP", {
      x: 40,
      y: cy,
      size: 14,
      font: fontBold,
      color: rgb(0, 0.2, 0.6),
    });
    cy -= 24;
    Object.entries(headers).forEach(([k, v]) => {
      contentPage.drawText(`${k}: ${v}`, {
        x: 50,
        y: cy,
        size: 11,
        font,
        color: rgb(0.1, 0.1, 0.1),
      });
      cy -= 14;
    });

    const pdfBytes = await pdfDoc.save();

  const blob = new Blob([new Uint8Array(pdfBytes)], { type: "application/pdf" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `rapport_${domain}.pdf`;
  link.click();
};

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="flex items-center gap-3 mb-4">
        <Network size={28} className="text-purple-400" />
        <h1 className="text-2xl font-bold text-white">Analyse Réseau</h1>
      </div>

      <p className="text-gray-400">
        Scanner les ports ouverts d’un domaine et analyser les entêtes HTTP.
      </p>

      <input
        type="text"
        placeholder="example.com"
        value={domain}
        onChange={(e) => setDomain(e.target.value)}
        className="w-full px-4 py-2 rounded bg-gray-800 border border-gray-700 text-white focus:outline-none"
      />

      {/* Scan Ports */}
      <div className="bg-gray-900 border border-gray-800 p-4 rounded-lg space-y-2">
        <div className="flex items-center gap-2">
          <Server className="text-yellow-400" />
          <h2 className="text-lg text-white font-semibold">Scan des ports</h2>
        </div>
        <button
          onClick={handleScanPorts}
          disabled={loadingPorts}
          className="bg-yellow-400 text-black px-4 py-2 rounded hover:bg-yellow-500"
        >
          {loadingPorts ? "Scan en cours..." : "Scanner les ports"}
        </button>
        {loadingPorts ? (
          <>
            <Skeleton height={20} />
            <Skeleton height={20} />
            <Skeleton height={20} />
          </>
        ) : (
          portsResult && (
            <div className="text-sm text-green-400 mt-2">
              <h3 className="font-semibold">Ports ouverts :</h3>
              <ul className="list-disc ml-5 space-y-1">
                {portsResult.openPorts.map((port: number) => (
                  <li key={port}>Port {port} ouvert</li>
                ))}
              </ul>
            </div>
          )
        )}
      </div>

      {/* Header Checker */}
      <div className="bg-gray-900 border border-gray-800 p-4 rounded-lg space-y-2">
        <div className="flex items-center gap-2">
          <Globe className="text-blue-400" />
          <h2 className="text-lg text-white font-semibold">Analyse des entêtes HTTP</h2>
        </div>
        <button
          onClick={handleCheckHeaders}
          disabled={loadingHeaders}
          className="bg-blue-400 text-black px-4 py-2 rounded hover:bg-blue-500"
        >
          {loadingHeaders ? "Chargement..." : "Analyser les headers"}
        </button>
        {loadingHeaders ? (
          <>
            <Skeleton height={20} />
            <Skeleton height={20} />
            <Skeleton height={20} />
          </>
        ) : (
          headersResult && headersResult.headers && (
            <div className="text-sm text-green-300 mt-2 space-y-1">
              {Object.entries(headersResult.headers).map(([key, value]) => (
                <div key={key}>
                  <strong>{key}: </strong>
                  {String(value)}
                </div>
              ))}
            </div>
          )
        )}
        {portsResult && headersResult && (
          <button
            onClick={() =>
              generatePDF(domain, portsResult.openPorts, headersResult.headers, mockUser)
            }
            className="bg-green-500 text-black px-4 py-2 rounded hover:bg-green-600"
          >
            📄 Télécharger le rapport PDF
          </button>
        )}
      </div>

      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
}
