import React, { useState, useEffect } from 'react';
import Splash from './Splash';
import Card from "./Card";
import Wholescreen from './Wholescreen';
import Header from './Header';
import NewCard from './NewCard';
import SignUp from './SignUp';
import Login from './Login';
import MyPage from './Mypage';
import Karidata from './karidata';
import { supabase } from './lib/supabase';

const App = () => {
  const [showMain, setShowMain] = useState(false);
  const [showNewCard, setShowNewCard] = useState(false);
  const [posts, setPosts] = useState([]);
  const [step, setStep] = useState("signup"); // サインアップのステップ管理

  // 投稿一覧取得関数をApp2.jsxにまとめる
  const fetchPosts = async () => {
    const { data, error } = await supabase
      .from('posts')
      .select('*')
      .order('created_at', { ascending: false });
    if (!error) setPosts(data);
  };

  useEffect(() => {
    fetchPosts();
    const fetchUser = async () => {
    const { data } = await supabase.auth.getUser();
    console.log('ユーザーID:', data?.user?.id);
    // 必要ならメールアドレスも
    console.log('メール:', data?.user?.email);
    };
    fetchUser();
  }, []);


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
  if (step === 'mypage') return (
    <MyPage onBack={() => setStep('wholescreen')} />
  );
  
  const handleAccountClick = () => {
  //マイページ遷移（別URLに遷移）
    setStep('mypage');
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
    return <NewCard onBack={() => setShowNewCard(false)} onPostComplete={fetchPosts} />;
  }

  return (
    <>
      <Header onAccountClick={handleAccountClick} />
      {showMain ? (<Wholescreen 
        onNewCard={() => setShowNewCard(true)} 
        posts={posts}
        fetchPosts={fetchPosts}
        />
        ) : <Splash onFinish={() => setShowMain(true)} />}
    </>
  );
};

export default App;