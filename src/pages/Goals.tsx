
import { useState } from "react";
import { Plus, Pencil, Trash2, Target, X } from "lucide-react";
import type { FinancialGoal, GoalInput } from "../types";

interface GoalsProps {
  goals: FinancialGoal[];
  onAdd: (data: GoalInput) => void;
  onUpdate: (id: string, data: GoalInput) => void;
  onDelete: (id: string) => void;
  onContribute: (id: string, amount: number) => void;
}

const currency = (value: number) =>
  value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

const initialForm: GoalInput = {
  name: "",
  targetAmount: 0,
  deadline: "",
};

function getMonthlySavings(goal: FinancialGoal) {
  const remaining = Math.max(
    0,
    goal.targetAmount - goal.currentAmount
  );

  if (remaining === 0) return 0;

  const today = new Date();
  const [year, month] = goal.deadline.split("-").map(Number);

  const months =
    (year - today.getFullYear()) * 12 +
    (month - (today.getMonth() + 1)) + 1;

  return remaining / Math.max(1, months);
}

export default function Goals({
  goals,
  onAdd,
  onUpdate,
  onDelete,
  onContribute,
}: GoalsProps) {
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<GoalInput>(initialForm);
  const [contributions, setContributions] = useState<
    Record<string, string>
  >({});

  function openNew() {
    setEditingId(null);
    setForm(initialForm);
    setShowForm(true);
  }

  function openEdit(goal: FinancialGoal) {
    setEditingId(goal.id);
    setForm({
      name: goal.name,
      targetAmount: goal.targetAmount,
      deadline: goal.deadline,
    });
    setShowForm(true);
  }

  function save(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const name = form.name.trim();

    if (
      !name ||
      !Number.isFinite(form.targetAmount) ||
      form.targetAmount <= 0 ||
      !form.deadline
    ) {
      return;
    }

    const data = { ...form, name };

    if (editingId !== null) {
      onUpdate(editingId, data);
    } else {
      onAdd(data);
    }

    setShowForm(false);
    setEditingId(null);
  }

  function handleContribution(id: string) {
    const amount = Number(contributions[id]);

    if (!Number.isFinite(amount) || amount <= 0) return;

    onContribute(id, amount);
    setContributions((previous) => ({
      ...previous,
      [id]: "",
    }));
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">
            Planejamento financeiro
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Organize seus objetivos e acompanhe seu progresso.
          </p>
        </div>

        <button
          onClick={openNew}
          className="flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-3 font-semibold text-white hover:bg-blue-700"
        >
          <Plus size={18} />
          Nova meta
        </button>
      </div>

      {goals.length === 0 ? (
        <div className="rounded-2xl border border-slate-200 bg-white p-12 text-center">
          <Target className="mx-auto mb-4 text-blue-600" size={40} />
          <h3 className="font-bold text-slate-900">
            Nenhuma meta cadastrada
          </h3>
          <p className="mt-2 text-sm text-slate-500">
            Crie sua primeira meta financeira para começar.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
          {goals.map((goal) => {
            const progress = Math.min(
              100,
              (goal.currentAmount / goal.targetAmount) * 100
            );

            const remaining = Math.max(
              0,
              goal.targetAmount - goal.currentAmount
            );

            const monthlySavings = getMonthlySavings(goal);

            return (
              <article
                key={goal.id}
                className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="text-lg font-bold text-slate-900">
                      {goal.name}
                    </h3>
                    <p className="text-sm text-slate-500">
                      Prazo: {goal.deadline.split("-").reverse().join("/")}
                    </p>
                  </div>

                  <div className="flex gap-3">
                    <button
                      aria-label="Editar meta"
                      onClick={() => openEdit(goal)}
                      className="text-blue-600"
                    >
                      <Pencil size={18} />
                    </button>

                    <button
                      aria-label="Excluir meta"
                      onClick={() => {
                        if (window.confirm("Excluir esta meta?")) {
                          onDelete(goal.id);
                        }
                      }}
                      className="text-red-500"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>

                <div className="mt-5 flex flex-wrap items-end justify-between gap-2">
                  <div>
                    <p className="text-2xl font-bold text-slate-900">
                      {currency(goal.currentAmount)}
                    </p>
                    <p className="text-sm text-slate-500">
                      de {currency(goal.targetAmount)}
                    </p>
                  </div>

                  <span className="font-semibold text-blue-600">
                    {progress.toFixed(1)}%
                  </span>
                </div>

                <div className="mt-3 h-3 overflow-hidden rounded-full bg-slate-100">
                  <div
                    className="h-full rounded-full bg-blue-600 transition-all"
                    style={{ width: `${progress}%` }}
                  />
                </div>

                <div className="mt-5 grid grid-cols-2 gap-3">
                  <div className="rounded-xl bg-slate-50 p-3">
                    <p className="text-xs text-slate-500">Falta economizar</p>
                    <p className="font-bold text-slate-900">
                      {currency(remaining)}
                    </p>
                  </div>

                  <div className="rounded-xl bg-blue-50 p-3">
                    <p className="text-xs text-blue-600">Por mês</p>
                    <p className="font-bold text-blue-700">
                      {currency(monthlySavings)}
                    </p>
                  </div>
                </div>

                <div className="mt-5 flex gap-2">
                  <input
                    type="number"
                    min="0.01"
                    step="0.01"
                    placeholder="Valor da contribuição"
                    aria-label={`Contribuição para ${goal.name}`}
                    value={contributions[goal.id] ?? ""}
                    onChange={(event) =>
                      setContributions((previous) => ({
                        ...previous,
                        [goal.id]: event.target.value,
                      }))
                    }
                    className="min-w-0 flex-1 rounded-xl border border-slate-200 px-3 py-2 text-sm"
                  />

                  <button
                    onClick={() => handleContribution(goal.id)}
                    disabled={remaining === 0}
                    className="rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    Adicionar
                  </button>
                </div>

                {remaining === 0 && (
                  <p className="mt-3 text-sm font-semibold text-emerald-600">
                    Meta concluída!
                  </p>
                )}
              </article>
            );
          })}
        </div>
      )}

      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4">
          <form
            onSubmit={save}
            className="w-full max-w-lg space-y-4 rounded-2xl bg-white p-6 shadow-xl"
          >
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold text-slate-900">
                {editingId ? "Editar meta" : "Nova meta"}
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
              Nome da meta
              <input
                required
                value={form.name}
                onChange={(event) =>
                  setForm({ ...form, name: event.target.value })
                }
                placeholder="Ex.: Reserva de emergência"
                className="mt-1 w-full rounded-xl border p-3"
              />
            </label>

            <label className="block text-sm">
              Valor desejado (R$)
              <input
                required
                type="number"
                min="0.01"
                step="0.01"
                value={form.targetAmount || ""}
                onChange={(event) =>
                  setForm({
                    ...form,
                    targetAmount: Number(event.target.value),
                  })
                }
                className="mt-1 w-full rounded-xl border p-3"
              />
            </label>

            <label className="block text-sm">
              Prazo
              <input
                required
                type="date"
                value={form.deadline}
                onChange={(event) =>
                  setForm({ ...form, deadline: event.target.value })
                }
                className="mt-1 w-full rounded-xl border p-3"
              />
            </label>

            <button
              type="submit"
              className="w-full rounded-xl bg-blue-600 p-3 font-semibold text-white hover:bg-blue-700"
            >
              Salvar meta
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
