import React from "react";
import {squarePosts} from 'Mypage.jsx';
import {circlePosts} from 'Mypage.jsx';
import {starPosts} from 'Mypage.jsx';
import {heartPosts} from 'Mypage.jsx';

export const LikedPosts = () => {

function likedPosts(items){
    let result = [];
    items.forEach(item => {
        if(item.liked){
            result.push(item);
        }
        let nextReplies = item.replies
        while(nextReplies !== "[]"){
            if(nextReplies.liked){
                nextReplies.push(result)
            };
            let nextReplies = nextReplies.replies
        }
    })
    return result;
}
const likedSquarePosts = likedPosts(squarePosts);
const likedCirclePosts = likedPosts(circlePosts);
const likedStarPosts = likedPosts(starPosts);
const likedHeartPosts = likedPosts(heartPosts);

return(

    <div>
        <header>マイページ</header>
        <h2>いいねした投稿・返信</h2>
        <ul>
            {likedSquarePosts.map(post => (
                <li key={post.id}>{post.text}</li>
            ))}
            {likedCirclePosts.map(post => (
                <li key={post.id}>{post.text}</li>
            ))}
            {likedStarPosts.map(post => (
                <li key={post.id}>{post.text}</li>
            ))}
            {likedHeartPosts.map(post => (
                <li key={post.id}>{post.text}</li>
            ))}
        </ul>
    </div>

)
}