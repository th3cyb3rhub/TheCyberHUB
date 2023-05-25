import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllBlogs, reset } from "../../features/blogs/blogSlice";
import { Wrapper } from "../Dashboard/Profile/ProfileElements";
import { AllBlogs, BlogsContainer, BlogsSection, MiddleContainer } from "./BlogsElements";
import NewBlogCard from "./BlogCard/NewBlogCard";
import LoadingBlogCard from "./BlogCard/LoadingBlogCard";
import { RouterNavCreateButtonLink } from "../Header/Navbar/NavbarElements";
import LeftBlogSidebar from "./BlogSidebar/LeftBlogSidebar";
import UnderMaintenance from "../Other/UnderMaintenance/UnderMaintenance";
import apiStatus from "../../features/apiStatus";
import BlogsTags from "./BlogsTags";

const Blogs = () => {
    const { isApiLoading, isApiWorking } = apiStatus();
    const dispatch = useDispatch();
    const { blogs, isLoading, isError, message } = useSelector((state) => state.blogs);

    const tags = [...new Set(blogs?.map((blog) => blog?.tags).flat())].sort();

    useEffect(() => {
        if (isError) {
            console.log(message);
        }
        dispatch(getAllBlogs());
        return () => dispatch(reset());
    }, [dispatch, isError, message]);

    if (isLoading || isApiLoading) {
        return (
            <Wrapper>
                <MiddleContainer>
                    <AllBlogs>
                        <LoadingBlogCard />
                        <LoadingBlogCard />
                        <LoadingBlogCard />
                        <LoadingBlogCard />
                        <LoadingBlogCard />
                        <LoadingBlogCard />
                        <LoadingBlogCard />
                        <LoadingBlogCard />
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
                    <RouterNavCreateButtonLink to={"/dashboard/blogs/create"}>Create Blog</RouterNavCreateButtonLink>
                    <MiddleContainer>
                        <div>
                            <LeftBlogSidebar />
                            <BlogsTags tags={tags} />
                        </div>
                        <AllBlogs>
                            {blogs && Array.isArray(blogs) ? (
                                blogs
                                    .slice()
                                    .reverse()
                                    .map((blog) => <NewBlogCard key={blog?._id} blog={blog} />)
                            ) : (
                                <h3>There are no blogs to display</h3>
                            )}
                        </AllBlogs>
                    </MiddleContainer>
                </BlogsSection>
            </BlogsContainer>
        </Wrapper>
    );
};

export default Blogs;
