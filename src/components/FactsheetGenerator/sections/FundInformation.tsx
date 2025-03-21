
import React from 'react';
import { FactsheetData, FactsheetTemplate } from '@/types';
import { formatDate, formatCurrency, formatPercentage } from '@/utils/formatters';

interface FundInformationProps {
  factsheetData: FactsheetData;
  template: FactsheetTemplate;
}

const FundInformation: React.FC<FundInformationProps> = ({
  factsheetData,
  template,
}) => {
  if (!template.sections.includes('info')) {
    return null;
  }

  return (
    <div className="factsheet-section grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 mb-8">
      <div>
        <h3 className="text-base font-semibold mb-4" style={{ color: template.primaryColor }}>Fund Information</h3>
        <table className="w-full text-sm">
          <tbody>
            <tr>
              <td className="py-1 font-medium text-gray-600">Ticker</td>
              <td className="py-1 text-right">{factsheetData.info?.ticker ?? 'N/A'}</td>
            </tr>
            <tr>
              <td className="py-1 font-medium text-gray-600">ISIN</td>
              <td className="py-1 text-right">{factsheetData.info?.isin ?? 'N/A'}</td>
            </tr>
            <tr>
              <td className="py-1 font-medium text-gray-600">Inception Date</td>
              <td className="py-1 text-right">{formatDate(factsheetData.info?.inceptionDate)}</td>
            </tr>
            <tr>
              <td className="py-1 font-medium text-gray-600">Currency</td>
              <td className="py-1 text-right">{factsheetData.info?.currency ?? 'USD'}</td>
            </tr>
            <tr>
              <td className="py-1 font-medium text-gray-600">Fund Type</td>
              <td className="py-1 text-right">{factsheetData.info?.type ?? 'N/A'}</td>
            </tr>
            <tr>
              <td className="py-1 font-medium text-gray-600">Risk Level</td>
              <td className="py-1 text-right">{factsheetData.info?.riskLevel ?? 'N/A'}/7</td>
            </tr>
          </tbody>
        </table>
      </div>
      
      <div>
        <h3 className="text-base font-semibold mb-4" style={{ color: template.primaryColor }}>Key Metrics</h3>
        <table className="w-full text-sm">
          <tbody>
            <tr>
              <td className="py-1 font-medium text-gray-600">Fund Manager</td>
              <td className="py-1 text-right">{factsheetData.info?.fundManager ?? 'N/A'}</td>
            </tr>
            <tr>
              <td className="py-1 font-medium text-gray-600">Benchmark</td>
              <td className="py-1 text-right">{factsheetData.info?.benchmarkIndex ?? 'N/A'}</td>
            </tr>
            <tr>
              <td className="py-1 font-medium text-gray-600">AUM</td>
              <td className="py-1 text-right">{formatCurrency(factsheetData.info?.totalAum, factsheetData.info?.currency, 0)}</td>
            </tr>
            <tr>
              <td className="py-1 font-medium text-gray-600">NAV Per Share</td>
              <td className="py-1 text-right">{formatCurrency(factsheetData.info?.navPerShare, factsheetData.info?.currency, 2)}</td>
            </tr>
            <tr>
              <td className="py-1 font-medium text-gray-600">Expense Ratio</td>
              <td className="py-1 text-right">{formatPercentage(factsheetData.info?.expenseRatio)}</td>
            </tr>
            <tr>
              <td className="py-1 font-medium text-gray-600">Distribution Policy</td>
              <td className="py-1 text-right">{factsheetData.info?.distributionPolicy ?? 'N/A'}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FundInformation;
