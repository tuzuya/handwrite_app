import React, { useEffect, useState } from 'react';
import { supabase } from './lib/supabase';
import Card from './Card'; // 投稿表示用コンポーネント
import './Wholescreen.css';
import Header from './Header';
import NewCard from './NewCard';

const Wholescreen = ({ onNewCard, posts, fetchPosts }) => {

  return (
    <div className="wholescreen-bg">
      <h1>ホーム画面</h1>
      <button className="fab" onClick={onNewCard}>＋</button>
      <button onClick={fetchPosts}>再読み込み</button>
      {posts.map(post => (
        <Card
          key={post.id}
          description={post.description}
          shape={post.shape || "circle"}
          color={post.color || "#222"}
          thickness={post.thickness || 2}
        />
      ))}
    </div>
  );
};

export default Wholescreen;