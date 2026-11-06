
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

import type { FinancialPeriod } from "../../utils/financialFilters";

import type { Transaction } from "../../types";

interface CashFlowChartProps {
  transactions: Transaction[];
  period: FinancialPeriod;
}

const currency = (value: number) =>
  value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

export default function CashFlowChart({
  transactions,
  period,
}: CashFlowChartProps) {
  
const cashFlowData = useMemo(() => {
  const today = new Date();

  const validDates = transactions
    .map((transaction) => transaction.date.slice(0, 7))
    .filter((date) => /^\d{4}-\d{2}$/.test(date))
    .sort();

  const start =
    period === "all" && validDates.length > 0
      ? new Date(`${validDates[0]}-01T12:00:00`)
      : new Date(
          today.getFullYear(),
          today.getMonth() -
            (period === "month" ? 0 : period === "3m" ? 2 : 5),
          1
        );

  const end =
    period === "all" && validDates.length > 0
      ? new Date(
          Math.max(
            today.getFullYear(),
            Number(validDates[validDates.length - 1].slice(0, 4))
          ),
          0,
          1
        )
      : today;

  // Para "Todo o período", usamos o último mês cadastrado
  // ou o mês atual, o que for mais recente.
  const lastMonth =
    period === "all" && validDates.length > 0
      ? validDates[validDates.length - 1] >
        `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}`
        ? validDates[validDates.length - 1]
        : `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}`
      : `${end.getFullYear()}-${String(end.getMonth() + 1).padStart(2, "0")}`;

  const months: {
    key: string;
    month: string;
    income: number;
    expenses: number;
  }[] = [];

  const cursor = new Date(start.getFullYear(), start.getMonth(), 1);
  const last = new Date(`${lastMonth}-01T12:00:00`);

  while (cursor <= last) {
    const key = `${cursor.getFullYear()}-${String(
      cursor.getMonth() + 1
    ).padStart(2, "0")}`;

    months.push({
      key,
      month: cursor.toLocaleDateString("pt-BR", {
        month: "short",
        year: "2-digit",
      }),
      income: 0,
      expenses: 0,
    });

    cursor.setMonth(cursor.getMonth() + 1);
  }

  const byMonth = new Map(months.map((month) => [month.key, month]));

  transactions.forEach((transaction) => {
    const month = byMonth.get(transaction.date.slice(0, 7));
    if (!month) return;

    if (transaction.type === "income") {
      month.income += transaction.amount;
    } else {
      month.expenses += transaction.amount;
    }
  });

  return months;
}, [transactions, period]);


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
          Comparativo mensal de receitas e despesas
        </p>
      </div>

      {hasData ? (
        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={cashFlowData}  margin={{ top: 10, right: 15, left: 5, bottom: 5 }}
  barGap={8}>
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
                width={70}
                tickFormatter={(value: number) =>
                  value.toLocaleString("pt-BR", {
                    notation: "compact",
                    maximumFractionDigits: 1,
                  })
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
                radius={[6, 6, 0, 0]}
                maxBarSize={44}
              />

              <Bar
                dataKey="expenses"
                name="Despesas"
                fill="#fb7185"
                radius={[6, 6, 0, 0]}
                maxBarSize={44}
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
