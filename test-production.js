#!/usr/bin/env node

const { spawn } = require('child_process');
const http = require('http');

console.log('🚀 Testing production server...');

// Start the production server
const serverProcess = spawn('node', ['server.js'], {
  cwd: '.next/standalone',
  env: {
    ...process.env,
    NODE_ENV: 'production',
    PORT: '5000',
    HOSTNAME: '0.0.0.0'
  },
  stdio: 'pipe'
});

serverProcess.stdout.on('data', (data) => {
  console.log(`[Server] ${data.toString().trim()}`);
});

serverProcess.stderr.on('data', (data) => {
  console.error(`[Server Error] ${data.toString().trim()}`);
});

// Test server after 3 seconds
setTimeout(() => {
  console.log('📡 Testing server accessibility...');
  
  const req = http.request({
    hostname: 'localhost',
    port: 5000,
    path: '/',
    method: 'GET'
  }, (res) => {
    console.log(`✅ Server responded with status: ${res.statusCode}`);
    console.log(`   Headers: ${JSON.stringify(res.headers, null, 2)}`);
    
    let body = '';
    res.on('data', (chunk) => body += chunk);
    res.on('end', () => {
      console.log(`   Response length: ${body.length} bytes`);
      serverProcess.kill();
      process.exit(0);
    });
  });

  req.on('error', (err) => {
    console.error(`❌ Server test failed: ${err.message}`);
    serverProcess.kill();
    process.exit(1);
  });

  req.end();
}, 3000);

// Handle process termination
process.on('SIGINT', () => {
  console.log('\n🛑 Terminating production test...');
  serverProcess.kill();
  process.exit(0);
});