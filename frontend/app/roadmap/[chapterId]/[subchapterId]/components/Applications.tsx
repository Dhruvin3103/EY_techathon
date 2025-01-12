"use client";

import { motion } from "framer-motion";
import { Briefcase } from "lucide-react";
import type { UseCase } from "../types";

interface ApplicationsProps {
  overview: string;
  useCases: UseCase[];
}

export function Applications({ overview, useCases }: ApplicationsProps) {
  return (
    <div className="space-y-6">
      <p className="text-purple-200 mb-8">{overview}</p>
      {useCases.map((useCase, index) => (
        <motion.div
          key={useCase.case_id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="bg-gradient-to-br from-purple-900/40 to-indigo-900/40 backdrop-blur-sm rounded-lg border border-purple-500/20 p-6"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-purple-500/20 rounded-lg">
              <Briefcase className="w-5 h-5 text-purple-300" />
            </div>
            <h3 className="text-xl font-semibold text-white">{useCase.case_id}</h3>
          </div>
          <p className="text-purple-200 mb-4">{useCase.description}</p>
          <div className="bg-purple-900/20 rounded-lg p-4 border border-purple-500/20">
            <p className="text-purple-100">{useCase.benefits}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}