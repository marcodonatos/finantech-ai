
import { useState } from "react";
import MainLayout from "./layout/MainLayout";
import Dashboard from "./pages/Dashboard";
import Transactions from "./pages/Transactions";
import { useTransactions } from "./hooks/useTransactions";

export default function App() {
  const [activePage, setActivePage] = useState("Dashboard");

  const {
    transactions,
    summary,
    addTransaction,
    updateTransaction,
    deleteTransaction,
  } = useTransactions();

  return (
    <MainLayout
      activePage={activePage}
      onNavigate={setActivePage}
    >
      {activePage === "Dashboard" ? (
        <Dashboard summary={summary} transactions={transactions} />
      ) : activePage === "Movimentações" ? (
        <Transactions
          transactions={transactions}
          onAdd={addTransaction}
          onUpdate={updateTransaction}
          onDelete={deleteTransaction}
        />
      ) : (
        <section className="rounded-2xl border border-slate-200 bg-white p-8">
          <h2 className="text-xl font-bold text-slate-900">
            {activePage}
          </h2>
          <p className="mt-2 text-sm text-slate-500">
            Este módulo será desenvolvido nas próximas etapas.
          </p>
        </section>
      )}
    </MainLayout>
  );
}
