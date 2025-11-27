import type { HomeState, SceneType, ScheduleRepeat } from "@shared/schema";

const API_BASE = "/api";

export async function fetchHomeState(): Promise<HomeState> {
  const response = await fetch(`${API_BASE}/home-state`);
  if (!response.ok) {
    throw new Error("Failed to fetch home state");
  }
  return response.json();
}

export async function saveHomeState(state: HomeState): Promise<void> {
  const response = await fetch(`${API_BASE}/home-state`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(state),
  });
  if (!response.ok) {
    throw new Error("Failed to save home state");
  }
}

export async function applyScene(scene: SceneType): Promise<HomeState> {
  const response = await fetch(`${API_BASE}/scenes/${scene}/apply`, {
    method: "POST",
  });
  if (!response.ok) {
    throw new Error("Failed to apply scene");
  }
  const data = await response.json();
  return data.state;
}

export async function toggleDevice(room: string, device: string): Promise<HomeState> {
  const response = await fetch(`${API_BASE}/devices/${encodeURIComponent(room)}/${encodeURIComponent(device)}/toggle`, {
    method: "POST",
  });
  if (!response.ok) {
    throw new Error("Failed to toggle device");
  }
  const data = await response.json();
  return data.state;
}

export async function setTemperature(room: string, device: string, temp: number): Promise<HomeState> {
  const response = await fetch(`${API_BASE}/devices/${encodeURIComponent(room)}/${encodeURIComponent(device)}/temperature`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ temp }),
  });
  if (!response.ok) {
    throw new Error("Failed to set temperature");
  }
  const data = await response.json();
  return data.state;
}

export async function createSchedule(devicePath: string, time: string, repeat: ScheduleRepeat): Promise<HomeState> {
  const response = await fetch(`${API_BASE}/schedules`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ devicePath, time, repeat }),
  });
  if (!response.ok) {
    throw new Error("Failed to create schedule");
  }
  const data = await response.json();
  return data.state;
}

export async function deleteSchedule(scheduleId: string): Promise<HomeState> {
  const response = await fetch(`${API_BASE}/schedules/${scheduleId}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    throw new Error("Failed to delete schedule");
  }
  const data = await response.json();
  return data.state;
}

export async function turnAllOff(): Promise<HomeState> {
  const response = await fetch(`${API_BASE}/devices/all-off`, {
    method: "POST",
  });
  if (!response.ok) {
    throw new Error("Failed to turn off devices");
  }
  const data = await response.json();
  return data.state;
}

export async function selectRoom(room: string): Promise<HomeState> {
  const response = await fetch(`${API_BASE}/rooms/${encodeURIComponent(room)}/select`, {
    method: "PUT",
  });
  if (!response.ok) {
    throw new Error("Failed to select room");
  }
  const data = await response.json();
  return data.state;
}
