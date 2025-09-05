import React, { useState } from 'react';
import Splash from './Splash';


const App = () => {
  const [showMain, setShowMain] = useState(false);

  return (
    <>
      {showMain ? <p>タイトル</p> : <Splash onFinish={() => setShowMain(true)} />}
    </>
  );
};

export default App;