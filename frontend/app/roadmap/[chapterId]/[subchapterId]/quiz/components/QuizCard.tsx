"use client";

import { motion } from "framer-motion";
import { Brain, CheckCircle2, HelpCircle, X } from "lucide-react";
import { useState } from "react";
import type { Question, QuestionResponse } from "../types";
import { MultipleChoiceQuestion } from "./question-types/MultipleChoiceQuestion";
import { TrueFalseQuestion } from "./question-types/TrueFalseQuestion";
import { ShortAnswerQuestion } from "./question-types/ShortAnswerQuestion";
import { CodeChallengeQuestion } from "./question-types/CodeChallengeQuestion";

interface QuizCardProps {
  question: Question;
  onAnswer: (response: QuestionResponse) => void;
  currentResponse?: QuestionResponse;
  isSubmitting?: boolean;
}

export function QuizCard({ question, onAnswer, currentResponse, isSubmitting = false }: QuizCardProps) {
  const [isAnswered, setIsAnswered] = useState(!!currentResponse);
  const [showExplanation, setShowExplanation] = useState(false);

  const handleAnswer = (answer: string | boolean) => {
    setIsAnswered(true);
    onAnswer({
      questionId: question.id,
      userAnswer: answer,
    });
  };

  const getFeedbackColor = () => {
    if (!currentResponse?.feedback) return "";
    if (currentResponse.feedback.isCorrect === true) return "text-green-400";
    if (currentResponse.feedback.isCorrect === "partial") return "text-yellow-400";
    return "text-red-400";
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-br from-purple-900/40 to-indigo-900/40 backdrop-blur-sm rounded-xl border border-purple-500/20 overflow-hidden"
    >
      {/* Question Header */}
      <div className="p-6 border-b border-purple-500/20">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-purple-500/20 rounded-lg">
            <Brain className="w-5 h-5 text-purple-300" />
          </div>
          <span className="text-sm text-purple-300">Question {question.id}</span>
        </div>
        <h3 className="text-xl font-semibold text-white mb-4">
          {question.questionText}
        </h3>
      </div>

      {/* Question Content */}
      <div className="p-6">
        {question.questionType === "multipleChoice" && (
          <MultipleChoiceQuestion
            question={question}
            onAnswer={handleAnswer}
            isAnswered={isAnswered}
            currentResponse={currentResponse}
          />
        )}
        {question.questionType === "trueFalse" && (
          <TrueFalseQuestion
            question={question}
            onAnswer={handleAnswer}
            isAnswered={isAnswered}
            currentResponse={currentResponse}
          />
        )}
        {question.questionType === "shortAnswer" && (
          <ShortAnswerQuestion
            question={question}
            onAnswer={handleAnswer}
            isAnswered={isAnswered}
            currentResponse={currentResponse}
          />
        )}
        {question.questionType === "codeChallenge" && (
          <CodeChallengeQuestion
            question={question}
            onAnswer={handleAnswer}
            isAnswered={isAnswered}
            currentResponse={currentResponse}
          />
        )}
      </div>

      {/* Feedback Section */}
      {currentResponse?.feedback && (
        <div className="px-6 pb-6">
          <div className={`flex items-start gap-3 mt-4 ${getFeedbackColor()}`}>
            <div className="p-1 bg-purple-500/20 rounded-lg">
              {currentResponse.feedback.isCorrect === true ? (
                <CheckCircle2 className="w-4 h-4" />
              ) : currentResponse.feedback.isCorrect === "partial" ? (
                <HelpCircle className="w-4 h-4" />
              ) : (
                <X className="w-4 h-4" />
              )}
            </div>
            <p className="text-sm">{currentResponse.feedback.message}</p>
          </div>
        </div>
      )}

      {/* Explanation Toggle */}
      {isAnswered && (
        <div className="px-6 pb-6">
          <button
            onClick={() => setShowExplanation(!showExplanation)}
            className="text-sm text-purple-300 hover:text-purple-200 transition-colors"
          >
            {showExplanation ? "Hide" : "Show"} Explanation
          </button>
          {showExplanation && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className="mt-4 p-4 bg-purple-500/10 rounded-lg border border-purple-500/20"
            >
              <p className="text-sm text-purple-200">{question.explanation}</p>
            </motion.div>
          )}
        </div>
      )}
    </motion.div>
  );
}