import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { toast } from 'sonner';
import { FactsheetData, FactsheetTemplate } from '@/types';

export const generatePDF = async (factsheetData: FactsheetData, template: FactsheetTemplate): Promise<string> => {
  try {
    console.log('Generating PDF with data:', factsheetData);
    console.log('Using template:', template);
    
    const factsheetElement = document.querySelector('.factsheet-wrapper');
    if (!factsheetElement) throw new Error('Factsheet element not found');
    
    const pdf = new jsPDF('p', 'mm', 'a4');
    await new Promise<void>(resolve => setTimeout(resolve, 2500));
    
    // Prevent content from breaking across pages
    document.querySelectorAll('.factsheet-section').forEach(section => {
      if (section instanceof HTMLElement) {
        section.style.pageBreakInside = 'avoid';
        section.style.breakInside = 'avoid';
        section.style.marginBottom = '20px';
      }
    });

    // Ensure "Risk & Return Metrics" has proper spacing and starts on a new page
    document.querySelectorAll('h3').forEach(heading => {
      if (heading.textContent?.includes('Risk & Return Metrics')) {
        const parent = heading.closest('.factsheet-section');
        if (parent instanceof HTMLElement) {
          parent.style.breakBefore = 'always';
          parent.style.pageBreakBefore = 'always';
          parent.style.marginBottom = '50px';  // Increased spacing
          parent.style.paddingBottom = '20px';
        }
      }
    });
    
    const canvas = await html2canvas(factsheetElement as HTMLElement, {
      scale: 2,
      useCORS: true,
      logging: false,
      allowTaint: true,
      backgroundColor: '#ffffff',
    });
    
    const imgData = canvas.toDataURL('image/png');
    const imgWidth = 210;
    const pageHeight = 297;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    let heightLeft = imgHeight;
    let position = 0;
    
    pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;
    
    while (heightLeft > 0) {
      position -= pageHeight;
      pdf.addPage();
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
    }
    
    const pdfBlob = pdf.output('blob');
    return URL.createObjectURL(pdfBlob);
  } catch (error) {
    console.error('Error generating PDF:', error);
    throw error;
  }
};

export const downloadPDF = (pdfUrl: string, filename: string = 'factsheet.pdf'): void => {
  if (!pdfUrl) {
    toast.error('Cannot download: PDF URL is missing');
    return;
  }
  
  try {
    const element = document.createElement('a');
    element.setAttribute('href', pdfUrl);
    element.setAttribute('download', filename);
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  } catch (error) {
    console.error('Error downloading PDF:', error);
    toast.error('Error downloading PDF. Please try again.');
  }
};

export const generatePreviewUrl = (factsheetData: FactsheetData): string => {
  return `/preview?id=${Date.now()}`;
}; 
