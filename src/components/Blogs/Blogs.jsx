import React, { useEffect, useState } from "react";
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
import { getFollowData, reset } from "../../../src/features/follow/followSlice";
import BlogFilter from "./BlogFilter";

const Blogs = () => {
    const [selectedBlogs, setSelectedBlogs] = useState("all");

    const { user } = useSelector((state) => state.auth);

    const handleSelectedBlogs = (e) => {
        setSelectedBlogs(e.target.value);
    };

    const { isApiLoading, isApiWorking } = apiStatus();
    const dispatch = useDispatch();

    const { blogs, isBlogLoading, isBlogError, blogMessage } = useSelector((state) => state.blogs);
    const { userDetails, isUserDetailLoading, isUserDetailError, userDetailMessage } = useSelector(
        (state) => state.userDetail,
    );

    const userId = user?._id;

    const { followData } = useSelector((state) => state.followData);
    useEffect(() => {
        if (isBlogError) console.log(blogMessage);
        if (isUserDetailError) console.log(userDetailMessage);
        if (userId) dispatch(getFollowData(userId));
        dispatch(getAllBlogs());
        dispatch(getAllUserDetails());

        return () => {
            dispatch(reset());
            dispatch(blogReset());
            dispatch(userDetailReset());
        };
    }, [dispatch, isBlogError, blogMessage, isUserDetailError, userDetailMessage, userId]);

    const userDetailsfunction = (blog) => {
        const userDetail = userDetails?.find((user) => user.user === blog.user);
        const { username, avatar, verified } = userDetail || {};

        return {
            ...blog,
            username,
            avatar,
            verified,
        };
    };

    const blogsData = blogs?.map((blog) => {
        return userDetailsfunction(blog);
    });

    const followingBlogData = blogs?.map((blog) => {
        if (!followData?.following?.includes(blog.user)) {
            return null;
        }
        return userDetailsfunction(blog);
    });
    const filteredBlogs = followingBlogData?.filter((blog) => blog !== null);

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
                    {user && <BlogFilter selectedBlogs={selectedBlogs} handleSelectedBlogs={handleSelectedBlogs} />}

                    <MiddleContainer>
                        {/* <div> */}
                        {/*    <LeftBlogSidebar /> */}
                        {/* <Tags tags={tags} /> */}
                        {/* </div> */}
                        <BlogCards blogs={selectedBlogs === "all" ? blogsData : filteredBlogs} />
                    </MiddleContainer>
                </BlogsSection>
            </BlogsContainer>
        </Wrapper>
    );
};

export default Blogs;
