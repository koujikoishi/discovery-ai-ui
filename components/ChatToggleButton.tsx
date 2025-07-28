// 最終更新: 2025-07-25 17:07

'use client';

import { useEffect, useState } from 'react';

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

  if (!mounted) return null;

  return (
    <button
      onClick={() => setIsOpen(!isOpen)}
      className="fixed bottom-4 right-4 z-50 bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-500 transition"
    >
      {isOpen ? '×' : '💬'}
    </button>
  );
}
