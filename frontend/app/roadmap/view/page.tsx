"use client";

import { RoadmapData } from '@/app/api/types';
import { motion } from "framer-motion";
import { Code2, Compass } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ChapterCard } from '../components/ChapterCard';
import { CursorEffect } from '../components/CursorEffect';
import { LoaderAnimation } from '@/app/components/LoaderAnimation';

export default function RoadmapPage() {
  const [expandedChapter, setExpandedChapter] = useState<string | null>(null);
  const [roadmapData, setRoadmapData] = useState<RoadmapData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const router = useRouter();

  useEffect(() => {
    const storedData = localStorage.getItem("roadmapData");
    if (storedData) {
      try {
        const data = JSON.parse(storedData);
        setRoadmapData(data);
        setIsLoading(false);
      } catch (err) {
        setError("Failed to load roadmap data");
        setIsLoading(false);
      }
    } else {
      router.push("/");
    }
  }, [router]);

  const handleSubchapterClick = (chapterId: string, subchapterIndex: number) => {
    router.push(`/roadmap/${chapterId}/${subchapterIndex + 1}`);
  };

  const toggleChapter = (chapterId: string) => {
    setExpandedChapter(expandedChapter === chapterId ? null : chapterId);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-indigo-900 flex flex-col items-center justify-center">
        <LoaderAnimation />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-indigo-900 flex items-center justify-center">
        <div className="text-red-400 text-xl">{error}</div>
      </div>
    );
  }

  if (!roadmapData) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-indigo-900 relative overflow-hidden">
      <div 
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='24' height='24' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h1v24H0zM23 0h1v24h-1z' fill='%23fff' fill-opacity='0.1'/%3E%3Cpath d='M0 0h24v1H0zM0 23h24v1H0z' fill='%23fff' fill-opacity='0.1'/%3E%3C/svg%3E")`,
          backgroundSize: '24px 24px'
        }}
      />
      
      <div className="relative">
        <div className="absolute inset-0 bg-slate-900 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
        
        <div className="relative max-w-6xl mx-auto px-4 py-16">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <motion.div 
              className="flex items-center justify-center gap-4 mb-6"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <div className="p-3 bg-purple-500/20 rounded-xl">
                <Code2 className="w-8 h-8 text-purple-300" />
              </div>
              <h1 className="text-5xl font-bold text-white">
                {roadmapData.Course_name}
              </h1>
            </motion.div>
            
            <motion.div 
              className="flex items-center justify-center gap-2 text-purple-300 mb-8"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <Compass className="w-5 h-5" />
              <p className="text-lg">{roadmapData.Course_tagline}</p>
            </motion.div>
            
            <motion.p 
              className="text-purple-200 max-w-2xl mx-auto text-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              {roadmapData.Course_description}
            </motion.p>
          </motion.div>
          
          <div className="space-y-6">
            {Object.entries(roadmapData.roadmap).map(([chapterId, chapter], index) => (
              <motion.div
                key={chapterId}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <ChapterCard
                  chapterId={chapterId}
                  chapter={chapter}
                  isExpanded={expandedChapter === chapterId}
                  onToggle={() => setExpandedChapter(expandedChapter === chapterId ? null : chapterId)}
              onSubchapterClick={(index: number) => handleSubchapterClick(chapterId, index)}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
      
      <CursorEffect />
    </div>
  );
}