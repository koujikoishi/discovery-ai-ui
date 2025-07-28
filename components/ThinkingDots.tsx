'use client';

export default function ThinkingDots() {
  return (
    <div className="flex gap-1 px-4 py-2 animate-pulse text-yellow-300 text-sm">
      <div className="w-2 h-2 bg-yellow-300 rounded-full animate-bounce [animation-delay:0s]" />
      <div className="w-2 h-2 bg-yellow-400 rounded-full animate-bounce [animation-delay:0.2s]" />
      <div className="w-2 h-2 bg-yellow-500 rounded-full animate-bounce [animation-delay:0.4s]" />
    </div>
  );
}
