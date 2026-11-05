
import { useState } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";

interface MainLayoutProps {
  children: React.ReactNode;
  activePage: string;
  onNavigate: (page: string) => void;
}

export default function MainLayout({
  children,
  activePage,
  onNavigate,
}: MainLayoutProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 lg:flex">

      <Sidebar
        activePage={activePage}
        onNavigate={onNavigate}
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
      />

      <div className="min-w-0 flex-1">

        <Header
          title={activePage}
          onMenuClick={() => setMenuOpen(true)}
        />

        <main className="mx-auto max-w-[1600px] p-5 md:p-8">
          {children}
        </main>

      </div>
    </div>
  );
}
