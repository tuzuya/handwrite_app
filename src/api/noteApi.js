// src/api/noteApi.js
export const fetchNotes = async () => [
  { id: 1, title: "テストノート1", content: "これはテストの本文です" },
  { id: 2, title: "テストノート2", content: "別の付箋です" },
];

export const fetchComments = async (noteId) => [
  { text: `ノート${noteId}へのサンプルコメント1` },
  { text: `ノート${noteId}へのサンプルコメント2` },
];


export const postComment = async (noteId, text) => {
  console.log("コメント投稿:", noteId, text);
};

export const postLike = async (noteId) => {
  console.log("いいね:", noteId);
};
