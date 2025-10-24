import { config, isLiveMode } from '@/config/api.config';
import { otxService } from './otx.service';
import { abuseIPDBService } from './abuseipdb.service';
import { demoThreats, demoIncidents, demoDataService } from './demo-data.service';
import type { ThreatLocation, SecurityIncident } from '@/types/threat.types';

class ThreatIntelligenceService {
  async getThreats(): Promise<ThreatLocation[]> {
    if (!isLiveMode()) {
      console.log('Running in DEMO mode - using simulated data');
      return demoThreats;
    }

    const threats: ThreatLocation[] = [];

    try {
      // Fetch from OTX
      if (config.otx.enabled) {
        const pulses = await otxService.getRecentPulses(5);
        const otxThreats = await otxService.convertPulsesToThreats(pulses);
        threats.push(...otxThreats);
      }

      // Fetch from AbuseIPDB
      if (config.abuseIPDB.enabled) {
        const abuseThreats = await abuseIPDBService.getRecentReports(5);
        threats.push(...abuseThreats);
      }

      // If no APIs configured or no data, use demo
      if (threats.length === 0) {
        console.warn('No live threat data available, falling back to demo data');
        return demoThreats;
      }

      return threats;
    } catch (error) {
      console.error('Failed to fetch threat data:', error);
      return demoThreats;
    }
  }

  async getIncidents(): Promise<SecurityIncident[]> {
    if (!isLiveMode()) {
      console.log('Running in DEMO mode - using simulated incidents');
      return demoIncidents;
    }

    const incidents: SecurityIncident[] = [];

    try {
      // Fetch from OTX
      if (config.otx.enabled) {
        const pulses = await otxService.getRecentPulses(8);
        const otxIncidents = await otxService.convertPulsesToIncidents(pulses);
        incidents.push(...otxIncidents);
      }

      // Fetch from AbuseIPDB
      if (config.abuseIPDB.enabled) {
        const reports = await abuseIPDBService.getRecentReports(5);
        const rawReports = reports.map(t => ({
          ipAddress: t.ipAddress || 'Unknown',
          abuseConfidenceScore: 85,
          countryCode: t.country,
          totalReports: 50,
          lastReportedAt: new Date().toISOString(),
          isp: 'Unknown',
        }));
        const abuseIncidents = await abuseIPDBService.convertToIncidents(rawReports);
        incidents.push(...abuseIncidents);
      }

      // If no APIs configured or no data, use demo
      if (incidents.length === 0) {
        console.warn('No live incident data available, falling back to demo data');
        return demoIncidents;
      }

      // Sort by time and limit
      return incidents.slice(0, 6);
    } catch (error) {
      console.error('Failed to fetch incident data:', error);
      return demoIncidents;
    }
  }

  generateRandomThreat(): ThreatLocation {
    return demoDataService.generateRandomThreat();
  }

  generateRandomIncident(): SecurityIncident {
    return demoDataService.generateRandomIncident();
  }
}

export const threatIntelligenceService = new ThreatIntelligenceService();
