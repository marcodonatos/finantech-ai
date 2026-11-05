
import { useMemo, useState } from "react";
import { Plus, Pencil, Trash2, X } from "lucide-react";
import type { Transaction } from "../types";

type TransactionData = Omit<Transaction, "id">;

interface Props {
  transactions: Transaction[];
  onAdd: (data: TransactionData) => void;
  onUpdate: (data: Transaction) => void;
  onDelete: (id: number) => void;
}

const initialForm: TransactionData = {
  description: "",
  category: "Outros",
  date: new Date().toLocaleDateString("en-CA"),
  amount: 0,
  type: "expense",
};

const currency = (value: number) =>
  value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

export default function Transactions({
  transactions,
  onAdd,
  onUpdate,
  onDelete,
}: Props) {
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [form, setForm] = useState<TransactionData>(initialForm);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  const filtered = useMemo(
    () =>
      transactions.filter((transaction) => {
        const matchesSearch = transaction.description
          .toLowerCase()
          .includes(search.toLowerCase());

        const matchesType =
          filter === "all" || transaction.type === filter;

        return matchesSearch && matchesType;
      }),
    [transactions, search, filter]
  );

  function openNew() {
    setEditingId(null);
    setForm({
      ...initialForm,
      date: new Date().toLocaleDateString("en-CA"),
    });
    setShowForm(true);
  }

  function openEdit(transaction: Transaction) {
    setEditingId(transaction.id);
    setForm({
      description: transaction.description,
      category: transaction.category,
      date: transaction.date,
      amount: transaction.amount,
      type: transaction.type,
    });
    setShowForm(true);
  }

  function save(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!form.description.trim() || !Number.isFinite(form.amount) ||
        form.amount <= 0 || !form.date) {
      return;
    }

    const data = {
      ...form,
      description: form.description.trim(),
      amount: Number(form.amount),
    };

    if (editingId !== null) {
      onUpdate({ ...data, id: editingId });
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
            Movimentações
          </h2>
          <p className="text-sm text-slate-500">
            Gerencie suas receitas e despesas.
          </p>
        </div>

        <button
          onClick={openNew}
          className="flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-3 text-white hover:bg-blue-700"
        >
          <Plus size={18} />
          Nova movimentação
        </button>
      </div>

      <div className="flex flex-wrap gap-3">
        <input
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Buscar movimentação..."
          className="min-w-0 flex-1 rounded-xl border border-slate-200 bg-white p-3"
        />

        <select
          value={filter}
          onChange={(event) => setFilter(event.target.value)}
          className="rounded-xl border border-slate-200 bg-white p-3"
        >
          <option value="all">Todas</option>
          <option value="income">Receitas</option>
          <option value="expense">Despesas</option>
        </select>
      </div>

      <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white">
        <table className="w-full min-w-[650px] text-left text-sm">
          <thead className="bg-slate-50 text-slate-500">
            <tr>
              <th className="p-4">Descrição</th>
              <th className="p-4">Categoria</th>
              <th className="p-4">Data</th>
              <th className="p-4">Valor</th>
              <th className="p-4">Ações</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((transaction) => (
              <tr key={transaction.id} className="border-t border-slate-100">
                <td className="p-4 font-medium">{transaction.description}</td>
                <td className="p-4">{transaction.category}</td>
                <td className="p-4">{transaction.date}</td>
                <td
                  className={`p-4 font-semibold ${
                    transaction.type === "income"
                      ? "text-emerald-600"
                      : "text-red-500"
                  }`}
                >
                  {transaction.type === "income" ? "+" : "-"}
                  {currency(transaction.amount)}
                </td>
                <td className="p-4">
                  <div className="flex gap-3">
                    <button
                      aria-label="Editar movimentação"
                      onClick={() => openEdit(transaction)}
                      className="text-blue-600"
                    >
                      <Pencil size={18} />
                    </button>
                    <button
                      aria-label="Excluir movimentação"
                      onClick={() => {
                        if (window.confirm("Excluir esta movimentação?")) {
                          onDelete(transaction.id);
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

        {filtered.length === 0 && (
          <p className="p-8 text-center text-slate-500">
            Nenhuma movimentação encontrada.
          </p>
        )}
      </div>

      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4">
          <form
            onSubmit={save}
            className="w-full max-w-lg space-y-4 rounded-2xl bg-white p-6 shadow-xl"
          >
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold">
                {editingId !== null ? "Editar" : "Nova"} movimentação
              </h3>
              <button type="button" onClick={() => setShowForm(false)}>
                <X size={22} />
              </button>
            </div>

            <label className="block text-sm">
              Tipo
              <select
                value={form.type}
                onChange={(event) =>
                  setForm({
                    ...form,
                    type: event.target.value as Transaction["type"],
                  })
                }
                className="mt-1 w-full rounded-lg border p-3"
              >
                <option value="expense">Despesa</option>
                <option value="income">Receita</option>
              </select>
            </label>

            <label className="block text-sm">
              Descrição
              <input
                required
                value={form.description}
                onChange={(event) =>
                  setForm({ ...form, description: event.target.value })
                }
                className="mt-1 w-full rounded-lg border p-3"
              />
            </label>

            <label className="block text-sm">
              Categoria
              <input
                required
                value={form.category}
                onChange={(event) =>
                  setForm({ ...form, category: event.target.value })
                }
                className="mt-1 w-full rounded-lg border p-3"
              />
            </label>

            <label className="block text-sm">
              Data
              <input
                required
                type="date"
                value={form.date}
                onChange={(event) =>
                  setForm({ ...form, date: event.target.value })
                }
                className="mt-1 w-full rounded-lg border p-3"
              />
            </label>

            <label className="block text-sm">
              Valor (R$)
              <input
                required
                type="number"
                min="0.01"
                step="0.01"
                value={form.amount || ""}
                onChange={(event) =>
                  setForm({ ...form, amount: Number(event.target.value) })
                }
                className="mt-1 w-full rounded-lg border p-3"
              />
            </label>

            <button
              type="submit"
              className="w-full rounded-xl bg-blue-600 p-3 font-semibold text-white hover:bg-blue-700"
            >
              Salvar movimentação
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
