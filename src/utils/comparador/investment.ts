/** Retorna a alíquota de IR conforme tabela regressiva */
export function getIRRate(months: number): number {
  if (months <= 6) return 0.225;
  if (months <= 12) return 0.2;
  if (months <= 24) return 0.175;
  return 0.15;
}

/** Converte taxa anual (%) para taxa mensal equivalente */
export function annualToMonthly(annualPct: number): number {
  return Math.pow(1 + annualPct / 100, 1 / 12) - 1;
}

/** Retorna retorno bruto acumulado para `months` meses */
export function accumulatedGross(monthlyRate: number, months: number): number {
  return Math.pow(1 + monthlyRate, months) - 1;
}

/** Retorna retorno líquido acumulado (%) aplicando IR se withIR=true */
export function netReturn(
  grossReturn: number,
  months: number,
  withIR: boolean,
): number {
  if (!withIR) return grossReturn * 100;
  const ir = getIRRate(months);
  return grossReturn * (1 - ir) * 100;
}

/** Gera array de retorno líquido acumulado (%) mês a mês */
export function buildCurveData(
  monthlyRate: number,
  maxMonths: number,
  withIR: boolean,
): number[] {
  const data: number[] = [];
  for (let m = 1; m <= maxMonths; m++) {
    const gross = accumulatedGross(monthlyRate, m);
    data.push(parseFloat(netReturn(gross, m, withIR).toFixed(4)));
  }
  return data;
}

/** Taxa mensal IPCA + spread */
export function ipcaMonthlyRate(ipcaAnual: number, spread: number): number {
  return annualToMonthly(ipcaAnual + spread);
}

/** Taxa mensal CDI * percentual */
export function cdiMonthlyRate(cdiAnual: number, pct: number): number {
  return annualToMonthly(cdiAnual * (pct / 100));
}
