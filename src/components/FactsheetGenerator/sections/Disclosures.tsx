
import React from 'react';
import { FactsheetData, FactsheetTemplate } from '@/types';
import { sampleFactsheetData } from '@/utils/sampleData';

interface DisclosuresProps {
  factsheetData: FactsheetData;
  template: FactsheetTemplate;
}

const Disclosures: React.FC<DisclosuresProps> = ({
  factsheetData,
  template,
}) => {
  if (!template.sections.includes('disclosures')) {
    return null;
  }

  // Ensure we have disclosures data by falling back to sample data if needed
  const disclosures = factsheetData.disclosures || sampleFactsheetData.disclosures;

  return (
    <div className="factsheet-section mt-8 mb-12 page-break-inside-avoid">
      <h3 className="text-base font-semibold mb-3" style={{ color: template.primaryColor }}>Important Information</h3>
      
      <div className="text-xs text-gray-600 space-y-2 max-w-full">
        <p className="leading-relaxed">{disclosures ?? 'No disclosures provided.'}</p>
      </div>
    </div>
  );
};

export default Disclosures;
