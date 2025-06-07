import { NextResponse } from "next/server";
import sslChecker from "ssl-checker";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const { domain } = await req.json();
    if (!domain || typeof domain !== "string") {
      return NextResponse.json({ success: false, error: "Domaine invalide." }, { status: 400 });
    }

    const info = await sslChecker(domain, { method: "GET", port: 443 });

    return NextResponse.json({ success: true, info });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message || "Erreur SSL." }, { status: 500 });
  }
}
