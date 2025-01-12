"use client";

import { motion } from "framer-motion";
import { Code, ListChecks } from "lucide-react";
import type { DetailedExample } from "../types";

interface DetailedExamplesProps {
  overview: string;
  examples: DetailedExample[];
}

export function DetailedExamples({ overview, examples }: DetailedExamplesProps) {
  return (
    <div className="space-y-6">
      <p className="text-purple-200 mb-8">{overview}</p>
      {examples.map((example, index) => (
        <motion.div
          key={example.example_id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="bg-gradient-to-br from-purple-900/40 to-indigo-900/40 backdrop-blur-sm rounded-lg border border-purple-500/20 p-6"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-purple-500/20 rounded-lg">
              <Code className="w-5 h-5 text-purple-300" />
            </div>
            <h3 className="text-xl font-semibold text-white">{example.title}</h3>
          </div>

          <div className="space-y-4 mb-6">
            {example.steps.map((step) => (
              <motion.div
                key={step.step_number}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: step.step_number * 0.1 }}
                className="flex items-start gap-3"
              >
                <div className="p-1 bg-purple-500/20 rounded-lg">
                  <ListChecks className="w-4 h-4 text-purple-300" />
                </div>
                <p className="text-purple-200">{step.description}</p>
              </motion.div>
            ))}
          </div>

          <div className="bg-purple-900/20 rounded-lg p-4 border border-purple-500/20">
            <p className="text-sm text-purple-300 mb-2">Expected Result:</p>
            <p className="text-purple-100">{example.expected_result}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}