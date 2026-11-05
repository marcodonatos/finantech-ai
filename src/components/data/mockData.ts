
import type { Transaction } from "../types";

export const summary = {
  income: 6500,
  expenses: 4280,
  balance: 2220,
  savingsRate: 34.15,
};

export const cashFlowData = [
  { month: "Mai", income: 5200, expenses: 3900 },
  { month: "Jun", income: 5500, expenses: 4100 },
  { month: "Jul", income: 5800, expenses: 4300 },
  { month: "Ago", income: 6000, expenses: 4500 },
  { month: "Set", income: 6200, expenses: 4200 },
  { month: "Out", income: 6500, expenses: 4280 },
];

export const expenseData = [
  { name: "Moradia", value: 1500 },
  { name: "Alimentação", value: 950 },
  { name: "Transporte", value: 480 },
  { name: "Lazer", value: 650 },
  { name: "Outros", value: 700 },
];

export const transactions: Transaction[] = [
  {
    id: 1,
    description: "Salário mensal",
    category: "Renda",
    date: "03/11/2026",
    amount: 6500,
    type: "income",
  },
  {
    id: 2,
    description: "Aluguel",
    category: "Moradia",
    date: "02/11/2026",
    amount: 1500,
    type: "expense",
  },
  {
    id: 3,
    description: "Supermercado",
    category: "Alimentação",
    date: "02/11/2026",
    amount: 350,
    type: "expense",
  },
  {
    id: 4,
    description: "Academia",
    category: "Saúde",
    date: "01/11/2026",
    amount: 120,
    type: "expense",
  },
  {
    id: 5,
    description: "Freelance",
    category: "Renda extra",
    date: "01/11/2026",
    amount: 500,
    type: "income",
  },
];
