import { ChatMessageProps } from '@/components/types';

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:4000';

export async function postChat(
  message: string,
  history: ChatMessageProps[],
  team: string,
  purpose: string
) {
  const res = await fetch(`${baseUrl}/api/chat`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include', // ← ここを追加
    body: JSON.stringify({ message, history, team, purpose }),
  });

  if (!res.ok) {
    throw new Error(`APIエラー: ${res.statusText}`);
  }

  const result = await res.json();
  return result;
}
