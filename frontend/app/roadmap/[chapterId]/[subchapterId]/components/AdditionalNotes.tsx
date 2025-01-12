"use client";

import { motion } from "framer-motion";
import { BookMarked } from "lucide-react";
import type { RelatedTopic } from "../types";

interface AdditionalNotesProps {
  overview: string;
  relatedTopics: RelatedTopic[];
}

export function AdditionalNotes({ overview, relatedTopics }: AdditionalNotesProps) {
  return (
    <div>
      <div className="bg-purple-900/20 rounded-lg p-6 border border-purple-500/20 mb-8">
        <p className="text-purple-200">{overview}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {relatedTopics.map((topic, index) => (
          <motion.div
            key={topic.topic}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-gradient-to-br from-purple-900/40 to-indigo-900/40 backdrop-blur-sm rounded-lg border border-purple-500/20 p-6"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-purple-500/20 rounded-lg">
                <BookMarked className="w-5 h-5 text-purple-300" />
              </div>
              <h3 className="text-xl font-semibold text-white">{topic.topic}</h3>
            </div>
            <p className="text-purple-200">{topic.description}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}