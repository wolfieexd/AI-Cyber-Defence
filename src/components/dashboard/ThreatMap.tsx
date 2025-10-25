import { useEffect, useState } from "react";
import { Globe, MapPin, Zap } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { threatIntelligenceService } from "@/services/threat-intelligence.service";
import type { ThreatLocation } from "@/types/threat.types";
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Add custom CSS for Leaflet map
const mapStyles = `
  .leaflet-container {
    background: #0f172a !important;
  }
  .leaflet-popup-content-wrapper {
    background: #1e293b !important;
    color: white !important;
    border-radius: 8px !important;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.5) !important;
  }
  .leaflet-popup-tip {
    background: #1e293b !important;
  }
  .leaflet-popup-content {
    margin: 0 !important;
  }
  @keyframes pulse {
    0%, 100% {
      opacity: 1;
    }
    50% {
      opacity: 0.5;
    }
  }
`;

// Inject styles
if (typeof document !== 'undefined') {
  const styleSheet = document.createElement('style');
  styleSheet.textContent = mapStyles;
  document.head.appendChild(styleSheet);
}

export function ThreatMap() {
  const [threats, setThreats] = useState<ThreatLocation[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch initial threats
  useEffect(() => {
    const fetchThreats = async () => {
      setLoading(true);
      try {
        const threatData = await threatIntelligenceService.getThreats();
        setThreats(threatData);
      } catch (error) {
        console.error('Failed to fetch threats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchThreats();

    // Refresh threats periodically
    const refreshInterval = setInterval(fetchThreats, 30000); // Every 30 seconds

    return () => clearInterval(refreshInterval);
  }, []);

  // Add random threats periodically for demo effect
  useEffect(() => {
    const interval = setInterval(() => {
      const newThreat = threatIntelligenceService.generateRandomThreat();
      setThreats(prev => [newThreat, ...prev.slice(0, 7)]);
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical": return "destructive";
      case "high": return "destructive";
      case "medium": return "warning";
      default: return "secondary";
    }
  };

  const getThreatIcon = (threatType: string) => {
    switch (threatType) {
      case "DDoS Attack": return "🔥";
      case "Malware": return "🦠";
      case "Phishing": return "🎣";
      case "Port Scan": return "🔍";
      case "Data Breach": return "💀";
      case "Ransomware": return "🔒";
      case "Botnet Activity": return "🤖";
      case "APT Campaign": return "🎯";
      default: return "⚠️";
    }
  };

  // Create custom marker icons for different threat severities
  const createCustomIcon = (severity: string) => {
    const color = severity === "high" || severity === "critical" ? "#ef4444" :
                  severity === "medium" ? "#f59e0b" : "#10b981";

    return L.divIcon({
      html: `<div style="
        width: 16px;
        height: 16px;
        background-color: ${color};
        border: 2px solid white;
        border-radius: 50%;
        box-shadow: 0 0 8px ${color}80;
        animation: pulse 2s infinite;
      "></div>`,
      className: 'custom-threat-marker',
      iconSize: [16, 16],
      iconAnchor: [8, 8],
    });
  };

  // Component to fit map bounds to show all threats
  const FitBounds = ({ threats }: { threats: ThreatLocation[] }) => {
    const map = useMap();

    useEffect(() => {
      if (threats.length > 0) {
        const bounds = L.latLngBounds(threats.map(threat => [threat.lat, threat.lng]));
        map.fitBounds(bounds, { padding: [20, 20] });
      }
    }, [threats, map]);

    return null;
  };

  return (
    <Card className="col-span-3 border-slate-800/50 bg-card/50 backdrop-blur-sm">
      <CardHeader className="border-b border-slate-800/50">
        <CardTitle className="flex items-center gap-2 text-white">
          <Globe className="h-5 w-5 text-blue-500" />
          Global Threat Intelligence
          <div className="ml-auto flex items-center gap-2">
            <div className="h-2 w-2 bg-blue-500 rounded-full animate-pulse-subtle"></div>
            <span className="text-sm text-blue-400 font-medium">Live Feed</span>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        {loading ? (
          <div className="flex items-center justify-center p-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <>
            <div className="relative h-80 border border-slate-700/30 rounded-xl overflow-hidden">
              <MapContainer
                center={[20, 0]}
                zoom={2}
                style={{ height: '100%', width: '100%' }}
                className="rounded-xl"
              >
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <FitBounds threats={threats} />
                {threats.map((threat) => (
                  <Marker
                    key={threat.id}
                    position={[threat.lat, threat.lng]}
                    icon={createCustomIcon(threat.severity)}
                  >
                    <Popup className="custom-popup">
                      <div className="p-2 min-w-48">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-lg">{getThreatIcon(threat.threatType)}</span>
                          <div>
                            <h3 className="font-semibold text-gray-900">{threat.threatType}</h3>
                            <p className="text-sm text-gray-600">{threat.country}</p>
                          </div>
                        </div>
                        <div className="space-y-1 text-xs">
                          <div className="flex justify-between">
                            <span className="text-gray-500">Severity:</span>
                            <Badge variant={getSeverityColor(threat.severity)} className="text-xs">
                              {threat.severity.toUpperCase()}
                            </Badge>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-500">Time:</span>
                            <span className="text-gray-700">{threat.timestamp}</span>
                          </div>
                        </div>
                      </div>
                    </Popup>
                  </Marker>
                ))}
              </MapContainer>
            </div>

        {/* Enhanced recent threats list */}
        <div className="mt-6 space-y-3 max-h-36 overflow-y-auto scrollbar-thin scrollbar-thumb-slate-600 scrollbar-track-slate-800">
          {threats.slice(0, 4).map((threat) => (
            <div key={threat.id} className="flex items-center justify-between p-3 bg-slate-800/30 border border-slate-700/50 rounded-lg hover:bg-slate-800/50 transition-all duration-200 group">
              <div className="flex items-center gap-3">
                <span className="text-lg">{getThreatIcon(threat.threatType)}</span>
                <div>
                  <p className="text-sm font-medium text-white group-hover:text-blue-400 transition-colors">{threat.threatType}</p>
                  <p className="text-xs text-slate-400">
                    <span className="text-slate-300 font-medium">{threat.country}</span> • {threat.timestamp}
                  </p>
                </div>
              </div>
              <Badge variant={getSeverityColor(threat.severity)} className="font-medium">
                {threat.severity.toUpperCase()}
              </Badge>
            </div>
          ))}
        </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}