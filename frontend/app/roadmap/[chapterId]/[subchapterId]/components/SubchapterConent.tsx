"use client";

import { motion } from "framer-motion";
import { ArrowLeft, BookOpen, Code2, Lightbulb, PlayCircle, Brain } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { CodeBlock } from "./CodeBlock";
import { ConceptCard } from "./ConceptCard";
import { ExerciseSection } from "./ExerciseSection";
import { DoubtSolverBot } from "@/app/components/DoubtSolverBot/DoubtSolverBot";
import type { ChapterData } from "../types";
import { useState } from "react";
import { VideoCard } from "./VideoCard";

interface SubchapterContentProps {
  data: ChapterData;
}

export function SubchapterContent({ data }: SubchapterContentProps) {
  const params = useParams();
  const { chapterId, subchapterId } = params;
  const [isChatOpen, setIsChatOpen] = useState(false);

  const chapterNumber = chapterId?.toString().split('_')[1] || '';
  const subchapterNumber = subchapterId?.toString() || '';

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-indigo-900">
      <div className={`flex transition-all duration-300 ${isChatOpen ? 'mr-[40%]' : ''}`}>
        {/* Main Content - Left Side */}
        <div className="flex-1 px-4 py-12">
          <div className="max-w-4xl mx-auto">
            <Link
              href="/roadmap"
              className="inline-flex items-center gap-2 text-purple-300 hover:text-purple-200 transition-colors mb-6"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Roadmap
            </Link>

            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-8"
            >
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="p-3 bg-purple-500/20 rounded-xl">
                  <Code2 className="w-8 h-8 text-purple-300" />
                </div>
                <h1 className="text-4xl font-bold text-white">
                  Chapter {chapterNumber}.{subchapterNumber}
                </h1>
              </div>
              <p className="text-purple-200 max-w-2xl mx-auto">
                {data.key_concepts.overview}
              </p>
            </motion.div>

            {/* Key Concepts */}
            {data.key_concepts.details.length > 0 && (
              <section className="mb-16">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-3 mb-8"
                >
                  <div className="p-2 bg-purple-500/20 rounded-lg">
                    <BookOpen className="w-6 h-6 text-purple-300" />
                  </div>
                  <h2 className="text-2xl font-semibold text-white">Key Concepts</h2>
                </motion.div>

                <div className="grid grid-cols-1 gap-6">
                  {data.key_concepts.details.map((concept, index) => (
                    <ConceptCard key={concept.concept_name} concept={concept} index={index} />
                  ))}
                </div>
              </section>
            )}

            {/* Code Examples */}
            {data.code_snippets.length > 0 && (
              <section className="mb-16">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-3 mb-8"
                >
                  <div className="p-2 bg-purple-500/20 rounded-lg">
                    <Code2 className="w-6 h-6 text-purple-300" />
                  </div>
                  <h2 className="text-2xl font-semibold text-white">Code Examples</h2>
                </motion.div>

                <div className="space-y-6">
                  {data.code_snippets.map((snippet) => (
                    <CodeBlock
                      key={snippet.code_id}
                      code={snippet.code}
                      explanation={snippet.explanation}
                    />
                  ))}
                </div>
              </section>
            )}

            {/* Practical Exercise */}
            {data.practical_exercise && (
              <section className="mb-16">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-3 mb-8"
                >
                  <div className="p-2 bg-purple-500/20 rounded-lg">
                    <Lightbulb className="w-6 h-6 text-purple-300" />
                  </div>
                  <h2 className="text-2xl font-semibold text-white">
                    Practical Exercise
                  </h2>
                </motion.div>

                <ExerciseSection exercise={data.practical_exercise} />
              </section>
            )}

<section className="mb-16 ">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-3 mb-8"
          >
            <div className="p-2 bg-purple-500/20 rounded-lg">
              <PlayCircle className="w-6 h-6 text-purple-300" />
            </div>
            <h2 className="text-2xl font-semibold text-white">Video Explanation</h2>
          </motion.div>

          <VideoCard
            chapterId={chapterId?.toString() || ''}
            subchapterId={subchapterId?.toString() || ''}
            thumbnail="https://images.unsplash.com/photo-1587620962725-abab7fe55159?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
            title="Watch Chapter Video Explanation"
          />
        </section>
        <section className="mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-3 mb-8"
        >
          <div className="p-2 bg-purple-500/20 rounded-lg">
            <Brain className="w-6 h-6 text-purple-300" />
          </div>
          <h2 className="text-2xl font-semibold text-white">Test Your Knowledge</h2>
        </motion.div>

        <Link 
          href={`/roadmap/${chapterId}/${subchapterId}/quiz`}
          className="block"
        >
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-gradient-to-br from-purple-900/40 to-indigo-900/40 backdrop-blur-sm rounded-xl border border-purple-500/20 p-6 hover:border-purple-500/40 transition-colors"
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-semibold text-white mb-2">Chapter Quiz</h3>
                <p className="text-purple-200">Test your understanding of the concepts covered in this chapter</p>
              </div>
              <Brain className="w-8 h-8 text-purple-300" />
            </div>
          </motion.div>
        </Link>
      </section>
          </div>
          
        </div>
        

        {/* Doubt Solver Bot - Right Side */}
        <DoubtSolverBot 
          topicContent={JSON.stringify(data)} 
          chapterId={chapterId?.toString() || ''}
          subchapterId={subchapterId?.toString() || ''}
          isOpen={isChatOpen}
          onOpenChange={setIsChatOpen}
        />
      </div>
    </div>
  );
}