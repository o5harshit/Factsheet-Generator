
// Utility to calculate the style box based on asset allocation

import { EquityStyleBox, FixedIncomeStyleBox, AssetAllocation } from '../types';

// Determine the equity style box based on market cap and investment style data
export const calculateEquityStyleBox = (
  marketCapWeights: { large: number; medium: number; small: number },
  styleWeights: { value: number; blend: number; growth: number }
): EquityStyleBox => {
  // Determine market cap
  let marketCap: 'Large' | 'Medium' | 'Small';
  if (marketCapWeights.large > marketCapWeights.medium && marketCapWeights.large > marketCapWeights.small) {
    marketCap = 'Large';
  } else if (marketCapWeights.medium > marketCapWeights.large && marketCapWeights.medium > marketCapWeights.small) {
    marketCap = 'Medium';
  } else {
    marketCap = 'Small';
  }
  
  // Determine investment style
  let investmentStyle: 'Value' | 'Blend' | 'Growth';
  if (styleWeights.value > styleWeights.blend && styleWeights.value > styleWeights.growth) {
    investmentStyle = 'Value';
  } else if (styleWeights.growth > styleWeights.value && styleWeights.growth > styleWeights.blend) {
    investmentStyle = 'Growth';
  } else {
    investmentStyle = 'Blend';
  }
  
  return { marketCap, investmentStyle };
};

// Determine the fixed income style box based on credit quality and interest rate sensitivity data
export const calculateFixedIncomeStyleBox = (
  creditQualityWeights: { high: number; medium: number; low: number },
  sensitivityWeights: { limited: number; moderate: number; extensive: number }
): FixedIncomeStyleBox => {
  // Determine credit quality
  let creditQuality: 'High' | 'Medium' | 'Low';
  if (creditQualityWeights.high > creditQualityWeights.medium && creditQualityWeights.high > creditQualityWeights.low) {
    creditQuality = 'High';
  } else if (creditQualityWeights.medium > creditQualityWeights.high && creditQualityWeights.medium > creditQualityWeights.low) {
    creditQuality = 'Medium';
  } else {
    creditQuality = 'Low';
  }
  
  // Determine interest rate sensitivity
  let interestRateSensitivity: 'Limited' | 'Moderate' | 'Extensive';
  if (sensitivityWeights.limited > sensitivityWeights.moderate && sensitivityWeights.limited > sensitivityWeights.extensive) {
    interestRateSensitivity = 'Limited';
  } else if (sensitivityWeights.extensive > sensitivityWeights.limited && sensitivityWeights.extensive > sensitivityWeights.moderate) {
    interestRateSensitivity = 'Extensive';
  } else {
    interestRateSensitivity = 'Moderate';
  }
  
  return { creditQuality, interestRateSensitivity };
};

// Auto-determine the style box type based on asset allocation
export const determineStyleBoxType = (assetAllocation: AssetAllocation): 'equity' | 'fixedIncome' | null => {
  // If equity dominates the allocation, use equity style box
  if (assetAllocation.equity > 50) {
    return 'equity';
  } 
  // If fixed income dominates the allocation, use fixed income style box
  else if (assetAllocation.fixedIncome > 50) {
    return 'fixedIncome';
  } 
  // If neither dominates, return null
  else {
    return null;
  }
};
