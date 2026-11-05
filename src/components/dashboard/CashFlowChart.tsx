
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

import { cashFlowData } from "../../components/data/mockData";

export default function CashFlowChart() {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-6">
        <h3 className="font-bold text-slate-900">
          Fluxo financeiro
        </h3>
        <p className="text-sm text-slate-500">
          Receitas e despesas nos últimos meses
        </p>
      </div>

      <div className="h-72 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={cashFlowData}>
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="#e2e8f0"
            />

            <XAxis dataKey="month" stroke="#94a3b8" />
            <YAxis
              stroke="#94a3b8"
              tickFormatter={(value) =>
                `R$${value / 1000}k`
              }
            />

            <Tooltip
              formatter={(value) =>
                `R$ ${Number(value).toLocaleString("pt-BR")}`
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
    </section>
  );
}
