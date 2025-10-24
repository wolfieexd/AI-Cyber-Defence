import { config } from '@/config/api.config';
import type { OTXPulse, ThreatLocation, SecurityIncident } from '@/types/threat.types';

class OTXService {
  private baseUrl = config.otx.baseUrl;
  private apiKey = config.otx.apiKey;

  async getRecentPulses(limit: number = 10): Promise<OTXPulse[]> {
    if (!config.otx.enabled) {
      console.warn('OTX API key not configured, using demo data');
      return [];
    }

    try {
      // Use proxy if enabled
      const url = config.proxy.enabled 
        ? `${config.otx.baseUrl}?endpoint=otx-pulses`
        : `${config.otx.baseUrl}/pulses/subscribed?limit=${limit}`;
      
      const headers: Record<string, string> = config.proxy.enabled 
        ? {} 
        : { 'X-OTX-API-KEY': this.apiKey };

      const response = await fetch(url, { headers });

      if (!response.ok) {
        throw new Error(`OTX API error: ${response.status}`);
      }

      const data = await response.json();
      return data.results || [];
    } catch (error) {
      console.error('Failed to fetch OTX pulses:', error);
      return [];
    }
  }

  async convertPulsesToThreats(pulses: OTXPulse[]): Promise<ThreatLocation[]> {
    const threats: ThreatLocation[] = [];

    for (const pulse of pulses) {
      // Extract IP indicators
      const ipIndicators = pulse.indicators?.filter(ind => 
        ind.type === 'IPv4' || ind.type === 'IPv6'
      ) || [];

      for (const indicator of ipIndicators.slice(0, 3)) {
        try {
          const geoData = await this.getIPGeolocation(indicator.indicator);
          if (geoData) {
            threats.push({
              id: `${pulse.id}-${indicator.indicator}`,
              country: geoData.country_name,
              city: geoData.city || 'Unknown',
              threatType: this.categorizeThreat(pulse.tags),
              severity: this.calculateSeverity(pulse.tags),
              timestamp: this.formatTimestamp(pulse.created),
              lat: geoData.latitude,
              lng: geoData.longitude,
              source: 'AlienVault OTX',
              ipAddress: indicator.indicator,
              description: pulse.name,
            });
          }
        } catch (error) {
          console.error('Failed to geolocate IP:', error);
        }
      }
    }

    return threats;
  }

  async convertPulsesToIncidents(pulses: OTXPulse[]): Promise<SecurityIncident[]> {
    return pulses.slice(0, 6).map((pulse, index) => ({
      id: Date.now() + index,
      title: `${pulse.name.substring(0, 60)}${pulse.name.length > 60 ? '...' : ''}`,
      severity: this.calculateSeverity(pulse.tags),
      status: this.determineStatus(pulse.tags),
      time: this.formatTimestamp(pulse.created),
      confidence: this.calculateConfidence(pulse),
      source: 'AlienVault OTX',
      details: pulse.description,
    }));
  }

  private async getIPGeolocation(ip: string) {
    if (!config.ipGeo.enabled) {
      return null;
    }

    try {
      // Use proxy if enabled
      const url = config.proxy.enabled
        ? `${config.ipGeo.baseUrl}?ip=${ip}`
        : `${config.ipGeo.baseUrl}/ipgeo?apiKey=${config.ipGeo.apiKey}&ip=${ip}`;
      
      const response = await fetch(url);
      
      if (!response.ok) {
        return null;
      }

      return await response.json();
    } catch (error) {
      console.error('Geolocation failed:', error);
      return null;
    }
  }

  private categorizeThreat(tags: string[]): string {
    const tagStr = tags.join(' ').toLowerCase();
    
    if (tagStr.includes('ddos') || tagStr.includes('dos')) return 'DDoS Attack';
    if (tagStr.includes('malware') || tagStr.includes('trojan')) return 'Malware';
    if (tagStr.includes('phishing')) return 'Phishing';
    if (tagStr.includes('ransomware')) return 'Ransomware';
    if (tagStr.includes('apt') || tagStr.includes('targeted')) return 'APT Campaign';
    if (tagStr.includes('scan')) return 'Port Scan';
    if (tagStr.includes('exploit')) return 'Exploit';
    if (tagStr.includes('botnet')) return 'Botnet Activity';
    
    return 'Suspicious Activity';
  }

  private calculateSeverity(tags: string[]): "low" | "medium" | "high" | "critical" {
    const tagStr = tags.join(' ').toLowerCase();
    
    if (tagStr.includes('critical') || tagStr.includes('apt') || tagStr.includes('ransomware')) {
      return 'critical';
    }
    if (tagStr.includes('high') || tagStr.includes('malware') || tagStr.includes('exploit')) {
      return 'high';
    }
    if (tagStr.includes('medium') || tagStr.includes('phishing')) {
      return 'medium';
    }
    
    return 'low';
  }

  private determineStatus(tags: string[]): SecurityIncident['status'] {
    const tagStr = tags.join(' ').toLowerCase();
    
    if (tagStr.includes('mitigated') || tagStr.includes('resolved')) return 'resolved';
    if (tagStr.includes('contained')) return 'contained';
    if (tagStr.includes('active') || tagStr.includes('ongoing')) return 'auto-mitigating';
    if (tagStr.includes('investigating')) return 'investigating';
    
    return 'monitoring';
  }

  private calculateConfidence(pulse: OTXPulse): number {
    let confidence = 70;
    
    // More indicators = higher confidence
    if (pulse.indicators && pulse.indicators.length > 10) confidence += 10;
    if (pulse.indicators && pulse.indicators.length > 50) confidence += 10;
    
    // References add credibility
    if (pulse.references && pulse.references.length > 0) confidence += 5;
    
    // Certain tags indicate vetted threats
    const tagStr = pulse.tags.join(' ').toLowerCase();
    if (tagStr.includes('verified') || tagStr.includes('confirmed')) confidence += 10;
    
    return Math.min(99, confidence);
  }

  private formatTimestamp(dateStr: string): string {
    const date = new Date(dateStr);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins} min ago`;
    if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
    if (diffDays < 7) return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
    
    return date.toLocaleDateString();
  }
}

export const otxService = new OTXService();
