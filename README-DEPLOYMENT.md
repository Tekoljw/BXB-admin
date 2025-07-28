# Deployment Guide

## Replit Deployment

This Next.js application is configured for deployment on Replit. The deployment issues have been resolved with the following fixes:

### Changes Made

1. **Updated next.config.mjs**
   - Added `serverExternalPackages: ['@neondatabase/serverless']` for proper Neon database handling
   - Added `allowedDevOrigins: ['*.replit.dev']` to fix cross-origin warnings
   - Configured experimental optimizations

2. **Created Dockerfile**
   - Node.js 20 Alpine base image
   - Proper pnpm setup and dependency installation
   - Production build configuration
   - Port 5000 exposure

3. **Fixed Build Errors**
   - Removed malformed JSX code in `app/(dashboard)/social/page.tsx`
   - Fixed syntax errors that were preventing successful builds

4. **Created Build Scripts**
   - `deploy.sh` - Automated deployment script
   - `vercel.json` - Alternative deployment configuration

### Deployment Options

#### Option 1: Replit Autoscale Deployment (Recommended)
- This is a Next.js application and should use **Autoscale** deployment type, not Static
- The app server runs on port 5000
- Database connection is handled through environment variables

#### Option 2: Manual Deployment
Run the deployment script:
```bash
./deploy.sh
```

#### Option 3: Container Deployment
Use the provided Dockerfile:
```bash
docker build -t bedao-app .
docker run -p 5000:5000 bedao-app
```

### Environment Variables Required
- `DATABASE_URL` - PostgreSQL database connection string
- Any other API keys as configured in the application

### Important Notes
- The application is configured for **autoscale deployment**, not static deployment
- The build process may take several minutes due to the application complexity
- Ensure all environment variables are properly set before deployment
- The app serves on port 5000 and should be accessible at that port

### Troubleshooting
If deployment fails:
1. Check that the deployment type is set to "Autoscale" not "Static"
2. Verify all environment variables are properly configured
3. Check build logs for any remaining syntax errors
4. Ensure the app is binding to `0.0.0.0:5000` not `localhost:5000`