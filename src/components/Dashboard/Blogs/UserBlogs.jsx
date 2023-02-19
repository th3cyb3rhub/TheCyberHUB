import React, { useEffect } from "react";

import { Wrapper } from "../Profile/ProfileElements";
import { AllBlogs, BlogsComponent, MiddleContainer } from "../../Blogs/BlogsElements";
import LoadingBlogCard from "../../Blogs/BlogCard/LoadingBlogCard";
import NewBlogCard from "../../Blogs/BlogCard/NewBlogCard";
import { useDispatch, useSelector } from "react-redux";
import { getBlogs, reset } from "../../../features/blogs/blogSlice";

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
            <BlogsComponent>
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
                                    .map((blog) => <NewBlogCard key={blog?._id} blog={blog} />)
                            ) : (
                                <h1 style={{ color: "white" }}>There are no blogs to display</h1>
                            )}
                        </AllBlogs>
                    </MiddleContainer>
                )}
            </BlogsComponent>
        </Wrapper>
    );
};

export default UserBlogs;
