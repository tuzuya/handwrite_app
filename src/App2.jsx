import React, { useState } from 'react';
import Splash from './Splash';
import Card from "./Card";
import Wholescreen from './Wholescreen';
import Header from './Header';
import NewCard from './NewCard';
import SignUp from './SignUp';
import Login from './Login';

const App = () => {
  const [showMain, setShowMain] = useState(false);
  const [showNewCard, setShowNewCard] = useState(false);
  const [step, setStep] = useState("signup"); // サインアップのステップ管理

  //ログインまたはサインアップ成功時
  const handleAuthSuccess = () => {
    setStep('splash');
    setTimeout(() => setStep('wholescreen'), 2000);
  };
  
  if (step === 'login') return (
    <>
      <Login onSuccess={handleAuthSuccess} />
      <p className="text-center mt-4">
        アカウントをお持ちでない方は{" "}
        <button className="underline text-blue-600" onClick={() => setStep('signup')}>
          新規登録
        </button>
      </p>
    </>
  );
  if (step === 'signup') return (
    <>
      <SignUp onSuccess={handleAuthSuccess} />
      <p className="text-center mt-4">
        既にアカウントをお持ちの方は{" "}
        <button className="underline text-blue-600" onClick={() => setStep('login')}>
          ログイン
        </button>
      </p>
    </>
  );
  
  const handleAccountClick = () => {
    // 仮のマイページ遷移（例: 別URLに遷移）
    window.location.href = '/mypage'; // 後でcolabolateerがこのパスにページを作る想定
  };

  //サインアップ成功時にロゴ画面に遷移させるための関数
  const handleSignUpSuccess = () => {
    setStep('splash');
    setTimeout(() => setStep('wholescreen'), 2000); // 2秒後にwholescreenへ
  };
  if (step === 'signup') return <SignUp onSuccess={handleSignUpSuccess} />;
  if (step === 'splash') return <Splash />;

  // メイン画面の表示
  if (!showMain) {
    return <Splash onFinish={() => setShowMain(true)} />;
  }
  // 新規カード作成画面の表示
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