
import React from 'react';
import { FactsheetData, FactsheetTemplate } from '@/types';

interface FactsheetHeaderProps {
  factsheetData: FactsheetData;
  template: FactsheetTemplate;
}

const FactsheetHeader: React.FC<FactsheetHeaderProps> = ({
  factsheetData,
  template,
}) => {
  return (
    <div className="factsheet-header mb-8 border-b pb-6" style={{ borderColor: template.primaryColor }}>
      <div className={`flex ${template.logoPosition === 'center' ? 'justify-center' : template.logoPosition === 'right' ? 'justify-end' : 'justify-start'}`}>
        <div className="flex items-center">
          <div className="w-12 h-12 rounded-md mr-3 flex items-center justify-center text-white font-bold" style={{ backgroundColor: template.primaryColor }}>
            F
          </div>
          <div>
            <h1 className="text-xl font-bold" style={{ color: template.primaryColor }}>{factsheetData.info?.managementCompany ?? 'Company Name'}</h1>
            <h2 className="text-lg font-semibold text-gray-800">{factsheetData.info?.name ?? 'Fund Name'}</h2>
          </div>
        </div>
      </div>
      <div className="text-sm text-gray-600 mt-2">
        <p>Data as of {new Date().toLocaleDateString()}</p>
      </div>
    </div>
  );
};

export default FactsheetHeader;
