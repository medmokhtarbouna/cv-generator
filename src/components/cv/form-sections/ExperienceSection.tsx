
import { useState } from "react";
import { Experience } from "@/types/cv";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Plus, Trash2, Briefcase } from "lucide-react";

interface ExperienceSectionProps {
  data: Experience[];
  onChange: (data: Experience[]) => void;
}

export const ExperienceSection = ({ data, onChange }: ExperienceSectionProps) => {
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());

  const addExperience = () => {
    const newExperience: Experience = {
      id: Date.now().toString(),
      jobTitle: "",
      company: "",
      location: "",
      startDate: "",
      endDate: "",
      current: false,
      description: ""
    };
    onChange([...data, newExperience]);
    setExpandedItems(prev => new Set([...prev, newExperience.id]));
  };

  const updateExperience = (id: string, field: keyof Experience, value: any) => {
    onChange(data.map(item => 
      item.id === id ? { ...item, [field]: value } : item
    ));
  };

  const removeExperience = (id: string) => {
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
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Work Experience</h3>
        <p className="text-sm text-gray-600">Add your professional experience</p>
      </div>

      <div className="space-y-4">
        {data.map((experience) => (
          <div key={experience.id} className="border border-gray-200 rounded-lg">
            <div 
              className="p-4 cursor-pointer hover:bg-gray-50 transition-colors"
              onClick={() => toggleExpanded(experience.id)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Briefcase className="h-5 w-5 text-gray-400" />
                  <div>
                    <h4 className="font-medium text-gray-900">
                      {experience.jobTitle || "New Position"}
                    </h4>
                    <p className="text-sm text-gray-600">
                      {experience.company || "Company Name"}
                    </p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    removeExperience(experience.id);
                  }}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {expandedItems.has(experience.id) && (
              <div className="border-t border-gray-200 p-4 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor={`jobTitle-${experience.id}`}>Job Title *</Label>
                    <Input
                      id={`jobTitle-${experience.id}`}
                      value={experience.jobTitle}
                      onChange={(e) => updateExperience(experience.id, "jobTitle", e.target.value)}
                      placeholder="Software Engineer"
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor={`company-${experience.id}`}>Company *</Label>
                    <Input
                      id={`company-${experience.id}`}
                      value={experience.company}
                      onChange={(e) => updateExperience(experience.id, "company", e.target.value)}
                      placeholder="Tech Corp"
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor={`location-${experience.id}`}>Location</Label>
                    <Input
                      id={`location-${experience.id}`}
                      value={experience.location}
                      onChange={(e) => updateExperience(experience.id, "location", e.target.value)}
                      placeholder="New York, NY"
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor={`startDate-${experience.id}`}>Start Date</Label>
                    <Input
                      id={`startDate-${experience.id}`}
                      type="month"
                      value={experience.startDate}
                      onChange={(e) => updateExperience(experience.id, "startDate", e.target.value)}
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor={`endDate-${experience.id}`}>End Date</Label>
                    <Input
                      id={`endDate-${experience.id}`}
                      type="month"
                      value={experience.endDate}
                      onChange={(e) => updateExperience(experience.id, "endDate", e.target.value)}
                      disabled={experience.current}
                      className="mt-1"
                    />
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id={`current-${experience.id}`}
                      checked={experience.current}
                      onCheckedChange={(checked) => {
                        updateExperience(experience.id, "current", checked);
                        if (checked) {
                          updateExperience(experience.id, "endDate", "");
                        }
                      }}
                    />
                    <Label htmlFor={`current-${experience.id}`}>Currently working here</Label>
                  </div>
                </div>

                <div>
                  <Label htmlFor={`description-${experience.id}`}>Job Description</Label>
                  <Textarea
                    id={`description-${experience.id}`}
                    value={experience.description}
                    onChange={(e) => updateExperience(experience.id, "description", e.target.value)}
                    placeholder="• Developed and maintained web applications using React and Node.js&#10;• Collaborated with cross-functional teams to deliver high-quality products&#10;• Improved application performance by 30% through code optimization"
                    className="mt-1 h-24"
                  />
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      <Button onClick={addExperience} className="w-full" variant="outline">
        <Plus className="h-4 w-4 mr-2" />
        Add Experience
      </Button>
    </div>
  );
};
