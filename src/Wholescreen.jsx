import React, { useEffect, useState } from 'react';
import { supabase } from './lib/supabase';
import Card from './Card'; // 投稿表示用コンポーネント
import './Wholescreen.css';
import Header from './Header';
import NewCard from './NewCard';

const CARD_SIZE = 200;        // カード1枚の幅・高さ(px)

const Wholescreen = ({ onNewCard, posts, fetchPosts }) => {
  //画面サイズを取得
  const areaWidth = window.innerWidth;
  const areaHeight = window.innerHeight;

  //各カードにランダムな位置を割り当て
  const getRandomPosition = () => {
    const maxLeft = areaWidth - CARD_SIZE;
    const maxTop = areaHeight - CARD_SIZE;
    return {
      left: Math.random() * maxLeft,
      top: Math.random() * maxTop,
    };
  };

  // カードごとにランダム位置を生成
  const cardPositions = posts.map(() => getRandomPosition());

  return (
    <div 
      className="wholescreen-bg"
      style={{
        position: 'relative',
        width: '100vw',
        height: '100vh',
        background: '#f9f9f9',
        margin: 0,
        overflow: 'hidden',
      }}
    >
      <h1>みんなのtuduri</h1>
      <button className="fab" onClick={onNewCard} style={{ position: 'absolute', top: 10, right: 10, zIndex: 10 }}>＋</button>
      <button className="load-button" onClick={fetchPosts}>再読み込み</button>
      {posts.map((post, idx) => {
        const pos = cardPositions[idx];
        return (
        <div
          key={post.id}
          style={{
            position: 'absolute',
            left: pos.left,
            top: pos.top,
          }}
        >
          <Card
            key={post.id}
            description={post.description}
            shape={post.shape}
            color={post.color}
            thickness={post.thickness}
          />
        </div>
      );
    })}
    </div>
  );
};

export default Wholescreen;