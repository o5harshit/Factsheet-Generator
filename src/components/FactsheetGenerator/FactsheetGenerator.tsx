
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Steps, Step } from '@/components/ui/steps';
import UploadForm from './UploadForm';
import TemplateSelector from './TemplateSelector';
import FactsheetCustomizer from './FactsheetCustomizer';
import FactsheetPreview from './FactsheetPreview';
import { sampleFactsheetData, templates, colorOptions, fontOptions, sectionOptions } from '@/utils/sampleData';
import { useToast } from '@/components/ui/use-toast';

export type GeneratorStep = 'upload' | 'template' | 'customize' | 'preview';

const FactsheetGenerator: React.FC = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState<GeneratorStep>('upload');
  const [factsheetData, setFactsheetData] = useState(sampleFactsheetData);
  const [selectedTemplate, setSelectedTemplate] = useState(templates[0].id);
  const [customizedTemplate, setCustomizedTemplate] = useState(templates[0]);

  const handleDataUploaded = (data: any) => {
    setFactsheetData(data);
    setCurrentStep('template');
  };

  const handleSelectTemplate = (templateId: string) => {
    setSelectedTemplate(templateId);
    const template = templates.find(t => t.id === templateId) || templates[0];
    setCustomizedTemplate(template);
  };

  const handleTemplateNext = () => {
    setCurrentStep('customize');
  };

  const handleCustomize = (template: any) => {
    setCustomizedTemplate(template);
  };

  const handlePreview = () => {
    setCurrentStep('preview');
  };

  const handleEdit = () => {
    setCurrentStep('customize');
  };

  const getStepIndex = (step: GeneratorStep): number => {
    const steps: GeneratorStep[] = ['upload', 'template', 'customize', 'preview'];
    return steps.indexOf(step);
  };

  const jumpToStep = (step: GeneratorStep) => {
    // Only allow going back to previous steps
    if (getStepIndex(step) < getStepIndex(currentStep)) {
      setCurrentStep(step);
    }
  };

  return (
    <div className="container mx-auto px-4 py-10">
      <div className="max-w-4xl mx-auto mb-12">
        <Steps 
          value={getStepIndex(currentStep)} 
          className="my-6"
        >
          <Step onClick={() => jumpToStep('upload')} className="cursor-pointer">Upload Data</Step>
          <Step onClick={() => jumpToStep('template')} className="cursor-pointer">Select Template</Step>
          <Step onClick={() => jumpToStep('customize')} className="cursor-pointer">Customize</Step>
          <Step onClick={() => jumpToStep('preview')} className="cursor-pointer">Preview</Step>
        </Steps>
      </div>
      
      <div className="mt-8 animate-fade-in">
        {currentStep === 'upload' && (
          <UploadForm onDataUploaded={handleDataUploaded} />
        )}
        
        {currentStep === 'template' && (
          <TemplateSelector 
            templates={templates} 
            selectedTemplate={selectedTemplate} 
            onSelectTemplate={handleSelectTemplate} 
            onNext={handleTemplateNext} 
          />
        )}
        
        {currentStep === 'customize' && (
          <FactsheetCustomizer 
            template={customizedTemplate}
            colorOptions={colorOptions}
            fontOptions={fontOptions}
            sectionOptions={sectionOptions}
            onCustomize={handleCustomize}
            onPreview={handlePreview}
          />
        )}
        
        {currentStep === 'preview' && (
          <FactsheetPreview 
            factsheetData={factsheetData}
            template={customizedTemplate}
            onEdit={handleEdit}
          />
        )}
      </div>
    </div>
  );
};

export default FactsheetGenerator;
