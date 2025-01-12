export const API_BASE_URL = 'http://127.0.0.1:8000';

export const API_ENDPOINTS = {
  GENERATE_ROADMAP: `${API_BASE_URL}/generate-roadmap/`,
  GENERATE_CONTENT: `${API_BASE_URL}/generate-content/`,
  START_CHAT: `${API_BASE_URL}/start_chat`,
  CHAT: `${API_BASE_URL}/chat`,
  CHECK_ANSWER: `${API_BASE_URL}/check-answer/`,
} as const;