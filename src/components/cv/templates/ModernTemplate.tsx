
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
      {/* Header */}
      <header className="bg-white p-8 shadow-sm">
        <div className="flex items-center space-x-8">
          {personalInfo.photo && (
            <div className="relative">
              <img 
                src={personalInfo.photo} 
                alt="Profile" 
                className="w-32 h-32 rounded-full object-cover shadow-lg border-4 border-white"
              />
              <div 
                className="absolute inset-0 rounded-full border-4 border-opacity-20"
                style={{ borderColor: primaryColor }}
              />
            </div>
          )}
          <div className="flex-1">
            <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r bg-clip-text text-transparent"
                style={{ backgroundImage: `linear-gradient(to right, ${primaryColor}, ${accentColor})` }}>
              {personalInfo.fullName || "Your Name"}
            </h1>
            <h2 className="text-2xl text-gray-600 mb-6 font-light">
              {personalInfo.jobTitle || "Your Job Title"}
            </h2>
            
            <div className="grid grid-cols-2 gap-4 text-sm">
              {personalInfo.email && (
                <div className="flex items-center space-x-3 bg-gray-50 px-3 py-2 rounded-lg">
                  <Mail className="h-4 w-4" style={{ color: primaryColor }} />
                  <span>{personalInfo.email}</span>
                </div>
              )}
              {personalInfo.phone && (
                <div className="flex items-center space-x-3 bg-gray-50 px-3 py-2 rounded-lg">
                  <Phone className="h-4 w-4" style={{ color: primaryColor }} />
                  <span>{personalInfo.phone}</span>
                </div>
              )}
              {personalInfo.location && (
                <div className="flex items-center space-x-3 bg-gray-50 px-3 py-2 rounded-lg">
                  <MapPin className="h-4 w-4" style={{ color: primaryColor }} />
                  <span>{personalInfo.location}</span>
                </div>
              )}
              {personalInfo.website && (
                <div className="flex items-center space-x-3 bg-gray-50 px-3 py-2 rounded-lg">
                  <Globe className="h-4 w-4" style={{ color: primaryColor }} />
                  <span>{personalInfo.website}</span>
                </div>
              )}
            </div>
          </div>
        </div>
        
        {personalInfo.summary && (
          <div className="mt-8 bg-gray-50 p-6 rounded-lg">
            <h3 className="text-lg font-semibold mb-3" style={{ color: primaryColor }}>
              About Me
            </h3>
            <p className="text-gray-700 leading-relaxed">{personalInfo.summary}</p>
          </div>
        )}
      </header>

      <div className="p-8">
        {/* Experience */}
        {experience.length > 0 && (
          <section className="mb-10">
            <div className="flex items-center mb-6">
              <div 
                className="w-8 h-8 rounded-full mr-4"
                style={{ backgroundColor: primaryColor }}
              />
              <h3 className="text-2xl font-bold" style={{ color: primaryColor }}>
                Experience
              </h3>
            </div>
            <div className="space-y-8">
              {experience.map((exp, index) => (
                <div key={exp.id} className="relative bg-white p-6 rounded-lg shadow-sm border-l-4"
                     style={{ borderLeftColor: index % 2 === 0 ? primaryColor : accentColor }}>
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h4 className="font-bold text-xl text-gray-800">{exp.jobTitle}</h4>
                      <p className="text-lg font-medium" style={{ color: primaryColor }}>{exp.company}</p>
                      <p className="text-gray-600">{exp.location}</p>
                    </div>
                    <div className="bg-gray-100 px-4 py-2 rounded-full">
                      <div className="text-sm text-gray-600 flex items-center">
                        <Calendar className="h-4 w-4 mr-2" />
                        {exp.startDate} - {exp.current ? "Present" : exp.endDate}
                      </div>
                    </div>
                  </div>
                  {exp.description && (
                    <div className="text-gray-700 whitespace-pre-line leading-relaxed">
                      {exp.description}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        

        

        
      </div>
    </div>
  );
};
