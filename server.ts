import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { getRequestListener } from "@hono/node-server";
import api from "./src/backend";
import dotenv from "dotenv";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  // We do not use express.json() globally anymore because Hono handles its own body parsing
  // using standard Web APIs, making it fully compatible with Cloudflare Workers.

  // Mount the Hono API
  // getRequestListener converts standard Web Fetch API into a Node req/res handler
  app.use("/api", (req, res) => {
    const listener = getRequestListener(api.fetch);
    listener(req, res);
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*all', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
