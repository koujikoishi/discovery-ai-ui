export type ChatMessageProps = {
  role: 'user' | 'assistant';
  content: string | { answer: string };
};
