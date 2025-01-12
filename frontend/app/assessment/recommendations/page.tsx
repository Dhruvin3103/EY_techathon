"use client";

import { motion } from "framer-motion";
import {
  BookOpen,
  Award,
  TrendingUp,
  ArrowRight,
  GraduationCap,
  Rocket,
} from "lucide-react";
import { useRouter } from "next/navigation";

const careerPath = {
  role: "Frontend Developer",
  timeline: [
    {
      phase: "Foundation (3-6 months)",
      skills: ["HTML/CSS", "JavaScript Basics", "Responsive Design"],
      resources: ["MDN Web Docs", "freeCodeCamp", "Frontend Masters"],
    },
    {
      phase: "Framework Mastery (6-9 months)",
      skills: ["React", "TypeScript", "State Management"],
      resources: ["React Documentation", "TypeScript Handbook", "Redux Course"],
    },
    {
      phase: "Advanced Concepts (6-9 months)",
      skills: ["Next.js", "Testing", "Performance Optimization"],
      resources: ["Next.js Learn", "Testing Library", "Web.dev"],
    },
  ],
};

export default function RecommendationsPage() {
  const router = useRouter();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      {/* Career Path Overview */}
      <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 shadow-xl border border-purple-500/20">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-purple-500/20 rounded-lg">
            <Rocket className="w-6 h-6 text-purple-300" />
          </div>
          <h2 className="text-2xl font-semibold text-white">
            Your Career Path: {careerPath.role}
          </h2>
        </div>

        {/* Learning Timeline */}
        <div className="space-y-8 mb-8">
          {careerPath.timeline.map((phase, index) => (
            <motion.div
              key={phase.phase}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-purple-900/20 rounded-xl p-6 border border-purple-500/20"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-purple-500/20 rounded-lg">
                  {index === 0 ? (
                    <BookOpen className="w-5 h-5 text-purple-300" />
                  ) : index === 1 ? (
                    <Award className="w-5 h-5 text-purple-300" />
                  ) : (
                    <TrendingUp className="w-5 h-5 text-purple-300" />
                  )}
                </div>
                <h3 className="text-lg font-semibold text-white">
                  {phase.phase}
                </h3>
              </div>

              <div className="space-y-4">
                <div>
                  <p className="text-purple-200 mb-2">Key Skills:</p>
                  <div className="flex flex-wrap gap-2">
                    {phase.skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-3 py-1 bg-purple-500/20 rounded-full text-sm text-purple-200"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="text-purple-200 mb-2">Learning Resources:</p>
                  <div className="flex flex-wrap gap-2">
                    {phase.resources.map((resource) => (
                      <span
                        key={resource}
                        className="px-3 py-1 bg-purple-500/20 rounded-full text-sm text-purple-200"
                      >
                        {resource}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Next Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-purple-900/20 rounded-xl p-6 border border-purple-500/20">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-purple-500/20 rounded-lg">
                <GraduationCap className="w-5 h-5 text-purple-300" />
              </div>
              <h3 className="text-lg font-semibold text-white">
                Recommended Certifications
              </h3>
            </div>
            <ul className="space-y-2 text-purple-200">
              <li>• Meta Frontend Developer Certificate</li>
               <li>• AWS Cloud Practitioner</li>
              <li>• JavaScript Algorithms and Data Structures</li>
              <li>• React Developer Certification</li>
            </ul>
          </div>

          <div className="bg-purple-900/20 rounded-xl p-6 border border-purple-500/20">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-purple-500/20 rounded-lg">
                <TrendingUp className="w-5 h-5 text-purple-300" />
              </div>
              <h3 className="text-lg font-semibold text-white">
                Growth Opportunities
              </h3>
            </div>
            <ul className="space-y-2 text-purple-200">
              <li>• Open Source Contributions</li>
              <li>• Technical Blog Writing</li>
              <li>• Community Mentorship</li>
              <li>• Hackathons & Coding Challenges</li>
            </ul>
          </div>
        </div>

        <motion.button
          onClick={() => router.push("/roadmap")}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg py-4 px-6 text-lg font-semibold hover:from-purple-500 hover:to-indigo-500 transition-all duration-200 flex items-center justify-center gap-2"
        >
          Start Your Learning Journey
          <ArrowRight className="w-5 h-5" />
        </motion.button>
      </div>
    </motion.div>
  );
}