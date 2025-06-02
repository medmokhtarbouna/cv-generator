
import { CustomizationOptions } from "@/types/cv";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";

interface CustomizationPanelProps {
  customization: CustomizationOptions;
  updateCustomization: (key: keyof CustomizationOptions, value: any) => void;
}

export const CustomizationPanel = ({ customization, updateCustomization }: CustomizationPanelProps) => {
 

  return (
    <div className="p-6 space-y-6">
      <div className="text-center">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Customize Style</h3>
        <p className="text-sm text-gray-600">Personalize your CV appearance</p>
      </div>

      {/* Font Selection */}
      <div>
        <Label htmlFor="fontFamily" className="text-base font-medium mb-3 block">
          🔤 Font Family
        </Label>
        <Select value={customization.fontFamily} onValueChange={(value) => updateCustomization("fontFamily", value)}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {fonts.map(font => (
              <SelectItem key={font.value} value={font.value}>
                <span style={{ fontFamily: font.value }}>{font.name}</span>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Primary Color */}
      <div>
        <Label className="text-base font-medium mb-3 block">
          🎨 Primary Color
        </Label>
        <div className="grid grid-cols-4 gap-3">
          {colors.map(color => (
            <button
              key={color.value}
              className={`w-full h-12 rounded-lg border-2 transition-all hover:scale-105 ${
                customization.primaryColor === color.value
                  ? "border-gray-800 scale-105"
                  : "border-gray-200"
              }`}
              style={{ backgroundColor: color.value }}
              onClick={() => updateCustomization("primaryColor", color.value)}
              title={color.name}
            >
              {customization.primaryColor === color.value && (
                <span className="text-white font-bold">✓</span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Accent Color */}
      <div>
        <Label className="text-base font-medium mb-3 block">
          ✨ Accent Color
        </Label>
        <div className="grid grid-cols-4 gap-3">
          {colors.map(color => (
            <button
              key={color.value}
              className={`w-full h-12 rounded-lg border-2 transition-all hover:scale-105 ${
                customization.accentColor === color.value
                  ? "border-gray-800 scale-105"
                  : "border-gray-200"
              }`}
              style={{ backgroundColor: color.value }}
              onClick={() => updateCustomization("accentColor", color.value)}
              title={color.name}
            >
              {customization.accentColor === color.value && (
                <span className="text-white font-bold">✓</span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Layout */}
      <div>
        <Label htmlFor="layout" className="text-base font-medium mb-3 block">
          📐 Layout Style
        </Label>
        <Select value={customization.layout} onValueChange={(value) => updateCustomization("layout", value)}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {layouts.map(layout => (
              <SelectItem key={layout.value} value={layout.value}>
                {layout.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Color Presets */}
      <div className="bg-gray-50 p-4 rounded-lg">
        <h4 className="font-medium text-gray-800 mb-3">🎯 Quick Presets</h4>
        <div className="grid grid-cols-2 gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              updateCustomization("primaryColor", "#3B82F6");
              updateCustomization("accentColor", "#EF4444");
            }}
            className="h-8"
          >
            Professional
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              updateCustomization("primaryColor", "#8B5CF6");
              updateCustomization("accentColor", "#EC4899");
            }}
            className="h-8"
          >
            Creative
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              updateCustomization("primaryColor", "#10B981");
              updateCustomization("accentColor", "#F59E0B");
            }}
            className="h-8"
          >
            Modern
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              updateCustomization("primaryColor", "#6366F1");
              updateCustomization("accentColor", "#14B8A6");
            }}
            className="h-8"
          >
            Tech
          </Button>
        </div>
      </div>

      {/* Preview Note */}
      <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
        <p className="text-sm text-blue-800">
          💡 <strong>Tip:</strong> Changes are applied instantly to the preview on the right. 
          Experiment with different combinations to find your perfect style!
        </p>
      </div>
    </div>
  );
};
