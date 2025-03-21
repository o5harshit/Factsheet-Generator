
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout/Layout';
import FactsheetPreview from '@/components/FactsheetGenerator/FactsheetPreview';
import { Button } from '@/components/ui/button';
import { sampleFactsheetData, templates } from '@/utils/sampleData';
import { ArrowLeft, Download, Edit } from 'lucide-react';
import { toast } from 'sonner';
import { generatePDF, downloadPDF } from '@/utils/pdfGenerator';

const Preview: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [factsheetData, setFactsheetData] = useState(sampleFactsheetData);
  const [template, setTemplate] = useState(templates[0]);
  const [isLoading, setIsLoading] = useState(true);
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);

  useEffect(() => {
    try {
      console.log('Preview page loaded');
      
      // Deep merge function to properly combine nested objects
      const deepMerge = (target: any, source: any): any => {
        const output = Object.assign({}, target);
        
        if (isObject(target) && isObject(source)) {
          Object.keys(source).forEach(key => {
            if (isObject(source[key])) {
              if (!(key in target)) {
                Object.assign(output, { [key]: source[key] });
              } else {
                output[key] = deepMerge(target[key], source[key]);
              }
            } else {
              Object.assign(output, { [key]: source[key] });
            }
          });
        }
        
        return output;
      };
      
      // Helper function to check if value is an object
      const isObject = (item: any): boolean => {
        return (item && typeof item === 'object' && !Array.isArray(item));
      };
      
      // If there's data in location state, merge it with default data to ensure all fields exist
      if (location.state?.factsheetData) {
        console.log('Received factsheet data from state:', location.state.factsheetData);
        
        // Special handling for arrays to make sure they're replaced entirely if provided
        const mergedData = deepMerge(sampleFactsheetData, location.state.factsheetData);
        
        // Handle arrays separately
        if (location.state.factsheetData.topHoldings && Array.isArray(location.state.factsheetData.topHoldings)) {
          mergedData.topHoldings = location.state.factsheetData.topHoldings;
        }
        
        console.log('Merged data:', mergedData);
        setFactsheetData(mergedData);
      } else {
        // If no data, ensure we're using the sample data
        console.log('Using sample data:', sampleFactsheetData);
        setFactsheetData({...sampleFactsheetData});
      }
      
      if (location.state?.template) {
        setTemplate(location.state.template);
      }
      
      // Simulate loading data
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 800); // Slightly longer timeout to ensure data is processed
      
      return () => clearTimeout(timer);
    } catch (error) {
      console.error('Error loading preview data:', error);
      toast.error('Failed to load preview data');
      setIsLoading(false);
    }
  }, [location]);

  const handleEdit = () => {
    navigate('/', { state: { factsheetData, template } });
  };

  const handleDownload = async () => {
    if (isGeneratingPDF) return;
    
    setIsGeneratingPDF(true);
    toast.loading('Your factsheet is being generated for download', { duration: 5000 });
    
    try {
      // Generate PDF
      const pdfUrl = await generatePDF(factsheetData, template);
      
      // Create a safe filename - handle missing data gracefully
      const fundName = factsheetData.info?.name 
        ? factsheetData.info.name.replace(/\s+/g, '_')
        : 'Factsheet';
        
      const fileName = `${fundName}_Factsheet.pdf`;
        
      downloadPDF(pdfUrl, fileName);
      
      toast.success('Your factsheet has been downloaded successfully');
    } catch (error) {
      console.error('Error generating PDF:', error);
      toast.error('Error generating PDF. Please try again.');
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  if (isLoading) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="flex flex-col items-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-factsheet-blue"></div>
            <p className="mt-4 text-gray-600">Loading your factsheet preview...</p>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="min-h-screen py-12 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Preview Factsheet</h1>
            <div className="flex gap-4">
              <Button 
                onClick={() => navigate('/')}
                variant="outline"
                className="border-factsheet-blue text-factsheet-blue hover:bg-factsheet-blue/5 flex items-center gap-2"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to Generator
              </Button>
              <Button 
                onClick={handleEdit}
                variant="outline"
                className="border-factsheet-blue text-factsheet-blue hover:bg-factsheet-blue/5 flex items-center gap-2"
              >
                <Edit className="h-4 w-4" />
                Edit
              </Button>
              <Button 
                onClick={handleDownload}
                className="bg-factsheet-blue hover:bg-factsheet-blue/90 text-white flex items-center gap-2"
                disabled={isGeneratingPDF}
              >
                <Download className="h-4 w-4" />
                {isGeneratingPDF ? 'Generating...' : 'Download PDF'}
              </Button>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-xl p-2 md:p-6">
            <FactsheetPreview 
              factsheetData={factsheetData}
              template={template}
              onEdit={handleEdit}
            />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Preview;
