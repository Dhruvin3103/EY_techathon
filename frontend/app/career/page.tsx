"use client";

import { motion } from "framer-motion";
import { BrainCircuit, FileText, MessageSquare, Users } from "lucide-react";
import Link from "next/link";

export default function CareerLaunchPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-indigo-900">
      <div className="max-w-7xl mx-auto px-4 py-16">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <motion.div
            className="flex items-center justify-center gap-4 mb-6"
            whileHover={{ scale: 1.05 }}
          >
            <div className="p-3 bg-purple-500/20 rounded-xl">
              <BrainCircuit className="w-10 h-10 text-purple-300" />
            </div>
            <h1 className="text-4xl font-bold text-white">Career Launch Preparation</h1>
          </motion.div>
          <p className="text-xl text-purple-200 max-w-3xl mx-auto">
            Get ready to launch your career with AI-powered tools for resume building,
            interview preparation, and job matching.
          </p>
        </motion.div>

        {/* Tools Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Resume Builder */}
          <Link href="/career/resume">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.02 }}
              className="bg-white/5 backdrop-blur-lg rounded-xl p-8 border border-purple-500/20 cursor-pointer group"
            >
              <div className="p-3 bg-purple-500/20 rounded-lg w-fit mb-6 group-hover:bg-purple-500/30 transition-colors">
                <FileText className="w-8 h-8 text-purple-300" />
              </div>
              <h2 className="text-2xl font-semibold text-white mb-4">Resume Builder</h2>
              <p className="text-purple-200 mb-6">
                Create an ATS-optimized resume tailored to your target role with AI assistance.
              </p>
              <ul className="space-y-3 text-purple-300">
                <li>• ATS-Optimized Format</li>
                <li>• Skills Integration</li>
                <li>• Professional Templates</li>
              </ul>
            </motion.div>
          </Link>

          {/* Mock Interviews */}
          <Link href="/career/interviews">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              whileHover={{ scale: 1.02 }}
              className="bg-white/5 backdrop-blur-lg rounded-xl p-8 border border-purple-500/20 cursor-pointer group"
            >
              <div className="p-3 bg-purple-500/20 rounded-lg w-fit mb-6 group-hover:bg-purple-500/30 transition-colors">
                <MessageSquare className="w-8 h-8 text-purple-300" />
              </div>
              <h2 className="text-2xl font-semibold text-white mb-4">Mock Interviews</h2>
              <p className="text-purple-200 mb-6">
                Practice with AI-powered mock interviews and receive real-time feedback.
              </p>
              <ul className="space-y-3 text-purple-300">
                <li>• Role-Specific Questions</li>
                <li>• Performance Analytics</li>
                <li>• Improvement Suggestions</li>
              </ul>
            </motion.div>
          </Link>

          {/* Recruiter Matchmaking */}
          <Link href="/career/matching">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              whileHover={{ scale: 1.02 }}
              className="bg-white/5 backdrop-blur-lg rounded-xl p-8 border border-purple-500/20 cursor-pointer group"
            >
              <div className="p-3 bg-purple-500/20 rounded-lg w-fit mb-6 group-hover:bg-purple-500/30 transition-colors">
                <Users className="w-8 h-8 text-purple-300" />
              </div>
              <h2 className="text-2xl font-semibold text-white mb-4">Job Matching</h2>
              <p className="text-purple-200 mb-6">
                Get matched with relevant job opportunities based on your profile and preferences.
              </p>
              <ul className="space-y-3 text-purple-300">
                <li>• AI-Powered Matching</li>
                <li>• Personalized Recommendations</li>
                <li>• Direct Recruiter Connections</li>
              </ul>
            </motion.div>
          </Link>
        </div>

        {/* Progress Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-16 bg-white/5 backdrop-blur-lg rounded-xl p-8 border border-purple-500/20"
        >
          <h2 className="text-2xl font-semibold text-white mb-6">Your Progress</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Resume Progress */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-purple-200">Resume Completion</span>
                <span className="text-purple-300">70%</span>
              </div>
              <div className="w-full bg-purple-900/20 rounded-full h-2">
                <div className="bg-gradient-to-r from-purple-500 to-indigo-500 h-2 rounded-full" style={{ width: "70%" }} />
              </div>
            </div>

            {/* Interview Practice */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-purple-200">Interview Practice</span>
                <span className="text-purple-300">3/5</span>
              </div>
              <div className="w-full bg-purple-900/20 rounded-full h-2">
                <div className="bg-gradient-to-r from-purple-500 to-indigo-500 h-2 rounded-full" style={{ width: "60%" }} />
              </div>
            </div>

            {/* Job Applications */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-purple-200">Job Applications</span>
                <span className="text-purple-300">2/10</span>
              </div>
              <div className="w-full bg-purple-900/20 rounded-full h-2">
                <div className="bg-gradient-to-r from-purple-500 to-indigo-500 h-2 rounded-full" style={{ width: "20%" }} />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}