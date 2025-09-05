import React, { useState } from 'react';
import Splash from './Splash';
import Card from "./Card";
import Wholescreen from './Wholescreen';

const App = () => {
  const [showMain, setShowMain] = useState(false);

  return (
    <>
      {showMain ? (<Wholescreen/>) : <Splash onFinish={() => setShowMain(true)} />}
      <Card
        title="React Card"
        image="https://via.placeholder.com/300x200"
        description="This is a customizable card component."
        buttonText="Learn More"
      />
      <Wholescreen />
    </>
  );
};

export default App;