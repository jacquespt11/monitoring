import { NextResponse } from "next/server";
import net from "net";

export async function POST(req: Request) {
  const { domain } = await req.json();

  const portsToScan = [21, 22, 80, 443, 3306, 8080];
  const openPorts: number[] = [];

  const checkPort = (port: number) =>
    new Promise((resolve) => {
      const socket = new net.Socket();
      socket.setTimeout(1000);
      socket.on("connect", () => {
        openPorts.push(port);
        socket.destroy();
        resolve(true);
      });
      socket.on("timeout", () => {
        socket.destroy();
        resolve(false);
      });
      socket.on("error", () => {
        socket.destroy();
        resolve(false);
      });
      socket.connect(port, domain);
    });

  await Promise.all(portsToScan.map((port) => checkPort(port)));

  return NextResponse.json({ openPorts });
}
