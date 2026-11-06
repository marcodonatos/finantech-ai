
import { useState } from "react";
import {
  Plus,
  Pencil,
  Trash2,
  TrendingUp,
  TrendingDown,
  Wallet,
  PieChart as PieChartIcon,
  X,
} from "lucide-react";

import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";

import type {
  Investment,
  InvestmentInput,
  InvestmentCategory,
} from "../types";

import {
  calculatePortfolio,
  calculateAllocation,
} from "../utils/investmentCalculations";

interface InvestmentsProps {
  investments: Investment[];
  onAdd: (data: InvestmentInput) => void;
  onUpdate: (id: string, data: InvestmentInput) => void;
  onDelete: (id: string) => void;
}

const categories: InvestmentCategory[] = [
  "Renda fixa",
  "Ações",
  "FIIs",
  "ETFs",
  "Criptomoedas",
  "Outros",
];

const COLORS = [
  "#2563eb",
  "#10b981",
  "#f59e0b",
  "#8b5cf6",
  "#ec4899",
  "#64748b",
];

const currency = (value: number) =>
  value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

const initialForm: InvestmentInput = {
  name: "",
  ticker: "",
  category: "Renda fixa",
  quantity: 1,
  averagePrice: 0,
  currentPrice: 0,
};

export default function Investments({
  investments,
  onAdd,
  onUpdate,
  onDelete,
}: InvestmentsProps) {
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<InvestmentInput>(initialForm);

  const portfolio = calculatePortfolio(investments);
  const allocation = calculateAllocation(investments);

  function openNew() {
    setEditingId(null);
    setForm(initialForm);
    setShowForm(true);
  }

  function openEdit(investment: Investment) {
    setEditingId(investment.id);
    setForm({
      name: investment.name,
      ticker: investment.ticker,
      category: investment.category,
      quantity: investment.quantity,
      averagePrice: investment.averagePrice,
      currentPrice: investment.currentPrice,
    });
    setShowForm(true);
  }

  function save(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const data = {
      ...form,
      name: form.name.trim(),
      ticker: form.ticker.trim().toUpperCase(),
    };

    if (
      !data.name ||
      !Number.isFinite(data.quantity) ||
      data.quantity <= 0 ||
      !Number.isFinite(data.averagePrice) ||
      data.averagePrice < 0 ||
      !Number.isFinite(data.currentPrice) ||
      data.currentPrice < 0
    ) {
      return;
    }

    if (editingId) {
      onUpdate(editingId, data);
    } else {
      onAdd(data);
    }

    setShowForm(false);
    setEditingId(null);
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">
            Minha carteira
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Acompanhe seus investimentos cadastrados.
          </p>
        </div>

        <button
          onClick={openNew}
          className="flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-3 font-semibold text-white hover:bg-blue-700"
        >
          <Plus size={18} />
          Novo investimento
        </button>
      </div>

      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          {
            title: "Total investido",
            value: currency(portfolio.totalInvested),
            icon: Wallet,
          },
          {
            title: "Valor atual",
            value: currency(portfolio.currentValue),
            icon: PieChartIcon,
          },
          {
            title: "Resultado",
            value: currency(portfolio.profit),
            icon: portfolio.profit >= 0
              ? TrendingUp
              : TrendingDown,
          },
          {
            title: "Rentabilidade",
            value: `${portfolio.profitability.toFixed(2)}%`,
            icon: portfolio.profit >= 0
              ? TrendingUp
              : TrendingDown,
          },
        ].map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.title}
              className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
            >
              <div className="flex items-center justify-between gap-2">
                <p className="text-sm text-slate-500">
                  {item.title}
                </p>
                <Icon className="text-blue-600" size={22} />
              </div>
              <p className="mt-4 text-xl font-bold text-slate-900">
                {item.value}
              </p>
            </div>
          );
        })}
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h3 className="font-bold text-slate-900">
          Distribuição da carteira
        </h3>
        <p className="text-sm text-slate-500">
          Composição por categoria de investimento
        </p>

        {allocation.length === 0 ? (
          <p className="py-12 text-center text-slate-500">
            Cadastre investimentos para visualizar o gráfico.
          </p>
        ) : (
          <div className="mt-5 h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={allocation}
                  dataKey="value"
                  nameKey="name"
                  innerRadius={65}
                  outerRadius={105}
                  paddingAngle={3}
                >
                  {allocation.map((item, index) => (
                    <Cell
                      key={item.name}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>

                <Tooltip
                  formatter={(value) => currency(Number(value))}
                />

                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        )}
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h3 className="mb-4 font-bold text-slate-900">
          Meus ativos
        </h3>

        {investments.length === 0 ? (
          <p className="py-8 text-center text-slate-500">
            Nenhum investimento cadastrado.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[650px] text-left text-sm">
              <thead className="border-b text-slate-500">
                <tr>
                  <th className="p-3">Ativo</th>
                  <th className="p-3">Categoria</th>
                  <th className="p-3">Quantidade</th>
                  <th className="p-3">Investido</th>
                  <th className="p-3">Valor atual</th>
                  <th className="p-3">Ações</th>
                </tr>
              </thead>

              <tbody>
                {investments.map((item) => (
                  <tr key={item.id} className="border-b">
                    <td className="p-3">
                      <p className="font-semibold">{item.name}</p>
                      <p className="text-xs text-slate-500">
                        {item.ticker || "Sem código"}
                      </p>
                    </td>

                    <td className="p-3">{item.category}</td>
                    <td className="p-3">{item.quantity}</td>
                    <td className="p-3">
                      {currency(item.quantity * item.averagePrice)}
                    </td>
                    <td className="p-3">
                      {currency(item.quantity * item.currentPrice)}
                    </td>

                    <td className="p-3">
                      <div className="flex gap-3">
                        <button
                          aria-label={`Editar ${item.name}`}
                          onClick={() => openEdit(item)}
                          className="text-blue-600"
                        >
                          <Pencil size={18} />
                        </button>

                        <button
                          aria-label={`Excluir ${item.name}`}
                          onClick={() => {
                            if (window.confirm("Excluir investimento?")) {
                              onDelete(item.id);
                            }
                          }}
                          className="text-red-500"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-slate-950/50 p-4">
          <form
            onSubmit={save}
            className="my-auto w-full max-w-lg space-y-4 rounded-2xl bg-white p-6 shadow-xl"
          >
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold">
                {editingId ? "Editar investimento" : "Novo investimento"}
              </h3>

              <button
                type="button"
                aria-label="Fechar"
                onClick={() => setShowForm(false)}
              >
                <X size={22} />
              </button>
            </div>

            <label className="block text-sm">
              Nome do ativo
              <input
                required
                value={form.name}
                onChange={(event) =>
                  setForm({ ...form, name: event.target.value })
                }
                placeholder="Ex.: Tesouro IPCA+"
                className="mt-1 w-full rounded-xl border p-3"
              />
            </label>

            <label className="block text-sm">
              Código (opcional)
              <input
                value={form.ticker}
                onChange={(event) =>
                  setForm({ ...form, ticker: event.target.value })
                }
                placeholder="Ex.: PETR4"
                className="mt-1 w-full rounded-xl border p-3"
              />
            </label>

            <label className="block text-sm">
              Categoria
              <select
                value={form.category}
                onChange={(event) =>
                  setForm({
                    ...form,
                    category: event.target.value as InvestmentCategory,
                  })
                }
                className="mt-1 w-full rounded-xl border p-3"
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </label>

            <label className="block text-sm">
              Quantidade
              <input
                required
                type="number"
                min="0.000001"
                step="any"
                value={form.quantity}
                onChange={(event) =>
                  setForm({
                    ...form,
                    quantity: Number(event.target.value),
                  })
                }
                className="mt-1 w-full rounded-xl border p-3"
              />
            </label>

            <label className="block text-sm">
              Preço médio de aquisição (R$)
              <input
                required
                type="number"
                min="0"
                step="any"
                value={form.averagePrice}
                onChange={(event) =>
                  setForm({
                    ...form,
                    averagePrice: Number(event.target.value),
                  })
                }
                className="mt-1 w-full rounded-xl border p-3"
              />
            </label>

            <label className="block text-sm">
              Preço atual informado (R$)
              <input
                required
                type="number"
                min="0"
                step="any"
                value={form.currentPrice}
                onChange={(event) =>
                  setForm({
                    ...form,
                    currentPrice: Number(event.target.value),
                  })
                }
                className="mt-1 w-full rounded-xl border p-3"
              />
            </label>

            <p className="text-xs text-slate-500">
              Os preços são informados manualmente e não representam
              cotações de mercado em tempo real.
            </p>

            <button
              type="submit"
              className="w-full rounded-xl bg-blue-600 p-3 font-semibold text-white hover:bg-blue-700"
            >
              Salvar investimento
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
