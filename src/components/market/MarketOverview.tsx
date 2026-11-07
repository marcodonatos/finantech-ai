
import { Activity, TrendingUp } from "lucide-react";
import { useMarketIndicators } from "../../hooks/useMarketIndicators";

export default function MarketOverview() {
  const { selic, loading, error } = useMarketIndicators();

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-5 flex items-center gap-3">
        <div className="rounded-xl bg-blue-50 p-3 text-blue-600">
          <Activity size={22} />
        </div>

        <div>
          <h3 className="font-bold text-slate-900">
            Mercado financeiro
          </h3>
          <p className="text-sm text-slate-500">
            Indicadores econômicos do Brasil
          </p>
        </div>
      </div>

      {loading ? (
        <p className="text-sm text-slate-500">
          Consultando Banco Central...
        </p>
      ) : error ? (
        <p role="alert" className="text-sm text-red-600">
          {error}
        </p>
      ) : selic ? (
        <div className="rounded-xl bg-blue-50 p-5">
          <div className="flex items-center justify-between">
            <p className="font-medium text-slate-700">
              {selic.name}
            </p>
            <TrendingUp className="text-blue-600" size={20} />
          </div>

          <p className="mt-3 text-3xl font-bold text-blue-700">
            {selic.value.toLocaleString("pt-BR", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
            %
          </p>

          <p className="mt-1 text-xs text-slate-500">
            {selic.unit} · Referência: {selic.date}
          </p>
        </div>
      ) : (
        <p className="text-sm text-slate-500">
          Indicador indisponível.
        </p>
      )}

      <p className="mt-4 text-xs text-slate-400">
        Fonte: Banco Central do Brasil — SGS 432.
        O valor pode não refletir alterações ocorridas
        após a última publicação da série.
      </p>
    </section>
  );
}
