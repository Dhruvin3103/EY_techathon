"use client";

import { motion } from "framer-motion";
import { Check, ClipboardCopy } from "lucide-react";
import { useState } from "react";

interface CodeBlockProps {
  code: string;
  explanation: string;
}

export function CodeBlock({ code, explanation }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-lg overflow-hidden bg-slate-900 border border-purple-500/20"
    >
      <div className="p-4 bg-slate-800/50 flex justify-between items-center">
        <span className="text-purple-200 font-mono text-sm">Code Example</span>
        <button
          onClick={copyToClipboard}
          className="p-2 rounded-lg hover:bg-purple-500/20 transition-colors"
        >
          {copied ? (
            <Check className="w-4 h-4 text-green-400" />
          ) : (
            <ClipboardCopy className="w-4 h-4 text-purple-300" />
          )}
        </button>
      </div>
      <div className="p-4">
        <pre className="text-purple-100 font-mono text-sm overflow-x-auto">
          {code}
        </pre>
      </div>
      <div className="p-4 bg-slate-800/30 border-t border-purple-500/20">
        <p className="text-purple-200 text-sm">{explanation}</p>
      </div>
    </motion.div>
  );
}