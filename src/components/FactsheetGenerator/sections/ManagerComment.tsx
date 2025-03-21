
import React from 'react';
import { FactsheetData, FactsheetTemplate } from '@/types';
import { formatDate } from '@/utils/formatters';

interface ManagerCommentProps {
  factsheetData: FactsheetData;
  template: FactsheetTemplate;
}

const ManagerComment: React.FC<ManagerCommentProps> = ({
  factsheetData,
  template,
}) => {
  if (!template.sections.includes('manager') || !factsheetData.managerComment) {
    return null;
  }

  return (
    <div className="factsheet-section mb-8">
      <h3 className="text-base font-semibold mb-4" style={{ color: template.primaryColor }}>Fund Manager Comment</h3>
      
      <div className="bg-gray-50 p-6 rounded-md">
        <div className="italic text-gray-700 mb-4">
          "{factsheetData.managerComment.text ?? ''}"
        </div>
        <div className="flex justify-between text-sm">
          <div className="font-medium">{factsheetData.managerComment.author ?? 'N/A'}</div>
          <div className="text-gray-600">{formatDate(factsheetData.managerComment.date)}</div>
        </div>
      </div>
    </div>
  );
};

export default ManagerComment;
