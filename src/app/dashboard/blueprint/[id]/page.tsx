"use client";

import { motion } from "framer-motion";
import { useState, use } from "react";
import { useAppStore } from "@/store";
import {
  FileText, Layers, Database, Code2, Map, Download,
  Users, ArrowUpRight, ChevronRight, Shield, CheckCircle2,
  Clock, Tag, AlertCircle, BarChart3, Globe,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { Blueprint, Requirement, ApiEndpoint } from "@/types";

const tabs = [
  { id: "overview", label: "Overview", icon: FileText },
  { id: "requirements", label: "Requirements", icon: Shield },
  { id: "stories", label: "User Stories", icon: Users },
  { id: "database", label: "Database", icon: Database },
  { id: "api", label: "API", icon: Code2 },
  { id: "architecture", label: "Architecture", icon: Layers },
  { id: "roadmap", label: "Roadmap", icon: Map },
  { id: "export", label: "Export", icon: Download },
];

export default function BlueprintPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { projects } = useAppStore();
  const [activeTab, setActiveTab] = useState("overview");
  const project = projects.find((p) => p.id === id);
  const blueprint = project?.blueprint;

  if (!project || !blueprint) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <div className="text-center">
          <AlertCircle size={24} className="text-text-muted mx-auto mb-3" />
          <p className="text-text-secondary text-[14px]">Blueprint not found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="font-heading text-2xl font-semibold tracking-tight">{project.name}</h1>
            <p className="text-text-secondary text-[14px] mt-1">{project.description}</p>
          </div>
          <div className="flex items-center gap-2">
            <span className="badge"><CheckCircle2 size={11} className="mr-1" />v{project.version}</span>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-1 border-b border-border mb-8 overflow-x-auto pb-px">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "flex items-center gap-2 px-4 py-3 text-[13px] font-medium border-b-2 transition-all duration-[250ms] whitespace-nowrap",
                activeTab === tab.id
                  ? "border-white text-text-primary"
                  : "border-transparent text-text-secondary hover:text-text-primary"
              )}
            >
              <tab.icon size={14} />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <motion.div key={activeTab} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
          {activeTab === "overview" && <OverviewTab blueprint={blueprint} />}
          {activeTab === "requirements" && <RequirementsTab requirements={blueprint.requirements} />}
          {activeTab === "stories" && <StoriesTab stories={blueprint.userStories} />}
          {activeTab === "database" && <DatabaseTab schema={blueprint.database} />}
          {activeTab === "api" && <ApiTab endpoints={blueprint.api} />}
          {activeTab === "architecture" && <ArchitectureTab layers={blueprint.architecture} />}
          {activeTab === "roadmap" && <RoadmapTab phases={blueprint.roadmap} />}
          {activeTab === "export" && <ExportTab projectName={project.name} />}
        </motion.div>
      </motion.div>
    </div>
  );
}

