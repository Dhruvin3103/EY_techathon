"use client";

import { motion } from "framer-motion";
import { PlayCircle } from "lucide-react";
import Link from "next/link";

interface VideoCardProps {
  chapterId: string;
  subchapterId: string;
  thumbnail: string;
  title: string;
}

export function VideoCard({ chapterId, subchapterId, thumbnail, title }: VideoCardProps) {
  return (
    <Link href={`/roadmap/${chapterId}/${subchapterId}/yt`}>
      <motion.div
        whileHover={{ scale: 1.02 }}
        className="relative group overflow-hidden rounded-xl border border-purple-500/20 bg-gradient-to-br from-purple-900/40 to-indigo-900/40 backdrop-blur-sm"
      >
        <div className="aspect-video relative overflow-hidden">
          <img
            src={thumbnail}
            alt={title}
            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <PlayCircle className="w-16 h-16 text-white" />
          </div>
        </div>
        <div className="p-4">
          <h3 className="text-lg font-semibold text-white group-hover:text-purple-300 transition-colors">
            {title}
          </h3>
          <p className="text-sm text-purple-200 mt-1">
            Watch the video explanation
          </p>
        </div>
      </motion.div>
    </Link>
  );
}