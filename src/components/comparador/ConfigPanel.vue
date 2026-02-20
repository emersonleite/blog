<template>
  <div class="space-y-4">
    <div class="flex items-center justify-between">
      <h2 class="text-sm font-semibold uppercase tracking-widest text-gray-400">Indicadores</h2>
      <button
        @click="emit('sync-rates')"
        :disabled="ratesLoading"
        class="flex items-center gap-1 px-2 py-1 rounded text-xs font-medium transition-colors bg-cyan-900/50 text-cyan-400 hover:bg-cyan-800 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
        title="Buscar CDI e IPCA atualizados"
      >
        <span v-if="ratesLoading">Buscando...</span>
        <span v-else>↻ Sincronizar</span>
      </button>
    </div>
    <ErrorText :message="ratesError" class="text-xs text-red-500 dark:text-red-400" />

    <!-- Fonte dos dados -->
    <div class="border-l-4 border-cyan-400 bg-slate-700/50 rounded-r-lg px-3 py-2 space-y-0.5">
      <p class="text-xs font-semibold text-cyan-400">Banco Central do Brasil</p>
      <p class="text-xs text-gray-400">SGS · Série 4389 (CDI) · Série 13522 (IPCA)</p>
      <p v-if="syncedAt" class="text-xs text-gray-500">
        Atualizado em {{ syncedAt.toLocaleDateString('pt-BR') }} às
        {{
          syncedAt.toLocaleTimeString('pt-BR', {
            hour: '2-digit',
            minute: '2-digit',
          })
        }}
      </p>
      <p v-else class="text-xs text-gray-500">Sincronizando...</p>
    </div>
    <div class="space-y-1">
      <label class="block text-sm font-medium text-gray-300"> IPCA (% a.a.) </label>
      <input
        type="number"
        step="0.1"
        min="0"
        max="100"
        :value="modelValue.ipca"
        @input="
          emit('update:modelValue', {
            ...modelValue,
            ipca: parseFloat(($event.target as HTMLInputElement).value) || 0,
          })
        "
        class="w-full rounded border border-slate-600 bg-slate-700 text-gray-100 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
      />
    </div>

    <!-- CDI -->
    <div class="space-y-1">
      <label class="block text-sm font-medium text-gray-300"> CDI (% a.a.) </label>
      <input
        type="number"
        step="0.1"
        min="0"
        max="100"
        :value="modelValue.cdi"
        @input="
          emit('update:modelValue', {
            ...modelValue,
            cdi: parseFloat(($event.target as HTMLInputElement).value) || 0,
          })
        "
        class="w-full rounded border border-slate-600 bg-slate-700 text-gray-100 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
      />
    </div>

    <!-- Meses -->
    <div class="space-y-1">
      <label class="block text-sm font-medium text-gray-300">
        Período:
        <span class="font-bold text-white">{{ modelValue.months }} meses</span>
      </label>
      <input
        type="range"
        min="1"
        max="120"
        step="1"
        :value="modelValue.months"
        @input="
          emit('update:modelValue', {
            ...modelValue,
            months: parseInt(($event.target as HTMLInputElement).value),
          })
        "
        class="w-full accent-cyan-500"
      />
      <div class="flex justify-between text-xs text-gray-400">
        <span>1 mês</span>
        <span>120 meses</span>
      </div>
    </div>

    <!-- Atalhos de período -->
    <div class="flex flex-wrap gap-2">
      <button
        v-for="m in [6, 12, 18, 24, 36]"
        :key="m"
        @click="emit('update:modelValue', { ...modelValue, months: m })"
        :class="[
          'px-2 py-1 rounded text-xs font-medium transition-colors',
          modelValue.months === m ? 'bg-cyan-600 text-white' : 'bg-slate-700 text-gray-300 hover:bg-slate-600',
        ]"
      >
        {{ m }}m
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Config } from '@/utils/comparador/types';
import ErrorText from './ErrorText.vue';

const props = defineProps<{
  modelValue: Config;
  ratesLoading?: boolean;
  ratesError?: string | null;
  syncedAt?: Date | null;
}>();

const emit = defineEmits<{
  'update:modelValue': [value: Config];
  'sync-rates': [];
}>();
</script>
