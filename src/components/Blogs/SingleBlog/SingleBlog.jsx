import React from "react";
import { Wrapper } from "src/components/Dashboard/Profile/ProfileElements";
import ViewBlog from "src/components/Blogs/ViewBlog/ViewBlog";
import { ContainerSingleBlog } from "src/components/Blogs/SingleBlog/SingleBlogElements";

const SingleBlog = () => {
    return (
        <Wrapper>
            <ContainerSingleBlog>
                <ViewBlog />
            </ContainerSingleBlog>
        </Wrapper>
    );
};

export default SingleBlog;
