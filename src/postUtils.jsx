import React from "react";
// import { userId } from './Mypage.jsx';
import { supabase } from "./lib/supabase";
import { posts } from './karidata.jsx';
const user = supabase.auth.getUser();
const userID = user?.id;
//関数置き場

export const shapes = ["square","circle","star","heart"]

//各階層スレッドの二枚目以降のカードについてフォーカスしている時でも、そのカードを親と同じレベルで扱うことで、
// 親のカードと同じように操作できるようにする
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

//filter系は投稿を絞り込むための関数
export const filterByShape = (posts, shape) => 
    posts.filter((post) => post.noteStyle.shape === shape);
export const filterByAuthor = (posts, authorId) => 
    posts.filter((post) => post.authorId === authorId);

export const findParentPost = (targetId) => {
    for (let post of posts) {
        const all =[post, ...flattenReplies(post)];
        if (all.some(item => item.id===targetId)){
            return post;
        }
    }
    return null;
};
//親投稿の取得
export const getThreadByPostId = (posts,postId) => {
    const parent = findParentPost(posts,postId);
    if(parent){
        return [parent,...flattenReplies(parent)]
    }else{
        return [];
    }
};
