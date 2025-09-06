// import React from "react";
// import {squarePosts} from 'Mypage.jsx';
// import {circlePosts} from 'Mypage.jsx';
// import {starPosts} from 'Mypage.jsx';
// import {heartPosts} from 'Mypage.jsx';

// export const Userposts = () => {

//     function yaritoriPosts(items){
//         let result = [];
//         items.forEach(item => {
//             if(item.authorId === UserId){
//                 result.push(item);
//             }
//             let nextReplies = item.replies
//             while(nextReplies !== "[]"){
//                 if(nextReplies.authorId === UserId){
//                     nextReplies.push(result)
//                 };
//                 let nextReplies = nextReplies.replies
//             }
//         })
//         return result;
//     }
//     const yaritoriSquarePosts = yaritoriPosts(squarePosts);
//     const yaritoriCirclePosts = yaritoriPosts(circlePosts);
//     const yaritoriStarPosts = yaritoriPosts(starPosts);
//     const yaritoriHeartPosts = yaritoriPosts(heartPosts);

// return(

//     <div>
//         <header>マイページ</header>
//         <h2>いいねした投稿・返信</h2>
//         <ul>
//             {yaritoriSquarePostsSquarePosts.map(post => (
//                 <li key={post.id}>{post.text}</li>
//             ))}
//             {yaritoriCirclePosts.map(post => (
//                 <li key={post.id}>{post.text}</li>
//             ))}
//             {yaritoriStarPosts.map(post => (
//                 <li key={post.id}>{post.text}</li>
//             ))}
//             {yaritoriHeartPosts.map(post => (
//                 <li key={post.id}>{post.text}</li>
//             ))}
//         </ul>
//     </div>

// )
// }