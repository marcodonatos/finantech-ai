
import {
  Wallet,
  TrendingUp,
  TrendingDown,
  PiggyBank,
  Sparkles,
  ArrowRight,
} from "lucide-react";

import { useMemo, useState } from "react";

import type { Transaction } from "../types";
import type { FinancialPeriod } from "../utils/financialFilters";

import {
  calculateSummary,
  filterTransactionsByPeriod,
} from "../utils/financialFilters";

import SummaryCard from "../components/dashboard/SummaryCard";
import CashFlowChart from "../components/dashboard/CashFlowChart";
import ExpenseChart from "../components/dashboard/ExpenseChart";
import RecentTransactions from "../components/dashboard/RecentTransactions";

interface DashboardProps {
  transactions: Transaction[];
}


const currency = (value: number): string => {
  return value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
};


export default function Dashboard({
  transactions,
}: DashboardProps) {
  const [period, setPeriod] = useState<FinancialPeriod>("6m");

  const filteredTransactions = useMemo(
    () => filterTransactionsByPeriod(transactions, period),
    [transactions, period]
  );

  const filteredSummary = useMemo(
    () => calculateSummary(filteredTransactions),
    [filteredTransactions]
  );

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

      <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-white p-4">
        <div>
          <p className="font-semibold text-slate-900">
            Período de análise
          </p>
          <p className="text-xs text-slate-500">
            Filtre os indicadores e gráficos financeiros.
          </p>
        </div>

        <select
          aria-label="Selecionar período financeiro"
          value={period}
          onChange={(event) =>
            setPeriod(event.target.value as FinancialPeriod)
          }
          className="rounded-xl border border-blue-200 bg-blue-50 px-4 py-3 text-sm font-semibold text-blue-700 outline-none focus:ring-2 focus:ring-blue-400"
        >
          <option value="month">Mês atual</option>
          <option value="3m">Últimos 3 meses</option>
          <option value="6m">Últimos 6 meses</option>
          <option value="all">Todo o período</option>
        </select>
      </div>

      {/* Indicadores */}
      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">

         <SummaryCard
          title="Saldo disponível"
          value={currency(filteredSummary.balance)}
          description="Saldo"
          icon={Wallet}
        />

        <SummaryCard
          title="Receitas"
          value={currency(filteredSummary.income)}
          description="Entradas"
          icon={TrendingUp}
        />

        <SummaryCard
          title="Despesas"
          value={currency(filteredSummary.expenses)}
          description="Saídas"
          icon={TrendingDown}
          positive={false}
        />

        <SummaryCard
          title="Taxa de economia"
          value={`${filteredSummary.savingsRate.toFixed(1)}%`}
          description="Percentual da renda economizado"
          icon={PiggyBank}
        />

      </section>

      {/* Gráficos */}
      <section className="grid grid-cols-1 gap-5 xl:grid-cols-2">
        <CashFlowChart transactions={filteredTransactions} period={period} />
        <ExpenseChart transactions={filteredTransactions} />
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
      <RecentTransactions transactions={filteredTransactions.slice(0, 5)} />

    </div>
  );
}


