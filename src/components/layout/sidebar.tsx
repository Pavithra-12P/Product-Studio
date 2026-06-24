"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAppStore } from "@/store";
import {
  Cpu,
  LayoutDashboard,
  FolderOpen,
  BookTemplate,
  History,
  Settings,
  Plus,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/dashboard/projects", label: "Projects", icon: FolderOpen },
  { href: "/dashboard/templates", label: "Templates", icon: BookTemplate },
  { href: "/dashboard/history", label: "History", icon: History },
  { href: "/dashboard/settings", label: "Settings", icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();
  const { sidebarOpen, toggleSidebar } = useAppStore();

  return (
    <aside
      className={cn(
        "fixed top-0 left-0 h-screen bg-bg-secondary border-r border-border flex flex-col transition-all duration-[250ms] z-40",
        sidebarOpen ? "w-[240px]" : "w-[64px]"
      )}
    >
      {/* Header */}
      <div className="h-16 flex items-center justify-between px-4 border-b border-border">
        <Link href="/dashboard" className="flex items-center gap-2.5 min-w-0">
          <div className="w-7 h-7 bg-white rounded-lg flex items-center justify-center shrink-0">
            <Cpu size={14} className="text-bg" />
          </div>
          {sidebarOpen && (
            <span className="font-heading font-semibold text-[14px] tracking-tight truncate">
              Product Studio
            </span>
          )}
        </Link>
        <button
          onClick={toggleSidebar}
          className="p-1.5 rounded-md text-text-muted hover:text-text-secondary hover:bg-accent-dim transition-all duration-[250ms] shrink-0"
          aria-label={sidebarOpen ? "Collapse sidebar" : "Expand sidebar"}
        >
          {sidebarOpen ? <ChevronLeft size={14} /> : <ChevronRight size={14} />}
        </button>
      </div>

      {/* New Project Button */}
      <div className="p-3">
        <Link
          href="/dashboard/new"
          className={cn(
            "flex items-center gap-2 rounded-[10px] transition-all duration-[250ms]",
            sidebarOpen
              ? "btn-primary w-full py-2.5 text-[13px]"
              : "w-10 h-10 bg-white text-bg justify-center rounded-lg"
          )}
        >
          <Plus size={15} />
          {sidebarOpen && "New Project"}
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-2 space-y-0.5">
        {navItems.map((item) => {
          const isActive = pathname === item.href || 
            (item.href !== "/dashboard" && pathname.startsWith(item.href));

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg transition-all duration-[250ms] group",
                sidebarOpen ? "px-3 py-2.5" : "justify-center p-2.5",
                isActive
                  ? "bg-accent-dim text-text-primary"
                  : "text-text-secondary hover:text-text-primary hover:bg-accent-dim"
              )}
              title={!sidebarOpen ? item.label : undefined}
            >
              <item.icon size={16} className="shrink-0" />
              {sidebarOpen && (
                <span className="text-[13px] font-medium">{item.label}</span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* User */}
      <div className="p-3 border-t border-border">
        <div
          className={cn(
            "flex items-center gap-3 rounded-lg",
            sidebarOpen ? "px-3 py-2.5" : "justify-center p-2.5"
          )}
        >
          <div className="w-7 h-7 rounded-full bg-white/[0.08] flex items-center justify-center text-[12px] font-medium shrink-0">
            AC
          </div>
          {sidebarOpen && (
            <div className="min-w-0">
              <p className="text-[13px] font-medium truncate">Alex Chen</p>
              <p className="text-[11px] text-text-tertiary truncate">Pro Plan</p>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}
