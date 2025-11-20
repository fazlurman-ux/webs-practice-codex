# Vercel Deployment Guide

This guide covers deploying the Next.js project to Vercel with CI/CD automation.

## Quick Start

### 1. Connect to Vercel

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com) and sign in
3. Click "Add New..." → "Project"
4. Import your GitHub repository
5. Vercel will auto-detect Next.js settings

### 2. Configure Environment Variables

In your Vercel project dashboard:

1. Go to Settings → Environment Variables
2. Add any required variables from `.env.example`
3. Configure these environments:
   - **Production**: For main branch deployments
   - **Preview**: For pull request deployments
   - **Development**: For local development

### 3. Deploy

Click "Deploy" or push to your main branch. Vercel will automatically build and deploy.

## Manual Deployment Setup

If you prefer manual configuration instead of the auto-import:

### Project Settings

```json
{
  "name": "your-project-name",
  "framework": "nextjs",
  "buildCommand": "npm run build",
  "outputDirectory": ".next",
  "installCommand": "npm install",
  "nodeVersion": "18.x"
}
```

### Environment Variables

Copy from `.env.example` in your repository root:

```bash
# Analytics (optional)
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
NEXT_PUBLIC_VERCEL_ANALYTICS_ID=true

# Custom domain (optional)
NEXT_PUBLIC_SITE_URL=https://your-domain.com

# Feature flags
NEXT_PUBLIC_ENABLE_ANALYTICS=true
NEXT_PUBLIC_ENABLE_3D_FEATURES=true
```

## Custom Domain Setup

1. In Vercel dashboard → Settings → Domains
2. Add your custom domain (e.g., `your-domain.com`)
3. Configure DNS records as shown by Vercel
4. Update `NEXT_PUBLIC_SITE_URL` environment variable
5. Redeploy for changes to take effect

## CI/CD with GitHub Actions

### Prerequisites

1. Fork/clone this repository
2. Get your Vercel credentials:
   - **Vercel Token**: Vercel dashboard → Settings → Tokens
   - **Org ID**: Run `vercel projects` in CLI
   - **Project ID**: Run `vercel projects` in CLI

### Setup GitHub Secrets

In your GitHub repository → Settings → Secrets and variables → Actions:

```
VERCEL_TOKEN=your_vercel_token
VERCEL_ORG_ID=your_org_id
VERCEL_PROJECT_ID=your_project_id
```

### Workflow Features

- **✅ Automated testing**: Linting and build verification
- **🚀 Production deployments**: Auto-deploy on main branch push
- **👀 Preview deployments**: Auto-deploy on pull requests
- **🔍 Smoke tests**: Verify build integrity
- **⚡ Parallel builds**: Test and deploy run in parallel

## Build Optimization

The project is pre-optimized for Vercel:

### Next.js Configuration (`next.config.ts`)

- ✅ Edge-optimized bundle splitting
- ✅ Image optimization with WebP/AVIF
- ✅ Static asset caching (1 year)
- ✅ 3D model compression headers
- ✅ Performance headers for CDN

### Bundle Size Optimization

- Three.js libraries split into separate chunks
- Framer Motion optimized imports
- Tree-shaking enabled for production
- Compressed 3D models with Draco

## Performance Features

### Edge Caching

```javascript
// Automatic caching headers
/models/* → 1 year cache (immutable)
/_next/static/* → 1 year cache (immutable)
/images/* → 1 year cache (immutable)
```

### 3D Model Optimization

- Draco compression: 90%+ size reduction
- Progressive loading with Suspense
- Mobile performance optimization
- CDN delivery with proper CORS headers

### Image Optimization

- Next.js Image component with WebP/AVIF
- Responsive image sizes
- Lazy loading enabled
- Blur data URLs for placeholder

## Monitoring and Analytics

### Built-in Vercel Analytics

1. Enable in project settings
2. Set `NEXT_PUBLIC_VERCEL_ANALYTICS_ID=true`
3. View performance metrics in dashboard

### Google Analytics (Optional)

1. Set `NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX`
2. Analytics automatically included in build

### Performance Monitoring

- Core Web Vitals tracking
- Build time monitoring
- Error logging
- Real User Monitoring (RUM)

## Environment-Specific Configurations

### Production

- Optimized bundles
- Minified assets
- Source maps disabled
- Production analytics

### Preview

- Full build pipeline
- Preview-specific analytics
- Staging environment variables
- Hot reloading disabled

### Development

- Fast refresh enabled
- Source maps included
- Development analytics disabled
- Verbose logging

## Troubleshooting

### Common Issues

#### Build Failures

```bash
# Check locally
npm run build
npm run lint

# Clear dependencies
rm -rf node_modules .next
npm install
npm run build
```

#### 3D Model Loading Issues

1. Verify model paths in `/public/models/`
2. Check Draco decoder in `/public/draco/`
3. Ensure CORS headers are set
4. Test model compression locally

#### Performance Issues

1. Check bundle size in Vercel analytics
2. Verify image optimization
3. Monitor Core Web Vitals
4. Test on mobile devices

### Debug Mode

Enable debug logging:

```bash
# Local development
NEXT_PUBLIC_DEBUG=true npm run dev

# Vercel deployment
# Add NEXT_PUBLIC_DEBUG=true to environment variables
```

## Rollback Procedures

### Quick Rollback

1. Go to Vercel dashboard → Deployments
2. Find the previous successful deployment
3. Click "..." → "Promote to Production"

### Git-based Rollback

```bash
# Revert to previous commit
git revert HEAD
git push origin main

# Or checkout specific commit
git checkout <commit-hash>
git push --force-with-lease origin main
```

### Emergency Rollback

1. Access Vercel dashboard
2. Deploy the last known good version
3. Investigate the failed deployment
4. Fix issues and redeploy

## Security Considerations

### Environment Variables

- Never commit sensitive data to Git
- Use Vercel's encrypted environment variables
- Rotate API keys regularly
- Use different keys for each environment

### Content Security Policy

The project includes CSP headers for 3D models:

```javascript
contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;"
```

### HTTPS Enforcement

- Automatic HTTPS with Vercel
- HSTS headers enabled
- Secure cookies only
- Mixed content prevention

## Best Practices

### Before Each Deployment

1. ✅ Run `npm run lint` - No errors
2. ✅ Run `npm run build` - Builds successfully
3. ✅ Test 3D models load correctly
4. ✅ Verify responsive design
5. ✅ Check performance metrics

### Regular Maintenance

1. Update dependencies monthly
2. Optimize bundle size
3. Monitor Core Web Vitals
4. Review analytics data
5. Update documentation

### Performance Monitoring

1. Check Vercel Analytics dashboard
2. Monitor build times
3. Track error rates
4. Optimize image delivery
5. Test on real devices

## Support Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Next.js Deployment Guide](https://nextjs.org/docs/deployment)
- [Project Repository Issues](https://github.com/your-repo/issues)
- [Vercel Community](https://vercel.com/community)

## Deployment Checklist

- [ ] Repository pushed to GitHub
- [ ] Vercel project created
- [ ] Environment variables configured
- [ ] Custom domain set up (if applicable)
- [ ] GitHub Actions configured
- [ ] Analytics enabled
- [ ] Production build tested
- [ ] Rollback procedures documented
- [ ] Team members trained

---

**Note**: This project is production-ready with Vercel optimizations built-in. Most deployments will work out-of-the-box with minimal configuration.