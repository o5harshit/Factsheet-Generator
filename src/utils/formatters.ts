
// Utility functions for formatting data for the factsheet

// Format currency
export const formatCurrency = (value: number | undefined | null, currency: string = 'USD', decimals: number = 2): string => {
  if (value === undefined || value === null) {
    return `${currency === 'USD' ? '$' : ''}0.00`;
  }
  
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
  
  return formatter.format(value);
};

// Format percentage
export const formatPercentage = (value: number | undefined | null, decimals: number = 2): string => {
  if (value === undefined || value === null) {
    return '0.00%';
  }
  
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'percent',
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
  
  return formatter.format(value / 100);
};

// Format date with error handling
export const formatDate = (dateString: string | undefined | null, format: 'short' | 'medium' | 'long' = 'medium'): string => {
  try {
    // Validate date string
    if (!dateString || typeof dateString !== 'string') {
      return 'Invalid date';
    }
    
    // Parse date and check if valid
    const date = new Date(dateString);
    
    if (isNaN(date.getTime())) {
      return 'Invalid date';
    }
    
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: format === 'short' ? '2-digit' : format === 'medium' ? 'short' : 'long',
      day: '2-digit',
    };
    
    return new Intl.DateTimeFormat('en-US', options).format(date);
  } catch (error) {
    console.error('Error formatting date:', error);
    return 'Invalid date';
  }
};

// Format large numbers
export const formatNumber = (value: number | undefined | null, decimals: number = 2): string => {
  if (value === undefined || value === null) {
    return '0.00';
  }
  
  const formatter = new Intl.NumberFormat('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
  
  return formatter.format(value);
};

// Format AUM (Assets Under Management)
export const formatAUM = (value: number | undefined | null): string => {
  if (value === undefined || value === null) {
    return '0.00';
  }
  
  if (value >= 1_000_000_000) {
    return `${(value / 1_000_000_000).toFixed(2)}B`;
  }
  if (value >= 1_000_000) {
    return `${(value / 1_000_000).toFixed(2)}M`;
  }
  if (value >= 1_000) {
    return `${(value / 1_000).toFixed(2)}K`;
  }
  return value.toFixed(2);
};

// Format performance color
export const getPerformanceColor = (value: number | undefined | null): string => {
  if (value === undefined || value === null) {
    return 'text-gray-600';
  }
  
  if (value > 0) return 'text-green-600';
  if (value < 0) return 'text-red-600';
  return 'text-gray-600';
};

// Calculate performance difference
export const calculateDifference = (current: number | undefined | null, previous: number | undefined | null): string => {
  if (current === undefined || current === null || previous === undefined || previous === null) {
    return '0.00%';
  }
  
  const diff = current - previous;
  const sign = diff > 0 ? '+' : '';
  return `${sign}${diff.toFixed(2)}%`;
};

// Get risk label based on risk level
export const getRiskLabel = (riskLevel: number | undefined | null): string => {
  if (riskLevel === undefined || riskLevel === null) {
    return 'N/A';
  }
  
  switch (riskLevel) {
    case 1: return 'Very Low';
    case 2: return 'Low';
    case 3: return 'Low to Medium';
    case 4: return 'Medium';
    case 5: return 'Medium to High';
    case 6: return 'High';
    case 7: return 'Very High';
    default: return 'N/A';
  }
};

// Generate years array for dropdown
export const generateYearsArray = (startYear: number = 2000): number[] => {
  const currentYear = new Date().getFullYear();
  const years: number[] = [];
  
  for (let year = currentYear; year >= startYear; year--) {
    years.push(year);
  }
  
  return years;
};

// Get key performance indicators
export const getKPIs = (data: any) => {
  if (!data) return {
    ytdReturn: 0,
    oneYearReturn: 0,
    threeYearReturn: 0,
    fiveYearReturn: 0,
    sharpeRatio: 0,
    volatility: 0,
  };
  
  return {
    ytdReturn: data.performance?.periods?.YTD ?? 0,
    oneYearReturn: data.performance?.periods?.['1Y'] ?? 0,
    threeYearReturn: data.performance?.periods?.['3Y'] ?? 0,
    fiveYearReturn: data.performance?.periods?.['5Y'] ?? 0,
    sharpeRatio: data.risk?.sharpeRatio ?? 0,
    volatility: data.risk?.volatility ?? 0,
  };
};
