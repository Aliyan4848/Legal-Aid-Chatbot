import React, { useEffect } from 'react';
import Head from 'next/head';
import Header from '../components/Header';
import ChatInterface from '../components/ChatInterface';
import { useChatStore } from '../store/chatStore';

export default function Chat() {
  const { setSessionId } = useChatStore();

  useEffect(() => {
    // Generate a unique session ID for this chat session using crypto
    const generateSessionId = () => {
      if (typeof window !== 'undefined' && window.crypto) {
        const bytes = new Uint8Array(16);
        window.crypto.getRandomValues(bytes);
        const hex = Array.from(bytes).map(b => b.toString(16).padStart(2, '0')).join('');
        return `session-${hex}`;
      }
      // Fallback for older browsers
      return `session-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    };
    
    const newSessionId = generateSessionId();
    setSessionId(newSessionId);
  }, [setSessionId]);

  return (
    <>
      <Head>
        <title>Legal Chat - Pakistani Legal Aid Chatbot</title>
        <meta
          name="description"
          content="Chat with our AI legal advisor to get instant guidance on Pakistani laws and constitution."
        />
      </Head>

      <Header />

      <main className="h-[calc(100vh-80px)] overflow-hidden">
        <ChatInterface />
      </main>
    </>
  );
}
