import React from "react";
import { useState } from "react";
import {posts} from './karidata.jsx';
import { filterByShape , filterByAuthor,getThreadByPostId,shapes } from "./postUtils.jsx";
import PostStack from './PostStack.jsx';
import ThreadView from './ThreadView.jsx';

const userId = 1;

export const MyPosts = () => {

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
