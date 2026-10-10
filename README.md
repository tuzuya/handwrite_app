# つづり（tuduri）

手書きやテキストのメッセージを付箋にして投稿し、みんなの付箋を一覧で眺められる Web アプリ。
ハッカソン「しばよこ SummerHackathon2025」で、チーム「みかん団」が開発しました。

> **ハッカソン期間中に作ったプロトタイプです。** 一部の機能は画面だけで、データの保存まではつながっていません（下記「実装の状況」）。

## ハッカソンについて

| 項目 | 内容 |
|---|---|
| イベント | しばよこ SummerHackathon2025 <!-- TODO: 要確認 主催・規模の説明を足すか --> |
| 開発期間 | 2025年9月（主な開発は 9/4〜9/7） |
| チーム | みかん団 <!-- TODO: 要確認 人数・構成（エンジニア / デザイナー） --> |
| テーマ | <!-- TODO: 要確認 ハッカソンのテーマ --> |

<!-- TODO: 要確認 アプリのコンセプト（なぜ「手書きの付箋」なのか、誰に使ってほしいか） -->

## 主な機能

- **会員登録・ログイン**: メールアドレスとパスワード（Supabase Auth）
- **付箋の作成**: 手書き（キャンバスに指やペンで描く）またはテキストで書き、付箋の形（丸・ハート・四角・星）、ペンの色、線の太さを選んで投稿
- **みんなの付箋**: 投稿された付箋を一覧で表示

### 実装の状況

| 機能 | 状態 |
|---|---|
| 会員登録・ログイン、付箋の作成と保存、一覧表示 | Supabase とつながって動作する |
| 付箋の詳細表示・いいね・コメント | 画面のみ。データはダミー（`src/api/noteApi.js`） |
| マイページ（自分の投稿・いいねした投稿） | 画面の部品はあるが、画面遷移がつながっていない |

ハッカソン中の試作ファイル（`App2.jsx`、`StickyNoteViewer.jsx`、Spring Boot での API を想定した `StickyNoteController.java` など）がそのまま残っています。現在の入口は `src/main.jsx` → `src/App3.jsx` です。

## 技術構成

| 領域 | 技術 |
|---|---|
| フロントエンド | React、Vite、JavaScript |
| 手書き入力 | react-signature-canvas |
| 認証・DB・画像 | Supabase（Auth / PostgreSQL / Storage） |

```
ブラウザ（React）
  ├─ 手書きの付箋 ─ キャンバスを PNG にして Storage（handwriting-images）へ保存
  └─ 投稿データ  ─ posts テーブルへ保存（形・色・太さ・画像のパス・本文）
```

API サーバーは持たず、画面から Supabase を直接呼び出す構成です。

## 開発環境の構築

前提: Node.js 20 以上、Supabase プロジェクト

```bash
npm install
cp .env.example .env   # Supabase の URL と anon key を設定する
npm run dev            # http://localhost:5173
```

| 環境変数 | 用途 |
|---|---|
| `VITE_SUPABASE_URL` | Supabase の Project URL |
| `VITE_SUPABASE_ANON_KEY` | Supabase の anon public key |

`posts` テーブルと `handwriting-images` バケットの定義はリポジトリに含まれていないため、Supabase のダッシュボードで用意する必要があります。
