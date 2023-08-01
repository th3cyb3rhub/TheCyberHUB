import React, { useEffect } from "react";

import { Wrapper } from "../../Profile/ProfileElements";
import { AllBlogs, BlogsContainer, MiddleContainer } from "../../../Blogs/BlogsElements";
import LoadingBlogCard from "../../../Blogs/BlogCard/LoadingBlogCard";
import BlogCard from "../../../Blogs/BlogCard/BlogCard";
import { useDispatch, useSelector } from "react-redux";
import { getBlogs, reset } from "../../../../features/blogs/blogSlice";

const UserBlogs = () => {
    const dispatch = useDispatch();
    const { blogs, isLoading, isError, message } = useSelector((state) => state.blogs);

    useEffect(() => {
        if (isError) {
            console.log(message);
        }
        dispatch(getBlogs());
        return () => dispatch(reset());
    }, [dispatch, isError, message]);
    return (
        <Wrapper>
            <BlogsContainer>
                {isLoading ? (
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
