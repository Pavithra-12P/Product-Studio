"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useAppStore } from "@/store";
import { useState } from "react";
import { Search, Filter, FolderOpen, Clock, CheckCircle2, Loader2, FileEdit, Archive, MoreHorizontal, Copy, Trash2 } from "lucide-react";
import { formatRelativeTime, cn } from "@/lib/utils";

type SortOption = "newest" | "oldest" | "name";
type FilterOption = "all" | "draft" | "generating" | "completed" | "archived";

export default function ProjectsPage() {
  const { projects, duplicateProject, archiveProject, deleteProject } = useAppStore();
  const [sort, setSort] = useState<SortOption>("newest");
  const [filter, setFilter] = useState<FilterOption>("all");
  const [search, setSearch] = useState("");

  const filtered = projects
    .filter((p) => filter === "all" || p.status === filter)
    .filter((p) => p.name.toLowerCase().includes(search.toLowerCase()) || p.description.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => {
      if (sort === "name") return a.name.localeCompare(b.name);
      if (sort === "oldest") return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });

  const statusIcon = { draft: FileEdit, generating: Loader2, completed: CheckCircle2, archived: Archive };
  const filters: { label: string; value: FilterOption }[] = [
    { label: "All", value: "all" }, { label: "Draft", value: "draft" }, { label: "Generating", value: "generating" }, { label: "Completed", value: "completed" }, { label: "Archived", value: "archived" },
  ];

  return (
    <div className="max-w-6xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="font-heading text-2xl font-semibold tracking-tight mb-6">Projects</h1>
        <div className="flex items-center justify-between mb-6 gap-4">
          <div className="relative flex-1 max-w-sm">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
            <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search projects..." className="input pl-9 text-[13px]" />
          </div>
          <div className="flex items-center gap-2">
            {filters.map((f) => (
              <button key={f.value} onClick={() => setFilter(f.value)} className={cn("px-3 py-1.5 text-[12px] rounded-lg font-medium transition-all duration-[250ms]", filter === f.value ? "bg-white text-bg" : "text-text-secondary hover:text-text-primary hover:bg-accent-dim")}>
                {f.label}
              </button>
            ))}
            <select value={sort} onChange={(e) => setSort(e.target.value as SortOption)} className="input py-1.5 px-3 text-[12px] w-auto bg-surface">
              <option value="newest">Newest</option>
              <option value="oldest">Oldest</option>
              <option value="name">Name</option>
            </select>
          </div>
        </div>

        {filtered.length === 0 ? (
          <div className="card p-12 text-center hover:translate-y-0">
            <FolderOpen size={24} className="text-text-muted mx-auto mb-3" />
            <p className="text-text-secondary text-[14px]">No projects found</p>
          </div>
        ) : (
          <div className="space-y-2">
            {filtered.map((project, i) => {
              const Icon = statusIcon[project.status];
              return (
                <motion.div key={project.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.03 }}
                  className="card flex items-center gap-4 px-5 py-4 group hover:translate-y-0 hover:border-border-hover">
                  <Icon size={14} className={cn("shrink-0", project.status === "generating" ? "animate-spin text-text-secondary" : "text-text-muted")} />
                  <Link href={project.blueprint ? `/dashboard/blueprint/${project.id}` : `/dashboard/new?project=${project.id}`} className="flex-1 min-w-0">
                    <p className="text-[14px] font-medium truncate">{project.name}</p>
                    <p className="text-[12px] text-text-tertiary truncate">{project.description}</p>
                  </Link>
                  {project.tags?.map((t) => (<span key={t} className="badge text-[10px] hidden md:inline-flex">{t}</span>))}
                  <span className="text-[12px] text-text-muted flex items-center gap-1 shrink-0"><Clock size={11} />{formatRelativeTime(project.updatedAt)}</span>
                  <span className="badge text-[11px]">v{project.version}</span>
                  <div className="relative">
                    <button className="p-1.5 rounded-md text-text-muted hover:text-text-secondary opacity-0 group-hover:opacity-100 transition-all" onClick={(e) => { e.preventDefault(); const menu = e.currentTarget.nextElementSibling; menu?.classList.toggle("hidden"); }}>
                      <MoreHorizontal size={14} />
                    </button>
                    <div className="hidden absolute right-0 top-full mt-1 w-36 bg-surface border border-border rounded-lg shadow-lg z-20 overflow-hidden">
                      <button onClick={() => duplicateProject(project.id)} className="w-full flex items-center gap-2 px-3 py-2 text-[12px] text-text-secondary hover:bg-surface-hover"><Copy size={12} />Duplicate</button>
                      <button onClick={() => archiveProject(project.id)} className="w-full flex items-center gap-2 px-3 py-2 text-[12px] text-text-secondary hover:bg-surface-hover"><Archive size={12} />Archive</button>
                      <button onClick={() => deleteProject(project.id)} className="w-full flex items-center gap-2 px-3 py-2 text-[12px] text-red-400 hover:bg-surface-hover"><Trash2 size={12} />Delete</button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </motion.div>
    </div>
  );
}
