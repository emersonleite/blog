/** Paleta IPCA (Sky tones - mais consistente com o blog) */
const IPCA_COLORS = [
  '#0ea5e9', // sky-500
  '#0284c7', // sky-600
  '#0369a1', // sky-700
  '#075985', // sky-800
  '#0c4a6e', // sky-900
  '#38bdf8', // sky-400
  '#7dd3fc', // sky-300
  '#014b71',
  '#0c7aa9',
  '#0a5a7f',
];
const CDI_COLORS = [
  '#06b6d4', // cyan-500
  '#0891b2', // cyan-600
  '#0e7490', // cyan-700
  '#155e75', // cyan-800
  '#22d3ee', // cyan-400
  '#67e8f9', // cyan-300
  '#164e63', // cyan-900
  '#083344', // cyan-950
];
export function getIpcaColor(i: number): string {
  return IPCA_COLORS[i % IPCA_COLORS.length] as string;
}
export function getCdiColor(i: number): string {
  return CDI_COLORS[i % CDI_COLORS.length] as string;
}

const PRE_CDB_COLORS = ['#a78bfa', '#8b5cf6', '#7c3aed', '#6d28d9', '#5b21b6']; // purple
const PRE_LCI_COLORS = ['#c084fc', '#a855f7', '#9333ea', '#7e22ce', '#6b21a8']; // purple lighter
export function getPreCdbColor(i: number): string {
  return PRE_CDB_COLORS[i % PRE_CDB_COLORS.length] as string;
}
export function getPreLciColor(i: number): string {
  return PRE_LCI_COLORS[i % PRE_LCI_COLORS.length] as string;
}

export function hexToRgba(hex: string, alpha: number): string {
  const r = parseInt(hex.slice(1, 3), 16),
    g = parseInt(hex.slice(3, 5), 16),
    b = parseInt(hex.slice(5, 7), 16);
  return 'rgba(' + r + ',' + g + ',' + b + ',' + alpha + ')';
}
