import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";

export async function registerRoutes(app: Express): Promise<Server> {
  // Get all palette likes
  app.get("/api/palette-likes", async (_req, res) => {
    try {
      const likes = await storage.getAllPaletteLikes();
      res.json(likes);
    } catch (error) {
      console.error("Failed to fetch palette likes:", error);
      res.status(500).json({ error: "Failed to fetch palette likes" });
    }
  });

  // Like a palette
  app.post("/api/palette-likes/:paletteName/like", async (req, res) => {
    try {
      const { paletteName } = req.params;
      
      if (!paletteName || paletteName.trim() === '') {
        return res.status(400).json({ error: "Palette name is required" });
      }

      if (paletteName.length > 100) {
        return res.status(400).json({ error: "Palette name is too long" });
      }

      const paletteLike = await storage.likePalette(paletteName);
      res.json(paletteLike);
    } catch (error) {
      console.error("Failed to like palette:", error);
      res.status(500).json({ error: "Failed to like palette" });
    }
  });

  // Unlike a palette
  app.post("/api/palette-likes/:paletteName/unlike", async (req, res) => {
    try {
      const { paletteName } = req.params;
      
      if (!paletteName || paletteName.trim() === '') {
        return res.status(400).json({ error: "Palette name is required" });
      }

      if (paletteName.length > 100) {
        return res.status(400).json({ error: "Palette name is too long" });
      }

      const paletteLike = await storage.unlikePalette(paletteName);
      res.json(paletteLike);
    } catch (error) {
      console.error("Failed to unlike palette:", error);
      res.status(500).json({ error: "Failed to unlike palette" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
