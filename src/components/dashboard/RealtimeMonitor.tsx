import { useEffect, useState } from "react";
import { Activity, Network, Server, Database } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface SystemMetric {
  id: string;
  name: string;
  value: number;
  unit: string;
  status: "normal" | "warning" | "critical";
  icon: any;
}

export function RealtimeMonitor() {
  const [metrics, setMetrics] = useState<SystemMetric[]>([
    { id: "cpu", name: "CPU Usage", value: 45, unit: "%", status: "normal", icon: Server },
    { id: "network", name: "Network Traffic", value: 2.3, unit: "GB/s", status: "normal", icon: Network },
    { id: "threats", name: "Active Threats", value: 12, unit: "", status: "warning", icon: Activity },
    { id: "db", name: "Database Load", value: 78, unit: "%", status: "normal", icon: Database },
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics(prev => prev.map(metric => ({
        ...metric,
        value: metric.id === "threats" 
          ? Math.floor(Math.random() * 20) + 5
          : metric.value + (Math.random() - 0.5) * 10,
      })));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "critical": return "destructive";
      case "warning": return "warning";
      default: return "success";
    }
  };

  return (
    <Card className="col-span-2 border-slate-800/50 bg-card/50 backdrop-blur-sm">
      <CardHeader className="border-b border-slate-800/50">
        <CardTitle className="flex items-center gap-2 text-white">
          <Activity className="h-5 w-5 text-blue-500" />
          Real-time System Monitor
          <div className="ml-auto flex items-center gap-2">
            <div className="h-2 w-2 bg-success rounded-full animate-pulse-subtle"></div>
            <span className="text-sm text-success font-medium">Live</span>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="grid grid-cols-2 gap-4">
          {metrics.map((metric) => {
            const Icon = metric.icon;
            return (
              <div
                key={metric.id}
                className="flex items-center justify-between p-4 bg-slate-800/30 border border-slate-700/50 rounded-xl hover:bg-slate-800/50 transition-all duration-200 group"
              >
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 bg-blue-600/10 border border-blue-600/20 rounded-xl flex items-center justify-center group-hover:bg-blue-600/20 transition-colors">
                    <Icon className="h-6 w-6 text-blue-500" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-300">{metric.name}</p>
                    <p className="text-xl font-bold text-white">
                      {typeof metric.value === "number" ? metric.value.toFixed(1) : metric.value}
                      {metric.unit}
                    </p>
                  </div>
                </div>
                <Badge variant={getStatusColor(metric.status)} className="font-medium">
                  {metric.status.toUpperCase()}
                </Badge>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}