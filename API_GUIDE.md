# API Integration Guide for Developers

This guide explains how the threat intelligence APIs are integrated and how to extend the system.

## Architecture Overview

```
┌─────────────────────────────────────────────────────────────┐
│                     React Components                         │
│  (Dashboard.tsx, ThreatMap.tsx)                             │
└────────────────────┬────────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────────┐
│         Threat Intelligence Service (Orchestrator)           │
│  (threat-intelligence.service.ts)                           │
└────────┬────────────────────┬──────────────────────┬────────┘
         │                    │                      │
         ▼                    ▼                      ▼
┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐
│  OTX Service    │  │ AbuseIPDB       │  │  Demo Data      │
│  (AlienVault)   │  │ Service         │  │  Service        │
└────────┬────────┘  └────────┬────────┘  └────────┬────────┘
         │                    │                      │
         ▼                    ▼                      ▼
   External APIs         External APIs         Local Data
```

## Service Layer Architecture

### 1. Threat Intelligence Service (Main Orchestrator)

**Location**: `src/services/threat-intelligence.service.ts`

**Purpose**: Coordinates all data sources and provides a unified interface

**Key Methods**:
- `getThreats()`: Fetches threat locations from all sources
- `getIncidents()`: Fetches security incidents from all sources
- `generateRandomThreat()`: Creates simulated threats for demo
- `generateRandomIncident()`: Creates simulated incidents for demo

**Usage Example**:
```typescript
import { threatIntelligenceService } from '@/services/threat-intelligence.service';

// Get all threats
const threats = await threatIntelligenceService.getThreats();

// Get all incidents
const incidents = await threatIntelligenceService.getIncidents();
```

### 2. AlienVault OTX Service

**Location**: `src/services/otx.service.ts`

**API Documentation**: https://otx.alienvault.com/api

**Endpoints Used**:
- `GET /api/v1/pulses/subscribed` - Get threat intelligence pulses

**Data Transformation**:
- Pulses → ThreatLocation (for map)
- Pulses → SecurityIncident (for incident list)

**Rate Limits**: 10,000 requests/hour

**Example Response**:
```json
{
  "results": [
    {
      "id": "abc123",
      "name": "APT28 Campaign",
      "description": "Russian APT group activity",
      "created": "2025-01-23T10:00:00",
      "tags": ["apt", "russia", "high-severity"],
      "indicators": [
        {
          "type": "IPv4",
          "indicator": "192.0.2.1",
          "description": "Command and control server"
        }
      ]
    }
  ]
}
```

### 3. AbuseIPDB Service

**Location**: `src/services/abuseipdb.service.ts`

**API Documentation**: https://docs.abuseipdb.com/

**Endpoints Used**:
- `GET /api/v2/check` - Check individual IP
- `GET /api/v2/blacklist` - Get blacklisted IPs

**Rate Limits**: 1,000 requests/day (free tier)

**Example Response**:
```json
{
  "data": {
    "ipAddress": "192.0.2.1",
    "abuseConfidenceScore": 95,
    "countryCode": "RU",
    "usageType": "Data Center",
    "isp": "Example ISP",
    "totalReports": 150,
    "lastReportedAt": "2025-01-23T10:00:00Z"
  }
}
```

### 4. IP Geolocation Service

**Location**: Integrated within OTX and AbuseIPDB services

**API Documentation**: https://ipgeolocation.io/documentation.html

**Endpoints Used**:
- `GET /ipgeo?apiKey={key}&ip={ip}` - Get IP location

**Rate Limits**: 30,000 requests/month (free tier)

**Example Response**:
```json
{
  "ip": "192.0.2.1",
  "country_name": "Russia",
  "city": "Moscow",
  "latitude": 55.7558,
  "longitude": 37.6176,
  "time_zone": {
    "name": "Europe/Moscow"
  }
}
```

## Data Flow

### Threat Map Data Flow

1. Component mounts → calls `threatIntelligenceService.getThreats()`
2. Service checks `VITE_DATA_MODE`:
   - If `demo`: returns static demo data
   - If `live`: fetches from APIs
