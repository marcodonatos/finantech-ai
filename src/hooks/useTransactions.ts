
import { useEffect, useMemo, useState } from "react";
import type { Transaction } from "../types";

const STORAGE_KEY = "finantech-transactions";

function loadTransactions(): Transaction[] {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
}

export function useTransactions() {
  const [transactions, setTransactions] = useState<Transaction[]>(
    loadTransactions
  );

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(transactions));
  }, [transactions]);

  function addTransaction(data: Omit<Transaction, "id">) {
    const transaction: Transaction = {
      ...data,
      id: Date.now() + Math.floor(Math.random() * 100000),
    };

    setTransactions((previous) => [transaction, ...previous]);
  }

  function updateTransaction(updated: Transaction) {
    setTransactions((previous) =>
      previous.map((transaction) =>
        transaction.id === updated.id ? updated : transaction
      )
    );
  }

  function deleteTransaction(id: number) {
    setTransactions((previous) =>
      previous.filter((transaction) => transaction.id !== id)
    );
  }

  const summary = useMemo(() => {
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
      savingsRate: income > 0 ? ((income - expenses) / income) * 100 : 0,
    };
  }, [transactions]);

  return {
    transactions,
    summary,
    addTransaction,
    updateTransaction,
    deleteTransaction,
  };
}
