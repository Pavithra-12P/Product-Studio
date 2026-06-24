"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { User, Palette, Key, CreditCard, Building2, Save, Check } from "lucide-react";
import { cn } from "@/lib/utils";

const settingsTabs = [
  { id: "profile", label: "Profile", icon: User },
  { id: "workspace", label: "Workspace", icon: Building2 },
  { id: "api-keys", label: "API Keys", icon: Key },
  { id: "appearance", label: "Appearance", icon: Palette },
  { id: "billing", label: "Billing", icon: CreditCard },
];

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("profile");
  const [saved, setSaved] = useState(false);

  const handleSave = () => { setSaved(true); setTimeout(() => setSaved(false), 2000); };

  return (
    <div className="max-w-4xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="font-heading text-2xl font-semibold tracking-tight mb-6">Settings</h1>
        <div className="flex gap-8">
          <nav className="w-48 shrink-0 space-y-0.5">
            {settingsTabs.map((tab) => (
              <button key={tab.id} onClick={() => setActiveTab(tab.id)}
                className={cn("w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-[13px] font-medium transition-all duration-[250ms]",
                  activeTab === tab.id ? "bg-accent-dim text-text-primary" : "text-text-secondary hover:text-text-primary hover:bg-accent-dim")}>
                <tab.icon size={14} />{tab.label}
              </button>
            ))}
          </nav>

          <div className="flex-1">
            {activeTab === "profile" && (
              <div className="space-y-6">
                <div className="card p-6 hover:translate-y-0">
                  <h2 className="font-heading text-[16px] font-semibold mb-4">Profile Information</h2>
                  <div className="space-y-4">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-16 h-16 rounded-full bg-white/[0.08] flex items-center justify-center text-xl font-medium">AC</div>
                      <div><button className="btn-secondary text-[12px] py-1.5 px-3">Change Avatar</button><p className="text-[11px] text-text-muted mt-1">JPG, PNG. Max 2MB.</p></div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div><label className="label">First Name</label><input type="text" defaultValue="Alex" className="input" /></div>
                      <div><label className="label">Last Name</label><input type="text" defaultValue="Chen" className="input" /></div>
                    </div>
                    <div><label className="label">Email</label><input type="email" defaultValue="alex@productstudio.ai" className="input" /></div>
                    <div><label className="label">Role</label><input type="text" defaultValue="Product Engineer" className="input" /></div>
                  </div>
                </div>
                <div className="flex justify-end">
                  <button onClick={handleSave} className="btn-primary">{saved ? <><Check size={14} />Saved</> : <><Save size={14} />Save Changes</>}</button>
                </div>
              </div>
            )}

            {activeTab === "workspace" && (
              <div className="card p-6 hover:translate-y-0">
                <h2 className="font-heading text-[16px] font-semibold mb-4">Workspace Settings</h2>
                <div className="space-y-4">
                  <div><label className="label">Workspace Name</label><input type="text" defaultValue="Product Studio" className="input" /></div>
                  <div><label className="label">Default Project Folder</label><input type="text" defaultValue="/" className="input" /></div>
                  <div><label className="label">Team Members</label>
                    <div className="flex items-center gap-2 mt-2">
                      {["AC", "SK", "JD"].map((init) => (<div key={init} className="w-8 h-8 rounded-full bg-white/[0.08] flex items-center justify-center text-[11px] font-medium">{init}</div>))}
                      <button className="w-8 h-8 rounded-full border border-dashed border-border flex items-center justify-center text-text-muted hover:text-text-secondary hover:border-border-hover transition-all text-lg">+</button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "api-keys" && (
              <div className="card p-6 hover:translate-y-0">
                <h2 className="font-heading text-[16px] font-semibold mb-1">API Keys</h2>
                <p className="text-[13px] text-text-secondary mb-4">Manage API keys for external integrations.</p>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-bg-secondary rounded-lg border border-border">
                    <div><p className="text-[13px] font-medium">OpenAI API Key</p><p className="text-[11px] text-text-muted font-mono mt-0.5">sk-...4f8a</p></div>
                    <span className="badge text-[10px]">Active</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-bg-secondary rounded-lg border border-border">
                    <div><p className="text-[13px] font-medium">Production Key</p><p className="text-[11px] text-text-muted font-mono mt-0.5">ps_live_...9c2d</p></div>
                    <span className="badge text-[10px]">Active</span>
                  </div>
                </div>
                <button className="btn-secondary text-[13px] mt-4">Generate New Key</button>
              </div>
            )}

            {activeTab === "appearance" && (
              <div className="card p-6 hover:translate-y-0">
                <h2 className="font-heading text-[16px] font-semibold mb-4">Appearance</h2>
                <div className="space-y-4">
                  <div><label className="label">Theme</label>
                    <div className="flex gap-3 mt-1">
                      {["Dark", "Light", "System"].map((t) => (
                        <button key={t} className={cn("px-4 py-2 rounded-lg text-[13px] font-medium border transition-all duration-[250ms]", t === "Dark" ? "bg-white text-bg border-white" : "border-border text-text-secondary hover:border-border-hover")}>{t}</button>
                      ))}
                    </div>
                  </div>
                  <div><label className="label">Font Size</label>
                    <select className="input w-auto"><option>Small (13px)</option><option selected>Default (14px)</option><option>Large (16px)</option></select>
                  </div>
                  <div className="flex items-center justify-between">
                    <div><label className="label mb-0">Animations</label><p className="text-[12px] text-text-muted">Enable smooth page transitions</p></div>
                    <div className="w-10 h-6 bg-white/20 rounded-full relative cursor-pointer"><div className="absolute right-0.5 top-0.5 w-5 h-5 bg-white rounded-full transition-all" /></div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "billing" && (
              <div className="space-y-4">
                <div className="card p-6 hover:translate-y-0">
                  <div className="flex items-center justify-between mb-4">
                    <div><h2 className="font-heading text-[16px] font-semibold">Pro Plan</h2><p className="text-[13px] text-text-secondary">$29/month · Renews Dec 15, 2025</p></div>
                    <span className="badge text-[11px]">Active</span>
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="p-3 bg-bg-secondary rounded-lg"><p className="text-[11px] text-text-muted">Blueprints Used</p><p className="text-lg font-semibold mt-0.5">47 <span className="text-[12px] text-text-muted font-normal">/ ∞</span></p></div>
                    <div className="p-3 bg-bg-secondary rounded-lg"><p className="text-[11px] text-text-muted">API Calls</p><p className="text-lg font-semibold mt-0.5">1,247</p></div>
                    <div className="p-3 bg-bg-secondary rounded-lg"><p className="text-[11px] text-text-muted">Storage</p><p className="text-lg font-semibold mt-0.5">2.4 <span className="text-[12px] text-text-muted font-normal">GB</span></p></div>
                  </div>
                </div>
                <button className="btn-secondary text-[13px]">Manage Subscription</button>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
