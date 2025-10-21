import { type User, type InsertUser, type PaletteLike, type InsertPaletteLike, users, paletteLikes } from "@shared/schema";
import { randomUUID } from "crypto";
import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import { eq, sql as sqlDrizzle } from "drizzle-orm";

const sql = neon(process.env.DATABASE_URL!);

// modify the interface with any CRUD methods
// you might need

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Palette likes operations
  getPaletteLike(paletteName: string): Promise<PaletteLike | undefined>;
  getAllPaletteLikes(): Promise<PaletteLike[]>;
  likePalette(paletteName: string): Promise<PaletteLike>;
  unlikePalette(paletteName: string): Promise<PaletteLike>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private paletteLikes: Map<string, PaletteLike>;

  constructor() {
    this.users = new Map();
    this.paletteLikes = new Map();
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

  async getPaletteLike(paletteName: string): Promise<PaletteLike | undefined> {
    return this.paletteLikes.get(paletteName);
  }

  async getAllPaletteLikes(): Promise<PaletteLike[]> {
    return Array.from(this.paletteLikes.values());
  }

  async likePalette(paletteName: string): Promise<PaletteLike> {
    const existing = this.paletteLikes.get(paletteName);
    if (existing) {
      existing.likeCount++;
      return existing;
    }
    const paletteLike: PaletteLike = {
      id: randomUUID(),
      paletteName,
      likeCount: 1,
    };
    this.paletteLikes.set(paletteName, paletteLike);
    return paletteLike;
  }

  async unlikePalette(paletteName: string): Promise<PaletteLike> {
    const existing = this.paletteLikes.get(paletteName);
    if (existing && existing.likeCount > 0) {
      existing.likeCount--;
      return existing;
    }
    const paletteLike: PaletteLike = {
      id: randomUUID(),
      paletteName,
      likeCount: 0,
    };
    this.paletteLikes.set(paletteName, paletteLike);
    return paletteLike;
  }
}

export class DbStorage implements IStorage {
  private db = drizzle(sql);

  async getUser(id: string): Promise<User | undefined> {
    const result = await this.db.select().from(users).where(eq(users.id, id)).limit(1);
    return result[0];
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const result = await this.db.select().from(users).where(eq(users.username, username)).limit(1);
    return result[0];
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const result = await this.db.insert(users).values(insertUser).returning();
    return result[0];
  }

  async getPaletteLike(paletteName: string): Promise<PaletteLike | undefined> {
    const result = await this.db.select().from(paletteLikes).where(eq(paletteLikes.paletteName, paletteName)).limit(1);
    return result[0];
  }

  async getAllPaletteLikes(): Promise<PaletteLike[]> {
    return await this.db.select().from(paletteLikes);
  }

  async likePalette(paletteName: string): Promise<PaletteLike> {
    const existing = await this.getPaletteLike(paletteName);
    
    if (existing) {
      const result = await this.db
        .update(paletteLikes)
        .set({ likeCount: sqlDrizzle`${paletteLikes.likeCount} + 1` })
        .where(eq(paletteLikes.paletteName, paletteName))
        .returning();
      return result[0];
    } else {
      const result = await this.db
        .insert(paletteLikes)
        .values({ paletteName, likeCount: 1 })
        .returning();
      return result[0];
    }
  }

  async unlikePalette(paletteName: string): Promise<PaletteLike> {
    const existing = await this.getPaletteLike(paletteName);
    
    if (existing && existing.likeCount > 0) {
      const result = await this.db
        .update(paletteLikes)
        .set({ likeCount: sqlDrizzle`${paletteLikes.likeCount} - 1` })
        .where(eq(paletteLikes.paletteName, paletteName))
        .returning();
      return result[0];
    } else if (existing) {
      return existing;
    } else {
      const result = await this.db
        .insert(paletteLikes)
        .values({ paletteName, likeCount: 0 })
        .returning();
      return result[0];
    }
  }
}

export const storage = new DbStorage();
