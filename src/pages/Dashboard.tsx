import { ThreatLevelCard } from "@/components/dashboard/ThreatLevelCard";
import { RealtimeMonitor } from "@/components/dashboard/RealtimeMonitor";
import { ThreatMap } from "@/components/dashboard/ThreatMap";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Activity, Shield, AlertTriangle, CheckCircle, Clock, Target, Bot, Zap } from "lucide-react";
import { useEffect, useState } from "react";

export default function Dashboard() {
  const recentIncidents = [
    { id: 1, title: "AI-Detected DDoS Attack Vector", severity: "high", status: "auto-mitigating", time: "2 min ago", confidence: 98 },
    { id: 2, title: "ML Anomaly: Unusual Login Pattern", severity: "medium", status: "resolved", time: "15 min ago", confidence: 87 },
    { id: 3, title: "Neural Net Alert: Port Scan Activity", severity: "low", status: "monitoring", time: "1 hour ago", confidence: 76 },
    { id: 4, title: "AI Signature: Advanced Malware Detected", severity: "high", status: "contained", time: "2 hours ago", confidence: 94 },
  ];

  const [currentTime, setCurrentTime] = useState(() => new Date());
  const [timeZone] = useState(() => Intl.DateTimeFormat().resolvedOptions().timeZone);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formattedTime = currentTime.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "high": return "destructive";
      case "medium": return "warning";
      default: return "secondary";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "resolved": return CheckCircle;
      case "auto-mitigating": return Bot;
      case "investigating": return Target;
      case "contained": return Shield;
      default: return Clock;
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-4xl font-bold text-white tracking-tight mb-2">
              AI-Enabled Cyber Safety Portal
            </h1>
            <p className="text-slate-400 text-lg font-medium">
              Intelligent threat detection and automated incident response for defence systems
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <div className="text-2xl font-bold text-white">{formattedTime}</div>
              <div className="text-sm text-slate-400">{timeZone}</div>
            </div>
            <div className="h-12 w-px bg-slate-700"></div>
            <div className="text-right">
              <div className="text-sm font-semibold text-white">AI STATUS</div>
              <div className="text-xs text-green-400 font-medium">OPERATIONAL</div>
            </div>
          </div>
        </div>
        <div className="h-px bg-gradient-to-r from-emerald-600/50 via-blue-500/50 to-transparent"></div>
      </div>

      {/* Threat Level Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <ThreatLevelCard level="critical" count={3} percentage={12} trend="up" />
        <ThreatLevelCard level="high" count={8} percentage={8} trend="up" />
        <ThreatLevelCard level="medium" count={24} percentage={5} trend="down" />
        <ThreatLevelCard level="low" count={67} percentage={15} trend="down" />
      </div>

      {/* Main Dashboard Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        <RealtimeMonitor />
        <ThreatMap />
      </div>

      {/* Recent Incidents */}
      <Card className="border-slate-800/50 bg-card/50 backdrop-blur-sm">
        <CardHeader className="border-b border-slate-800/50">
          <CardTitle className="flex items-center gap-2 text-white">
            <AlertTriangle className="h-5 w-5 text-blue-500" />
            Recent Security Incidents
            <div className="ml-auto text-sm font-medium text-slate-400">
              Last 24 hours
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-4">
            {recentIncidents.map((incident) => {
              const StatusIcon = getStatusIcon(incident.status);
              return (
                <div key={incident.id} className="flex items-center justify-between p-4 bg-slate-800/30 border border-slate-700/50 rounded-xl hover:bg-slate-800/50 transition-all duration-200 group">
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 bg-blue-600/10 border border-blue-600/20 rounded-xl flex items-center justify-center group-hover:bg-blue-600/20 transition-colors">
                      <StatusIcon className="h-5 w-5 text-blue-500" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-white group-hover:text-blue-400 transition-colors">{incident.title}</h4>
                      <div className="flex items-center gap-2">
                        <p className="text-sm text-slate-400 font-medium">{incident.time}</p>
                        <span className="text-slate-600">•</span>
                        <div className="flex items-center gap-1">
                          <Bot className="h-3 w-3 text-emerald-500" />
                          <span className="text-xs text-emerald-400 font-medium">AI Confidence: {incident.confidence}%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge variant={getSeverityColor(incident.severity)} className="font-medium">
                      {incident.severity.toUpperCase()}
                    </Badge>
                    <Badge variant="outline" className="border-slate-600 text-slate-300">
                      {incident.status.toUpperCase()}
                    </Badge>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}