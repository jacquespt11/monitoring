import "./globals.css";
import Sidebar from "@/components/Sidebar";

export const metadata = {
  title: "Système de Surveillance",
  description: "Dashboard de surveillance réseau",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className="dark">
      <body className="flex bg-gray-950 border border-gray-800">
        <Sidebar />
        <div className="flex-1 flex flex-col min-h-screen">
          {children}
        </div>
      </body>
    </html>
  );
}
