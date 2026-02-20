<template>
  <div class="relative w-full h-full">
    <Line :data="chartData" :options="chartOptions" />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { Line } from 'vue-chartjs';
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  type TooltipItem,
  type ChartDataset,
} from 'chart.js';
import { buildCurveData, ipcaMonthlyRate, cdiMonthlyRate, annualToMonthly } from '@/utils/comparador/investment';
import { getIpcaColor, getCdiColor, getPreCdbColor, getPreLciColor, hexToRgba } from '@/utils/comparador/colors';
import type { Config } from '@/utils/comparador/types';

ChartJS.register(Title, Tooltip, Legend, LineElement, PointElement, CategoryScale, LinearScale);

const props = defineProps<{
  config: Config;
  ipcaCdbSpreads: number[];
  ipcaLciLcaSpreads: number[];
  cdiCdbPcts: number[];
  cdiLciLcaPcts: number[];
  preCdbPcts: number[];
  preLciLcaPcts: number[];
  isDark: boolean;
}>();

const labels = computed(() => Array.from({ length: props.config.months }, (_, i) => `${i + 1}m`));

const datasets = computed(() => {
  const ds: ChartDataset<'line'>[] = [];

  // IPCA CDB (com IR) — linha sólida
  props.ipcaCdbSpreads
    .slice()
    .sort((a, b) => a - b)
    .forEach((spread, idx) => {
      const color = getIpcaColor(idx);
      const monthlyRate = ipcaMonthlyRate(props.config.ipca, spread);
      ds.push({
        label: `CDB IPCA+${spread}%`,
        data: buildCurveData(monthlyRate, props.config.months, true),
        borderColor: color,
        backgroundColor: hexToRgba(color, 0.08),
        borderDash: [],
        borderWidth: 2,
        pointRadius: 0,
        pointHoverRadius: 4,
        tension: 0.3,
      });
    });

  // IPCA LCI/LCA (sem IR) — linha tracejada
  props.ipcaLciLcaSpreads
    .slice()
    .sort((a, b) => a - b)
    .forEach((spread, idx) => {
      const color = getIpcaColor(idx);
      const monthlyRate = ipcaMonthlyRate(props.config.ipca, spread);
      ds.push({
        label: `LCI/LCA IPCA+${spread}%`,
        data: buildCurveData(monthlyRate, props.config.months, false),
        borderColor: color,
        backgroundColor: hexToRgba(color, 0.04),
        borderDash: [6, 4],
        borderWidth: 1.5,
        pointRadius: 0,
        pointHoverRadius: 4,
        tension: 0.3,
      });
    });

  // CDI CDB (com IR) — linha sólida
  props.cdiCdbPcts
    .slice()
    .sort((a, b) => a - b)
    .forEach((pct, idx) => {
      const color = getCdiColor(idx);
      const monthlyRate = cdiMonthlyRate(props.config.cdi, pct);
      ds.push({
        label: `CDB ${pct}% CDI`,
        data: buildCurveData(monthlyRate, props.config.months, true),
        borderColor: color,
        backgroundColor: hexToRgba(color, 0.08),
        borderDash: [],
        borderWidth: 2,
        pointRadius: 0,
        pointHoverRadius: 4,
        tension: 0.3,
      });
    });

  // CDI LCI/LCA (sem IR) — linha tracejada
  props.cdiLciLcaPcts
    .slice()
    .sort((a, b) => a - b)
    .forEach((pct, idx) => {
      const color = getCdiColor(idx);
      const monthlyRate = cdiMonthlyRate(props.config.cdi, pct);
      ds.push({
        label: `LCI/LCA ${pct}% CDI`,
        data: buildCurveData(monthlyRate, props.config.months, false),
        borderColor: color,
        backgroundColor: hexToRgba(color, 0.04),
        borderDash: [6, 4],
        borderWidth: 1.5,
        pointRadius: 0,
        pointHoverRadius: 4,
        tension: 0.3,
      });
    });

  // Pré-fixado CDB (com IR) — linha sólida
  props.preCdbPcts
    .slice()
    .sort((a, b) => a - b)
    .forEach((pct, idx) => {
      const color = getPreCdbColor(idx);
      const monthlyRate = annualToMonthly(pct);
      ds.push({
        label: `CDB Pré ${pct}% a.a.`,
        data: buildCurveData(monthlyRate, props.config.months, true),
        borderColor: color,
        backgroundColor: hexToRgba(color, 0.08),
        borderDash: [],
        borderWidth: 2,
        pointRadius: 0,
        pointHoverRadius: 4,
        tension: 0.3,
      });
    });

  // Pré-fixado LCI/LCA (sem IR) — linha tracejada
  props.preLciLcaPcts
    .slice()
    .sort((a, b) => a - b)
    .forEach((pct, idx) => {
      const color = getPreLciColor(idx);
      const monthlyRate = annualToMonthly(pct);
      ds.push({
        label: `LCI/LCA Pré ${pct}% a.a.`,
        data: buildCurveData(monthlyRate, props.config.months, false),
        borderColor: color,
        backgroundColor: hexToRgba(color, 0.04),
        borderDash: [6, 4],
        borderWidth: 1.5,
        pointRadius: 0,
        pointHoverRadius: 4,
        tension: 0.3,
      });
    });

  return ds;
});

const chartData = computed(() => ({
  labels: labels.value,
  datasets: datasets.value,
}));

const chartOptions = computed(() => {
  const textColor = '#d1d5db'; // gray-300
  const gridColor = '#475569'; // slate-600

  return {
    responsive: true,
    maintainAspectRatio: false,
    interaction: { mode: 'index' as const, intersect: false },
    plugins: {
      legend: {
        position: 'bottom' as const,
        labels: {
          color: textColor,
          padding: 12,
          font: { size: 11 },
          usePointStyle: true,
          pointStyleWidth: 20,
        },
      },
      title: { display: false },
      tooltip: {
        backgroundColor: '#1e293b', // slate-800
        borderColor: '#475569', // slate-600
        borderWidth: 1,
        titleColor: textColor,
        bodyColor: textColor,
        padding: 10,
        callbacks: {
          label(ctx: TooltipItem<'line'>) {
            return `  ${ctx.dataset.label}: ${(ctx.parsed.y as number).toFixed(2)}%`;
          },
        },
      },
    },
    scales: {
      x: {
        ticks: { color: textColor, maxTicksLimit: 13, font: { size: 11 } },
        grid: { color: gridColor },
      },
      y: {
        ticks: {
          color: textColor,
          font: { size: 11 },
          callback(val: number | string) {
            return `${Number(val).toFixed(1)}%`;
          },
        },
        grid: { color: gridColor },
        title: {
          display: true,
          text: 'Retorno líquido acumulado (%)',
          color: textColor,
          font: { size: 12 },
        },
      },
    },
  };
});
</script>
