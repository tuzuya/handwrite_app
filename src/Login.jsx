import React, { useState } from 'react';
import { supabase } from './lib/supabase';

export default function Login({ onSuccess }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      setError(error.message);
    } else {
      onSuccess();
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl mb-4">ログイン</h1>
      <form className="flex flex-col gap-2 w-72" onSubmit={handleLogin}>
        <input
          className="border p-2 rounded"
          type="email"
          placeholder="メールアドレス"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
        <input
          className="border p-2 rounded"
          type="password"
          placeholder="パスワード"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
        <button className="bg-blue-600 text-white rounded py-2" type="submit">
          ログイン
        </button>
        {error && <p className="text-red-600">{error}</p>}
      </form>
    </div>
  );
}