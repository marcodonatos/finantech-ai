
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
