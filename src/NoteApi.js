// src/api/noteApi.js
export const fetchNotes = async () => {
  const res = await fetch('/api/notes');
  return res.json();
};

export const fetchComments = async (noteId) => {
  const res = await fetch(`/api/comments/${noteId}`);
  return res.json();
};

export const postComment = async (noteId, text) => {
  await fetch(`/api/comments/${noteId}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text })
  });
};

export const postLike = async (noteId) => {
  await fetch(`/api/like/${noteId}`, { method: 'POST' });
};