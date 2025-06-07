import { NextResponse } from "next/server";
import geoip from "geoip-lite";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const { ip } = await req.json();
    if (!ip || typeof ip !== 'string') {
      return NextResponse.json({ success: false, error: "IP invalide." }, { status: 400 });
    }

    const data = geoip.lookup(ip);
    if (!data) {
      return NextResponse.json({ success: false, error: "IP non trouvée." }, { status: 404 });
    }

    return NextResponse.json({ success: true, ip, data });
  } catch (err) {
    return NextResponse.json({ success: false, error: "Erreur GeoIP." }, { status: 500 });
  }
}
