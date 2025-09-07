import React, { useState } from 'react';
import Splash from './Splash';
import Card from "./Card";
import Wholescreen from './Wholescreen';
import Header from './Header';
import NewCard from './NewCard';
import SignUp from './SignUp';
import StickyNoteViewer2 from './StickyNoteViewer2'; 

const App3 = () => {
  const [showMain, setShowMain] = useState(false);
  const [showNewCard, setShowNewCard] = useState(false);
  const [step, setStep] = useState("signup");
  const [showViewer, setShowViewer] = useState(false); // ← 追加: Viewer表示状態

  const handleAccountClick = () => {
    window.location.href = '/mypage';
  };

  const handleSignUpSuccess = () => {
    setStep('splash');
    setTimeout(() => setStep('wholescreen'), 2000);
  };

  // サインアップフロー
  if (step === 'signup') return <SignUp onSuccess={handleSignUpSuccess} />;
  if (step === 'splash') return <Splash />;

  // スプラッシュ
  if (!showMain) {
    return <Splash onFinish={() => setShowMain(true)} />;
  }

  // 新規カード作成
  if (showNewCard) {
    return <NewCard onBack={() => setShowNewCard(false)} />;
  }

  // StickyNoteViewer2 を表示する画面
  if (showViewer) {
    return (
      <>
        <Header onAccountClick={handleAccountClick} />
        <StickyNoteViewer2 />
        <button onClick={() => setShowViewer(false)}>戻る</button>
      </>
    );
  }

  // 通常メイン画面
  return (
    <>
      <Header onAccountClick={handleAccountClick} />
      <Wholescreen onNewCard={() => setShowNewCard(true)} />
      <Card
        title="React Card"
        image="https://via.placeholder.com/300x200"
        description="This is a customizable card component."
        buttonText="Learn More"
      />
      <button onClick={() => setShowViewer(true)}>付箋ビューへ</button> {/* ← 遷移ボタン */}
    </>
  );
};

export default App3;
