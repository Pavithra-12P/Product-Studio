"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { FileText, ShoppingCart, Stethoscope, GraduationCap, Truck, MessageSquare, ArrowRight } from "lucide-react";

const templates = [
  { icon: ShoppingCart, name: "E-Commerce Platform", desc: "Multi-vendor marketplace with payments, inventory, and analytics", category: "Commerce" },
  { icon: Stethoscope, name: "Healthcare Portal", desc: "Patient management system with scheduling and compliance tracking", category: "Healthcare" },
  { icon: GraduationCap, name: "Learning Management", desc: "Online education platform with courses, quizzes, and certifications", category: "Education" },
  { icon: Truck, name: "Logistics Dashboard", desc: "Fleet management with route optimization and real-time tracking", category: "Logistics" },
  { icon: MessageSquare, name: "Team Communication", desc: "Internal messaging platform with channels and file sharing", category: "Productivity" },
  { icon: FileText, name: "Content Management", desc: "Headless CMS with editorial workflow and multi-channel publishing", category: "Content" },
];

export default function TemplatesPage() {
  return (
    <div className="max-w-6xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="font-heading text-2xl font-semibold tracking-tight mb-2">Templates</h1>
        <p className="text-text-secondary text-[14px] mb-8">Start with a pre-configured template to accelerate your blueprint generation.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {templates.map((t, i) => (
            <motion.div key={t.name} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
              <Link href="/dashboard/new" className="card p-6 block group">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-9 h-9 rounded-lg bg-white/[0.06] flex items-center justify-center text-text-secondary group-hover:text-text-primary transition-colors"><t.icon size={18} /></div>
                  <span className="badge text-[10px]">{t.category}</span>
                </div>
                <h3 className="font-heading text-[15px] font-medium mb-1">{t.name}</h3>
                <p className="text-text-secondary text-[13px] mb-3">{t.desc}</p>
                <span className="text-[12px] text-text-muted group-hover:text-text-secondary flex items-center gap-1 transition-colors">Use template <ArrowRight size={11} /></span>
              </Link>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
