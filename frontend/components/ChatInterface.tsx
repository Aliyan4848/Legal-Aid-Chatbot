import React, { useState, useRef, useEffect } from 'react';
import { useChatStore, Message } from '../store/chatStore';
import { apiClient } from '../utils/api';

interface Category {
  name: string;
  description: string;
}

const ChatInterface: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
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
      const errorText = error instanceof Error ? error.message : 'Unknown error';
      const errorMessage: Message = {
        id: `msg-${Date.now()}-error`,
        role: 'assistant',
        content: `Sorry, I encountered an error processing your request. ${errorText}`,
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
    <div className="flex h-full bg-gradient-to-br from-slate-900 via-slate-900 to-slate-800">
      {/* Premium Sidebar */}
      <div className={`sidebar-enter flex-shrink-0 border-r border-slate-700/50 bg-gradient-to-b from-slate-800 to-slate-900 transition-all duration-300 overflow-y-auto ${
        sidebarOpen ? 'w-72' : 'w-0'
      }`}>
        {sidebarOpen && (
          <div className="w-full p-6 space-y-6">
            {/* Header */}
            <div className="border-b border-slate-700/50 pb-4">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <span>⚖️</span>
                <span>Legal Assistant</span>
              </h2>
              <p className="text-xs text-slate-400 mt-2">Professional guidance at your service</p>
            </div>

            {/* Categories Section */}
            <div>
              <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                <span>📋</span> Categories
              </h3>
              <div className="space-y-2">
                <button
                  onClick={() => setSelectedCategory('')}
                  className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-200 text-sm font-medium ${
                    selectedCategory === ''
                      ? 'bg-gradient-to-r from-primary-600 to-primary-700 text-white shadow-lg glow-active'
                      : 'text-slate-300 bg-slate-700/30 hover:bg-slate-700/50 border border-slate-600/50'
                  }`}
                >
                  All Categories
                </button>
                {Object.entries(categories).map(([key, category]) => (
                  <button
                    key={key}
                    onClick={() => setSelectedCategory(key)}
                    className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-200 text-sm font-medium border ${
                      selectedCategory === key
                        ? 'bg-gradient-to-r from-primary-600 to-primary-700 text-white shadow-lg border-primary-500 glow-active'
                        : 'text-slate-300 bg-slate-700/30 hover:bg-slate-700/50 border-slate-600/50'
                    }`}
                    title={category.description}
                  >
                    <span className="block truncate">{category.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Session Info */}
            <div className="pt-4 border-t border-slate-700/50">
              <p className="text-xs text-slate-400">
                <span className="font-semibold">Messages:</span> {messages.length}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="space-y-2 pt-4 border-t border-slate-700/50">
              {messages.length > 0 && (
                <button
                  onClick={() => clearMessages()}
                  className="w-full px-4 py-3 rounded-lg bg-red-600/10 text-red-400 hover:bg-red-600/20 transition-all duration-200 text-sm font-medium border border-red-600/30"
                >
                  🗑️ Clear Chat
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col h-full min-w-0">
        {/* Top Bar with Sidebar Toggle */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-700/30 bg-slate-800/50 backdrop-blur">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 hover:bg-slate-700 rounded-lg transition-all text-slate-300 hover:text-white"
            title={sidebarOpen ? 'Hide sidebar' : 'Show sidebar'}
          >
            {sidebarOpen ? '◀' : '▶'}
          </button>
          <div className="text-center flex-1">
            <h1 className="text-sm font-semibold text-white">Pakistani Legal Aid</h1>
            <p className="text-xs text-slate-400">AI-Powered Legal Guidance</p>
          </div>
          <div className="w-8" />
        </div>
        {/* Messages Container */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4 scroll-smooth">
          {messages.length === 0 && (
            <div className="h-full flex flex-col items-center justify-center text-center">
              <div className="text-7xl mb-6 animate-bounce">⚖️</div>
              <h2 className="text-3xl font-bold bg-gradient-to-r from-primary-400 to-primary-300 bg-clip-text text-transparent mb-3">Pakistani Legal Aid Chatbot</h2>
              <p className="text-slate-400 mb-8 max-w-md text-lg">
                Get instant legal guidance based on Pakistani Constitution and laws. Ask your legal
                questions and receive accurate information.
              </p>
              <div className="flex gap-3 flex-wrap justify-center">
                {['Criminal Law', 'Family Law', 'Labor Law'].map((cat) => (
                  <span key={cat} className="badge cursor-default hover:bg-primary-600/30 transition-all">
                    {cat}
                  </span>
                ))}
              </div>
            </div>
          )}

          {messages.map((message) => (
            <div
              key={message.id}
              className={`message-enter flex gap-3 ${
                message.role === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              {message.role === 'assistant' && (
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-600 to-primary-700 flex items-center justify-center flex-shrink-0 shadow-lg">
                  <span className="text-lg">⚖️</span>
                </div>
              )}

              <div
                className={`max-w-2xl px-5 py-4 rounded-xl ${
                  message.role === 'user'
                    ? 'bg-gradient-to-r from-primary-600 to-primary-700 text-white rounded-br-none shadow-lg border border-primary-500/30'
                    : 'bg-slate-700/60 text-slate-100 rounded-bl-none border border-slate-600/50 backdrop-blur-sm'
                }`}
              >
                <p className="text-sm whitespace-pre-wrap break-words leading-relaxed">{message.content}</p>
                <p className="text-xs mt-3 opacity-60">
                  {message.timestamp.toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </p>
              </div>

              {message.role === 'user' && (
                <div className="w-10 h-10 rounded-xl bg-slate-700/70 flex items-center justify-center flex-shrink-0 border border-slate-600/50">
                  <span className="text-lg">👤</span>
                </div>
              )}
            </div>
          ))}

          {isLoading && (
            <div className="message-enter flex gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-600 to-primary-700 flex items-center justify-center flex-shrink-0 shadow-lg animate-pulse">
                <span className="text-lg">⚖️</span>
              </div>
              <div className="bg-slate-700/60 text-slate-100 px-5 py-4 rounded-xl rounded-bl-none border border-slate-600/50 backdrop-blur-sm">
                <div className="flex gap-2">
                  <div className="w-2 h-2 bg-primary-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-primary-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-primary-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="border-t border-slate-700/30 bg-gradient-to-t from-slate-800 to-slate-800/50 backdrop-blur p-6">
          {/* Selected Category */}
          {selectedCategory && (
            <div className="mb-4 flex items-center justify-between p-3 bg-primary-600/10 border border-primary-500/30 rounded-lg">
              <span className="text-xs text-primary-300">
                📋 <span className="font-semibold">{categories[selectedCategory]?.name || selectedCategory}</span>
              </span>
              <button
                onClick={() => setSelectedCategory('')}
                className="text-xs text-slate-400 hover:text-slate-300 transition-all"
              >
                ✕
              </button>
            </div>
          )}

          <div className="flex gap-3">
            <textarea
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask your legal question... (Shift+Enter for new line)"
              disabled={isLoading}
              className="input-field resize-none flex-1 max-h-32 bg-slate-700/50 border-slate-600/50 backdrop-blur"
              rows={1}
              style={{ minHeight: '48px', maxHeight: '120px' }}
            />
            <button
              onClick={handleSendMessage}
              disabled={isLoading || !inputValue.trim()}
              className="btn-primary py-2 px-8 h-fit hover:disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 transition-all"
            >
              {isLoading ? (
                <>
                  <span className="animate-spin">⟳</span>
                  Sending
                </>
              ) : (
                <>
                  <span>Send</span>
                  <span>→</span>
                </>
              )}
            </button>
          </div>
          <p className="text-xs text-slate-400 mt-3 flex items-center gap-2">
            💡 <span>Tip: Select a category for more relevant responses</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;
