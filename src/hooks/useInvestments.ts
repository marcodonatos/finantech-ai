
import { useEffect, useState } from "react";
import type { Investment, InvestmentInput } from "../types";

const STORAGE_KEY = "finantech-investments";

function loadInvestments(): Investment[] {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);

    if (!saved) return [];

    const parsed: unknown = JSON.parse(saved);

    return Array.isArray(parsed) ? parsed as Investment[] : [];
  } catch {
    return [];
  }
}

export function useInvestments() {
  const [investments, setInvestments] =
    useState<Investment[]>(loadInvestments);

  useEffect(() => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(investments)
    );
  }, [investments]);

  function addInvestment(data: InvestmentInput) {
    const investment: Investment = {
      ...data,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
    };

    setInvestments((previous) => [investment, ...previous]);
  }

  function updateInvestment(
    id: string,
    data: InvestmentInput
  ) {
    setInvestments((previous) =>
      previous.map((investment) =>
        investment.id === id
          ? { ...investment, ...data }
          : investment
      )
    );
  }

  function deleteInvestment(id: string) {
    setInvestments((previous) =>
      previous.filter((investment) => investment.id !== id)
    );
  }

  return {
    investments,
    addInvestment,
    updateInvestment,
    deleteInvestment,
  };
}
