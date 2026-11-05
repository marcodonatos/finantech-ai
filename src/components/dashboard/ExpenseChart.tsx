
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

import { expenseData } from "../../components/data/mockData";

const COLORS = [
  "#2563eb",
  "#60a5fa",
  "#93c5fd",
  "#1d4ed8",
  "#bfdbfe",
];

export default function ExpenseChart() {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <h3 className="font-bold text-slate-900">
        Despesas por categoria
      </h3>

      <p className="mb-4 text-sm text-slate-500">
        Distribuição dos seus gastos
      </p>

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
                `R$ ${Number(value).toLocaleString("pt-BR")}`
              }
            />

            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}
