import axios, { AxiosInstance } from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

class ApiClient {
  private client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: API_BASE_URL,
      headers: {
        'Content-Type': 'application/json',
      },
      timeout: 30000,
    });
  }

  async sendMessage(message: string, sessionId: string, category?: string) {
    try {
      const response = await this.client.post('/api/chat/message', {
        message,
        session_id: sessionId,
        category: category || '',
      });
      return response.data;
    } catch (error) {
      throw new Error(`Failed to send message: ${error}`);
    }
  }

  async getCategories() {
    try {
      const response = await this.client.get('/api/chat/categories');
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch categories: ${error}`);
    }
  }

  async getConversationHistory(sessionId: string) {
    try {
      const response = await this.client.get(`/api/chat/history/${sessionId}`);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch history: ${error}`);
    }
  }

  async clearHistory(sessionId: string) {
    try {
      const response = await this.client.delete(`/api/chat/clear/${sessionId}`);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to clear history: ${error}`);
    }
  }

  async healthCheck() {
    try {
      const response = await this.client.get('/health');
      return response.data;
    } catch (error) {
      throw new Error(`Health check failed: ${error}`);
    }
  }
}

export const apiClient = new ApiClient();
