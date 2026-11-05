
import { useState } from "react";
import MainLayout from "./components/layout/MainLayout";
import Dashboard from "./components/pages/Dashboard";

export default function App() {
  const [activePage, setActivePage] = useState("Dashboard");

  return (
    <MainLayout
      activePage={activePage}
      onNavigate={setActivePage}
    >
      {activePage === "Dashboard" ? (
        <Dashboard />
      ) : (
        <section className="rounded-2xl border border-slate-200 bg-white p-8">
          <h2 className="text-xl font-bold text-slate-900">
            {activePage}
          </h2>

          <p className="mt-2 text-sm text-slate-500">
            Este módulo será desenvolvido nas próximas etapas
            do FinanTech AI.
          </p>

          <p className="mt-4 text-xs text-blue-600">
            Em desenvolvimento
          </p>
        </section>
      )}
    </MainLayout>
  );
}
