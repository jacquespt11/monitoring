// app/api/reseaux/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma"; // on configure ça ensuite

export async function GET() {
  const reseaux = await prisma.reseau.findMany();
  return NextResponse.json(reseaux);
}

export async function POST(req: Request) {
  const body = await req.json();
  const { nom, ip } = body;

  const nouveauReseau = await prisma.reseau.create({
    data: { nom, ip },
  });

  return NextResponse.json(nouveauReseau);
}
