
export interface Transaction {
  id: number;
  description: string;
  category: string;
  date: string;
  amount: number;
  type: "income" | "expense";
}

export interface Summary {
  income: number;
  expenses: number;
  balance: number;
  savingsRate: number;
}


export interface FinancialGoal {
  id: string;
  name: string;
  targetAmount: number;
  currentAmount: number;
  deadline: string;
  createdAt: string;
}

export type GoalInput = Pick<
  FinancialGoal,
  "name" | "targetAmount" | "deadline"
>;
