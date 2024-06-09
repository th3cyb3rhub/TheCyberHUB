import React, { useEffect } from "react";
import { Wrapper } from "src/components/Dashboard/Profile/ProfileElements";
import { ForumContainer } from "./ForumElements";
import { RouterButtonLink } from "src/components/Blogs/ManageBlogs/CreateBlog/CreateBlogElements";
import { useDispatch, useSelector } from "react-redux";
import { getForums } from "src/features/forum/forumSlice";
import ForumPosts from "./ForumPosts/ForumPosts";

const Forum = () => {
    const dispatch = useDispatch();
    const {
        forums,
        // , isLoading, isError, message
    } = useSelector((state) => state.forums);

    useEffect(() => {
        dispatch(getForums());
    }, [dispatch]);

    return (
        <Wrapper>
            <ForumContainer>
                <div style={{ display: "flex", justifyContent: "center" }}>
                    <RouterButtonLink to={"/dashboard/forum/create"}> Ask Question </RouterButtonLink>
                    <RouterButtonLink to={"/dashboard/forum/create"}> Post a Solution </RouterButtonLink>
                </div>

                <ForumPosts forums={forums} />
            </ForumContainer>
        </Wrapper>
    );
};

export default Forum;
