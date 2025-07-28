'use client';

import { useEffect, useState } from 'react';

type Props = {
  questions: string[];
  onSelect: (question: string) => void;
  isFirstVisit?: boolean;
};

export default function RelatedQuestions({ questions, onSelect, isFirstVisit }: Props) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 50);
    return () => clearTimeout(timer);
  }, []);

  if (!questions || questions.length === 0) return null;

  return (
    <div className="w-full">
      <div className="text-sm text-neutral-400 mb-2">
        {isFirstVisit ? 'よくあるご質問' : '関連したご質問'}
      </div>
      <div className="flex flex-wrap gap-[8px]">
        {questions.map((q, i) => (
          <button
            key={i}
            onClick={() => onSelect(q)} // ✅ 修正済み：handleSend → onSelect
            className={`text-sm px-3 py-[5px] rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-200 leading-tight transition-all duration-300 ease-out transform text-left ${
              mounted ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0'
            }`}
            style={{ transitionDelay: `${i * 40}ms` }}
          >
            {q}
          </button>
        ))}
      </div>
    </div>
  );
}
