
// Sample data for demonstration purposes
import { FactsheetData, FactsheetTemplate } from '../types';

export const sampleFactsheetData: FactsheetData = {
  info: {
    name: "Global Financial Services Fund",
    ticker: "FSVLX",
    isin: "US3160714071",
    inceptionDate: "1985-12-31",
    currency: "USD",
    type: "Equity",
    riskLevel: 5,
    managementCompany: "Fidelity Investments",
    fundManager: "John Smith",
    benchmarkIndex: "MSCI World Financials Index",
    totalAum: 1256.78,
    navPerShare: 25.67,
    expenseRatio: 0.75,
    distributionPolicy: "Distributing",
    distributionFrequency: "Annual"
  },
  performance: {
    periods: {
      "1M": 2.45,
      "3M": 5.67,
      "6M": 8.91,
      "YTD": 10.25,
      "1Y": 15.78,
      "3Y": 12.34,
      "5Y": 10.52,
      "10Y": 9.87,
      "SI": 8.65
    },
    yearlyReturns: {
      "2023": 18.45,
      "2022": -12.34,
      "2021": 25.67,
      "2020": -5.43,
      "2019": 31.24
    },
    benchmarkPerformance: {
      "1M": 2.15,
      "3M": 5.27,
      "6M": 8.11,
      "YTD": 9.75,
      "1Y": 14.98,
      "3Y": 11.54,
      "5Y": 9.82,
      "10Y": 9.17,
      "SI": 8.15
    },
    benchmarkYearlyReturns: {
      "2023": 17.65,
      "2022": -13.04,
      "2021": 24.87,
      "2020": -6.13,
      "2019": 30.44
    }
  },
  risk: {
    standardDeviation: 15.67,
    sharpeRatio: 0.85,
    beta: 1.05,
    alpha: 2.34,
    trackingError: 3.45,
    informationRatio: 0.75,
    maxDrawdown: -18.67,
    volatility: 12.45,
    sortino: 1.23,
    var: 8.76
  },
  assetAllocation: {
    equity: 95.5,
    fixedIncome: 0,
    cash: 4.5,
    alternative: 0,
    other: 0
  },
  geographicAllocation: {
    "North America": 45.3,
    "Europe": 25.7,
    "Asia Pacific": 15.2,
    "Emerging Markets": 10.5,
    "Other": 3.3
  },
  sectorAllocation: {
    "Banks": 35.5,
    "Insurance": 25.2,
    "Capital Markets": 15.5,
    "Consumer Finance": 10.3,
    "Diversified Financial Services": 9.0,
    "Other": 4.5
  },
  topHoldings: [
    {
      name: "JPMorgan Chase & Co",
      ticker: "JPM",
      weight: 8.5,
      sector: "Banks",
      country: "USA"
    },
    {
      name: "Bank of America Corp",
      ticker: "BAC",
      weight: 7.2,
      sector: "Banks",
      country: "USA"
    },
    {
      name: "Citigroup Inc",
      ticker: "C",
      weight: 6.8,
      sector: "Banks",
      country: "USA"
    },
    {
      name: "Wells Fargo & Co",
      ticker: "WFC",
      weight: 5.5,
      sector: "Banks",
      country: "USA"
    },
    {
      name: "Berkshire Hathaway Inc",
      ticker: "BRK.B",
      weight: 4.9,
      sector: "Insurance",
      country: "USA"
    },
    {
      name: "HSBC Holdings PLC",
      ticker: "HSBC",
      weight: 4.6,
      sector: "Banks",
      country: "UK"
    },
    {
      name: "Goldman Sachs Group Inc",
      ticker: "GS",
      weight: 4.3,
      sector: "Capital Markets",
      country: "USA"
    },
    {
      name: "Morgan Stanley",
      ticker: "MS",
      weight: 4.1,
      sector: "Capital Markets",
      country: "USA"
    },
    {
      name: "Allianz SE",
      ticker: "ALV.DE",
      weight: 3.8,
      sector: "Insurance",
      country: "Germany"
    },
    {
      name: "American Express Co",
      ticker: "AXP",
      weight: 3.5,
      sector: "Consumer Finance",
      country: "USA"
    }
  ],
  feeStructure: {
    managementFee: 0.65,
    performanceFee: 0,
    entryFee: 0,
    exitFee: 0,
    ongoingCharges: 0.85
  },
  equityStyleBox: {
    marketCap: "Large",
    investmentStyle: "Blend"
  },
  managerComment: {
    date: "2023-12-31",
    text: "Financial stocks performed strongly this quarter as interest rates stabilized and loan growth accelerated. Our overweight position in regional banks contributed positively to performance. Looking ahead, we remain optimistic about the financial sector due to attractive valuations, improving operational efficiencies, and the potential for increased capital returns to shareholders.",
    author: "John Smith"
  },
  disclosures: "Past performance is not a reliable indicator of future results. The value of investments and the income from them can go down as well as up and investors may not get back the amount originally invested. This document is intended for informational purposes only and does not constitute investment advice or a recommendation to buy or sell any security. Investment decisions should be based on an individual's own goals, time horizon, and tolerance for risk."
};

export const templates: FactsheetTemplate[] = [
  {
    id: "standard",
    name: "Standard Template",
    description: "A clean, professional template suitable for most funds",
    primaryColor: "#005587",
    secondaryColor: "#f0f0f0",
    logoPosition: "left",
    sections: ["info", "performance", "risk", "allocation", "holdings", "fees", "disclosures"]
  },
  {
    id: "compact",
    name: "Compact Template",
    description: "A condensed format with essential information only",
    primaryColor: "#00263e",
    secondaryColor: "#e5f1f8",
    logoPosition: "center",
    sections: ["info", "performance", "allocation", "holdings", "fees", "disclosures"]
  },
  {
    id: "detailed",
    name: "Detailed Template",
    description: "An expanded template with comprehensive fund information",
    primaryColor: "#003366",
    secondaryColor: "#f5f5f5",
    logoPosition: "right",
    sections: ["info", "performance", "risk", "allocation", "holdings", "fees", "manager", "disclosures"]
  }
];

export const colorOptions = [
  "#005587",
  "#00263e",
  "#003366",
  "#0a3161",
  "#c8102e",
  "#6c7a89",
  "#2c3e50",
  "#34495e"
];

export const fontOptions = [
  "Inter",
  "Arial",
  "Helvetica",
  "Roboto",
  "Open Sans",
  "Times New Roman"
];

export const sectionOptions = [
  { id: "info", name: "Fund Information", default: true },
  { id: "performance", name: "Performance", default: true },
  { id: "risk", name: "Risk Metrics", default: true },
  { id: "allocation", name: "Allocation", default: true },
  { id: "holdings", name: "Top Holdings", default: true },
  { id: "fees", name: "Fee Structure", default: true },
  { id: "style", name: "Style Box", default: false },
  { id: "manager", name: "Manager Comment", default: false },
  { id: "disclosures", name: "Disclosures", default: true }
];
