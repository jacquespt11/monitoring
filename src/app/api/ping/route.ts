import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const target = searchParams.get("target");

  if (!target) {
    return NextResponse.json({ message: "Cible invalide." }, { status: 400 });
  }

  try {
    // On simule un ping par un simple fetch HEAD
    const res = await fetch(`https://${target}`, { method: "HEAD", cache: "no-store" });
    if (!res.ok) throw new Error("Réponse non valide");

    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ message: "Échec de la connexion." }, { status: 500 });
  }
}
