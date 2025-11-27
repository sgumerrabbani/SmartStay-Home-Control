import { pgTable, text, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
import { sql } from "drizzle-orm";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export const newsletters = pgTable("newsletters", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  email: text("email").notNull().unique(),
});

export const insertNewsletterSchema = createInsertSchema(newsletters).pick({
  email: true,
});

export type InsertNewsletter = z.infer<typeof insertNewsletterSchema>;
export type Newsletter = typeof newsletters.$inferSelect;

export const deviceTypeSchema = z.enum(["light", "thermostat", "appliance"]);
export type DeviceType = z.infer<typeof deviceTypeSchema>;

export const deviceSchema = z.object({
  id: z.string(),
  name: z.string(),
  type: deviceTypeSchema,
  on: z.boolean().optional(),
  temp: z.number().optional(),
});
export type Device = z.infer<typeof deviceSchema>;

export const roomSchema = z.object({
  id: z.string(),
  name: z.string(),
  devices: z.record(z.string(), deviceSchema),
});
export type Room = z.infer<typeof roomSchema>;

export const sceneTypeSchema = z.enum(["home", "away", "night", "custom"]);
export type SceneType = z.infer<typeof sceneTypeSchema>;

export const scheduleRepeatSchema = z.enum(["daily", "weekdays", "once"]);
export type ScheduleRepeat = z.infer<typeof scheduleRepeatSchema>;

export const scheduleSchema = z.object({
  id: z.string(),
  devicePath: z.string(),
  time: z.string(),
  repeat: scheduleRepeatSchema,
});
export type Schedule = z.infer<typeof scheduleSchema>;

export const homeStateSchema = z.object({
  rooms: z.record(z.string(), z.object({
    devices: z.record(z.string(), z.object({
      type: deviceTypeSchema,
      on: z.boolean().optional(),
      temp: z.number().optional(),
    })),
  })),
  activeRoom: z.string(),
  activeScene: sceneTypeSchema,
  schedules: z.array(scheduleSchema),
});
export type HomeState = z.infer<typeof homeStateSchema>;

export const newsletterSubscriptionSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});
export type NewsletterSubscription = z.infer<typeof newsletterSubscriptionSchema>;
