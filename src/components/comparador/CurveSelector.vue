<template>
  <div class="space-y-3">
    <h2 class="text-sm font-semibold uppercase tracking-widest text-gray-400">Rentabilidade</h2>

    <!-- CDI -->
    <div class="rounded-md border border-slate-600 bg-slate-700/50 p-3 space-y-3">
      <span class="text-sm font-semibold text-cyan-400">📊 % do CDI</span>

      <!-- CDI CDB -->
      <div class="mt-3">
        <div class="flex items-center justify-between mb-1">
          <span class="text-xs font-medium text-gray-300">CDB (com IR)</span>
          <div class="flex gap-2">
            <button
              @click="cdiCdbPcts = []"
              class="text-xs px-2 py-1 rounded font-medium bg-slate-600 text-gray-300 hover:bg-slate-500 transition-colors"
            >
              Limpar
            </button>
          </div>
        </div>
        <div class="flex flex-wrap gap-2 mb-2">
          <button
            v-for="pct in cdiCdbAvailable"
            :key="'cdi-cdb-' + pct"
            @click="toggleValue(cdiCdbPcts, pct)"
            :class="[
              'px-2 py-1 rounded text-xs font-medium border transition-colors',
              cdiCdbPcts.includes(pct)
                ? 'bg-cyan-600 border-cyan-600 text-white'
                : 'bg-transparent border-slate-500 text-gray-300 hover:border-cyan-500 hover:text-cyan-400',
            ]"
          >
            {{ pct }}%
            <span
              v-if="!CDI_PRESETS.includes(pct)"
              @click.stop="removeCdiCdb(pct)"
              class="ml-1 opacity-60 hover:opacity-100 cursor-pointer"
              >✕</span
            >
          </button>
        </div>
        <div class="flex gap-2 items-center">
          <input
            v-model.number="customCdiCdb"
            type="number"
            step="1"
            min="1"
            max="300"
            placeholder="% do CDI"
            @keydown.enter="addCdiCdb"
            class="w-24 rounded border border-slate-600 bg-slate-700 text-gray-100 px-2 py-1 text-xs focus:outline-none focus:ring-1 focus:ring-cyan-500"
          />
          <button
            @click="addCdiCdb"
            class="px-2 py-1 rounded border border-cyan-600 text-cyan-400 text-xs hover:bg-cyan-600 hover:text-white transition-colors"
          >
            + Adicionar
          </button>
          <ErrorText :message="errCdiCdb" />
        </div>
      </div>

      <!-- CDI LCI/LCA -->
      <div class="mt-4">
        <div class="flex items-center justify-between mb-1">
          <span class="text-xs font-medium text-gray-300">LCI/LCA (sem IR)</span>
          <div class="flex gap-2">
            <button
              @click="cdiLciLcaPcts = []"
              class="text-xs px-2 py-1 rounded font-medium bg-slate-600 text-gray-300 hover:bg-slate-500 transition-colors"
            >
              Limpar
            </button>
          </div>
        </div>
        <div class="flex flex-wrap gap-2 mb-2">
          <button
            v-for="pct in cdiLciLcaAvailable"
            :key="'cdi-lci-' + pct"
            @click="toggleValue(cdiLciLcaPcts, pct)"
            :class="[
              'px-2 py-1 rounded text-xs font-medium border transition-colors',
              cdiLciLcaPcts.includes(pct)
                ? 'bg-cyan-500 border-cyan-500 text-white'
                : 'bg-transparent border-slate-500 text-gray-300 hover:border-cyan-500 hover:text-cyan-400',
            ]"
          >
            {{ pct }}%
            <span
              v-if="!CDI_PRESETS.includes(pct)"
              @click.stop="removeCdiLci(pct)"
              class="ml-1 opacity-60 hover:opacity-100 cursor-pointer"
              >✕</span
            >
          </button>
        </div>
        <div class="flex gap-2 items-center">
          <input
            v-model.number="customCdiLci"
            type="number"
            step="1"
            min="1"
            max="300"
            placeholder="% do CDI"
            @keydown.enter="addCdiLci"
            class="w-24 rounded border border-slate-600 bg-slate-700 text-gray-100 px-2 py-1 text-xs focus:outline-none focus:ring-1 focus:ring-cyan-500"
          />
          <button
            @click="addCdiLci"
            class="px-2 py-1 rounded border border-cyan-600 text-cyan-400 text-xs hover:bg-cyan-600 hover:text-white transition-colors"
          >
            + Adicionar
          </button>
          <ErrorText :message="errCdiLci" />
        </div>
      </div>
    </div>

    <!-- IPCA -->
    <div class="rounded-md border border-slate-600 bg-slate-700/50 p-3 space-y-3">
      <span class="text-sm font-semibold text-sky-400">📈 IPCA + taxa</span>

      <!-- IPCA CDB -->
      <div class="mt-3">
        <div class="flex items-center justify-between mb-1">
          <span class="text-xs font-medium text-gray-300">CDB (com IR)</span>
          <div class="flex gap-2">
            <button
              @click="ipcaCdbSpreads = []"
              class="text-xs px-2 py-1 rounded font-medium bg-slate-600 text-gray-300 hover:bg-slate-500 transition-colors"
            >
              Limpar
            </button>
          </div>
        </div>
        <div class="flex flex-wrap gap-2 mb-2">
          <button
            v-for="spread in ipcaCdbAvailable"
            :key="'ipca-cdb-' + spread"
            @click="toggleValue(ipcaCdbSpreads, spread)"
            :class="[
              'px-2 py-1 rounded text-xs font-medium border transition-colors',
              ipcaCdbSpreads.includes(spread)
                ? 'bg-sky-600 border-sky-600 text-white'
                : 'bg-transparent border-slate-500 text-gray-300 hover:border-sky-500 hover:text-sky-400',
            ]"
          >
            +{{ spread }}%
            <span
              v-if="!IPCA_PRESETS.includes(spread)"
              @click.stop="removeIpcaCdb(spread)"
              class="ml-1 opacity-60 hover:opacity-100 cursor-pointer"
              >✕</span
            >
          </button>
        </div>
        <div class="flex gap-2 items-center">
          <input
            v-model.number="customIpcaCdb"
            type="number"
            step="0.1"
            min="0.1"
            max="50"
            placeholder="Taxa %"
            @keydown.enter="addIpcaCdb"
            class="w-24 rounded border border-slate-600 bg-slate-700 text-gray-100 px-2 py-1 text-xs focus:outline-none focus:ring-1 focus:ring-sky-500"
          />
          <button
            @click="addIpcaCdb"
            class="px-2 py-1 rounded border border-sky-600 text-sky-400 text-xs hover:bg-sky-600 hover:text-white transition-colors"
          >
            + Adicionar
          </button>
          <ErrorText :message="errIpcaCdb" />
        </div>
      </div>

      <!-- IPCA LCI/LCA -->
      <div class="mt-4">
        <div class="flex items-center justify-between mb-1">
          <span class="text-xs font-medium text-gray-300">LCI/LCA (sem IR)</span>
          <div class="flex gap-2">
            <button
              @click="ipcaLciLcaSpreads = []"
              class="text-xs px-2 py-1 rounded font-medium bg-slate-600 text-gray-300 hover:bg-slate-500 transition-colors"
            >
              Limpar
            </button>
          </div>
        </div>
        <div class="flex flex-wrap gap-2 mb-2">
          <button
            v-for="spread in ipcaLciLcaAvailable"
            :key="'ipca-lci-' + spread"
            @click="toggleValue(ipcaLciLcaSpreads, spread)"
            :class="[
              'px-2 py-1 rounded text-xs font-medium border transition-colors',
              ipcaLciLcaSpreads.includes(spread)
                ? 'bg-sky-500 border-sky-500 text-white'
                : 'bg-transparent border-slate-500 text-gray-300 hover:border-sky-500 hover:text-sky-400',
            ]"
          >
            +{{ spread }}%
            <span
              v-if="!IPCA_PRESETS.includes(spread)"
              @click.stop="removeIpcaLci(spread)"
              class="ml-1 opacity-60 hover:opacity-100 cursor-pointer"
              >✕</span
            >
          </button>
        </div>
        <div class="flex gap-2 items-center">
          <input
            v-model.number="customIpcaLci"
            type="number"
            step="0.1"
            min="0.1"
            max="50"
            placeholder="Taxa %"
            @keydown.enter="addIpcaLci"
            class="w-24 rounded border border-slate-600 bg-slate-700 text-gray-100 px-2 py-1 text-xs focus:outline-none focus:ring-1 focus:ring-sky-500"
          />
          <button
            @click="addIpcaLci"
            class="px-2 py-1 rounded border border-sky-600 text-sky-400 text-xs hover:bg-sky-600 hover:text-white transition-colors"
          >
            + Adicionar
          </button>
          <ErrorText :message="errIpcaLci" />
        </div>
      </div>
    </div>

    <!-- Pré-fixado -->
    <div class="rounded-md border border-slate-600 bg-slate-700/50 p-3 space-y-3">
      <span class="text-sm font-semibold text-purple-400">🔒 Pré-fixado</span>

      <!-- Pré-fixado CDB -->
      <div class="mt-3">
        <div class="flex items-center justify-between mb-1">
          <span class="text-xs font-medium text-gray-300">CDB (com IR)</span>
          <div class="flex gap-2">
            <button
              @click="preCdbPcts = []"
              class="text-xs px-2 py-1 rounded font-medium bg-slate-600 text-gray-300 hover:bg-slate-500 transition-colors"
            >
              Limpar
            </button>
          </div>
        </div>

        <div class="flex flex-wrap gap-2 mb-2">
          <button
            v-for="pct in preCdbPcts"
            :key="'pre-cdb-' + pct"
            @click="toggleValue(preCdbPcts, pct)"
            :class="[
              'px-2 py-1 rounded text-xs font-medium border transition-colors',
              preCdbPcts.includes(pct)
                ? 'bg-purple-600 border-purple-600 text-white'
                : 'bg-transparent border-slate-500 text-gray-300 hover:border-purple-500 hover:text-purple-400',
            ]"
          >
            {{ pct }}%
            <span
              v-if="!preCdbPresets?.includes?.(pct)"
              @click.stop="removePreCdb(pct)"
              class="ml-1 opacity-60 hover:opacity-100 cursor-pointer"
              >✕</span
            >
          </button>
        </div>

        <div class="flex gap-2 items-center">
          <input
            v-model.number="customPreCdb"
            type="number"
            step="0.1"
            min="0.1"
            max="100"
            placeholder="% ao ano"
            @keydown.enter="addPreCdb"
            class="w-28 rounded border border-slate-600 bg-slate-700 text-gray-100 px-2 py-1 text-xs focus:outline-none focus:ring-1 focus:ring-purple-500"
          />
          <button
            @click="addPreCdb"
            class="px-2 py-1 rounded border border-purple-600 text-purple-400 text-xs hover:bg-purple-600 hover:text-white transition-colors"
          >
            + Adicionar
          </button>
          <ErrorText :message="errPreCdb" />
        </div>
      </div>

      <!-- Pré-fixado LCI/LCA -->
      <div class="mt-4">
        <div class="flex items-center justify-between mb-1">
          <span class="text-xs font-medium text-gray-300">LCI/LCA (sem IR)</span>
          <div class="flex gap-2">
            <button
              @click="preLciLcaPcts = []"
              class="text-xs px-2 py-1 rounded font-medium bg-slate-600 text-gray-300 hover:bg-slate-500 transition-colors"
            >
              Limpar
            </button>
          </div>
        </div>

        <div class="flex flex-wrap gap-2 mb-2">
          <button
            v-for="pct in preLciLcaPcts"
            :key="'pre-lci-' + pct"
            @click="toggleValue(preLciLcaPcts, pct)"
            :class="[
              'px-2 py-1 rounded text-xs font-medium border transition-colors',
              preLciLcaPcts.includes(pct)
                ? 'bg-purple-500 border-purple-500 text-white'
                : 'bg-transparent border-slate-500 text-gray-300 hover:border-purple-500 hover:text-purple-400',
            ]"
          >
            {{ pct }}%
            <span
              v-if="!preLciPresets?.includes?.(pct)"
              @click.stop="removePreLci(pct)"
              class="ml-1 opacity-60 hover:opacity-100 cursor-pointer"
              >✕</span
            >
          </button>
        </div>

        <div class="flex gap-2 items-center">
          <input
            v-model.number="customPreLci"
            type="number"
            step="0.1"
            min="0.1"
            max="100"
            placeholder="% ao ano"
            @keydown.enter="addPreLci"
            class="w-28 rounded border border-slate-600 bg-slate-700 text-gray-100 px-2 py-1 text-xs focus:outline-none focus:ring-1 focus:ring-purple-500"
          />
          <button
            @click="addPreLci"
            class="px-2 py-1 rounded border border-purple-600 text-purple-400 text-xs hover:bg-purple-600 hover:text-white transition-colors"
          >
            + Adicionar
          </button>
          <ErrorText :message="errPreLci" />
        </div>
      </div>
    </div>

    <!-- Legenda -->
    <div class="rounded-md border border-slate-600 bg-slate-700/30 p-3 space-y-1">
      <p class="text-xs font-medium text-gray-400">Legenda</p>
      <div class="flex items-center gap-2 text-xs text-gray-400">
        <span class="inline-block w-6 border-t-2 border-gray-400"></span>
        <span>CDB — com IR (tabela regressiva)</span>
      </div>
      <div class="flex items-center gap-2 text-xs text-gray-400">
        <span class="inline-block w-6 border-t-2 border-dashed border-gray-400"></span>
        <span>LCI / LCA / CRI / CRA — sem IR</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import ErrorText from './ErrorText.vue';

