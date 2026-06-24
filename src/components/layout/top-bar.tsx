"use client";

import { useState } from "react";
import { useAppStore } from "@/store";
import { Search, Bell, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { formatRelativeTime } from "@/lib/utils";

export function TopBar() {
  const { searchQuery, setSearchQuery, notifications, markNotificationRead } =
    useAppStore();
  const [showNotifications, setShowNotifications] = useState(false);
  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <header className="h-16 border-b border-border flex items-center justify-between px-8 bg-bg/80 backdrop-blur-xl sticky top-0 z-30">
      {/* Search */}
      <div className="relative w-80">
        <Search
          size={14}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted"
        />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search projects, blueprints..."
          className="input pl-9 py-2 text-[13px] bg-bg-secondary/50"
          id="global-search"
        />
        <kbd className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] text-text-muted bg-white/[0.04] px-1.5 py-0.5 rounded font-mono">
          ⌘K
        </kbd>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-2">
        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative p-2 rounded-lg text-text-secondary hover:text-text-primary hover:bg-accent-dim transition-all duration-[250ms]"
            aria-label="Notifications"
            id="notifications-button"
          >
            <Bell size={16} />
            {unreadCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-white" />
            )}
          </button>

          {showNotifications && (
            <>
              <div
                className="fixed inset-0 z-40"
                onClick={() => setShowNotifications(false)}
              />
              <div className="absolute right-0 top-full mt-2 w-80 bg-surface border border-border rounded-xl shadow-lg z-50 overflow-hidden">
                <div className="flex items-center justify-between px-4 py-3 border-b border-border">
                  <h3 className="text-[13px] font-medium">Notifications</h3>
                  <button
                    onClick={() => setShowNotifications(false)}
                    className="p-1 rounded-md text-text-muted hover:text-text-secondary transition-colors"
                  >
                    <X size={14} />
                  </button>
                </div>
                <div className="max-h-80 overflow-y-auto">
                  {notifications.length === 0 ? (
                    <div className="p-6 text-center text-text-muted text-[13px]">
                      No notifications
                    </div>
                  ) : (
                    notifications.map((notif) => (
                      <button
                        key={notif.id}
                        onClick={() => markNotificationRead(notif.id)}
                        className={cn(
                          "w-full text-left px-4 py-3 border-b border-border last:border-0 hover:bg-surface-hover transition-colors duration-[250ms]",
                          !notif.read && "bg-white/[0.02]"
                        )}
                      >
                        <div className="flex items-start gap-3">
                          {!notif.read && (
                            <div className="w-1.5 h-1.5 rounded-full bg-white mt-1.5 shrink-0" />
                          )}
                          <div className={cn(!notif.read ? "" : "ml-[18px]")}>
                            <p className="text-[13px] font-medium">
                              {notif.title}
                            </p>
                            <p className="text-[12px] text-text-secondary mt-0.5 line-clamp-2">
                              {notif.message}
                            </p>
                            <p className="text-[11px] text-text-muted mt-1">
                              {formatRelativeTime(notif.createdAt)}
                            </p>
                          </div>
                        </div>
                      </button>
                    ))
                  )}
                </div>
              </div>
            </>
          )}
        </div>

        {/* Profile */}
        <button className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-accent-dim transition-all duration-[250ms]">
          <div className="w-7 h-7 rounded-full bg-white/[0.08] flex items-center justify-center text-[11px] font-medium">
            AC
          </div>
        </button>
      </div>
    </header>
  );
}
