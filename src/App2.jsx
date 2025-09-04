import React, { useState } from 'react';
import Splash from './Splash';
import Main from './Main';

const App = () => {
  const [showMain, setShowMain] = useState(false);

  return (
    <>
      {showMain ? <Main /> : <Splash onFinish={() => setShowMain(true)} />}
    </>
  );
};

export default App;