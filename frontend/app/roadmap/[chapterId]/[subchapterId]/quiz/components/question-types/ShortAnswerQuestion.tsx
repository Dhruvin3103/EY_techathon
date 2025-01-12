"use client";

import { motion } from "framer-motion";
import { Send } from "lucide-react";
import { useState } from "react";
import type { ShortAnswerQuestion as SAQuestion, QuestionResponse } from "../../types";

interface ShortAnswerQuestionProps {
  question: SAQuestion;
  onAnswer: (answer: string) => void;
  isAnswered: boolean;
  currentResponse?: QuestionResponse;
}

export function ShortAnswerQuestion({
  question,
  onAnswer,
  isAnswered,
  currentResponse,
}: ShortAnswerQuestionProps) {
  const [answer, setAnswer] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!answer.trim()) return;
    onAnswer(answer);
  };

  return (
    <form onSubmit={handleSubmit}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-4"
      >
        <textarea
          value={isAnswered ? (currentResponse?.userAnswer as string) : answer}
          onChange={(e) => setAnswer(e.target.value)}
          disabled={isAnswered}
          placeholder="Type your answer here..."
          className="w-full h-32 p-4 rounded-lg bg-purple-900/20 border border-purple-500/20 text-purple-100 placeholder:text-purple-400/50 focus:outline-none focus:ring-2 focus:ring-purple-500/50 disabled:opacity-50"
        />
        {!isAnswered && (
          <button
            type="submit"
            disabled={!answer.trim()}
            className="w-full flex items-center justify-center gap-2 p-4 rounded-lg bg-purple-500/20 hover:bg-purple-500/30 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send className="w-5 h-5 text-purple-300" />
            <span className="text-purple-200">Submit Answer</span>
          </button>
        )}
      </motion.div>
    </form>
  );
}