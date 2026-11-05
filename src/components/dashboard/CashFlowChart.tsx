
import { useMemo } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

import type { Transaction } from "../../types";

interface CashFlowChartProps {
  transactions: Transaction[];
}

const currency = (value: number) =>
  value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

export default function CashFlowChart({
  transactions,
}: CashFlowChartProps) {
  const cashFlowData = useMemo(() => {
    const today = new Date();

    const months = Array.from({ length: 6 }, (_, index) => {
      const date = new Date(
        today.getFullYear(),
        today.getMonth() - (5 - index),
        1
      );

      return {
        key: `${date.getFullYear()}-${String(
          date.getMonth() + 1
        ).padStart(2, "0")}`,
        month: date.toLocaleDateString("pt-BR", {
          month: "short",
          year: "2-digit",
        }),
        income: 0,
        expenses: 0,
      };
    });

    transactions.forEach((transaction) => {
      const monthKey = transaction.date.slice(0, 7);

      const month = months.find(
        (item) => item.key === monthKey
      );

      if (!month) return;

      if (transaction.type === "income") {
        month.income += transaction.amount;
      } else {
        month.expenses += transaction.amount;
      }
    });

    return months;
  }, [transactions]);

  const hasData = cashFlowData.some(
    (item) => item.income > 0 || item.expenses > 0
  );

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-6">
        <h3 className="font-bold text-slate-900">
          Fluxo financeiro
        </h3>
        <p className="text-sm text-slate-500">
          Receitas e despesas nos últimos 6 meses
        </p>
      </div>

      {hasData ? (
        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={cashFlowData}>
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                stroke="#e2e8f0"
              />

              <XAxis
                dataKey="month"
                stroke="#94a3b8"
              />

              <YAxis
                stroke="#94a3b8"
                tickFormatter={(value: number) =>
                  `R$${(value / 1000).toLocaleString("pt-BR")}k`
                }
              />

              <Tooltip
                formatter={(value) =>
                  currency(Number(value ?? 0))
                }
              />

              <Legend />

              <Bar
                dataKey="income"
                name="Receitas"
                fill="#2563eb"
                radius={[5, 5, 0, 0]}
              />

              <Bar
                dataKey="expenses"
                name="Despesas"
                fill="#93c5fd"
                radius={[5, 5, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      ) : (
        <div className="flex h-72 items-center justify-center text-center text-sm text-slate-500">
          Nenhuma movimentação nos últimos 6 meses.
        </div>
      )}
    </section>
  );
}
