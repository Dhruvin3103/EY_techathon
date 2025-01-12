"use client";

import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { CodePlayground } from "../CodingPlayground";
import type { CodeChallengeQuestion as CCQuestion, QuestionResponse } from "../../types";

interface CodeChallengeQuestionProps {
  question: CCQuestion;
  onAnswer: (answer: string) => void;
  isAnswered: boolean;
  currentResponse?: QuestionResponse;
  isSubmitting?: boolean;
}

export function CodeChallengeQuestion({
  question,
  onAnswer,
  isAnswered,
  currentResponse,
  isSubmitting = false
}: CodeChallengeQuestionProps) {
  const handleSubmit = (code: string) => {
    if (!code.trim() || isSubmitting) return;
    const formattedCode = code.replace(/\n/g, '\\n').replace(/\r/g, '\\r');
    console.log(formattedCode);
    onAnswer(formattedCode);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-4"
    >
      <CodePlayground
        initialCode={question.placeholder}
        onRun={handleSubmit}
        isAnswered={isAnswered}
        isSubmitting={isSubmitting}
      />
      {isSubmitting && (
        <div className="flex items-center justify-center gap-2 text-purple-300">
          <Loader2 className="w-4 h-4 animate-spin" />
          <span>Checking your answer...</span>
        </div>
      )}
    </motion.div>
  );
}