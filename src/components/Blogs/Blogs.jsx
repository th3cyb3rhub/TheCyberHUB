import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllBlogs, reset } from "../../features/blogs/blogSlice";
import { Wrapper } from "../Dashboard/Profile/ProfileElements";
import { AllBlogs, BlogsComponent, MiddleContainer } from "./BlogsElements";
import NewBlogCard from "./BlogCard/NewBlogCard";
import LoadingBlogCard from "./BlogCard/LoadingBlogCard";

const Blogs = () => {
    const dispatch = useDispatch();
    const { blogs, isLoading, isError, message } = useSelector((state) => state.blogs);

    useEffect(() => {
        if (isError) {
            console.log(message);
        }
        dispatch(getAllBlogs());
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
                            {blogs && Array.isArray(blogs) ? (
                                blogs
                                    .slice()
                                    .reverse()
                                    .map((blog) => <NewBlogCard key={blog?._id} blog={blog} />)
                            ) : (
                                <>
                                    <h3>There are no blogs to display</h3>
                                </>
                            )}
                        </AllBlogs>
                    </MiddleContainer>
                )}
            </BlogsComponent>
        </Wrapper>
    );
};

export default Blogs;
