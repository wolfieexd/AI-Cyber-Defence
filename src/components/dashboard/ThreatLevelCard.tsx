import { AlertTriangle, Shield, TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

interface ThreatLevelCardProps {
  level: "low" | "medium" | "high" | "critical";
  count: number;
  percentage: number;
  trend: "up" | "down";
}

const threatConfig = {
  low: { 
    color: "bg-threat-low", 
    icon: Shield, 
    label: "Low Risk",
    bgGradient: "from-threat-low/10 to-threat-low/5",
    textColor: "text-threat-low"
  },
  medium: { 
    color: "bg-threat-medium", 
    icon: AlertTriangle, 
    label: "Medium Risk",
    bgGradient: "from-threat-medium/10 to-threat-medium/5",
    textColor: "text-threat-medium"
  },
  high: { 
    color: "bg-threat-high", 
    icon: AlertTriangle, 
    label: "High Risk",
    bgGradient: "from-threat-high/10 to-threat-high/5",
    textColor: "text-threat-high"
  },
  critical: { 
    color: "bg-threat-critical", 
    icon: AlertTriangle, 
    label: "Critical Threat",
    bgGradient: "from-threat-critical/10 to-threat-critical/5",
    textColor: "text-threat-critical"
  },
};

export function ThreatLevelCard({ level, count, percentage, trend }: ThreatLevelCardProps) {
  const config = threatConfig[level];
  const Icon = config.icon;

  return (
    <Card className="relative overflow-hidden group hover:shadow-xl transition-all duration-300 border-slate-800/50 bg-card/50 backdrop-blur-sm">
      <div className={`absolute inset-0 bg-gradient-to-br ${config.bgGradient} opacity-40`} />
      <CardHeader className="relative flex flex-row items-center justify-between space-y-0 pb-3">
        <CardTitle className="text-sm font-semibold text-slate-200">
          {config.label}
        </CardTitle>
        <div className={`h-10 w-10 ${config.color} rounded-xl flex items-center justify-center shadow-lg`}>
          <Icon className="h-5 w-5 text-white" />
        </div>
      </CardHeader>
      <CardContent className="relative">
        <div className="flex items-center justify-between mb-4">
          <div className="text-3xl font-bold text-white">{count}</div>
          <Badge 
            variant={trend === "up" ? "destructive" : "success"}
            className="font-medium"
          >
            <TrendingUp className={`h-3 w-3 mr-1 ${trend === "down" ? "rotate-180" : ""}`} />
            {percentage}%
          </Badge>
        </div>
        <Progress 
          value={Math.min(percentage, 100)} 
          className="h-2 bg-slate-800" 
        />
        <div className="mt-3 text-xs font-medium text-slate-400">
          {trend === "up" ? "↑ Increased" : "↓ Decreased"} from last week
        </div>
      </CardContent>
    </Card>
  );
}