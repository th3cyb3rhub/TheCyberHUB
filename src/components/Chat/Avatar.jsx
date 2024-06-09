import React from "react";
const Avatar = ({ userId, username, online }) => {
    const colors = [
        "bg-teal-500",
        "bg-red-500",
        "bg-green-500",
        "bg-purple-500",
        "bg-blue-500",
        "bg-yellow-500",
        "bg-orange-500",
        "bg-cyan-500",
        "bg-amber-500",
        "bg-emerald-500",
        "bg-gray-500",
        "bg-red-500",
        "bg-amber-500",
    ];

    const userIdBase10 = parseInt(userId.substring(10), 16);
    const colorIndex = userIdBase10 % colors.length;
    const color = colors[colorIndex];

    return (
        <div className={`w-8 h-8 relative rounded-full overflow-hidden flex items-center ${color}`}>
            <div className="text-center w-full text-white">{username[0]}</div>
            {online && (
                <div className="absolute w-3 h-3 bg-orange-500 bottom-0 right-0 rounded-full border border-white"></div>
            )}
            {!online && (
                <div className="absolute w-3 h-3 bg-gray-400 bottom-0 right-0 rounded-full border border-white"></div>
            )}
        </div>
    );
};

export default Avatar;
