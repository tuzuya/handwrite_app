import React from "react";
import { userId } from './Mypage.jsx';
import { posts } from './karidata.jsx';

export const shapes = ["square","circle","star","heart"]

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

export const findParentPost = (targetId) => {
    for (let post of posts) {
        const all =[post, ...flattenReplies(post)];
        if (all.some(item => item.id===targetId)){
            return post;
        }
    }
    return null;
};
export const getThreadByPostId = (posts,postId) => {
    const parent = findParentPost(posts,postId);
    if(parent){
        return [parent,...flattenReplies(parent)]
    }else{
        return [];
    }
};
