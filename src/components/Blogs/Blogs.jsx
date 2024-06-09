import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { blogReset, getAllBlogs } from "src/features/blogs/blogSlice";
import { Wrapper } from "src/components/Dashboard/Profile/ProfileElements";
import { AllBlogs, BlogsContainer, BlogsSection, MiddleContainer } from "src/components/Blogs/BlogsElements";
import LoadingBlogCard from "src/components/Blogs/BlogCard/LoadingBlogCard";
import UnderMaintenance from "src/components/Other/UnderMaintenance/UnderMaintenance";
import apiStatus from "src/features/apiStatus";
import BlogCards from "src/components/Blogs/BlogCard/BlogCards";
import { getAllUserDetails, userDetailReset } from "src/features/userDetail/userDetailSlice";
import { getFollowData, reset } from "src/features/follow/followSlice";
import Sidebar from "src/components/Common/SocialSidebar/Sidebar";
import { getBookmarks } from "src/features/bookmarks/bookmarkSlice.js";

const Blogs = () => {
    const dispatch = useDispatch();

    const [searchTerm, setSearchTerm] = useState("");
    const [showOnlyFollowingBlogs, setShowOnlyFollowingBlogs] = useState(false);
    const [selectedTags, setSelectedTags] = useState([]);

    const { user } = useSelector((state) => state.auth);
    const { isApiLoading, isApiWorking } = apiStatus();

    const { blogs, isBlogLoading, isBlogError, blogMessage } = useSelector((state) => state.blogs);
    const { userDetails, isUserDetailLoading, isUserDetailError, userDetailMessage } = useSelector(
        (state) => state.userDetail,
    );
    const { followData } = useSelector((state) => state.followData);
    const { bookmarks } = useSelector((state) => state.bookmarks);

    const userId = user?._id;

    useEffect(() => {
        if (isBlogError) console.log(blogMessage);
        if (isUserDetailError) console.log(userDetailMessage);
        if (userId) dispatch(getFollowData(userId));

        dispatch(getAllBlogs());
        dispatch(getBookmarks());
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
        const cleanSearchTerm = searchTerm.trim().toLowerCase();
        const contentIncludesSearchTerm =
            !cleanSearchTerm || blog?.content?.toLowerCase().includes(cleanSearchTerm) || false;
        const allFilterTagsIncluded =
            !selectedTags || selectedTags.length === 0
                ? true
                : selectedTags.every((selectedTag) =>
                      blog?.tags?.some((blogTag) => blogTag.toLowerCase() === selectedTag.toLowerCase()),
                  );
        const usernameIncludeSearchTerm =
            !cleanSearchTerm || blog?.username?.toLowerCase().includes(cleanSearchTerm) || false;

        return (
            postedByFollowingUser &&
            allFilterTagsIncluded &&
            (!cleanSearchTerm || contentIncludesSearchTerm || usernameIncludeSearchTerm)
        );
    });

    const blogTags = blogs?.map((blog) => blog?.tags.map((tag) => tag.toLowerCase())).flat() || [];
    const uniqueBlogTags = [...new Set([...blogTags])];

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
                        <BlogCards bookmarks={bookmarks} selectedTags={selectedTags} blogs={filteredBlogs || blogs} />
                    </MiddleContainer>
                    <Sidebar
                        sidebarType={"blogs"}
                        user={user}
                        searchTerm={searchTerm}
                        setSearchTerm={setSearchTerm}
                        handleSearchTermChange={handleSearchTermChange}
                        tags={uniqueBlogTags}
                        selectedTags={selectedTags}
                        setSelectedTags={setSelectedTags}
                        showOnlyFollowing={showOnlyFollowingBlogs}
                        setShowOnlyFollowing={setShowOnlyFollowingBlogs}
                        data={blogs}
                    />
                </BlogsSection>
            </BlogsContainer>
        </Wrapper>
    );
};

export default Blogs;
