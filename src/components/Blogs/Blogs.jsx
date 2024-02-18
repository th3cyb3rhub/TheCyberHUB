import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { blogReset, getAllBlogs } from "../../features/blogs/blogSlice";
import { Wrapper } from "../Dashboard/Profile/ProfileElements";
import { AllBlogs, BlogsContainer, BlogsSection, MiddleContainer } from "./BlogsElements";
import LoadingBlogCard from "./BlogCard/LoadingBlogCard";
import UnderMaintenance from "../Other/UnderMaintenance/UnderMaintenance";
import apiStatus from "../../features/apiStatus";
import BlogCards from "./BlogCard/BlogCards";
import { getAllUserDetails, userDetailReset } from "../../features/userDetail/userDetailSlice";
import { getFollowData, reset } from "../../features/follow/followSlice";
import Sidebar from "../Feeds/SocialSidebar/Sidebar";

const Blogs = () => {
    const dispatch = useDispatch();

    const [searchTerm, setSearchTerm] = useState("");
    const [showOnlyFollowingBlogs, setShowOnlyFollowingBlogs] = useState(false);

    const { user } = useSelector((state) => state.auth);
    const { isApiLoading, isApiWorking } = apiStatus();

    const { blogs, isBlogLoading, isBlogError, blogMessage } = useSelector((state) => state.blogs);
    const { userDetails, isUserDetailLoading, isUserDetailError, userDetailMessage } = useSelector(
        (state) => state.userDetail,
    );
    const { followData } = useSelector((state) => state.followData);

    const userId = user?._id;

    useEffect(() => {
        if (isBlogError) console.log(blogMessage);
        if (isUserDetailError) console.log(userDetailMessage);
        if (userId) dispatch(getFollowData(userId));
        dispatch(getAllBlogs());
        dispatch(getAllUserDetails());

        return () => {
            dispatch(reset());
            dispatch(blogReset());
            dispatch(userDetailReset());
        };
    }, [dispatch, isBlogError, blogMessage, isUserDetailError, userDetailMessage, userId]);

    const handleSearchTermChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const userDetailsfunction = (blog) => {
        const userDetail = userDetails?.find((user) => user.user === blog.user);
        const { username, avatar, verified } = userDetail || {};

        return { ...blog, username, avatar, verified };
    };

    const blogsData = blogs?.map((blog) => {
        return userDetailsfunction(blog);
    });

    const filteredBlogs = blogsData?.filter((blog) => {
        const postedByFollowingUser = !showOnlyFollowingBlogs || followData?.following?.includes(blog.user);
        const cleanSearchTerm = searchTerm.trim();
        const contentIncludesSearchTerm =
            !cleanSearchTerm || blog?.content?.toLowerCase().includes(cleanSearchTerm?.toLowerCase()) || false;
        const tagsIncludeSearchTerm =
            !cleanSearchTerm || blog?.tags?.join(" ").toLowerCase().includes(cleanSearchTerm?.toLowerCase()) || false;
        const usernameIncludeSearchTerm =
            !cleanSearchTerm || blog?.username.toLowerCase().includes(cleanSearchTerm?.toLowerCase()) || false;

        return (
            postedByFollowingUser &&
            (!cleanSearchTerm || contentIncludesSearchTerm || tagsIncludeSearchTerm || usernameIncludeSearchTerm)
        );
    });

    const blogTags = blogs?.map((blog) => blog?.tags).flat() || [];

    if (isBlogLoading || isUserDetailLoading || isApiLoading) {
        return (
            <Wrapper>
                <MiddleContainer>
                    <AllBlogs>
                        <LoadingBlogCard /> <LoadingBlogCard /> <LoadingBlogCard />
                        <LoadingBlogCard /> <LoadingBlogCard /> <LoadingBlogCard />
                        <LoadingBlogCard /> <LoadingBlogCard /> <LoadingBlogCard />
                    </AllBlogs>
                </MiddleContainer>
            </Wrapper>
        );
    }

    if (!isApiWorking) {
        return <UnderMaintenance />;
    }

    return (
        <Wrapper>
            <BlogsContainer>
                <BlogsSection>
                    <MiddleContainer>
                        <BlogCards blogs={filteredBlogs || blogs} />
                    </MiddleContainer>
                    <Sidebar
                        sidebarType={"blogs"}
                        user={user}
                        searchTerm={searchTerm}
                        setSearchTerm={setSearchTerm}
                        handleSearchTermChange={handleSearchTermChange}
                        tags={blogTags}
                        showOnlyFollowing={showOnlyFollowingBlogs}
                        setShowOnlyFollowing={setShowOnlyFollowingBlogs}
                    />
                </BlogsSection>
            </BlogsContainer>
        </Wrapper>
    );
};

export default Blogs;
