"use client";

import { useEffect, type ReactNode } from "react";
import { useAppStore } from "@/store";
import { Sidebar } from "@/components/layout/sidebar";
import { TopBar } from "@/components/layout/top-bar";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const { initializeStore, sidebarOpen } = useAppStore();

  useEffect(() => {
    initializeStore();
  }, [initializeStore]);

  return (
    <div className="min-h-screen bg-bg flex">
      <Sidebar />
      <div
        className={`flex-1 flex flex-col transition-all duration-[250ms] ${
          sidebarOpen ? "ml-[240px]" : "ml-[64px]"
        }`}
      >
        <TopBar />
        <main className="flex-1 p-8">{children}</main>
      </div>
    </div>
  );
}
