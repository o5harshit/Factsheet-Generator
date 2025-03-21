
import React, { useState } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { exportToCSV, generateTemplateData, parseCSVToFactsheetData } from '@/utils/exportToCSV';

interface UploadFormProps {
  onDataUploaded: (data: any) => void;
}

const UploadForm: React.FC<UploadFormProps> = ({ onDataUploaded }) => {
  const { toast } = useToast();
  const [isUploading, setIsUploading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);

  const handleDownloadTemplate = () => {
    const templateData = generateTemplateData();
    exportToCSV(templateData, 'factsheet_template.csv');
    
    toast({
      title: 'Template Downloaded',
      description: 'Fill in the template and upload it to generate your factsheet.',
      duration: 3000,
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileName(file.name);
      processFile(file);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    
    const file = e.dataTransfer.files?.[0];
    if (file) {
      setFileName(file.name);
      processFile(file);
    }
  };

  const processFile = (file: File) => {
    setIsUploading(true);
    
    const reader = new FileReader();
    
    reader.onload = (e) => {
      try {
        const csvData = e.target?.result as string;
        const factsheetData = parseCSVToFactsheetData(csvData);
        
        onDataUploaded(factsheetData);
        
        toast({
          title: 'File Uploaded Successfully',
          description: 'Your data has been processed and is ready for preview.',
          duration: 3000,
        });
      } catch (error) {
        console.error('Error processing file:', error);
        
        toast({
          title: 'Error Processing File',
          description: 'There was an error processing your file. Please ensure it is a valid CSV.',
          variant: 'destructive',
          duration: 5000,
        });
      } finally {
        setIsUploading(false);
      }
    };
    
    reader.onerror = () => {
      toast({
        title: 'Error Reading File',
        description: 'There was an error reading your file.',
        variant: 'destructive',
        duration: 5000,
      });
      
      setIsUploading(false);
    };
    
    reader.readAsText(file);
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-6 space-y-8 glass-card rounded-xl animate-fade-in">
      <div className="text-center">
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">Upload Your Data</h2>
        <p className="text-gray-600">
          Download the template, fill it with your fund data, and upload it to generate your factsheet
        </p>
      </div>
      
      <div className="space-y-6">
        <div className="flex justify-center">
          <Button 
            onClick={handleDownloadTemplate} 
            className="bg-factsheet-blue hover:bg-factsheet-blue/90 text-white transition-all shadow-md hover:shadow-lg"
          >
            Download Template
          </Button>
        </div>
        
        <div 
          className={`
            border-2 border-dashed rounded-lg p-10 text-center transition-all duration-200
            ${isDragging ? 'border-factsheet-blue bg-factsheet-blue/5' : 'border-gray-300 hover:border-gray-400'}
          `}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <div className="space-y-4">
            <div className="mx-auto w-12 h-12 rounded-full bg-factsheet-blue/10 flex items-center justify-center">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-6 w-6 text-factsheet-blue" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" 
                />
              </svg>
            </div>
            
            <div>
              <p className="text-sm font-medium text-gray-900">
                {fileName ? fileName : 'Drag and drop your file here'}
              </p>
              <p className="text-xs text-gray-500 mt-1">
                CSV file only, max 10MB
              </p>
            </div>
            
            <Label 
              htmlFor="file-upload" 
              className="cursor-pointer inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-factsheet-blue bg-white border border-factsheet-blue rounded-md shadow-sm hover:bg-factsheet-blue/5 transition-colors"
            >
              Select File
            </Label>
            <Input 
              id="file-upload" 
              type="file" 
              accept=".csv" 
              className="sr-only" 
              onChange={handleFileChange} 
              disabled={isUploading}
            />
          </div>
        </div>
      </div>
      
      {isUploading && (
        <div className="text-center py-2">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-factsheet-blue"></div>
          <p className="mt-2 text-sm text-gray-600">Processing your file...</p>
        </div>
      )}
    </div>
  );
};

export default UploadForm;
