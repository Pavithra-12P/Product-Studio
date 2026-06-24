"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  ArrowRight,
  Play,
  Layers,
  Database,
  Code2,
  Map,
  Shield,
  Zap,
  GitBranch,
  BarChart3,
  ChevronRight,
  Cpu,
  FileText,
  Globe,
  Check,
} from "lucide-react";
import { useState } from "react";

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
};

const stagger = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-bg">
      <Navbar />
      <Hero />
      <Features />
      <Workflow />
      <Architecture />
      <Testimonials />
      <Pricing />
      <Footer />
    </div>
  );
}

function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  if (typeof window !== "undefined") {
    window.addEventListener("scroll", () => {
      setScrolled(window.scrollY > 20);
    });
  }

  return (
    <motion.nav
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-[250ms] ${
        scrolled ? "glass" : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="w-7 h-7 bg-white rounded-lg flex items-center justify-center">
            <Cpu size={14} className="text-bg" />
          </div>
          <span className="font-heading font-semibold text-[15px] tracking-tight">
            Product Studio
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          <a href="#features" className="text-text-secondary hover:text-text-primary text-[13px] transition-colors duration-[250ms]">
            Features
          </a>
          <a href="#workflow" className="text-text-secondary hover:text-text-primary text-[13px] transition-colors duration-[250ms]">
            Workflow
          </a>
          <a href="#architecture" className="text-text-secondary hover:text-text-primary text-[13px] transition-colors duration-[250ms]">
            Architecture
          </a>
          <a href="#pricing" className="text-text-secondary hover:text-text-primary text-[13px] transition-colors duration-[250ms]">
            Pricing
          </a>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/login"
            className="btn-ghost text-[13px]"
          >
            Sign In
          </Link>
          <Link
            href="/register"
            className="btn-primary text-[13px] px-5 py-2"
          >
            Start Building
          </Link>
        </div>
      </div>
    </motion.nav>
  );
}

