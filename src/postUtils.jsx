import React from "react";
import { userId } from './Mypage.jsx';

export const flattenReplies = (post) => {
    let result = [];
    const traverse = (item) => {
        if(item.replies && item.replies.length > 0){
            item.replies.forEach(reply => {
                result.push(reply);
                traverse(reply);
            });
        }
    };
    traverse(post);
    return result;
};

export const filterByShape = (posts, shape) => 
    posts.filter((post) => post.noteStyle.shape === shape);
export const filterByAuthor = (posts, authorId) => 
    posts.filter((post) => post.authorId === userId);
