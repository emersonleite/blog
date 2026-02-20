import { ref } from "vue";

// API pública do Banco Central do Brasil — CORS liberado, sem proxy
// Série 4389 = CDI anualizado (% a.a.)  |  Série 13522 = IPCA acumulado 12 meses
const BCB = String(import.meta.env.PUBLIC_BCB_URL ?? "");
const CDI_SERIE = import.meta.env.PUBLIC_BCB_CDI_SERIE ?? "4389";
const IPCA_SERIE = import.meta.env.PUBLIC_BCB_IPCA_SERIE ?? "13522";

export interface RatesResult {
  cdi: number;
  ipca: number;
}

async function fetchSerie(serie: string): Promise<number> {
  const url = `${BCB}.${serie}/dados/ultimos/1?formato=json`;

  const res = await fetch(url);

  console.log(res);

  if (!res.ok) {
    throw new Error(`BCB série ${serie}: HTTP ${res.status}`);
  }
  const dataRaw = await res.json();

  if (!Array.isArray(dataRaw) || dataRaw.length === 0) {
    throw new Error(`BCB série ${serie}: resposta vazia ou inválida`);
  }

  const first = dataRaw[0] as { valor?: unknown };
  if (!first || typeof first.valor !== "string") {
    throw new Error(`BCB série ${serie}: formato de dado inesperado`);
  }

  return parseFloat(first.valor.replace(",", "."));
}

export function useRates() {
  const loading = ref(false);
  const error = ref<string | null>(null);

  async function fetchRates(): Promise<RatesResult | null> {
    loading.value = true;
    error.value = null;

    try {
      const [cdi, ipca] = await Promise.all([
        fetchSerie(CDI_SERIE),
        fetchSerie(IPCA_SERIE),
      ]);

      return { cdi, ipca };
    } catch (err: any) {
      error.value = err.message ?? "Erro ao buscar taxas";
      return null;
    } finally {
      setTimeout(() => {
        loading.value = false;
      }, 150);
    }
  }

  return { fetchRates, loading, error };
}
