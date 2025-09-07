// src/components/StickyNoteViewer.jsx
import React, { useState, useEffect } from 'react';
import { fetchNotes, fetchComments, postComment, postLike } from '../api/noteApi';

const StickyNoteViewer = () => {
  const [notes, setNotes] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);

  useEffect(() => {
    fetchNotes().then(setNotes);
  }, []);

  useEffect(() => {
    if (notes[currentIndex]) {
      fetchComments(notes[currentIndex].id).then(setComments);
    }
  }, [currentIndex, notes]);

  const handleSwipe = (direction) => {
    if (direction === 'left' && currentIndex < notes.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else if (direction === 'right' && currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleLike = () => {
    postLike(notes[currentIndex].id);
  };

  const handleCommentSubmit = () => {
    postComment(notes[currentIndex].id, comment).then(() => {
      setComment('');
      fetchComments(notes[currentIndex].id).then(setComments);
    });
  };

  return (
    <div
      onTouchStart={(e) => (this.touchStartX = e.changedTouches[0].clientX)}
      onTouchEnd={(e) => {
        const deltaX = e.changedTouches[0].clientX - this.touchStartX;
        if (deltaX < -50) handleSwipe('left');
        else if (deltaX > 50) handleSwipe('right');
      }}
    >
      <h2>{notes[currentIndex]?.title}</h2>
      <p>{notes[currentIndex]?.content}</p>

      <button onClick={handleLike}>❤️ いいね</button>

      <div>
        <h4>コメント</h4>
        {comments.map((c, i) => (
          <p key={i}>{c.text}</p>
        ))}
        <input
          type="text"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="コメントを入力"
        />
        <button onClick={handleCommentSubmit}>送信</button>
      </div>
    </div>
  );
};

export default StickyNoteViewer;