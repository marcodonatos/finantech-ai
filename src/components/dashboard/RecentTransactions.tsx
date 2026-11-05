
import { ArrowDownLeft, ArrowUpRight } from "lucide-react";
import type { Transaction } from "../../types";

interface RecentTransactionsProps {
  transactions: Transaction[];
}

const currency = (value: number) =>
  value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

export default function RecentTransactions({
  transactions,
}: RecentTransactionsProps) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-5 flex items-center justify-between">
        <div>
          <h3 className="font-bold text-slate-900">
            Movimentações recentes
          </h3>
          <p className="text-sm text-slate-500">
            Últimas movimentações financeiras
          </p>
        </div>

        <button className="text-sm font-semibold text-blue-600 hover:text-blue-800">
          Ver todas
        </button>
      </div>

      <div className="divide-y divide-slate-100">
        {transactions.map((transaction) => {
          const isIncome = transaction.type === "income";

          return (
            <div
              key={transaction.id}
              className="flex items-center justify-between gap-3 py-4"
            >
              <div className="flex min-w-0 items-center gap-3">
                <div
                  className={`rounded-xl p-3 ${
                    isIncome
                      ? "bg-emerald-50 text-emerald-600"
                      : "bg-red-50 text-red-500"
                  }`}
                >
                  {isIncome ? (
                    <ArrowDownLeft size={20} />
                  ) : (
                    <ArrowUpRight size={20} />
                  )}
                </div>

                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-slate-800">
                    {transaction.description}
                  </p>
                  <p className="text-xs text-slate-500">
                    {transaction.category} · {transaction.date}
                  </p>
                </div>
              </div>

              <span
                className={`shrink-0 text-sm font-bold ${
                  isIncome
                    ? "text-emerald-600"
                    : "text-red-500"
                }`}
              >
                {isIncome ? "+" : "-"}
                {currency(transaction.amount)}
              </span>
            </div>
          );
        })}
      </div>
    </section>
  );
}
