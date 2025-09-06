// src/StickyNoteViewer2.jsx
import React, { useState, useEffect, useRef } from "react";
import { fetchNotes, fetchComments, postComment, postLike } from "./api/noteApi";

const StickyNoteViewer2 = () => {
  const [notes, setNotes] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);
  const touchStartX = useRef(0);

  useEffect(() => {
    fetchNotes().then(setNotes);
  }, []);

  useEffect(() => {
    if (notes.length > 0 && notes[currentIndex]) {
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
    if (notes.length > 0 && notes[currentIndex]) {
      postLike(notes[currentIndex].id);
    }
  };

  const handleCommentSubmit = () => {
    if (notes.length > 0 && notes[currentIndex] && comment.trim() !== '') {
      postComment(notes[currentIndex].id, comment).then(() => {
        setComment('');
        fetchComments(notes[currentIndex].id).then(setComments);
      });
    }
  };

  // --- ここでノートが無い時のガードを追加 ---
  if (notes.length === 0) {
    return <p>ノートを読み込み中...</p>;
  }

  return (
    <div
      onTouchStart={(e) => (touchStartX.current = e.changedTouches[0].clientX)}
      onTouchEnd={(e) => {
        const deltaX = e.changedTouches[0].clientX - touchStartX.current;
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

export default StickyNoteViewer2;