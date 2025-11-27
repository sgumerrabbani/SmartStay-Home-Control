import { useQuery, useMutation } from "@tanstack/react-query";
import { queryClient } from "@/lib/queryClient";
import type { HomeState, SceneType, ScheduleRepeat } from "@shared/schema";
import * as api from "@/lib/api";

const HOME_STATE_KEY = ["home-state"];

export function useHomeState() {
  return useQuery<HomeState>({
    queryKey: HOME_STATE_KEY,
    queryFn: api.fetchHomeState,
    staleTime: 1000 * 60,
  });
}

export function useApplyScene() {
  return useMutation({
    mutationFn: (scene: SceneType) => api.applyScene(scene),
    onSuccess: (newState) => {
      queryClient.setQueryData(HOME_STATE_KEY, newState);
    },
  });
}

export function useToggleDevice() {
  return useMutation({
    mutationFn: ({ room, device }: { room: string; device: string }) => 
      api.toggleDevice(room, device),
    onSuccess: (newState) => {
      queryClient.setQueryData(HOME_STATE_KEY, newState);
    },
  });
}

export function useSetTemperature() {
  return useMutation({
    mutationFn: ({ room, device, temp }: { room: string; device: string; temp: number }) => 
      api.setTemperature(room, device, temp),
    onSuccess: (newState) => {
      queryClient.setQueryData(HOME_STATE_KEY, newState);
    },
  });
}

export function useCreateSchedule() {
  return useMutation({
    mutationFn: ({ devicePath, time, repeat }: { devicePath: string; time: string; repeat: ScheduleRepeat }) => 
      api.createSchedule(devicePath, time, repeat),
    onSuccess: (newState) => {
      queryClient.setQueryData(HOME_STATE_KEY, newState);
    },
  });
}

export function useDeleteSchedule() {
  return useMutation({
    mutationFn: (scheduleId: string) => api.deleteSchedule(scheduleId),
    onSuccess: (newState) => {
      queryClient.setQueryData(HOME_STATE_KEY, newState);
    },
  });
}

export function useTurnAllOff() {
  return useMutation({
    mutationFn: () => api.turnAllOff(),
    onSuccess: (newState) => {
      queryClient.setQueryData(HOME_STATE_KEY, newState);
    },
  });
}

export function useSelectRoom() {
  return useMutation({
    mutationFn: (room: string) => api.selectRoom(room),
    onSuccess: (newState) => {
      queryClient.setQueryData(HOME_STATE_KEY, newState);
    },
  });
}
