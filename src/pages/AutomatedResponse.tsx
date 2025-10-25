import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Bot, Play, Pause, Settings, Activity, CheckCircle, AlertTriangle, Clock, Zap, Target } from "lucide-react";
import { toast } from "@/hooks/use-toast";

export default function AutomatedResponse() {
  const automatedResponses = [
    { 
      id: 1, 
      name: "DDoS Mitigation Protocol", 
      status: "active", 
      lastTriggered: "2 min ago", 
      successRate: 98,
      description: "Automatically detects and mitigates distributed denial of service attacks"
    },
    { 
      id: 2, 
      name: "Malware Containment System", 
      status: "active", 
      lastTriggered: "15 min ago", 
      successRate: 94,
      description: "Isolates infected systems and prevents malware spread"
    },
    { 
      id: 3, 
      name: "Intrusion Response Bot", 
      status: "standby", 
      lastTriggered: "2 hours ago", 
      successRate: 91,
      description: "Responds to unauthorized access attempts with automated countermeasures"
    },
    { 
      id: 4, 
      name: "Data Breach Prevention", 
      status: "active", 
      lastTriggered: "1 hour ago", 
      successRate: 96,
      description: "Monitors and prevents unauthorized data exfiltration attempts"
    },
  ];

  const recentActions = [
    { id: 1, action: "Blocked suspicious IP range", timestamp: "3 min ago", type: "network", success: true },
    { id: 2, action: "Quarantined malicious file", timestamp: "8 min ago", type: "malware", success: true },
    { id: 3, action: "Reset compromised user session", timestamp: "12 min ago", type: "access", success: true },
    { id: 4, action: "Applied firewall rule update", timestamp: "25 min ago", type: "network", success: true },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "success";
      case "standby": return "warning";
      default: return "secondary";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active": return Play;
      case "standby": return Pause;
      default: return Settings;
    }
  };

  const getActionIcon = (type: string) => {
    switch (type) {
      case "network": return Activity;
      case "malware": return AlertTriangle;
      case "access": return Target;
      default: return Zap;
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-4xl font-bold text-white tracking-tight mb-2">
              Automated Response Systems
            </h1>
            <p className="text-slate-400 text-lg font-medium">
              AI-powered automated incident response and threat mitigation protocols
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <div className="text-2xl font-bold text-white">4/4</div>
              <div className="text-sm text-slate-400">Systems Online</div>
            </div>
          </div>
        </div>
        <div className="h-px bg-gradient-to-r from-emerald-600/50 via-blue-500/50 to-transparent"></div>
      </div>

      {/* System Status Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="border-slate-800/50 bg-card/50 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-400">Active Responses</CardTitle>
            <Bot className="h-4 w-4 text-emerald-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">3</div>
            <p className="text-xs text-emerald-400">+1 from last hour</p>
          </CardContent>
        </Card>

        <Card className="border-slate-800/50 bg-card/50 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-400">Success Rate</CardTitle>
            <CheckCircle className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">94.8%</div>
            <p className="text-xs text-blue-400">+2.1% improvement</p>
          </CardContent>
        </Card>

        <Card className="border-slate-800/50 bg-card/50 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-400">Actions Today</CardTitle>
            <Zap className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">127</div>
            <p className="text-xs text-yellow-400">43 in last hour</p>
          </CardContent>
        </Card>

        <Card className="border-slate-800/50 bg-card/50 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-400">Avg Response</CardTitle>
            <Clock className="h-4 w-4 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">0.3s</div>
            <p className="text-xs text-purple-400">Ultra-fast AI response</p>
          </CardContent>
        </Card>
      </div>

      {/* Automated Response Systems */}
      <Card className="border-slate-800/50 bg-card/50 backdrop-blur-sm">
        <CardHeader className="border-b border-slate-800/50">
          <CardTitle className="flex items-center gap-2 text-white">
            <Bot className="h-5 w-5 text-emerald-500" />
            Response Protocols
            <div className="ml-auto text-sm font-medium text-slate-400">
              AI-Managed Systems
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-4">
            {automatedResponses.map((response) => {
              const StatusIcon = getStatusIcon(response.status);
              return (
                <div key={response.id} className="flex items-center justify-between p-4 bg-slate-800/30 border border-slate-700/50 rounded-xl hover:bg-slate-800/50 transition-all duration-200 group">
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 bg-emerald-600/10 border border-emerald-600/20 rounded-xl flex items-center justify-center group-hover:bg-emerald-600/20 transition-colors">
                      <StatusIcon className="h-5 w-5 text-emerald-500" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-white group-hover:text-emerald-400 transition-colors">{response.name}</h4>
                      <p className="text-sm text-slate-400 font-medium max-w-md">{response.description}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs text-slate-500">Last triggered: {response.lastTriggered}</span>
                        <span className="text-slate-600">•</span>
                        <span className="text-xs text-blue-400">Success Rate: {response.successRate}%</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge variant={getStatusColor(response.status)} className="font-medium">
                      {response.status.toUpperCase()}
                    </Badge>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-slate-400 hover:text-white"
                      onClick={() => {
                        toast({
                          title: "Response Protocol Configured",
                          description: `Settings for ${response.name} have been updated.`,
                        });
                      }}
                    >
                      <Settings className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Recent Automated Actions */}
      <Card className="border-slate-800/50 bg-card/50 backdrop-blur-sm">
        <CardHeader className="border-b border-slate-800/50">
          <CardTitle className="flex items-center gap-2 text-white">
            <Activity className="h-5 w-5 text-blue-500" />
            Recent Automated Actions
            <div className="ml-auto text-sm font-medium text-slate-400">
              Last 30 minutes
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-3">
            {recentActions.map((action) => {
              const ActionIcon = getActionIcon(action.type);
              return (
                <div key={action.id} className="flex items-center gap-4 p-3 bg-slate-800/20 border border-slate-700/30 rounded-lg">
                  <div className="h-8 w-8 bg-blue-600/10 border border-blue-600/20 rounded-lg flex items-center justify-center">
                    <ActionIcon className="h-4 w-4 text-blue-500" />
                  </div>
                  <div className="flex-1">
                    <p className="text-white font-medium">{action.action}</p>
                    <p className="text-sm text-slate-400">{action.timestamp}</p>
                  </div>
                  <Badge variant="success" className="text-xs">
                    SUCCESS
                  </Badge>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}