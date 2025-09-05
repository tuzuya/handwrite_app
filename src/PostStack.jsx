import React from "react";
import { useState } from "react";
import { RiEyeCloseFill } from "react-icons/ri";
const PostStack = ({ posts, shape, onDetail}) => {
    const [ currentIndex, setCurrentIndex ] = useState(0);
    const [ touchStartY, setTouchStartY ] = useState(null);
    if(posts.length === 0) return null;
    const handleTouchStart = (e) => {
        setTouchStartY(e.touches[0].clientY);
    };
    const handleTouchEnd = (e) => {
        if(touchStartY === null) return;
        const touchEndY = e.changedTouches[0].clientY;
        const deltaY = touchEndY - touchStartY;
        if(deltaY < -50 && currentIndex < posts.length -1 ){
            setCurrentIndex(currentIndex +1);
        }else if(deltaY > 50 && currentIndex > 0 ){
            setCurrentIndex(currentIndex -1);
        }
        setTouchStartY(null);
    };
    const post = posts.
    sort((a,b) => b.id - a.id)[currentIndex];
    
    return(
        <div 
        className="stack" 
        onTouchStart={handleTouchStart} 
        onTouchEnd={handleTouchEnd}
        >
            <div 
            key={post.id}
            className="stack-item"
            style={{zIndex:posts.length-currentIndex}}
            >
                <div className={'post-card ${shape}'}>
                    {post.text}
                    <button onClick={()=> onDetail(post.id)}>詳細をみる</button>
                </div>
            </div>
        </div>
    );
};

export default PostStack;