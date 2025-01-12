"use client";

import { motion } from "framer-motion";
import { ArrowRight, BrainCircuit, Compass, GraduationCap, Target, Users } from "lucide-react";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-indigo-900">
      <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <motion.div
            className="flex items-center justify-center gap-4 mb-8"
            whileHover={{ scale: 1.05 }}
          >
            <div className="p-3 bg-purple-500/20 rounded-xl">
              <BrainCircuit className="w-12 h-12 text-purple-300" />
            </div>
            <h1 className="text-5xl font-bold text-white">SkillBridge AI</h1>
          </motion.div>
          <p className="mt-4 text-xl text-purple-200 max-w-3xl mx-auto">
            Your AI-powered companion for personalized career development and skill acquisition.
            Bridge the gap between your current abilities and your dream career.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <Link href="/assessment">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg text-lg font-semibold hover:from-purple-500 hover:to-indigo-500 transition-all duration-200 flex items-center gap-2"
              >
                Start Your Journey
                <ArrowRight className="w-5 h-5" />
              </motion.button>
            </Link>
          </div>
        </motion.div>

        <div className="mt-24 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              icon: Target,
              title: "Skill Assessment",
              description: "AI-powered evaluation of your current skills and identification of growth opportunities."
            },
            {
              icon: Compass,
              title: "Personalized Learning",
              description: "Tailored learning paths and content adapted to your unique needs and goals."
            },
            {
              icon: GraduationCap,
              title: "Career Mapping",
              description: "Strategic career planning aligned with industry demands and your aspirations."
            }
          ].map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-purple-500/20"
            >
              <div className="p-3 bg-purple-500/20 rounded-lg w-fit">
                <feature.icon className="w-6 h-6 text-purple-300" />
              </div>
              <h3 className="mt-4 text-xl font-semibold text-white">{feature.title}</h3>
              <p className="mt-2 text-purple-200">{feature.description}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-24 bg-white/5 backdrop-blur-lg rounded-xl p-8 border border-purple-500/20"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { number: "95%", label: "Success Rate" },
              { number: "50K+", label: "Active Learners" },
              { number: "200+", label: "Career Paths" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-4xl font-bold text-purple-300">{stat.number}</div>
                <div className="mt-2 text-purple-200">{stat.label}</div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-24 text-center"
        >
          <h2 className="text-3xl font-bold text-white">Ready to Start Your Journey?</h2>
          <p className="mt-4 text-xl text-purple-200">
            Join thousands of learners who have transformed their careers with SkillBridge AI.
          </p>
          <Link href="/assessment">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="mt-8 px-8 py-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg text-lg font-semibold hover:from-purple-500 hover:to-indigo-500 transition-all duration-200"
            >
              Begin Assessment
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}