'use client';

import { useState } from 'react';

type Props = {
  input: string;
  setInput: (val: string) => void;
  onSubmit: () => void;
  disabled: boolean;
};

export default function ChatInput({ input, setInput, onSubmit, disabled }: Props) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="p-4 border-t border-gray-800 bg-[#1b1b1b] rounded-b-[24px]">
      <div className="bg-[#2c2c2c] rounded-[24px] flex items-center px-4 h-20">
        <textarea
          rows={1}
          className="flex-1 resize-none bg-transparent text-white focus:outline-none text-sm leading-tight placeholder-gray-400 pt-2 pb-10 max-h-[120px] overflow-y-auto"
          placeholder="メッセージを入力..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
        <button
          className={`ml-2 w-12 h-12 flex items-center justify-center rounded-full text-white text-xl transition-colors ${
            disabled
              ? 'bg-gray-600 cursor-not-allowed'
              : 'bg-blue-500 hover:bg-blue-600'
          }`}
          onClick={onSubmit}
          disabled={disabled}
        >
          ↑
        </button>
      </div>
    </div>
  );
}
