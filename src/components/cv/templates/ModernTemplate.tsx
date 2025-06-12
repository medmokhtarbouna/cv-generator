
import { CVData, CustomizationOptions } from "@/types/cv";
import { Mail, Phone, MapPin, Globe, Calendar, Star } from "lucide-react";

interface TemplateProps {
  cvData: CVData;
  customization: CustomizationOptions;
}

export const ModernTemplate = ({ cvData, customization }: TemplateProps) => {
  const { personalInfo, experience, education, skills, languages, certifications } = cvData;

  const fontFamily = customization.fontFamily;
  const primaryColor = customization.primaryColor;
  const accentColor = customization.accentColor;

  return (
    <div 
      className="h-full text-gray-800 bg-gradient-to-br from-gray-50 to-gray-100"
      style={{ fontFamily }}
    >
     
    </div>
  );
};
