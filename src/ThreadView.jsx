import React from "react";
const ThreadView = ({ thread }) => {
    if(!thread || !thread.length) return null;
    return (
        <div className="thread-view">
            <h3>スレッド表示</h3>
            <ul>
                {thread.map(item =>(
                    <li key={item.id}>{item.description}</li>
                ))}
            </ul>
        </div>
    );
};
export default ThreadView;