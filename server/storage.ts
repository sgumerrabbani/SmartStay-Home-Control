import { type User, type InsertUser, type HomeState, type SceneType, type ScheduleRepeat } from "@shared/schema";
import { randomUUID } from "crypto";

const defaultHomeState: HomeState = {
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

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  addNewsletterSubscription(email: string): Promise<void>;
  getNewsletterSubscriptions(): Promise<string[]>;
  getHomeState(): Promise<HomeState>;
  saveHomeState(state: HomeState): Promise<void>;
  applyScene(scene: SceneType): Promise<HomeState>;
  toggleDevice(room: string, device: string): Promise<HomeState>;
  setThermostat(room: string, device: string, temp: number): Promise<HomeState>;
  addSchedule(devicePath: string, time: string, repeat: ScheduleRepeat): Promise<HomeState>;
  removeSchedule(scheduleId: string): Promise<HomeState>;
  turnAllOff(): Promise<HomeState>;
  setActiveRoom(room: string): Promise<HomeState>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private newsletterSubscriptions: Set<string>;
  private homeState: HomeState;

  constructor() {
    this.users = new Map();
    this.newsletterSubscriptions = new Set();
    this.homeState = structuredClone(defaultHomeState);
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async addNewsletterSubscription(email: string): Promise<void> {
    this.newsletterSubscriptions.add(email);
  }

  async getNewsletterSubscriptions(): Promise<string[]> {
    return Array.from(this.newsletterSubscriptions);
  }

  async getHomeState(): Promise<HomeState> {
    return structuredClone(this.homeState);
  }

  async saveHomeState(state: HomeState): Promise<void> {
    this.homeState = structuredClone(state);
  }

  async applyScene(scene: SceneType): Promise<HomeState> {
    const state = this.homeState;
    
    if (scene === 'home') {
      if (state.rooms['Living Room']?.devices['Ceiling Light']) {
        state.rooms['Living Room'].devices['Ceiling Light'].on = true;
      }
      if (state.rooms['Living Room']?.devices['Thermostat']) {
        state.rooms['Living Room'].devices['Thermostat'].temp = 21;
      }
    } else if (scene === 'away') {
      Object.keys(state.rooms).forEach(r => {
        Object.keys(state.rooms[r].devices).forEach(d => {
          const dev = state.rooms[r].devices[d];
          if (dev.type === 'light' || dev.type === 'appliance') {
            dev.on = false;
          }
        });
      });
      if (state.rooms['Living Room']?.devices['Thermostat']) {
        state.rooms['Living Room'].devices['Thermostat'].temp = 18;
      }
    } else if (scene === 'night') {
      Object.keys(state.rooms).forEach(r => {
        Object.keys(state.rooms[r].devices).forEach(d => {
          const dev = state.rooms[r].devices[d];
          if (dev.type === 'light') {
            dev.on = false;
          }
        });
      });
      if (state.rooms['Bedroom']?.devices['Bedside Lamp']) {
        state.rooms['Bedroom'].devices['Bedside Lamp'].on = true;
      }
    }
    
    state.activeScene = scene;
    return structuredClone(state);
  }

  async toggleDevice(room: string, device: string): Promise<HomeState> {
    const dev = this.homeState.rooms[room]?.devices[device];
    if (dev && (dev.type === 'light' || dev.type === 'appliance')) {
      dev.on = !dev.on;
    }
    return structuredClone(this.homeState);
  }

  async setThermostat(room: string, device: string, temp: number): Promise<HomeState> {
    const dev = this.homeState.rooms[room]?.devices[device];
    if (dev && dev.type === 'thermostat') {
      dev.temp = Math.max(16, Math.min(30, temp));
    }
    return structuredClone(this.homeState);
  }

  async addSchedule(devicePath: string, time: string, repeat: ScheduleRepeat): Promise<HomeState> {
    const id = randomUUID();
    this.homeState.schedules.push({ id, devicePath, time, repeat });
    return structuredClone(this.homeState);
  }

  async removeSchedule(scheduleId: string): Promise<HomeState> {
    this.homeState.schedules = this.homeState.schedules.filter(s => s.id !== scheduleId);
    return structuredClone(this.homeState);
  }

  async turnAllOff(): Promise<HomeState> {
    Object.keys(this.homeState.rooms).forEach(r => {
      Object.keys(this.homeState.rooms[r].devices).forEach(d => {
        const dev = this.homeState.rooms[r].devices[d];
        if (dev.type === 'light' || dev.type === 'appliance') {
          dev.on = false;
        }
      });
    });
    return structuredClone(this.homeState);
  }

  async setActiveRoom(room: string): Promise<HomeState> {
    if (this.homeState.rooms[room]) {
      this.homeState.activeRoom = room;
    }
    return structuredClone(this.homeState);
  }
}

export const storage = new MemStorage();
