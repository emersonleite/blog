<template>
  <div class="bg-slate-900 text-gray-100 transition-colors duration-300">
    <div class="container mx-auto px-4 py-8">
      <div class="text-center mb-8">
        <h1 class="text-3xl font-bold tracking-tight text-white mb-2">
          Comparador de
          <span class="bg-gradient-to-br from-sky-500 to-cyan-400 bg-clip-text text-transparent">renda fixa</span>
        </h1>
        <p class="text-sm text-gray-400">CDB (com IR) vs LCI / LCA / CRI / CRA (sem IR)</p>
      </div>

      <div class="flex flex-col lg:flex-row gap-4 flex-1">
        <aside class="controls-sidebar w-full lg:w-96 shrink-0 flex flex-col gap-4 lg:max-h-[700px] lg:overflow-y-auto lg:pr-2">
          <div class="bg-slate-800 rounded-md p-4">
            <ConfigPanel
              v-model="config"
              :rates-loading="ratesLoading"
              :rates-error="ratesError"
              :synced-at="syncedAt"
              @sync-rates="syncRates"
            />
          </div>
          <div class="bg-slate-800 rounded-md p-4">
            <CurveSelector ref="curveSelectorRef" />
          </div>
        </aside>

        <main class="flex-1 h-[500px] lg:h-[700px] bg-slate-800 rounded-md p-4 flex flex-col">
          <div class="mb-3 flex flex-col items-center gap-1">
            <h2
              class="text-base font-bold tracking-wide bg-gradient-to-br from-sky-500 to-cyan-400 bg-clip-text text-transparent"
            >
              Retorno líquido acumulado
            </h2>
            <div class="flex flex-wrap justify-center gap-3 text-xs text-gray-400">
              <span
                >Período: <strong class="text-gray-200">{{ config.months }} meses</strong></span
              >
              <span
                >IPCA: <strong class="text-gray-200">{{ config.ipca }}% a.a.</strong></span
              >
              <span
                >CDI: <strong class="text-gray-200">{{ config.cdi }}% a.a.</strong></span
              >
            </div>
          </div>

          <div class="flex-1 min-h-0">
            <InvestmentChart
              :config="config"
              :ipcaCdbSpreads="ipcaCdbSpreads"
              :ipcaLciLcaSpreads="ipcaLciLcaSpreads"
              :cdiCdbPcts="cdiCdbPcts"
              :cdiLciLcaPcts="cdiLciLcaPcts"
              :preCdbPcts="preCdbPcts"
              :preLciLcaPcts="preLciLcaPcts"
              :isDark="isDark"
            />
          </div>
        </main>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import ConfigPanel from './ConfigPanel.vue';
import CurveSelector from './CurveSelector.vue';
import InvestmentChart from './InvestmentChart.vue';
import { useTheme } from '@/composables/comparador/useTheme';
import { useRates } from '@/composables/comparador/useRates';
import type { Config } from '@/utils/comparador/types';

const { isDark } = useTheme();
const { fetchRates, loading: ratesLoading, error: ratesError } = useRates();

const config = ref<Config>({
  ipca: 5.5,
  cdi: 13.75,
  months: 12,
});

const syncedAt = ref<Date | null>(null);

async function syncRates() {
  const rates = await fetchRates();
  if (rates) {
    config.value = { ...config.value, cdi: rates.cdi, ipca: rates.ipca };
    syncedAt.value = new Date();
  }
}

onMounted(() => syncRates());

const curveSelectorRef = ref<InstanceType<typeof CurveSelector> | null>(null);

const ipcaCdbSpreads = computed(() => curveSelectorRef.value?.ipcaCdbSpreads ?? [3, 5, 7]);
const ipcaLciLcaSpreads = computed(() => curveSelectorRef.value?.ipcaLciLcaSpreads ?? [3, 5, 7]);
const cdiCdbPcts = computed(() => curveSelectorRef.value?.cdiCdbPcts ?? [100, 110, 120]);
const cdiLciLcaPcts = computed(() => curveSelectorRef.value?.cdiLciLcaPcts ?? [100, 110, 120]);
const preCdbPcts = computed(() => curveSelectorRef.value?.preCdbPcts ?? []);
const preLciLcaPcts = computed(() => curveSelectorRef.value?.preLciLcaPcts ?? []);
</script>
