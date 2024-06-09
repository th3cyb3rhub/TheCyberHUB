import Avatar from "./Avatar.jsx";
import React from "react";

export default function Contact({ id, username, onClick, selected, online }) {
    return (
        <div
            key={id}
            onClick={() => onClick(id)}
            className={`border-b border-gray-800 rounded-lg flex items-center gap-2 cursor-pointer ${
                selected ? "bg-neutral-800 text-white" : ""
            }`}
        >
            {selected && <div className="w-1 bg-orange-500 h-12 rounded-r-md"></div>}
            <div className="flex gap-2 py-2 pl-4 items-center">
                <Avatar online={online} username={username} userId={id} />
                <span className={`text-${selected ? "white" : "gray"}`}>{username?.slice(0, 15)}</span>
            </div>
        </div>
    );
}
