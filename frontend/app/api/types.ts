export interface RoadmapRequest {
  topic: string;
  user_level: string;
  additional_pref: string;
}

export interface ContentRequest extends RoadmapRequest {
  chapter: string;
  subchapter: string;
}

export interface ApiResponse<T> {
  status_code: number;
  message: string;
  data: T;
}

export interface RoadmapChapter {
  title: string;
  subchapters: string[];
}

export interface RoadmapData {
  roadmap: {
    [key: string]: RoadmapChapter;
  };
  Course_name: string;
  Course_description: string;
  Course_tagline: string;

}