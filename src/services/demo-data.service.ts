import type { ThreatLocation, SecurityIncident } from '@/types/threat.types';

// Demo data for when APIs are not configured
export const demoThreats: ThreatLocation[] = [
  { id: "1", country: "Russia", city: "Moscow", threatType: "DDoS Attack", severity: "high", timestamp: "2 min ago", lat: 55.7558, lng: 37.6176, source: "Demo" },
  { id: "2", country: "China", city: "Beijing", threatType: "Port Scan", severity: "medium", timestamp: "5 min ago", lat: 39.9042, lng: 116.4074, source: "Demo" },
  { id: "3", country: "North Korea", city: "Pyongyang", threatType: "Malware", severity: "high", timestamp: "8 min ago", lat: 39.0392, lng: 125.7625, source: "Demo" },
  { id: "4", country: "Iran", city: "Tehran", threatType: "Phishing", severity: "low", timestamp: "12 min ago", lat: 35.6762, lng: 51.4246, source: "Demo" },
  { id: "5", country: "Unknown", city: "Tor Network", threatType: "Data Breach", severity: "critical", timestamp: "15 min ago", lat: 0, lng: 0, source: "Demo" },
];

export const demoIncidents: SecurityIncident[] = [
  { id: 1, title: "AI-Detected DDoS Attack Vector", severity: "high", status: "auto-mitigating", time: "2 min ago", confidence: 98, source: "Demo" },
  { id: 2, title: "ML Anomaly: Unusual Login Pattern", severity: "medium", status: "resolved", time: "15 min ago", confidence: 87, source: "Demo" },
  { id: 3, title: "Neural Net Alert: Port Scan Activity", severity: "low", status: "monitoring", time: "1 hour ago", confidence: 76, source: "Demo" },
  { id: 4, title: "AI Signature: Advanced Malware Detected", severity: "high", status: "contained", time: "2 hours ago", confidence: 94, source: "Demo" },
];

class DemoDataService {
  generateRandomThreat(): ThreatLocation {
    const countries = [
      { name: "Russia", city: "Moscow", lat: 55.7558, lng: 37.6176 },
      { name: "China", city: "Beijing", lat: 39.9042, lng: 116.4074 },
      { name: "Iran", city: "Tehran", lat: 35.6762, lng: 51.4246 },
      { name: "North Korea", city: "Pyongyang", lat: 39.0392, lng: 125.7625 },
      { name: "Unknown", city: "Tor Network", lat: 0, lng: 0 },
    ];

    const threatTypes = ["DDoS Attack", "Malware", "Phishing", "Port Scan", "Data Breach", "Ransomware", "Botnet Activity"];
    const severities: Array<"low" | "medium" | "high" | "critical"> = ["low", "medium", "high", "critical"];

    const country = countries[Math.floor(Math.random() * countries.length)];
    
    return {
      id: Date.now().toString(),
      country: country.name,
      city: country.city,
      threatType: threatTypes[Math.floor(Math.random() * threatTypes.length)],
      severity: severities[Math.floor(Math.random() * severities.length)],
      timestamp: "Just now",
      lat: country.lat,
      lng: country.lng,
      source: "Demo",
    };
  }

  generateRandomIncident(): SecurityIncident {
    const titles = [
      "AI-Detected DDoS Attack Vector",
      "ML Anomaly: Unusual Login Pattern",
      "Neural Net Alert: Port Scan Activity",
      "AI Signature: Advanced Malware Detected",
      "Zero-Day Exploit Detected",
      "Suspicious Outbound Traffic",
      "Credential Stuffing Attempt",
      "SQL Injection Blocked",
    ];

    const severities: Array<"low" | "medium" | "high" | "critical"> = ["low", "medium", "high", "critical"];
    const statuses: Array<SecurityIncident['status']> = ["monitoring", "investigating", "auto-mitigating", "contained", "resolved"];

    return {
      id: Date.now(),
      title: titles[Math.floor(Math.random() * titles.length)],
      severity: severities[Math.floor(Math.random() * severities.length)],
      status: statuses[Math.floor(Math.random() * statuses.length)],
      time: "Just now",
      confidence: 70 + Math.floor(Math.random() * 30),
      source: "Demo",
    };
  }
}

export const demoDataService = new DemoDataService();
