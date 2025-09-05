import React from "react";
import {posts} from './karidata.jsx';
import { filterByShape , filterByAuthor } from "./postUtils.jsx";

const shapes = ["square", "circle", "star", "heart"];
const userId = 1;

export const MyPosts = () => {

return(<div>
    <h2>自分の投稿・返信</h2>
    {shapes.map(shape => {
        const shapePosts = filterByAuthor(filterByShape(posts,shape),userId);
        return(
            <div key={shape} className="stack">
                {shapePosts
                .sort ((a,b) => b.id - a.id)
                .map((post, index)=> (
                    <div 
                    key={post.id}
                    className="stack-item"
                    style={{top: `${index * 10}px`,zIndex: `${shapePosts.length + 100 - index}`}} 
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

export default MyPosts;
