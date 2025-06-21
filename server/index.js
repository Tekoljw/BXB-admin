const express = require("express");
const { createServer } = require("http");
const next = require("next");

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

const port = 5000;

async function startServer() {
  try {
    await app.prepare();
    
    const server = express();
    
    // Basic JSON parsing
    server.use(express.json());
    
    // Handle Next.js requests
    server.all("*", (req, res) => {
      return handle(req, res);
    });
    
    const httpServer = createServer(server);
    
    httpServer.listen(port, "0.0.0.0", () => {
      console.log(`> Ready on http://0.0.0.0:${port}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
}

startServer();