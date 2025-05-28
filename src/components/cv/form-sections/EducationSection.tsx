
import { useState } from "react";
import { Education } from "@/types/cv";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Trash2, GraduationCap } from "lucide-react";

interface EducationSectionProps {
  data: Education[];
  onChange: (data: Education[]) => void;
}

export const EducationSection = ({ data, onChange }: EducationSectionProps) => {
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());

  const addEducation = () => {
    const newEducation: Education = {
      id: Date.now().toString(),
      degree: "",
      institution: "",
      location: "",
      startDate: "",
      endDate: "",
      gpa: "",
      description: ""
    };
    onChange([...data, newEducation]);
    setExpandedItems(prev => new Set([...prev, newEducation.id]));
  };

  const updateEducation = (id: string, field: keyof Education, value: any) => {
    onChange(data.map(item => 
      item.id === id ? { ...item, [field]: value } : item
    ));
  };

  const removeEducation = (id: string) => {
    onChange(data.filter(item => item.id !== id));
    setExpandedItems(prev => {
      const newSet = new Set(prev);
      newSet.delete(id);
      return newSet;
    });
  };

  const toggleExpanded = (id: string) => {
    setExpandedItems(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Education</h3>
        <p className="text-sm text-gray-600">Add your educational background</p>
      </div>

      <div className="space-y-4">
        {data.map((education) => (
          <div key={education.id} className="border border-gray-200 rounded-lg">
            <div 
              className="p-4 cursor-pointer hover:bg-gray-50 transition-colors"
              onClick={() => toggleExpanded(education.id)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <GraduationCap className="h-5 w-5 text-gray-400" />
                  <div>
                    <h4 className="font-medium text-gray-900">
                      {education.degree || "New Degree"}
                    </h4>
                    <p className="text-sm text-gray-600">
                      {education.institution || "Institution Name"}
                    </p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    removeEducation(education.id);
                  }}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {expandedItems.has(education.id) && (
              <div className="border-t border-gray-200 p-4 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor={`degree-${education.id}`}>Degree *</Label>
                    <Input
                      id={`degree-${education.id}`}
                      value={education.degree}
                      onChange={(e) => updateEducation(education.id, "degree", e.target.value)}
                      placeholder="Bachelor of Science in Computer Science"
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor={`institution-${education.id}`}>Institution *</Label>
                    <Input
                      id={`institution-${education.id}`}
                      value={education.institution}
                      onChange={(e) => updateEducation(education.id, "institution", e.target.value)}
                      placeholder="University of Technology"
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor={`location-${education.id}`}>Location</Label>
                    <Input
                      id={`location-${education.id}`}
                      value={education.location}
                      onChange={(e) => updateEducation(education.id, "location", e.target.value)}
                      placeholder="Boston, MA"
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor={`gpa-${education.id}`}>GPA</Label>
                    <Input
                      id={`gpa-${education.id}`}
                      value={education.gpa}
                      onChange={(e) => updateEducation(education.id, "gpa", e.target.value)}
                      placeholder="3.8/4.0"
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor={`startDate-${education.id}`}>Start Date</Label>
                    <Input
                      id={`startDate-${education.id}`}
                      type="month"
                      value={education.startDate}
                      onChange={(e) => updateEducation(education.id, "startDate", e.target.value)}
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor={`endDate-${education.id}`}>End Date</Label>
                    <Input
                      id={`endDate-${education.id}`}
                      type="month"
                      value={education.endDate}
                      onChange={(e) => updateEducation(education.id, "endDate", e.target.value)}
                      className="mt-1"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor={`description-${education.id}`}>Description</Label>
                  <Textarea
                    id={`description-${education.id}`}
                    value={education.description || ""}
                    onChange={(e) => updateEducation(education.id, "description", e.target.value)}
                    placeholder="Relevant coursework, achievements, activities..."
                    className="mt-1 h-20"
                  />
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      <Button onClick={addEducation} className="w-full" variant="outline">
        <Plus className="h-4 w-4 mr-2" />
        Add Education
      </Button>
    </div>
  );
};
