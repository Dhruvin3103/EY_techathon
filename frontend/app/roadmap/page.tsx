"use client";

import { motion } from "framer-motion";
import { Book, BrainCircuit, Code2, Sparkles } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { LoaderAnimation } from "../components/LoaderAnimation";
import  apiClient  from "../api/client";
import type { RoadmapData } from "../api/types";

const userLevels = ["Beginner", "Intermediate", "Advanced"];

export default function RoadmapPage() {
  const [topic, setTopic] = useState("");
  const [userLevel, setUserLevel] = useState("Beginner");
  const [additionalPref, setAdditionalPref] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const data = await apiClient.generateRoadmap({
        topic,
        user_level: userLevel,
        additional_pref: additionalPref,
      });

      localStorage.setItem("roadmapData", JSON.stringify(data));
      localStorage.setItem("userPreferences", JSON.stringify({
        topic,
        user_level: userLevel,
        additional_pref: additionalPref,
      }));

      router.push("/roadmap/view");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to generate roadmap");
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-indigo-900 flex flex-col items-center justify-center p-4">
        <LoaderAnimation />
        <p className="text-purple-200 mt-8 text-xl">Crafting your personalized learning journey...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-indigo-900">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <motion.div
            className="flex items-center justify-center gap-4 mb-6"
            whileHover={{ scale: 1.05 }}
          >
            <div className="p-3 bg-purple-500/20 rounded-xl">
              <BrainCircuit className="w-10 h-10 text-purple-300" />
            </div>
            <h1 className="text-5xl font-bold text-white">Learning Path Generator</h1>
          </motion.div>
          <p className="text-purple-200 text-xl">
            Create your personalized learning roadmap with AI
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 shadow-xl border border-purple-500/20"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-500/10 border border-red-500/50 rounded-lg p-4 text-red-300">
                {error}
              </div>
            )}

            <div>
              <label className="block text-purple-200 mb-2 text-lg">
                What would you like to learn?
              </label>
              <div className="relative">
                <Code2 className="absolute left-4 top-1/2 transform -translate-y-1/2 text-purple-400 w-5 h-5" />
                <input
                  type="text"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  placeholder="e.g., Web Development, Machine Learning, Mobile Development"
                  className="w-full bg-purple-900/20 border border-purple-500/30 rounded-lg py-3 px-12 text-purple-100 placeholder:text-purple-400/50 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-purple-200 mb-2 text-lg">
                Your Experience Level
              </label>
              <div className="grid grid-cols-3 gap-4">
                {userLevels.map((level) => (
                  <button
                    key={level}
                    type="button"
                    onClick={() => setUserLevel(level)}
                    className={`p-4 rounded-lg border ${
                      userLevel === level
                        ? "bg-purple-500/20 border-purple-500/50 text-purple-200"
                        : "bg-purple-900/20 border-purple-500/20 text-purple-400 hover:bg-purple-500/10"
                    } transition-all duration-200`}
                  >
                    {level}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-purple-200 mb-2 text-lg">
                Additional Preferences (Optional)
              </label>
              <div className="relative">
                <Sparkles className="absolute left-4 top-1/2 transform -translate-y-1/2 text-purple-400 w-5 h-5" />
                <input
                  type="text"
                  value={additionalPref}
                  onChange={(e) => setAdditionalPref(e.target.value)}
                  placeholder="e.g., MERN Stack, Python, React Native"
                  className="w-full bg-purple-900/20 border border-purple-500/30 rounded-lg py-3 px-12 text-purple-100 placeholder:text-purple-400/50 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                />
              </div>
            </div>

            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg py-4 px-6 text-lg font-semibold hover:from-purple-500 hover:to-indigo-500 transition-all duration-200 flex items-center justify-center gap-2"
            >
              <Book className="w-5 h-5" />
              Generate My Learning Path
            </motion.button>
          </form>
        </motion.div>
      </div>
    </div>
  );
}