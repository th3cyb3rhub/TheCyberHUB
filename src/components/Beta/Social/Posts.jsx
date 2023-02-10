import React from "react";
import { posts } from "./SocialData";
import {
    Post,
    PostContent,
    PostHeader,
    PostHeaderImg,
    PostHeaderUsername,
    PostStat,
    PostStatLabel,
    PostStats,
    PostStatValue,
    PostTimestamp,
} from "./SocialElements";

const Posts = () => {
    return (
        <div className="posts">
            {posts.map((post) => (
                <Post key={post.id}>
                    <PostHeader>
                        <PostHeaderImg src={post.profileImage} alt="Profile picture" />
                        <PostHeaderUsername>{post.username}</PostHeaderUsername>
                    </PostHeader>
                    <PostTimestamp>{post.createdAt}</PostTimestamp>
                    <PostContent>{post.content}</PostContent>
                    <PostStats>
                        <PostStat>
                            <PostStatLabel>Views:</PostStatLabel>
                            <PostStatValue>{post.views}</PostStatValue>
                        </PostStat>
                        <PostStat>
                            <PostStatLabel>Likes:</PostStatLabel>
                            <PostStatValue>{post.likes}</PostStatValue>
                        </PostStat>
                        <PostStat>
                            <PostStatLabel>Reposts:</PostStatLabel>
                            <PostStatValue>{post.reposts}</PostStatValue>
                        </PostStat>
                        <PostStat>
                            <PostStatLabel>Comments:</PostStatLabel>
                            <PostStatValue>{post.comments}</PostStatValue>
                        </PostStat>
                    </PostStats>
                </Post>
            ))}
        </div>
    );
};

export default Posts;
