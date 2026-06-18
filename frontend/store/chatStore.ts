import { create } from 'zustand';

export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export interface ChatStore {
  messages: Message[];
  sessionId: string;
  isLoading: boolean;
  selectedCategory: string;
  addMessage: (message: Message) => void;
  clearMessages: () => void;
  setLoading: (loading: boolean) => void;
  setSessionId: (id: string) => void;
  setSelectedCategory: (category: string) => void;
  setMessages: (messages: Message[]) => void;
}

export const useChatStore = create<ChatStore>((set) => ({
  messages: [],
  sessionId: `session-${Date.now()}`,
  isLoading: false,
  selectedCategory: '',

  addMessage: (message: Message) =>
    set((state) => ({
      messages: [...state.messages, message],
    })),

  clearMessages: () =>
    set(() => ({
      messages: [],
    })),

  setLoading: (loading: boolean) =>
    set(() => ({
      isLoading: loading,
    })),

  setSessionId: (id: string) =>
    set(() => ({
      sessionId: id,
    })),

  setSelectedCategory: (category: string) =>
    set(() => ({
      selectedCategory: category,
    })),

  setMessages: (messages: Message[]) =>
    set(() => ({
      messages,
    })),
}));