const IPCA_PRESETS = [6, 7, 8];
const CDI_PRESETS = [90, 100, 110];
// Presets for pre-fixed instruments (can be extended later)
const preCdbPresets: number[] = [];
const preLciPresets: number[] = [];

// Customs per investment type
const ipcaCdbCustoms = ref<number[]>([]);
const ipcaLciCustoms = ref<number[]>([]);
const cdiCdbCustoms = ref<number[]>([]);
const cdiLciCustoms = ref<number[]>([]);

// Available = presets + own customs, sorted
const ipcaCdbAvailable = computed(() => [...IPCA_PRESETS, ...ipcaCdbCustoms.value].sort((a, b) => a - b));
const ipcaLciLcaAvailable = computed(() => [...IPCA_PRESETS, ...ipcaLciCustoms.value].sort((a, b) => a - b));
const cdiCdbAvailable = computed(() => [...CDI_PRESETS, ...cdiCdbCustoms.value].sort((a, b) => a - b));
const cdiLciLcaAvailable = computed(() => [...CDI_PRESETS, ...cdiLciCustoms.value].sort((a, b) => a - b));

// Selected
const ipcaCdbSpreads = ref<number[]>([7]);
const ipcaLciLcaSpreads = ref<number[]>([7]);
const cdiCdbPcts = ref<number[]>([100]);
const cdiLciLcaPcts = ref<number[]>([90]);

