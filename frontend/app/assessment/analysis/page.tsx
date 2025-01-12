"use client";

import { motion } from "framer-motion";
import { TrendingUp, Users, Briefcase, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";

const marketTrends = [
  {
    role: "Frontend Developer",
    demand: "High",
    growth: "+25%",
    avgSalary: "$95,000",
    topSkills: ["React", "TypeScript", "UI/UX", "Next.js"],
  },
  {
    role: "Data Scientist",
    demand: "Very High",
    growth: "+35%",
    avgSalary: "$120,000",
    topSkills: ["Python", "Machine Learning", "SQL", "Statistics"],
  },
];

export default function MarketAnalysisPage() {
  const router = useRouter();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      {/* Market Trends */}
      <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 shadow-xl border border-purple-500/20">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-purple-500/20 rounded-lg">
            <TrendingUp className="w-6 h-6 text-purple-300" />
          </div>
          <h2 className="text-2xl font-semibold text-white">Market Analysis</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {marketTrends.map((trend, index) => (
            <motion.div
              key={trend.role}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-purple-900/20 rounded-xl p-6 border border-purple-500/20"
            >
              <h3 className="text-xl font-semibold text-white mb-4">
                {trend.role}
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between text-purple-200">
                  <span>Market Demand:</span>
                  <span className="text-green-400">{trend.demand}</span>
                </div>
                <div className="flex justify-between text-purple-200">
                  <span>Growth Rate:</span>
                  <span className="text-green-400">{trend.growth}</span>
                </div>
                <div className="flex justify-between text-purple-200">
                  <span>Average Salary:</span>
                  <span className="text-purple-100">{trend.avgSalary}</span>
                </div>
                <div className="pt-3 border-t border-purple-500/20">
                  <p className="text-purple-200 mb-2">Top Required Skills:</p>
                  <div className="flex flex-wrap gap-2">
                    {trend.topSkills.map((skill) => (
                      <span
                        key={skill}
                        className="px-3 py-1 bg-purple-500/20 rounded-full text-sm text-purple-200"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Industry Insights */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-purple-900/20 rounded-xl p-6 border border-purple-500/20">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-purple-500/20 rounded-lg">
                <Users className="w-5 h-5 text-purple-300" />
              </div>
              <h3 className="text-lg font-semibold text-white">
                Industry Demand
              </h3>
            </div>
            <p className="text-purple-200">
              The tech industry shows strong growth in frontend development and
              data science roles, with increasing demand for full-stack
              capabilities.
            </p>
          </div>

          <div className="bg-purple-900/20 rounded-xl p-6 border border-purple-500/20">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-purple-500/20 rounded-lg">
                <Briefcase className="w-5 h-5 text-purple-300" />
              </div>
              <h3 className="text-lg font-semibold text-white">
                Career Opportunities
              </h3>
            </div>
            <p className="text-purple-200">
              Remote work opportunities are abundant, with companies increasingly
              focusing on digital transformation and AI integration.
            </p>
          </div>
        </div>

        <motion.button
          onClick={() => router.push("/assessment/recommendations")}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full mt-8 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg py-4 px-6 text-lg font-semibold hover:from-purple-500 hover:to-indigo-500 transition-all duration-200 flex items-center justify-center gap-2"
        >
          View Career Path Recommendations
          <ArrowRight className="w-5 h-5" />
        </motion.button>
      </div>
    </motion.div>
  );
}