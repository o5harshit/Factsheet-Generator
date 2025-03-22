
// Utility for generating PDF factsheets using jspdf
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { toast } from 'sonner';
import { FactsheetData, FactsheetTemplate } from '@/types';

export const generatePDF = async (factsheetData: FactsheetData, template: FactsheetTemplate): Promise<string> => {
  try {
    console.log('Generating PDF with data:', factsheetData);
    console.log('Using template:', template);
    
    // Get the factsheet element to convert to PDF
    const factsheetElement = document.querySelector('.factsheet-wrapper');
    
    if (!factsheetElement) {
      throw new Error('Factsheet element not found');
    }
    
    // Create a new jsPDF instance
    const pdf = new jsPDF('p', 'mm', 'a4');
    
    // Force wait for charts to render completely - increased timeout to ensure all charts render
    await new Promise<void>(resolve => {
      setTimeout(() => {
        resolve();
      }, 2500); // Increased timeout to 2.5 seconds to ensure charts render
    });
    
    // Force CSS page break rules to be applied before capturing
    const sections = document.querySelectorAll('.factsheet-section');
    sections.forEach((section) => {
      if (section instanceof HTMLElement) {
        if (section.classList.contains('page-break-inside-avoid')) {
          section.style.breakInside = 'avoid';
        }
      }
    });
    
    // Apply specific page break styles for the wrapper divs
    const pageBreaks = document.querySelectorAll('.page-break-after');
    pageBreaks.forEach((section) => {
      if (section instanceof HTMLElement) {
        section.style.breakAfter = 'always';
        section.style.marginBottom = '50px'; // Add extra space at the bottom of pages
      }
    });
    
    // Convert the factsheet HTML element to canvas - explicitly cast to HTMLElement to satisfy TypeScript
    const canvas = await html2canvas(factsheetElement as HTMLElement, {
      scale: 2, // Better quality
      useCORS: true, // Allow images from different domains
      logging: false,
      allowTaint: true,
      backgroundColor: '#ffffff',
      onclone: (clonedDoc) => {
        // Make sure all charts are visible in the cloned document
        const chartElements = clonedDoc.querySelectorAll('.recharts-wrapper');
        chartElements.forEach(chart => {
          if (chart instanceof HTMLElement) {
            chart.style.visibility = 'visible';
            chart.style.display = 'block';
          }
        });
        
        // Add debug info for chart elements
        console.log('Chart elements found:', chartElements.length);
        
        // Ensure SVG content is properly rendered
        const svgElements = clonedDoc.querySelectorAll('svg');
        svgElements.forEach(svg => {
          // Fix empty SVGs
          if (svg.getBoundingClientRect().width === 0) {
            console.warn('Empty SVG found, trying to fix...');
            svg.setAttribute('width', '100%');
            svg.setAttribute('height', '100%');
          }
          
          // Ensure all SVG children are visible
          const svgChildren = svg.querySelectorAll('*');
          svgChildren.forEach(child => {
            if (child instanceof SVGElement) {
              child.setAttribute('visibility', 'visible');
            }
          });
        });
        
        // Make sure pie charts are visible
        const pieElements = clonedDoc.querySelectorAll('.recharts-pie');
        pieElements.forEach(pie => {
          console.log('Pie chart found');
          if (pie instanceof SVGElement) {
            pie.setAttribute('visibility', 'visible');
            
            // Also ensure that all path elements within the pie chart are visible
            const paths = pie.querySelectorAll('path');
            paths.forEach(path => {
              path.setAttribute('visibility', 'visible');
            });
            
            // Make all text elements in pie charts visible
            const textElements = pie.querySelectorAll('text');
            textElements.forEach(text => {
              text.setAttribute('visibility', 'visible');
              // Adjust font size for PDF rendering to prevent overlapping
              text.setAttribute('font-size', '8');
            });
          }
        });
        
        // Apply page break rules to ensure sections stay together
        const sections = clonedDoc.querySelectorAll('.factsheet-section');
        sections.forEach(section => {
          if (section instanceof HTMLElement) {
            // Add more space between sections
            section.style.marginBottom = '30px';
            
            // Handle page break controls
            if (section.classList.contains('page-break-inside-avoid')) {
              section.style.breakAfter = 'avoid';
            }
            if (section.classList.contains('page-break-before')) {
              section.style.breakAfter = 'always';
            }
            if (section.classList.contains('page-break-after')) {
              section.style.breakAfter = 'always';
            }
          }
        });
        
        // Fix: Apply specific adjustments to the Risk Metrics section using standard DOM methods
        const riskSections = clonedDoc.querySelectorAll('.factsheet-section');
        riskSections.forEach(section => {
          const headingEl = section.querySelector('h3');
          if (headingEl && headingEl.textContent && headingEl.textContent.includes('Risk & Return Metrics')) {
            if (section instanceof HTMLElement) {
              section.style.marginTop = '20px';
              section.style.breakBefore = 'always';
              section.style.breakInside = 'avoid';
            }
          }
        });
      }
    });
    
    // Calculate the PDF dimensions
    const imgData = canvas.toDataURL('image/png');
    const imgWidth = 210; // A4 width in mm
    const pageHeight = 297; // A4 height in mm
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    let heightLeft = imgHeight;
    let position = 0;
    
    // Add the image to the PDF (first page)
    pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;
    
    // Add new pages if the content is longer than one page
    while (heightLeft > 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
    }
    
    // Generate a blob URL for the PDF
    const pdfBlob = pdf.output('blob');
    const pdfUrl = URL.createObjectURL(pdfBlob);
    
    return pdfUrl;
  } catch (error) {
    console.error('Error generating PDF:', error);
    throw error;
  }
};

// This function downloads the generated PDF
export const downloadPDF = (pdfUrl: string, filename: string = 'factsheet.pdf'): void => {
  if (!pdfUrl) {
    toast.error('Cannot download: PDF URL is missing');
    return;
  }
  
  try {
    // Create a temporary link element to download the PDF
    const element = document.createElement('a');
    element.setAttribute('href', pdfUrl);
    element.setAttribute('download', filename || 'factsheet.pdf');
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    
    // Clean up
    document.body.removeChild(element);
  } catch (error) {
    console.error('Error downloading PDF:', error);
    toast.error('Error downloading PDF. Please try again.');
  }
};

// Generate a preview URL for navigating to the preview page
export const generatePreviewUrl = (factsheetData: FactsheetData): string => {
  // In a real implementation, this might include data parameters or an ID
  return `/preview?id=${Date.now()}`;
};
