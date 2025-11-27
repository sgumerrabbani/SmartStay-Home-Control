import type { HomeState, SceneType, Schedule, ScheduleRepeat } from "@shared/schema";

const STORAGE_KEY = 'smartstay_v1';

const defaultState: HomeState = {
  rooms: {
    "Living Room": {
      devices: {
        "Ceiling Light": { type: 'light', on: false },
        "Thermostat": { type: 'thermostat', temp: 21 },
        "Coffee Maker": { type: 'appliance', on: false }
      }
    },
    "Kitchen": {
      devices: {
        "Kitchen Light": { type: 'light', on: false },
        "Toaster": { type: 'appliance', on: false }
      }
    },
    "Bedroom": {
      devices: {
        "Bedside Lamp": { type: 'light', on: false },
        "Fan": { type: 'appliance', on: false }
      }
    }
  },
  activeRoom: "Living Room",
  activeScene: "home",
  schedules: []
};

export function loadState(): HomeState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : structuredClone(defaultState);
  } catch (e) {
    return structuredClone(defaultState);
  }
}

export function saveState(state: HomeState): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

export function getDefaultState(): HomeState {
  return structuredClone(defaultState);
}

interface SceneAction {
  room: string;
  device: string;
  on?: boolean;
  temp?: number;
}

export function getSceneActions(scene: SceneType, state: HomeState): SceneAction[] {
  const actions: SceneAction[] = [];
  
  if (scene === 'home') {
    actions.push({ room: 'Living Room', device: 'Ceiling Light', on: true });
    actions.push({ room: 'Living Room', device: 'Thermostat', temp: 21 });
  } else if (scene === 'away') {
    Object.keys(state.rooms).forEach(r => {
      Object.keys(state.rooms[r].devices).forEach(d => {
        const dev = state.rooms[r].devices[d];
        if (dev.type === 'light' || dev.type === 'appliance') {
          actions.push({ room: r, device: d, on: false });
        }
      });
    });
    actions.push({ room: 'Living Room', device: 'Thermostat', temp: 18 });
  } else if (scene === 'night') {
    Object.keys(state.rooms).forEach(r => {
      Object.keys(state.rooms[r].devices).forEach(d => {
        const dev = state.rooms[r].devices[d];
        if (dev.type === 'light') {
          actions.push({ room: r, device: d, on: false });
        }
      });
    });
    actions.push({ room: 'Bedroom', device: 'Bedside Lamp', on: true });
  }
  
  return actions;
}

export function applyScene(scene: SceneType, state: HomeState): HomeState {
  const actions = getSceneActions(scene, state);
  const newState = structuredClone(state);
  
  actions.forEach(action => {
    const devObj = newState.rooms[action.room]?.devices[action.device];
    if (!devObj) return;
    if (action.on !== undefined) devObj.on = action.on;
    if (action.temp !== undefined) devObj.temp = action.temp;
  });
  
  newState.activeScene = scene;
  return newState;
}

export function addSchedule(
  state: HomeState,
  devicePath: string,
  time: string,
  repeat: ScheduleRepeat
): HomeState {
  const newState = structuredClone(state);
  const id = Date.now().toString();
  newState.schedules.push({ id, devicePath, time, repeat });
  return newState;
}

export function removeSchedule(state: HomeState, scheduleId: string): HomeState {
  const newState = structuredClone(state);
  newState.schedules = newState.schedules.filter(s => s.id !== scheduleId);
  return newState;
}

export function toggleDevice(state: HomeState, room: string, device: string): HomeState {
  const newState = structuredClone(state);
  const dev = newState.rooms[room]?.devices[device];
  if (dev && (dev.type === 'light' || dev.type === 'appliance')) {
    dev.on = !dev.on;
  }
  return newState;
}

export function setThermostat(state: HomeState, room: string, device: string, temp: number): HomeState {
  const newState = structuredClone(state);
  const dev = newState.rooms[room]?.devices[device];
  if (dev && dev.type === 'thermostat') {
    dev.temp = Math.max(16, Math.min(30, temp));
  }
  return newState;
}

export function turnAllOff(state: HomeState): HomeState {
  const newState = structuredClone(state);
  Object.keys(newState.rooms).forEach(r => {
    Object.keys(newState.rooms[r].devices).forEach(d => {
      const dev = newState.rooms[r].devices[d];
      if (dev.type === 'light' || dev.type === 'appliance') {
        dev.on = false;
      }
    });
  });
  return newState;
}

export function setActiveRoom(state: HomeState, room: string): HomeState {
  const newState = structuredClone(state);
  newState.activeRoom = room;
  return newState;
}
