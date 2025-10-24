# AI-Enabled Cyber Incident Safety Web Portal for Defence

A production-ready, real-time cyber threat intelligence and incident management portal designed for defense and security operations centers (SOC). This application integrates with multiple free threat intelligence APIs to provide live threat data, geolocation mapping, and automated incident tracking.

## 🚀 Features

- **Real-Time Threat Intelligence**: Live threat data from AlienVault OTX and AbuseIPDB
- **Global Threat Mapping**: Interactive world map showing threat origins with geolocation
- **Incident Management**: Automated security incident detection and tracking
- **AI-Powered Analysis**: Machine learning-based threat categorization and severity assessment
- **Live Dashboard**: Real-time metrics, threat levels, and system status
- **Dual Mode Operation**: Supports both live API mode and demo mode for testing

## 🛠️ Technology Stack

- **Frontend**: React 18 + TypeScript + Vite
- **UI Framework**: Tailwind CSS + shadcn/ui components
- **Icons**: Lucide React
- **State Management**: React Hooks
- **HTTP Client**: Fetch API
- **Build Tool**: Vite
- **Package Manager**: npm

## 📋 Prerequisites

- Node.js 18+ and npm
- Git
- API keys for threat intelligence services (optional for demo mode)

## 🔑 API Keys Setup

This portal integrates with the following free threat intelligence APIs:

### 1. AlienVault OTX (Open Threat Exchange)
- **Sign up**: https://otx.alienvault.com/
- **Get API Key**: Go to Settings → API Integration
- **Free tier**: Yes, fully free
- **Rate limits**: 10,000 requests/hour

### 2. AbuseIPDB
- **Sign up**: https://www.abuseipdb.com/
- **Get API Key**: Go to Account → API
- **Free tier**: 1,000 requests/day
- **Rate limits**: Daily quota

### 3. IP Geolocation (ipgeolocation.io)
- **Sign up**: https://ipgeolocation.io/
- **Get API Key**: Dashboard → API Key
- **Free tier**: 30,000 requests/month
- **Rate limits**: 1,000 requests/day

## 🚀 Installation & Setup

### 1. Clone the Repository

```powershell
git clone https://github.com/wolfieexd/AI-Cyber-Defence.git
cd AI-Cyber-Defence/presentation-prime-main
```

### 2. Install Dependencies

```powershell
npm install
```

### 3. Configure Environment Variables

Create a `.env` file in the project root:

```powershell
cp .env.example .env
```

Edit `.env` and add your API keys:

```env
# API Keys
VITE_OTX_API_KEY=your_otx_api_key_here
VITE_ABUSEIPDB_API_KEY=your_abuseipdb_api_key_here
VITE_IPGEO_API_KEY=your_ipgeo_api_key_here

# Data Mode: 'live' or 'demo'
VITE_DATA_MODE=demo
```

**Note**: If you don't have API keys, set `VITE_DATA_MODE=demo` to use simulated data.

### 4. Run Development Server

```powershell
npm run dev
```

The application will be available at `http://localhost:8080`

### 5. Build for Production

```powershell
npm run build
```

The production build will be in the `dist/` folder.

## 🌐 Deployment

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com) and sign in
3. Click "New Project" and import your repository
4. Add environment variables in Vercel dashboard
5. Deploy!

Vercel will auto-detect Vite configuration and deploy instantly.

## 🎯 Usage

### Demo Mode

Perfect for presentations and testing without API keys:

1. Set `VITE_DATA_MODE=demo` in `.env`
2. Restart the dev server
3. The portal will use realistic simulated data

### Live Mode

For production use with real threat intelligence:

1. Obtain API keys from providers (see API Keys Setup)
2. Set `VITE_DATA_MODE=live` in `.env`
3. Add your API keys to `.env`
4. Restart the server
5. The portal will fetch and display real-time threat data

### Data Refresh Intervals

- **Threat Map**: Updates every 30 seconds
- **Incidents**: Updates every 60 seconds
- **Random Simulated Threats**: New threat every 8 seconds (for visual effect)

## 📂 Project Structure

```
src/
├── components/
│   ├── dashboard/        # Dashboard-specific components
│   ├── layout/          # Layout components
│   └── ui/              # Reusable UI components (shadcn)
├── config/
│   └── api.config.ts    # API configuration
├── pages/
│   └── Dashboard.tsx    # Main dashboard page
├── services/
│   ├── threat-intelligence.service.ts  # Main service orchestrator
│   ├── otx.service.ts                 # AlienVault OTX integration
│   ├── abuseipdb.service.ts           # AbuseIPDB integration
│   └── demo-data.service.ts           # Demo data generator
├── types/
│   └── threat.types.ts  # TypeScript interfaces
└── App.tsx              # Root component
```

## 🔒 Security Considerations

### For Production Deployment

1. **Never commit API keys**: Always use environment variables
2. **Rate Limiting**: Implement rate limiting on the backend if using high-traffic
3. **CORS**: Configure CORS properly for API endpoints
4. **Authentication**: Add user authentication for production use
5. **Secure APIs**: If deploying for actual defense use, create a backend proxy for API calls
6. **Data Classification**: Never expose classified data on public networks

### Defense-Grade Deployment

For actual military/government use:

- Deploy on air-gapped networks
- Use internal threat intelligence feeds
- Implement multi-factor authentication
- Add audit logging for all actions
- Use hardware security modules (HSM)
- Follow organizational security policies

## 🐛 Troubleshooting

### API Rate Limiting

If you hit rate limits:
- Switch to demo mode temporarily
- Increase refresh intervals in `src/config/api.config.ts`
- Upgrade to paid API tiers

### CORS Errors

If you encounter CORS errors with APIs:
- Create a backend proxy server
- Use Vercel serverless functions
- Contact API provider for CORS support

## 📧 Contact

For questions or support:
- GitHub: [@wolfieexd](https://github.com/wolfieexd)
- Repository: [AI-Cyber-Defence](https://github.com/wolfieexd/AI-Cyber-Defence)

---

**⚠️ Disclaimer**: This is a demonstration project. For actual defense/military applications, follow proper security protocols and regulations. Never expose sensitive or classified information.