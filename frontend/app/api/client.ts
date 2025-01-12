import axios from 'axios';
import { API_ENDPOINTS } from './config';
import type { ApiResponse, ContentRequest, RoadmapData, RoadmapRequest } from './types';
import type { ChapterData } from '../roadmap/[chapterId]/[subchapterId]/types';

class ApiClient {
  private contentCache: Map<string, ChapterData> = new Map();

  private async request<T>(endpoint: string, data: any): Promise<T> {
    try {
      const response = await axios.post<ApiResponse<T>>(endpoint, data);
      
      if (response.data.status_code !== 200) {
        throw new Error(response.data.message);
      }

      return response.data.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.message || error.message);
      }
      throw error;
    }
  }

  async generateRoadmap(request: RoadmapRequest): Promise<RoadmapData> {
    return this.request<RoadmapData>(API_ENDPOINTS.GENERATE_ROADMAP, request);
  }

  async generateContent(request: ContentRequest): Promise<ChapterData> {
    const cacheKey = `${request.chapter}_${request.subchapter}`;
    
    const cachedData = this.contentCache.get(cacheKey);
    if (cachedData) {
      return cachedData;
    }

    const data = await this.request<ChapterData>(API_ENDPOINTS.GENERATE_CONTENT, request);
    this.contentCache.set(cacheKey, data);
    return data;
  }

  async startChat(topicContent: string, sessionId: string): Promise<{ session_id: string }> {
    return this.request<{ session_id: string }>(API_ENDPOINTS.START_CHAT, {
      topic_content: topicContent,
      session_id: sessionId,
    });
  }

  async sendMessage(sessionId: string, message: string): Promise<{ response: string }> {
    const result = await this.request<{ response: string }>(API_ENDPOINTS.CHAT, {
      session_id: sessionId,
      message,
    });
    console.log("API response:", result); 
    return result;
  }

  async checkAnswer(question: string, quiz_type:string , answer: string | boolean, language: string): Promise<{
    status: "correct" | "incorrect" | "partial";
    feedback: string;
  }> {
    try {
      const payload = {
        quiz_type: quiz_type,  
        question: question,             
        answer: answer,                 
        language: language             
      };
  
      const result = await this.request<{ status: "correct" | "incorrect" | "partial"; feedback: string }>(
        API_ENDPOINTS.CHECK_ANSWER, 
        payload 
      );
      
      console.log("API response:", result);  
    } catch (error) {
      console.error("Error checking answer:", error);
      throw error;  
    }
  }
  
}

export default new ApiClient();