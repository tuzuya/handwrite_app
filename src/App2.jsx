import React, { useState, useEffect } from 'react';
import StartPage from './StartPage';
import MainPage from './MainPage';

function App() {
  const [showMain, setShowMain] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowMain(true);
    }, 3000); // 3秒後に遷移

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {showMain ? <MainPage /> : <StartPage />}
    </>
  );
}

export default App;