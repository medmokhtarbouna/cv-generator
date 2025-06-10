
import { CVData, CustomizationOptions } from "@/types/cv";
import { Mail, Phone, MapPin, Globe, Calendar } from "lucide-react";

interface TemplateProps {
  cvData: CVData;
  customization: CustomizationOptions;
}

export const ClassicTemplate = ({ cvData, customization }: TemplateProps) => {
  const { personalInfo, experience, education, skills, languages, certifications } = cvData;

  const fontFamily = customization.fontFamily;
  const primaryColor = customization.primaryColor;

  return (
    <div 
      className="p-8 h-full text-gray-800"
      style={{ fontFamily }}
    >
      {/* Header */}
     

      {/* Experience */}
      {experience.length > 0 && (
        <section className="mb-8">
          <h3 className="text-xl font-bold mb-4" style={{ color: primaryColor }}>
            Professional Experience
          </h3>
          <div className="space-y-6">
            {experience.map((exp) => (
              <div key={exp.id} className="border-l-4 pl-4" style={{ borderColor: primaryColor }}>
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h4 className="font-semibold text-lg">{exp.jobTitle}</h4>
                    <p className="text-gray-600">{exp.company} • {exp.location}</p>
                  </div>
                  <div className="text-sm text-gray-500 flex items-center">
                    <Calendar className="h-4 w-4 mr-1" />
                    {exp.startDate} - {exp.current ? "Present" : exp.endDate}
                  </div>
                </div>
                {exp.description && (
                  <div className="text-gray-700 whitespace-pre-line">{exp.description}</div>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Education */}
      {education.length > 0 && (
        <section className="mb-8">
          <h3 className="text-xl font-bold mb-4" style={{ color: primaryColor }}>
            Education
          </h3>
          <div className="space-y-4">
            {education.map((edu) => (
              <div key={edu.id} className="border-l-4 pl-4" style={{ borderColor: primaryColor }}>
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h4 className="font-semibold">{edu.degree}</h4>
                    <p className="text-gray-600">{edu.institution} • {edu.location}</p>
                    {edu.gpa && <p className="text-sm text-gray-500">GPA: {edu.gpa}</p>}
                  </div>
                  <div className="text-sm text-gray-500 flex items-center">
                    <Calendar className="h-4 w-4 mr-1" />
                    {edu.startDate} - {edu.endDate}
                  </div>
                </div>
                {edu.description && (
                  <p className="text-gray-700">{edu.description}</p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Skills */}
      {skills.length > 0 && (
        <section className="mb-8">
          <h3 className="text-xl font-bold mb-4" style={{ color: primaryColor }}>
            Skills
          </h3>
          <div className="grid grid-cols-2 gap-6">
            {Object.entries(
              skills.reduce((acc, skill) => {
                if (!acc[skill.category]) acc[skill.category] = [];
                acc[skill.category].push(skill);
                return acc;
              }, {} as Record<string, typeof skills>)
            ).map(([category, categorySkills]) => (
              <div key={category}>
                <h4 className="font-semibold mb-2 text-gray-800">{category}</h4>
                <div className="space-y-2">
                  {categorySkills.map((skill) => (
                    <div key={skill.id} className="flex justify-between items-center">
                      <span className="text-gray-700">{skill.name}</span>
                      <div className="flex space-x-1">
                        {Array.from({ length: 5 }, (_, i) => (
                          <div
                            key={i}
                            className={`w-2 h-2 rounded-full ${
                              i < skill.level ? "bg-current" : "bg-gray-300"
                            }`}
                            style={{ color: i < skill.level ? primaryColor : undefined }}
                          />
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Languages and Certifications */}
      <div className="grid grid-cols-2 gap-8">
        {/* Languages */}
        {languages.length > 0 && (
          <section>
            <h3 className="text-xl font-bold mb-4" style={{ color: primaryColor }}>
              Languages
            </h3>
            <div className="space-y-2">
              {languages.map((lang) => (
                <div key={lang.id} className="flex justify-between">
                  <span className="text-gray-700">{lang.name}</span>
                  <span className="text-gray-500 text-sm">{lang.level}</span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Certifications */}
        {certifications.length > 0 && (
          <section>
            <h3 className="text-xl font-bold mb-4" style={{ color: primaryColor }}>
              Certifications
            </h3>
            <div className="space-y-3">
              {certifications.map((cert) => (
                <div key={cert.id}>
                  <h4 className="font-semibold text-gray-800">{cert.name}</h4>
                  <p className="text-gray-600 text-sm">{cert.issuer}</p>
                  {cert.date && (
                    <p className="text-gray-500 text-sm">{cert.date}</p>
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