function Hero() {
  return (
    <section className="relative pt-40 pb-32 px-6 overflow-hidden">
      {/* Subtle gradient orb */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white/[0.02] rounded-full blur-[120px] pointer-events-none" />

      <motion.div
        initial="initial"
        animate="animate"
        variants={stagger}
        className="max-w-3xl mx-auto text-center relative"
      >
        <motion.div variants={fadeUp} className="mb-6">
          <span className="badge text-[12px]">
            <span className="w-1.5 h-1.5 rounded-full bg-white/60 mr-2 animate-pulse" />
            Now in Public Beta
          </span>
        </motion.div>

        <motion.h1
          variants={fadeUp}
          className="font-heading text-[clamp(32px,5vw,56px)] font-semibold leading-[1.1] tracking-[-0.03em] mb-6"
        >
          Build products before
          <br />
          writing code.
        </motion.h1>

        <motion.p
          variants={fadeUp}
          className="text-text-secondary text-lg leading-relaxed max-w-xl mx-auto mb-10"
        >
          Transform raw product ideas into complete software blueprints.
          Requirements, architecture, database schemas, API designs, and
          deployment plans — generated in minutes.
        </motion.p>

        <motion.div
          variants={fadeUp}
          className="flex items-center justify-center gap-4"
        >
          <Link href="/register" className="btn-primary px-7 py-3 text-[15px]">
            Start Building
            <ArrowRight size={16} />
          </Link>
          <button className="btn-secondary px-7 py-3 text-[15px]">
            <Play size={14} className="ml-[-2px]" />
            Watch Demo
          </button>
        </motion.div>

        <motion.div
          variants={fadeUp}
          className="mt-16 text-text-muted text-[13px] flex items-center justify-center gap-6"
        >
          <span>No credit card required</span>
          <span className="w-1 h-1 rounded-full bg-text-muted" />
          <span>3 free blueprints</span>
          <span className="w-1 h-1 rounded-full bg-text-muted" />
          <span>Cancel anytime</span>
        </motion.div>
      </motion.div>

      {/* Preview Window */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-5xl mx-auto mt-20"
      >
        <div className="card overflow-hidden">
          <div className="flex items-center gap-2 px-4 py-3 border-b border-border">
            <div className="flex gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
              <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
              <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
            </div>
            <div className="flex-1 text-center">
              <span className="text-[11px] text-text-muted font-mono">
                productstudio.ai/workspace
              </span>
            </div>
          </div>
          <div className="p-8 bg-bg-secondary">
            <div className="grid grid-cols-3 gap-4 mb-6">
              {["Requirements", "Architecture", "Database"].map((label, i) => (
                <div
                  key={label}
                  className="bg-surface border border-border rounded-lg p-4"
                >
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-6 h-6 rounded-md bg-white/[0.06] flex items-center justify-center">
                      {i === 0 && <FileText size={12} className="text-text-secondary" />}
                      {i === 1 && <Layers size={12} className="text-text-secondary" />}
                      {i === 2 && <Database size={12} className="text-text-secondary" />}
                    </div>
                    <span className="text-[13px] font-medium">{label}</span>
                  </div>
                  <div className="space-y-2">
                    <div className="h-2 bg-white/[0.04] rounded-full w-full" />
                    <div className="h-2 bg-white/[0.04] rounded-full w-4/5" />
                    <div className="h-2 bg-white/[0.04] rounded-full w-3/5" />
                  </div>
                </div>
              ))}
            </div>
            <div className="bg-surface border border-border rounded-lg p-4">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-6 h-6 rounded-md bg-white/[0.06] flex items-center justify-center">
                  <Code2 size={12} className="text-text-secondary" />
                </div>
                <span className="text-[13px] font-medium">API Endpoints</span>
                <span className="ml-auto badge text-[11px]">12 routes</span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { method: "GET", path: "/api/v1/products" },
                  { method: "POST", path: "/api/v1/orders" },
                  { method: "GET", path: "/api/v1/users/:id" },
                  { method: "PUT", path: "/api/v1/settings" },
                ].map((endpoint) => (
                  <div
                    key={endpoint.path}
                    className="flex items-center gap-2 px-3 py-2 bg-bg rounded-md border border-border"
                  >
                    <span className="text-[10px] font-mono font-medium text-text-tertiary w-8">
                      {endpoint.method}
                    </span>
                    <span className="text-[11px] font-mono text-text-secondary">
                      {endpoint.path}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

function Features() {
  const features = [
    {
      icon: <FileText size={18} />,
      title: "Requirement Analysis",
      description:
        "Automatically extract and categorize functional, non-functional, and technical requirements from your product description.",
    },
    {
      icon: <Layers size={18} />,
      title: "UI Architecture",
      description:
        "Generate complete page structures, component hierarchies, and user flow diagrams tailored to your product.",
    },
    {
      icon: <Database size={18} />,
      title: "Database Design",
      description:
        "Create normalized database schemas with entity relationships, indexes, and migration strategies.",
    },
    {
      icon: <Code2 size={18} />,
      title: "API Planning",
      description:
        "Design RESTful API endpoints with request/response schemas, authentication flows, and rate limiting strategies.",
    },
    {
      icon: <Map size={18} />,
      title: "Development Roadmap",
      description:
        "Generate phased development plans with milestones, task breakdowns, and realistic timeline estimates.",
    },
    {
      icon: <Shield size={18} />,
      title: "Deployment Strategy",
      description:
        "Plan infrastructure, CI/CD pipelines, monitoring, and scaling strategies for production readiness.",
    },
  ];

  return (
    <section id="features" className="py-32 px-6">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-text-tertiary text-[13px] font-medium tracking-wide uppercase mb-3">
            Capabilities
          </p>
          <h2 className="font-heading text-3xl font-semibold tracking-tight mb-4">
            Everything you need to plan a product
          </h2>
          <p className="text-text-secondary max-w-lg mx-auto">
            From initial concept to deployment-ready specifications. Every
            aspect of your software product, structured and documented.
          </p>
        </motion.div>

        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={stagger}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {features.map((feature) => (
            <motion.div
              key={feature.title}
              variants={fadeUp}
              className="card p-6 group cursor-default"
            >
              <div className="w-9 h-9 rounded-lg bg-white/[0.06] flex items-center justify-center mb-4 text-text-secondary group-hover:text-text-primary transition-colors duration-[250ms]">
                {feature.icon}
              </div>
              <h3 className="font-heading text-[15px] font-medium mb-2">
                {feature.title}
              </h3>
              <p className="text-text-secondary text-[13px] leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function Workflow() {
  const steps = [
    {
      number: "01",
      title: "Describe Your Product",
      description:
        "Enter your product name, target audience, core features, and any constraints. The more detail you provide, the more refined the output.",
    },
    {
      number: "02",
      title: "AI Analysis",
      description:
        "Our multi-agent AI pipeline analyzes your input through six specialized stages — from requirement extraction to deployment planning.",
    },
    {
      number: "03",
      title: "Review Blueprint",
      description:
        "Explore your complete software blueprint with interactive diagrams, searchable documentation, and exportable specifications.",
    },
    {
      number: "04",
      title: "Iterate and Build",
      description:
        "Refine your blueprint, share with your team, and use the generated specifications to accelerate development.",
    },
  ];

  return (
    <section id="workflow" className="py-32 px-6 bg-bg-secondary">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-text-tertiary text-[13px] font-medium tracking-wide uppercase mb-3">
            How it works
          </p>
          <h2 className="font-heading text-3xl font-semibold tracking-tight mb-4">
            From idea to blueprint in minutes
          </h2>
          <p className="text-text-secondary max-w-lg mx-auto">
            A streamlined process designed for product teams, founders, and
            architects who want to move fast without cutting corners.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {steps.map((step, i) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="card p-6 relative"
            >
              <span className="text-[11px] font-mono text-text-muted absolute top-6 right-6">
                {step.number}
              </span>
              <h3 className="font-heading text-[15px] font-medium mb-2">
                {step.title}
              </h3>
              <p className="text-text-secondary text-[13px] leading-relaxed">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Architecture() {
  const layers = [
    {
      icon: <Globe size={16} />,
      name: "Frontend",
      tech: "Next.js · React · TypeScript",
    },
    {
      icon: <Zap size={16} />,
      name: "API Layer",
      tech: "FastAPI · WebSockets · Auth",
    },
    {
      icon: <GitBranch size={16} />,
      name: "Business Logic",
      tech: "Python · Celery · Redis",
    },
    {
      icon: <Database size={16} />,
      name: "Data Layer",
      tech: "PostgreSQL · Qdrant · S3",
    },
    {
      icon: <BarChart3 size={16} />,
      name: "Infrastructure",
      tech: "Vercel · Railway · Sentry",
    },
  ];

  return (
    <section id="architecture" className="py-32 px-6">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-text-tertiary text-[13px] font-medium tracking-wide uppercase mb-3">
            Architecture
          </p>
          <h2 className="font-heading text-3xl font-semibold tracking-tight mb-4">
            Built on a modern stack
          </h2>
          <p className="text-text-secondary max-w-lg mx-auto">
            Enterprise-grade infrastructure designed for reliability,
            scalability, and developer experience.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="card overflow-hidden"
        >
          {layers.map((layer, i) => (
            <div
              key={layer.name}
              className={`flex items-center gap-4 px-6 py-4 ${
                i < layers.length - 1 ? "border-b border-border" : ""
              } hover:bg-surface-hover transition-colors duration-[250ms]`}
            >
              <div className="w-8 h-8 rounded-lg bg-white/[0.06] flex items-center justify-center text-text-secondary">
                {layer.icon}
              </div>
              <div className="flex-1">
                <span className="text-[14px] font-medium">{layer.name}</span>
              </div>
              <span className="text-[13px] text-text-tertiary font-mono">
                {layer.tech}
              </span>
              <ChevronRight size={14} className="text-text-muted" />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function Testimonials() {
  const testimonials = [
    {
      quote:
        "Product Studio cut our planning phase from weeks to hours. The generated blueprints are remarkably thorough.",
      name: "Sarah Kim",
      role: "VP of Engineering, Meridian",
    },
    {
      quote:
        "The database schemas and API designs it generates are production-quality. We've shipped two products using its blueprints.",
      name: "Marcus Chen",
      role: "CTO, Wavelength",
    },
    {
      quote:
        "As a solo founder, this tool is like having an entire product team. The roadmap generation alone is worth the subscription.",
      name: "Priya Sharma",
      role: "Founder, Canopy",
    },
  ];

  return (
    <section className="py-32 px-6 bg-bg-secondary">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-text-tertiary text-[13px] font-medium tracking-wide uppercase mb-3">
            Trusted by teams
          </p>
          <h2 className="font-heading text-3xl font-semibold tracking-tight">
            What people are saying
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {testimonials.map((item, i) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="card p-6"
            >
              <p className="text-[14px] text-text-secondary leading-relaxed mb-6">
                &ldquo;{item.quote}&rdquo;
              </p>
              <div>
                <p className="text-[13px] font-medium">{item.name}</p>
                <p className="text-[12px] text-text-tertiary">{item.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Pricing() {
  const plans = [
    {
      name: "Starter",
      price: "Free",
      period: "",
      description: "Perfect for exploring and personal projects",
      features: [
        "3 blueprints per month",
        "Basic requirement analysis",
        "Database schema generation",
        "Community support",
      ],
      cta: "Get Started",
      highlighted: false,
    },
    {
      name: "Pro",
      price: "$29",
      period: "/month",
      description: "For teams building real products",
      features: [
        "Unlimited blueprints",
        "Advanced AI analysis",
        "Full API design",
        "Export to PDF and Markdown",
        "Version history",
        "Priority support",
      ],
      cta: "Start Pro Trial",
      highlighted: true,
    },
    {
      name: "Enterprise",
      price: "Custom",
      period: "",
      description: "For organizations with specific needs",
      features: [
        "Everything in Pro",
        "Custom AI model tuning",
        "SSO and SAML",
        "Dedicated support",
        "On-premise deployment",
        "Custom integrations",
      ],
      cta: "Contact Sales",
      highlighted: false,
    },
  ];

  return (
    <section id="pricing" className="py-32 px-6">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-text-tertiary text-[13px] font-medium tracking-wide uppercase mb-3">
            Pricing
          </p>
          <h2 className="font-heading text-3xl font-semibold tracking-tight mb-4">
            Simple, transparent pricing
          </h2>
          <p className="text-text-secondary max-w-lg mx-auto">
            Start free, upgrade when you need more. No hidden fees, no
            surprises.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={`card p-6 flex flex-col ${
                plan.highlighted
                  ? "border-white/[0.15] shadow-glow"
                  : ""
              }`}
            >
              <div className="mb-6">
                <h3 className="font-heading text-[15px] font-medium mb-1">
                  {plan.name}
                </h3>
                <p className="text-text-tertiary text-[13px]">
                  {plan.description}
                </p>
              </div>

              <div className="mb-6">
                <span className="font-heading text-3xl font-semibold">
                  {plan.price}
                </span>
                {plan.period && (
                  <span className="text-text-tertiary text-[13px]">
                    {plan.period}
                  </span>
                )}
              </div>

              <ul className="space-y-3 mb-8 flex-1">
                {plan.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-center gap-2.5 text-[13px] text-text-secondary"
                  >
                    <Check size={14} className="text-text-tertiary shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>

              <Link
                href="/register"
                className={`w-full text-center py-2.5 rounded-[10px] text-[13px] font-medium transition-all duration-[250ms] ${
                  plan.highlighted
                    ? "btn-primary"
                    : "btn-secondary"
                }`}
              >
                {plan.cta}
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Footer() {
  const links = {
    Product: ["Features", "Pricing", "Changelog", "Documentation"],
    Company: ["About", "Blog", "Careers", "Contact"],
    Legal: ["Privacy", "Terms", "Security"],
  };

  return (
    <footer className="border-t border-border py-16 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-16">
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-7 h-7 bg-white rounded-lg flex items-center justify-center">
                <Cpu size={14} className="text-bg" />
              </div>
              <span className="font-heading font-semibold text-[15px] tracking-tight">
                Product Studio
              </span>
            </div>
            <p className="text-text-tertiary text-[13px] leading-relaxed">
              Build products before
              <br />
              writing code.
            </p>
          </div>

          {Object.entries(links).map(([category, items]) => (
            <div key={category}>
              <h4 className="text-[12px] font-medium text-text-muted uppercase tracking-wider mb-4">
                {category}
              </h4>
              <ul className="space-y-2.5">
                {items.map((item) => (
                  <li key={item}>
                    <a
                      href="#"
                      className="text-[13px] text-text-secondary hover:text-text-primary transition-colors duration-[250ms]"
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between pt-8 border-t border-border">
          <p className="text-text-muted text-[12px]">
            © 2025 Product Studio AI. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <a href="#" className="text-text-muted hover:text-text-secondary text-[12px] transition-colors duration-[250ms]">
              Twitter
            </a>
            <a href="#" className="text-text-muted hover:text-text-secondary text-[12px] transition-colors duration-[250ms]">
              GitHub
            </a>
            <a href="#" className="text-text-muted hover:text-text-secondary text-[12px] transition-colors duration-[250ms]">
              Discord
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
