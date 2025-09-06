import React, { useState } from 'react';
import { supabase } from './lib/supabase';
import './SignUp.css';

export default function SignUp({ onSuccess }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSignUp = async (e) => {
    e.preventDefault();
    setError('');
    const { error } = await supabase.auth.signUp({ email, password });
    if (error) {
      setError(error.message);
    } else {
      onSuccess();
    }
  };

  return (
    <div className="signup-container auth-wrapper">
      <div className="auth-card">
        <h1 className="signup-title auth-heading">アカウント作成・ログイン</h1>
        <form className="auth-form" onSubmit={handleSignUp}>
        <input
          className="auth-input"
          type="email"
          placeholder="メールアドレス"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
        <input
          className="auth-input"
          type="password"
          placeholder="パスワード"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
        <button className="auth-button" type="submit">
          登録
        </button>
      </form>
        {error && <p className="auth-error">{error}</p>}
      </div>
    </div>
  );
}
