
// Fund types
export type FundType = 'Equity' | 'Fixed Income' | 'Mixed Allocation' | 'Money Market' | 'Alternative' | 'Other';
export type RiskLevel = 1 | 2 | 3 | 4 | 5 | 6 | 7;
export type InvestmentStyle = 'Value' | 'Blend' | 'Growth';
export type MarketCap = 'Large' | 'Medium' | 'Small';
export type Currency = 'USD' | 'EUR' | 'GBP' | 'JPY' | 'CHF' | 'Other';
export type Region = 'North America' | 'Europe' | 'Asia Pacific' | 'Emerging Markets' | 'Global' | 'Other';

// Performance periods
export type TimePeriod = '1M' | '3M' | '6M' | 'YTD' | '1Y' | '3Y' | '5Y' | '10Y' | 'SI';

// Fund basic information
export interface FundInfo {
  name: string;
  ticker: string;
  isin: string;
  inceptionDate: string;
  currency: Currency;
  type: FundType;
  riskLevel: RiskLevel;
  managementCompany: string;
  fundManager: string;
  benchmarkIndex: string;
  totalAum: number;
  navPerShare: number;
  expenseRatio: number;
  distributionPolicy: 'Accumulating' | 'Distributing';
  distributionFrequency?: 'Annual' | 'Semi-Annual' | 'Quarterly' | 'Monthly' | 'None';
}

// Performance metrics
export interface PerformanceData {
  periods: Record<TimePeriod, number>;
  yearlyReturns: Record<string, number>; // Year as string key, return as value
  cumulativeReturns?: number;
  benchmarkPerformance: Record<TimePeriod, number>;
  benchmarkYearlyReturns: Record<string, number>;
}

// Risk metrics
export interface RiskMetrics {
  standardDeviation: number;
  sharpeRatio: number;
  beta: number;
  alpha: number;
  trackingError: number;
  informationRatio: number;
  maxDrawdown: number;
  volatility: number;
  sortino?: number;
  var?: number; // Value at Risk
}

// Asset allocation
export interface AssetAllocation {
  equity: number;
  fixedIncome: number;
  cash: number;
  alternative: number;
  other: number;
}

// Geographic allocation
export interface GeographicAllocation {
  [region: string]: number;
}

// Sector allocation
export interface SectorAllocation {
  [sector: string]: number;
}

// Top holdings
export interface Holding {
  name: string;
  ticker?: string;
  weight: number;
  sector?: string;
  country?: string;
}

// Fee structure
export interface FeeStructure {
  managementFee: number;
  performanceFee?: number;
  entryFee: number;
  exitFee: number;
  ongoingCharges: number;
}

// Fund style box (for equity funds)
export interface EquityStyleBox {
  marketCap: MarketCap;
  investmentStyle: InvestmentStyle;
}

// Fund style box (for fixed income funds)
export interface FixedIncomeStyleBox {
  creditQuality: 'High' | 'Medium' | 'Low';
  interestRateSensitivity: 'Limited' | 'Moderate' | 'Extensive';
}

// Fund manager comment
export interface FundManagerComment {
  date: string;
  text: string;
  author: string;
}

// Complete factsheet data
export interface FactsheetData {
  info: FundInfo;
  performance: PerformanceData;
  risk: RiskMetrics;
  assetAllocation: AssetAllocation;
  geographicAllocation: GeographicAllocation;
  sectorAllocation: SectorAllocation;
  topHoldings: Holding[];
  feeStructure: FeeStructure;
  equityStyleBox?: EquityStyleBox;
  fixedIncomeStyleBox?: FixedIncomeStyleBox;
  managerComment?: FundManagerComment;
  disclosures: string;
}

// Factsheet template options
export interface FactsheetTemplate {
  id: string;
  name: string;
  description: string;
  primaryColor: string;
  secondaryColor: string;
  logoPosition: 'left' | 'center' | 'right';
  sections: string[]; // Sections to include
}

// Template form options for the factsheet generator
export interface TemplateFormOptions {
  templates: FactsheetTemplate[];
  colorOptions: string[];
  fontOptions: string[];
  sectionOptions: string[];
}
