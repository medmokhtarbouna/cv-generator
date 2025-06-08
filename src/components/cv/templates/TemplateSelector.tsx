
import { Template } from "@/types/cv";
import { Button } from "@/components/ui/button";

interface TemplateSelectorProps {
  selectedTemplate: Template;
  onTemplateChange: (template: Template) => void;
}

export const TemplateSelector = ({ selectedTemplate, onTemplateChange }: TemplateSelectorProps) => {
  const templates = [
    {
      id: "classic" as Template,
      name: "Classic",
      description: "Traditional professional layout",
      preview: "🏛️",
      color: "from-blue-500 to-blue-600"
    },
    {
      id: "modern" as Template,
      name: "Modern",
      description: "Clean contemporary design",
      preview: "✨",
      color: "from-purple-500 to-purple-600"
    },
    {
      id: "creative" as Template,
      name: "Creative",
      description: "Bold and colorful design",
      preview: "🎨",
      color: "from-pink-500 to-purple-600"
    },
    {
      id: "rtl" as Template,
      name: "RTL",
      description: "Right-to-left layout support",
      preview: "🌍",
      color: "from-green-500 to-green-600"
    }
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="text-center">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Choose Template</h3>
        <p className="text-sm text-gray-600">Select a design that matches your style</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {templates.map((template) => (
          <div
            key={template.id}
            className={`relative cursor-pointer rounded-lg border-2 transition-all hover:shadow-lg ${
              selectedTemplate === template.id
                ? "border-blue-500 shadow-lg scale-105"
                : "border-gray-200 hover:border-gray-300"
            }`}
            onClick={() => onTemplateChange(template.id)}
          >
            <div className={`bg-gradient-to-br ${template.color} text-white p-6 rounded-t-lg`}>
              <div className="text-center">
                <div className="text-4xl mb-2">{template.preview}</div>
                <h4 className="font-bold text-lg">{template.name}</h4>
              </div>
            </div>
            
            <div className="p-4 bg-white rounded-b-lg">
              <p className="text-sm text-gray-600 text-center">{template.description}</p>
              
              {selectedTemplate === template.id && (
                <div className="mt-3 flex justify-center">
                  <span className="bg-blue-100 text-blue-800 text-xs font-medium px-3 py-1 rounded-full">
                    ✓ Selected
                  </span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="bg-gray-50 p-4 rounded-lg">
        <h4 className="font-medium text-gray-800 mb-2">💡 Template Tips</h4>
        
      </div>
    </div>
  );
};
