import type { Express } from "express";

export async function registerRoutes(app: Express) {
  // Health check endpoint
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", timestamp: new Date().toISOString() });
  });

  // Mock crypto prices endpoint
  app.get("/api/prices", async (req, res) => {
    try {
      // In production, this would fetch from CoinGecko or similar
      const mockPrices = {
        ethereum: 2500.00 + (Math.random() - 0.5) * 100,
        bitcoin: 45000.00 + (Math.random() - 0.5) * 1000,
        uniswap: 25.00 + (Math.random() - 0.5) * 2,
      };
      
      res.json(mockPrices);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch prices" });
    }
  });

  return app;
}
