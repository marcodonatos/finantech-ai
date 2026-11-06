
import type { Transaction, Summary } from "../types";

export type FinancialPeriod = "month" | "3m" | "6m" | "all";

export function filterTransactionsByPeriod(
  transactions: Transaction[],
  period: FinancialPeriod
): Transaction[] {
  if (period === "all") return transactions;

  const today = new Date();

  const months =
    period === "month" ? 1 : period === "3m" ? 3 : 6;

  const start = new Date(
    today.getFullYear(),
    today.getMonth() - (months - 1),
    1
  );

  const startKey = [
    start.getFullYear(),
    String(start.getMonth() + 1).padStart(2, "0"),
    "01",
  ].join("-");

  const end = new Date(
    today.getFullYear(),
    today.getMonth() + 1,
    1
  );

  const endKey = [
    end.getFullYear(),
    String(end.getMonth() + 1).padStart(2, "0"),
    "01",
  ].join("-");

  return transactions.filter(
    (transaction) =>
      transaction.date >= startKey &&
      transaction.date < endKey
  );
}

export function calculateSummary(
  transactions: Transaction[]
): Summary {
  const income = transactions
    .filter((transaction) => transaction.type === "income")
    .reduce((total, transaction) => total + transaction.amount, 0);

  const expenses = transactions
    .filter((transaction) => transaction.type === "expense")
    .reduce((total, transaction) => total + transaction.amount, 0);

  return {
    income,
    expenses,
    balance: income - expenses,
    savingsRate:
      income > 0 ? ((income - expenses) / income) * 100 : 0,
  };
}
