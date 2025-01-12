"use client";

import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import { BookOpen, CheckCircle2, ChevronDown, GraduationCap, Brain } from "lucide-react";
import { MouseEvent, useEffect, useState } from "react";
import Link from "next/link";

interface ChapterCardProps {
  chapterId: string;
  chapter: {
    title: string;
    subchapters: string[];
  };
  isExpanded: boolean;
  onToggle: () => void;
  onSubchapterClick: (index: number) => void;
}

export function ChapterCard({ 
  chapterId, 
  chapter, 
  isExpanded, 
  onToggle,
  onSubchapterClick 
}: ChapterCardProps) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    const completedChapters = JSON.parse(localStorage.getItem("completedChapters") || "[]");
    setIsCompleted(completedChapters.includes(chapterId));
  }, [chapterId]);

  function handleMouseMove({ currentTarget, clientX, clientY }: MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      onMouseMove={handleMouseMove}
      className="group/card relative rounded-xl overflow-hidden"
    >
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition duration-300 group-hover/card:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              350px circle at ${mouseX}px ${mouseY}px,
              rgba(139, 92, 246, 0.15),
              transparent 80%
            )
          `,
        }}
      />
      <div className="relative bg-gradient-to-r from-purple-900/40 to-indigo-900/40 backdrop-blur-sm border border-purple-700/30 rounded-xl shadow-lg hover:shadow-purple-500/10 transition-all duration-300">
        <button
          onClick={onToggle}
          className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-purple-800/20 transition-colors group"
        >
          <div className="flex items-center gap-4">
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="p-2 bg-purple-500/20 rounded-lg group-hover:bg-purple-500/30 transition-colors"
            >
              {isCompleted ? (
                <CheckCircle2 className="w-6 h-6 text-green-400" />
              ) : (
                <BookOpen className="w-6 h-6 text-purple-300" />
              )}
            </motion.div>
            <h2 className="text-xl font-semibold text-white group-hover:text-purple-200 transition-colors">
              {chapter.title}
            </h2>
          </div>
          <ChevronDown
            className={`w-5 h-5 text-purple-300 transition-transform duration-300 ${
              isExpanded ? "transform rotate-180" : ""
            }`}
          />
        </button>
        
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="px-6 pb-5"
          >
            <ul className="space-y-4 text-purple-100">
              {chapter.subchapters.map((subchapter, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center justify-between group"
                >
                  <div 
                    className="flex items-start flex-1 cursor-pointer group-hover:translate-x-2 transition-transform"
                    onClick={() => onSubchapterClick(index)}
                  >
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      className="p-1 mr-3 rounded-lg group-hover:bg-purple-500/20 transition-colors"
                    >
                      <GraduationCap className="w-4 h-4 text-purple-300" />
                    </motion.div>
                    <span className="group-hover:text-purple-200 transition-colors">
                      {subchapter}
                    </span>
                  </div>
                  <Link
                    href={`/roadmap/${encodeURIComponent(chapter.title.split(":")[1].trim())}/${encodeURIComponent(subchapter)}/quiz`}
                    className="p-1 rounded-lg hover:bg-purple-500/20 transition-colors ml-4"
                  >
                    <Brain className="w-4 h-4 text-purple-300" />
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}