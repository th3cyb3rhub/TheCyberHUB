import React, { useState, useEffect } from "react";
import { BookmarksContainer } from "./BookmarksElements";
import { useDispatch, useSelector } from "react-redux";
import { getBookmarks } from "src/features/bookmarks/bookmarkSlice";
import FeedPosts from "src/components/Feeds/FeedPosts/FeedPosts";
import { getAllFeeds } from "src/features/feeds/feedsSlice";
import { getAllUserDetails } from "src/features/userDetail/userDetailSlice";
import LoadingSpinner from "src/components/Other/MixComponents/Spinner/LoadingSpinner";
import UnderMaintenance from "src/components/Other/UnderMaintenance/UnderMaintenance";
import apiStatus from "src/features/apiStatus";
import BlogCards from "src/components/Blogs/BlogCard/BlogCards.jsx";
import { getAllBlogs } from "src/features/blogs/blogSlice.js";
import { FilterButton } from "src/components/Feeds/FeedsElements.jsx";

const Bookmarks = () => {
    const dispatch = useDispatch();
    const { isApiLoading, isApiWorking } = apiStatus();

    const { bookmarks } = useSelector((state) => state.bookmarks);
    const { feeds, isFeedLoading } = useSelector((state) => state.feeds);
    const { blogs, isBlogLoading } = useSelector((state) => state.blogs);

    useEffect(() => {
        dispatch(getBookmarks());
        dispatch(getAllFeeds());
        dispatch(getAllBlogs());
        dispatch(getAllUserDetails());
    }, [dispatch]);

    const [selectedFilter, setSelectedFilter] = useState("Feeds");

    const handleFilterChange = (filter) => {
        setSelectedFilter(filter);
    };

    if (isApiLoading || isFeedLoading || isBlogLoading) return <LoadingSpinner />;

    if (!isApiWorking) return <UnderMaintenance />;

    const filteredFeeds = bookmarks
        .filter((bookmark) => bookmark.itemType === "feed")
        .map((bookmark) => feeds.find((feed) => feed?._id === bookmark?.itemId));

    const filteredBlogs = bookmarks
        .filter((bookmark) => bookmark.itemType === "blog")
        .map((bookmark) => blogs.find((blog) => blog?._id === bookmark?.itemId));

    return (
        <BookmarksContainer>
            <h1
                style={{
                    fontSize: "30px",
                    fontWeight: "bold",
                    color: "#8f8f8f",
                    padding: "25px",
                    alignItems: "center",
                    textAlign: "center",
                }}
            >
                Saved
            </h1>
            <div style={{ padding: "0 0 50px 0", display: "flex", justifyContent: "space-between", width: "100%" }}>
                <FilterButton
                    style={{
                        background: selectedFilter === "Feeds" ? "#FF6B08" : "",
                        color: selectedFilter === "Feeds" ? "#0A0A0A" : "",
                    }}
                    onClick={() => handleFilterChange("Feeds")}
                >
                    Feeds
                </FilterButton>
                <FilterButton
                    style={{
                        background: selectedFilter === "Blogs" ? "#FF6B08" : "",
                        color: selectedFilter === "Blogs" ? "#0A0A0A" : "",
                    }}
                    onClick={() => handleFilterChange("Blogs")}
                >
                    Blogs
                </FilterButton>
                {/* <FilterButton */}
                {/*    style={{ */}
                {/*        background: selectedFilter === "CTF" ? "#FF6B08" : "", */}
                {/*        color: selectedFilter === "CTF" ? "#0A0A0A" : "", */}
                {/*    }} */}
                {/*    onClick={() => handleFilterChange("CTF")} */}
                {/* > */}
                {/*    CTF */}
                {/* </FilterButton> */}
                {/* <FilterButton */}
                {/*    style={{ */}
                {/*        background: selectedFilter === "WebSecurity" ? "#FF6B08" : "", */}
                {/*        color: selectedFilter === "WebSecurity" ? "#0A0A0A" : "", */}
                {/*    }} */}
                {/*    onClick={() => handleFilterChange("WebSecurity")} */}
                {/* > */}
                {/*    Web Security */}
                {/* </FilterButton> */}
            </div>
            {selectedFilter === "Feeds" ? (
                <FeedPosts feeds={filteredFeeds} isFeedLoading={isFeedLoading} />
            ) : (
                <BlogCards selectedTags={""} blogs={filteredBlogs || blogs} />
            )}
        </BookmarksContainer>
    );
};

export default Bookmarks;
