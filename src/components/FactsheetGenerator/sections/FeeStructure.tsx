
import React, { useEffect } from 'react';
import { FactsheetData, FactsheetTemplate } from '@/types';
import { formatPercentage } from '@/utils/formatters';
import { sampleFactsheetData } from '@/utils/sampleData';

interface FeeStructureProps {
  factsheetData: FactsheetData;
  template: FactsheetTemplate;
}

const FeeStructure: React.FC<FeeStructureProps> = ({
  factsheetData,
  template,
}) => {
  if (!template.sections.includes('fees')) {
    return null;
  }

  // Ensure we have fee data by falling back to sample data if needed
  const feeData = factsheetData.feeStructure && 
    Object.keys(factsheetData.feeStructure).length > 0 ? 
    factsheetData.feeStructure : 
    sampleFactsheetData.feeStructure;

  useEffect(() => {
    console.log('FeeStructure rendering with data:', feeData);
  }, [feeData]);

  return (
    <div className="factsheet-section mb-10 page-break-inside-avoid">
      <h3 className="text-base font-semibold mb-4" style={{ color: template.primaryColor }}>Fee Structure</h3>
      
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <div className="bg-gray-50 p-4 rounded-md shadow-sm">
          <div className="text-sm text-gray-600 mb-1">Management Fee</div>
          <div className="text-xl font-semibold">{formatPercentage(feeData.managementFee)}</div>
        </div>
        {(feeData.performanceFee ?? 0) > 0 && (
          <div className="bg-gray-50 p-4 rounded-md shadow-sm">
            <div className="text-sm text-gray-600 mb-1">Performance Fee</div>
            <div className="text-xl font-semibold">{formatPercentage(feeData.performanceFee)}</div>
          </div>
        )}
        <div className="bg-gray-50 p-4 rounded-md shadow-sm">
          <div className="text-sm text-gray-600 mb-1">Entry Fee</div>
          <div className="text-xl font-semibold">{formatPercentage(feeData.entryFee)}</div>
        </div>
        <div className="bg-gray-50 p-4 rounded-md shadow-sm">
          <div className="text-sm text-gray-600 mb-1">Exit Fee</div>
          <div className="text-xl font-semibold">{formatPercentage(feeData.exitFee)}</div>
        </div>
        <div className="bg-gray-50 p-4 rounded-md shadow-sm">
          <div className="text-sm text-gray-600 mb-1">Ongoing Charges</div>
          <div className="text-xl font-semibold">{formatPercentage(feeData.ongoingCharges)}</div>
        </div>
      </div>
      
      <div className="mt-3 text-xs text-gray-500">
        <p>Fees are annual unless otherwise stated. Please refer to the fund prospectus for full details on fees and charges.</p>
      </div>
    </div>
  );
};

export default FeeStructure;
