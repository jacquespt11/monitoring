// app/api/dns/route.ts
import { NextResponse } from "next/server";
import dns from "dns/promises";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const { domain } = await req.json();
    if (!domain || typeof domain !== "string") {
      return NextResponse.json({ success: false, error: "Domaine invalide" }, { status: 400 });
    }

    const clean = domain.trim();
    const recordTypes = ["A", "AAAA", "MX", "CNAME", "NS", "TXT"];
    const results: Record<string, any[]> = {};

    await Promise.all(
      recordTypes.map(async (type) => {
        try {
          const entries = await dns.resolve(clean, type as any);
          results[type] = entries;
        } catch {
          results[type] = [];
        }
      })
    );

    return NextResponse.json({ success: true, domain: clean, records: results });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: "Échec du DNS Lookup" }, { status: 500 });
  }
}
