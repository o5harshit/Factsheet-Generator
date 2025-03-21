
import React, { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { FactsheetData, FactsheetTemplate } from '@/types';
import { generatePDF, downloadPDF } from '@/utils/pdfGenerator';
import { useToast } from '@/components/ui/use-toast';

// Import section components
import FactsheetHeader from './sections/FactsheetHeader';
import FundInformation from './sections/FundInformation';
import FundPerformance from './sections/FundPerformance';
import RiskMetrics from './sections/RiskMetrics';
import AllocationCharts from './sections/AllocationCharts';
import TopHoldings from './sections/TopHoldings';
import FeeStructure from './sections/FeeStructure';
import StyleBox from './sections/StyleBox';
import ManagerComment from './sections/ManagerComment';
import Disclosures from './sections/Disclosures';

interface FactsheetPreviewProps {
  factsheetData: FactsheetData;
  template: FactsheetTemplate;
  onEdit: () => void;
}

const FactsheetPreview: React.FC<FactsheetPreviewProps> = ({
  factsheetData,
  template,
  onEdit,
}) => {
  const { toast } = useToast();
  const [isGenerating, setIsGenerating] = React.useState(false);
  
  useEffect(() => {
    console.log('FactsheetPreview rendering with data:', factsheetData);
    // Force chart rerender
    const timer = setTimeout(() => {
      const chartContainers = document.querySelectorAll('.recharts-wrapper');
      console.log(`Found ${chartContainers.length} chart containers`);
    }, 500);
    
    return () => clearTimeout(timer);
  }, [factsheetData]);

  const handleDownload = async () => {
    setIsGenerating(true);
    
    toast({
      title: 'Generating PDF',
      description: 'Your factsheet is being prepared for download...',
      duration: 2000,
    });
    
    try {
      const pdfUrl = await generatePDF(factsheetData, template);
      
      // Create a safe filename - handle missing data gracefully
      const fundName = factsheetData.info?.name 
        ? factsheetData.info.name.replace(/\s+/g, '_') 
        : 'Factsheet';
      
      downloadPDF(pdfUrl, `${fundName}_Factsheet.pdf`);
      
      toast({
        title: 'PDF Generated Successfully',
        description: 'Your factsheet has been downloaded.',
        duration: 3000,
      });
    } catch (error) {
      console.error('Error generating PDF:', error);
      
      toast({
        title: 'Error Generating PDF',
        description: 'There was an error generating your PDF. Please try again.',
        variant: 'destructive',
        duration: 5000,
      });
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto space-y-6 animate-fade-in">
      <div className="flex justify-between items-center px-4 mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">Preview</h2>
        <div className="flex space-x-3">
          <Button 
            variant="outline" 
            onClick={onEdit}
          >
            Edit
          </Button>
          <Button 
            onClick={handleDownload}
            className="bg-factsheet-blue hover:bg-factsheet-blue/90 text-white transition-all shadow-md hover:shadow-lg"
            disabled={isGenerating}
          >
            {isGenerating ? 'Generating...' : 'Download PDF'}
          </Button>
        </div>
      </div>
      
      <Card className="overflow-hidden shadow-xl border-0 factsheet-wrapper">
        <div className="p-8 space-y-10">
          {/* First page sections */}
          <div className="page-break-after">
            <FactsheetHeader factsheetData={factsheetData} template={template} />
            <FundInformation factsheetData={factsheetData} template={template} />
            <FundPerformance factsheetData={factsheetData} template={template} />
          </div>
          
          {/* Second page sections - Risk Metrics should be at the top of the second page */}
          <div className="page-break-after">
            <div className="page-break-before page-break-inside-avoid">
              <RiskMetrics factsheetData={factsheetData} template={template} />
            </div>
            <FeeStructure factsheetData={factsheetData} template={template} />
            <AllocationCharts factsheetData={factsheetData} template={template} />
          </div>
          
          {/* Third page sections */}
          <div>
            <TopHoldings factsheetData={factsheetData} template={template} />
            <StyleBox factsheetData={factsheetData} template={template} />
            <ManagerComment factsheetData={factsheetData} template={template} />
            <Disclosures factsheetData={factsheetData} template={template} />
          </div>
        </div>
      </Card>
    </div>
  );
};

export default FactsheetPreview;
