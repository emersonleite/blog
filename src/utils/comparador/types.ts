export type InvestmentType = "CDB" | "LCI_LCA";

export type Indexer = "IPCA" | "CDI";

export interface Curve {
  id: string;
  label: string;
  indexer: Indexer;
  investmentType: InvestmentType;
  value: number; // spread for IPCA (+X%), percentage for CDI (ex: 100 = 100% CDI)
}

export interface Config {
  ipca: number; // % ao ano
  cdi: number; // % ao ano
  months: number;
}

export interface ChartDataset {
  label: string;
  data: number[];
  borderColor: string;
  backgroundColor: string;
  borderDash: number[];
  borderWidth: number;
  pointRadius: number;
  tension: number;
}
