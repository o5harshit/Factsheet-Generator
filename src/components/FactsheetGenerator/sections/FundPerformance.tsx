
import React, { useEffect } from 'react';
import { FactsheetData, FactsheetTemplate } from '@/types';
import { formatPercentage, getPerformanceColor } from '@/utils/formatters';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { sampleFactsheetData } from '@/utils/sampleData';

interface FundPerformanceProps {
  factsheetData: FactsheetData;
  template: FactsheetTemplate;
}

const FundPerformance: React.FC<FundPerformanceProps> = ({
  factsheetData,
  template,
}) => {
  if (!template.sections.includes('performance')) {
    return null;
  }

  // Ensure we have performance data by falling back to sample data if needed
  const performanceData = factsheetData.performance && 
    Object.keys(factsheetData.performance.periods || {}).length > 0 ? 
    factsheetData.performance : 
    sampleFactsheetData.performance;

  useEffect(() => {
    console.log('FundPerformance rendering with data:', performanceData);
  }, [performanceData]);

  // Helper functions
  const getFundValue = (period: string) => performanceData?.periods?.[period] ?? 0;
  const getBenchmarkValue = (period: string) => performanceData?.benchmarkPerformance?.[period] ?? 0;
  const getDifference = (period: string) => getFundValue(period) - getBenchmarkValue(period);

  // Chart data preparation
  const preparePerformanceChartData = () => {
    if (!performanceData?.periods) return [];
    
    const periods = ['1M', '3M', '6M', 'YTD', '1Y', '3Y', '5Y'];
    return periods
      .filter(period => typeof performanceData.periods[period] === 'number')
      .map(period => ({
        period,
        fund: getFundValue(period),
        benchmark: getBenchmarkValue(period),
      }));
  };

  const prepareYearlyPerformanceChartData = () => {
    if (!performanceData?.yearlyReturns || Object.keys(performanceData.yearlyReturns).length === 0) {
      return [];
    }
    
    return Object.entries(performanceData.yearlyReturns)
      .map(([year, value]) => ({
        year,
        fund: value,
        benchmark: performanceData?.benchmarkYearlyReturns?.[year] ?? 0,
      }))
      .sort((a, b) => parseInt(a.year) - parseInt(b.year));
  };

  // Chart colors
  const CHART_COLORS = {
    fund: template.primaryColor,
    benchmark: '#64748b',
  };

  const performanceChartData = preparePerformanceChartData();
  const yearlyPerformanceChartData = prepareYearlyPerformanceChartData();

  return (
    <div className="factsheet-section mb-8">
      <h3 className="text-base font-semibold mb-4" style={{ color: template.primaryColor }}>Fund Performance (as of {new Date().toLocaleDateString()})</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr style={{ backgroundColor: template.primaryColor }}>
                <th className="py-2 px-3 text-left text-white">Period</th>
                <th className="py-2 px-3 text-right text-white">Fund</th>
                <th className="py-2 px-3 text-right text-white">Benchmark</th>
                <th className="py-2 px-3 text-right text-white">+/-</th>
              </tr>
            </thead>
            <tbody>
              {performanceData.periods && Object.entries(performanceData.periods).map(([period, value]) => (
                <tr key={period} className="border-b border-gray-200">
                  <td className="py-2 px-3 font-medium">{period}</td>
                  <td className={`py-2 px-3 text-right ${getPerformanceColor(value)}`}>
                    {formatPercentage(value)}
                  </td>
                  <td className={`py-2 px-3 text-right ${getPerformanceColor(getBenchmarkValue(period))}`}>
                    {formatPercentage(getBenchmarkValue(period))}
                  </td>
                  <td className={`py-2 px-3 text-right ${getPerformanceColor(getDifference(period))}`}>
                    {formatPercentage(getDifference(period))}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          {/* Performance Chart */}
          <div className="mt-6 h-64">
            <h4 className="text-sm font-medium mb-2">Performance by Period</h4>
            {performanceChartData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={performanceChartData}
                  margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="period" />
                  <YAxis tickFormatter={(value) => `${value}%`} />
                  <Tooltip formatter={(value) => [`${value}%`, '']} />
                  <Legend />
                  <Bar dataKey="fund" name="Fund" fill={CHART_COLORS.fund} />
                  <Bar dataKey="benchmark" name="Benchmark" fill={CHART_COLORS.benchmark} />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex items-center justify-center h-full text-gray-400">
                No performance data available
              </div>
            )}
          </div>
        </div>
        
        <div>
          <h4 className="text-sm font-medium mb-3">Calendar Year Performance (%)</h4>
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr style={{ backgroundColor: template.primaryColor }}>
                <th className="py-2 px-3 text-left text-white">Year</th>
                <th className="py-2 px-3 text-right text-white">Fund</th>
                <th className="py-2 px-3 text-right text-white">Benchmark</th>
              </tr>
            </thead>
            <tbody>
              {performanceData.yearlyReturns && Object.entries(performanceData.yearlyReturns)
                .sort((a, b) => parseInt(b[0]) - parseInt(a[0]))
                .map(([year, value]) => (
                  <tr key={year} className="border-b border-gray-200">
                    <td className="py-2 px-3 font-medium">{year}</td>
                    <td className={`py-2 px-3 text-right ${getPerformanceColor(value)}`}>
                      {formatPercentage(value)}
                    </td>
                    <td className={`py-2 px-3 text-right ${getPerformanceColor(performanceData.benchmarkYearlyReturns?.[year])}`}>
                      {formatPercentage(performanceData.benchmarkYearlyReturns?.[year])}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
          
          {/* Yearly Performance Chart */}
          <div className="mt-6 h-64">
            <h4 className="text-sm font-medium mb-2">Annual Performance Comparison</h4>
            {yearlyPerformanceChartData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={yearlyPerformanceChartData}
                  margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="year" />
                  <YAxis tickFormatter={(value) => `${value}%`} />
                  <Tooltip formatter={(value) => [`${value}%`, '']} />
                  <Legend />
                  <Line type="monotone" dataKey="fund" name="Fund" stroke={CHART_COLORS.fund} activeDot={{ r: 8 }} strokeWidth={2} />
                  <Line type="monotone" dataKey="benchmark" name="Benchmark" stroke={CHART_COLORS.benchmark} strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex items-center justify-center h-full text-gray-400">
                No yearly performance data available
              </div>
            )}
          </div>
        </div>
      </div>
      
      <div className="text-xs text-gray-500 mt-4">
        *Past performance is not a reliable indicator of future results. Performance figures are shown net of fees.
      </div>
    </div>
  );
};

export default FundPerformance;
