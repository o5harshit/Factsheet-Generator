
import React from 'react';
import { FactsheetData, FactsheetTemplate } from '@/types';
import { determineStyleBoxType } from '@/utils/styleBoxCalculator';
import { ChartContainer } from '@/components/ui/chart';

interface StyleBoxProps {
  factsheetData: FactsheetData;
  template: FactsheetTemplate;
}

const StyleBox: React.FC<StyleBoxProps> = ({
  factsheetData,
  template,
}) => {
  if (!template.sections.includes('style')) {
    return null;
  }

  // Determine which style box to show based on asset allocation
  const styleBoxType = factsheetData.assetAllocation ? 
    determineStyleBoxType(factsheetData.assetAllocation) : 
    'equity';

  // Create style box grid for equity style
  const renderEquityStyleBox = () => {
    const { marketCap = 'Medium', investmentStyle = 'Blend' } = factsheetData.equityStyleBox || {};
    
    // Generate square data for the heatmap-like visualization
    const grid = [
      // Row 1: Large Cap
      { x: 0, y: 0, value: marketCap === 'Large' && investmentStyle === 'Value' ? 100 : 0, label: 'Large-Value' },
      { x: 1, y: 0, value: marketCap === 'Large' && investmentStyle === 'Blend' ? 100 : 0, label: 'Large-Blend' },
      { x: 2, y: 0, value: marketCap === 'Large' && investmentStyle === 'Growth' ? 100 : 0, label: 'Large-Growth' },
      // Row 2: Medium Cap
      { x: 0, y: 1, value: marketCap === 'Medium' && investmentStyle === 'Value' ? 100 : 0, label: 'Mid-Value' },
      { x: 1, y: 1, value: marketCap === 'Medium' && investmentStyle === 'Blend' ? 100 : 0, label: 'Mid-Blend' },
      { x: 2, y: 1, value: marketCap === 'Medium' && investmentStyle === 'Growth' ? 100 : 0, label: 'Mid-Growth' },
      // Row 3: Small Cap
      { x: 0, y: 2, value: marketCap === 'Small' && investmentStyle === 'Value' ? 100 : 0, label: 'Small-Value' },
      { x: 1, y: 2, value: marketCap === 'Small' && investmentStyle === 'Blend' ? 100 : 0, label: 'Small-Blend' },
      { x: 2, y: 2, value: marketCap === 'Small' && investmentStyle === 'Growth' ? 100 : 0, label: 'Small-Growth' },
    ];

    return (
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <div className="grid grid-cols-3 gap-1">
          <div className="text-xs text-center font-medium">Value</div>
          <div className="text-xs text-center font-medium">Blend</div>
          <div className="text-xs text-center font-medium">Growth</div>
        </div>
        
        <div className="grid grid-cols-3 gap-1 mt-1">
          {/* Large Cap Row */}
          <div className={`aspect-square flex items-center justify-center border ${marketCap === 'Large' && investmentStyle === 'Value' ? 'bg-factsheet-blue text-white' : 'bg-gray-50'}`}>
            <span className="text-xs">Large</span>
          </div>
          <div className={`aspect-square flex items-center justify-center border ${marketCap === 'Large' && investmentStyle === 'Blend' ? 'bg-factsheet-blue text-white' : 'bg-gray-50'}`}>
            <span className="text-xs">Large</span>
          </div>
          <div className={`aspect-square flex items-center justify-center border ${marketCap === 'Large' && investmentStyle === 'Growth' ? 'bg-factsheet-blue text-white' : 'bg-gray-50'}`}>
            <span className="text-xs">Large</span>
          </div>
          
          {/* Medium Cap Row */}
          <div className={`aspect-square flex items-center justify-center border ${marketCap === 'Medium' && investmentStyle === 'Value' ? 'bg-factsheet-blue text-white' : 'bg-gray-50'}`}>
            <span className="text-xs">Mid</span>
          </div>
          <div className={`aspect-square flex items-center justify-center border ${marketCap === 'Medium' && investmentStyle === 'Blend' ? 'bg-factsheet-blue text-white' : 'bg-gray-50'}`}>
            <span className="text-xs">Mid</span>
          </div>
          <div className={`aspect-square flex items-center justify-center border ${marketCap === 'Medium' && investmentStyle === 'Growth' ? 'bg-factsheet-blue text-white' : 'bg-gray-50'}`}>
            <span className="text-xs">Mid</span>
          </div>
          
          {/* Small Cap Row */}
          <div className={`aspect-square flex items-center justify-center border ${marketCap === 'Small' && investmentStyle === 'Value' ? 'bg-factsheet-blue text-white' : 'bg-gray-50'}`}>
            <span className="text-xs">Small</span>
          </div>
          <div className={`aspect-square flex items-center justify-center border ${marketCap === 'Small' && investmentStyle === 'Blend' ? 'bg-factsheet-blue text-white' : 'bg-gray-50'}`}>
            <span className="text-xs">Small</span>
          </div>
          <div className={`aspect-square flex items-center justify-center border ${marketCap === 'Small' && investmentStyle === 'Growth' ? 'bg-factsheet-blue text-white' : 'bg-gray-50'}`}>
            <span className="text-xs">Small</span>
          </div>
        </div>
      </div>
    );
  };

  // Create style box grid for fixed income style  
  const renderFixedIncomeStyleBox = () => {
    const { creditQuality = 'Medium', interestRateSensitivity = 'Moderate' } = factsheetData.fixedIncomeStyleBox || {};
    
    return (
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <div className="grid grid-cols-3 gap-1">
          <div className="text-xs text-center font-medium">Limited</div>
          <div className="text-xs text-center font-medium">Moderate</div>
          <div className="text-xs text-center font-medium">Extensive</div>
        </div>
        
        <div className="grid grid-cols-3 gap-1 mt-1">
          {/* High Quality Row */}
          <div className={`aspect-square flex items-center justify-center border ${creditQuality === 'High' && interestRateSensitivity === 'Limited' ? 'bg-factsheet-blue text-white' : 'bg-gray-50'}`}>
            <span className="text-xs">High</span>
          </div>
          <div className={`aspect-square flex items-center justify-center border ${creditQuality === 'High' && interestRateSensitivity === 'Moderate' ? 'bg-factsheet-blue text-white' : 'bg-gray-50'}`}>
            <span className="text-xs">High</span>
          </div>
          <div className={`aspect-square flex items-center justify-center border ${creditQuality === 'High' && interestRateSensitivity === 'Extensive' ? 'bg-factsheet-blue text-white' : 'bg-gray-50'}`}>
            <span className="text-xs">High</span>
          </div>
          
          {/* Medium Quality Row */}
          <div className={`aspect-square flex items-center justify-center border ${creditQuality === 'Medium' && interestRateSensitivity === 'Limited' ? 'bg-factsheet-blue text-white' : 'bg-gray-50'}`}>
            <span className="text-xs">Med</span>
          </div>
          <div className={`aspect-square flex items-center justify-center border ${creditQuality === 'Medium' && interestRateSensitivity === 'Moderate' ? 'bg-factsheet-blue text-white' : 'bg-gray-50'}`}>
            <span className="text-xs">Med</span>
          </div>
          <div className={`aspect-square flex items-center justify-center border ${creditQuality === 'Medium' && interestRateSensitivity === 'Extensive' ? 'bg-factsheet-blue text-white' : 'bg-gray-50'}`}>
            <span className="text-xs">Med</span>
          </div>
          
          {/* Low Quality Row */}
          <div className={`aspect-square flex items-center justify-center border ${creditQuality === 'Low' && interestRateSensitivity === 'Limited' ? 'bg-factsheet-blue text-white' : 'bg-gray-50'}`}>
            <span className="text-xs">Low</span>
          </div>
          <div className={`aspect-square flex items-center justify-center border ${creditQuality === 'Low' && interestRateSensitivity === 'Moderate' ? 'bg-factsheet-blue text-white' : 'bg-gray-50'}`}>
            <span className="text-xs">Low</span>
          </div>
          <div className={`aspect-square flex items-center justify-center border ${creditQuality === 'Low' && interestRateSensitivity === 'Extensive' ? 'bg-factsheet-blue text-white' : 'bg-gray-50'}`}>
            <span className="text-xs">Low</span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="factsheet-section mb-16 page-break-inside-avoid">
      <h3 className="text-base font-semibold mb-6" style={{ color: template.primaryColor }}>Style Box</h3>
      
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <p className="text-sm mb-3 font-medium">Equity Style Box</p>
          <div className="max-w-xs mx-auto">
            {renderEquityStyleBox()}
          </div>
          <div className="mt-3 text-xs text-gray-500">
            <p>Market capitalization and valuation characteristics</p>
          </div>
        </div>
        
        <div>
          <p className="text-sm mb-3 font-medium">Fixed Income Style Box</p>
          <div className="max-w-xs mx-auto">
            {renderFixedIncomeStyleBox()}
          </div>
          <div className="mt-3 text-xs text-gray-500">
            <p>Credit quality and interest rate sensitivity</p>
          </div>
        </div>
      </div>
      
      <div className="mt-4 text-xs text-gray-500">
        <p>Style boxes represent the fund's investment strategy across different dimensions.</p>
      </div>
    </div>
  );
};

export default StyleBox;
