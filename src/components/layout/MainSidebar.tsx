import { Shield, Activity, AlertTriangle, BarChart3, FileText, Settings, Users, Brain, Zap, Eye, Bot } from "lucide-react";
import { NavLink } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

const navigationItems = [
  { title: "Command Center", url: "/", icon: Activity },
  { title: "AI Threat Analysis", url: "/threats", icon: Brain },
  { title: "Active Incidents", url: "/incidents", icon: AlertTriangle },
  { title: "Intelligence Analytics", url: "/analytics", icon: BarChart3 },
  { title: "Automated Response", url: "/reports", icon: Bot },
  { title: "System Monitoring", url: "/users", icon: Eye },
  { title: "Configuration", url: "/settings", icon: Settings },
];

export function MainSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";

  const getNavClassName = ({ isActive }: { isActive: boolean }) =>
    isActive 
      ? "bg-gradient-to-r from-blue-600/20 to-blue-600/5 text-blue-400 border-r-2 border-blue-500 font-medium" 
      : "text-slate-300 hover:text-white hover:bg-slate-800/50 transition-all duration-200";

  return (
    <Sidebar className={collapsed ? "w-16" : "w-64"} collapsible="icon">
      <SidebarContent className="bg-card/95 border-r border-slate-800/50">
        <div className="p-6 border-b border-slate-800/50">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 bg-gradient-to-br from-emerald-600 to-blue-700 rounded-xl flex items-center justify-center shadow-lg ring-2 ring-emerald-500/20">
              <Brain className="h-5 w-5 text-white" />
            </div>
            {!collapsed && (
              <div>
                <h2 className="text-xl font-bold text-white tracking-tight">
                  AI CyberDefense
                </h2>
                <p className="text-sm text-slate-400 font-medium">Smart India Hackathon</p>
              </div>
            )}
          </div>
        </div>

        <SidebarGroup>
          <SidebarGroupLabel className="px-3 text-xs font-semibold text-slate-400 uppercase tracking-wide">
            AI-Powered Security Operations
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink to={item.url} end className={getNavClassName}>
                      <item.icon className="h-4 w-4" />
                      {!collapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}