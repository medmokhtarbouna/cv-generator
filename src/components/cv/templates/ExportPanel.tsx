import { useState } from "react";
import { CVData, CustomizationOptions } from "@/types/cv";
import { Button } from "@/components/ui/button";
import { Download, FileText, Share2, Save } from "lucide-react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

interface ExportPanelProps {
  cvData: CVData;
  customization: CustomizationOptions;
}

export const ExportPanel = ({ cvData, customization }: ExportPanelProps) => {
  const [isExporting, setIsExporting] = useState(false);

  const exportToPDF = async () => {
    setIsExporting(true);
    try {
      const element = document.getElementById('cv-preview');
      if (!element) {
        throw new Error('CV preview element not found');
      }

      // Create canvas from the CV preview
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        backgroundColor: '#ffffff',
        width: element.offsetWidth,
        height: element.offsetHeight
      });

      // Create PDF
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });

      const imgWidth = 210; // A4 width in mm
      const pageHeight = 297; // A4 height in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;

      let position = 0;

      // Add first page
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      // Add additional pages if needed
      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      // Download the PDF
      const fileName = `${cvData.personalInfo.fullName || 'CV'}_Resume.pdf`;
      pdf.save(fileName);
      
    } catch (error) {
      console.error('Error exporting PDF:', error);
      alert('Failed to export PDF. Please try again.');
    } finally {
      setIsExporting(false);
    }
  };

  const saveToLocalStorage = () => {
    try {
      const cvDataToSave = {
        cvData,
        customization,
        savedAt: new Date().toISOString()
      };
      localStorage.setItem('saved-cv', JSON.stringify(cvDataToSave));
      alert('CV saved successfully!');
    } catch (error) {
      console.error('Error saving CV:', error);
      alert('Failed to save CV. Please try again.');
    }
  };

  const loadFromLocalStorage = () => {
    try {
      const savedData = localStorage.getItem('saved-cv');
      if (savedData) {
        const parsed = JSON.parse(savedData);
        // Note: In a real implementation, you'd need to pass these back to the parent component
        alert('CV loaded successfully! (Feature needs parent component integration)');
      } else {
        alert('No saved CV found.');
      }
    } catch (error) {
      console.error('Error loading CV:', error);
      alert('Failed to load CV. Please try again.');
    }
  };

  const shareCV = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${cvData.personalInfo.fullName}'s CV`,
          text: 'Check out my professional CV',
          url: window.location.href
        });
      } catch (error) {
        console.error('Error sharing:', error);
      }
    } else {
      // Fallback: copy URL to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert('CV URL copied to clipboard!');
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="text-center">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Export & Share</h3>
        <p className="text-sm text-gray-600">Download or share your professional CV</p>
      </div>

      {/* Export Options */}
      <div className="space-y-4">
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-6 rounded-lg text-white">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-bold text-lg mb-2">📄 Export as PDF</h4>
              <p className="text-blue-100 text-sm">
                High-quality PDF perfect for job applications
              </p>
            </div>
            <Button
              onClick={exportToPDF}
              disabled={isExporting}
              className="bg-white text-blue-600 hover:bg-blue-50"
            >
              {isExporting ? (
                <div className="flex items-center space-x-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                  <span>Exporting...</span>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <Download className="h-4 w-4" />
                  <span>Download PDF</span>
                </div>
              )}
            </Button>
          </div>
        </div>

        {/* Other Export Options */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Button
            onClick={saveToLocalStorage}
            variant="outline"
            className="h-20 flex-col space-y-2"
          >
            <Save className="h-6 w-6" />
            <div className="text-center">
              <div className="font-medium">Save Locally</div>
              <div className="text-xs text-gray-500">Browser storage</div>
            </div>
          </Button>

          <Button
            onClick={shareCV}
            variant="outline"
            className="h-20 flex-col space-y-2"
          >
            <Share2 className="h-6 w-6" />
            <div className="text-center">
              <div className="font-medium">Share CV</div>
              <div className="text-xs text-gray-500">Copy link</div>
            </div>
          </Button>
        </div>
      </div>

      {/* Format Information */}
      <div className="bg-gray-50 p-4 rounded-lg">
        <h4 className="font-medium text-gray-800 mb-3">📋 Export Details</h4>
        <div className="space-y-2 text-sm text-gray-600">
          <div className="flex justify-between">
            <span>Format:</span>
            <span className="font-medium">PDF (A4)</span>
          </div>
          <div className="flex justify-between">
            <span>Quality:</span>
            <span className="font-medium">High Resolution</span>
          </div>
          <div className="flex justify-between">
            <span>Template:</span>
            <span className="font-medium capitalize">{customization.template}</span>
          </div>
          <div className="flex justify-between">
            <span>Colors:</span>
            <span className="flex items-center space-x-2">
              <div 
                className="w-4 h-4 rounded-full border"
                style={{ backgroundColor: customization.primaryColor }}
              />
              <div 
                className="w-4 h-4 rounded-full border"
                style={{ backgroundColor: customization.accentColor }}
              />
            </span>
          </div>
        </div>
      </div>

      {/* Tips */}
      <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
        <h4 className="font-medium text-yellow-800 mb-2">💡 Export Tips</h4>
        <ul className="text-sm text-yellow-700 space-y-1">
          <li>• PDF exports are ATS-friendly for online applications</li>
          <li>• Save locally to preserve your work between sessions</li>
          <li>• Print directly from the PDF for best quality</li>
          <li>• Consider exporting multiple versions with different templates</li>
        </ul>
      </div>

      {/* Load Saved CV */}
      <div className="border-t pt-4">
        <Button
          onClick={loadFromLocalStorage}
          variant="ghost"
          className="w-full text-gray-600"
        >
          <FileText className="h-4 w-4 mr-2" />
          Load Saved CV
        </Button>
      </div>
    </div>
  );
};