// Pré-fixado selected
const preCdbPcts = ref<number[]>([]);
const preLciLcaPcts = ref<number[]>([]);

// Custom inputs
const customIpcaCdb = ref<number | null>(null);
const customIpcaLci = ref<number | null>(null);
const customCdiCdb = ref<number | null>(null);
const customCdiLci = ref<number | null>(null);
const customPreCdb = ref<number | null>(null);
const customPreLci = ref<number | null>(null);

// Errors
const errIpcaCdb = ref('');
const errIpcaLci = ref('');
const errCdiCdb = ref('');
const errCdiLci = ref('');
const errPreCdb = ref('');
const errPreLci = ref('');

function toggleValue(list: number[], value: number) {
  const idx = list.indexOf(value);
  if (idx >= 0) list.splice(idx, 1);
  else list.push(value);
}

function validateIpca(val: number | null, errRef: { value: string }): number | null {
  errRef.value = '';
  if (val === null || isNaN(val)) {
    errRef.value = 'Informe um valor.';
    return null;
  }
  if (val <= 0 || val > 50) {
    errRef.value = 'Entre 0,1 e 50.';
    return null;
  }
  return Math.round(val * 10) / 10;
}

function validateCdi(val: number | null, errRef: { value: string }): number | null {
  errRef.value = '';
  if (val === null || isNaN(val)) {
    errRef.value = 'Informe um valor.';
    return null;
  }
  if (val <= 0 || val > 300) {
    errRef.value = 'Entre 1 e 300.';
    return null;
  }
  return Math.round(val);
}

