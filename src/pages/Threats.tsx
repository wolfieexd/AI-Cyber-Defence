import { useState } from "react";
import { Shield, AlertTriangle, Zap, Eye, X } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface Threat {
  id: string;
  type: string;
  source: string;
  target: string;
  severity: "low" | "medium" | "high" | "critical";
  status: "active" | "blocked" | "investigating" | "resolved";
  timestamp: string;
  description: string;
}

export default function Threats() {
  const [searchTerm, setSearchTerm] = useState("");
  const [severityFilter, setSeverityFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  const threats: Threat[] = [
    {
      id: "T001",
      type: "DDoS Attack",
      source: "192.168.1.100",
      target: "Web Server",
      severity: "critical",
      status: "active",
      timestamp: "2024-01-15 14:32:00",
      description: "Large-scale distributed denial of service attack targeting main web infrastructure"
    },
    {
      id: "T002", 
      type: "Malware Detection",
      source: "workstation-12",
      target: "File System",
      severity: "high",
      status: "investigating",
      timestamp: "2024-01-15 14:28:00",
      description: "Trojan.Win32.Agent detected in user downloads directory"
    },
    {
      id: "T003",
      type: "Suspicious Login",
      source: "external-ip-1",
      target: "Admin Panel",
      severity: "medium",
      status: "blocked",
      timestamp: "2024-01-15 14:15:00",
      description: "Multiple failed login attempts from unknown IP address"
    },
    {
      id: "T004",
      type: "Port Scan",
      source: "10.0.0.55",
      target: "Network Perimeter",
      severity: "low",
      status: "resolved",
      timestamp: "2024-01-15 13:45:00",
      description: "Automated port scanning activity detected and mitigated"
    },
    {
      id: "T005",
      type: "Phishing Attempt",
      source: "email-server",
      target: "User Mailboxes",
      severity: "medium",
      status: "blocked",
      timestamp: "2024-01-15 13:30:00",
      description: "Malicious email campaign blocked by security filters"
    }
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical": return "destructive";
      case "high": return "destructive";
      case "medium": return "warning";
      default: return "secondary";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "destructive";
      case "investigating": return "warning";
      case "blocked": return "success";
      case "resolved": return "success";
      default: return "secondary";
    }
  };

  const getThreatIcon = (type: string) => {
    switch (type) {
      case "DDoS Attack": return "🔥";
      case "Malware Detection": return "🦠";
      case "Phishing Attempt": return "🎣";
      case "Port Scan": return "🔍";
      case "Suspicious Login": return "🔐";
      default: return "⚠️";
    }
  };

  const filteredThreats = threats.filter(threat => {
    const matchesSearch = threat.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         threat.source.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         threat.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSeverity = severityFilter === "all" || threat.severity === severityFilter;
    const matchesStatus = statusFilter === "all" || threat.status === statusFilter;
    
    return matchesSearch && matchesSeverity && matchesStatus;
  });

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
          Threat Detection
        </h1>
        <p className="text-muted-foreground mt-2">
          Real-time monitoring and analysis of security threats across defence systems
        </p>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-primary" />
            Threat Filters
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <Input
                placeholder="Search threats..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full"
              />
            </div>
            <Select value={severityFilter} onValueChange={setSeverityFilter}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Severity" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Severities</SelectItem>
                <SelectItem value="critical">Critical</SelectItem>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="low">Low</SelectItem>
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="investigating">Investigating</SelectItem>
                <SelectItem value="blocked">Blocked</SelectItem>
                <SelectItem value="resolved">Resolved</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Threats List */}
      <div className="space-y-4">
        {filteredThreats.map((threat) => (
          <Card key={threat.id} className="hover:shadow-lg transition-all duration-300 group">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4 flex-1">
                  <div className="text-2xl">{getThreatIcon(threat.type)}</div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold group-hover:text-primary transition-colors">
                        {threat.type}
                      </h3>
                      <Badge variant={getSeverityColor(threat.severity)}>
                        {threat.severity.toUpperCase()}
                      </Badge>
                      <Badge variant={getStatusColor(threat.status)}>
                        {threat.status.toUpperCase()}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">
                      {threat.description}
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                      <div>
                        <span className="font-medium text-foreground">Source:</span>
                        <span className="ml-2 text-muted-foreground">{threat.source}</span>
                      </div>
                      <div>
                        <span className="font-medium text-foreground">Target:</span>
                        <span className="ml-2 text-muted-foreground">{threat.target}</span>
                      </div>
                      <div>
                        <span className="font-medium text-foreground">Detected:</span>
                        <span className="ml-2 text-muted-foreground">{threat.timestamp}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm">
                    <Eye className="h-4 w-4 mr-2" />
                    Details
                  </Button>
                  {threat.status === "active" && (
                    <Button variant="destructive" size="sm">
                      <X className="h-4 w-4 mr-2" />
                      Block
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredThreats.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <AlertTriangle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No threats found</h3>
            <p className="text-muted-foreground">
              No threats match your current filter criteria.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}