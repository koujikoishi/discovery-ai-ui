// app/embed/page.tsx

'use client';

import { useEffect, useRef, useState } from 'react';
import ChatMessage from '@/components/ChatMessage';
import RelatedQuestions from '@/components/RelatedQuestions';
import ThinkingDots from '@/components/ThinkingDots';
import ChatHeader from '@/components/ChatHeader';
import { ChatMessageProps } from '@/components/types';
import { postChat } from '@/utils/postChat';
import ChatToggleButton from '@/components/ChatToggleButton';

export default function EmbedPage() {
  const [messages, setMessages] = useState<ChatMessageProps[]>([]);
  const [chatHistory, setChatHistory] = useState<ChatMessageProps[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [relatedQuestions, setRelatedQuestions] = useState<string[]>([]);
  const [isFirstVisit, setIsFirstVisit] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [team, setTeam] = useState('');
  const [purpose, setPurpose] = useState('');
  const [showThinkingDots, setShowThinkingDots] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
  const storedMessages = localStorage.getItem('chatMessages');
  const storedHistory = localStorage.getItem('chatHistory');
  const storedRelated = localStorage.getItem('relatedQuestions');
  const open = localStorage.getItem('isOpen');
  const t = localStorage.getItem('team');
  const p = localStorage.getItem('purpose');

  let parsedMessages: ChatMessageProps[] = [];
  let parsedHistory: ChatMessageProps[] = [];

  if (storedMessages) {
    try {
      parsedMessages = JSON.parse(storedMessages) as ChatMessageProps[];
      setMessages(parsedMessages);
    } catch {
      console.warn('⚠️ メッセージ復元に失敗');
    }
  }

  if (storedHistory) {
    try {
      parsedHistory = JSON.parse(storedHistory) as ChatMessageProps[];
      setChatHistory(parsedHistory);
    } catch {
      console.warn('⚠️ 履歴復元に失敗');
    }
  }

  if (parsedMessages.length > 0 || parsedHistory.length > 0) {
    setIsFirstVisit(false);
  }

  if (storedRelated) {
    try {
      const parsedRelated = JSON.parse(storedRelated) as string[];
      setRelatedQuestions(parsedRelated);
    } catch {
      console.warn('⚠️ 関連質問復元に失敗');
    }
  }

  if (t) setTeam(t);
  if (p) setPurpose(p);
  if (open === 'true') setIsOpen(true);
}, []);

  useEffect(() => {
    const shouldShow = isFirstVisit && isOpen && messages.length === 0;
    if (shouldShow) {
      setRelatedQuestions([
        'Discovery AIの料金を教えてください',
        'どうやって導入を始めればいいですか？',
        'どのプランが自分に合っていますか？',
      ]);
    }
  }, [isFirstVisit, isOpen, messages.length]);

  useEffect(() => {
    localStorage.setItem('chatMessages', JSON.stringify(messages));
  }, [messages]);

  useEffect(() => {
    localStorage.setItem('chatHistory', JSON.stringify(chatHistory));
  }, [chatHistory]);

  useEffect(() => {
    localStorage.setItem('isOpen', isOpen.toString());
  }, [isOpen]);

  useEffect(() => {
    localStorage.setItem('relatedQuestions', JSON.stringify(relatedQuestions));
  }, [relatedQuestions]);

const handleReset = () => {
  localStorage.removeItem('chatMessages');
  localStorage.removeItem('chatHistory');
  localStorage.removeItem('team');
  localStorage.removeItem('purpose');
  localStorage.removeItem('isOpen');
  localStorage.removeItem('relatedQuestions');

  localStorage.setItem('isFirstVisit', 'true');

  setTeam('');
  setPurpose('');
  setIsFirstVisit(true);
  setMessages([]);
  setChatHistory([]);
  setRelatedQuestions([]);

  // ✅ isOpen を false→true に一瞬だけ切り替えて、初回状態を正しく再描画
  setIsOpen(false);
  setTimeout(() => {
    setIsOpen(true);
  }, 0);
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
    setChatHistory(updatedHistory);
    setInput('');
    setRelatedQuestions([]);
    setShowThinkingDots(true);

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
        const newMessages = [...updatedMessages, botMessage];
        setMessages(newMessages);
        setChatHistory(data.updatedHistory || updatedHistory);
        setRelatedQuestions(data.relatedQuestions || []);
        setShowThinkingDots(false);
        setIsFirstVisit(false);
      }, 600);
    } catch (error) {
      console.error('送信エラー:', error);
      setShowThinkingDots(false);
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <>
      {isOpen && (
        <div className="fixed bottom-4 right-4 z-50 w-[calc(100%-2rem)] max-w-[420px]">
          <div className="flex flex-col w-full bg-black text-white rounded-[24px] shadow-[0_0_30px_rgba(0,0,0,0.5)] h-[calc(100vh-40px)] overflow-visible transition-all duration-500 ease-out animate-fadeInUp">
            <ChatHeader
              onReset={handleReset}
              onClose={() => setIsOpen(false)}
              resetButtonClassName="text-[13px]"
            />
            <div className="flex-1 px-4 pt-chat overflow-y-auto flex flex-col">
              {isFirstVisit && messages.length === 0 ? (
                <div className="pt-desktop px-4 flex flex-col items-center text-center">
                  <img
                    src="/boticon.svg"
                    alt="bot icon"
                    width={32}
                    height={32}
                    className="mb-5 animate-subtleBounce"
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
                  {showThinkingDots && <ThinkingDots />}
                  <div ref={messagesEndRef} className="mb-0" />
                </>
              )}
            </div>

            {relatedQuestions.length > 0 && (
              <div className="px-4 pt-2 pb-5 border-t border-[#3d4451] bg-black">
                <RelatedQuestions
                  questions={relatedQuestions.slice(0, 3)}
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
        </div>
      )}

      {!isOpen && <ChatToggleButton isOpen={isOpen} setIsOpen={setIsOpen} />}
    </>
  );
}