3. For `live` mode:
   - Fetch pulses from OTX
   - Extract IP indicators from pulses
   - Geolocate each IP
   - Transform to `ThreatLocation` format
   - Fetch reports from AbuseIPDB
   - Geolocate IPs
   - Transform to `ThreatLocation` format
4. Merge all threats and return
5. Component updates state and renders

### Incident List Data Flow

Similar to threats, but transforms data to `SecurityIncident` format instead.

## Adding a New Threat Intelligence Source

### Step 1: Create a Service File

Create `src/services/newapi.service.ts`:

```typescript
import { config } from '@/config/api.config';
import type { ThreatLocation, SecurityIncident } from '@/types/threat.types';

class NewAPIService {
  private baseUrl = 'https://api.example.com';
  private apiKey = import.meta.env.VITE_NEWAPI_KEY;

  async getThreats(): Promise<ThreatLocation[]> {
    try {
      const response = await fetch(`${this.baseUrl}/threats`, {
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
        },
      });

      const data = await response.json();
      return this.transformToThreats(data);
    } catch (error) {
      console.error('NewAPI error:', error);
      return [];
    }
  }

  private transformToThreats(data: any[]): ThreatLocation[] {
    return data.map(item => ({
      id: item.id,
      country: item.location.country,
      city: item.location.city,
      threatType: this.mapThreatType(item.type),
      severity: this.mapSeverity(item.severity),
      timestamp: this.formatTime(item.timestamp),
      lat: item.location.lat,
      lng: item.location.lng,
      source: 'NewAPI',
      ipAddress: item.ip,
      description: item.description,
    }));
  }

  private mapThreatType(type: string): string {
    // Map API threat types to your display types
    return type;
  }

  private mapSeverity(sev: number): "low" | "medium" | "high" | "critical" {
    if (sev > 8) return 'critical';
    if (sev > 6) return 'high';
    if (sev > 4) return 'medium';
    return 'low';
  }

  private formatTime(timestamp: string): string {
    // Format timestamp to relative time
    const date = new Date(timestamp);
    const now = new Date();
    const diffMins = Math.floor((now.getTime() - date.getTime()) / 60000);
    
    if (diffMins < 60) return `${diffMins} min ago`;
    // ... more formatting
    return date.toLocaleString();
  }
}

export const newAPIService = new NewAPIService();
```

### Step 2: Update Configuration

Add to `src/config/api.config.ts`:

```typescript
export const config = {
  // ... existing configs
  
  newAPI: {
    apiKey: import.meta.env.VITE_NEWAPI_KEY || '',
    baseUrl: 'https://api.example.com',
    enabled: !!import.meta.env.VITE_NEWAPI_KEY,
  },
};
```

### Step 3: Integrate into Main Service

Update `src/services/threat-intelligence.service.ts`:

```typescript
import { newAPIService } from './newapi.service';

class ThreatIntelligenceService {
  async getThreats(): Promise<ThreatLocation[]> {
    // ... existing code
    
    // Add new source
    if (config.newAPI.enabled) {
      const newThreats = await newAPIService.getThreats();
      threats.push(...newThreats);
    }
    
    return threats;
  }
}
```

### Step 4: Update Environment Variables

Add to `.env.example`:

```env
VITE_NEWAPI_KEY=your_newapi_key_here
```

## Error Handling Patterns

### Graceful Degradation

```typescript
async getThreats(): Promise<ThreatLocation[]> {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Failed to fetch threats:', error);
    // Return empty array, don't crash
    return [];
  }
}
```

### Fallback to Demo Data

```typescript
async getThreats(): Promise<ThreatLocation[]> {
  if (!isLiveMode()) {
    return demoThreats;
  }

  const threats = await this.fetchLiveThreats();
  
  // If no live data available, use demo
  if (threats.length === 0) {
    console.warn('No live data, using demo');
    return demoThreats;
  }

  return threats;
}
```

## Rate Limiting Strategies

### Caching