function addIpcaCdb() {
  const v = validateIpca(customIpcaCdb.value, errIpcaCdb);
  if (v === null) return;
  if (ipcaCdbAvailable.value.includes(v)) {
    errIpcaCdb.value = 'Já existe.';
    return;
  }
  ipcaCdbCustoms.value.push(v);
  ipcaCdbSpreads.value.push(v);
  customIpcaCdb.value = null;
}

function addIpcaLci() {
  const v = validateIpca(customIpcaLci.value, errIpcaLci);
  if (v === null) return;
  if (ipcaLciLcaAvailable.value.includes(v)) {
    errIpcaLci.value = 'Já existe.';
    return;
  }
  ipcaLciCustoms.value.push(v);
  ipcaLciLcaSpreads.value.push(v);
  customIpcaLci.value = null;
}

function addCdiCdb() {
  const v = validateCdi(customCdiCdb.value, errCdiCdb);
  if (v === null) return;
  if (cdiCdbAvailable.value.includes(v)) {
    errCdiCdb.value = 'Já existe.';
    return;
  }
  cdiCdbCustoms.value.push(v);
  cdiCdbPcts.value.push(v);
  customCdiCdb.value = null;
}

function addCdiLci() {
  const v = validateCdi(customCdiLci.value, errCdiLci);
  if (v === null) return;
  if (cdiLciLcaAvailable.value.includes(v)) {
    errCdiLci.value = 'Já existe.';
    return;
  }
  cdiLciCustoms.value.push(v);
  cdiLciLcaPcts.value.push(v);
  customCdiLci.value = null;
}

