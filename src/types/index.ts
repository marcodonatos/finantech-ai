
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


export type InvestmentCategory =
  | "Renda fixa"
  | "Ações"
  | "FIIs"
  | "ETFs"
  | "Criptomoedas"
  | "Outros";

export interface Investment {
  id: string;
  name: string;
  ticker: string;
  category: InvestmentCategory;
  quantity: number;
  averagePrice: number;
  currentPrice: number;
  createdAt: string;
}

export type InvestmentInput = Pick<
  Investment,
  | "name"
  | "ticker"
  | "category"
  | "quantity"
  | "averagePrice"
  | "currentPrice"
>;
