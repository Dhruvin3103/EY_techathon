"use client";

import { motion } from "framer-motion";
import { Briefcase, Target, ArrowRight, Compass } from "lucide-react";
import { useRouter } from "next/navigation";

const careerPaths = [
  {
    id: "frontend",
    title: "Frontend Developer",
    description: "Build user interfaces and create engaging web experiences",
    skills: ["React", "JavaScript", "CSS", "UI/UX"],
  },
  {
    id: "backend",
    title: "Backend Developer",
    description: "Design and implement server-side applications and APIs",
    skills: ["Node.js", "Python", "Databases", "APIs"],
  },
  {
    id: "data_scientist",
    title: "Data Scientist",
    description: "Analyze data and build machine learning models",
    skills: ["Python", "Statistics", "Machine Learning", "SQL"],
  },
  {
    id: "ux_designer",
    title: "UX Designer",
    description: "Design user experiences and interfaces",
    skills: ["UI Design", "User Research", "Prototyping", "Wireframing"],
  },
];

export default function CareerPreferencesPage() {
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push("/assessment/analysis");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 shadow-xl border border-purple-500/20">
        <h2 className="text-2xl font-semibold text-white mb-6">
          Career Preferences
        </h2>
        <p className="text-purple-200 mb-8">
          Select your desired career path and preferences to help us provide
          tailored recommendations.
        </p>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Career Paths */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {careerPaths.map((path, index) => (
              <motion.div
                key={path.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-purple-900/20 rounded-xl p-6 border border-purple-500/20 hover:bg-purple-500/20 transition-colors cursor-pointer group"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-purple-500/20 rounded-lg group-hover:bg-purple-500/30 transition-colors">
                    <Briefcase className="w-5 h-5 text-purple-300" />
                  </div>
                  <h3 className="text-lg font-semibold text-white">
                    {path.title}
                  </h3>
                </div>
                <p className="text-purple-200 mb-4">{path.description}</p>
                <div className="flex flex-wrap gap-2">
                  {path.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1 bg-purple-500/20 rounded-full text-sm text-purple-200"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Career Goals */}
          <div className="space-y-6">
            <div>
              <label className="block text-purple-200 mb-2">
                Short-term Goals (1-2 years)
              </label>
              <div className="relative">
                <Target className="absolute left-4 top-4 text-purple-400 w-5 h-5" />
                <textarea
                  placeholder="What do you want to achieve in the next 1-2 years?"
                  className="w-full bg-purple-900/20 border border-purple-500/30 rounded-lg py-3 px-12 text-purple-100 placeholder:text-purple-400/50 focus:outline-none focus:ring-2 focus:ring-purple-500/50 min-h-[100px]"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-purple-200 mb-2">
                Long-term Vision (5+ years)
              </label>
              <div className="relative">
                <Compass className="absolute left-4 top-4 text-purple-400 w-5 h-5" />
                <textarea
                  placeholder="Where do you see yourself in 5+ years?"
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
            className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg py-4 px-6 text-lg font-semibold hover:from-purple-500 hover:to-indigo-500 transition-all duration-200 flex items-center justify-center gap-2"
          >
            Continue to Analysis
            <ArrowRight className="w-5 h-5" />
          </motion.button>
        </form>
      </div>
    </motion.div>
  );
}