import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { newsletterSubscriptionSchema, homeStateSchema, sceneTypeSchema, scheduleRepeatSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  app.post("/api/newsletter", async (req, res) => {
    try {
      const result = newsletterSubscriptionSchema.safeParse(req.body);
      
      if (!result.success) {
        return res.status(400).json({ 
          error: "Invalid email address",
          details: result.error.flatten()
        });
      }

      await storage.addNewsletterSubscription(result.data.email);
      
      return res.status(200).json({ 
        success: true,
        message: "Successfully subscribed to newsletter"
      });
    } catch (error) {
      console.error("Newsletter subscription error:", error);
      return res.status(500).json({ 
        error: "Failed to subscribe to newsletter"
      });
    }
  });

  app.get("/api/newsletter", async (req, res) => {
    try {
      const subscriptions = await storage.getNewsletterSubscriptions();
      return res.status(200).json({ 
        count: subscriptions.length,
        subscriptions 
      });
    } catch (error) {
      console.error("Newsletter fetch error:", error);
      return res.status(500).json({ 
        error: "Failed to fetch subscriptions"
      });
    }
  });

  app.get("/api/home-state", async (req, res) => {
    try {
      const state = await storage.getHomeState();
      return res.status(200).json(state);
    } catch (error) {
      console.error("Home state fetch error:", error);
      return res.status(500).json({ 
        error: "Failed to fetch home state"
      });
    }
  });

  app.put("/api/home-state", async (req, res) => {
    try {
      const result = homeStateSchema.safeParse(req.body);
      
      if (!result.success) {
        return res.status(400).json({ 
          error: "Invalid home state",
          details: result.error.flatten()
        });
      }

      await storage.saveHomeState(result.data);
      
      return res.status(200).json({ 
        success: true,
        message: "Home state saved successfully"
      });
    } catch (error) {
      console.error("Home state save error:", error);
      return res.status(500).json({ 
        error: "Failed to save home state"
      });
    }
  });

  app.post("/api/scenes/:sceneType/apply", async (req, res) => {
    try {
      const sceneResult = sceneTypeSchema.safeParse(req.params.sceneType);
      
      if (!sceneResult.success) {
        return res.status(400).json({ 
          error: "Invalid scene type"
        });
      }

      const newState = await storage.applyScene(sceneResult.data);
      
      return res.status(200).json({ 
        success: true,
        message: `Scene "${sceneResult.data}" applied`,
        state: newState
      });
    } catch (error) {
      console.error("Scene apply error:", error);
      return res.status(500).json({ 
        error: "Failed to apply scene"
      });
    }
  });

  app.post("/api/devices/:room/:device/toggle", async (req, res) => {
    try {
      const { room, device } = req.params;
      const newState = await storage.toggleDevice(room, device);
      
      return res.status(200).json({ 
        success: true,
        state: newState
      });
    } catch (error) {
      console.error("Device toggle error:", error);
      return res.status(500).json({ 
        error: "Failed to toggle device"
      });
    }
  });

  app.post("/api/devices/:room/:device/temperature", async (req, res) => {
    try {
      const { room, device } = req.params;
      const tempSchema = z.object({ temp: z.number().min(16).max(30) });
      const result = tempSchema.safeParse(req.body);
      
      if (!result.success) {
        return res.status(400).json({ 
          error: "Invalid temperature"
        });
      }

      const newState = await storage.setThermostat(room, device, result.data.temp);
      
      return res.status(200).json({ 
        success: true,
        state: newState
      });
    } catch (error) {
      console.error("Temperature set error:", error);
      return res.status(500).json({ 
        error: "Failed to set temperature"
      });
    }
  });

  app.post("/api/schedules", async (req, res) => {
    try {
      const scheduleSchema = z.object({
        devicePath: z.string(),
        time: z.string(),
        repeat: scheduleRepeatSchema
      });
      
      const result = scheduleSchema.safeParse(req.body);
      
      if (!result.success) {
        return res.status(400).json({ 
          error: "Invalid schedule data",
          details: result.error.flatten()
        });
      }

      const newState = await storage.addSchedule(
        result.data.devicePath, 
        result.data.time, 
        result.data.repeat
      );
      
      return res.status(201).json({ 
        success: true,
        message: "Schedule created",
        state: newState
      });
    } catch (error) {
      console.error("Schedule create error:", error);
      return res.status(500).json({ 
        error: "Failed to create schedule"
      });
    }
  });

  app.delete("/api/schedules/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const newState = await storage.removeSchedule(id);
      
      return res.status(200).json({ 
        success: true,
        message: "Schedule deleted",
        state: newState
      });
    } catch (error) {
      console.error("Schedule delete error:", error);
      return res.status(500).json({ 
        error: "Failed to delete schedule"
      });
    }
  });

  app.post("/api/devices/all-off", async (req, res) => {
    try {
      const newState = await storage.turnAllOff();
      
      return res.status(200).json({ 
        success: true,
        message: "All devices turned off",
        state: newState
      });
    } catch (error) {
      console.error("All off error:", error);
      return res.status(500).json({ 
        error: "Failed to turn off devices"
      });
    }
  });

  app.put("/api/rooms/:room/select", async (req, res) => {
    try {
      const { room } = req.params;
      const newState = await storage.setActiveRoom(room);
      
      return res.status(200).json({ 
        success: true,
        state: newState
      });
    } catch (error) {
      console.error("Room select error:", error);
      return res.status(500).json({ 
        error: "Failed to select room"
      });
    }
  });

  return httpServer;
}
