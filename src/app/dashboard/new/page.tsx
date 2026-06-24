"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useAppStore } from "@/store";
import { defaultGenerationStages } from "@/lib/sample-data";
import { sampleBlueprint } from "@/lib/sample-data";
import { generateId, sleep } from "@/lib/utils";
import {
  Sparkles,
  ArrowRight,
  ArrowLeft,
  Plus,
  X,
  Check,
  Loader2,
} from "lucide-react";
import type { ProjectInput, GenerationStage } from "@/types";

export default function NewProjectPage() {
  const router = useRouter();
  const {
    addProject,
    setGenerationStages,
    setIsGenerating,
    updateStage,
    generationStages,
    isGenerating,
  } = useAppStore();

  const [step, setStep] = useState(1);
  const [input, setInput] = useState<ProjectInput>({
    productName: "",
    description: "",
    targetAudience: "",
    coreFeatures: [""],
    constraints: [""],
    techPreferences: "",
    timeline: "",
  });

  const addFeature = () => {
    setInput((prev) => ({
      ...prev,
      coreFeatures: [...prev.coreFeatures, ""],
    }));
  };

  const removeFeature = (index: number) => {
    setInput((prev) => ({
      ...prev,
      coreFeatures: prev.coreFeatures.filter((_, i) => i !== index),
    }));
  };

  const updateFeature = (index: number, value: string) => {
    setInput((prev) => ({
      ...prev,
      coreFeatures: prev.coreFeatures.map((f, i) => (i === index ? value : f)),
    }));
  };

  const addConstraint = () => {
    setInput((prev) => ({
      ...prev,
      constraints: [...prev.constraints, ""],
    }));
  };

  const removeConstraint = (index: number) => {
    setInput((prev) => ({
      ...prev,
      constraints: prev.constraints.filter((_, i) => i !== index),
    }));
  };

  const updateConstraint = (index: number, value: string) => {
    setInput((prev) => ({
      ...prev,
      constraints: prev.constraints.map((c, i) => (i === index ? value : c)),
    }));
  };

  const startGeneration = useCallback(async () => {
    setStep(3);
    setIsGenerating(true);
    setGenerationStages(
      defaultGenerationStages.map((s) => ({ ...s, status: "pending" as const, progress: 0 }))
    );

    const stages = [...defaultGenerationStages];

    for (let i = 0; i < stages.length; i++) {
      updateStage(stages[i].id, { status: "active", progress: 0 });

      // Simulate progress
      for (let p = 0; p <= 100; p += 10) {
        await sleep(150);
        updateStage(stages[i].id, { progress: p });
      }

      updateStage(stages[i].id, { status: "completed", progress: 100 });
      await sleep(300);
    }

    // Create project with blueprint
    const projectId = generateId();
    addProject({
      id: projectId,
      name: input.productName,
      description: input.description,
      status: "completed",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      input,
      blueprint: {
        ...sampleBlueprint,
        id: generateId(),
        projectId,
        overview: {
          ...sampleBlueprint.overview,
          summary: input.description,
        },
      },
      version: 1,
    });

    setIsGenerating(false);
    await sleep(500);
    router.push(`/dashboard/blueprint/${projectId}`);
  }, [input, addProject, setGenerationStages, setIsGenerating, updateStage, router]);

  return (
    <div className="max-w-3xl mx-auto">
      <AnimatePresence mode="wait">
        {step === 1 && (
          <Step1
            key="step1"
            input={input}
            setInput={setInput}
            onNext={() => setStep(2)}
          />
        )}
        {step === 2 && (
          <Step2
            key="step2"
            input={input}
            addFeature={addFeature}
            removeFeature={removeFeature}
            updateFeature={updateFeature}
            addConstraint={addConstraint}
            removeConstraint={removeConstraint}
            updateConstraint={updateConstraint}
            setInput={setInput}
            onBack={() => setStep(1)}
            onGenerate={startGeneration}
          />
        )}
        {step === 3 && (
          <GenerationView
            key="step3"
            stages={generationStages}
            isGenerating={isGenerating}
            productName={input.productName}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

function Step1({
  input,
  setInput,
  onNext,
}: {
  input: ProjectInput;
  setInput: (input: ProjectInput) => void;
  onNext: () => void;
}) {
  const isValid = input.productName.trim() && input.description.trim();

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
    >
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-2">
          <div className="flex items-center gap-1.5">
            <div className="w-6 h-6 rounded-full bg-white text-bg flex items-center justify-center text-[11px] font-semibold">
              1
            </div>
            <div className="w-8 h-px bg-border" />
            <div className="w-6 h-6 rounded-full bg-white/[0.06] text-text-muted flex items-center justify-center text-[11px] font-semibold">
              2
            </div>
          </div>
        </div>
        <h1 className="font-heading text-2xl font-semibold tracking-tight mb-2">
          Describe your product
        </h1>
        <p className="text-text-secondary text-[14px]">
          Tell us about your product idea. The more detail you provide, the more
          comprehensive your blueprint will be.
        </p>
      </div>

      <div className="space-y-6">
        <div>
          <label htmlFor="product-name" className="label">
            Product Name
          </label>
          <input
            id="product-name"
            type="text"
            value={input.productName}
            onChange={(e) =>
              setInput({ ...input, productName: e.target.value })
            }
            placeholder="e.g., Artisan Marketplace"
            className="input"
          />
        </div>

        <div>
          <label htmlFor="description" className="label">
            Description
          </label>
          <textarea
            id="description"
            value={input.description}
            onChange={(e) =>
              setInput({ ...input, description: e.target.value })
            }
            placeholder="Describe what your product does, the problem it solves, and how it will work..."
            className="input min-h-[120px] resize-y"
            rows={5}
          />
        </div>

        <div>
          <label htmlFor="audience" className="label">
            Target Audience
          </label>
          <input
            id="audience"
            type="text"
            value={input.targetAudience}
            onChange={(e) =>
              setInput({ ...input, targetAudience: e.target.value })
            }
            placeholder="Who will use this product?"
            className="input"
          />
        </div>
      </div>

      <div className="flex justify-end mt-8">
        <button
          onClick={onNext}
          disabled={!isValid}
          className="btn-primary disabled:opacity-30 disabled:cursor-not-allowed"
        >
          Continue
          <ArrowRight size={14} />
        </button>
      </div>
    </motion.div>
  );
}

function Step2({
  input,
  addFeature,
  removeFeature,
  updateFeature,
  addConstraint,
  removeConstraint,
  updateConstraint,
  setInput,
  onBack,
  onGenerate,
}: {
  input: ProjectInput;
  addFeature: () => void;
  removeFeature: (i: number) => void;
  updateFeature: (i: number, v: string) => void;
  addConstraint: () => void;
  removeConstraint: (i: number) => void;
  updateConstraint: (i: number, v: string) => void;
  setInput: (input: ProjectInput) => void;
  onBack: () => void;
  onGenerate: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
    >
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-2">
          <div className="flex items-center gap-1.5">
            <div className="w-6 h-6 rounded-full bg-white/[0.06] text-text-secondary flex items-center justify-center text-[11px] font-semibold">
              <Check size={12} />
            </div>
            <div className="w-8 h-px bg-white/20" />
            <div className="w-6 h-6 rounded-full bg-white text-bg flex items-center justify-center text-[11px] font-semibold">
              2
            </div>
          </div>
        </div>
        <h1 className="font-heading text-2xl font-semibold tracking-tight mb-2">
          Features and constraints
        </h1>
        <p className="text-text-secondary text-[14px]">
          Define the core features and any constraints for your product.
        </p>
      </div>

      <div className="space-y-6">
        {/* Features */}
        <div>
          <label className="label">Core Features</label>
          <div className="space-y-2">
            {input.coreFeatures.map((feature, i) => (
              <div key={i} className="flex gap-2">
                <input
                  type="text"
                  value={feature}
                  onChange={(e) => updateFeature(i, e.target.value)}
                  placeholder={`Feature ${i + 1}`}
                  className="input flex-1"
                />
                {input.coreFeatures.length > 1 && (
                  <button
                    onClick={() => removeFeature(i)}
                    className="p-2.5 rounded-[10px] text-text-muted hover:text-text-secondary hover:bg-accent-dim transition-all duration-[250ms]"
                  >
                    <X size={14} />
                  </button>
                )}
              </div>
            ))}
          </div>
          <button
            onClick={addFeature}
            className="flex items-center gap-1.5 text-[13px] text-text-secondary hover:text-text-primary mt-2 transition-colors duration-[250ms]"
          >
            <Plus size={13} />
            Add feature
          </button>
        </div>

        {/* Constraints */}
        <div>
          <label className="label">Constraints (optional)</label>
          <div className="space-y-2">
            {input.constraints.map((constraint, i) => (
              <div key={i} className="flex gap-2">
                <input
                  type="text"
                  value={constraint}
                  onChange={(e) => updateConstraint(i, e.target.value)}
                  placeholder={`Constraint ${i + 1}`}
                  className="input flex-1"
                />
                {input.constraints.length > 1 && (
                  <button
                    onClick={() => removeConstraint(i)}
                    className="p-2.5 rounded-[10px] text-text-muted hover:text-text-secondary hover:bg-accent-dim transition-all duration-[250ms]"
                  >
                    <X size={14} />
                  </button>
                )}
              </div>
            ))}
          </div>
          <button
            onClick={addConstraint}
            className="flex items-center gap-1.5 text-[13px] text-text-secondary hover:text-text-primary mt-2 transition-colors duration-[250ms]"
          >
            <Plus size={13} />
            Add constraint
          </button>
        </div>

        {/* Tech Preferences */}
        <div>
          <label htmlFor="tech-prefs" className="label">
            Technology Preferences (optional)
          </label>
          <input
            id="tech-prefs"
            type="text"
            value={input.techPreferences}
            onChange={(e) =>
              setInput({ ...input, techPreferences: e.target.value })
            }
            placeholder="e.g., React, PostgreSQL, AWS"
            className="input"
          />
        </div>

        {/* Timeline */}
        <div>
          <label htmlFor="timeline" className="label">
            Expected Timeline (optional)
          </label>
          <input
            id="timeline"
            type="text"
            value={input.timeline}
            onChange={(e) =>
              setInput({ ...input, timeline: e.target.value })
            }
            placeholder="e.g., 3 months, MVP in 6 weeks"
            className="input"
          />
        </div>
      </div>

      <div className="flex items-center justify-between mt-8">
        <button onClick={onBack} className="btn-ghost">
          <ArrowLeft size={14} />
          Back
        </button>
        <button onClick={onGenerate} className="btn-primary">
          <Sparkles size={14} />
          Generate Blueprint
        </button>
      </div>
    </motion.div>
  );
}

function GenerationView({
  stages,
  isGenerating,
  productName,
}: {
  stages: GenerationStage[];
  isGenerating: boolean;
  productName: string;
}) {
  const completedCount = stages.filter((s) => s.status === "completed").length;
  const totalProgress = stages.length > 0
    ? Math.round(stages.reduce((sum, s) => sum + s.progress, 0) / stages.length)
    : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="text-center"
    >
      <div className="mb-10">
        <div className="w-14 h-14 rounded-2xl bg-white/[0.06] flex items-center justify-center mx-auto mb-5">
          {isGenerating ? (
            <Loader2 size={22} className="text-text-secondary animate-spin" />
          ) : (
            <Check size={22} className="text-text-primary" />
          )}
        </div>
        <h1 className="font-heading text-2xl font-semibold tracking-tight mb-2">
          {isGenerating
            ? `Generating blueprint for ${productName}`
            : "Blueprint generated"}
        </h1>
        <p className="text-text-secondary text-[14px]">
          {isGenerating
            ? `Stage ${completedCount + 1} of ${stages.length} — ${totalProgress}% complete`
            : "Your complete software blueprint is ready to explore."}
        </p>
      </div>

      {/* Overall progress bar */}
      <div className="w-full max-w-md mx-auto mb-10">
        <div className="h-1 bg-white/[0.06] rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-white/40 rounded-full"
            initial={{ width: "0%" }}
            animate={{ width: `${totalProgress}%` }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          />
        </div>
      </div>

      {/* Stages Timeline */}
      <div className="max-w-md mx-auto space-y-1 text-left">
        {stages.map((stage, i) => (
          <motion.div
            key={stage.id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.05 }}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors duration-[250ms] ${
              stage.status === "active" ? "bg-white/[0.03]" : ""
            }`}
          >
            <div className="w-6 h-6 rounded-full flex items-center justify-center shrink-0">
              {stage.status === "completed" && (
                <div className="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center">
                  <Check size={11} className="text-white/80" />
                </div>
              )}
              {stage.status === "active" && (
                <div className="w-5 h-5 rounded-full border border-white/20 flex items-center justify-center">
                  <Loader2 size={10} className="animate-spin text-white/60" />
                </div>
              )}
              {stage.status === "pending" && (
                <div className="w-5 h-5 rounded-full border border-white/[0.08]" />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <p
                className={`text-[13px] font-medium ${
                  stage.status === "pending"
                    ? "text-text-muted"
                    : stage.status === "active"
                    ? "text-text-primary"
                    : "text-text-secondary"
                }`}
              >
                {stage.name}
              </p>
              <p className="text-[11px] text-text-muted">{stage.description}</p>
            </div>
            {stage.status === "active" && (
              <span className="text-[11px] text-text-muted font-mono">
                {stage.progress}%
              </span>
            )}
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
