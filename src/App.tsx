
import { useState } from "react";
import MainLayout from "./layout/MainLayout";
import Dashboard from "./pages/Dashboard";
import Transactions from "./pages/Transactions";
import Goals from "./pages/Goals";

import { useTransactions } from "./hooks/useTransactions";
import { useGoals } from "./hooks/useGoals";

export default function App() {
  const [activePage, setActivePage] = useState("Dashboard");

  const {
    transactions,
    addTransaction,
    updateTransaction,
    deleteTransaction,
  } = useTransactions();

  const {
    goals,
    addGoal,
    updateGoal,
    deleteGoal,
    contributeToGoal,
  } = useGoals();

  return (
    <MainLayout
      activePage={activePage}
      onNavigate={setActivePage}
    >
      {activePage === "Dashboard" ? (
        <Dashboard transactions={transactions} />
      ) : activePage === "Movimentações" ? (
        <Transactions
          transactions={transactions}
          onAdd={addTransaction}
          onUpdate={updateTransaction}
          onDelete={deleteTransaction}
        />
      ) : activePage === "Planejamento" ? (
        <Goals
          goals={goals}
          onAdd={addGoal}
          onUpdate={updateGoal}
          onDelete={deleteGoal}
          onContribute={contributeToGoal}
        />
      ) : (
        <section className="rounded-2xl border border-slate-200 bg-white p-8">
          <h2 className="text-xl font-bold text-slate-900">
            {activePage}
          </h2>
          <p className="mt-2 text-sm text-slate-500">
            Este módulo será desenvolvido nas próximas etapas
            do FinanTech AI.
          </p>
        </section>
      )}
    </MainLayout>
  );
}
