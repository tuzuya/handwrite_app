import React from "react";
const PostStack = ({ posts,shape,onDetail}) => {
    return(
        <div className="stack">
                    {posts
                    .sort((a,b)=>b.id - a.id)
                    .map((post, index) => (
                        <div key={post.id}
                        className="stack-item"
                        style={{top: '${index*10}px',zIndex:posts.length-index}}
                        >
                            <div className='{post-card ${shape}}'>
                                {post.text}
                                <button onClick={()=> onDetail(post.id)}>詳細をみる</button>
                            </div>
                        </div>
                    ))}
                </div>
    );
};

export default PostStack;