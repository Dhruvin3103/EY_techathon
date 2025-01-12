"use client";

import { motion } from "framer-motion";
import { CheckCircle, ListChecks } from "lucide-react";

interface ExerciseProps {
  exercise: {
    exercise_title: string;
    instructions: Array<{
      instruction_number: number;
      description: string;
    }>;
    expected_outcome: string;
  };
}

export function ExerciseSection({ exercise }: ExerciseProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-br from-purple-900/40 to-indigo-900/40 backdrop-blur-sm rounded-lg border border-purple-500/20 p-6"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-purple-500/20 rounded-lg">
          <ListChecks className="w-6 h-6 text-purple-300" />
        </div>
        <h2 className="text-2xl font-semibold text-white">
          {exercise.exercise_title}
        </h2>
      </div>

      <div className="space-y-4 mb-6">
        {exercise.instructions.map((instruction) => (
          <motion.div
            key={instruction.instruction_number}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: instruction.instruction_number * 0.1 }}
            className="flex items-start gap-3"
          >
            <div className="p-1 bg-purple-500/20 rounded-lg">
              <CheckCircle className="w-4 h-4 text-purple-300" />
            </div>
            <p className="text-purple-200">{instruction.description}</p>
          </motion.div>
        ))}
      </div>

      <div className="bg-purple-900/20 rounded-lg p-4 border border-purple-500/20">
        <p className="text-sm text-purple-300 mb-2">Expected Outcome:</p>
        <p className="text-purple-100 font-mono">{exercise.expected_outcome}</p>
      </div>
    </motion.div>
  );
}