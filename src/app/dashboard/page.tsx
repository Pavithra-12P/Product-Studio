"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useAppStore } from "@/store";
import {
  Plus,
  ArrowRight,
  Folder,
  Clock,
  MoreHorizontal,
  Copy,
  Archive,
  Trash2,
  Loader2,
  CheckCircle2,
  FileEdit,
} from "lucide-react";
import { formatRelativeTime } from "@/lib/utils";
import { useState, useRef, useEffect } from "react";
import type { Project } from "@/types";

const fadeUp = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
};

export default function DashboardPage() {
  const { projects, user } = useAppStore();

  const completedCount = projects.filter((p) => p.status === "completed").length;
  const activeCount = projects.filter(
    (p) => p.status === "draft" || p.status === "generating"
  ).length;

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <motion.div {...fadeUp} className="mb-10">
        <h1 className="font-heading text-2xl font-semibold tracking-tight mb-1">
          Welcome back, {user?.name?.split(" ")[0] || "there"}
        </h1>
        <p className="text-text-secondary text-[14px]">
          You have {activeCount} active project{activeCount !== 1 ? "s" : ""} and{" "}
          {completedCount} completed blueprint{completedCount !== 1 ? "s" : ""}.
        </p>
      </motion.div>

      {/* Quick Stats */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10"
      >
        {[
          { label: "Total Projects", value: projects.length, icon: Folder },
          {
            label: "Completed Blueprints",
            value: completedCount,
            icon: CheckCircle2,
          },
          { label: "Active Generations", value: activeCount, icon: Loader2 },
        ].map((stat) => (
          <div key={stat.label} className="card p-5 cursor-default hover:translate-y-0">
            <div className="flex items-center justify-between mb-3">
              <stat.icon size={16} className="text-text-tertiary" />
            </div>
            <p className="font-heading text-2xl font-semibold">{stat.value}</p>
            <p className="text-text-secondary text-[13px] mt-1">
              {stat.label}
            </p>
          </div>
        ))}
      </motion.div>

      {/* Recent Projects */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
      >
        <div className="flex items-center justify-between mb-5">
          <h2 className="font-heading text-[16px] font-semibold">
            Recent Projects
          </h2>
          <div className="flex items-center gap-3">
            <Link
              href="/dashboard/projects"
              className="text-[13px] text-text-secondary hover:text-text-primary flex items-center gap-1 transition-colors duration-[250ms]"
            >
              View all
              <ArrowRight size={13} />
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* New Project Card */}
          <Link
            href="/dashboard/new"
            className="card p-6 flex flex-col items-center justify-center text-center border-dashed min-h-[180px] group"
          >
            <div className="w-10 h-10 rounded-xl bg-white/[0.04] flex items-center justify-center mb-3 group-hover:bg-white/[0.08] transition-colors duration-[250ms]">
              <Plus size={18} className="text-text-tertiary" />
            </div>
            <p className="text-[14px] font-medium text-text-secondary group-hover:text-text-primary transition-colors duration-[250ms]">
              New Project
            </p>
            <p className="text-[12px] text-text-muted mt-1">
              Start from scratch
            </p>
          </Link>

          {projects
            .filter((p) => p.status !== "archived")
            .slice(0, 5)
            .map((project, i) => (
              <ProjectCard key={project.id} project={project} index={i} />
            ))}
        </div>
      </motion.div>
    </div>
  );
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const { duplicateProject, archiveProject, deleteProject } = useAppStore();

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const statusConfig = {
    draft: { label: "Draft", icon: FileEdit, className: "text-text-muted" },
    generating: {
      label: "Generating",
      icon: Loader2,
      className: "text-text-secondary",
    },
    completed: {
      label: "Completed",
      icon: CheckCircle2,
      className: "text-text-secondary",
    },
    archived: {
      label: "Archived",
      icon: Archive,
      className: "text-text-muted",
    },
  };

  const status = statusConfig[project.status];

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.05 * (index + 1) }}
      className="card p-5 relative group"
    >
      <div className="flex items-start justify-between mb-3">
        <Link
          href={
            project.blueprint
              ? `/dashboard/blueprint/${project.id}`
              : `/dashboard/new?project=${project.id}`
          }
          className="flex-1 min-w-0"
        >
          <h3 className="font-heading text-[15px] font-medium truncate hover:text-white transition-colors duration-[250ms]">
            {project.name}
          </h3>
        </Link>

        <div className="relative" ref={menuRef}>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="p-1 rounded-md text-text-muted hover:text-text-secondary opacity-0 group-hover:opacity-100 transition-all duration-[250ms]"
            aria-label="Project menu"
          >
            <MoreHorizontal size={14} />
          </button>
          {menuOpen && (
            <div className="absolute right-0 top-full mt-1 w-40 bg-surface border border-border rounded-lg shadow-lg z-20 overflow-hidden">
              <button
                onClick={() => {
                  duplicateProject(project.id);
                  setMenuOpen(false);
                }}
                className="w-full flex items-center gap-2 px-3 py-2 text-[13px] text-text-secondary hover:text-text-primary hover:bg-surface-hover transition-colors"
              >
                <Copy size={13} />
                Duplicate
              </button>
              <button
                onClick={() => {
                  archiveProject(project.id);
                  setMenuOpen(false);
                }}
                className="w-full flex items-center gap-2 px-3 py-2 text-[13px] text-text-secondary hover:text-text-primary hover:bg-surface-hover transition-colors"
              >
                <Archive size={13} />
                Archive
              </button>
              <div className="border-t border-border" />
              <button
                onClick={() => {
                  deleteProject(project.id);
                  setMenuOpen(false);
                }}
                className="w-full flex items-center gap-2 px-3 py-2 text-[13px] text-red-400 hover:bg-surface-hover transition-colors"
              >
                <Trash2 size={13} />
                Delete
              </button>
            </div>
          )}
        </div>
      </div>

      <p className="text-text-secondary text-[13px] line-clamp-2 mb-4 leading-relaxed">
        {project.description}
      </p>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <status.icon
            size={12}
            className={`${status.className} ${
              project.status === "generating" ? "animate-spin" : ""
            }`}
          />
          <span className={`text-[12px] ${status.className}`}>
            {status.label}
          </span>
        </div>
        <div className="flex items-center gap-1 text-text-muted">
          <Clock size={11} />
          <span className="text-[11px]">
            {formatRelativeTime(project.updatedAt)}
          </span>
        </div>
      </div>

      {project.tags && project.tags.length > 0 && (
        <div className="flex gap-1.5 mt-3 flex-wrap">
          {project.tags.map((tag) => (
            <span key={tag} className="badge text-[10px] py-0.5 px-2">
              {tag}
            </span>
          ))}
        </div>
      )}
    </motion.div>
  );
}
