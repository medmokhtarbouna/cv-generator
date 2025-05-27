
import { useState } from "react";
import { Certification } from "@/types/cv";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, Trash2, Award, ExternalLink } from "lucide-react";

interface CertificationsSectionProps {
  data: Certification[];
  onChange: (data: Certification[]) => void;
}

export const CertificationsSection = ({ data, onChange }: CertificationsSectionProps) => {
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());

  const addCertification = () => {
    const newCertification: Certification = {
      id: Date.now().toString(),
      name: "",
      issuer: "",
      date: "",
      url: ""
    };
    onChange([...data, newCertification]);
    setExpandedItems(prev => new Set([...prev, newCertification.id]));
  };

  const updateCertification = (id: string, field: keyof Certification, value: any) => {
    onChange(data.map(item => 
      item.id === id ? { ...item, [field]: value } : item
    ));
  };

  const removeCertification = (id: string) => {
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
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Certifications</h3>
        <p className="text-sm text-gray-600">Add your professional certifications</p>
      </div>

      <div className="space-y-4">
        {data.map((certification) => (
          <div key={certification.id} className="border border-gray-200 rounded-lg">
            <div 
              className="p-4 cursor-pointer hover:bg-gray-50 transition-colors"
              onClick={() => toggleExpanded(certification.id)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Award className="h-5 w-5 text-gray-400" />
                  <div>
                    <h4 className="font-medium text-gray-900">
                      {certification.name || "New Certification"}
                    </h4>
                    <p className="text-sm text-gray-600">
                      {certification.issuer || "Issuing Organization"}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  {certification.url && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        window.open(certification.url, '_blank');
                      }}
                    >
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                  )}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      removeCertification(certification.id);
                    }}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            {expandedItems.has(certification.id) && (
              <div className="border-t border-gray-200 p-4 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor={`name-${certification.id}`}>Certification Name *</Label>
                    <Input
                      id={`name-${certification.id}`}
                      value={certification.name}
                      onChange={(e) => updateCertification(certification.id, "name", e.target.value)}
                      placeholder="AWS Certified Solutions Architect"
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor={`issuer-${certification.id}`}>Issuing Organization *</Label>
                    <Input
                      id={`issuer-${certification.id}`}
                      value={certification.issuer}
                      onChange={(e) => updateCertification(certification.id, "issuer", e.target.value)}
                      placeholder="Amazon Web Services"
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor={`date-${certification.id}`}>Issue Date</Label>
                    <Input
                      id={`date-${certification.id}`}
                      type="month"
                      value={certification.date}
                      onChange={(e) => updateCertification(certification.id, "date", e.target.value)}
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor={`url-${certification.id}`}>Credential URL</Label>
                    <Input
                      id={`url-${certification.id}`}
                      value={certification.url || ""}
                      onChange={(e) => updateCertification(certification.id, "url", e.target.value)}
                      placeholder="https://credentials.example.com"
                      className="mt-1"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      <Button onClick={addCertification} className="w-full" variant="outline">
        <Plus className="h-4 w-4 mr-2" />
        Add Certification
      </Button>
    </div>
  );
};
