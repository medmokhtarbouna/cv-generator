
import { useState } from "react";
import { Language } from "@/types/cv";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Trash2, Globe } from "lucide-react";

interface LanguagesSectionProps {
  data: Language[];
  onChange: (data: Language[]) => void;
}

export const LanguagesSection = ({ data, onChange }: LanguagesSectionProps) => {
  const [newLanguage, setNewLanguage] = useState({ name: "", level: "Intermediate" });

  const languageLevels = [
    "Native",
    "Fluent",
    "Advanced",
    "Intermediate",
    "Basic"
  ];

  const addLanguage = () => {
    if (!newLanguage.name.trim()) return;
    
    const language: Language = {
      id: Date.now().toString(),
      name: newLanguage.name.trim(),
      level: newLanguage.level
    };
    
    onChange([...data, language]);
    setNewLanguage({ name: "", level: "Intermediate" });
  };

  const removeLanguage = (id: string) => {
    onChange(data.filter(language => language.id !== id));
  };

  const updateLanguage = (id: string, field: keyof Language, value: any) => {
    onChange(data.map(language => 
      language.id === id ? { ...language, [field]: value } : language
    ));
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case "Native": return "bg-green-100 text-green-800";
      case "Fluent": return "bg-blue-100 text-blue-800";
      case "Advanced": return "bg-purple-100 text-purple-800";
      case "Intermediate": return "bg-yellow-100 text-yellow-800";
      case "Basic": return "bg-gray-100 text-gray-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Languages</h3>
        <p className="text-sm text-gray-600">Add languages you can speak</p>
      </div>

      {/* Add New Language */}
      <div className="bg-gray-50 p-4 rounded-lg space-y-4">
        <h4 className="font-medium text-gray-900">Add New Language</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div>
            <Label htmlFor="languageName">Language</Label>
            <Input
              id="languageName"
              value={newLanguage.name}
              onChange={(e) => setNewLanguage(prev => ({ ...prev, name: e.target.value }))}
              placeholder="English"
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="languageLevel">Proficiency Level</Label>
            <Select value={newLanguage.level} onValueChange={(value) => setNewLanguage(prev => ({ ...prev, level: value }))}>
              <SelectTrigger className="mt-1">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {languageLevels.map(level => (
                  <SelectItem key={level} value={level}>{level}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <Button onClick={addLanguage} className="w-full">
          <Plus className="h-4 w-4 mr-2" />
          Add Language
        </Button>
      </div>

      {/* Languages List */}
      <div className="space-y-3">
        {data.map((language) => (
          <div key={language.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
            <div className="flex items-center space-x-3">
              <Globe className="h-5 w-5 text-gray-400" />
              <div className="flex-1">
                <div className="flex items-center space-x-3">
                  <Input
                    value={language.name}
                    onChange={(e) => updateLanguage(language.id, "name", e.target.value)}
                    className="font-medium border-none p-0 h-auto focus:ring-0"
                    placeholder="Language name"
                  />
                  <Select value={language.level} onValueChange={(value) => updateLanguage(language.id, "level", value)}>
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {languageLevels.map(level => (
                        <SelectItem key={level} value={level}>{level}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getLevelColor(language.level)}`}>
                    {language.level}
                  </span>
                </div>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => removeLanguage(language.id)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        ))}
      </div>

      {data.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          <p>No languages added yet. Add your first language above!</p>
        </div>
      )}
    </div>
  );
};
