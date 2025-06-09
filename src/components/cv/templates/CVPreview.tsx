
import { CVData, CustomizationOptions } from "@/types/cv";
import { ClassicTemplate } from "./templates/ClassicTemplate";
import { ModernTemplate } from "./templates/ModernTemplate";
import { CreativeTemplate } from "./templates/CreativeTemplate";
import { RTLTemplate } from "./templates/RTLTemplate";

interface CVPreviewProps {
  cvData: CVData;
  customization: CustomizationOptions;
}

export const CVPreview = ({ cvData, customization }: CVPreviewProps) => {
  const renderTemplate = () => {
    const props = { cvData, customization };
    
    switch (customization.template) {
      case "classic":
        return <ClassicTemplate {...props} />;
      case "modern":
        return <ModernTemplate {...props} />;
      case "creative":
        return <CreativeTemplate {...props} />;
      case "rtl":
        return <RTLTemplate {...props} />;
      default:
        return <ClassicTemplate {...props} />;
    }
  };

  return (
    <div id="cv-preview" className="bg-white shadow-lg mx-auto" style={{ width: "210mm", minHeight: "297mm" }}>
      {renderTemplate()}
    </div>
  );
};
