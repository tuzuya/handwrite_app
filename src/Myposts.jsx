import React from "react";
import { useState } from "react";
import {posts} from './karidata';
import { filterByShape , filterByAuthor,getThreadByPostId,shapes } from "./postUtils";
import PostStack from './PostStack';
import ThreadView from './ThreadView';

const userId = 1;

//ここは修正が必要かもしれない
export const MyPosts = ({ userId }) => {
    const myPosts = filterByAuthor(posts,userId);
    const[selectedThread,setSelectedThread] = useState(null);
    const handleShowThread = (postId) =>{
        setSelectedThread((prev)=>
            prev && prev[0].id === postId ? null : getThreadByPostId(posts,postId)
        );
    };
    return(
    <div>
    <h2>自分の投稿・返信</h2>
    {shapes.map(shape => {
        const shapePosts = filterByAuthor(filterByShape(posts,shape),userId);
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

export default MyPosts;
