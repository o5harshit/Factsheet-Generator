
// Utility function to export template as CSV

// Helper function to convert object to CSV
export const convertToCSV = (objArray: any[]): string => {
  const array = typeof objArray !== 'object' ? JSON.parse(objArray) : objArray;
  let str = '';

  // Add headers
  const headers = Object.keys(array[0]);
  str += headers.join(',') + '\r\n';

  // Add rows
  for (let i = 0; i < array.length; i++) {
    let line = '';
    for (let index in headers) {
      if (line !== '') line += ',';

      const key = headers[index];
      let value = array[i][key];

      // Handle special cases (strings with commas, quotes, etc.)
      if (typeof value === 'string') {
        // Replace double quotes with two double quotes
        value = value.replace(/"/g, '""');
        
        // Wrap in quotes if contains comma, newline or double quote
        if (value.includes(',') || value.includes('\n') || value.includes('"')) {
          value = `"${value}"`;
        }
      } else if (typeof value === 'object' && value !== null) {
        value = JSON.stringify(value).replace(/"/g, '""');
        value = `"${value}"`;
      }

      line += value !== undefined ? value : '';
    }

    str += line + '\r\n';
  }

  return str;
};

// Export data as CSV
export const exportToCSV = (data: any[], filename: string): void => {
  const csv = convertToCSV(data);
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  
  // Create a URL for the blob
  const url = URL.createObjectURL(blob);
  
  // Setup link properties
  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  link.style.visibility = 'hidden';
  
  // Append to document and trigger download
  document.body.appendChild(link);
  link.click();
  
  // Cleanup
  document.body.removeChild(link);
};

// Generate empty template data for download
export const generateTemplateData = (): any[] => {
  return [
    {
      section: 'Fund Information',
      field: 'name',
      value: '',
      description: 'The full name of the fund',
      example: 'Global Financial Services Fund'
    },
    {
      section: 'Fund Information',
      field: 'ticker',
      value: '',
      description: 'The fund ticker symbol',
      example: 'FSVLX'
    },
    {
      section: 'Fund Information',
      field: 'isin',
      value: '',
      description: 'International Securities Identification Number',
      example: 'US3160714071'
    },
    {
      section: 'Fund Information',
      field: 'inceptionDate',
      value: '',
      description: 'The date the fund was launched (YYYY-MM-DD)',
      example: '1985-12-31'
    },
    {
      section: 'Fund Information',
      field: 'currency',
      value: '',
      description: 'The base currency of the fund (USD, EUR, GBP, etc.)',
      example: 'USD'
    },
    {
      section: 'Fund Information',
      field: 'type',
      value: '',
      description: 'The type of fund (Equity, Fixed Income, etc.)',
      example: 'Equity'
    },
    {
      section: 'Fund Information',
      field: 'riskLevel',
      value: '',
      description: 'Risk level from 1 (lowest) to 7 (highest)',
      example: '5'
    },
    {
      section: 'Fund Information',
      field: 'managementCompany',
      value: '',
      description: 'The company managing the fund',
      example: 'Fidelity Investments'
    },
    {
      section: 'Fund Information',
      field: 'fundManager',
      value: '',
      description: 'The name of the fund manager',
      example: 'John Smith'
    },
    {
      section: 'Fund Information',
      field: 'benchmarkIndex',
      value: '',
      description: 'The benchmark index for the fund',
      example: 'MSCI World Financials Index'
    },
    {
      section: 'Fund Information',
      field: 'totalAum',
      value: '',
      description: 'Total assets under management in millions',
      example: '1256.78'
    },
    {
      section: 'Fund Information',
      field: 'navPerShare',
      value: '',
      description: 'Net Asset Value per share',
      example: '25.67'
    },
    {
      section: 'Fund Information',
      field: 'expenseRatio',
      value: '',
      description: 'Expense ratio as a percentage',
      example: '0.75'
    },
    {
      section: 'Fund Information',
      field: 'distributionPolicy',
      value: '',
      description: 'Distribution policy (Accumulating or Distributing)',
      example: 'Distributing'
    },
    {
      section: 'Performance',
      field: 'periods.1M',
      value: '',
      description: '1 month performance as a percentage',
      example: '2.45'
    },
    {
      section: 'Performance',
      field: 'periods.3M',
      value: '',
      description: '3 month performance as a percentage',
      example: '5.67'
    },
    {
      section: 'Performance',
      field: 'periods.6M',
      value: '',
      description: '6 month performance as a percentage',
      example: '8.91'
    },
    {
      section: 'Performance',
      field: 'periods.YTD',
      value: '',
      description: 'Year-to-date performance as a percentage',
      example: '10.25'
    },
    {
      section: 'Performance',
      field: 'periods.1Y',
      value: '',
      description: '1 year performance as a percentage',
      example: '15.78'
    },
    {
      section: 'Performance',
      field: 'periods.3Y',
      value: '',
      description: '3 year performance as a percentage (annualized)',
      example: '12.34'
    },
    {
      section: 'Performance',
      field: 'periods.5Y',
      value: '',
      description: '5 year performance as a percentage (annualized)',
      example: '10.52'
    },
    {
      section: 'Performance',
      field: 'periods.10Y',
      value: '',
      description: '10 year performance as a percentage (annualized)',
      example: '9.87'
    },
    {
      section: 'Performance',
      field: 'periods.SI',
      value: '',
      description: 'Since inception performance as a percentage (annualized)',
      example: '8.65'
    },
    {
      section: 'Performance',
      field: 'yearlyReturns.2023',
      value: '',
      description: 'Return for the year 2023 as a percentage',
      example: '18.45'
    },
    {
      section: 'Performance',
      field: 'yearlyReturns.2022',
      value: '',
      description: 'Return for the year 2022 as a percentage',
      example: '-12.34'
    },
    {
      section: 'Performance',
      field: 'yearlyReturns.2021',
      value: '',
      description: 'Return for the year 2021 as a percentage',
      example: '25.67'
    },
    {
      section: 'Performance',
      field: 'yearlyReturns.2020',
      value: '',
      description: 'Return for the year 2020 as a percentage',
      example: '-5.43'
    },
    {
      section: 'Performance',
      field: 'yearlyReturns.2019',
      value: '',
      description: 'Return for the year 2019 as a percentage',
      example: '31.24'
    },
    {
      section: 'Risk',
      field: 'standardDeviation',
      value: '',
      description: 'Standard deviation as a percentage',
      example: '15.67'
    },
    {
      section: 'Risk',
      field: 'sharpeRatio',
      value: '',
      description: 'Sharpe ratio',
      example: '0.85'
    },
    {
      section: 'Risk',
      field: 'beta',
      value: '',
      description: 'Beta coefficient against benchmark',
      example: '1.05'
    },
    {
      section: 'Risk',
      field: 'alpha',
      value: '',
      description: 'Alpha as a percentage',
      example: '2.34'
    },
    {
      section: 'Risk',
      field: 'trackingError',
      value: '',
      description: 'Tracking error as a percentage',
      example: '3.45'
    },
    {
      section: 'Risk',
      field: 'informationRatio',
      value: '',
      description: 'Information ratio',
      example: '0.75'
    },
    {
      section: 'Risk',
      field: 'maxDrawdown',
      value: '',
      description: 'Maximum drawdown as a percentage',
      example: '-18.67'
    },
    {
      section: 'Risk',
      field: 'volatility',
      value: '',
      description: 'Volatility as a percentage',
      example: '12.45'
    },
    {
      section: 'Asset Allocation',
      field: 'equity',
      value: '',
      description: 'Percentage allocated to equity',
      example: '75.5'
    },
    {
      section: 'Asset Allocation',
      field: 'fixedIncome',
      value: '',
      description: 'Percentage allocated to fixed income',
      example: '15.3'
    },
    {
      section: 'Asset Allocation',
      field: 'cash',
      value: '',
      description: 'Percentage allocated to cash',
      example: '5.2'
    },
    {
      section: 'Asset Allocation',
      field: 'alternative',
      value: '',
      description: 'Percentage allocated to alternative investments',
      example: '2.5'
    },
    {
      section: 'Asset Allocation',
      field: 'other',
      value: '',
      description: 'Percentage allocated to other investments',
      example: '1.5'
    },
    {
      section: 'Geographic Allocation',
      field: 'North America',
      value: '',
      description: 'Percentage allocated to North America',
      example: '45.3'
    },
    {
      section: 'Geographic Allocation',
      field: 'Europe',
      value: '',
      description: 'Percentage allocated to Europe',
      example: '25.7'
    },
    {
      section: 'Geographic Allocation',
      field: 'Asia Pacific',
      value: '',
      description: 'Percentage allocated to Asia Pacific',
      example: '15.2'
    },
    {
      section: 'Geographic Allocation',
      field: 'Emerging Markets',
      value: '',
      description: 'Percentage allocated to Emerging Markets',
      example: '10.5'
    },
    {
      section: 'Geographic Allocation',
      field: 'Other',
      value: '',
      description: 'Percentage allocated to other regions',
      example: '3.3'
    },
    {
      section: 'Sector Allocation',
      field: 'Financials',
      value: '',
      description: 'Percentage allocated to Financials sector',
      example: '85.5'
    },
    {
      section: 'Sector Allocation',
      field: 'Technology',
      value: '',
      description: 'Percentage allocated to Technology sector',
      example: '5.2'
    },
    {
      section: 'Sector Allocation',
      field: 'Consumer',
      value: '',
      description: 'Percentage allocated to Consumer sector',
      example: '3.5'
    },
    {
      section: 'Sector Allocation',
      field: 'Industrials',
      value: '',
      description: 'Percentage allocated to Industrials sector',
      example: '2.8'
    },
    {
      section: 'Sector Allocation',
      field: 'Other',
      value: '',
      description: 'Percentage allocated to other sectors',
      example: '3.0'
    },
    {
      section: 'Top Holdings',
      field: 'holding1',
      value: '',
      description: 'Top holding details (JSON format with name, weight, sector, country)',
      example: '{"name":"JPMorgan Chase & Co","ticker":"JPM","weight":8.5,"sector":"Banks","country":"USA"}'
    },
    {
      section: 'Top Holdings',
      field: 'holding2',
      value: '',
      description: 'Second top holding details',
      example: '{"name":"Bank of America Corp","ticker":"BAC","weight":7.2,"sector":"Banks","country":"USA"}'
    },
    {
      section: 'Top Holdings',
      field: 'holding3',
      value: '',
      description: 'Third top holding details',
      example: '{"name":"Citigroup Inc","ticker":"C","weight":6.8,"sector":"Banks","country":"USA"}'
    },
    {
      section: 'Top Holdings',
      field: 'holding4',
      value: '',
      description: 'Fourth top holding details',
      example: '{"name":"Wells Fargo & Co","ticker":"WFC","weight":5.5,"sector":"Banks","country":"USA"}'
    },
    {
      section: 'Top Holdings',
      field: 'holding5',
      value: '',
      description: 'Fifth top holding details',
      example: '{"name":"Berkshire Hathaway Inc","ticker":"BRK.B","weight":4.9,"sector":"Insurance","country":"USA"}'
    },
    {
      section: 'Fee Structure',
      field: 'managementFee',
      value: '',
      description: 'Management fee as a percentage',
      example: '0.65'
    },
    {
      section: 'Fee Structure',
      field: 'performanceFee',
      value: '',
      description: 'Performance fee as a percentage (if applicable)',
      example: '10'
    },
    {
      section: 'Fee Structure',
      field: 'entryFee',
      value: '',
      description: 'Entry fee as a percentage',
      example: '0'
    },
    {
      section: 'Fee Structure',
      field: 'exitFee',
      value: '',
      description: 'Exit fee as a percentage',
      example: '0'
    },
    {
      section: 'Fee Structure',
      field: 'ongoingCharges',
      value: '',
      description: 'Ongoing charges as a percentage',
      example: '0.85'
    },
    {
      section: 'Style Box',
      field: 'equityStyleBox',
      value: '',
      description: 'Equity style box details (JSON format with marketCap and investmentStyle)',
      example: '{"marketCap":"Large","investmentStyle":"Blend"}'
    },
    {
      section: 'Style Box',
      field: 'fixedIncomeStyleBox',
      value: '',
      description: 'Fixed income style box details (JSON format with creditQuality and interestRateSensitivity)',
      example: '{"creditQuality":"Medium","interestRateSensitivity":"Moderate"}'
    },
    {
      section: 'Manager Comment',
      field: 'managerComment',
      value: '',
      description: 'Fund manager comment (JSON format with date, text and author)',
      example: '{"date":"2023-12-31","text":"Financial stocks performed strongly this quarter as interest rates stabilized and loan growth accelerated. Our overweight position in regional banks contributed positively to performance.","author":"John Smith"}'
    },
    {
      section: 'Disclosures',
      field: 'disclosures',
      value: '',
      description: 'Legal disclosures and important information',
      example: 'Past performance is not a reliable indicator of future results. The value of investments and the income from them can go down as well as up and investors may not get back the amount originally invested.'
    }
  ];
};

// Parse CSV data to factsheet data structure
export const parseCSVToFactsheetData = (csvData: string): any => {
  // Split the CSV into lines
  const lines = csvData.split('\n');
  
  // Extract headers from the first line
  const headers = lines[0].split(',');
  
  // Initialize factsheet data structure
  const factsheetData: any = {
    info: {},
    performance: {
      periods: {},
      yearlyReturns: {},
      benchmarkPerformance: {},
      benchmarkYearlyReturns: {}
    },
    risk: {},
    assetAllocation: {},
    geographicAllocation: {},
    sectorAllocation: {},
    topHoldings: [],
    feeStructure: {},
    disclosures: ''
  };
  
  // Process each line
  for (let i = 1; i < lines.length; i++) {
    if (!lines[i].trim()) continue;
    
    const values = lines[i].split(',');
    const row: any = {};
    
    // Map values to their respective headers
    headers.forEach((header, index) => {
      row[header] = values[index] ? values[index].trim() : '';
    });
    
    // Process field based on section
    processField(factsheetData, row);
  }
  
  return factsheetData;
};

// Helper function to process a field from CSV and add it to the factsheet data
const processField = (factsheetData: any, row: any): void => {
  const section = row.section;
  const field = row.field;
  const value = row.value;
  
  if (!value) return;
  
  switch (section) {
    case 'Fund Information':
      factsheetData.info[field] = field === 'riskLevel' || field === 'totalAum' || field === 'navPerShare' || field === 'expenseRatio' 
        ? parseFloat(value) 
        : value;
      break;
    
    case 'Performance':
      if (field.startsWith('periods.')) {
        const period = field.split('.')[1];
        factsheetData.performance.periods[period] = parseFloat(value);
      } else if (field.startsWith('yearlyReturns.')) {
        const year = field.split('.')[1];
        factsheetData.performance.yearlyReturns[year] = parseFloat(value);
      }
      break;
    
    case 'Risk':
      factsheetData.risk[field] = parseFloat(value);
      break;
    
    case 'Asset Allocation':
      factsheetData.assetAllocation[field] = parseFloat(value);
      break;
    
    case 'Geographic Allocation':
      factsheetData.geographicAllocation[field] = parseFloat(value);
      break;
    
    case 'Sector Allocation':
      factsheetData.sectorAllocation[field] = parseFloat(value);
      break;
    
    case 'Top Holdings':
      if (field.startsWith('holding')) {
        try {
          const holding = JSON.parse(value);
          factsheetData.topHoldings.push(holding);
        } catch (e) {
          console.error('Failed to parse holding:', value);
        }
      }
      break;
    
    case 'Fee Structure':
      factsheetData.feeStructure[field] = parseFloat(value);
      break;
    
    case 'Style Box':
      if (field === 'equityStyleBox') {
        try {
          factsheetData.equityStyleBox = JSON.parse(value);
        } catch (e) {
          console.error('Failed to parse equity style box:', value);
        }
      } else if (field === 'fixedIncomeStyleBox') {
        try {
          factsheetData.fixedIncomeStyleBox = JSON.parse(value);
        } catch (e) {
          console.error('Failed to parse fixed income style box:', value);
        }
      }
      break;
    
    case 'Manager Comment':
      try {
        factsheetData.managerComment = JSON.parse(value);
      } catch (e) {
        console.error('Failed to parse manager comment:', value);
      }
      break;
    
    case 'Disclosures':
      factsheetData.disclosures = value;
      break;
  }
};
