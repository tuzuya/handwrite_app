import React, { useEffect, useState } from 'react';
import './index.css';

const Splash = ({ onFinish }) => {
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setFadeOut(true), 2000);
    const transitionTimer = setTimeout(() => onFinish(), 3000);
    return () => {
      clearTimeout(timer);
      clearTimeout(transitionTimer);
    };
  }, [onFinish]);

  return (
    <div className={`splash-container ${fadeOut ? 'fade-out' : ''}`}>
      <img src="/logo.png" alt="Logo" className="logo" />
    </div>
  );
};

export default Splash;