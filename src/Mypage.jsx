import React from "react";
import { useEffect, useState } from 'react';
import MyPosts from "./Myposts.jsx";
import LikedPosts from "./Likedposts.jsx";
import YaritoriPosts from "./Yaritoriposts.jsx";
import { supabase } from './lib/supabase';


export const MyPage = ({ onBack }) => {
    const [userId, setUserId] = useState(null);
    const [activeTab, setActiveTab] = useState('MyPosts');

    useEffect(() => {
        const getUser = async () => {
            const { data } = await supabase.auth.getUser();
            setUserId(data?.user?.id || null);
        };
    getUser();
    }, []);

if (!userId) return <div>Loading...</div>;

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
    <button onClick={onBack}>戻る</button>
</div>
);
};
export default MyPage;