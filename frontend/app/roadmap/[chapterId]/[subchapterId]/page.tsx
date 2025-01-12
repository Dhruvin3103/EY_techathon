"use client";

import { useEffect, useState } from 'react';
import  apiClient  from '@/app/api/client';
import { SubchapterContent } from './components/SubchapterConent';
import { LoaderAnimation } from '@/app/components/LoaderAnimation';
import { SubchapterNavigation } from './components/SubchapterNavigation';
import { useRouter } from 'next/navigation';
import type { ChapterData } from './types';

export default function SubchapterPage({
  params,
}: {
  params: { chapterId: string; subchapterId: string };
}) {
  const [data, setData] = useState<ChapterData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Get user preferences from localStorage
        const preferences = JSON.parse(localStorage.getItem("userPreferences") || "{}");
        const roadmapData = JSON.parse(localStorage.getItem("roadmapData") || "{}");
        const chapterTitle = roadmapData.roadmap[params.chapterId]?.title;
        const subchapterTitle = roadmapData.roadmap[params.chapterId]?.subchapters[Number(params.subchapterId) - 1];
      
        if (!preferences.topic) {
          router.push("/");
          return;
        }

        const request = {
          topic: preferences.topic,
          user_level: preferences.user_level,
          additional_pref: preferences.additional_pref,
          chapter: chapterTitle,
          subchapter: subchapterTitle,
        };

        const chapterData = await apiClient.generateContent(request);
        setData(chapterData);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load content");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [params.chapterId, params.subchapterId, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-indigo-900 flex items-center justify-center">
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

  if (!data) return null;

  const roadmapData = JSON.parse(localStorage.getItem("roadmapData") || "{}");
  const chapter = roadmapData.roadmap?.[params.chapterId];
  const totalSubchapters = chapter?.subchapters?.length || 0;
  const currentSubchapter = parseInt(params.subchapterId);
  const completedChapters = JSON.parse(localStorage.getItem("completedChapters") || "[]");
  const isCompleted = completedChapters.includes(params.chapterId);

  return (
    <>
      <SubchapterContent data={data} />
      <SubchapterNavigation
        chapterId={params.chapterId}
        currentSubchapter={currentSubchapter}
        totalSubchapters={totalSubchapters}
        isCompleted={isCompleted}
      />
    </>
  );
}