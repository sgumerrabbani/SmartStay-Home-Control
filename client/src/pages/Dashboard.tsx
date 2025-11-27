import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import ScenePills from "@/components/dashboard/ScenePills";
import RoomPills from "@/components/dashboard/RoomPills";
import DeviceTile from "@/components/dashboard/DeviceTile";
import ScheduleModal from "@/components/dashboard/ScheduleModal";
import SceneConfirmDialog from "@/components/dashboard/SceneConfirmDialog";
import { Power, Calendar, CheckCircle2, AlertCircle, RefreshCw } from "lucide-react";
import type { SceneType, ScheduleRepeat } from "@shared/schema";
import {
  useHomeState,
  useApplyScene,
  useToggleDevice,
  useSetTemperature,
  useCreateSchedule,
  useDeleteSchedule,
  useTurnAllOff,
  useSelectRoom,
} from "@/hooks/useHomeState";
import { getSceneActions } from "@/lib/smartHomeState";

export default function Dashboard() {
  const [scheduleModalOpen, setScheduleModalOpen] = useState(false);
  const [sceneConfirmOpen, setSceneConfirmOpen] = useState(false);
  const [pendingScene, setPendingScene] = useState<SceneType | null>(null);
  const { toast } = useToast();

  const { data: state, isLoading, isError, refetch } = useHomeState();
  const applySceneMutation = useApplyScene();
  const toggleDeviceMutation = useToggleDevice();
  const setTemperatureMutation = useSetTemperature();
  const createScheduleMutation = useCreateSchedule();
  const deleteScheduleMutation = useDeleteSchedule();
  const turnAllOffMutation = useTurnAllOff();
  const selectRoomMutation = useSelectRoom();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background" data-testid="page-dashboard-loading">
        <DashboardHeader />
        <main className="max-w-[980px] mx-auto px-4 py-6 space-y-6">
          <div className="space-y-4">
            <Skeleton className="h-8 w-48" />
            <div className="flex gap-2">
              <Skeleton className="h-10 w-24 rounded-full" />
              <Skeleton className="h-10 w-24 rounded-full" />
              <Skeleton className="h-10 w-24 rounded-full" />
            </div>
          </div>
          <Card className="p-6 space-y-4">
            <Skeleton className="h-6 w-32" />
            <div className="flex gap-2">
              <Skeleton className="h-10 w-28 rounded-full" />
              <Skeleton className="h-10 w-24 rounded-full" />
              <Skeleton className="h-10 w-28 rounded-full" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
              <Skeleton className="h-32 rounded-lg" />
              <Skeleton className="h-32 rounded-lg" />
              <Skeleton className="h-32 rounded-lg" />
            </div>
          </Card>
        </main>
      </div>
    );
  }

  if (isError || !state) {
    return (
      <div className="min-h-screen bg-background" data-testid="page-dashboard-error">
        <DashboardHeader />
        <main className="max-w-[980px] mx-auto px-4 py-6">
          <Card className="p-8 text-center space-y-4">
            <AlertCircle className="w-12 h-12 mx-auto text-destructive" />
            <h2 className="text-xl font-semibold text-foreground">Unable to Load Dashboard</h2>
            <p className="text-muted-foreground">
              There was a problem loading your home state. Please try again.
            </p>
            <Button onClick={() => refetch()} className="gap-2">
              <RefreshCw className="w-4 h-4" />
              Retry
            </Button>
          </Card>
        </main>
      </div>
    );
  }

  const rooms = Object.keys(state.rooms);
  const currentRoom = state.rooms[state.activeRoom];
  const devices = currentRoom ? Object.entries(currentRoom.devices) : [];

  const handleSceneSelect = (scene: SceneType) => {
    setPendingScene(scene);
    setSceneConfirmOpen(true);
  };

  const handleSceneConfirm = () => {
    if (!pendingScene) return;
    
    applySceneMutation.mutate(pendingScene, {
      onSuccess: () => {
        toast({
          title: `Scene "${pendingScene}" applied`,
          description: "All devices have been adjusted",
        });
        setSceneConfirmOpen(false);
        setPendingScene(null);
      },
      onError: () => {
        toast({
          title: "Failed to apply scene",
          description: "Please try again",
          variant: "destructive",
        });
      },
    });
  };

  const handleRoomSelect = (room: string) => {
    selectRoomMutation.mutate(room);
  };

  const handleDeviceToggle = (deviceName: string) => {
    toggleDeviceMutation.mutate(
      { room: state.activeRoom, device: deviceName },
      {
        onSuccess: (newState) => {
          const device = newState.rooms[state.activeRoom].devices[deviceName];
          toast({
            title: `${deviceName} ${device.on ? 'turned on' : 'turned off'}`,
          });
        },
        onError: () => {
          toast({
            title: "Failed to toggle device",
            description: "Please try again",
            variant: "destructive",
          });
        },
      }
    );
  };

  const handleTempChange = (deviceName: string, temp: number) => {
    setTemperatureMutation.mutate({
      room: state.activeRoom,
      device: deviceName,
      temp,
    });
  };

  const handleAllOff = () => {
    turnAllOffMutation.mutate(undefined, {
      onSuccess: () => {
        toast({
          title: "All devices turned off",
          description: "All non-essential devices have been switched off",
        });
      },
      onError: () => {
        toast({
          title: "Failed to turn off devices",
          description: "Please try again",
          variant: "destructive",
        });
      },
    });
  };

  const handleSaveSchedule = (devicePath: string, time: string, repeat: ScheduleRepeat) => {
    createScheduleMutation.mutate(
      { devicePath, time, repeat },
      {
        onSuccess: () => {
          toast({
            title: "Schedule saved",
            description: `Device will activate at ${time}`,
          });
        },
        onError: () => {
          toast({
            title: "Failed to save schedule",
            description: "Please try again",
            variant: "destructive",
          });
        },
      }
    );
  };

  const handleDeleteSchedule = (scheduleId: string) => {
    deleteScheduleMutation.mutate(scheduleId, {
      onSuccess: () => {
        toast({
          title: "Schedule deleted",
        });
      },
      onError: () => {
        toast({
          title: "Failed to delete schedule",
          description: "Please try again",
          variant: "destructive",
        });
      },
    });
  };

  const getOnlineDeviceCount = () => {
    let count = 0;
    Object.values(state.rooms).forEach(room => {
      Object.values(room.devices).forEach(device => {
        if (device.type === 'thermostat' || device.on) count++;
      });
    });
    return count;
  };

  const totalDevices = Object.values(state.rooms).reduce(
    (acc, room) => acc + Object.keys(room.devices).length, 0
  );

  const isAnyMutationPending = 
    applySceneMutation.isPending ||
    toggleDeviceMutation.isPending ||
    turnAllOffMutation.isPending;

  return (
    <div className="min-h-screen bg-background" data-testid="page-dashboard">
      <DashboardHeader />
      
      <main className="max-w-[980px] mx-auto px-4 py-6 space-y-6">
        <section aria-labelledby="status">
          <div className="flex items-center gap-2 mb-4">
            <h2 id="status" className="text-xl font-semibold text-foreground" data-testid="text-dashboard-title">
              Home
            </h2>
            <span className="text-sm text-muted-foreground flex items-center gap-1">
              <CheckCircle2 className="w-4 h-4 text-green-500" />
              {getOnlineDeviceCount()}/{totalDevices} devices active
            </span>
            {isAnyMutationPending && (
              <RefreshCw className="w-4 h-4 animate-spin text-primary" />
            )}
          </div>
          
          <ScenePills
            activeScene={state.activeScene}
            onSceneSelect={handleSceneSelect}
          />
        </section>

        <Card className="p-4 md:p-6" data-testid="card-room-panel">
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-3">Rooms</h3>
              <RoomPills
                rooms={rooms}
                activeRoom={state.activeRoom}
                onRoomSelect={handleRoomSelect}
              />
            </div>

            <div className="pt-4 border-t border-border">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-foreground" data-testid="text-room-name">
                    {state.activeRoom}
                  </h3>
                  <p className="text-sm text-muted-foreground" data-testid="text-device-count">
                    {devices.length} device(s)
                  </p>
                </div>
              </div>

              <div 
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4" 
                role="list"
                data-testid="devices-grid"
              >
                {devices.map(([name, device]) => (
                  <DeviceTile
                    key={name}
                    name={name}
                    type={device.type}
                    on={device.on}
                    temp={device.temp}
                    onToggle={() => handleDeviceToggle(name)}
                    onTempChange={(temp) => handleTempChange(name, temp)}
                  />
                ))}
              </div>

              <div className="flex flex-wrap gap-3 mt-6 pt-4 border-t border-border">
                <Button
                  variant="outline"
                  onClick={handleAllOff}
                  className="gap-2"
                  disabled={turnAllOffMutation.isPending}
                  data-testid="button-all-off"
                >
                  <Power className="w-4 h-4" />
                  {turnAllOffMutation.isPending ? "Turning off..." : "All Off"}
                </Button>
                <Button
                  onClick={() => setScheduleModalOpen(true)}
                  className="gap-2"
                  data-testid="button-schedule"
                >
                  <Calendar className="w-4 h-4" />
                  Schedule
                </Button>
              </div>
            </div>
          </div>
        </Card>

        <footer className="text-center text-sm text-muted-foreground py-4" data-testid="text-dashboard-footer">
          SmartStay Dashboard • Server-synced • Accessibility focused
        </footer>
      </main>

      <ScheduleModal
        open={scheduleModalOpen}
        onOpenChange={setScheduleModalOpen}
        state={state}
        onSave={handleSaveSchedule}
        onDelete={handleDeleteSchedule}
      />

      <SceneConfirmDialog
        open={sceneConfirmOpen}
        onOpenChange={setSceneConfirmOpen}
        scene={pendingScene}
        actionCount={pendingScene ? getSceneActions(pendingScene, state).length : 0}
        onConfirm={handleSceneConfirm}
      />
    </div>
  );
}
