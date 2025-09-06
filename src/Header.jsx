import React from 'react';
import './Header.css';

const Header = ({ onAccountClick }) => {
  return (
    <header className="app-header">
      <div className="header-title">みんなのtuduri</div>
      <button className="header-account" onClick={onAccountClick} aria-label="マイページ">
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="8" r="4" stroke="#333" strokeWidth="2" />
          <path d="M4 20c0-4 8-4 8-4s8 0 8 4" stroke="#333" strokeWidth="2" fill="none" />
        </svg>
      </button>
    </header>
  );
};

export default Header;