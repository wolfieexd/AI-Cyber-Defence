# Deployment Guide - Production Ready

## 🚀 Quick Deploy to Vercel (Recommended)

### Prerequisites
- GitHub account
- Vercel account (free at [vercel.com](https://vercel.com))
- API keys from threat intelligence providers

### Step 1: Push to GitHub

```powershell
cd "d:\Projects\AI-Enabled Cyber Incident Safety Web Portal for Defence\presentation-prime-main"
git add .
git commit -m "Production-ready with API integration and proxy"
git push origin main
```

### Step 2: Import to Vercel

1. Go to [vercel.com](https://vercel.com) and sign in with GitHub
2. Click **"Add New Project"**
3. Select your `AI-Cyber-Defence` repository
4. Vercel will auto-detect Vite configuration

### Step 3: Configure Environment Variables

In the Vercel project settings, add these **server-side** environment variables:

**IMPORTANT**: Use WITHOUT `VITE_` prefix for serverless functions:

| Variable Name | Your Value |
|--------------|-------|
| `OTX_API_KEY` | `dafa0bd1c2a3b9bfeeb050d63380c9630e504f25bc3905c8da456bde6a6c9a44` |
| `ABUSEIPDB_API_KEY` | `5bc1e98916027caeba600d885de07bc5aa75508344a1e7fbd4456c4367bf3c77ebe39c3cf41699f1` |
| `IPGEO_API_KEY` | `8b9e9ffd86b949759384b4a5ae281a9f` |
| `VITE_DATA_MODE` | `live` |

### Step 4: Deploy

Click **"Deploy"** and wait ~2 minutes. Your app will be live!

## 🔒 Security Features

### API Key Protection

Your project uses a **secure proxy architecture**:

- **Development**: API keys in `.env` (local only, not committed)
- **Production**: API keys stored as Vercel environment variables
- **Frontend**: Never exposes API keys to browser
- **Proxy**: Serverless functions at `/api/*` handle all external API calls

### How It Works

```
Browser → /api/proxy → Vercel Function → External API
         (No keys)     (Secured keys)   (AlienVault/AbuseIPDB)
```

The frontend can't access your API keys—they're only available to backend functions.

## Pre-Deployment

### Code Quality
- [ ] All TypeScript errors resolved
- [ ] No console errors in browser
- [ ] All components render correctly
- [ ] Build completes successfully (`npm run build`)
- [ ] No security vulnerabilities (`npm audit`)

### Configuration
- [ ] `.env` file configured (never commit this!)
- [ ] `.env.example` file updated with all required variables
- [ ] `VITE_DATA_MODE` set appropriately (`live` or `demo`)
- [ ] API keys obtained and tested
- [ ] Rate limits understood for each API

### Security
- [ ] `.gitignore` includes `.env` files
- [ ] No hardcoded API keys in source code
- [ ] No sensitive data exposed in client-side code
- [ ] CORS configured if using backend proxy

### Testing
- [ ] Test in demo mode works
- [ ] Test in live mode works (if APIs configured)
- [ ] Dashboard loads without errors
- [ ] Threat map displays correctly
- [ ] Incidents update in real-time
- [ ] Loading states display properly
- [ ] Error states handle gracefully

## Deployment Steps

### For Vercel

1. **Prepare Repository**
   ```powershell
   git add .
   git commit -m "Prepare for deployment"
   git push origin main
   ```

2. **Deploy to Vercel**
   - Go to https://vercel.com
   - Sign in with GitHub
   - Click "New Project"
   - Import `AI-Cyber-Defence` repository
   - Configure environment variables:
     - `VITE_OTX_API_KEY`
     - `VITE_ABUSEIPDB_API_KEY`
     - `VITE_IPGEO_API_KEY`
     - `VITE_DATA_MODE` (set to `live` or `demo`)
   - Click "Deploy"

3. **Post-Deployment Checks**
   - [ ] Site loads successfully
   - [ ] No console errors
   - [ ] Threats display on map
   - [ ] Incidents load correctly
   - [ ] Real-time updates work
   - [ ] Mobile responsive
   - [ ] Performance acceptable (< 3s load)

### For GitHub Pages

1. **Configure Package.json**
   ```json
   "homepage": "https://yourusername.github.io/AI-Cyber-Defence"
   ```

2. **Install gh-pages**
   ```powershell
   npm install gh-pages --save-dev
   ```

3. **Add Deploy Scripts**
   ```json
   "predeploy": "npm run build",
   "deploy": "gh-pages -d dist"
   ```

4. **Update vite.config.ts**
   ```typescript
   base: "/AI-Cyber-Defence/",
   ```

5. **Deploy**
   ```powershell
   npm run deploy
   ```

6. **Configure GitHub**
   - Go to repository Settings → Pages
   - Set source to `gh-pages` branch
   - Set folder to `/ (root)`
   - Save

7. **Post-Deployment Checks**
   - [ ] Site accessible at GitHub Pages URL
   - [ ] Assets load correctly
   - [ ] Routing works properly
   - [ ] API calls succeed

## Post-Deployment Monitoring

### First 24 Hours
- [ ] Monitor API rate limits
- [ ] Check for console errors
- [ ] Verify data updates
- [ ] Test on multiple devices
- [ ] Check browser compatibility

### Ongoing
- [ ] Monitor API usage
- [ ] Watch for rate limit errors
- [ ] Track performance metrics
- [ ] Review error logs
- [ ] Update dependencies regularly

## Rollback Plan

If something goes wrong:

### Vercel
1. Go to deployments page
2. Select previous working deployment
3. Click "Promote to Production"

### GitHub Pages
1. Revert the git commit
   ```powershell
   git revert HEAD
   git push origin main
   ```
2. Redeploy
   ```powershell
   npm run deploy
   ```

## Environment Variables Reference

| Variable | Required | Purpose | Example |
|----------|----------|---------|---------|
| `VITE_OTX_API_KEY` | Optional* | AlienVault OTX API access | `abc123...` |
| `VITE_ABUSEIPDB_API_KEY` | Optional* | AbuseIPDB API access | `xyz789...` |
| `VITE_IPGEO_API_KEY` | Optional* | IP Geolocation API | `def456...` |
| `VITE_DATA_MODE` | Yes | Data source mode | `live` or `demo` |

*Required only when `VITE_DATA_MODE=live`

## Performance Targets

- **First Contentful Paint**: < 1.5s
- **Time to Interactive**: < 3s
- **Largest Contentful Paint**: < 2.5s
- **Cumulative Layout Shift**: < 0.1
- **First Input Delay**: < 100ms

## Support Contacts

- **Repository**: https://github.com/wolfieexd/AI-Cyber-Defence
- **Issues**: https://github.com/wolfieexd/AI-Cyber-Defence/issues

---

**Remember**: Never deploy with hardcoded API keys or sensitive data!
