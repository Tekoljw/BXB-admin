# BeDAO-ho Deployment Guide

## Deployment Issue Resolution

This Next.js application has been configured for **Replit Autoscale deployment**. The previous static deployment configuration was causing build failures due to CSS compilation issues.

## Applied Fixes

### 1. Next.js Configuration Updates
- Updated `next.config.mjs` for Autoscale deployment
- Added proper cross-origin configuration for Replit domains
- Added webpack configuration to handle CSS minification issues

### 2. Build Configuration
- Created `Dockerfile` for containerized deployment
- Added `.dockerignore` for optimal build performance
- Created `deploy.sh` script for automated deployment preparation

### 3. PostCSS Configuration
- Added `postcss.config.js` to handle CSS compilation issues
- Disabled problematic CSS minification in production

## Deployment Instructions

### For Replit Deployment:

1. **Set Deployment Type**: 
   - Change deployment type from "Static" to **"Autoscale"**
   - This is critical as Next.js applications require server-side rendering

2. **Build Configuration**:
   - Build command: `npm run build`
   - Start command: `npm start`
   - Port: `5000` (already configured)

3. **Environment Variables**:
   - Ensure `DATABASE_URL` is set for PostgreSQL connection
   - Add any other required environment variables

4. **Build Process**:
   ```bash
   # Optional: Run the deployment preparation script
   ./deploy.sh
   
   # Or manually:
   npm install
   npm run build
   npm start
   ```

## Known Issues and Solutions

### CSS Compilation Error
**Issue**: Build fails with CSS parsing error at line 496
**Root Cause**: The application has CSS files in the `/static` directory that conflict with Next.js build process
**Solutions Applied**:
1. Updated webpack configuration to handle CSS minification
2. Added PostCSS configuration to disable problematic plugins
3. Moved static files to backup location

### Recommended Workaround
If build issues persist during deployment:
1. Temporarily remove or rename the `static` folder
2. Run the build process
3. Deploy the application
4. The static assets can be served from the `public` directory instead

## File Structure for Deployment

```
/
├── next.config.mjs          # Updated for Autoscale deployment
├── Dockerfile               # Container configuration
├── .dockerignore            # Build optimization
├── deploy.sh                # Deployment script
├── postcss.config.js        # CSS compilation fix
├── package.json             # Dependencies and scripts
└── public/                  # Static assets (recommended location)
```

## Verification Steps

1. Ensure the development server runs without errors: `npm run dev`
2. Test the build process locally: `npm run build`
3. Verify the production server starts: `npm start`
4. Check that the database connection works with `DATABASE_URL`

## Support

This configuration is optimized for Replit's Autoscale deployment platform. The application supports:
- Server-side rendering with Next.js 15
- PostgreSQL database integration
- Multi-language and multi-theme support
- Real-time cryptocurrency data
- Secure authentication system

For deployment issues, ensure:
- Deployment type is set to "Autoscale" (not Static)
- All environment variables are properly configured
- The build process completes successfully before deployment