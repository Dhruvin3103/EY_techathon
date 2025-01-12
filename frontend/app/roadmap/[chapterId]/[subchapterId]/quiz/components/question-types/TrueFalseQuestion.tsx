"use client";

import { motion } from "framer-motion";
import { Check, X } from "lucide-react";
import type { TrueFalseQuestion as TFQuestion, QuestionResponse } from "../../types";

interface TrueFalseQuestionProps {
  question: TFQuestion;
  onAnswer: (answer: boolean) => void;
  isAnswered: boolean;
  currentResponse?: QuestionResponse;
}

export function TrueFalseQuestion({
  question,
  onAnswer,
  isAnswered,
  currentResponse,
}: TrueFalseQuestionProps) {
  const getButtonStyle = (value: boolean) => {
    if (!isAnswered) return "";
    if (!currentResponse?.feedback) return "";

    if (value === question.correctAnswer) {
      return "border-green-500 bg-green-500/10";
    }
    if (currentResponse.userAnswer === value && value !== question.correctAnswer) {
      return "border-red-500 bg-red-500/10";
    }
    return "opacity-50";
  };

  return (
    <div className="flex gap-4">
      {[true, false].map((value, index) => (
        <motion.button
          key={value.toString()}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.1 }}
          onClick={() => !isAnswered && onAnswer(value)}
          disabled={isAnswered}
          className={`flex-1 p-4 rounded-lg border border-purple-500/20 hover:bg-purple-500/10 transition-all ${getButtonStyle(
            value
          )}`}
        >
          <div className="flex items-center justify-center gap-2">
            {value ? (
              <Check className="w-5 h-5 text-green-400" />
            ) : (
              <X className="w-5 h-5 text-red-400" />
            )}
            <span className="text-purple-200">{value ? "True" : "False"}</span>
          </div>
        </motion.button>
      ))}
    </div>
  );
}