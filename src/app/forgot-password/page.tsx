"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import { Cpu, ArrowLeft, ArrowRight } from "lucide-react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1000));
    setSubmitted(true);
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-bg flex items-center justify-center p-6">
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-white/[0.01] rounded-full blur-[100px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-[380px] relative"
      >
        <Link
          href="/login"
          className="flex items-center gap-2 text-text-secondary hover:text-text-primary text-[13px] mb-8 transition-colors duration-[250ms]"
        >
          <ArrowLeft size={14} />
          Back to Sign In
        </Link>

        <div className="flex items-center gap-2.5 mb-8">
          <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
            <Cpu size={16} className="text-bg" />
          </div>
          <span className="font-heading font-semibold text-[16px] tracking-tight">
            Product Studio
          </span>
        </div>

        {!submitted ? (
          <>
            <h1 className="font-heading text-xl font-semibold tracking-tight mb-2">
              Reset your password
            </h1>
            <p className="text-text-secondary text-[14px] mb-8">
              Enter your email address and we&apos;ll send you instructions to reset
              your password.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="email" className="label">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@company.com"
                  className="input"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn-primary w-full py-2.5 disabled:opacity-50"
              >
                {loading ? (
                  <div className="w-4 h-4 border-2 border-bg/30 border-t-bg rounded-full animate-spin" />
                ) : (
                  <>
                    Send Reset Link
                    <ArrowRight size={14} />
                  </>
                )}
              </button>
            </form>
          </>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <div className="w-12 h-12 rounded-xl bg-white/[0.06] flex items-center justify-center mb-6">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="text-text-secondary"
              >
                <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
              </svg>
            </div>
            <h1 className="font-heading text-xl font-semibold tracking-tight mb-2">
              Check your email
            </h1>
            <p className="text-text-secondary text-[14px] mb-6">
              We&apos;ve sent password reset instructions to{" "}
              <span className="text-text-primary">{email}</span>. The link will
              expire in 24 hours.
            </p>
            <Link href="/login" className="btn-secondary w-full py-2.5 text-center block">
              Return to Sign In
            </Link>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
