'use client';

import { useEffect, useRef, useState } from 'react';
import ChatMessage from '@/components/ChatMessage';
import RelatedQuestions from '@/components/RelatedQuestions';
import ThinkingDots from '@/components/ThinkingDots';
import ChatHeader from '@/components/ChatHeader';
import { ChatMessageProps } from '@/components/types';
import { ChevronDown, CircleHelp } from 'lucide-react';
import { postChat } from '@/utils/postChat';

export default function EmbedPage() {
  const [messages, setMessages] = useState<ChatMessageProps[]>([]);
  const [chatHistory, setChatHistory] = useState<ChatMessageProps[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [relatedQuestions, setRelatedQuestions] = useState<string[]>([]);
  const [isFirstVisit, setIsFirstVisit] = useState(true);
  const [isOpen, setIsOpen] = useState(true);
  const [team, setTeam] = useState('');
  const [purpose, setPurpose] = useState('');

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const stored = localStorage.getItem('chatMessages');
    if (stored) {
      try {
        const parsed = JSON.parse(stored) as ChatMessageProps[];
        setMessages(parsed);
        setChatHistory(parsed);
        setIsFirstVisit(false);
      } catch {}
    }
    const t = localStorage.getItem('team');
    const p = localStorage.getItem('purpose');
    if (t) setTeam(t);
    if (p) setPurpose(p);
  }, []);

  useEffect(() => {
    localStorage.setItem('chatMessages', JSON.stringify(messages));
  }, [messages]);

  useEffect(() => {
    if (isFirstVisit) {
      const welcome: ChatMessageProps = {
        role: 'assistant',
        content: 'こんにちは。何かお手伝いできることはありますか？',
      };
      setMessages([welcome]);
      setChatHistory([welcome]);
      setRelatedQuestions([
        'Discovery AIの料金を教えてください',
        'どうやって導入を始めればいいですか？',
        'どのプランが自分に合っていますか？',
      ]);
    }
  }, [isFirstVisit]);

  const handleReset = () => {
    const welcome: ChatMessageProps = {
      role: 'assistant',
      content: 'こんにちは。何かお手伝いできることはありますか？',
    };
    setMessages([welcome]);
    setChatHistory([welcome]);
    setRelatedQuestions([
      'Discovery AIの料金を教えてください',
      'どうやって導入を始めればいいですか？',
      'どのプランが自分に合っていますか？',
    ]);
    setIsFirstVisit(true);
    localStorage.removeItem('chatMessages');
    localStorage.removeItem('team');
    localStorage.removeItem('purpose');
    setTeam('');
    setPurpose('');
  };

  const handleSend = async (message?: string) => {
    const userMessage = (message || input).trim();
    if (!userMessage) return;

    const newMessage: ChatMessageProps = {
      role: 'user',
      content: userMessage,
    };
    const updatedMessages = [...messages, newMessage];
    const updatedHistory = [...chatHistory, newMessage];

    setMessages(updatedMessages);
    setInput('');
    setIsLoading(true);
    setRelatedQuestions([]);

    try {
      const data = await postChat(userMessage, updatedHistory, team, purpose);
      console.log('🧪 API応答:', data);

      const botMessage: ChatMessageProps = {
        role: 'assistant',
        content: data.reply,
      };

      if (data.team) {
        setTeam(data.team);
        localStorage.setItem('team', data.team);
      }
      if (data.purpose) {
        setPurpose(data.purpose);
        localStorage.setItem('purpose', data.purpose);
      }

      setTimeout(() => {
        setMessages((prev) => [...prev, botMessage]);
        setChatHistory(data.updatedHistory || []);
        setRelatedQuestions(data.relatedQuestions || []);
        setIsLoading(false);
        setIsFirstVisit(false);
      }, 600);
    } catch (error) {
      console.error('送信エラー:', error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="fixed bottom-6 right-6 z-50 w-full max-w-[420px]">
      {isOpen && (
        <div className="flex flex-col w-full bg-black text-white rounded-[24px] shadow-[0_0_30px_rgba(0,0,0,0.5)] h-[calc(100vh-90px)] overflow-hidden">
          <ChatHeader onReset={handleReset} resetButtonClassName="text-[13px]" />
          <div className="flex-1 px-4 pt-10 overflow-y-auto flex flex-col">
            {isFirstVisit && messages.length === 1 ? (
              <div className="flex flex-col items-center justify-center flex-grow pt-[15vh] pb-10 min-h-[300px]">
                <img
                  src="/boticon.svg"
                  alt="bot icon"
                  width={32}
                  height={32}
                  className={`mb-5 ${isFirstVisit ? 'animate-bounce-wiggle' : ''}`}
                />
                <p className="text-2xl font-bold mb-2">こんにちは。</p>
                <p className="text-base text-gray-400 mb-6">
                  何かお手伝いできることはありますか？
                </p>
              </div>
            ) : (
              <>
                {messages.map((msg, index) => (
                  <div key={index} className="mb-4">
                    <ChatMessage role={msg.role} content={msg.content} />
                  </div>
                ))}
                {isLoading && <ThinkingDots />}
                <div ref={messagesEndRef} className="mb-0" />
              </>
            )}
          </div>

          {relatedQuestions.length > 0 && (
            <div className="px-4 pt-2 pb-5 border-t border-[#3d4451] bg-black">
              <RelatedQuestions
                questions={relatedQuestions}
                onSelect={(q) => handleSend(q)}
                isFirstVisit={isFirstVisit}
              />
            </div>
          )}

          <div className="p-4 border-t border-gray-800 bg-[#1b1b1b] rounded-b-[24px]">
            <div className="bg-[#2c2c2c] rounded-[24px] flex items-center px-4 h-20">
              <textarea
                rows={1}
                className="flex-1 resize-none bg-transparent text-white focus:outline-none text-sm leading-tight placeholder-gray-400 pt-2 pb-10 max-h-[120px] overflow-y-auto"
                placeholder="メッセージを入力..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (!e.nativeEvent.isComposing && e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSend();
                  }
                }}
              />
              <button
                onClick={() => handleSend()}
                disabled={input.trim() === ''}
                className={`ml-2 w-12 h-12 flex items-center justify-center rounded-full text-white text-xl transition-colors ${
                  input.trim() === ''
                    ? 'bg-gray-600 cursor-not-allowed'
                    : 'bg-blue-600 hover:bg-blue-700'
                }`}
              >
                ↑
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="mt-2 flex justify-end">
        {isOpen ? (
          <button
            onClick={() => setIsOpen(false)}
            className="w-12 h-12 rounded-full bg-black text-white flex items-center justify-center shadow-md"
            aria-label="Close Chat"
          >
            <ChevronDown className="w-6 h-6 hover:scale-125 transition-transform duration-200" />
          </button>
        ) : (
          <button
            onClick={() => setIsOpen(true)}
            className="w-12 h-12 rounded-full bg-black text-white flex items-center justify-center shadow-md"
            aria-label="Open Chat"
          >
            <CircleHelp className="w-6 h-6 hover:scale-125 transition-transform duration-200" />
          </button>
        )}
      </div>
    </div>
  );
}
