"use client";

import { motion } from "framer-motion";
import { BookOpen } from "lucide-react";
import type { Concept } from "../types";

interface ConceptCardProps {
  concept: Concept;
  index: number;
}

export function ConceptCard({ concept, index }: ConceptCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1 }}
      className="bg-gradient-to-br from-purple-900/40 to-indigo-900/40 backdrop-blur-sm rounded-lg border border-purple-500/20 overflow-hidden"
    >
      <div className="p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-purple-500/20 rounded-lg">
            <BookOpen className="w-5 h-5 text-purple-300" />
          </div>
          <h3 className="text-xl font-semibold text-white">
            {concept.concept_name}
          </h3>
        </div>
        <p className="text-purple-200 mb-6">{concept.description}</p>
        <div className="space-y-4">
          {concept.examples.map((example, idx) => (
            <div
              key={idx}
              className="bg-purple-900/20 rounded-lg p-4 border border-purple-500/20"
            >
              <p className="text-purple-100 font-mono mb-2">{example.example}</p>
              <p className="text-sm text-purple-300">{example.outcome}</p>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}