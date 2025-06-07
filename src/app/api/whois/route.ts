// app/api/whois/route.ts
import { NextResponse } from 'next/server';
import whois from 'whois-json';

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  try {
    const { domain } = await req.json();
    if (!domain || typeof domain !== 'string') {
      return NextResponse.json({ error: 'Domaine invalide' }, { status: 400 });
    }
    const cleanDomain = domain.trim().toLowerCase();
    const data = await whois(cleanDomain);
    return NextResponse.json({ success: true, data });
  } catch (err: any) {
    return NextResponse.json({ error: 'Échec de la requête WHOIS' }, { status: 500 });
  }
}
