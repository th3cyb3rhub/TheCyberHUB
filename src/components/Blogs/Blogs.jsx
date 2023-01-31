import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllBlogs, reset } from "../../features/blogs/blogSlice";
import { Wrapper } from "../Dashboard/Profile/ProfileElements";
import { AllBlogs, BlogsComponent, MiddleContainer } from "./BlogsElements";
import { RouterButtonLink } from "./ManageBlogs/CreateBlog/CreateBlogElements";
import { CircleSpinner } from "react-spinners-kit";
import NewBlogCard from "./BlogCard/NewBlogCard";

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

    // if (isLoading) return <CircleSpinner size={20} color={"#1fc10d"} />;

    return (
        <Wrapper>
            <RouterButtonLink to={"/dashboard/blogs/create"}> Create Blog </RouterButtonLink>
            <BlogsComponent>
                {isLoading ? (
                    <CircleSpinner size={20} color={"#1fc10d"} />
                ) : (
                    <MiddleContainer>
                        {blogs && blogs?.length > 0 ? (
                            <AllBlogs>
                                {blogs.map((blog) => (
                                    <NewBlogCard key={blog?._id} blog={blog} />
                                ))}
                            </AllBlogs>
                        ) : (
                            <>
                                {" "}
                                <h3>There are no blogs to display</h3>{" "}
                            </>
                        )}
                    </MiddleContainer>
                )}
            </BlogsComponent>
        </Wrapper>
    );
};

export default Blogs;
