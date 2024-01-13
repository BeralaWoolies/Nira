import NavBar from "@/components/NavBar";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <main className="flex max-h-dvh flex-col">
        <NavBar />
        <div className="h-screen">{children}</div>
      </main>
    </>
  );
}
