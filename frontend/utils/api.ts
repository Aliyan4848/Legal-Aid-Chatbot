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

  private getErrorMessage(error: unknown, fallback: string): string {
    if (axios.isAxiosError(error)) {
      const responseError = error.response?.data;
      if (typeof responseError === 'string') {
        return responseError;
      }
      if (responseError && typeof responseError === 'object' && 'error' in responseError) {
        const message = (responseError as { error?: unknown }).error;
        if (typeof message === 'string' && message.trim()) {
          return message;
        }
      }
      if (error.message) {
        return error.message;
      }
    }

    if (error instanceof Error && error.message) {
      return error.message;
    }

    return fallback;
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
      throw new Error(this.getErrorMessage(error, 'Failed to send message'));
    }
  }

  async getCategories() {
    try {
      const response = await this.client.get('/api/chat/categories');
      return response.data;
    } catch (error) {
      throw new Error(this.getErrorMessage(error, 'Failed to fetch categories'));
    }
  }

  async getConversationHistory(sessionId: string) {
    try {
      const response = await this.client.get(`/api/chat/history/${sessionId}`);
      return response.data;
    } catch (error) {
      throw new Error(this.getErrorMessage(error, 'Failed to fetch history'));
    }
  }

  async clearHistory(sessionId: string) {
    try {
      const response = await this.client.delete(`/api/chat/clear/${sessionId}`);
      return response.data;
    } catch (error) {
      throw new Error(this.getErrorMessage(error, 'Failed to clear history'));
    }
  }

  async healthCheck() {
    try {
      const response = await this.client.get('/health');
      return response.data;
    } catch (error) {
      throw new Error(this.getErrorMessage(error, 'Health check failed'));
    }
  }
}

export const apiClient = new ApiClient();
