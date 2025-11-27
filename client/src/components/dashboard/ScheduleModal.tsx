import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Trash2, Clock, Calendar } from "lucide-react";
import { useState } from "react";
import type { Schedule, ScheduleRepeat, HomeState } from "@shared/schema";

interface ScheduleModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  state: HomeState;
  onSave: (devicePath: string, time: string, repeat: ScheduleRepeat) => void;
  onDelete: (scheduleId: string) => void;
}

export default function ScheduleModal({ 
  open, 
  onOpenChange, 
  state, 
  onSave, 
  onDelete 
}: ScheduleModalProps) {
  const [selectedDevice, setSelectedDevice] = useState<string>("");
  const [time, setTime] = useState("07:00");
  const [repeat, setRepeat] = useState<ScheduleRepeat>("daily");

  const devices: { path: string; label: string }[] = [];
  Object.keys(state.rooms).forEach(room => {
    Object.keys(state.rooms[room].devices).forEach(device => {
      devices.push({
        path: `${room}||${device}`,
        label: `${room} — ${device}`
      });
    });
  });

  const handleSave = () => {
    if (!selectedDevice || !time) return;
    onSave(selectedDevice, time, repeat);
    setSelectedDevice("");
    setTime("07:00");
    setRepeat("daily");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]" data-testid="modal-schedule">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-primary" />
            Schedule Manager
          </DialogTitle>
          <DialogDescription>
            Create and manage device schedules
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="device" className="text-sm font-medium">Device</Label>
            <Select value={selectedDevice} onValueChange={setSelectedDevice}>
              <SelectTrigger id="device" data-testid="select-schedule-device">
                <SelectValue placeholder="Select a device" />
              </SelectTrigger>
              <SelectContent>
                {devices.map((device) => (
                  <SelectItem key={device.path} value={device.path}>
                    {device.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="time" className="text-sm font-medium flex items-center gap-1">
                <Clock className="w-4 h-4" />
                Time
              </Label>
              <Input
                id="time"
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                data-testid="input-schedule-time"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="repeat" className="text-sm font-medium">Repeat</Label>
              <Select value={repeat} onValueChange={(v) => setRepeat(v as ScheduleRepeat)}>
                <SelectTrigger id="repeat" data-testid="select-schedule-repeat">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="daily">Daily</SelectItem>
                  <SelectItem value="weekdays">Weekdays</SelectItem>
                  <SelectItem value="once">Once</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Button onClick={handleSave} className="w-full" data-testid="button-save-schedule">
            Save Schedule
          </Button>

          <div className="border-t pt-4">
            <h4 className="text-sm font-medium mb-3">Existing Schedules</h4>
            <div className="space-y-2 max-h-48 overflow-y-auto" data-testid="schedule-list">
              {state.schedules.length === 0 ? (
                <p className="text-sm text-muted-foreground text-center py-4">
                  No schedules yet
                </p>
              ) : (
                state.schedules.map((schedule) => (
                  <div 
                    key={schedule.id} 
                    className="flex items-center justify-between p-3 bg-muted/50 rounded-lg"
                    data-testid={`schedule-item-${schedule.id}`}
                  >
                    <div className="min-w-0">
                      <p className="text-sm font-medium truncate">
                        {schedule.devicePath.replace('||', ' — ')}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {schedule.time} • {schedule.repeat}
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onDelete(schedule.id)}
                      className="flex-shrink-0 text-destructive hover:text-destructive hover:bg-destructive/10"
                      data-testid={`button-delete-schedule-${schedule.id}`}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
