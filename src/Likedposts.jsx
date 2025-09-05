import React from "react";
import { useState } from "react";
import { posts } from './karidata.jsx';
import { filterByShape,flattenReplies,getThreadByPostId,shapes } from "./postUtils.jsx";
import PostStack from "./PostStack.jsx";
import ThreadView from "./ThreadView.jsx" ;

export const LikedPosts = () => {
    const[selectedThread,setSelectedThread] = useState(null);
    const handleShowThread = (postId) =>{
        setSelectedThread((prev)=>
        prev && prev[0].id === postId ? null : getThreadByPostId(posts,postId)
        );
    };
    return(
    <div>
        <h2>いいねした投稿・返信</h2>
        {shapes.map(shape => {
            const shapePosts = filterByShape(posts,shape);
            let relatedPosts=[];

            shapePosts.forEach((post)=>{
                const replies = flattenReplies(post);
                const all= [post, ...replies];
                const likedItems = all.filter((item) => item.liked);
                relatedPosts.push(...likedItems);
            });

            return(
            <PostStack
            key={shape}
            posts={shapePosts}
            shape={shape}
            onDetail={handleShowThread}
            />
            );
        })}
        <ThreadView
        thread={selectedThread}
        />
    </div>
    );
};

export default LikedPosts