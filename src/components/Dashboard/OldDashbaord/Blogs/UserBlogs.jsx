import React, { useEffect } from "react";

import { Wrapper } from "../../Profile/ProfileElements";
import { AllBlogs, BlogsContainer, MiddleContainer } from "../../../Blogs/BlogsElements";
import LoadingBlogCard from "../../../Blogs/BlogCard/LoadingBlogCard";
import BlogCard from "../../../Blogs/BlogCard/BlogCard";
import { useDispatch, useSelector } from "react-redux";
import { getBlogs, blogReset } from "../../../../features/blogs/blogSlice";
import LoadingSpinner from "../../../Other/MixComponents/Spinner/LoadingSpinner";
import UnderMaintenance from "../../../Other/UnderMaintenance/UnderMaintenance";
import apiStatus from "../../../../features/apiStatus";

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
