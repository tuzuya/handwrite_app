import React, { useState } from 'react';
import Splash from './Splash';
import Card from "./Card";

const App = () => {
  const [showMain, setShowMain] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowMain(true);
    }, 3000); // 3秒後に遷移

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {showMain ? <p>タイトル</p> : <MainPage /> : <StartPage /> : <Splash onFinish={() => setShowMain(true)} />}
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