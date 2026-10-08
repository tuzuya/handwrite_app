import { createClient } from '@supabase/supabase-js'

// 接続先は環境変数から読む（.env.example をコピーして .env を作る）。
// anon key はブラウザに配る前提の公開キーなので VITE_ で公開してよい。データの保護は Supabase 側の RLS が担う
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('VITE_SUPABASE_URL と VITE_SUPABASE_ANON_KEY を .env に設定してください')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
