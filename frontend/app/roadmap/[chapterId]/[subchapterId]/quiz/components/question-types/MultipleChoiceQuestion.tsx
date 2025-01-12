"use client";

import { motion } from "framer-motion";
import type { MultipleChoiceQuestion as MCQuestion, QuestionResponse } from "../../types";

interface MultipleChoiceQuestionProps {
  question: MCQuestion;
  onAnswer: (answer: string) => void;
  isAnswered: boolean;
  currentResponse?: QuestionResponse;
}

export function MultipleChoiceQuestion({
  question,
  onAnswer,
  isAnswered,
  currentResponse,
}: MultipleChoiceQuestionProps) {
  const getOptionStyle = (optionId: string) => {
    if (!isAnswered) return "";
    if (!currentResponse?.feedback) return "";

    if (optionId === question.correctAnswer) {
      return "border-green-500 bg-green-500/10";
    }
    if (currentResponse.userAnswer === optionId && optionId !== question.correctAnswer) {
      return "border-red-500 bg-red-500/10";
    }
    return "opacity-50";
  };

  return (
    <div className="grid grid-cols-1 gap-4">
      {question.options.map((option, index) => (
        <motion.button
          key={option.optionId}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.1 }}
          onClick={() => !isAnswered && onAnswer(option.optionId)}
          disabled={isAnswered}
          className={`p-4 text-left rounded-lg border border-purple-500/20 hover:bg-purple-500/10 transition-all ${getOptionStyle(
            option.optionId
          )}`}
        >
          <span className="text-purple-200">{option.text}</span>
        </motion.button>
      ))}
    </div>
  );
}