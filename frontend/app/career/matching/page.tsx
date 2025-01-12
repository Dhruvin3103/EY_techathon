"use client";

import { motion } from "framer-motion";
import { Users, Building, MapPin, DollarSign, Briefcase, Star } from "lucide-react";

export default function JobMatchingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-indigo-900">
      <div className="max-w-7xl mx-auto px-4 py-16">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="p-3 bg-purple-500/20 rounded-xl">
              <Users className="w-10 h-10 text-purple-300" />
            </div>
            <h1 className="text-4xl font-bold text-white">AI Job Matching</h1>
          </div>
          <p className="text-xl text-purple-200 max-w-3xl mx-auto">
            Find your perfect job match with AI-powered recommendations
          </p>
        </motion.div>


        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Preferences Panel */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-1 space-y-6"
          >
            {/* Job Preferences */}
            <div className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-purple-500/20">
              <h2 className="text-xl font-semibold text-white mb-6">Job Preferences</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-purple-200 mb-2">Job Title</label>
                  <input
                    type="text"
                    className="w-full bg-purple-900/20 border border-purple-500/30 rounded-lg py-2 px-4 text-purple-100"
                    placeholder="e.g., Software Engineer"
                  />
                </div>

                <div>
                  <label className="block text-purple-200 mb-2">Location</label>
                  <input
                    type="text"
                    className="w-full bg-purple-900/20 border border-purple-500/30 rounded-lg py-2 px-4 text-purple-100"
                    placeholder="e.g., San Francisco, CA"
                  />
                </div>

                <div>
                  <label className="block text-purple-200 mb-2">Experience Level</label>
                  <select className="w-full bg-purple-900/20 border border-purple-500/30 rounded-lg py-2 px-4 text-purple-100">
                    <option>Entry Level</option>
                    <option>Mid Level</option>
                    <option>Senior Level</option>
                  </select>
                </div>

                <div>
                  <label className="block text-purple-200 mb-2">Salary Range</label>
                  <select className="w-full bg-purple-900/20 border border-purple-500/30 rounded-lg py-2 px-4 text-purple-100">
                    <option>$50k - $80k</option>
                    <option>$80k - $120k</option>
                    <option>$120k - $150k</option>
                    <option>$150k+</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Company Preferences */}
            <div className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-purple-500/20">
              <h2 className="text-xl font-semibold text-white mb-6">Company Preferences</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-purple-200 mb-2">Company Size</label>
                  <select className="w-full bg-purple-900/20 border border-purple-500/30 rounded-lg py-2 px-4 text-purple-100">
                    <option>Startup (1-50)</option>
                    <option>Small (51-200)</option>
                    <option>Medium (201-1000)</option>
                    <option>Large (1000+)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-purple-200 mb-2">Industry</label>
                  <select className="w-full bg-purple-900/20 border border-purple-500/30 rounded-lg py-2 px-4 text-purple-100">
                    <option>Technology</option>
                    <option>Healthcare</option>
                    <option>Finance</option>
                    <option>Education</option>
                  </select>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Job Matches */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-2 space-y-6"
          >
            {/* Match Stats */}
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-white/5 backdrop-blur-lg rounded-xl p-4 border border-purple-500/20">
                <div className="text-3xl font-bold text-purple-300 mb-2">95%</div>
                <div className="text-purple-200 text-sm">Match Rate</div>
              </div>
              <div className="bg-white/5 backdrop-blur-lg rounded-xl p-4 border border-purple-500/20">
                <div className="text-3xl font-bold text-purple-300 mb-2">24</div>
                <div className="text-purple-200 text-sm">New Matches</div>
              </div>
              <div className="bg-white/5 backdrop-blur-lg rounded-xl p-4 border border-purple-500/20">
                <div className="text-3xl font-bold text-purple-300 mb-2">12</div>
                <div className="text-purple-200 text-sm">Applied Jobs</div>
              </div>
            </div>

            {/* Job Listings */}
            <div className="space-y-4">
              {[1, 2, 3].map((job) => (
                <motion.div
                  key={job}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: job * 0.1 }}
                  className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-purple-500/20"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-semibold text-white mb-2">Senior Frontend Developer</h3>
                      <div className="flex items-center gap-4 text-purple-200">
                        <div className="flex items-center gap-1">
                          <Building className="w-4 h-4" />
                          <span>TechCorp Inc.</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          <span>San Francisco, CA</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <DollarSign className="w-4 h-4" />
                          <span>$120k - $150k</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="px-3 py-1 bg-purple-500/20 rounded-full text-purple-200 text-sm">
                        98% Match
                      </div>
                      <button className="p-2 hover:bg-purple-500/20 rounded-lg transition-colors">
                        <Star className="w-5 h-5 text-purple-300" />
                      </button>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {["React", "TypeScript", "Node.js", "AWS"].map((skill) => (
                      <span
                        key={skill}
                        className="px-3 py-1 bg-purple-500/20 rounded-full text-purple-200 text-sm"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-purple-200 text-sm">Posted 2 days ago</span>
                    <button className="px-4 py-2 bg-purple-500 rounded-lg text-white hover:bg-purple-600 transition-colors flex items-center gap-2">
                      <Briefcase className="w-4 h-4" />
                      Apply Now
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}