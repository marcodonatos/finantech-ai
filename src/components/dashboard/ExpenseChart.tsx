
import { useMemo } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

import type { Transaction } from "../../types";

interface ExpenseChartProps {
  transactions: Transaction[];
}

const COLORS = [
  "#2563eb",
  "#60a5fa",
  "#93c5fd",
  "#1d4ed8",
  "#bfdbfe",
  "#1e40af",
  "#3b82f6",
];

const currency = (value: number) =>
  value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

export default function ExpenseChart({
  transactions,
}: ExpenseChartProps) {
  const expenseData = useMemo(() => {
    const categories: Record<string, number> = {};

    transactions
      .filter((transaction) => transaction.type === "expense")
      .forEach((transaction) => {
        const category = transaction.category.trim() || "Outros";

        categories[category] =
          (categories[category] || 0) + transaction.amount;
      });

    return Object.entries(categories)
      .map(([name, value]) => ({
        name,
        value,
      }))
      .sort((a, b) => b.value - a.value);
  }, [transactions]);

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <h3 className="font-bold text-slate-900">
        Despesas por categoria
      </h3>

      <p className="mb-4 text-sm text-slate-500">
        Distribuição dos seus gastos cadastrados
      </p>

      {expenseData.length > 0 ? (
        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={expenseData}
                dataKey="value"
                nameKey="name"
                innerRadius={60}
                outerRadius={95}
                paddingAngle={3}
              >
                {expenseData.map((entry, index) => (
                  <Cell
                    key={entry.name}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>

              <Tooltip
                formatter={(value) =>
                  currency(Number(value ?? 0))
                }
              />

              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      ) : (
        <div className="flex h-72 items-center justify-center text-center text-sm text-slate-500">
          Cadastre uma despesa para visualizar o gráfico.
        </div>
      )}
    </section>
  );
}
