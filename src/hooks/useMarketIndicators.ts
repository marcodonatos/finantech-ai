
import { useEffect, useState } from "react";
import {
  getSelic,
  type MarketIndicator,
} from "../services/marketService";

export function useMarketIndicators() {
  const [selic, setSelic] = useState<MarketIndicator | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;

    async function load() {
      try {
        setLoading(true);
        setError(null);

        const result = await getSelic();

        if (active) {
          setSelic(result);
        }
      } catch {
        if (active) {
          setError("Não foi possível carregar os indicadores.");
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    void load();

    return () => {
      active = false;
    };
  }, []);

  return { selic, loading, error };
}
