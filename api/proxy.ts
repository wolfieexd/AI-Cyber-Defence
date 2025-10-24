import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Only allow GET requests
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { endpoint } = req.query;

  if (!endpoint || typeof endpoint !== 'string') {
    return res.status(400).json({ error: 'Missing endpoint parameter' });
  }

  try {
    let apiUrl = '';
    const headers: Record<string, string> = {};

    // Route to appropriate API based on endpoint
    switch (endpoint) {
      case 'otx-pulses':
        apiUrl = `https://otx.alienvault.com/api/v1/pulses/subscribed?limit=10`;
        headers['X-OTX-API-KEY'] = process.env.OTX_API_KEY || '';
        break;

      case 'abuseipdb-blacklist':
        apiUrl = `https://api.abuseipdb.com/api/v2/blacklist?confidenceMinimum=90&limit=10`;
        headers['Key'] = process.env.ABUSEIPDB_API_KEY || '';
        headers['Accept'] = 'application/json';
        break;

      default:
        return res.status(400).json({ error: 'Invalid endpoint' });
    }

    const response = await fetch(apiUrl, { headers });

    if (!response.ok) {
      throw new Error(`API returned ${response.status}`);
    }

    const data = await response.json();

    // Cache for 30 seconds
    res.setHeader('Cache-Control', 's-maxage=30, stale-while-revalidate');
    res.setHeader('Access-Control-Allow-Origin', '*');
    
    return res.status(200).json(data);
  } catch (error) {
    console.error('Proxy error:', error);
    return res.status(500).json({ error: 'Failed to fetch data from API' });
  }
}
