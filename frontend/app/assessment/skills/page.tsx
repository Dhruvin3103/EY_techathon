"use client";

import { motion } from "framer-motion";
import { Code2, Database, Palette, BrainCircuit, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

const skillCategories = [
  {
    id: "programming",
    title: "Programming & Development",
    icon: Code2,
    skills: [
      "JavaScript/TypeScript",
      "Python",
      "Java",
      "C++",
      "React",
      "Node.js",
    ],
  },
  {
    id: "data",
    title: "Data & Analytics",
    icon: Database,
    skills: [
      "SQL",
      "Data Analysis",
      "Machine Learning",
      "Big Data",
      "Data Visualization",
      "Statistics",
    ],
  },
  {
    id: "design",
    title: "Design & UX",
    icon: Palette,
    skills: [
      "UI Design",
      "UX Research",
      "Visual Design",
      "Prototyping",
      "User Testing",
      "Design Systems",
    ],
  },
  {
    id: "ai",
    title: "AI & Machine Learning",
    icon: BrainCircuit,
    skills: [
      "Deep Learning",
      "Natural Language Processing",
      "Computer Vision",
      "Neural Networks",
      "AI Ethics",
      "MLOps",
    ],
  },
];

export default function SkillAssessmentPage() {
  const router = useRouter();
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);

  const handleSkillToggle = (skill: string) => {
    setSelectedSkills((prev) =>
      prev.includes(skill)
        ? prev.filter((s) => s !== skill)
        : [...prev, skill]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push("/assessment/career");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 shadow-xl border border-purple-500/20">
        <h2 className="text-2xl font-semibold text-white mb-6">
          Skill Assessment
        </h2>
        <p className="text-purple-200 mb-8">
          Select the skills you currently possess or are learning. This helps us
          understand your technical background.
        </p>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {skillCategories.map((category, index) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-purple-900/20 rounded-xl p-6 border border-purple-500/20"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-purple-500/20 rounded-lg">
                    <category.icon className="w-5 h-5 text-purple-300" />
                  </div>
                  <h3 className="text-lg font-semibold text-white">
                    {category.title}
                  </h3>
                </div>

                <div className="space-y-3">
                  {category.skills.map((skill) => (
                    <button
                      key={skill}
                      type="button"
                      onClick={() => handleSkillToggle(skill)}
                      className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                        selectedSkills.includes(skill)
                          ? "bg-purple-500/30 text-purple-100"
                          : "bg-purple-900/30 text-purple-300 hover:bg-purple-500/20"
                      }`}
                    >
                      {skill}
                    </button>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          <motion.button
            type="submit"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg py-4 px-6 text-lg font-semibold hover:from-purple-500 hover:to-indigo-500 transition-all duration-200 flex items-center justify-center gap-2"
          >
            Continue to Career Preferences
            <ArrowRight className="w-5 h-5" />
          </motion.button>
        </form>
      </div>
    </motion.div>
  );
}