```typescript
class CachedAPIService {
  private cache = new Map<string, { data: any; timestamp: number }>();
  private CACHE_TTL = 30000; // 30 seconds

  async fetchWithCache(key: string, fetcher: () => Promise<any>) {
    const cached = this.cache.get(key);
    const now = Date.now();

    if (cached && (now - cached.timestamp) < this.CACHE_TTL) {
      return cached.data;
    }

    const data = await fetcher();
    this.cache.set(key, { data, timestamp: now });
    return data;
  }
}
```

### Request Throttling

```typescript
class ThrottledAPIService {
  private lastRequest = 0;
  private MIN_INTERVAL = 1000; // 1 second between requests

  async throttledFetch(url: string) {
    const now = Date.now();
    const timeSinceLastRequest = now - this.lastRequest;

    if (timeSinceLastRequest < this.MIN_INTERVAL) {
      await new Promise(resolve => 
        setTimeout(resolve, this.MIN_INTERVAL - timeSinceLastRequest)
      );
    }

    this.lastRequest = Date.now();
    return fetch(url);
  }
}
```

## Testing API Integration

### Test with Demo Mode

```typescript
// Set in .env
VITE_DATA_MODE=demo

// Or override in code for testing
const testService = new ThreatIntelligenceService();
config.dataMode = 'demo';
const threats = await testService.getThreats();
```

### Mock API Responses

```typescript
// For unit tests
jest.mock('@/services/otx.service', () => ({
  otxService: {
    getRecentPulses: jest.fn().mockResolvedValue([
      {
        id: '1',
        name: 'Test Threat',
        tags: ['test'],
        indicators: []
      }
    ])
  }
}));
```

## Performance Optimization

### Parallel API Calls

```typescript
async getThreats(): Promise<ThreatLocation[]> {
  const [otxThreats, abuseThreats] = await Promise.all([
    otxService.convertPulsesToThreats(await otxService.getRecentPulses()),
    abuseIPDBService.getRecentReports()
  ]);

  return [...otxThreats, ...abuseThreats];
}
```

### Pagination

```typescript
async getThreats(page: number = 1, limit: number = 10) {
  const offset = (page - 1) * limit;
  const threats = await this.fetchAllThreats();
  return threats.slice(offset, offset + limit);
}
```

## Security Best Practices

1. **Never expose API keys in client code**
   - Use environment variables
   - Validate on backend when possible

2. **Sanitize API responses**
   ```typescript
   private sanitize(data: any): any {
     // Remove potentially dangerous content
     return {
       ...data,
       description: data.description.replace(/<script>/gi, '')
     };
   }
   ```

3. **Use HTTPS only**
   - All APIs should use HTTPS
   - Never downgrade to HTTP

4. **Implement request signing** (for sensitive deployments)
   ```typescript
   private signRequest(params: any): string {
     const sorted = Object.keys(params).sort();
     const str = sorted.map(k => `${k}=${params[k]}`).join('&');
     return crypto.createHmac('sha256', SECRET).update(str).digest('hex');
   }
   ```

## Monitoring & Debugging

### Add Logging

```typescript
class LoggingService {
  log(message: string, data?: any) {
    if (import.meta.env.DEV) {
      console.log(`[${new Date().toISOString()}] ${message}`, data);
    }
  }

  error(message: string, error: any) {
    console.error(`[${new Date().toISOString()}] ERROR: ${message}`, error);
    // Send to error tracking service in production
  }
}
```

### Track API Usage

```typescript
class APIMetrics {
  private callCount = new Map<string, number>();

  trackCall(apiName: string) {
    const count = this.callCount.get(apiName) || 0;
    this.callCount.set(apiName, count + 1);
  }

  getStats() {
    return Object.fromEntries(this.callCount);
  }
}
```

## Resources

- [AlienVault OTX API Docs](https://otx.alienvault.com/api)
- [AbuseIPDB API Docs](https://docs.abuseipdb.com/)
- [IP Geolocation Docs](https://ipgeolocation.io/documentation.html)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [React Hooks Guide](https://react.dev/reference/react)

---

For more help, open an issue on GitHub or check the main README.md
