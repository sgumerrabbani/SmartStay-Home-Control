import { Button } from "@/components/ui/button";
import { Home, DoorOpen, Moon, Plus } from "lucide-react";
import type { SceneType } from "@shared/schema";

interface ScenePillsProps {
  activeScene: SceneType;
  onSceneSelect: (scene: SceneType) => void;
  onCustomScene?: () => void;
}

const scenes: { id: SceneType; label: string; icon: typeof Home }[] = [
  { id: "home", label: "Home", icon: Home },
  { id: "away", label: "Away", icon: DoorOpen },
  { id: "night", label: "Night", icon: Moon },
];

export default function ScenePills({ activeScene, onSceneSelect, onCustomScene }: ScenePillsProps) {
  return (
    <div 
      className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide" 
      role="tablist" 
      aria-label="Scenes"
      data-testid="scene-pills"
    >
      {scenes.map((scene) => {
        const Icon = scene.icon;
        const isActive = activeScene === scene.id;
        return (
          <Button
            key={scene.id}
            role="tab"
            aria-selected={isActive}
            variant={isActive ? "default" : "secondary"}
            className={`rounded-full px-4 py-2 gap-2 flex-shrink-0 transition-all ${
              isActive 
                ? "bg-primary text-primary-foreground shadow-md" 
                : "bg-card border border-border hover:bg-muted"
            }`}
            onClick={() => onSceneSelect(scene.id)}
            data-testid={`button-scene-${scene.id}`}
          >
            <Icon className="w-4 h-4" />
            {scene.label}
          </Button>
        );
      })}
      {onCustomScene && (
        <Button
          variant="outline"
          className="rounded-full px-4 py-2 gap-2 flex-shrink-0 border-dashed"
          onClick={onCustomScene}
          data-testid="button-scene-custom"
        >
          <Plus className="w-4 h-4" />
          Custom
        </Button>
      )}
    </div>
  );
}
