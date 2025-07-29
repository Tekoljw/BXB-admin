# Replit Deployment Configuration

## APPLICATION TYPE: NEXT.JS AUTOSCALE (NOT STATIC)

This is a **Next.js 15 application** configured for **Replit Autoscale deployment**.

### Key Configuration Files:

1. **replit.toml** - Specifies `deploymentTarget = "autoscale"`
2. **next.config.mjs** - Configured with `output: 'standalone'`
3. **Procfile** - Specifies `web: npm start`
4. **package.json** - Contains build and start scripts

### Build Process:

- Build Command: `npm run build`
- Start Command: `npm start`
- Output Directory: `.next/standalone/`

### Deployment Verification:

The application successfully:
- ✅ Builds with `npm run build`
- ✅ Generates standalone server in `.next/standalone/`
- ✅ Creates server.js for production
- ✅ Configures all routes and static assets

### IMPORTANT:
- This is **NOT** a static site
- Requires **Autoscale** deployment target
- Uses **standalone** output mode for serverless deployment
- No index.html in public directory (removed to prevent static site detection)

### Files Structure:
```
.next/standalone/
├── server.js          # Production server
├── package.json       # Dependencies
├── .next/             # Built application
└── node_modules/      # Runtime dependencies
```

This configuration ensures Replit recognizes this as a Next.js application requiring Autoscale deployment, not static hosting.