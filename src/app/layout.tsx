import "./globals.css";
import Header from "@/components/Header";
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
      <div className="flex-1 ml-64 bg-gray-950 border-l-1 border-gray-800">
        <Header title="" />
        <main className="pt-20 px-6">{children}</main>
      </div>
      </body>
    </html>
  );
}
