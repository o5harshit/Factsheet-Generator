
import React from 'react';
import Layout from '@/components/Layout/Layout';
import FactsheetGenerator from '@/components/FactsheetGenerator/FactsheetGenerator';
import { FileText, BarChart3, FileCheck } from 'lucide-react';

const Index: React.FC = () => {
  return (
    <Layout>
      <div className="min-h-screen py-12 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-16 animate-slide-down">
            <h1 className="text-5xl font-bold mb-6 text-gray-900 tracking-tight">
              Fund Factsheet Generator
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Create professional, pixel-perfect fund factsheets with comprehensive data visualization and customizable templates
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto mt-12">
              <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center">
                <div className="bg-factsheet-blue/10 p-3 rounded-full mb-4">
                  <FileText className="h-6 w-6 text-factsheet-blue" />
                </div>
                <h3 className="font-semibold mb-2">Easy Data Input</h3>
                <p className="text-sm text-gray-500 text-center">Upload your fund data using our simple CSV template</p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center">
                <div className="bg-factsheet-blue/10 p-3 rounded-full mb-4">
                  <BarChart3 className="h-6 w-6 text-factsheet-blue" />
                </div>
                <h3 className="font-semibold mb-2">Dynamic Visualization</h3>
                <p className="text-sm text-gray-500 text-center">Automatically generate charts and metrics for your fund</p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center">
                <div className="bg-factsheet-blue/10 p-3 rounded-full mb-4">
                  <FileCheck className="h-6 w-6 text-factsheet-blue" />
                </div>
                <h3 className="font-semibold mb-2">Professional Output</h3>
                <p className="text-sm text-gray-500 text-center">Download pixel-perfect factsheets ready for distribution</p>
              </div>
            </div>
          </div>
          
          <FactsheetGenerator />
        </div>
      </div>
    </Layout>
  );
};

export default Index;
