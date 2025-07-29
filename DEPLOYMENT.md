# BeDAO-ho Deployment Guide

## Replit Deployment Configuration

### Configuration Changes Made

1. **Next.js Configuration** (`next.config.mjs`)
   - Added `output: 'standalone'` for Autoscale deployment
   - Configured `serverExternalPackages` for Neon database
   - Added Replit-specific CORS origins
   - Optimized webpack configuration

2. **Deployment Type**
   - **CRITICAL**: Must use **Autoscale** deployment, NOT Static
   - Static deployment is incompatible with Next.js server-side features
   - Autoscale handles dynamic routing and API endpoints

3. **Build Process**
   - Uses standard Next.js build process (`npm run build`)
   - Generates optimized production bundle
   - Handles PostgreSQL database connections

### Deployment Steps

1. **Set Deployment Type to Autoscale**
   - In Replit deployment settings, select "Autoscale"
   - Do NOT use "Static" deployment

2. **Build Command**
   ```bash
   npm run build
   ```

3. **Start Command**
   ```bash
   npm start
   ```

4. **Environment Variables**
   - Ensure `DATABASE_URL` is configured
   - Set `NODE_ENV=production`
   - Port will automatically be set to 5000

### Files Created

- `deploy.sh` - Automated deployment script
- `Dockerfile` - Container configuration for deployment
- `DEPLOYMENT.md` - This deployment guide

### Troubleshooting

- **Error: Missing index.html** - This occurs when using Static deployment. Switch to Autoscale.
- **Build failures** - Ensure all dependencies are installed with `npm ci`
- **Database connection issues** - Verify `DATABASE_URL` environment variable

### Production Checklist

- ✅ Deployment type set to **Autoscale**
- ✅ Build command: `npm run build`
- ✅ Start command: `npm start`
- ✅ Environment variables configured
- ✅ Database URL set
- ✅ Port configured for 5000

## Next.js Autoscale vs Static

### Use Autoscale When:
- Application has API routes (`/api/*`)
- Using server-side rendering (SSR)
- Dynamic routing with database connections
- Authentication systems
- Real-time features

### Use Static When:
- Pure client-side applications
- No server-side features
- Static site generation only
- No database connections

**BeDAO-ho requires Autoscale** due to its database integration, API routes, and server-side features.