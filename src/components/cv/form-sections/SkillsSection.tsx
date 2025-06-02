
import { useState } from "react";
import { Skill } from "@/types/cv";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Trash2, Star } from "lucide-react";

interface SkillsSectionProps {
  data: Skill[];
  onChange: (data: Skill[]) => void;
}

export const SkillsSection = ({ data, onChange }: SkillsSectionProps) => {
  const [newSkill, setNewSkill] = useState({ name: "", category: "Technical", level: 3 });

  const addSkill = () => {
    if (!newSkill.name.trim()) return;
    
    const skill: Skill = {
      id: Date.now().toString(),
      name: newSkill.name.trim(),
      category: newSkill.category,
      level: newSkill.level
    };
    
    onChange([...data, skill]);
    setNewSkill({ name: "", category: "Technical", level: 3 });
  };

  const removeSkill = (id: string) => {
    onChange(data.filter(skill => skill.id !== id));
  };

  const updateSkill = (id: string, field: keyof Skill, value: any) => {
    onChange(data.map(skill => 
      skill.id === id ? { ...skill, [field]: value } : skill
    ));
  };



  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Skills</h3>
        <p className="text-sm text-gray-600">Add your technical and soft skills</p>
      </div>

      {/* Add New Skill */}
      <div className="bg-gray-50 p-4 rounded-lg space-y-4">
        <h4 className="font-medium text-gray-900">Add New Skill</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div>
            <Label htmlFor="skillName">Skill Name</Label>
            <Input
              id="skillName"
              value={newSkill.name}
              onChange={(e) => setNewSkill(prev => ({ ...prev, name: e.target.value }))}
              placeholder="JavaScript"
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="skillCategory">Category</Label>
            <Select value={newSkill.category} onValueChange={(value) => setNewSkill(prev => ({ ...prev, category: value }))}>
              <SelectTrigger className="mt-1">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Technical">Technical</SelectItem>
                <SelectItem value="Language">Language</SelectItem>
                <SelectItem value="Soft Skills">Soft Skills</SelectItem>
                <SelectItem value="Tools">Tools</SelectItem>
                <SelectItem value="Design">Design</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="skillLevel">Level</Label>
            <div className="flex items-center space-x-1 mt-2">
              {Array.from({ length: 5 }, (_, i) => (
                <Star
                  key={i}
                  className={`h-5 w-5 cursor-pointer ${
                    i < newSkill.level ? "text-yellow-400 fill-current" : "text-gray-300"
                  }`}
                  onClick={() => setNewSkill(prev => ({ ...prev, level: i + 1 }))}
                />
              ))}
            </div>
          </div>
        </div>
        <Button onClick={addSkill} className="w-full">
          <Plus className="h-4 w-4 mr-2" />
          Add Skill
        </Button>
      </div>

      {/* Skills List */}
      <div className="space-y-4">
        {Object.entries(groupedSkills).map(([category, skills]) => (
          <div key={category} className="border border-gray-200 rounded-lg p-4">
            <h4 className="font-medium text-gray-900 mb-3">{category}</h4>
            <div className="space-y-3">
              {skills.map((skill) => (
                <div key={skill.id} className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3">
                      <span className="font-medium">{skill.name}</span>
                      <div className="flex items-center space-x-1">
                        {renderStars(skill.level, skill.id)}
                      </div>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeSkill(skill.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {data.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          <p>No skills added yet. Add your first skill above!</p>
        </div>
      )}
    </div>
  );
};
