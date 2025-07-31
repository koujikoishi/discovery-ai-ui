// 最終更新: 2025-07-31（ホバーでツールチップ表示）

'use client';

import { useEffect, useState } from 'react';
import { CircleHelp } from 'lucide-react';

type Props = {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
};

export default function ChatToggleButton({ isOpen, setIsOpen }: Props) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 100);
    return () => clearTimeout(timer);
  }, []);

  if (!mounted || isOpen) return null;

  return (
    <div className="fixed bottom-6 right-1 z-50 flex flex-col items-center group">
      {/* ツールチップ（ホバー時表示） */}
      <div className="mb-2 px-3 py-1 bg-gray-800 text-white text-sm rounded shadow-md opacity-0 group-hover:opacity-100 transition-opacity">
        Chat with us
      </div>

      <button
        onClick={() => setIsOpen(true)}
        className="w-14 h-14 rounded-full bg-black text-white flex items-center justify-center shadow-md"
        aria-label="Open Chat"
      >
        <CircleHelp className="w-8 h-8 hover:scale-125 transition-transform duration-200" />
      </button>
    </div>
  );
}
