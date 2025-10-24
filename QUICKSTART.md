# Quick Start Guide

## Get Running in 5 Minutes

### Step 1: Install Dependencies
```powershell
npm install
```

### Step 2: Create Environment File
```powershell
# Copy the example file
copy .env.example .env
```

### Step 3: Run in Demo Mode (No API Keys Needed)
The `.env` file is already configured for demo mode. Just start the server:

```powershell
npm run dev
```

Open your browser to `http://localhost:8080` and you're done! 🎉

---

## Want to Use Real Live Data?

### Get Free API Keys

1. **AlienVault OTX** (5 minutes)
   - Go to https://otx.alienvault.com/
   - Click "Sign Up" (it's free)
   - After login, go to Settings → API Integration
   - Copy your API key

2. **AbuseIPDB** (3 minutes)
   - Go to https://www.abuseipdb.com/
   - Click "Sign Up"
   - After login, go to your account page
   - Generate an API key

3. **IP Geolocation** (3 minutes)
   - Go to https://ipgeolocation.io/
   - Click "Sign Up Free"
   - Copy your API key from the dashboard

### Configure Your Keys

Edit your `.env` file:

```env
VITE_OTX_API_KEY=paste_your_otx_key_here
VITE_ABUSEIPDB_API_KEY=paste_your_abuseipdb_key_here
VITE_IPGEO_API_KEY=paste_your_ipgeo_key_here
VITE_DATA_MODE=live
```

**Important**: Change `VITE_DATA_MODE` from `demo` to `live`

### Restart the Server

```powershell
# Stop the dev server (Ctrl+C)
# Start it again
npm run dev
```

Now you're pulling real threat intelligence data! 🚀

---

## Deploy to Vercel (2 Minutes)

1. Push your code to GitHub
2. Go to https://vercel.com and sign in with GitHub
3. Click "New Project"
4. Select your `AI-Cyber-Defence` repository
5. Add your environment variables (API keys)
6. Click "Deploy"

Done! Your portal is live on the internet.

---

## Troubleshooting

### "Module not found" errors
```powershell
rm -rf node_modules package-lock.json
npm install
```

### API not working
- Check if your API keys are correct in `.env`
- Make sure `VITE_DATA_MODE=live`
- Restart the dev server after changing `.env`

### Port 8080 already in use
Edit `vite.config.ts` and change the port:
```typescript
server: {
  port: 3000,  // Use any available port
}
```

---

## Need Help?

- Check the full README.md for detailed documentation
- Open an issue on GitHub
- Review the console logs for error messages
