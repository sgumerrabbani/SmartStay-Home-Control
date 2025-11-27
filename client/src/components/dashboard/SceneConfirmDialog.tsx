import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import type { SceneType } from "@shared/schema";

interface SceneConfirmDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  scene: SceneType | null;
  actionCount: number;
  onConfirm: () => void;
}

const sceneDescriptions: Record<SceneType, string> = {
  home: "Turn on living room lights and set thermostat to comfortable temperature",
  away: "Turn off all non-essential devices and lower thermostat to save energy",
  night: "Turn off all lights except bedroom lamp for a cozy evening",
  custom: "Apply your custom settings",
};

export default function SceneConfirmDialog({
  open,
  onOpenChange,
  scene,
  actionCount,
  onConfirm,
}: SceneConfirmDialogProps) {
  if (!scene) return null;

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent data-testid="dialog-scene-confirm">
        <AlertDialogHeader>
          <AlertDialogTitle className="capitalize">
            Apply "{scene}" Scene?
          </AlertDialogTitle>
          <AlertDialogDescription>
            {sceneDescriptions[scene]}
            <br />
            <span className="text-foreground font-medium mt-2 block">
              This will change {actionCount} device(s).
            </span>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel data-testid="button-scene-cancel">Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={onConfirm} data-testid="button-scene-apply">
            Apply Scene
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
