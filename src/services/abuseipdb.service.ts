import { config } from '@/config/api.config';
import type { AbuseIPDBReport, ThreatLocation, SecurityIncident } from '@/types/threat.types';

class AbuseIPDBService {
  private baseUrl = config.abuseIPDB.baseUrl;
  private apiKey = config.abuseIPDB.apiKey;

  async checkIP(ip: string): Promise<AbuseIPDBReport | null> {
    if (!config.abuseIPDB.enabled) {
      return null;
    }

    try {
      const response = await fetch(
        `${this.baseUrl}/check?ipAddress=${ip}&maxAgeInDays=90&verbose`,
        {
          headers: {
            'Key': this.apiKey,
            'Accept': 'application/json',
          },
        }
      );

      if (!response.ok) {
        throw new Error(`AbuseIPDB API error: ${response.status}`);
      }

      const data = await response.json();
      return data.data;
    } catch (error) {
      console.error('Failed to check IP with AbuseIPDB:', error);
      return null;
    }
  }

  async getRecentReports(limit: number = 10): Promise<ThreatLocation[]> {
    if (!config.abuseIPDB.enabled) {
      return [];
    }

    try {
      // Use proxy if enabled
      const url = config.proxy.enabled
        ? `${config.abuseIPDB.baseUrl}?endpoint=abuseipdb-blacklist`
        : `${config.abuseIPDB.baseUrl}/blacklist?confidenceMinimum=90&limit=${limit}`;
      
      const headers: Record<string, string> = config.proxy.enabled
        ? {}
        : {
            'Key': this.apiKey,
            'Accept': 'application/json',
          };

      const response = await fetch(url, { headers });

      if (!response.ok) {
        throw new Error(`AbuseIPDB API error: ${response.status}`);
      }

      const data = await response.json();
      return this.convertToThreats(data.data || []);
    } catch (error) {
      console.error('Failed to fetch AbuseIPDB reports:', error);
      return [];
    }
  }

  private async convertToThreats(reports: any[]): Promise<ThreatLocation[]> {
    const threats: ThreatLocation[] = [];

    for (const report of reports.slice(0, 5)) {
      try {
        const geoData = await this.getIPGeolocation(report.ipAddress);
        
        threats.push({
          id: `abuseipdb-${report.ipAddress}`,
          country: report.countryCode || geoData?.country_name || 'Unknown',
          city: geoData?.city || 'Unknown',
          threatType: this.categorizeThreatFromReport(report),
          severity: this.calculateSeverity(report.abuseConfidenceScore),
          timestamp: this.formatTimestamp(report.lastReportedAt),
          lat: geoData?.latitude || 0,
          lng: geoData?.longitude || 0,
          source: 'AbuseIPDB',
          ipAddress: report.ipAddress,
          description: `Abuse confidence: ${report.abuseConfidenceScore}% | Reports: ${report.totalReports}`,
        });
      } catch (error) {
        console.error('Failed to convert report:', error);
      }
    }

    return threats;
  }

  async convertToIncidents(reports: any[]): Promise<SecurityIncident[]> {
    return reports.slice(0, 4).map((report, index) => ({
      id: Date.now() + index + 1000,
      title: `Malicious IP Activity: ${report.ipAddress} (${report.countryCode})`,
      severity: this.calculateSeverity(report.abuseConfidenceScore),
      status: report.abuseConfidenceScore > 95 ? 'contained' : 'monitoring',
      time: this.formatTimestamp(report.lastReportedAt),
      confidence: report.abuseConfidenceScore,
      source: 'AbuseIPDB',
      details: `ISP: ${report.isp} | Reports: ${report.totalReports}`,
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
      return null;
    }
  }

  private categorizeThreatFromReport(report: any): string {
    if (report.usageType?.includes('Data Center')) return 'Botnet Activity';
    if (report.abuseConfidenceScore > 90) return 'Malicious Activity';
    if (report.totalReports > 100) return 'Mass Scanning';
    return 'Suspicious Activity';
  }

  private calculateSeverity(score: number): "low" | "medium" | "high" | "critical" {
    if (score >= 90) return 'critical';
    if (score >= 75) return 'high';
    if (score >= 50) return 'medium';
    return 'low';
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

export const abuseIPDBService = new AbuseIPDBService();
