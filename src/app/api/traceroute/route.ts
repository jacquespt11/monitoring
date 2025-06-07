// app/api/traceroute/route.ts
import { NextResponse } from 'next/server';
import { exec } from 'child_process';
import util from 'util';
import os from 'os';

const execAsync = util.promisify(exec);

export async function POST(req: Request) {
  try {
    const { target } = await req.json();

    if (!target || typeof target !== 'string') {
      return NextResponse.json({ error: 'Cible invalide' }, { status: 400 });
    }

    // Détecter le système d'exploitation pour utiliser la commande appropriée
    const isWindows = os.platform() === 'win32';
    const command = isWindows ? `tracert -d ${target}` : `traceroute -n ${target}`;

    const { stdout } = await execAsync(command, { timeout: 10000 });

    return NextResponse.json({ success: true, output: stdout });
  } catch (err: any) {
    return NextResponse.json({ error: 'Erreur lors de l\'exécution de traceroute' }, { status: 500 });
  }
}
