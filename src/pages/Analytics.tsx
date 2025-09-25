import { BarChart3, TrendingUp, TrendingDown, Activity, Shield } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function Analytics() {
  const analyticsData = [
    { label: "Total Threats Detected", value: "1,247", change: "+12%", trend: "up", period: "Last 30 days" },
    { label: "Blocked Attacks", value: "892", change: "+8%", trend: "up", period: "Last 30 days" },
    { label: "False Positives", value: "23", change: "-15%", trend: "down", period: "Last 30 days" },
    { label: "Response Time", value: "2.3s", change: "-5%", trend: "down", period: "Average" },
  ];

  const threatCategories = [
    { name: "DDoS Attacks", count: 342, percentage: 27.4, color: "bg-destructive" },
    { name: "Malware", count: 298, percentage: 23.9, color: "bg-warning" },
    { name: "Phishing", count: 267, percentage: 21.4, color: "bg-cyber-orange" },
    { name: "Port Scans", count: 189, percentage: 15.2, color: "bg-primary" },
    { name: "Others", count: 151, percentage: 12.1, color: "bg-secondary" },
  ];

  const monthlyTrends = [
    { month: "Jan", threats: 892, blocked: 678 },
    { month: "Feb", threats: 1034, blocked: 789 },
    { month: "Mar", threats: 1156, blocked: 945 },
    { month: "Apr", threats: 987, blocked: 834 },
    { month: "May", threats: 1247, blocked: 1089 },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
          Security Analytics
        </h1>
        <p className="text-muted-foreground mt-2">
          Comprehensive analysis and insights into defence system security metrics
        </p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {analyticsData.map((metric, index) => (
          <Card key={index} className="group hover:shadow-lg transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="h-10 w-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <BarChart3 className="h-5 w-5 text-primary" />
                </div>
                <Badge variant={metric.trend === "up" ? "destructive" : "success"}>
                  {metric.trend === "up" ? (
                    <TrendingUp className="h-3 w-3 mr-1" />
                  ) : (
                    <TrendingDown className="h-3 w-3 mr-1" />
                  )}
                  {metric.change}
                </Badge>
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-1">{metric.value}</h3>
                <p className="text-sm font-medium text-foreground">{metric.label}</p>
                <p className="text-xs text-muted-foreground mt-1">{metric.period}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Threat Categories */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-primary" />
              Threat Categories
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {threatCategories.map((category, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-3 flex-1">
                    <div className={`h-3 w-3 rounded-full ${category.color}`}></div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-medium">{category.name}</span>
                        <span className="text-sm text-muted-foreground">{category.count}</span>
                      </div>
                      <div className="w-full bg-secondary rounded-full h-2">
                        <div
                          className={`h-2 rounded-full ${category.color}`}
                          style={{ width: `${category.percentage}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                  <div className="ml-4 text-sm font-medium">{category.percentage}%</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Monthly Trends */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5 text-primary" />
              Monthly Trends
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {monthlyTrends.map((month, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium">{month.month}</span>
                    <div className="flex items-center gap-4">
                      <span className="text-muted-foreground">
                        Detected: {month.threats}
                      </span>
                      <span className="text-success">
                        Blocked: {month.blocked}
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-1 h-2">
                    <div
                      className="bg-destructive rounded-sm"
                      style={{ width: `${(month.threats / 1300) * 100}%` }}
                    ></div>
                    <div
                      className="bg-success rounded-sm"
                      style={{ width: `${(month.blocked / 1300) * 100}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Security Score */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-primary" />
            Overall Security Score
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center">
            <div className="relative w-48 h-48">
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-success via-warning to-destructive p-2">
                <div className="w-full h-full rounded-full bg-background flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-success">87</div>
                    <div className="text-sm text-muted-foreground">Security Score</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-6 grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-success">92%</div>
              <div className="text-sm text-muted-foreground">Detection Rate</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-warning">85%</div>
              <div className="text-sm text-muted-foreground">Response Time</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-primary">94%</div>
              <div className="text-sm text-muted-foreground">System Uptime</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}