import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { blogReset, getAllBlogs } from "src/features/blogs/blogSlice";
import { Wrapper } from "src/components/Dashboard/Profile/ProfileElements";
import { AllBlogs, BlogsContainer, BlogsSection, MiddleContainer } from "src/components/Blogs/BlogsElements";
import LoadingBlogCard from "src/components/Blogs/BlogCard/LoadingBlogCard";
import UnderMaintenance from "src/components/Other/UnderMaintenance/UnderMaintenance";
import apiStatus from "src/features/apiStatus";
import BlogCards from "src/components/Blogs/BlogCard/BlogCards";
import { getFollowData, reset } from "src/features/userDetail/follow/followSlice";
import Sidebar from "src/components/Common/SocialSidebar/Sidebar";
import { getBookmarks } from "src/features/bookmarks/bookmarkSlice.js";

const Blogs = () => {
    const dispatch = useDispatch();

    const [searchTerm, setSearchTerm] = useState("");
    const [showOnlyFollowingBlogs, setShowOnlyFollowingBlogs] = useState(false);
    const [selectedTags, setSelectedTags] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("All");

    const { user } = useSelector((state) => state.auth);
    const { isApiLoading, isApiWorking } = apiStatus();

    const { blogs, isBlogLoading, isBlogError, blogMessage } = useSelector((state) => state.blogs);

    const { bookmarks } = useSelector((state) => state.bookmarks);

    const userId = user?._id;

    useEffect(() => {
        if (isBlogError) console.log(blogMessage);
        if (userId) dispatch(getFollowData(userId));

        dispatch(getAllBlogs());
        dispatch(getBookmarks());

        return () => {
            dispatch(reset());
            dispatch(blogReset());
        };
    }, [dispatch, isBlogError, blogMessage, userId]);

    const handleSearchTermChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const filteredBlogs = blogs?.filter((blog) => {
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
        const matchesCategory = selectedCategory === "All" || blog.category === selectedCategory;

        return (
            allFilterTagsIncluded &&
            (!cleanSearchTerm || contentIncludesSearchTerm || usernameIncludeSearchTerm) &&
            matchesCategory
        );
    });

    const blogTags = blogs?.map((blog) => blog?.tags.map((tag) => tag.toLowerCase())).flat() || [];
    const uniqueBlogTags = [...new Set([...blogTags])];

    const handleCategoryClick = (category) => {
        setSelectedCategory((prevCategory) => (prevCategory === category ? "All" : category));
    };

    const dynamicCategories = new Set(blogs.map((blog) => blog.category));
    const manualCategories = new Set(["All", "Security", "News", "Bug Hunting", "CTF", "Tools", "Dark Web", "Other"]);
    const categories = Array.from(new Set([...manualCategories, ...dynamicCategories]));

    if (isApiLoading || isBlogLoading) {
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
                        <header>
                            <ul
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "5px",
                                    padding: "0",
                                    margin: "0",
                                    width: "auto",
                                    flexDirection: "row",
                                    flexWrap: "wrap",
                                    wordWrap: "break-word",
                                }}
                            >
                                {categories.map((category, index) => (
                                    <li
                                        key={index}
                                        onClick={() => handleCategoryClick(category)}
                                        style={{
                                            cursor: "pointer",
                                            fontWeight: selectedCategory === category ? "bold" : "normal",
                                            backgroundColor: "#1d1d1d",
                                            padding: "0.5rem 1rem", // Use rem for padding
                                            borderRadius: "5px",
                                            fontSize: "1rem", // Use rem for font size
                                        }}
                                    >
                                        {category}
                                    </li>
                                ))}
                            </ul>
                        </header>

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
