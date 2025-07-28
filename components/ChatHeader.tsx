type ChatHeaderProps = {
  onReset: () => void;
  resetButtonClassName?: string;
};

export default function ChatHeader({ onReset, resetButtonClassName = '' }: ChatHeaderProps) {
  return (
    <div className="flex justify-between items-center px-4 py-3 border-b border-gray-700">
      <h2 className="text-mm font-semibold text-white">Discovery AI Support</h2>
      <button
        onClick={onReset}
        className={`text-white text-xs hover:text-gray-300 transition ${resetButtonClassName}`}
      >
        🗑️ 会話をリセット
      </button>
    </div>
  );
}
