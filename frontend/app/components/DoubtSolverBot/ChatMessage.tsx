"use client";

import { motion } from "framer-motion";
import { Bot, User } from "lucide-react";

interface ChatMessageProps {
  message: string;
  isBot: boolean;
}

export function ChatMessage({ message, isBot }: ChatMessageProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex gap-3 ${isBot ? "flex-row" : "flex-row-reverse"}`}
    >
      {/* Icon Container */}
      <div
        className={`flex justify-center items-center p-2 rounded-full ${
          isBot ? "bg-purple-500/20" : "bg-indigo-500/20"
        }`}
        style={{
          width: "35px",
          height: "35px", 
        }}
      >
        {isBot ? (
          <Bot className="w-5 h-5 text-purple-300" />
        ) : (
          <User className="w-5 h-5 text-indigo-300" />
        )}
      </div>

      {/* Message Box */}
      <div
        className={`flex-1 p-4 rounded-lg ${
          isBot
            ? "bg-purple-900/40 text-purple-100"
            : "bg-indigo-900/40 text-indigo-100"
        }`}
      >
        {message}
      </div>
    </motion.div>
  );
}
