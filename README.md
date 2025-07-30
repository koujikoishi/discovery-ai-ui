# Discovery AI UI

このプロジェクトは、Discovery AI チャットボットの **フロントエンド** です。  
Next.js + Tailwind CSS により、洗練されたチャットUIを提供し、Vercel経由でLPなどにiframe埋め込み可能です。

---

## ⚙️ 技術スタック

- **Next.js**（App Router）
- **Tailwind CSS**（スタイリング）
- **TypeScript**
- **Lucide React**（アイコン）
- **shadcn/ui**（UIコンポーネント）
- **Vercel**（ホスティング）

---

## 📁 ディレクトリ構成（主な構成）

discovery-ai-ui/
├── app/embed/page.tsx // 埋め込みチャット画面（主要UI）
├── components/ // 各種コンポーネント
│ ├── ChatMessage.tsx // 吹き出し表示
│ ├── RelatedQuestions.tsx // 関連質問のボタン表示
│ ├── ThinkingDots.tsx // ...表示
│ ├── ChatHeader.tsx // ヘッダーUI
│ └── ChatToggleButton.tsx // チャット開閉ボタン
├── utils/ // API呼び出し・型定義
│ ├── postChat.ts // バックエンドへのPOST処理
│ └── types.ts // ChatMessage型など
├── public/ // 画像やアイコンなど
├── styles/ // Tailwind関連（必要に応じて）
└── README.md // このファイル

yaml
コピーする
編集する

---

## 🚀 開発サーバーの起動方法

```bash
# パッケージインストール
npm install

# 開発サーバー起動
npm run dev
ブラウザで http://localhost:3000 を開くとチャットUIが確認できます。
開閉ボタン・関連質問・Markdown表示・ThinkingDots・セッション保持などが動作します。

📦 機能ハイライト
✔️ 中央表示のウェルカムメッセージ

✔️ 吹き出し型チャットUI（黒ベース・Canva風）

✔️ 関連質問ボタンの表示

✔️ 入力時のアイコンアニメーション（ThinkingDots）

✔️ チャット開閉ボタン（右下固定）

✔️ localStorageによるセッション保持

✔️ Markdown対応の回答整形

✔️ iframe埋め込みに最適化された表示設計

🌐 Vercelデプロイ手順
このプロジェクトは GitHub連携されたVercelでホスト可能です。

bash
コピーする
編集する
# 一連の更新手順
git add .
git commit -m "docs: フロントエンドREADME更新"
git push
Vercelが自動でデプロイし、URLが更新されます。
例：https://discovery-ai-support.vercel.app/

🧪 APIエンドポイント
チャットは以下のバックエンドAPIにリクエストを送信しています。

bash
コピーする
編集する
POST /api/chat
Content-Type: application/json

{
  "message": "料金プランを教えて",
  "history": [...],
  "team": "3",
  "purpose": "社内ポータルに導入"
}
バックエンドは discovery-ai-api プロジェクトをご確認ください。

📌 備考・補足
このUIは iframe でLPや外部サービスに簡単に埋め込みできます。

Safari対応・レスポンシブ調整・シャドウや文字サイズも調整済みです。

初期表示状態やアニメーションなど、見た目の演出にもこだわっています。