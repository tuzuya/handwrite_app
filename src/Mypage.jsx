import React from "react";
import { posts } from './karidata.jsx'


export const MyPage = () => {

//仮データ
    const UserId =1;

//元の投稿のかたちで分ける
const squarePosts =posts.filter(post => post.noteStyle.shape === "square");
const circlePosts =posts.filter(post => post.noteStyle.shape === "circle");
const starPosts =posts.filter(post => post.noteStyle.shape === "star");
const heartPosts =posts.filter(post => post.noteStyle.shape === "heart");


function myPosts(items){
    let result = [];
    if(item.authorId === UserId){
        result.push(item);
    }
}
const squareMyPosts = myPosts(squarePosts);
const circleMyPosts = myPosts(circlePosts);
const starMyPosts = myPosts(starPosts);
const heartMyPosts = myPosts(heartPosts);

return(<div>
    <header>マイページ</header>
    <h2>自分の投稿・返信</h2>
    <ul>
        {squareMyPosts.map(post => (
            <li key={post.id}>{post.text}</li>
        ))}
        {circleMyPosts.map(post => (
            <li key={post.id}>{post.text}</li>
        ))}
        {starMyPosts.map(post => (
            <li key={post.id}>{post.text}</li>
        ))}
        {heartMyPosts.map(post => (
            <li key={post.id}>{post.text}</li>
        ))}
    </ul>

</div>

)
}

export default MyPage;