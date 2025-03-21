
import React, { useEffect } from 'react';
import { FactsheetData, FactsheetTemplate } from '@/types';
import { formatPercentage } from '@/utils/formatters';
import { sampleFactsheetData } from '@/utils/sampleData';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

interface AllocationChartsProps {
  factsheetData: FactsheetData;
  template: FactsheetTemplate;
}

const AllocationCharts: React.FC<AllocationChartsProps> = ({
  factsheetData,
  template,
}) => {
  useEffect(() => {
    console.log('AllocationCharts rendering with data:', factsheetData);
  }, [factsheetData]);

  if (!template.sections.includes('allocation')) {
    return null;
  }

  // Ensure we have data to display by falling back to sample data if needed
  const assetAllocation = factsheetData.assetAllocation && Object.keys(factsheetData.assetAllocation).length > 0 
    ? factsheetData.assetAllocation 
    : sampleFactsheetData.assetAllocation;
    
  const geographicAllocation = factsheetData.geographicAllocation && Object.keys(factsheetData.geographicAllocation).length > 0 
    ? factsheetData.geographicAllocation 
    : sampleFactsheetData.geographicAllocation;
    
  const sectorAllocation = factsheetData.sectorAllocation && Object.keys(factsheetData.sectorAllocation).length > 0 
    ? factsheetData.sectorAllocation 
    : sampleFactsheetData.sectorAllocation;

  return (
    <div className="factsheet-section mt-8 mb-16 page-break-inside-avoid">
      <h3 className="text-base font-semibold mb-4" style={{ color: template.primaryColor }}>Portfolio Allocation</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="allocation-section">
          <h4 className="text-sm font-medium mb-2">Asset Allocation</h4>
          <Table className="text-xs mb-3">
            <TableHeader>
              <TableRow style={{ backgroundColor: template.primaryColor }}>
                <TableHead className="py-1 px-2 text-left text-white">Asset Class</TableHead>
                <TableHead className="py-1 px-2 text-right text-white">Weight</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {assetAllocation && Object.entries(assetAllocation)
                .filter(([_, weight]) => weight > 0) // Only show non-zero allocations
                .map(([assetClass, weight]) => (
                  <TableRow key={assetClass} className="border-b border-gray-200">
                    <TableCell className="py-1 px-2 font-medium capitalize">{assetClass}</TableCell>
                    <TableCell className="py-1 px-2 text-right">{formatPercentage(weight)}</TableCell>
                  </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        
        <div className="allocation-section">
          <h4 className="text-sm font-medium mb-2">Geographic Allocation</h4>
          <Table className="text-xs mb-3">
            <TableHeader>
              <TableRow style={{ backgroundColor: template.primaryColor }}>
                <TableHead className="py-1 px-2 text-left text-white">Region</TableHead>
                <TableHead className="py-1 px-2 text-right text-white">Weight</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {geographicAllocation && Object.entries(geographicAllocation)
                .filter(([_, weight]) => weight > 0) // Only show non-zero allocations
                .map(([region, weight]) => (
                  <TableRow key={region} className="border-b border-gray-200">
                    <TableCell className="py-1 px-2 font-medium">{region}</TableCell>
                    <TableCell className="py-1 px-2 text-right">{formatPercentage(weight)}</TableCell>
                  </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        
        <div className="allocation-section">
          <h4 className="text-sm font-medium mb-2">Sector Allocation</h4>
          <Table className="text-xs mb-3">
            <TableHeader>
              <TableRow style={{ backgroundColor: template.primaryColor }}>
                <TableHead className="py-1 px-2 text-left text-white">Sector</TableHead>
                <TableHead className="py-1 px-2 text-right text-white">Weight</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sectorAllocation && Object.entries(sectorAllocation)
                .filter(([_, weight]) => weight > 0) // Only show non-zero allocations
                .map(([sector, weight]) => (
                  <TableRow key={sector} className="border-b border-gray-200">
                    <TableCell className="py-1 px-2 font-medium">{sector}</TableCell>
                    <TableCell className="py-1 px-2 text-right">{formatPercentage(weight)}</TableCell>
                  </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default AllocationCharts;