function OverviewTab({ blueprint }: { blueprint: Blueprint }) {
  const o = blueprint.overview;
  return (
    <div className="space-y-6">
      <div className="card p-6">
        <h3 className="font-heading text-[15px] font-medium mb-3">Summary</h3>
        <p className="text-text-secondary text-[14px] leading-relaxed">{o.summary}</p>
      </div>
      <div className="card p-6">
        <h3 className="font-heading text-[15px] font-medium mb-3">Vision</h3>
        <p className="text-text-secondary text-[14px] leading-relaxed">{o.vision}</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="card p-6">
          <h3 className="font-heading text-[15px] font-medium mb-3">Objectives</h3>
          <ul className="space-y-2">
            {o.objectives.map((obj, i) => (
              <li key={i} className="flex items-start gap-2 text-[13px] text-text-secondary">
                <ChevronRight size={12} className="mt-1 shrink-0 text-text-muted" />{obj}
              </li>
            ))}
          </ul>
        </div>
        <div className="card p-6">
          <h3 className="font-heading text-[15px] font-medium mb-3">Target Users</h3>
          <ul className="space-y-2">
            {o.targetUsers.map((user, i) => (
              <li key={i} className="flex items-start gap-2 text-[13px] text-text-secondary">
                <Users size={12} className="mt-1 shrink-0 text-text-muted" />{user}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="card p-5 hover:translate-y-0 cursor-default">
          <p className="text-[12px] text-text-muted mb-1">Timeline</p>
          <p className="font-heading text-lg font-semibold">{o.estimatedTimeline}</p>
        </div>
        <div className="card p-5 hover:translate-y-0 cursor-default">
          <p className="text-[12px] text-text-muted mb-1">Complexity</p>
          <p className="font-heading text-lg font-semibold capitalize">{o.complexity}</p>
        </div>
        <div className="card p-5 hover:translate-y-0 cursor-default">
          <p className="text-[12px] text-text-muted mb-1">Requirements</p>
          <p className="font-heading text-lg font-semibold">{blueprint.requirements.length}</p>
        </div>
        <div className="card p-5 hover:translate-y-0 cursor-default">
          <p className="text-[12px] text-text-muted mb-1">API Endpoints</p>
          <p className="font-heading text-lg font-semibold">{blueprint.api.length}</p>
        </div>
      </div>
      <div className="card p-6">
        <h3 className="font-heading text-[15px] font-medium mb-4">Technology Stack</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {o.techStack.map((item) => (
            <div key={item.name} className="flex items-center gap-3 p-3 bg-bg-secondary rounded-lg border border-border">
              <Globe size={14} className="text-text-muted shrink-0" />
              <div className="min-w-0">
                <p className="text-[13px] font-medium">{item.name}<span className="text-text-muted font-normal ml-2 text-[12px]">{item.category}</span></p>
                <p className="text-[12px] text-text-tertiary truncate">{item.reason}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function RequirementsTab({ requirements }: { requirements: Requirement[] }) {
  const priorityColors: Record<string, string> = { critical: "bg-white/20 text-white", high: "bg-white/10 text-text-secondary", medium: "bg-white/[0.06] text-text-tertiary", low: "bg-white/[0.04] text-text-muted" };
  return (
    <div className="space-y-3">
      {requirements.map((req) => (
        <div key={req.id} className="card p-5 hover:translate-y-0">
          <div className="flex items-start justify-between gap-4 mb-2">
            <h3 className="font-heading text-[14px] font-medium">{req.title}</h3>
            <div className="flex items-center gap-2 shrink-0">
              <span className={cn("badge text-[11px]", priorityColors[req.priority])}>{req.priority}</span>
              <span className="badge text-[11px]">{req.category}</span>
            </div>
          </div>
          <p className="text-text-secondary text-[13px] leading-relaxed">{req.description}</p>
        </div>
      ))}
    </div>
  );
}

function StoriesTab({ stories }: { stories: Blueprint["userStories"] }) {
  const epicGroups = stories.reduce((acc, story) => {
    if (!acc[story.epic]) acc[story.epic] = [];
    acc[story.epic].push(story);
    return acc;
  }, {} as Record<string, typeof stories>);

  return (
    <div className="space-y-8">
      {Object.entries(epicGroups).map(([epic, epStories]) => (
        <div key={epic}>
          <h3 className="font-heading text-[15px] font-medium mb-3 flex items-center gap-2">
            <Tag size={14} className="text-text-tertiary" />{epic}
          </h3>
          <div className="space-y-3">
            {epStories.map((story) => (
              <div key={story.id} className="card p-5 hover:translate-y-0">
                <div className="flex items-start justify-between mb-2">
                  <h4 className="text-[14px] font-medium">{story.title}</h4>
                  <div className="flex items-center gap-2">
                    <span className="badge text-[11px]">{story.priority}</span>
                    <span className="badge text-[11px]">{story.points} pts</span>
                  </div>
                </div>
                <p className="text-text-secondary text-[13px] mb-3">{story.description}</p>
                <div className="space-y-1.5">
                  <p className="text-[12px] text-text-muted font-medium">Acceptance Criteria</p>
                  {story.acceptanceCriteria.map((ac, i) => (
                    <p key={i} className="text-[12px] text-text-tertiary flex items-start gap-2">
                      <CheckCircle2 size={11} className="mt-0.5 shrink-0" />{ac}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function DatabaseTab({ schema }: { schema: Blueprint["database"] }) {
  return (
    <div className="space-y-6">
      {/* ER Diagram Visualization */}
      <div className="card p-6">
        <h3 className="font-heading text-[15px] font-medium mb-4">Entity Relationships</h3>
        <div className="flex flex-wrap gap-3 items-center justify-center p-4 bg-bg-secondary rounded-lg border border-border">
          {schema.relationships.map((rel, i) => (
            <div key={i} className="flex items-center gap-2 text-[12px] font-mono">
              <span className="px-2 py-1 bg-surface border border-border rounded">{rel.from}</span>
              <span className="text-text-muted">{rel.type === "one-to-many" ? "1→N" : rel.type === "one-to-one" ? "1→1" : "N→N"}</span>
              <span className="px-2 py-1 bg-surface border border-border rounded">{rel.to}</span>
            </div>
          ))}
        </div>
      </div>
      {/* Tables */}
      {schema.tables.map((table) => (
        <div key={table.name} className="card overflow-hidden hover:translate-y-0">
          <div className="px-5 py-4 border-b border-border bg-surface">
            <h3 className="font-heading text-[14px] font-medium font-mono">{table.name}</h3>
            <p className="text-[12px] text-text-tertiary mt-0.5">{table.description}</p>
          </div>
          <div className="divide-y divide-border">
            <div className="grid grid-cols-12 gap-4 px-5 py-2.5 text-[11px] font-medium text-text-muted uppercase tracking-wider">
              <div className="col-span-3">Column</div>
              <div className="col-span-2">Type</div>
              <div className="col-span-1">Key</div>
              <div className="col-span-1">Null</div>
              <div className="col-span-5">Description</div>
            </div>
            {table.columns.map((col) => (
              <div key={col.name} className="grid grid-cols-12 gap-4 px-5 py-2.5 text-[13px] hover:bg-surface-hover transition-colors">
                <div className="col-span-3 font-mono text-[12px] font-medium">{col.name}</div>
                <div className="col-span-2 font-mono text-[11px] text-text-tertiary">{col.type}</div>
                <div className="col-span-1">{col.primaryKey && <span className="text-[10px] badge py-0 px-1.5">PK</span>}{col.foreignKey && <span className="text-[10px] badge py-0 px-1.5">FK</span>}</div>
                <div className="col-span-1 text-text-muted text-[12px]">{col.nullable ? "Yes" : "No"}</div>
                <div className="col-span-5 text-text-secondary text-[12px]">{col.description}</div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function ApiTab({ endpoints }: { endpoints: ApiEndpoint[] }) {
  const [expanded, setExpanded] = useState<string | null>(null);
  const methodColors: Record<string, string> = { GET: "text-emerald-400", POST: "text-blue-400", PUT: "text-amber-400", PATCH: "text-orange-400", DELETE: "text-red-400" };
  const categories = [...new Set(endpoints.map((e) => e.category))];

  return (
    <div className="space-y-6">
      {categories.map((cat) => (
        <div key={cat}>
          <h3 className="font-heading text-[15px] font-medium mb-3">{cat}</h3>
          <div className="card overflow-hidden hover:translate-y-0">
            {endpoints.filter((e) => e.category === cat).map((ep, i, arr) => (
              <div key={ep.id} className={i < arr.length - 1 ? "border-b border-border" : ""}>
                <button onClick={() => setExpanded(expanded === ep.id ? null : ep.id)} className="w-full flex items-center gap-3 px-5 py-3 hover:bg-surface-hover transition-colors text-left">
                  <span className={cn("text-[11px] font-mono font-bold w-12", methodColors[ep.method])}>{ep.method}</span>
                  <span className="text-[13px] font-mono text-text-secondary flex-1">{ep.path}</span>
                  <span className="text-[12px] text-text-muted">{ep.summary}</span>
                  {ep.auth && <Shield size={12} className="text-text-muted" />}
                  <ChevronRight size={12} className={cn("text-text-muted transition-transform", expanded === ep.id && "rotate-90")} />
                </button>
                {expanded === ep.id && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} className="px-5 pb-4 border-t border-border bg-bg-secondary">
                    <div className="pt-4 space-y-3">
                      <p className="text-[13px] text-text-secondary">{ep.description}</p>
                      {ep.requestBody && (
                        <div><p className="text-[11px] text-text-muted font-medium mb-1">Request Body</p><code className="text-[12px] text-text-tertiary font-mono bg-surface px-2 py-1 rounded">{ep.requestBody}</code></div>
                      )}
                      {ep.responseBody && (
                        <div><p className="text-[11px] text-text-muted font-medium mb-1">Response</p><code className="text-[12px] text-text-tertiary font-mono bg-surface px-2 py-1 rounded">{ep.responseBody}</code></div>
                      )}
                    </div>
                  </motion.div>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function ArchitectureTab({ layers }: { layers: Blueprint["architecture"] }) {
  return (
    <div className="space-y-6">
      {layers.map((layer, i) => (
        <div key={layer.name} className="card p-6 hover:translate-y-0">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 rounded-lg bg-white/[0.06] flex items-center justify-center text-[13px] font-mono text-text-tertiary">{i + 1}</div>
            <div>
              <h3 className="font-heading text-[15px] font-medium">{layer.name}</h3>
              <p className="text-[12px] text-text-tertiary">{layer.description}</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {layer.components.map((comp) => (
              <div key={comp.name} className="p-4 bg-bg-secondary rounded-lg border border-border">
                <p className="text-[13px] font-medium mb-1">{comp.name}</p>
                <p className="text-[12px] text-text-tertiary mb-2">{comp.description}</p>
                <span className="badge text-[10px]">{comp.technology}</span>
                {comp.connections.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-1">{comp.connections.map((c) => (<span key={c} className="text-[10px] text-text-muted flex items-center gap-0.5"><ArrowUpRight size={9} />{c}</span>))}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function RoadmapTab({ phases }: { phases: Blueprint["roadmap"] }) {
  return (
    <div className="space-y-6">
      {phases.map((phase, i) => (
        <div key={phase.id} className="card p-6 hover:translate-y-0">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 rounded-lg bg-white/[0.06] flex items-center justify-center text-[13px] font-mono font-medium">{i + 1}</div>
            <div className="flex-1">
              <h3 className="font-heading text-[15px] font-medium">{phase.name}</h3>
              <p className="text-[12px] text-text-tertiary">{phase.description}</p>
            </div>
            <span className="badge text-[11px]"><Clock size={10} className="mr-1" />{phase.duration}</span>
          </div>
          <div className="space-y-3">
            {phase.milestones.map((ms) => (
              <div key={ms.title} className="p-4 bg-bg-secondary rounded-lg border border-border">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-[13px] font-medium">{ms.title}</p>
                  <span className="text-[11px] text-text-muted">{ms.estimatedDays} days</span>
                </div>
                <p className="text-[12px] text-text-tertiary mb-2">{ms.description}</p>
                <div className="flex flex-wrap gap-1.5">{ms.tasks.map((t) => (<span key={t} className="badge text-[10px] py-0.5">{t}</span>))}</div>
              </div>
            ))}
          </div>
          <div className="mt-4 pt-4 border-t border-border">
            <p className="text-[12px] text-text-muted font-medium mb-2">Deliverables</p>
            <div className="flex flex-wrap gap-2">{phase.deliverables.map((d) => (<span key={d} className="text-[12px] text-text-secondary flex items-center gap-1"><CheckCircle2 size={11} />{d}</span>))}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

function ExportTab({ projectName }: { projectName: string }) {
  const formats = [
    { name: "PDF Document", desc: "Complete blueprint as formatted PDF", icon: FileText },
    { name: "Markdown", desc: "Raw markdown for documentation", icon: Code2 },
    { name: "JSON Schema", desc: "Structured data for integrations", icon: Database },
    { name: "Notion Import", desc: "Ready for Notion workspace import", icon: Layers },
  ];
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {formats.map((fmt) => (
        <button key={fmt.name} className="card p-6 text-left group hover:translate-y-0 hover:border-border-hover">
          <fmt.icon size={18} className="text-text-tertiary mb-3 group-hover:text-text-secondary transition-colors" />
          <h3 className="text-[14px] font-medium mb-1">{fmt.name}</h3>
          <p className="text-[13px] text-text-secondary">{fmt.desc}</p>
          <span className="inline-flex items-center gap-1 text-[12px] text-text-muted mt-3 group-hover:text-text-secondary transition-colors">
            Export {projectName} <ArrowUpRight size={11} />
          </span>
        </button>
      ))}
    </div>
  );
}
