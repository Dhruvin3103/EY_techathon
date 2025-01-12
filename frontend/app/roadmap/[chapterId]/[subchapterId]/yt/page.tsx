"use client";

import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { MindMap } from "./components/MindMap";

export default function VideoPage({ 
  params 
}: { 
  params: { chapterId: string; subchapterId: string } 
}) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-indigo-900">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <Link
          href={`/roadmap/${params.chapterId}/${params.subchapterId}`}
          className="inline-flex items-center gap-2 text-purple-300 hover:text-purple-200 transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Chapter
        </Link>

        <div className="grid grid-cols-12 gap-8">
          {/* Main Content */}
          <div className="col-span-12 lg:col-span-8">
            {/* Video Section */}
            <div className="bg-gradient-to-br from-purple-900/40 to-indigo-900/40 backdrop-blur-sm rounded-xl border border-purple-500/20 overflow-hidden mb-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="p-4"
              >
                <div className="aspect-video rounded-lg overflow-hidden">
                  <iframe
                    width="100%"
                    height="100%"
                    src={sampleMindMapData.ytlink}
                    title="Video Title"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full"
                  />
                </div>
              </motion.div>
            </div>

            {/* Mind Map Section */}
            <div className="bg-gradient-to-br from-purple-900/40 to-indigo-900/40 backdrop-blur-sm rounded-xl border border-purple-500/20 overflow-hidden">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="p-4 h-[600px]"
              >
                <MindMap data={sampleMindMapData} />
              </motion.div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="col-span-12 lg:col-span-4 space-y-6">
            {/* Video Information */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-gradient-to-br from-purple-900/40 to-indigo-900/40 backdrop-blur-sm rounded-xl border border-purple-500/20 p-6"
            >
              <h2 className="text-2xl font-bold text-white mb-4">
                Chapter Overview
              </h2>
              <p className="text-purple-200">
                This video covers the fundamentals of the current chapter topic. Watch
                the video and explore the mind map to better understand the concepts.
              </p>
            </motion.div>

            {/* Key Points */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-gradient-to-br from-purple-900/40 to-indigo-900/40 backdrop-blur-sm rounded-xl border border-purple-500/20 p-6"
            >
              <h2 className="text-2xl font-bold text-white mb-4">
                Key Points
              </h2>
              <ul className="space-y-3 text-purple-200">
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 mt-2 rounded-full bg-purple-500" />
                  <span>Understanding core concepts</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 mt-2 rounded-full bg-purple-500" />
                  <span>Practical applications</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 mt-2 rounded-full bg-purple-500" />
                  <span>Best practices and tips</span>
                </li>
              </ul>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
