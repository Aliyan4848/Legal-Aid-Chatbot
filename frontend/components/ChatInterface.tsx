import React, { useState, useRef, useEffect } from 'react';
import { useChatStore, Message } from '@/store/chatStore';
import { apiClient } from '@/utils/api';

interface Category {
  name: string;
  description: string;
}

const ChatInterface: React.FC = () => {
  const {
    messages,
    isLoading,
    selectedCategory,
    sessionId,
    addMessage,
    setLoading,
    setSelectedCategory,
    clearMessages,
  } = useChatStore();

  const [inputValue, setInputValue] = useState('');
  const [categories, setCategories] = useState<Record<string, Category>>({});
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Fetch categories on mount
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await apiClient.getCategories();
        setCategories(data.categories || {});
      } catch (error) {
        console.error('Failed to fetch categories:', error);
      }
    };
    fetchCategories();
  }, []);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: `msg-${Date.now()}`,
      role: 'user',
      content: inputValue,
      timestamp: new Date(),
    };

    addMessage(userMessage);
    setInputValue('');
    setLoading(true);

    try {
      const response = await apiClient.sendMessage(inputValue, sessionId, selectedCategory);

      const assistantMessage: Message = {
        id: `msg-${Date.now()}-response`,
        role: 'assistant',
        content: response.response,
        timestamp: new Date(),
      };

      addMessage(assistantMessage);
    } catch (error) {
      const errorMessage: Message = {
        id: `msg-${Date.now()}-error`,
        role: 'assistant',
        content:
          'Sorry, I encountered an error processing your request. Please ensure the backend API is running and your Grok API key is configured correctly.',
        timestamp: new Date(),
      };
      addMessage(errorMessage);
      console.error('Error sending message:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="flex flex-col h-full bg-gradient-to-br from-slate-900 via-slate-900 to-slate-800">
      {/* Sidebar with Categories */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-full">
        {/* Categories Panel */}
        <div className="lg:col-span-1 bg-slate-800 border-r border-slate-700 p-4 overflow-y-auto hidden lg:block">
          <div className="mb-6">
            <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-4">
              Legal Categories
            </h3>
            <div className="space-y-2">
              <button
                onClick={() => setSelectedCategory('')}
                className={`w-full text-left px-4 py-2 rounded-lg transition-all duration-200 ${
                  selectedCategory === ''
                    ? 'bg-primary-600 text-white'
                    : 'text-slate-300 hover:bg-slate-700'
                }`}
              >
                All Categories
              </button>
              {Object.entries(categories).map(([key, category]) => (
                <button
                  key={key}
                  onClick={() => setSelectedCategory(key)}
                  className={`w-full text-left px-4 py-2 rounded-lg transition-all duration-200 ${
                    selectedCategory === key
                      ? 'bg-primary-600 text-white'
                      : 'text-slate-300 hover:bg-slate-700'
                  }`}
                  title={category.description}
                >
                  <span className="block text-sm font-medium truncate">{category.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Clear Button */}
          {messages.length > 0 && (
            <button
              onClick={() => clearMessages()}
              className="w-full px-4 py-2 rounded-lg bg-red-600/10 text-red-400 hover:bg-red-600/20 transition-all duration-200 text-sm font-medium"
            >
              Clear Chat
            </button>
          )}
        </div>

        {/* Chat Area */}
        <div className="lg:col-span-3 flex flex-col h-full">
          {/* Messages Container */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {messages.length === 0 && (
              <div className="h-full flex flex-col items-center justify-center text-center">
                <div className="text-5xl mb-4">⚖️</div>
                <h2 className="text-2xl font-bold text-white mb-2">Pakistani Legal Aid Chatbot</h2>
                <p className="text-slate-400 mb-6 max-w-md">
                  Get instant legal guidance based on Pakistani Constitution and laws. Ask your legal
                  questions and receive accurate information.
                </p>
                <div className="flex gap-2 flex-wrap justify-center">
                  {['Criminal Law', 'Family Law', 'Labor Law'].map((cat) => (
                    <span key={cat} className="badge cursor-default">
                      {cat}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {messages.map((message) => (
              <div
                key={message.id}
                className={`message-enter flex gap-3 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {message.role === 'assistant' && (
                  <div className="w-8 h-8 rounded-lg bg-primary-600 flex items-center justify-center flex-shrink-0">
                    <span className="text-sm">⚖️</span>
                  </div>
                )}

                <div
                  className={`max-w-2xl px-4 py-3 rounded-lg ${
                    message.role === 'user'
                      ? 'bg-primary-600 text-white rounded-br-none'
                      : 'bg-slate-700 text-slate-100 rounded-bl-none border border-slate-600'
                  }`}
                >
                  <p className="text-sm whitespace-pre-wrap break-words">{message.content}</p>
                  <p className="text-xs mt-2 opacity-70">
                    {message.timestamp.toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </p>
                </div>

                {message.role === 'user' && (
                  <div className="w-8 h-8 rounded-lg bg-slate-700 flex items-center justify-center flex-shrink-0 border border-slate-600">
                    <span className="text-sm">👤</span>
                  </div>
                )}
              </div>
            ))}

            {isLoading && (
              <div className="message-enter flex gap-3">
                <div className="w-8 h-8 rounded-lg bg-primary-600 flex items-center justify-center flex-shrink-0">
                  <span className="text-sm animate-pulse">⚖️</span>
                </div>
                <div className="bg-slate-700 text-slate-100 px-4 py-3 rounded-lg rounded-bl-none border border-slate-600">
                  <div className="flex gap-2">
                    <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Category Tag - Mobile */}
          {selectedCategory && (
            <div className="px-6 py-2 lg:hidden flex items-center justify-between">
              <span className="text-xs text-slate-400">
                Category: <span className="badge">{categories[selectedCategory]?.name || selectedCategory}</span>
              </span>
              <button
                onClick={() => setSelectedCategory('')}
                className="text-xs text-slate-400 hover:text-slate-300"
              >
                Clear
              </button>
            </div>
          )}

          {/* Input Area */}
          <div className="border-t border-slate-700 bg-slate-800 p-4">
            <div className="flex gap-3">
              <textarea
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask your legal question... (Shift+Enter for new line)"
                disabled={isLoading}
                className="input-field resize-none flex-1 max-h-32"
                rows={1}
                style={{ minHeight: '44px', maxHeight: '120px' }}
              />
              <button
                onClick={handleSendMessage}
                disabled={isLoading || !inputValue.trim()}
                className="btn-primary py-2 px-6 h-fit hover:disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? '...' : 'Send'}
              </button>
            </div>
            <p className="text-xs text-slate-400 mt-2">
              💡 Tip: Select a category for more relevant responses
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;
