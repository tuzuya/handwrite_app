import React from "react";
import { posts } from './karidata.jsx';
import { filterByShape,flattenReplies } from "./postUtils.jsx";

const shapes = ["square", "circle", "star", "heart"];

export const LikedPosts = () => {
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
                <div key={shape} className="stack">
                    {relatedPosts
                    .sort((a,b) => b.id - a.id)
                    .map((post,index)=>(
                        <div key={post.id} className="stack-item" style={{top: '${index * 10}px',zIndex: relatedPosts.length-index}}
                        >
                            <div className={'post-card ${shape}'}>{post.text}</div>
                        </div>
                    ))}
                </div>
            );
        })}
    </div>
    );

};
export default LikedPosts