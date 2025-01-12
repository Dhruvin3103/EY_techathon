"use client";

import { motion } from "framer-motion";
import { User, Mail, GraduationCap, Target } from "lucide-react";
import { useRouter } from "next/navigation";

export default function BasicInfoPage() {
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push("/assessment/skills");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 shadow-xl border border-purple-500/20"
    >
      <h2 className="text-2xl font-semibold text-white mb-6">Basic Information</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">
          {/* Name Input */}
          <div>
            <label className="block text-purple-200 mb-2">Full Name</label>
            <div className="relative">
              <User className="absolute left-4 top-1/2 transform -translate-y-1/2 text-purple-400 w-5 h-5" />
              <input
                type="text"
                placeholder="John Doe"
                className="w-full bg-purple-900/20 border border-purple-500/30 rounded-lg py-3 px-12 text-purple-100 placeholder:text-purple-400/50 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                required
              />
            </div>
          </div>

          {/* Email Input */}
          <div>
            <label className="block text-purple-200 mb-2">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-purple-400 w-5 h-5" />
              <input
                type="email"
                placeholder="john@example.com"
                className="w-full bg-purple-900/20 border border-purple-500/30 rounded-lg py-3 px-12 text-purple-100 placeholder:text-purple-400/50 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                required
              />
            </div>
          </div>

          {/* Education Level */}
          <div>
            <label className="block text-purple-200 mb-2">Education Level</label>
            <div className="relative">
              <GraduationCap className="absolute left-4 top-1/2 transform -translate-y-1/2 text-purple-400 w-5 h-5" />
              <select
                className="w-full bg-purple-900/20 border border-purple-500/30 rounded-lg py-3 px-12 text-purple-100 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                required
              >
                <option value="">Select Education Level</option>
                <option value="high_school">High School</option>
                <option value="bachelors">Bachelor's Degree</option>
                <option value="masters">Master's Degree</option>
                <option value="phd">Ph.D.</option>
                <option value="self_taught">Self-Taught</option>
              </select>
            </div>
          </div>

          {/* Career Goals */}
          <div>
            <label className="block text-purple-200 mb-2">Career Goals</label>
            <div className="relative">
              <Target className="absolute left-4 top-4 text-purple-400 w-5 h-5" />
              <textarea
                placeholder="Describe your career aspirations..."
                className="w-full bg-purple-900/20 border border-purple-500/30 rounded-lg py-3 px-12 text-purple-100 placeholder:text-purple-400/50 focus:outline-none focus:ring-2 focus:ring-purple-500/50 min-h-[100px]"
                required
              />
            </div>
          </div>
        </div>

        <motion.button
          type="submit"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg py-4 px-6 text-lg font-semibold hover:from-purple-500 hover:to-indigo-500 transition-all duration-200"
        >
          Continue to Skill Assessment
        </motion.button>
      </form>
    </motion.div>
  );
}