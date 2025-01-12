"use client";

import { motion } from "framer-motion";
import { ArrowRight, FileText, Briefcase, GraduationCap, Award } from "lucide-react";
import { useState } from "react";

export default function ResumeBuilderPage() {
  const [step, setStep] = useState(1);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-indigo-900">
      <div className="max-w-4xl mx-auto px-4 py-16">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="p-3 bg-purple-500/20 rounded-xl">
              <FileText className="w-10 h-10 text-purple-300" />
            </div>
            <h1 className="text-4xl font-bold text-white">ATS Resume Builder</h1>
          </div>
          <p className="text-xl text-purple-200">
            Create a professional, ATS-optimized resume with AI assistance
          </p>
        </motion.div>

        {/* Progress Steps */}
        <div className="mb-12">
          <div className="flex justify-between items-center">
            {["Personal Info", "Experience", "Education", "Skills", "Review"].map((label, index) => (
              <div key={label} className="flex flex-col items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${
                  step > index + 1 ? "bg-green-500" :
                  step === index + 1 ? "bg-purple-500" :
                  "bg-purple-900/20"
                }`}>
                  {index + 1}
                </div>
                <span className="text-purple-200 text-sm">{label}</span>
              </div>
            ))}
          </div>
          <div className="relative mt-4">
            <div className="absolute top-0 left-0 h-2 bg-purple-900/20 w-full rounded-full">
              <div
                className="h-full bg-purple-500 rounded-full transition-all duration-300"
                style={{ width: `${(step / 5) * 100}%` }}
              />
            </div>
          </div>
        </div>

        {/* Form Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/5 backdrop-blur-lg rounded-xl p-8 border border-purple-500/20"
        >
          {step === 1 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold text-white mb-6">Personal Information</h2>
              <div>
                <label className="block text-purple-200 mb-2">Full Name</label>
                <input
                  type="text"
                  className="w-full bg-purple-900/20 border border-purple-500/30 rounded-lg py-3 px-4 text-purple-100"
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label className="block text-purple-200 mb-2">Professional Title</label>
                <input
                  type="text"
                  className="w-full bg-purple-900/20 border border-purple-500/30 rounded-lg py-3 px-4 text-purple-100"
                  placeholder="Senior Software Engineer"
                />
              </div>
              <div>
                <label className="block text-purple-200 mb-2">Contact Information</label>
                <input
                  type="email"
                  className="w-full bg-purple-900/20 border border-purple-500/30 rounded-lg py-3 px-4 text-purple-100 mb-3"
                  placeholder="Email"
                />
                <input
                  type="tel"
                  className="w-full bg-purple-900/20 border border-purple-500/30 rounded-lg py-3 px-4 text-purple-100"
                  placeholder="Phone"
                />
              </div>
            </div>
          )}

          <div className="flex justify-between mt-8">
            <button
              onClick={() => setStep(Math.max(1, step - 1))}
              className={`px-6 py-3 rounded-lg text-purple-200 hover:bg-purple-500/20 transition-colors ${
                step === 1 ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={step === 1}
            >
              Previous
            </button>
            <button
              onClick={() => setStep(Math.min(5, step + 1))}
              className="px-6 py-3 bg-purple-500 rounded-lg text-white hover:bg-purple-600 transition-colors flex items-center gap-2"
            >
              {step === 5 ? "Generate Resume" : "Next"}
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}