import React from "react";

const Followers = ({ followers, userDetails }) => {
    const followersList = userDetails?.filter((user) => followers?.includes(user?.user));
    return (
        <div>
            {followersList?.map((follower, index) => (
                <div key={index}>
                    <h3>{follower?.username}</h3>
                </div>
            ))}
        </div>
    );
};

export default Followers;
