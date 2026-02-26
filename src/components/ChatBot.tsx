'use client';

import { useState, useRef, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { useLocale } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export default function ChatBot() {
  const t = useTranslations('chatbot');
  const locale = useLocale();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  function handleOpen() {
    setIsOpen(true);
    if (messages.length === 0) {
      setMessages([{ role: 'assistant', content: t('greeting') }]);
    }
  }

  async function handleSend() {
    const trimmed = input.trim();
    if (!trimmed || isLoading) return;

    const userMessage: Message = { role: 'user', content: trimmed };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInput('');
    setIsLoading(true);

    // Filter out the initial greeting (it's not part of the API conversation)
    const apiMessages = updatedMessages
      .filter(
        (m, i) => !(i === 0 && m.role === 'assistant')
      )
      .map(({ role, content }) => ({ role, content }));

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: apiMessages, locale }),
      });

      if (!response.ok || !response.body) {
        throw new Error('Failed to get response');
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let assistantContent = '';

      setMessages((prev) => [...prev, { role: 'assistant', content: '' }]);

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        assistantContent += decoder.decode(value, { stream: true });
        const currentContent = assistantContent;
        setMessages((prev) => {
          const next = [...prev];
          next[next.length - 1] = {
            role: 'assistant',
            content: currentContent,
          };
          return next;
        });
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: t('error') },
      ]);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      {/* Floating chat button */}
      {!isOpen && (
        <motion.button
          onClick={handleOpen}
          className="fixed bottom-6 right-6 z-[9] w-14 h-14 rounded-full bg-gradient-to-r from-[#25C760] to-[#3C8063] text-white shadow-[0_4px_20px_rgba(37,199,96,0.4)] flex items-center justify-center cursor-pointer border-none hover:shadow-[0_4px_30px_rgba(37,199,96,0.6)] transition-shadow duration-300"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          aria-label={t('title')}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
        </motion.button>
      )}

      {/* Chat window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed bottom-6 right-6 z-[9] w-[350px] h-[500px] max-h-[80vh] max-w-[calc(100vw-2rem)] bg-black border border-[#25C760] rounded-xl shadow-[0_8px_40px_rgba(0,0,0,0.5)] flex flex-col overflow-hidden"
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          >
            {/* Header */}
            <div className="w-full h-[50px] bg-gradient-to-r from-[#25C760] to-[#3C8063] text-white font-semibold flex items-center justify-between px-4 flex-shrink-0">
              <span className="text-sm">{t('title')}</span>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white text-lg cursor-pointer bg-transparent border-none hover:scale-110 transition-transform duration-200"
                aria-label={t('close')}
              >
                &#10005;
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] px-3 py-2 rounded-lg text-sm whitespace-pre-wrap break-words ${
                      msg.role === 'user'
                        ? 'bg-[#25C760] text-black rounded-br-none'
                        : 'bg-[#1a1a1a] text-white border border-[rgba(37,199,96,0.2)] rounded-bl-none'
                    }`}
                  >
                    {msg.content}
                  </div>
                </div>
              ))}
              {isLoading &&
                messages[messages.length - 1]?.role !== 'assistant' && (
                  <div className="flex justify-start">
                    <div className="bg-[#1a1a1a] text-white border border-[rgba(37,199,96,0.2)] px-3 py-2 rounded-lg rounded-bl-none text-sm">
                      <span className="inline-flex gap-1">
                        <span className="animate-bounce">.</span>
                        <span className="animate-bounce [animation-delay:0.1s]">.</span>
                        <span className="animate-bounce [animation-delay:0.2s]">.</span>
                      </span>
                    </div>
                  </div>
                )}
              <div ref={messagesEndRef} />
            </div>

            {/* Support link */}
            <div className="px-4 py-1 flex-shrink-0">
              <a
                href="mailto:support@mothervegetable.com"
                className="text-[#25C760] text-xs hover:underline"
              >
                {t('supportLink')}
              </a>
            </div>

            {/* Input area */}
            <div className="p-3 border-t border-[rgba(37,199,96,0.2)] flex gap-2 flex-shrink-0">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSend();
                  }
                }}
                placeholder={t('placeholder')}
                disabled={isLoading}
                className="flex-1 bg-[#1a1a1a] border border-[rgba(37,199,96,0.3)] rounded-lg px-3 py-2 text-white text-sm outline-none focus:border-[#25C760] transition-colors duration-200 placeholder:text-gray-500 disabled:opacity-50"
              />
              <button
                onClick={handleSend}
                disabled={isLoading || !input.trim()}
                className="bg-gradient-to-r from-[#25C760] to-[#3C8063] text-white border-none rounded-lg px-4 py-2 text-sm font-semibold cursor-pointer hover:opacity-90 transition-opacity duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {t('send')}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
