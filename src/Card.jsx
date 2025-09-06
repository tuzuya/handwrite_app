import React from 'react';
import './Card.css'; // CSSファイルでスタイルを定義
import card1 from './assets/fusen_circle.png';
import card2 from './assets/fusen_heart.png';
import card3 from './assets/fusen_square.png';
import card4 from './assets/fusen_star.png';

const SHAPE_IMAGES = {
  circle: card1,
  heart: card2,
  square: card3,
  star: card4,
};

const Card = ({description, shape = "circle", color = "#222", thickness = 2 }) => {
  const bgImg = SHAPE_IMAGES[shape] || SHAPE_IMAGES.circle;
  return (
    <div className="card-custom">
      <img src={bgImg} alt={shape} className="card-bg-img" />
      <div 
        className="card-description"
        style={{
          color: color,
          fontWeight: thickness >= 8 ? "bold" : "normal",
          fontSize: 1 + thickness / 8 + "rem",
          WebkitTextStrokeWidth: thickness > 8 ? 1 : 0,
        }}
        >
          {description}
        </div>
    </div>
  );
};

export default Card;