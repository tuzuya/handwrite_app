import React from 'react';
import './Wholescreen.css';
import Header from './Header';
import NewCard from './NewCard';

const Wholescreen = ({ onNewCard}) => {
  return (
    <div className="wholescreen-bg">
      <h1>ホーム画面</h1>
      {/* 他のホーム画面要素をここに追加 */}
      <button className="fab" onClick={onNewCard}>＋</button>
    </div>
  );
};

export default Wholescreen;