import React from "react";
import { useState } from 'react';
import MyPosts from "./Myposts.jsx";
import LikedPosts from "./Likedposts.jsx";
import YaritoriPosts from "./Yaritoriposts.jsx";


export const MyPage = () => {

    const [activeTab, setActiveTab] = useState('MyPosts');

return(
<div>
    <header>マイページ</header>
    <div className='tab-bar'>
        <button onClick={()=>setActiveTab("MyPosts")}>自分の投稿</button>
        <button onClick={()=>setActiveTab("LikedPosts")}>いいねした投稿</button>
        <button onClick={()=>setActiveTab("YaritoriPosts")}>やりとりした投稿</button>
    </div>
    <div className='tab-content'>
        {activeTab ==="MyPosts" && <MyPosts />}
        {activeTab ==="LikedPosts" && <LikedPosts />}
        {activeTab ==="YaritoriPosts" && <YaritoriPosts />}
    </div>
</div>
);
};
export default MyPage;