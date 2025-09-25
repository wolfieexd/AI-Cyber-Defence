import { Outlet } from "react-router-dom";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { MainSidebar } from "./MainSidebar";
import { Header } from "./Header";

export function MainLayout() {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <MainSidebar />
        <SidebarInset className="flex-1">
          <Header />
          <main className="flex-1 p-6">
            <Outlet />
            <footer className="mt-8 pt-6 border-t border-slate-800/50">
              <div className="flex items-center justify-between text-sm text-slate-400">
                <div className="flex items-center gap-4">
                  <span>© 2025 Defence Command • AI-Enabled Cyber Safety Portal</span>
                  <div className="h-px w-8 bg-slate-700"></div>
                  <span className="text-emerald-400 font-medium">Smart India Hackathon 2025</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="px-2 py-1 bg-blue-900/30 border border-blue-600/30 rounded text-blue-400 text-xs font-medium">
                    SIH25183
                  </span>
                </div>
              </div>
            </footer>
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}