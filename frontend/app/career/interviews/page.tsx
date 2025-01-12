"use client";

import { motion } from "framer-motion";
import { MessageSquare, Video, Settings, Play, Mic } from "lucide-react";
import { useState } from "react";

export default function MockInterviewsPage() {
  const [isStarted, setIsStarted] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-indigo-900">
      <div className="max-w-7xl mx-auto px-4 py-16">
        {!isStarted ? (
          <>
            {/* Setup Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-12"
            >
              <div className="flex items-center justify-center gap-4 mb-6">
                <div className="p-3 bg-purple-500/20 rounded-xl">
                  <MessageSquare className="w-10 h-10 text-purple-300" />
                </div>
                <h1 className="text-4xl font-bold text-white">AI Mock Interviews</h1>
              </div>
              <p className="text-xl text-purple-200 max-w-3xl mx-auto">
                Practice your interview skills with our AI interviewer and receive instant feedback
              </p>
            </motion.div>

            {/* Interview Setup */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="max-w-2xl mx-auto bg-white/5 backdrop-blur-lg rounded-xl p-8 border border-purple-500/20"
            >
              <h2 className="text-2xl font-semibold text-white mb-6">Interview Setup</h2>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-purple-200 mb-2">Interview Type</label>
                  <select className="w-full bg-purple-900/20 border border-purple-500/30 rounded-lg py-3 px-4 text-purple-100">
                    <option>Technical Interview</option>
                    <option>Behavioral Interview</option>
                    <option>System Design Interview</option>
                  </select>
                </div>

                <div>
                  <label className="block text-purple-200 mb-2">Experience Level</label>
                  <select className="w-full bg-purple-900/20 border border-purple-500/30 rounded-lg py-3 px-4 text-purple-100">
                    <option>Entry Level</option>
                    <option>Mid Level</option>
                    <option>Senior Level</option>
                  </select>
                </div>

                <div>
                  <label className="block text-purple-200 mb-2">Focus Areas</label>
                  <div className="grid grid-cols-2 gap-4">
                    {["Problem Solving", "Communication", "Technical Skills", "Leadership"].map((area) => (
                      <label key={area} className="flex items-center space-x-2">
                        <input type="checkbox" className="form-checkbox text-purple-500" />
                        <span className="text-purple-200">{area}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="pt-6">
                  <button
                    onClick={() => setIsStarted(true)}
                    className="w-full py-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg font-semibold hover:from-purple-500 hover:to-indigo-500 transition-all duration-200 flex items-center justify-center gap-2"
                  >
                    <Play className="w-5 h-5" />
                    Start Interview
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        ) : (
          <>
            {/* Interview Session */}
            <div className="grid grid-cols-3 gap-8 h-[calc(100vh-8rem)]">
              {/* AI Interviewer */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="col-span-2 bg-white/5 backdrop-blur-lg rounded-xl border border-purple-500/20 overflow-hidden"
              >
                <div className="p-4 border-b border-purple-500/20 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Video className="w-5 h-5 text-purple-300" />
                    <span className="text-white font-semibold">AI Interviewer</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button className="p-2 hover:bg-purple-500/20 rounded-lg transition-colors">
                      <Mic className="w-5 h-5 text-purple-300" />
                    </button>
                    <button className="p-2 hover:bg-purple-500/20 rounded-lg transition-colors">
                      <Settings className="w-5 h-5 text-purple-300" />
                    </button>
                  </div>
                </div>
                <div className="p-6 h-[calc(100%-4rem)] flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-32 h-32 rounded-full bg-purple-500/20 mx-auto mb-4 flex items-center justify-center">
                      <MessageSquare className="w-12 h-12 text-purple-300" />
                    </div>
                    <p className="text-purple-200">AI Interviewer is listening...</p>
                  </div>
                </div>
              </motion.div>

              {/* Feedback Panel */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-white/5 backdrop-blur-lg rounded-xl border border-purple-500/20 overflow-hidden"
              >
                <div className="p-4 border-b border-purple-500/20">
                  <h2 className="text-white font-semibold">Real-time Feedback</h2>
                </div>
                <div className="p-6">
                  <div className="space-y-6">
                    <div>
                      <label className="block text-purple-200 mb-2">Communication</label>
                      <div className="w-full bg-purple-900/20 rounded-full h-2">
                        <div className="bg-green-500 h-2 rounded-full" style={{ width: "85%" }} />
                      </div>
                    </div>
                    <div>
                      <label className="block text-purple-200 mb-2">Technical Accuracy</label>
                      <div className="w-full bg-purple-900/20 rounded-full h-2">
                        <div className="bg-yellow-500 h-2 rounded-full" style={{ width: "65%" }} />
                      </div>
                    </div>
                    <div>
                      <label className="block text-purple-200 mb-2">Confidence</label>
                      <div className="w-full bg-purple-900/20 rounded-full h-2">
                        <div className="bg-purple-500 h-2 rounded-full" style={{ width: "75%" }} />
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}