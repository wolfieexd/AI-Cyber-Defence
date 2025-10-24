export interface ThreatLocation {
  id: string;
  country: string;
  city: string;
  threatType: string;
  severity: "low" | "medium" | "high" | "critical";
  timestamp: string;
  lat: number;
  lng: number;
  source?: string;
  ipAddress?: string;
  description?: string;
}

export interface SecurityIncident {
  id: number;
  title: string;
  severity: "low" | "medium" | "high" | "critical";
  status: "monitoring" | "investigating" | "auto-mitigating" | "contained" | "resolved";
  time: string;
  confidence: number;
  source?: string;
  details?: string;
}

export interface OTXPulse {
  id: string;
  name: string;
  description: string;
  created: string;
  tags: string[];
  references: string[];
  indicators: Array<{
    type: string;
    indicator: string;
    description: string;
  }>;
}

export interface AbuseIPDBReport {
  ipAddress: string;
  abuseConfidenceScore: number;
  countryCode: string;
  usageType: string;
  isp: string;
  domain: string;
  totalReports: number;
  lastReportedAt: string;
}

export interface GeoLocation {
  ip: string;
  country_name: string;
  city: string;
  latitude: number;
  longitude: number;
  time_zone: {
    name: string;
  };
}
