import { Settings as SettingsIcon, Shield, Bell, Users, Database, Network, Lock, Key } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";

export default function Settings() {
  const settingsCategories = [
    {
      title: "Security Configuration",
      icon: Shield,
      items: [
        { label: "Auto-block suspicious IPs", description: "Automatically block IPs with multiple failed attempts", enabled: true },
        { label: "Real-time threat scanning", description: "Continuous monitoring of network traffic", enabled: true },
        { label: "Advanced encryption", description: "Use military-grade encryption for all data", enabled: true },
        { label: "Two-factor authentication", description: "Require 2FA for all admin accounts", enabled: false },
      ]
    },
    {
      title: "Alert & Notifications",
      icon: Bell,
      items: [
        { label: "Critical threat alerts", description: "Immediate notifications for critical threats", enabled: true },
        { label: "Email notifications", description: "Send alerts via email to administrators", enabled: true },
        { label: "SMS alerts", description: "Send SMS for high-priority incidents", enabled: false },
        { label: "Slack integration", description: "Post alerts to Slack channels", enabled: false },
      ]
    },
    {
      title: "System Performance",
      icon: Database,
      items: [
        { label: "Auto-scaling", description: "Automatically scale resources based on load", enabled: true },
        { label: "Log retention", description: "Keep logs for 90 days", enabled: true },
        { label: "Backup encryption", description: "Encrypt all backup data", enabled: true },
        { label: "Performance monitoring", description: "Monitor system performance metrics", enabled: true },
      ]
    }
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-4xl font-bold text-white tracking-tight mb-2">
              System Configuration
            </h1>
            <p className="text-slate-400 text-lg font-medium">
              Configure security settings and system preferences
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" className="border-slate-600 text-slate-300 hover:bg-slate-800">
              Export Config
            </Button>
            <Button className="bg-blue-600 hover:bg-blue-700">
              Save Changes
            </Button>
          </div>
        </div>
        <div className="h-px bg-gradient-to-r from-blue-600/50 via-blue-500/50 to-transparent"></div>
      </div>

      {/* API Configuration */}
      <Card className="border-slate-800/50 bg-card/50 backdrop-blur-sm">
        <CardHeader className="border-b border-slate-800/50">
          <CardTitle className="flex items-center gap-2 text-white">
            <Key className="h-5 w-5 text-blue-500" />
            API Configuration
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="api-endpoint" className="text-sm font-medium text-slate-300">
                API Endpoint
              </Label>
              <Input
                id="api-endpoint"
                value="https://api.cyberguard.defence.gov"
                className="bg-slate-800/50 border-slate-700 text-white"
                readOnly
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="api-key" className="text-sm font-medium text-slate-300">
                API Key
              </Label>
              <Input
                id="api-key"
                value="••••••••••••••••••••••••••••••••"
                className="bg-slate-800/50 border-slate-700 text-white font-mono"
                readOnly
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="refresh-interval" className="text-sm font-medium text-slate-300">
                Data Refresh Interval (seconds)
              </Label>
              <Input
                id="refresh-interval"
                value="30"
                className="bg-slate-800/50 border-slate-700 text-white"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="timeout" className="text-sm font-medium text-slate-300">
                Request Timeout (seconds)
              </Label>
              <Input
                id="timeout"
                value="10"
                className="bg-slate-800/50 border-slate-700 text-white"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Settings Categories */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {settingsCategories.map((category, categoryIndex) => {
          const IconComponent = category.icon;
          return (
            <Card key={categoryIndex} className="border-slate-800/50 bg-card/50 backdrop-blur-sm">
              <CardHeader className="border-b border-slate-800/50">
                <CardTitle className="flex items-center gap-2 text-white">
                  <IconComponent className="h-5 w-5 text-blue-500" />
                  {category.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-6">
                  {category.items.map((item, index) => (
                    <div key={index} className="flex items-start justify-between">
                      <div className="flex-1 pr-4">
                        <div className="font-medium text-white text-sm">{item.label}</div>
                        <div className="text-xs text-slate-400 mt-1">{item.description}</div>
                      </div>
                      <Switch checked={item.enabled} className="data-[state=checked]:bg-blue-600" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Network Configuration */}
      <Card className="border-slate-800/50 bg-card/50 backdrop-blur-sm">
        <CardHeader className="border-b border-slate-800/50">
          <CardTitle className="flex items-center gap-2 text-white">
            <Network className="h-5 w-5 text-blue-500" />
            Network Configuration
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-4">
              <h3 className="font-semibold text-white">Firewall Rules</h3>
              <div className="bg-slate-800/30 border border-slate-700/50 rounded-lg p-4 font-mono text-sm">
                <div className="text-green-400">ALLOW: 192.168.1.0/24</div>
                <div className="text-green-400">ALLOW: 10.0.0.0/8</div>
                <div className="text-red-400">DENY: 0.0.0.0/0</div>
                <div className="text-yellow-400">LOG: ALL</div>
              </div>
            </div>
            <div className="space-y-4">
              <h3 className="font-semibold text-white">Monitored Ports</h3>
              <div className="bg-slate-800/30 border border-slate-700/50 rounded-lg p-4">
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-slate-300">HTTP</span>
                    <span className="text-blue-400 font-mono">80</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-300">HTTPS</span>
                    <span className="text-blue-400 font-mono">443</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-300">SSH</span>
                    <span className="text-blue-400 font-mono">22</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-300">FTP</span>
                    <span className="text-blue-400 font-mono">21</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <h3 className="font-semibold text-white">Threat Detection</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-300">DDoS Protection</span>
                  <div className="h-2 w-2 bg-green-500 rounded-full"></div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-300">Malware Scanner</span>
                  <div className="h-2 w-2 bg-green-500 rounded-full"></div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-300">Intrusion Detection</span>
                  <div className="h-2 w-2 bg-green-500 rounded-full"></div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-300">Traffic Analysis</span>
                  <div className="h-2 w-2 bg-yellow-500 rounded-full"></div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}