function addPreCdb() {
  const v = validateIpca(customPreCdb.value, errPreCdb);
  if (v === null) return;
  if (preCdbPcts.value.includes(v)) {
    errPreCdb.value = 'Já existe.';
    return;
  }
  preCdbPcts.value.push(v);
  customPreCdb.value = null;
}

function addPreLci() {
  const v = validateIpca(customPreLci.value, errPreLci);
  if (v === null) return;
  if (preLciLcaPcts.value.includes(v)) {
    errPreLci.value = 'Já existe.';
    return;
  }
  preLciLcaPcts.value.push(v);
  customPreLci.value = null;
}

function removePreCdb(v: number) {
  preCdbPcts.value = preCdbPcts.value.filter((x) => x !== v);
}

function removePreLci(v: number) {
  preLciLcaPcts.value = preLciLcaPcts.value.filter((x) => x !== v);
}

function removeIpcaCdb(v: number) {
  ipcaCdbCustoms.value = ipcaCdbCustoms.value.filter((x) => x !== v);
  ipcaCdbSpreads.value = ipcaCdbSpreads.value.filter((x) => x !== v);
}
function removeIpcaLci(v: number) {
  ipcaLciCustoms.value = ipcaLciCustoms.value.filter((x) => x !== v);
  ipcaLciLcaSpreads.value = ipcaLciLcaSpreads.value.filter((x) => x !== v);
}
function removeCdiCdb(v: number) {
  cdiCdbCustoms.value = cdiCdbCustoms.value.filter((x) => x !== v);
  cdiCdbPcts.value = cdiCdbPcts.value.filter((x) => x !== v);
}
function removeCdiLci(v: number) {
  cdiLciCustoms.value = cdiLciCustoms.value.filter((x) => x !== v);
  cdiLciLcaPcts.value = cdiLciLcaPcts.value.filter((x) => x !== v);
}

defineExpose({
  ipcaCdbSpreads,
  ipcaLciLcaSpreads,
  cdiCdbPcts,
  cdiLciLcaPcts,
  preCdbPcts,
  preLciLcaPcts,
});
</script>
