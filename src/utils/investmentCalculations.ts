
import type {
  Investment,
  InvestmentCategory,
} from "../types";

export function calculatePortfolio(
  investments: Investment[]
) {
  const totalInvested = investments.reduce(
    (sum, item) =>
      sum + item.quantity * item.averagePrice,
    0
  );

  const currentValue = investments.reduce(
    (sum, item) =>
      sum + item.quantity * item.currentPrice,
    0
  );

  const profit = currentValue - totalInvested;

  const profitability =
    totalInvested > 0
      ? (profit / totalInvested) * 100
      : 0;

  return {
    totalInvested,
    currentValue,
    profit,
    profitability,
  };
}

export function calculateAllocation(
  investments: Investment[]
) {
  const categories = new Map<
    InvestmentCategory,
    number
  >();

  for (const investment of investments) {
    const value =
      investment.quantity * investment.currentPrice;

    categories.set(
      investment.category,
      (categories.get(investment.category) ?? 0) + value
    );
  }

  return Array.from(categories, ([name, value]) => ({
    name,
    value,
  }));
}
