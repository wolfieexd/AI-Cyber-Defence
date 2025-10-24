// API Configuration
const isProduction = import.meta.env.PROD;
const isVercelDev = typeof window !== 'undefined' && window.location.port === '3000'; // Vercel dev runs on port 3000
const useProxy = isProduction || isVercelDev; // Use proxy in production OR when running with Vercel CLI

export const config = {
  // Use proxy endpoints in production or Vercel dev, direct API calls only in standard Vite dev
  proxy: {
    enabled: useProxy,
    baseUrl: '/api',
  },

  // AlienVault Open Threat Exchange
  otx: {
    apiKey: import.meta.env.VITE_OTX_API_KEY || '',
    baseUrl: useProxy ? '/api/proxy' : 'https://otx.alienvault.com/api/v1',
    enabled: useProxy || !!import.meta.env.VITE_OTX_API_KEY,
  },
  
  // AbuseIPDB
  abuseIPDB: {
    apiKey: import.meta.env.VITE_ABUSEIPDB_API_KEY || '',
    baseUrl: useProxy ? '/api/proxy' : 'https://api.abuseipdb.com/api/v2',
    enabled: useProxy || !!import.meta.env.VITE_ABUSEIPDB_API_KEY,
  },
  
  // IP Geolocation
  ipGeo: {
    apiKey: import.meta.env.VITE_IPGEO_API_KEY || '',
    baseUrl: useProxy ? '/api/geolocation' : 'https://api.ipgeolocation.io',
    enabled: useProxy || !!import.meta.env.VITE_IPGEO_API_KEY,
  },
  
  // Data mode: 'live' or 'demo'
  dataMode: import.meta.env.VITE_DATA_MODE || 'demo',
  
  // Refresh intervals (in milliseconds)
  refreshIntervals: {
    threats: 30000, // 30 seconds
    incidents: 60000, // 1 minute
  },
};

export const isLiveMode = () => config.dataMode === 'live';
export const isDemoMode = () => config.dataMode === 'demo';
export const isUsingProxy = () => config.proxy.enabled;
