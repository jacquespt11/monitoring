import NavigationBar from "@/components/NavigationBar";

export default function OutilsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-black text-white">
      <NavigationBar />
      <main className="p-6">{children}</main>
    </div>
  );
}
