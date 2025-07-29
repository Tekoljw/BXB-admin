#!/usr/bin/env node

// Production server startup script for Replit deployment
const { spawn } = require('child_process');
const path = require('path');

console.log('🚀 Starting BXB production server...');

// Set production environment
process.env.NODE_ENV = 'production';
process.env.PORT = process.env.PORT || '5000';

// Start the standalone server
const serverPath = path.join(__dirname, '.next', 'standalone', 'server.js');

// Check if server.js exists, if not, use the next build directly
if (!require('fs').existsSync(serverPath)) {
  console.log('Standalone server not found, using Next.js built-in server...');
  const nextServer = spawn('npx', ['next', 'start', '-p', process.env.PORT], {
    stdio: 'inherit',
    env: { ...process.env }
  });
  
  nextServer.on('error', (err) => {
    console.error('❌ Next server error:', err);
    process.exit(1);
  });
  
  nextServer.on('close', (code) => {
    console.log(`Next server process exited with code ${code}`);
    process.exit(code);
  });
  
  return;
}

console.log(`Starting server from: ${serverPath}`);
console.log(`Port: ${process.env.PORT}`);

const server = spawn('node', [serverPath], {
  stdio: 'inherit',
  env: { ...process.env }
});

server.on('error', (err) => {
  console.error('❌ Server error:', err);
  process.exit(1);
});

server.on('close', (code) => {
  console.log(`Server process exited with code ${code}`);
  process.exit(code);
});

// Handle graceful shutdown
process.on('SIGTERM', () => {
  console.log('Received SIGTERM, shutting down gracefully...');
  server.kill('SIGTERM');
});

process.on('SIGINT', () => {
  console.log('Received SIGINT, shutting down gracefully...');
  server.kill('SIGINT');
});