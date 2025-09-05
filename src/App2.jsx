import React, { useState } from 'react';
import Splash from './Splash';
import Card from "./Card";


const App = () => {
  const [showMain, setShowMain] = useState(false);

  return (
    <>
      {showMain ? <p>タイトル</p> : <Splash onFinish={() => setShowMain(true)} />}
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