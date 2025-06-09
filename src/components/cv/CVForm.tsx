
import { useState } from "react";
import { CVData } from "@/types/cv";
import { PersonalInfoSection } from "./form-sections/PersonalInfoSection";
import { ExperienceSection } from "./form-sections/ExperienceSection";
import { EducationSection } from "./form-sections/EducationSection";
import { SkillsSection } from "./form-sections/SkillsSection";
import { LanguagesSection } from "./form-sections/LanguagesSection";
import { CertificationsSection } from "./form-sections/CertificationsSection";

interface CVFormProps {
  cvData: CVData;
  updateCVData: (section: keyof CVData, data: any) => void;
}

export const CVForm = ({ cvData, updateCVData }: CVFormProps) => {
  const [activeSection, setActiveSection] = useState("personal");

  const sections = [
    { id: "personal", label: "Personal Info", icon: "👤" },
    { id: "experience", label: "Experience", icon: "💼" },
    { id: "education", label: "Education", icon: "🎓" },
    { id: "skills", label: "Skills", icon: "⚡" },
    { id: "languages", label: "Languages", icon: "🌍" },
    { id: "certifications", label: "Certifications", icon: "🏆" }
  ];

  return (
    <div className="h-full flex flex-col">
      {/* Section Navigation */}
      <div className="border-b border-gray-200 bg-gray-50 p-4">
        <div className="grid grid-cols-2 gap-2">
          {sections.map(section => (
            <button
              key={section.id}
              onClick={() => setActiveSection(section.id)}
              className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeSection === section.id
                  ? "bg-blue-600 text-white"
                  : "bg-white text-gray-700 hover:bg-gray-100"
              }`}
            >
              <span>{section.icon}</span>
              <span>{section.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Section Content */}
      <div className="flex-1 overflow-y-auto p-4">
        {activeSection === "personal" && (
          <PersonalInfoSection 
            data={cvData.personalInfo}
            onChange={(data) => updateCVData("personalInfo", data)}
          />
        )}
        {activeSection === "experience" && (
          <ExperienceSection 
            data={cvData.experience}
            onChange={(data) => updateCVData("experience", data)}
          />
        )}
        {activeSection === "education" && (
          <EducationSection 
            data={cvData.education}
            onChange={(data) => updateCVData("education", data)}
          />
        )}
        {activeSection === "skills" && (
          <SkillsSection 
            data={cvData.skills}
            onChange={(data) => updateCVData("skills", data)}
          />
        )}
        {activeSection === "languages" && (
          <LanguagesSection 
            data={cvData.languages}
            onChange={(data) => updateCVData("languages", data)}
          />
        )}
        {activeSection === "certifications" && (
          <CertificationsSection 
            data={cvData.certifications}
            onChange={(data) => updateCVData("certifications", data)}
          />
        )}
      </div>
    </div>
  );
};
