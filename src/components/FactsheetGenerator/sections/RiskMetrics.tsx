
import React from 'react';
import { FactsheetData, FactsheetTemplate } from '@/types';
import { formatPercentage } from '@/utils/formatters';

interface RiskMetricsProps {
  factsheetData: FactsheetData;
  template: FactsheetTemplate;
}

const RiskMetrics: React.FC<RiskMetricsProps> = ({
  factsheetData,
  template,
}) => {
  if (!template.sections.includes('risk') || !factsheetData.risk) {
    return null;
  }

  return (
    <div className="factsheet-section mb-16 page-break-inside-avoid"> 
      <h3 className="text-base font-semibold mb-6" style={{ color: template.primaryColor }}>Risk & Return Metrics (3 Year)</h3>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-gray-50 p-4 rounded-md shadow-sm">
          <div className="text-sm text-gray-600 mb-1">Standard Deviation</div>
          <div className="text-xl font-semibold">{formatPercentage(factsheetData.risk.standardDeviation)}</div>
        </div>
        <div className="bg-gray-50 p-4 rounded-md shadow-sm">
          <div className="text-sm text-gray-600 mb-1">Sharpe Ratio</div>
          <div className="text-xl font-semibold">{((factsheetData.risk.sharpeRatio ?? 0)).toFixed(2)}</div>
        </div>
        <div className="bg-gray-50 p-4 rounded-md shadow-sm">
          <div className="text-sm text-gray-600 mb-1">Beta</div>
          <div className="text-xl font-semibold">{((factsheetData.risk.beta ?? 0)).toFixed(2)}</div>
        </div>
        <div className="bg-gray-50 p-4 rounded-md shadow-sm">
          <div className="text-sm text-gray-600 mb-1">Alpha</div>
          <div className="text-xl font-semibold">{formatPercentage(factsheetData.risk.alpha)}</div>
        </div>
        
        <div className="bg-gray-50 p-4 rounded-md shadow-sm">
          <div className="text-sm text-gray-600 mb-1">Tracking Error</div>
          <div className="text-xl font-semibold">{formatPercentage(factsheetData.risk.trackingError)}</div>
        </div>
        <div className="bg-gray-50 p-4 rounded-md shadow-sm">
          <div className="text-sm text-gray-600 mb-1">Information Ratio</div>
          <div className="text-xl font-semibold">{((factsheetData.risk.informationRatio ?? 0)).toFixed(2)}</div>
        </div>
        <div className="bg-gray-50 p-4 rounded-md shadow-sm">
          <div className="text-sm text-gray-600 mb-1">Max Drawdown</div>
          <div className="text-xl font-semibold">{formatPercentage(factsheetData.risk.maxDrawdown)}</div>
        </div>
        <div className="bg-gray-50 p-4 rounded-md shadow-sm">
          <div className="text-sm text-gray-600 mb-1">Volatility</div>
          <div className="text-xl font-semibold">{formatPercentage(factsheetData.risk.volatility)}</div>
        </div>
      </div>
    </div>
  );
};

export default RiskMetrics;
