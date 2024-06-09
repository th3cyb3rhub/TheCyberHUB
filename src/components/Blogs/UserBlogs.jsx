import React, { useEffect } from "react";

import { Wrapper } from "src/components/Dashboard/Profile/ProfileElements.jsx";
import { AllBlogs, BlogsContainer, MiddleContainer } from "src/components/Blogs/BlogsElements.jsx";
import LoadingBlogCard from "src/components/Blogs/BlogCard/LoadingBlogCard.jsx";
import BlogCard from "src/components/Blogs/BlogCard/BlogCard.jsx";
import { useDispatch, useSelector } from "react-redux";
import { getBlogs, blogReset } from "src/features/blogs/blogSlice.js";
import LoadingSpinner from "src/components/Other/MixComponents/Spinner/LoadingSpinner.jsx";
import UnderMaintenance from "src/components/Other/UnderMaintenance/UnderMaintenance.jsx";
import apiStatus from "src/features/apiStatus.jsx";

const UserBlogs = () => {
    const { isApiLoading, isApiWorking } = apiStatus();

    const dispatch = useDispatch();
    const { blogs, isBlogLoading, isBlogError, blogMessage } = useSelector((state) => state.blogs);

    useEffect(() => {
        if (isBlogError) {
            console.log(blogMessage);
        }
        dispatch(getBlogs());
        return () => dispatch(blogReset());
    }, [dispatch, isBlogError, blogMessage]);

    if (isApiLoading) return <LoadingSpinner />;

    if (!isApiWorking) return <UnderMaintenance />;

    return (
        <Wrapper>
            <BlogsContainer>
                {isBlogLoading ? (
                    <MiddleContainer>
                        <AllBlogs>
                            <LoadingBlogCard />
                            <LoadingBlogCard />
                            <LoadingBlogCard />
                            <LoadingBlogCard />
                        </AllBlogs>
                    </MiddleContainer>
                ) : (
                    <MiddleContainer>
                        <AllBlogs>
                            {blogs && blogs.length > 0 ? (
                                blogs
                                    .slice()
                                    .reverse()
                                    .map((blog) => <BlogCard key={blog?._id} blog={blog} />)
                            ) : (
                                <h1 style={{ color: "white" }}>There are no blogs to display</h1>
                            )}
                        </AllBlogs>
                    </MiddleContainer>
                )}
            </BlogsContainer>
        </Wrapper>
    );
};

export default UserBlogs;
