import { useEffect, useState } from "react";
import { Globe, MapPin, Zap } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { threatIntelligenceService } from "@/services/threat-intelligence.service";
import type { ThreatLocation } from "@/types/threat.types";

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
            <div className="relative h-80 bg-gradient-to-br from-slate-900/50 to-slate-800/30 border border-slate-700/30 rounded-xl overflow-hidden">
          {/* Professional world map visualization */}
          <div className="absolute inset-0">
            <div className="h-full w-full bg-gradient-to-r from-blue-600/5 via-blue-500/10 to-blue-600/5 opacity-60"></div>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1),transparent_70%)]"></div>
          </div>
          
          {/* Enhanced threat indicators */}
          <div className="absolute inset-0 p-4">
            {threats.map((threat, index) => (
              <div
                key={threat.id}
                className={`absolute animate-fade-in cursor-pointer`}
                style={{
                  left: `${Math.max(10, Math.min(90, (threat.lng + 180) / 360 * 100))}%`,
                  top: `${Math.max(10, Math.min(90, (90 - threat.lat) / 180 * 100))}%`,
                  animationDelay: `${index * 0.1}s`
                }}
              >
                <div className="relative group">
                  <div className={`h-4 w-4 rounded-full animate-pulse-subtle border-2 border-white/30 shadow-lg ${
                    threat.severity === "high" ? "bg-threat-critical shadow-threat-critical/50" :
                    threat.severity === "medium" ? "bg-threat-medium shadow-threat-medium/50" : 
                    "bg-threat-low shadow-threat-low/50"
                  }`}></div>
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-3 opacity-0 group-hover:opacity-100 transition-all duration-200">
                    <div className="bg-slate-900/95 border border-slate-700 rounded-lg p-3 text-xs whitespace-nowrap shadow-xl backdrop-blur-sm">
                      <div className="font-semibold text-white">{threat.country}</div>
                      <div className="text-slate-300">{threat.threatType}</div>
                      <div className="text-slate-400">{threat.timestamp}</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
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