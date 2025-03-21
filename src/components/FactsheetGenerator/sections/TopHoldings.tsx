
import React from 'react';
import { FactsheetData, FactsheetTemplate } from '@/types';
import { formatPercentage } from '@/utils/formatters';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface TopHoldingsProps {
  factsheetData: FactsheetData;
  template: FactsheetTemplate;
}

const TopHoldings: React.FC<TopHoldingsProps> = ({
  factsheetData,
  template,
}) => {
  if (!template.sections.includes('holdings') || !factsheetData.topHoldings || factsheetData.topHoldings.length === 0) {
    return null;
  }

  return (
    <div className="factsheet-section mb-8 page-break-inside-avoid">
      <h3 className="text-base font-semibold mb-4" style={{ color: template.primaryColor }}>Top 10 Holdings</h3>
      
      <table className="w-full border-collapse text-sm">
        <thead>
          <tr style={{ backgroundColor: template.primaryColor }}>
            <th className="py-2 px-3 text-left text-white">Company</th>
            <th className="py-2 px-3 text-left text-white">Ticker</th>
            <th className="py-2 px-3 text-left text-white">Sector</th>
            <th className="py-2 px-3 text-left text-white">Country</th>
            <th className="py-2 px-3 text-right text-white">Weight</th>
          </tr>
        </thead>
        <tbody>
          {factsheetData.topHoldings.slice(0, 10).map((holding, index) => (
            <tr key={index} className="border-b border-gray-200">
              <td className="py-2 px-3 font-medium">{holding.name ?? 'N/A'}</td>
              <td className="py-2 px-3">{holding.ticker ?? 'N/A'}</td>
              <td className="py-2 px-3">{holding.sector ?? 'N/A'}</td>
              <td className="py-2 px-3">{holding.country ?? 'N/A'}</td>
              <td className="py-2 px-3 text-right">{formatPercentage(holding.weight)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      
      {/* Holdings Chart */}
      <div className="mt-6 h-64">
        <h4 className="text-sm font-medium mb-2">Top Holdings Breakdown</h4>
        {factsheetData.topHoldings.length > 0 && (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={factsheetData.topHoldings.slice(0, 10).map(holding => ({
                name: holding.name,
                weight: holding.weight
              }))}
              layout="vertical"
              margin={{ top: 5, right: 30, left: 100, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" tickFormatter={(value) => `${value}%`} />
              <YAxis type="category" dataKey="name" width={100} />
              <Tooltip formatter={(value) => [`${value}%`, 'Weight']} />
              <Legend />
              <Bar dataKey="weight" name="Weight" fill={template.primaryColor} />
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
};

export default TopHoldings;
