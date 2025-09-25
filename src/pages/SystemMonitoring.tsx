import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye, Server, Cpu, HardDrive, Wifi, Shield, Activity, AlertCircle, CheckCircle, Users } from "lucide-react";

export default function SystemMonitoring() {
  const systemComponents = [
    { 
      id: 1, 
      name: "AI Processing Cluster", 
      status: "operational", 
      uptime: "99.98%", 
      load: "67%",
      location: "Data Center Alpha",
      lastCheck: "30s ago"
    },
    { 
      id: 2, 
      name: "Threat Detection Engine", 
      status: "operational", 
      uptime: "99.95%", 
      load: "43%",
      location: "Cloud Node Beta",
      lastCheck: "45s ago"
    },
    { 
      id: 3, 
      name: "Response Automation Hub", 
      status: "warning", 
      uptime: "98.12%", 
      load: "89%",
      location: "Edge Server Gamma",
      lastCheck: "1m ago"
    },
    { 
      id: 4, 
      name: "Data Analytics Pipeline", 
      status: "operational", 
      uptime: "99.87%", 
      load: "34%",
      location: "Processing Center Delta",
      lastCheck: "15s ago"
    },
  ];

  const networkNodes = [
    { id: 1, node: "Primary Gateway", status: "online", latency: "12ms", bandwidth: "89%" },
    { id: 2, node: "Backup Gateway", status: "online", latency: "18ms", bandwidth: "23%" },
    { id: 3, node: "Regional Hub Alpha", status: "online", latency: "8ms", bandwidth: "67%" },
    { id: 4, node: "Regional Hub Beta", status: "maintenance", latency: "N/A", bandwidth: "0%" },
    { id: 5, node: "Edge Node 1", status: "online", latency: "15ms", bandwidth: "45%" },
    { id: 6, node: "Edge Node 2", status: "online", latency: "22ms", bandwidth: "78%" },
  ];

  const activePersonnel = [
    { id: 1, name: "Col. Sarah Chen", role: "Cyber Operations Commander", status: "active", location: "Command Center" },
    { id: 2, name: "Maj. David Rodriguez", role: "AI Systems Specialist", status: "active", location: "Tech Hub" },
    { id: 3, name: "Capt. Lisa Wang", role: "Threat Analyst", status: "on-break", location: "Analysis Wing" },
    { id: 4, name: "Lt. Michael Johnson", role: "Response Coordinator", status: "active", location: "Operations Floor" },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "operational":
      case "online": 
      case "active": return "success";
      case "warning": 
      case "maintenance":
      case "on-break": return "warning";
      case "critical":
      case "offline": return "destructive";
      default: return "secondary";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "operational":
      case "online":
      case "active": return CheckCircle;
      case "warning":
      case "maintenance":
      case "on-break": return AlertCircle;
      default: return Activity;
    }
  };

  const getLoadColor = (load: string) => {
    const loadNum = parseInt(load);
    if (loadNum > 80) return "text-red-400";
    if (loadNum > 60) return "text-yellow-400";
    return "text-green-400";
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-4xl font-bold text-white tracking-tight mb-2">
              System Monitoring Center
            </h1>
            <p className="text-slate-400 text-lg font-medium">
              Real-time monitoring of AI defense systems and network infrastructure
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <div className="text-2xl font-bold text-white">96.8%</div>
              <div className="text-sm text-slate-400">System Health</div>
            </div>
          </div>
        </div>
        <div className="h-px bg-gradient-to-r from-emerald-600/50 via-blue-500/50 to-transparent"></div>
      </div>

      {/* System Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="border-slate-800/50 bg-card/50 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-400">Active Systems</CardTitle>
            <Server className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">4/4</div>
            <p className="text-xs text-green-400">All systems online</p>
          </CardContent>
        </Card>

        <Card className="border-slate-800/50 bg-card/50 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-400">CPU Usage</CardTitle>
            <Cpu className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">58%</div>
            <p className="text-xs text-blue-400">Optimal performance</p>
          </CardContent>
        </Card>

        <Card className="border-slate-800/50 bg-card/50 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-400">Network Status</CardTitle>
            <Wifi className="h-4 w-4 text-emerald-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">5/6</div>
            <p className="text-xs text-yellow-400">1 node maintenance</p>
          </CardContent>
        </Card>

        <Card className="border-slate-800/50 bg-card/50 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-400">Personnel</CardTitle>
            <Users className="h-4 w-4 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">3/4</div>
            <p className="text-xs text-purple-400">Active on duty</p>
          </CardContent>
        </Card>
      </div>

      {/* System Components */}
      <Card className="border-slate-800/50 bg-card/50 backdrop-blur-sm">
        <CardHeader className="border-b border-slate-800/50">
          <CardTitle className="flex items-center gap-2 text-white">
            <Eye className="h-5 w-5 text-blue-500" />
            System Components
            <div className="ml-auto text-sm font-medium text-slate-400">
              Real-time monitoring
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-4">
            {systemComponents.map((component) => {
              const StatusIcon = getStatusIcon(component.status);
              return (
                <div key={component.id} className="flex items-center justify-between p-4 bg-slate-800/30 border border-slate-700/50 rounded-xl hover:bg-slate-800/50 transition-all duration-200 group">
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 bg-blue-600/10 border border-blue-600/20 rounded-xl flex items-center justify-center group-hover:bg-blue-600/20 transition-colors">
                      <StatusIcon className="h-5 w-5 text-blue-500" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-white group-hover:text-blue-400 transition-colors">{component.name}</h4>
                      <div className="flex items-center gap-4 mt-1">
                        <span className="text-sm text-slate-400">{component.location}</span>
                        <span className="text-slate-600">•</span>
                        <span className="text-sm text-slate-400">Uptime: {component.uptime}</span>
                        <span className="text-slate-600">•</span>
                        <span className="text-sm text-slate-400">Last check: {component.lastCheck}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <div className={`text-sm font-bold ${getLoadColor(component.load)}`}>
                        Load: {component.load}
                      </div>
                    </div>
                    <Badge variant={getStatusColor(component.status)} className="font-medium">
                      {component.status.toUpperCase()}
                    </Badge>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Network Nodes */}
        <Card className="border-slate-800/50 bg-card/50 backdrop-blur-sm">
          <CardHeader className="border-b border-slate-800/50">
            <CardTitle className="flex items-center gap-2 text-white">
              <Wifi className="h-5 w-5 text-emerald-500" />
              Network Nodes
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-3">
              {networkNodes.map((node) => {
                const StatusIcon = getStatusIcon(node.status);
                return (
                  <div key={node.id} className="flex items-center justify-between p-3 bg-slate-800/20 border border-slate-700/30 rounded-lg">
                    <div className="flex items-center gap-3">
                      <StatusIcon className="h-4 w-4 text-emerald-500" />
                      <div>
                        <p className="text-white font-medium">{node.node}</p>
                        <p className="text-sm text-slate-400">Latency: {node.latency} • Bandwidth: {node.bandwidth}</p>
                      </div>
                    </div>
                    <Badge variant={getStatusColor(node.status)} className="text-xs">
                      {node.status.toUpperCase()}
                    </Badge>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Active Personnel */}
        <Card className="border-slate-800/50 bg-card/50 backdrop-blur-sm">
          <CardHeader className="border-b border-slate-800/50">
            <CardTitle className="flex items-center gap-2 text-white">
              <Shield className="h-5 w-5 text-purple-500" />
              Active Personnel
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-3">
              {activePersonnel.map((person) => {
                const StatusIcon = getStatusIcon(person.status);
                return (
                  <div key={person.id} className="flex items-center justify-between p-3 bg-slate-800/20 border border-slate-700/30 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 bg-purple-600/10 border border-purple-600/20 rounded-full flex items-center justify-center">
                        <StatusIcon className="h-4 w-4 text-purple-500" />
                      </div>
                      <div>
                        <p className="text-white font-medium">{person.name}</p>
                        <p className="text-sm text-slate-400">{person.role} • {person.location}</p>
                      </div>
                    </div>
                    <Badge variant={getStatusColor(person.status)} className="text-xs">
                      {person.status.replace('-', ' ').toUpperCase()}
                    </Badge>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}