// app/api/statistiques/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const alertes = await prisma.alerte.findMany({
      orderBy: { jour: "asc" },
    });

    const traffic = await prisma.traffic.findMany({
      orderBy: { jour: "asc" },
    });

    return NextResponse.json({ alertes, traffic });
  } catch (error) {
    console.error("Erreur récupération statistiques:", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
