import { AlertTriangle, Clock, CheckCircle, XCircle, User, Calendar } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface Incident {
  id: string;
  title: string;
  description: string;
  severity: "low" | "medium" | "high" | "critical";
  status: "open" | "investigating" | "resolved" | "closed";
  assignee: string;
  reporter: string;
  createdAt: string;
  updatedAt: string;
  affectedSystems: string[];
}

export default function Incidents() {
  const incidents: Incident[] = [
    {
      id: "INC-001",
      title: "Data Exfiltration Attempt",
      description: "Suspicious outbound network traffic detected from database server. Potential data breach in progress.",
      severity: "critical",
      status: "investigating",
      assignee: "Sarah Connor",
      reporter: "John Smith",
      createdAt: "2024-01-15T14:30:00Z",
      updatedAt: "2024-01-15T15:45:00Z",
      affectedSystems: ["Database Server", "Network Gateway", "Firewall"]
    },
    {
      id: "INC-002",
      title: "Ransomware Detection",
      description: "Encrypted files detected on multiple workstations. Ransomware activity confirmed.",
      severity: "critical",
      status: "investigating",
      assignee: "Mike Johnson",
      reporter: "Alice Brown",
      createdAt: "2024-01-15T13:15:00Z",
      updatedAt: "2024-01-15T14:20:00Z",
      affectedSystems: ["Workstation-01", "Workstation-05", "File Server"]
    },
    {
      id: "INC-003",
      title: "Unauthorized Access Attempt",
      description: "Multiple failed login attempts detected on administrative accounts from external IP.",
      severity: "high",
      status: "resolved",
      assignee: "David Wilson",
      reporter: "System Monitor",
      createdAt: "2024-01-15T12:00:00Z",
      updatedAt: "2024-01-15T13:30:00Z",
      affectedSystems: ["Active Directory", "VPN Gateway"]
    },
    {
      id: "INC-004",
      title: "Malicious Email Campaign",
      description: "Phishing emails with malicious attachments detected in user mailboxes.",
      severity: "medium",
      status: "closed",
      assignee: "Emma Davis",
      reporter: "Email Security",
      createdAt: "2024-01-15T10:30:00Z",
      updatedAt: "2024-01-15T12:15:00Z",
      affectedSystems: ["Email Server", "User Mailboxes"]
    },
    {
      id: "INC-005",
      title: "Network Anomaly",
      description: "Unusual network traffic patterns detected during off-hours.",
      severity: "low",
      status: "open",
      assignee: "Tom Anderson",
      reporter: "Network Monitor",
      createdAt: "2024-01-15T09:45:00Z",
      updatedAt: "2024-01-15T10:00:00Z",
      affectedSystems: ["Network Infrastructure"]
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
      case "open": return "secondary";
      case "investigating": return "warning";
      case "resolved": return "success";
      case "closed": return "success";
      default: return "secondary";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "open": return Clock;
      case "investigating": return AlertTriangle;
      case "resolved": return CheckCircle;
      case "closed": return XCircle;
      default: return Clock;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
          Security Incidents
        </h1>
        <p className="text-muted-foreground mt-2">
          Manage and track security incidents across defence infrastructure
        </p>
      </div>

      {/* Incident Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-destructive">2</p>
                <p className="text-sm text-muted-foreground">Critical</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-destructive" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-warning">1</p>
                <p className="text-sm text-muted-foreground">High Priority</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-warning" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-primary">2</p>
                <p className="text-sm text-muted-foreground">Investigating</p>
              </div>
              <Clock className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-success">2</p>
                <p className="text-sm text-muted-foreground">Resolved</p>
              </div>
              <CheckCircle className="h-8 w-8 text-success" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Incidents List */}
      <div className="space-y-4">
        {incidents.map((incident) => {
          const StatusIcon = getStatusIcon(incident.status);
          return (
            <Card key={incident.id} className="hover:shadow-lg transition-all duration-300 group">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <StatusIcon className="h-5 w-5 text-primary" />
                    <div>
                      <CardTitle className="text-lg group-hover:text-primary transition-colors">
                        {incident.title}
                      </CardTitle>
                      <p className="text-sm text-muted-foreground">ID: {incident.id}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant={getSeverityColor(incident.severity)}>
                      {incident.severity.toUpperCase()}
                    </Badge>
                    <Badge variant={getStatusColor(incident.status)}>
                      {incident.status.toUpperCase()}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-6">
                  {incident.description}
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-xs text-muted-foreground">Assignee</p>
                      <p className="text-sm font-medium">{incident.assignee}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-xs text-muted-foreground">Reporter</p>
                      <p className="text-sm font-medium">{incident.reporter}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-xs text-muted-foreground">Created</p>
                      <p className="text-sm font-medium">{formatDate(incident.createdAt)}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-xs text-muted-foreground">Updated</p>
                      <p className="text-sm font-medium">{formatDate(incident.updatedAt)}</p>
                    </div>
                  </div>
                </div>

                <div className="mb-4">
                  <p className="text-sm font-medium mb-2">Affected Systems:</p>
                  <div className="flex flex-wrap gap-2">
                    {incident.affectedSystems.map((system, index) => (
                      <Badge key={index} variant="outline">
                        {system}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-end gap-2">
                  <Button variant="outline" size="sm">
                    View Details
                  </Button>
                  <Button variant="outline" size="sm">
                    Update Status
                  </Button>
                  {incident.status !== "closed" && (
                    <Button size="sm">
                      Take Action
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}