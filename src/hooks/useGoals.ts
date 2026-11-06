
import { useEffect, useState } from "react";
import type { FinancialGoal, GoalInput } from "../types";

const STORAGE_KEY = "finantech-goals";

function loadGoals(): FinancialGoal[] {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
}

export function useGoals() {
  const [goals, setGoals] = useState<FinancialGoal[]>(loadGoals);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(goals));
  }, [goals]);

  function addGoal(data: GoalInput) {
    const newGoal: FinancialGoal = {
      ...data,
      id: crypto.randomUUID(),
      currentAmount: 0,
      createdAt: new Date().toISOString(),
    };

    setGoals((previous) => [newGoal, ...previous]);
  }

  function updateGoal(id: string, data: GoalInput) {
    setGoals((previous) =>
      previous.map((goal) =>
        goal.id === id ? { ...goal, ...data } : goal
      )
    );
  }

  function deleteGoal(id: string) {
    setGoals((previous) =>
      previous.filter((goal) => goal.id !== id)
    );
  }

  function contributeToGoal(id: string, amount: number) {
    if (!Number.isFinite(amount) || amount <= 0) return;

    setGoals((previous) =>
      previous.map((goal) => {
        if (goal.id !== id) return goal;

        return {
          ...goal,
          currentAmount: Math.min(
            goal.targetAmount,
            goal.currentAmount + amount
          ),
        };
      })
    );
  }

  return {
    goals,
    addGoal,
    updateGoal,
    deleteGoal,
    contributeToGoal,
  };
}
