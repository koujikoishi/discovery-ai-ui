'use client';

import React from 'react';
import ReactMarkdown from 'react-markdown';
import Image from 'next/image';
import { ChatMessageProps } from './types';

const extractDisplayText = (content: ChatMessageProps['content']): string | null => {
  if (typeof content === 'string') {
    const trimmed = content.trim();
    return trimmed.length > 0 ? trimmed : null;
  }
  if (typeof content === 'object') {
    if ('answer' in content && typeof content.answer === 'string') {
      const trimmed = content.answer.trim();
      return trimmed.length > 0 ? trimmed : null;
    }
    if (Object.keys(content).length === 0) {
      return null;
    }
  }
  return null;
};

interface Props extends ChatMessageProps {
  isLatest?: boolean;
}

const ChatMessage: React.FC<Props> = ({ role, content, isLatest }) => {
  const isBot = role === 'assistant';
  const displayContent = extractDisplayText(content);

  return (
    <div className={`flex items-start gap-2 mb-3 ${isBot ? '' : 'justify-end'}`}>
      {isBot && (
        <Image
          src="/boticon.svg"
          alt="Bot icon"
          width={20}
          height={20}
          className="w-5 h-5 mr-2"
        />
      )}

      <div
        className={`px-4 py-2 rounded-lg text-sm max-w-[80%] whitespace-pre-wrap transition-all duration-300 ease-out ${
          isBot
            ? `bg-neutral-800 text-white ${isLatest ? 'animate-fadeInUp' : ''}`
            : 'bg-blue-600 text-white'
        }`}
      >
        {displayContent &&
          (isBot ? (
            <ReactMarkdown
              components={{
                h1: ({ children }) => (
                  <h1 className="text-base font-bold mt-1 mb-2">{children}</h1>
                ),
                h2: ({ children }) => (
                  <h2 className="text-base font-semibold mt-1 mb-2">{children}</h2>
                ),
                h3: ({ children }) => (
                  <h3 className="text-sm font-medium mt-1 mb-1">{children}</h3>
                ),
                p: ({ children }) => (
                  <p className="mb-0 leading-snug">{children}</p>
                ),
                ul: ({ children }) => (
                  <ul className="list-disc pl-5 mt-[-20px] mb-0">{children}</ul>
                ),
                li: ({ children }) => (
                  <li className="leading-snug mt-[-10px] [&>*:first-child]:mb-[-10px]">
                    {children}
                  </li>
                ),
                blockquote: ({ children }) => (
                  <blockquote className="border-l-4 border-gray-500 pl-3 italic text-gray-400 my-1">
                    {children}
                  </blockquote>
                ),
                code: ({ className, children }) =>
                  typeof children === 'string' ? (
                    <code className="bg-gray-700 text-white px-1 py-0.5 rounded text-sm">
                      {children}
                    </code>
                  ) : (
                    <>{children}</>
                  ),
                table: ({ children }) => (
                  <div className="overflow-x-auto my-2">
                    <table className="table-auto border-collapse border border-gray-600 text-sm">
                      {children}
                    </table>
                  </div>
                ),
                thead: ({ children }) => (
                  <thead className="bg-gray-800 text-white">{children}</thead>
                ),
                tbody: ({ children }) => <tbody>{children}</tbody>,
                tr: ({ children }) => (
                  <tr className="border-b border-gray-600">{children}</tr>
                ),
                th: ({ children }) => (
                  <th className="border border-gray-600 px-3 py-1 text-left font-medium">
                    {children}
                  </th>
                ),
                td: ({ children }) => (
                  <td className="border border-gray-600 px-3 py-1">{children}</td>
                ),
                a: ({ children, ...props }) => (
                  <a
                    {...props}
                    className="inline-flex items-center gap-1 text-blue-400 underline hover:text-blue-300 transition"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    🔗{children}
                  </a>
                ),
              }}
            >
              {displayContent}
            </ReactMarkdown>
          ) : (
            <div>{displayContent}</div>
          ))}
      </div>
    </div>
  );
};

export default ChatMessage;
