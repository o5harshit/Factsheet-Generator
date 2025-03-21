
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { FactsheetTemplate } from '@/types';

interface FactsheetCustomizerProps {
  template: FactsheetTemplate;
  colorOptions: string[];
  fontOptions: string[];
  sectionOptions: { id: string; name: string; default: boolean }[];
  onCustomize: (customizedTemplate: FactsheetTemplate) => void;
  onPreview: () => void;
}

const FactsheetCustomizer: React.FC<FactsheetCustomizerProps> = ({
  template,
  colorOptions,
  fontOptions,
  sectionOptions,
  onCustomize,
  onPreview,
}) => {
  const [customTemplate, setCustomTemplate] = useState<FactsheetTemplate>({ ...template });
  const [selectedSections, setSelectedSections] = useState<string[]>(template.sections);

  const handlePrimaryColorChange = (value: string) => {
    const updated = { ...customTemplate, primaryColor: value };
    setCustomTemplate(updated);
    onCustomize(updated);
  };

  const handleSecondaryColorChange = (value: string) => {
    const updated = { ...customTemplate, secondaryColor: value };
    setCustomTemplate(updated);
    onCustomize(updated);
  };

  const handleLogoPositionChange = (value: 'left' | 'center' | 'right') => {
    const updated = { ...customTemplate, logoPosition: value };
    setCustomTemplate(updated);
    onCustomize(updated);
  };

  const handleSectionToggle = (sectionId: string, checked: boolean) => {
    let updatedSections;
    
    if (checked) {
      updatedSections = [...selectedSections, sectionId];
    } else {
      updatedSections = selectedSections.filter((id) => id !== sectionId);
    }
    
    setSelectedSections(updatedSections);
    
    const updated = { ...customTemplate, sections: updatedSections };
    setCustomTemplate(updated);
    onCustomize(updated);
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-6 space-y-8 glass-card rounded-xl animate-fade-in">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">Customize Your Factsheet</h2>
        <p className="text-gray-600">
          Fine-tune the appearance and content of your factsheet
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Design Options</CardTitle>
            <CardDescription>Customize the visual appearance</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="primaryColor">Primary Color</Label>
              <div className="flex space-x-2">
                <Select 
                  value={customTemplate.primaryColor} 
                  onValueChange={handlePrimaryColorChange}
                >
                  <SelectTrigger id="primaryColor" className="w-full">
                    <SelectValue placeholder="Select a color" />
                  </SelectTrigger>
                  <SelectContent>
                    {colorOptions.map((color) => (
                      <SelectItem key={color} value={color}>
                        <div className="flex items-center">
                          <span 
                            className="inline-block w-4 h-4 mr-2 rounded-full" 
                            style={{ backgroundColor: color }}
                          ></span>
                          {color}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="secondaryColor">Secondary Color</Label>
              <div className="flex space-x-2">
                <Select 
                  value={customTemplate.secondaryColor} 
                  onValueChange={handleSecondaryColorChange}
                >
                  <SelectTrigger id="secondaryColor" className="w-full">
                    <SelectValue placeholder="Select a color" />
                  </SelectTrigger>
                  <SelectContent>
                    {colorOptions.map((color) => (
                      <SelectItem key={color} value={color}>
                        <div className="flex items-center">
                          <span 
                            className="inline-block w-4 h-4 mr-2 rounded-full" 
                            style={{ backgroundColor: color }}
                          ></span>
                          {color}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="logoPosition">Logo Position</Label>
              <Select 
                value={customTemplate.logoPosition} 
                onValueChange={(value: any) => handleLogoPositionChange(value)}
              >
                <SelectTrigger id="logoPosition" className="w-full">
                  <SelectValue placeholder="Logo position" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="left">Left</SelectItem>
                  <SelectItem value="center">Center</SelectItem>
                  <SelectItem value="right">Right</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="fontFamily">Font Family</Label>
              <Select defaultValue="Inter">
                <SelectTrigger id="fontFamily" className="w-full">
                  <SelectValue placeholder="Select a font" />
                </SelectTrigger>
                <SelectContent>
                  {fontOptions.map((font) => (
                    <SelectItem key={font} value={font}>{font}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Content Sections</CardTitle>
            <CardDescription>Select the sections to include</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {sectionOptions.map((section) => (
                <div key={section.id} className="flex items-center space-x-2">
                  <Checkbox 
                    id={`section-${section.id}`} 
                    checked={selectedSections.includes(section.id)}
                    onCheckedChange={(checked) => handleSectionToggle(section.id, checked as boolean)}
                  />
                  <Label 
                    htmlFor={`section-${section.id}`}
                    className="cursor-pointer"
                  >
                    {section.name}
                  </Label>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="flex justify-center pt-4">
        <Button 
          onClick={onPreview}
          className="bg-factsheet-blue hover:bg-factsheet-blue/90 text-white transition-all shadow-md hover:shadow-lg"
        >
          Preview Factsheet
        </Button>
      </div>
    </div>
  );
};

export default FactsheetCustomizer;
