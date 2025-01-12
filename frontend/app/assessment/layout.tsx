"use client";

import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { BrainCircuit } from "lucide-react";

export default function AssessmentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const steps = [
    { path: "/assessment", label: "Basic Info" },
    { path: "/assessment/skills", label: "Skills" },
    { path: "/assessment/career", label: "Career" },
    { path: "/assessment/analysis", label: "Analysis" },
    { path: "/assessment/recommendations", label: "Path" },
  ];

  const currentStep = steps.findIndex((step) => step.path === pathname) + 1;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-indigo-900">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <motion.div
            className="flex items-center justify-center gap-4 mb-6"
            whileHover={{ scale: 1.05 }}
          >
            <div className="p-3 bg-purple-500/20 rounded-xl">
              <BrainCircuit className="w-10 h-10 text-purple-300" />
            </div>
            <h1 className="text-4xl font-bold text-white">Career Assessment</h1>
          </motion.div>
          <p className="text-purple-200 text-xl">
            Discover your ideal career path with AI-powered guidance
          </p>
        </motion.div>

        {/* Progress Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <div className="relative">
            <div className="overflow-hidden h-2 mb-4 text-xs flex rounded-full bg-purple-900/20">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${(currentStep / steps.length) * 100}%` }}
                className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-gradient-to-r from-purple-600 to-indigo-600"
              />
            </div>
            <div className="flex justify-between">
              {steps.map((step, index) => (
                <div
                  key={step.path}
                  className={`flex flex-col items-center ${
                    index < currentStep
                      ? "text-purple-300"
                      : "text-purple-500/50"
                  }`}
                >
                  <div
                    className={`w-8 h-8 flex items-center justify-center rounded-full mb-2 ${
                      index < currentStep
                        ? "bg-purple-500/20 border-2 border-purple-500"
                        : "bg-purple-900/20 border-2 border-purple-500/20"
                    }`}
                  >
                    {index + 1}
                  </div>
                  <span className="text-sm">{step.label}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          {children}
        </motion.div>
      </div>
    </div>
  );
}