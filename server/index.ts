import express from "express";
import { createServer } from "http";
import next from "next";
import { registerRoutes } from "./routes";

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

const port = process.env.PORT || 5000;

async function startServer() {
  try {
    await app.prepare();
    
    const server = express();
    
    // Setup routes and auth
    await registerRoutes(server);
    
    // Handle Next.js requests
    server.all("*", (req, res) => {
      return handle(req, res);
    });
    
    const httpServer = createServer(server);
    
    httpServer.listen(port, () => {
      console.log(`> Ready on http://localhost:${port}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
}

startServer();