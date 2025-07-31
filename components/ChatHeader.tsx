// components/ChatHeader.tsx

import { X } from 'lucide-react'; // ← 追加

type ChatHeaderProps = {
  onReset: () => void;
  onClose: () => void;
  resetButtonClassName?: string;
};

export default function ChatHeader({
  onReset,
  onClose,
  resetButtonClassName = '',
}: ChatHeaderProps) {
  return (
     <div className="sticky top-0 z-50 flex justify-between items-center px-4 py-2 border-b border-gray-700">
      <h2 className="text-base font-semibold text-white">Discovery AI Support</h2>
      <div className="flex items-center space-x-5">
        <button
          onClick={onReset}
          className={`text-white text-xs hover:text-gray-300 transition ${resetButtonClassName}`}
        >
          🗑️ 会話をリセット
        </button>
        <button
          onClick={onClose}
          className="text-white text-3xl hover:text-gray-300 transition"
          aria-label="Close"
        >
            <X className="w-7 h-7" /> {/* ← 細くてスマートなバツ */}
        </button>
      </div>
    </div>
  );
}
