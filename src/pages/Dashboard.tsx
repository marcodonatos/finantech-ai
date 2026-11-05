
import {
  Wallet,
  TrendingUp,
  TrendingDown,
  PiggyBank,
  Sparkles,
  ArrowRight,
} from "lucide-react";

import type { Summary, Transaction } from "../types";

interface DashboardProps {
  summary: Summary;
  transactions: Transaction[];
}



import SummaryCard from "../components/dashboard/SummaryCard";
import CashFlowChart from "../components/dashboard/CashFlowChart";
import ExpenseChart from "../components/dashboard/ExpenseChart";
import RecentTransactions from "../components/dashboard/RecentTransactions";

const currency = (value: number) =>
  value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

export default function Dashboard({
  summary,
  transactions,
}: DashboardProps) {
  return (
    <div className="space-y-6">

      {/* Boas-vindas */}
      <section>
        <h2 className="text-2xl font-bold text-slate-900">
          Visão geral financeira
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Acompanhe sua vida financeira em um só lugar.
        </p>
      </section>

      {/* Indicadores */}
      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">

         <SummaryCard
          title="Saldo disponível"
          value={currency(summary.balance)}
          description="Saldo do período"
          icon={Wallet}
        />

        <SummaryCard
          title="Receitas"
          value={currency(summary.income)}
          description="Entradas do mês"
          icon={TrendingUp}
        />

        <SummaryCard
          title="Despesas"
          value={currency(summary.expenses)}
          description="Saídas do mês"
          icon={TrendingDown}
          positive={false}
        />

        <SummaryCard
          title="Taxa de economia"
          value={`${summary.savingsRate.toFixed(1)}%`}
          description="Percentual da renda economizado"
          icon={PiggyBank}
        />

      </section>

      {/* Gráficos */}
      <section className="grid grid-cols-1 gap-5 xl:grid-cols-2">
        <CashFlowChart transactions={transactions} />
        <ExpenseChart transactions={transactions} />
      </section>

      {/* Assistente IA */}
      <section className="rounded-2xl border border-blue-100 bg-gradient-to-r from-blue-50 to-white p-5 md:p-6">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <div className="flex items-start gap-3">
            <div className="rounded-xl bg-blue-600 p-3 text-white">
              <Sparkles size={23} />
            </div>

            <div>
              <h3 className="font-bold text-slate-900">
                Seu assistente financeiro
              </h3>

              <p className="mt-1 max-w-xl text-sm leading-6 text-slate-600">
                Em breve, sua inteligência financeira poderá
                analisar seus gastos e identificar oportunidades
                de economia.
              </p>
            </div>
          </div>

          <button
            disabled
            className="flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white opacity-60"
          >
            Conhecer assistente
            <ArrowRight size={17} />
          </button>
        </div>
      </section>

      {/* Movimentações */}
      <RecentTransactions transactions={transactions.slice(0, 5)} />

    </div>
  );
}
