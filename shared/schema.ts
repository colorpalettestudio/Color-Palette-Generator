import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

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

export const paletteLikes = pgTable("palette_likes", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  paletteName: text("palette_name").notNull().unique(),
  likeCount: integer("like_count").notNull().default(0),
});

export const insertPaletteLikeSchema = createInsertSchema(paletteLikes).pick({
  paletteName: true,
});

export type InsertPaletteLike = z.infer<typeof insertPaletteLikeSchema>;
export type PaletteLike = typeof paletteLikes.$inferSelect;
