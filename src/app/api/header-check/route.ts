// /app/api/header-check/route.ts

import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { domain } = body;

    if (!domain) {
      return NextResponse.json({ error: "Domaine requis." }, { status: 400 });
    }

    const url = `https://${domain}`;
    const res = await fetch(url, { method: "HEAD" });

    // Assurer que les headers sont toujours un objet
    const rawHeaders = res.headers || {};
    const headers: Record<string, string> = {};

    // Convertir les headers en objet plat
    rawHeaders.forEach?.((value: string, key: string) => {
      headers[key] = value;
    });

    return NextResponse.json({ headers });
  } catch (error) {
    console.error("Erreur Header Check:", error);
    return NextResponse.json({ headers: {} }); // Toujours renvoyer un objet headers
  }
}
