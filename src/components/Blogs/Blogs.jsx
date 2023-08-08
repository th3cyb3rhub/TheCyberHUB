import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { blogReset, getAllBlogs } from "../../features/blogs/blogSlice";
import { Wrapper } from "../Dashboard/Profile/ProfileElements";
import { AllBlogs, BlogsContainer, BlogsSection, MiddleContainer } from "./BlogsElements";
// import BlogCard from "./BlogCard/BlogCard";
import LoadingBlogCard from "./BlogCard/LoadingBlogCard";
import { RouterNavCreateButtonLink } from "../Header/Navbar/NavbarElements";
// import LeftBlogSidebar from "./BlogSidebar/LeftBlogSidebar";
import UnderMaintenance from "../Other/UnderMaintenance/UnderMaintenance";
import apiStatus from "../../features/apiStatus";
import BlogCards from "./BlogCard/BlogCards";
import { getAllUserDetails, userDetailReset } from "../../features/userDetail/userDetailSlice";

const Blogs = () => {
    const { isApiLoading, isApiWorking } = apiStatus();
    const dispatch = useDispatch();

    const { blogs, isBlogLoading, isBlogError, blogMessage } = useSelector((state) => state.blogs);
    const { userDetails, isUserDetailLoading, isUserDetailError, userDetailMessage } = useSelector(
        (state) => state.userDetail,
    );

    useEffect(() => {
        if (isBlogError) console.log(blogMessage);
        if (isUserDetailError) console.log(userDetailMessage);

        dispatch(getAllBlogs());
        dispatch(getAllUserDetails());

        return () => {
            dispatch(blogReset());
            dispatch(userDetailReset());
        };
    }, [dispatch, isBlogError, blogMessage, isUserDetailError, userDetailMessage]);

    const blogsData = blogs?.map((blog) => {
        const userDetail = userDetails?.find((user) => user.user === blog.user);

        const { username, avatar, verified } = userDetail || {};

        return {
            ...blog,
            username,
            avatar,
            verified,
        };
    });

    if (isBlogLoading || isUserDetailLoading || isApiLoading) {
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
                        {/* <div> */}
                        {/*    <LeftBlogSidebar /> */}
                        {/* <Tags tags={tags} /> */}
                        {/* </div> */}
                        <BlogCards blogs={blogsData} />
                    </MiddleContainer>
                </BlogsSection>
            </BlogsContainer>
        </Wrapper>
    );
};

export default Blogs;
