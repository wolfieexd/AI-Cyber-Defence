 import { Bell, Search, User, LogOut, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";

export function Header() {
  const [searchQuery, setSearchQuery] = useState("");

  const notifications = [
    { id: 1, title: "Critical Threat Detected", message: "DDoS attack on main server", time: "2 min ago", type: "critical" },
    { id: 2, title: "System Alert", message: "High CPU usage on processing cluster", time: "5 min ago", type: "warning" },
    { id: 3, title: "Incident Resolved", message: "Malware containment successful", time: "10 min ago", type: "success" },
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      toast({
        title: "Search Results",
        description: `Searching for "${searchQuery}" across threats, incidents, and personnel...`,
      });
    }
  };

  const handleNotificationClick = (notification: any) => {
    toast({
      title: notification.title,
      description: notification.message,
    });
  };

  return (
    <header className="h-16 border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/75 sticky top-0 z-50 shadow-sm">
      <div className="flex items-center justify-between h-full px-6">
        <div className="flex items-center gap-4">
          <SidebarTrigger />
          <form onSubmit={handleSearch} className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
            <Input
              placeholder="Search AI threats, incidents, personnel..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-background/80 border-slate-700 focus:border-primary/50 focus:bg-background/90 transition-all duration-200 w-80"
            />
          </form>
        </div>

        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2 text-sm">
            <div className="px-2 py-1 bg-emerald-900/50 border border-emerald-600/30 rounded text-emerald-400 font-medium">
              CLASSIFIED
            </div>
            <div className="text-slate-400">|</div>
            <div className="text-slate-300 font-medium">Defence Command</div>
          </div>

          <div className="flex items-center gap-3 px-3 py-1.5 bg-success/10 border border-success/20 rounded-full">
            <div className="h-2 w-2 bg-success rounded-full animate-pulse-subtle"></div>
            <span className="text-sm font-medium text-success">AI Systems Online</span>
          </div>

          <Popover>
            <PopoverTrigger asChild>
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-4 w-4" />
                <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center bg-destructive text-destructive-foreground text-xs">
                  {notifications.length}
                </Badge>
              </Button>
            </PopoverTrigger>
            <PopoverContent align="end" className="w-80">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold">Notifications</h4>
                  <Button variant="ghost" size="sm" className="text-xs">
                    Mark all read
                  </Button>
                </div>
                <div className="space-y-2 max-h-64 overflow-y-auto">
                  {notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className="flex items-start gap-3 p-3 rounded-lg hover:bg-slate-800/50 cursor-pointer transition-colors"
                      onClick={() => handleNotificationClick(notification)}
                    >
                      <div className={`h-2 w-2 rounded-full mt-2 ${
                        notification.type === "critical" ? "bg-destructive" :
                        notification.type === "warning" ? "bg-warning" : "bg-success"
                      }`} />
                      <div className="flex-1">
                        <p className="text-sm font-medium">{notification.title}</p>
                        <p className="text-xs text-muted-foreground">{notification.message}</p>
                        <p className="text-xs text-muted-foreground mt-1">{notification.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </PopoverContent>
          </Popover>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <User className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium">Admin User</p>
                  <p className="text-xs text-muted-foreground">admin@defence.gov</p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => toast({ title: "Profile", description: "Opening user profile..." })}>
                <User className="mr-2 h-4 w-4" />
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => toast({ title: "Logout", description: "Logging out..." })}>
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}