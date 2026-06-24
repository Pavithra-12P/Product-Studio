"use client";

import { motion } from "framer-motion";
import { useAppStore } from "@/store";
import { Clock, CheckCircle2, FileEdit, Loader2, Archive } from "lucide-react";
import { formatDate } from "@/lib/utils";
import Link from "next/link";

export default function HistoryPage() {
  const { projects } = useAppStore();
  const sorted = [...projects].sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());

  const grouped = sorted.reduce((acc, project) => {
    const date = formatDate(project.updatedAt);
    if (!acc[date]) acc[date] = [];
    acc[date].push(project);
    return acc;
  }, {} as Record<string, typeof projects>);

  const statusIcon = { draft: FileEdit, generating: Loader2, completed: CheckCircle2, archived: Archive };

  return (
    <div className="max-w-4xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="font-heading text-2xl font-semibold tracking-tight mb-2">History</h1>
        <p className="text-text-secondary text-[14px] mb-8">A timeline of all project activity.</p>
        <div className="space-y-8">
          {Object.entries(grouped).map(([date, items]) => (
            <div key={date}>
              <p className="text-[12px] text-text-muted font-medium mb-3 flex items-center gap-2"><Clock size={12} />{date}</p>
              <div className="space-y-2 pl-5 border-l border-border">
                {items.map((project) => {
                  const Icon = statusIcon[project.status];
                  return (
                    <Link key={project.id} href={project.blueprint ? `/dashboard/blueprint/${project.id}` : `/dashboard/new`}
                      className="flex items-center gap-3 p-3 rounded-lg hover:bg-accent-dim transition-colors duration-[250ms] -ml-[21px]">
                      <div className="w-4 h-4 rounded-full bg-bg-secondary border-2 border-border flex items-center justify-center shrink-0">
                        <div className="w-1.5 h-1.5 rounded-full bg-text-muted" />
                      </div>
                      <Icon size={14} className="text-text-muted shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="text-[13px] font-medium truncate">{project.name}</p>
                        <p className="text-[11px] text-text-tertiary">
                          {project.status === "completed" ? "Blueprint generated" : project.status === "generating" ? "Generation in progress" : project.status === "archived" ? "Archived" : "Draft created"} · v{project.version}
                        </p>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
