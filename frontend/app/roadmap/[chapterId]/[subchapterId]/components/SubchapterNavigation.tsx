"use client";

import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface SubchapterNavigationProps {
  chapterId: string;
  currentSubchapter: number;
  totalSubchapters: number;
  isCompleted?: boolean;
}

export function SubchapterNavigation({
  chapterId,
  currentSubchapter,
  totalSubchapters,
  isCompleted = false,
}: SubchapterNavigationProps) {
  const router = useRouter();

  const handleNext = () => {
    if (currentSubchapter < totalSubchapters) {
      router.push(`/roadmap/${chapterId}/${currentSubchapter + 1}`);
    } else {
      const completedChapters = JSON.parse(localStorage.getItem("completedChapters") || "[]");
      if (!completedChapters.includes(chapterId)) {
        completedChapters.push(chapterId);
        localStorage.setItem("completedChapters", JSON.stringify(completedChapters));
      }
      router.push("/roadmap");
    }
  };

  const handlePrevious = () => {
    if (currentSubchapter > 1) {
      router.push(`/roadmap/${chapterId}/${currentSubchapter - 1}`);
    } else {
      router.push("/roadmap");
    }
  };

  return (
    <div className="fixed bottom-8 left-0 right-0 flex justify-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center gap-4 bg-white/10 backdrop-blur-lg rounded-full px-6 py-3 border border-purple-500/20"
      >
        <button
          onClick={handlePrevious}
          className="p-2 hover:bg-purple-500/20 rounded-full transition-colors"
        >
          <ArrowLeft className="w-6 h-6 text-purple-300" />
        </button>

        <div className="flex items-center gap-2 px-4">
          <span className="text-purple-200">
            {currentSubchapter} / {totalSubchapters}
          </span>
          {isCompleted && (
            <CheckCircle2 className="w-5 h-5 text-green-400" />
          )}
        </div>

        <button
          onClick={handleNext}
          className="p-2 hover:bg-purple-500/20 rounded-full transition-colors"
        >
          <ArrowRight className="w-6 h-6 text-purple-300" />
        </button>
      </motion.div>
    </div>
  );
}