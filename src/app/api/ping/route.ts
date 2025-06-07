import { NextResponse } from "next/server";
import { exec } from "child_process";

export const dynamic = "force-dynamic"; // Requis pour App Router

// ⏱ Exécuter une commande avec un timeout
const execWithTimeout = (cmd: string, timeoutMs = 5000): Promise<string> => {
  return new Promise((resolve, reject) => {
    const child = exec(cmd, { timeout: timeoutMs }, (error, stdout, stderr) => {
      if (error) {
        reject(stderr || error.message);
      } else {
        resolve(stdout);
      }
    });

    // Si timeout manuel voulu : setTimeout(() => child.kill(), timeoutMs);
  });
};

export async function POST(req: Request) {
  try {
    const { host } = await req.json();

    if (!host || typeof host !== "string" || host.length > 100) {
      return NextResponse.json(
        { success: false, error: "Hôte invalide." },
        { status: 400 }
      );
    }

    const safeHost = host.replace(/[^a-zA-Z0-9\.\-]/g, "");

    // Limite à 4 paquets pour aller vite
    const cmd = process.platform === "win32"
      ? `ping -n 2 ${safeHost}`
      : `ping -c 2 -W 3 ${safeHost}`;

    const output = await execWithTimeout(cmd, 5000);

    return NextResponse.json({
      success: true,
      output,
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: "Échec du ping ou hôte injoignable." },
      { status: 500 }
    );
  }
}
