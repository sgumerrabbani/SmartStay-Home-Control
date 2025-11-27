import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { Lightbulb, Thermometer, Power, Coffee } from "lucide-react";
import type { DeviceType } from "@shared/schema";

interface DeviceTileProps {
  name: string;
  type: DeviceType;
  on?: boolean;
  temp?: number;
  onToggle?: () => void;
  onTempChange?: (temp: number) => void;
}

const deviceIcons: Record<DeviceType, typeof Lightbulb> = {
  light: Lightbulb,
  thermostat: Thermometer,
  appliance: Coffee,
};

export default function DeviceTile({ 
  name, 
  type, 
  on, 
  temp, 
  onToggle, 
  onTempChange 
}: DeviceTileProps) {
  const Icon = deviceIcons[type] || Power;
  const isOn = type === 'thermostat' ? true : on;

  return (
    <Card
      className={`p-4 transition-all duration-200 hover-elevate ${
        isOn ? 'bg-gradient-to-b from-card to-primary/5 border-primary/20' : 'bg-card'
      }`}
      role="listitem"
      data-testid={`device-tile-${name.toLowerCase().replace(/\s+/g, '-')}`}
    >
      <div className="flex items-start justify-between mb-3 gap-2">
        <div className="flex items-center gap-3 min-w-0">
          <div className={`p-2 rounded-lg ${isOn ? 'bg-primary/10' : 'bg-muted'}`}>
            <Icon className={`w-5 h-5 ${isOn ? 'text-primary' : 'text-muted-foreground'}`} />
          </div>
          <div className="min-w-0">
            <h4 className="font-semibold text-foreground text-sm truncate" data-testid={`text-device-name-${name.toLowerCase().replace(/\s+/g, '-')}`}>
              {name}
            </h4>
            <p className="text-xs text-muted-foreground capitalize">{type}</p>
          </div>
        </div>
        <Badge 
          variant={isOn ? "default" : "secondary"} 
          className={`text-xs flex-shrink-0 ${isOn ? 'bg-primary/20 text-primary border-primary/30' : ''}`}
          data-testid={`badge-device-status-${name.toLowerCase().replace(/\s+/g, '-')}`}
        >
          {type === 'thermostat' ? `${temp}°C` : (on ? 'On' : 'Off')}
        </Badge>
      </div>

      {(type === 'light' || type === 'appliance') && (
        <Button
          variant={on ? "default" : "outline"}
          size="sm"
          className="w-full"
          onClick={onToggle}
          data-testid={`button-toggle-${name.toLowerCase().replace(/\s+/g, '-')}`}
        >
          {on ? 'Turn Off' : 'Turn On'}
        </Button>
      )}

      {type === 'thermostat' && (
        <div className="space-y-3">
          <Slider
            value={[temp || 21]}
            min={16}
            max={30}
            step={0.5}
            onValueChange={(value) => onTempChange?.(value[0])}
            className="w-full"
            data-testid={`slider-thermostat-${name.toLowerCase().replace(/\s+/g, '-')}`}
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>16°C</span>
            <span className="font-medium text-foreground">{temp}°C</span>
            <span>30°C</span>
          </div>
        </div>
      )}
    </Card>
  );
}
