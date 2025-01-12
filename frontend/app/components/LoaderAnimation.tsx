"use client";

import { motion } from "framer-motion";

export function LoaderAnimation() {
  return (
    <div className="flex items-center justify-center">
      <div className="relative w-32 h-32">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute top-0 left-0 w-full h-full border-4 border-purple-500 rounded-full"
            initial={{ scale: 1, opacity: 0.3 }}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.1, 0.3],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.3,
              ease: "easeInOut",
            }}
          />
        ))}
        <motion.div
          className="absolute inset-0 flex items-center justify-center text-purple-300 text-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          Generating...
        </motion.div>
      </div>
    </div>
  );
}