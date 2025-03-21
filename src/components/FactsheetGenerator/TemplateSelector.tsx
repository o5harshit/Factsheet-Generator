
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { FactsheetTemplate } from '@/types';

interface TemplateSelectorProps {
  templates: FactsheetTemplate[];
  selectedTemplate: string;
  onSelectTemplate: (templateId: string) => void;
  onNext: () => void;
}

const TemplateSelector: React.FC<TemplateSelectorProps> = ({
  templates,
  selectedTemplate,
  onSelectTemplate,
  onNext,
}) => {
  return (
    <div className="w-full max-w-4xl mx-auto p-6 space-y-8 glass-card rounded-xl animate-fade-in">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">Choose a Template</h2>
        <p className="text-gray-600">
          Select the template that best fits your factsheet needs
        </p>
      </div>
      
      <RadioGroup
        value={selectedTemplate}
        onValueChange={onSelectTemplate}
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        {templates.map((template) => (
          <div key={template.id} className="relative">
            <RadioGroupItem
              value={template.id}
              id={template.id}
              className="sr-only peer"
            />
            <Label
              htmlFor={template.id}
              className="cursor-pointer"
            >
              <Card className={`overflow-hidden transition-all duration-300 h-full border-2 hover:shadow-md ${
                selectedTemplate === template.id 
                  ? 'border-factsheet-blue ring-2 ring-factsheet-blue/20' 
                  : 'border-transparent'
              }`}>
                <div 
                  className="h-3" 
                  style={{ backgroundColor: template.primaryColor }}
                ></div>
                <CardHeader>
                  <CardTitle>{template.name}</CardTitle>
                  <CardDescription>{template.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-sm text-gray-500">
                    <div className="mb-2">
                      <span className="font-medium">Primary Color:</span>
                      <span 
                        className="inline-block w-4 h-4 ml-2 rounded-full" 
                        style={{ backgroundColor: template.primaryColor }}
                      ></span>
                    </div>
                    <div className="mb-2">
                      <span className="font-medium">Secondary Color:</span>
                      <span 
                        className="inline-block w-4 h-4 ml-2 rounded-full" 
                        style={{ backgroundColor: template.secondaryColor }}
                      ></span>
                    </div>
                    <div>
                      <span className="font-medium">Logo Position:</span> {template.logoPosition}
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <div className="text-xs text-gray-500">
                    {template.sections.length} sections included
                  </div>
                </CardFooter>
              </Card>
            </Label>
          </div>
        ))}
      </RadioGroup>
      
      <div className="flex justify-center mt-8">
        <Button 
          onClick={onNext}
          className="bg-factsheet-blue hover:bg-factsheet-blue/90 text-white transition-all shadow-md hover:shadow-lg"
          disabled={!selectedTemplate}
        >
          Continue
        </Button>
      </div>
    </div>
  );
};

export default TemplateSelector;
