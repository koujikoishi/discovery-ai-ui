import { ChatMessageProps } from '@/components/types';

// 環境変数からAPIベースURLを選択（スマホIPとPCで切り替え）
const baseUrl =
  typeof window !== 'undefined' && window.location.hostname === '192.168.3.8'// KoujiKoishi
    ? process.env.NEXT_PUBLIC_API_MOBILE_URL
    : process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:4000';

export async function postChat(
  message: string,
  history: ChatMessageProps[],
  team: string,
  purpose: string
) {
  const res = await fetch(`${baseUrl}/api/chat`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({ message, history, team, purpose }),
  });

  if (!res.ok) {
    throw new Error(`APIエラー: ${res.statusText}`);
  }

  const result = await res.json();
  return result;
}
