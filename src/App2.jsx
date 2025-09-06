import React, { useState } from 'react';
import Splash from './Splash';
import Card from "./Card";
import Wholescreen from './Wholescreen';
import Header from './Header';
import NewCard from './NewCard';

const App = () => {
  const [showMain, setShowMain] = useState(false);
  const [showNewCard, setShowNewCard] = useState(false);

  const handleAccountClick = () => {
    // 仮のマイページ遷移（例: 別URLに遷移）
    window.location.href = '/mypage'; // 後でcolabolateerがこのパスにページを作る想定
  };

  if (!showMain) {
    return <Splash onFinish={() => setShowMain(true)} />;
  }

  if (showNewCard) {
    return <NewCard onBack={() => setShowNewCard(false)} />;
  }

  return (
    <>
      <Header onAccountClick={handleAccountClick} />
      {showMain ? (<Wholescreen onNewCard={() => setShowNewCard(true)} />) : <Splash onFinish={() => setShowMain(true)} />}
      <Card
        title="React Card"
        image="https://via.placeholder.com/300x200"
        description="This is a customizable card component."
        buttonText="Learn More"
      />
    </>
  );
};

export default App;