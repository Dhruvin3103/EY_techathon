"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Brain, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { QuizCard } from "./components/QuizCard";
import { LoaderAnimation } from "@/app/components/LoaderAnimation";4
import  apiClient  from "@/app/api/client";
import type { Quiz, QuestionResponse } from "./types";
// import { quizData } from "../data/quiz";

export default function QuizPage({
  params,
}: {
  params: { chapterId: string; subchapterId: string };
}) {
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [responses, setResponses] = useState<QuestionResponse[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setQuiz(sampleQuiz);
    setIsLoading(false);
  }, []);

  const handleAnswer = async (response: QuestionResponse) => {
    const question = quiz?.questions.find(q => q.id === response.questionId);
    if (!question) return;
    console.log("Checking answer:", question);
    setIsSubmitting(true);
    try {
      const result = await apiClient.checkAnswer(question.questionText, response.userAnswer, "javascript");
      
      const newResponse: QuestionResponse = {
        ...response,
        feedback: {
          isCorrect: result.status === "correct" ? true : 
                    result.status === "partial" ? "partial" : false,
          message: result.feedback
        }
      };

      setResponses(prev => {
        const index = prev.findIndex(r => r.questionId === response.questionId);
        if (index === -1) return [...prev, newResponse];
        const newResponses = [...prev];
        newResponses[index] = newResponse;
        return newResponses;
      });
    } catch (error) {
      console.error("Failed to check answer:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-indigo-900 flex items-center justify-center">
        <LoaderAnimation />
      </div>
    );
  }

  if (!quiz) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-indigo-900 flex items-center justify-center">
        <div className="text-red-400 text-xl">Failed to load quiz</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-indigo-900">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <Link
          href={`/roadmap/${params.chapterId}/${params.subchapterId}`}
          className="inline-flex items-center gap-2 text-purple-300 hover:text-purple-200 transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Chapter
        </Link>

        <div className="flex items-center gap-3 mb-8">
          <div className="p-2 bg-purple-500/20 rounded-lg">
            <Brain className="w-6 h-6 text-purple-300" />
          </div>
          <h1 className="text-2xl font-semibold text-white">{quiz.quizTitle}</h1>
        </div>

        <p className="text-purple-200 mb-8">{quiz.description}</p>

        <div className="space-y-8">
          {quiz.questions.map((question) => (
            <QuizCard
              key={question.id}
              question={question}
              onAnswer={handleAnswer}
              currentResponse={responses.find(r => r.questionId === question.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}