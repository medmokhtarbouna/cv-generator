
import { CVData, CustomizationOptions } from "@/types/cv";
import { Mail, Phone, MapPin, Globe, Calendar, Star, Zap } from "lucide-react";

interface TemplateProps {
  cvData: CVData;
  customization: CustomizationOptions;
}

export const CreativeTemplate = ({ cvData, customization }: TemplateProps) => {
  const { personalInfo, experience, education, skills, languages, certifications } = cvData;

  const fontFamily = customization.fontFamily;
  const primaryColor = customization.primaryColor;
  const accentColor = customization.accentColor;

  return (
    <div 
      className="h-full text-gray-800"
      style={{ fontFamily }}
    >
      {/* Creative Header with Geometric Shapes */}
      

      <div className="p-8 bg-gray-50">
        {/* Experience with Creative Timeline */}
        {experience.length > 0 && (
          <section className="mb-12">
            <div className="flex items-center mb-8">
              <div className="bg-gradient-to-r from-blue-500 to-purple-500 text-white p-3 rounded-full mr-4">
                💼
              </div>
              <h3 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Experience Journey
              </h3>
            </div>
            <div className="relative">
              <div className="absolute left-8 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-500 to-purple-500 rounded-full" />
              <div className="space-y-8">
                {experience.map((exp, index) => (
                  <div key={exp.id} className="relative ml-16">
                    <div 
                      className="absolute -left-20 top-4 w-8 h-8 rounded-full flex items-center justify-center text-white font-bold"
                      style={{ backgroundColor: index % 2 === 0 ? primaryColor : accentColor }}
                    >
                      {index + 1}
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-lg border-l-4 hover:shadow-xl transition-shadow"
                         style={{ borderLeftColor: index % 2 === 0 ? primaryColor : accentColor }}>
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h4 className="font-bold text-xl text-gray-800">{exp.jobTitle}</h4>
                          <p className="text-lg font-medium bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                            {exp.company}
                          </p>
                          <p className="text-gray-600">📍 {exp.location}</p>
                        </div>
                        <div className="bg-gradient-to-r from-blue-100 to-purple-100 px-4 py-2 rounded-full">
                          <div className="text-sm text-gray-700 flex items-center">
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
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Education with Creative Cards */}
        {education.length > 0 && (
          <section className="mb-12">
            <div className="flex items-center mb-8">
              <div className="bg-gradient-to-r from-green-500 to-blue-500 text-white p-3 rounded-full mr-4">
                🎓
              </div>
              <h3 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                Education
              </h3>
            </div>
            <div className="grid gap-6">
              {education.map((edu, index) => (
                <div key={edu.id} className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all hover:scale-105">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h4 className="font-bold text-xl text-gray-800">{edu.degree}</h4>
                      <p className="text-lg font-medium bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                        {edu.institution}
                      </p>
                      <p className="text-gray-600">📍 {edu.location}</p>
                      {edu.gpa && (
                        <p className="text-sm text-gray-500 mt-1 bg-yellow-100 px-3 py-1 rounded-full inline-block">
                          ⭐ GPA: {edu.gpa}
                        </p>
                      )}
                    </div>
                    <div className="bg-gradient-to-r from-green-100 to-blue-100 px-4 py-2 rounded-full">
                      <span className="text-sm text-gray-700">
                        {edu.startDate} - {edu.endDate}
                      </span>
                    </div>
                  </div>
                  {edu.description && (
                    <p className="text-gray-700 mt-3 italic">{edu.description}</p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Creative Skills Section */}
        {skills.length > 0 && (
          <section className="mb-12">
            <div className="flex items-center mb-8">
              <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white p-3 rounded-full mr-4">
                ⚡
              </div>
              <h3 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Skills & Expertise
              </h3>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-lg">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {Object.entries(
                  skills.reduce((acc, skill) => {
                    if (!acc[skill.category]) acc[skill.category] = [];
                    acc[skill.category].push(skill);
                    return acc;
                  }, {} as Record<string, typeof skills>)
                ).map(([category, categorySkills], categoryIndex) => (
                  <div key={category} className="space-y-4">
                    <h4 className="font-bold text-xl text-gray-800 mb-4 flex items-center">
                      <span className="mr-2">{categoryIndex % 4 === 0 ? "💻" : categoryIndex % 4 === 1 ? "🎨" : categoryIndex % 4 === 2 ? "🛠️" : "🧠"}</span>
                      {category}
                    </h4>
                    <div className="space-y-4">
                      {categorySkills.map((skill) => (
                        <div key={skill.id} className="bg-gray-50 p-4 rounded-lg hover:bg-gray-100 transition-colors">
                          <div className="flex justify-between items-center mb-2">
                            <span className="font-medium text-gray-800">{skill.name}</span>
                            <div className="flex space-x-1">
                              {Array.from({ length: 5 }, (_, i) => (
                                <Star
                                  key={i}
                                  className={`w-4 h-4 ${
                                    i < skill.level ? "text-yellow-400 fill-current" : "text-gray-300"
                                  }`}
                                />
                              ))}
                            </div>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                            <div 
                              className="h-3 rounded-full transition-all duration-500 bg-gradient-to-r from-purple-500 to-pink-500"
                              style={{ width: `${(skill.level / 5) * 100}%` }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Languages and Certifications with Creative Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Languages */}
          {languages.length > 0 && (
            <section className="bg-white p-6 rounded-xl shadow-lg">
              <h3 className="text-2xl font-bold mb-6 flex items-center">
                <span className="mr-3">🌍</span>
                <span className="bg-gradient-to-r from-green-600 to-teal-600 bg-clip-text text-transparent">
                  Languages
                </span>
              </h3>
              <div className="space-y-3">
                {languages.map((lang, index) => (
                  <div key={lang.id} className="flex justify-between items-center p-4 bg-gradient-to-r from-green-50 to-teal-50 rounded-lg border-l-4 border-green-500">
                    <span className="font-medium text-gray-800 flex items-center">
                      <span className="mr-2">{index % 3 === 0 ? "🇺🇸" : index % 3 === 1 ? "🇪🇸" : "🇫🇷"}</span>
                      {lang.name}
                    </span>
                    <span className="px-3 py-1 rounded-full text-sm font-medium text-white bg-gradient-to-r from-green-500 to-teal-500">
                      {lang.level}
                    </span>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Certifications */}
          {certifications.length > 0 && (
            <section className="bg-white p-6 rounded-xl shadow-lg">
              <h3 className="text-2xl font-bold mb-6 flex items-center">
                <span className="mr-3">🏆</span>
                <span className="bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent">
                  Certifications
                </span>
              </h3>
              <div className="space-y-4">
                {certifications.map((cert, index) => (
                  <div key={cert.id} className="p-4 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg border-l-4 border-yellow-500 hover:shadow-md transition-shadow">
                    <div className="flex items-start space-x-3">
                      <span className="text-2xl">{index % 3 === 0 ? "🥇" : index % 3 === 1 ? "🥈" : "🥉"}</span>
                      <div>
                        <h4 className="font-bold text-gray-800">{cert.name}</h4>
                        <p className="text-gray-600 font-medium">{cert.issuer}</p>
                        {cert.date && (
                          <p className="text-gray-500 text-sm mt-1">📅 {cert.date}</p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
};
