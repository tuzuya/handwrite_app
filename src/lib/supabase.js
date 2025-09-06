import { createClient } from '@supabase/supabase-js'

   const supabaseUrl = 'https://zfwprzfqdcvmnwqmdvdj.supabase.co'  // 先ほど控えたProject URLを貼り付け
   const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inpmd3ByemZxZGN2bW53cW1kdmRqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTY5NzYwMTYsImV4cCI6MjA3MjU1MjAxNn0.F-1FUs0dBKjjU8dfWgToXiH1FBFL37PLs42LjyW7zH4'  // 先ほど控えたanon public keyを貼り付け

export const supabase = createClient(supabaseUrl, supabaseAnonKey)