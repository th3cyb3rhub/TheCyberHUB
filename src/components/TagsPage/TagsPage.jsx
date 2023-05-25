import React, { useEffect } from "react";
import { TagsPageContainer } from "./TagsPageElements";
import apiStatus from "../../features/apiStatus";
import { useDispatch, useSelector } from "react-redux";
import { getAllBlogs, reset } from "../../features/blogs/blogSlice";
import BlogsTags from "../Blogs/BlogsTags";
import { Wrapper } from "../Dashboard/Profile/ProfileElements";
import UnderMaintenance from "../Other/UnderMaintenance/UnderMaintenance";

const TagsPage = () => {
    const { isApiLoading, isApiWorking } = apiStatus();
    const dispatch = useDispatch();
    const { blogs, isLoading: isBlogsLoading, isError, message } = useSelector((state) => state.blogs);

    const { ctf, isLoading: isCtfLoading } = useSelector((state) => state.ctf);
    const blogTags = blogs.map((blog) => blog.tags).flat();
    const ctfTags = ctf.map((ctf) => ctf && ctf.tags).flat();

    const tags = [...new Set([...blogTags, ...ctfTags])].sort();

    console.log(tags);

    useEffect(() => {
        if (isError) {
            console.log(message);
        }
        dispatch(getAllBlogs());
        return () => dispatch(reset());
    }, [dispatch, isError, message]);

    if (isApiLoading || isBlogsLoading || isCtfLoading) return null;

    if (!isApiWorking) return <UnderMaintenance />;

    return (
        <Wrapper>
            <TagsPageContainer>
                <BlogsTags
                    style={{
                        width: "100%",
                    }}
                    tags={tags}
                />
            </TagsPageContainer>
        </Wrapper>
    );
};

export default TagsPage;
