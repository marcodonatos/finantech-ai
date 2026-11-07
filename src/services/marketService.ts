
export interface MarketIndicator {
  name: string;
  value: number;
  date: string;
  unit: string;
}

interface BcbResponse {
  data: string;
  valor: string;
}

export async function getSelic(): Promise<MarketIndicator> {
  const url =
    "https://api.bcb.gov.br/dados/serie/bcdata.sgs.432/dados/ultimos/1?formato=json";

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Não foi possível consultar a Selic.");
  }

  const data: BcbResponse[] = await response.json();

  if (!Array.isArray(data) || data.length === 0) {
    throw new Error("Nenhum dado da Selic foi encontrado.");
  }

  const latest = data[0];
  const value = Number(latest.valor.replace(",", "."));

  if (!Number.isFinite(value)) {
    throw new Error("Valor inválido recebido do Banco Central.");
  }

  return {
    name: "Meta Selic",
    value,
    date: latest.data,
    unit: "% ao ano",
  };
}

