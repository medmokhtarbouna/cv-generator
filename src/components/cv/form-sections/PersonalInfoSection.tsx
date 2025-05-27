
import { PersonalInfo } from "@/types/cv";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Upload, User } from "lucide-react";

interface PersonalInfoSectionProps {
  data: PersonalInfo;
  onChange: (data: PersonalInfo) => void;
}

export const PersonalInfoSection = ({ data, onChange }: PersonalInfoSectionProps) => {
  const updateField = (field: keyof PersonalInfo, value: string) => {
    onChange({ ...data, [field]: value });
  };

  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        updateField("photo", e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Personal Information</h3>
        <p className="text-sm text-gray-600">Add your basic details and contact information</p>
      </div>

      {/* Photo Upload */}
      <div className="flex flex-col items-center space-y-3">
        <div className="w-24 h-24 rounded-full bg-gray-100 border-2 border-dashed border-gray-300 flex items-center justify-center overflow-hidden">
          {data.photo ? (
            <img src={data.photo} alt="Profile" className="w-full h-full object-cover rounded-full" />
          ) : (
            <User className="h-8 w-8 text-gray-400" />
          )}
        </div>
        <label className="cursor-pointer">
          <input
            type="file"
            accept="image/*"
            onChange={handlePhotoUpload}
            className="hidden"
          />
          <div className="flex items-center space-x-2 px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors">
            <Upload className="h-4 w-4" />
            <span className="text-sm">Upload Photo</span>
          </div>
        </label>
      </div>

      {/* Form Fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="fullName">Full Name *</Label>
          <Input
            id="fullName"
            value={data.fullName}
            onChange={(e) => updateField("fullName", e.target.value)}
            placeholder="John Doe"
            className="mt-1"
          />
        </div>

        <div>
          <Label htmlFor="jobTitle">Job Title *</Label>
          <Input
            id="jobTitle"
            value={data.jobTitle}
            onChange={(e) => updateField("jobTitle", e.target.value)}
            placeholder="Software Engineer"
            className="mt-1"
          />
        </div>

        <div>
          <Label htmlFor="email">Email *</Label>
          <Input
            id="email"
            type="email"
            value={data.email}
            onChange={(e) => updateField("email", e.target.value)}
            placeholder="john@example.com"
            className="mt-1"
          />
        </div>

        <div>
          <Label htmlFor="phone">Phone</Label>
          <Input
            id="phone"
            value={data.phone}
            onChange={(e) => updateField("phone", e.target.value)}
            placeholder="+1 (555) 123-4567"
            className="mt-1"
          />
        </div>

        <div>
          <Label htmlFor="location">Location</Label>
          <Input
            id="location"
            value={data.location}
            onChange={(e) => updateField("location", e.target.value)}
            placeholder="New York, NY"
            className="mt-1"
          />
        </div>

        <div>
          <Label htmlFor="website">Website</Label>
          <Input
            id="website"
            value={data.website}
            onChange={(e) => updateField("website", e.target.value)}
            placeholder="www.johndoe.com"
            className="mt-1"
          />
        </div>
      </div>

      <div>
        <Label htmlFor="summary">Professional Summary</Label>
        <Textarea
          id="summary"
          value={data.summary}
          onChange={(e) => updateField("summary", e.target.value)}
          placeholder="A brief summary of your professional background and key achievements..."
          className="mt-1 h-24"
        />
      </div>
    </div>
  );
};
