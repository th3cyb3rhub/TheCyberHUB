import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { encodeURL } from "../util";
import { useDispatch, useSelector } from "react-redux";
import { getAllBlogs, reset } from "../../../features/blogs/blogSlice";
import { Helmet } from "react-helmet";

import {
    BlogImage,
    BlogImageContainer,
    BlogTitle,
    CommentContainer,
    ContainerViewBlog,
    ContentSection,
    Tag,
    TagsSection,
    UsernameAndDate,
    ViewBlogHeader,
} from "./ViewBlogElements";
import NotFound from "../../../NotFound";
import PreviewMarkdown from "./PreviewMarkdown";
import BlogComments from "../Comments/BlogComments";

const ViewBlog = () => {
    const { title } = useParams();

    const { blogs, isError, message } = useSelector((state) => state.blogs);
    const dispatch = useDispatch();

    useEffect(() => {
        if (isError) {
            console.log(message);
        }
        dispatch(getAllBlogs());
        return () => {
            dispatch(reset());
        };
    }, [dispatch, isError, message]);

    const blog = blogs.find(
        (blog) =>
            `${encodeURL(blog.title)}-by-${blog.username}`.toLowerCase() === title.toLowerCase() &&
            title.toLowerCase().includes(blog.username),
    );

    if (!blog) return <NotFound />;
    const blogUnFormattedDate = new Date(blog?.createdAt);
    const blogCreatedAt = new Intl.DateTimeFormat("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
    }).format(blogUnFormattedDate);

    const API_URL = import.meta.env.VITE_CDN_URL;
    const coverImage = blog?.coverImage;
    const coverImageUrl = `${API_URL}/blog_images/${coverImage}`;

    return (
        <>
            <Helmet>
                <meta property="og:title" content={blog?.title} />
                <meta property="og:description" content={blog?.description} />
                <meta property="og:image" content={coverImageUrl} />
                <meta property="og:url" content={`https://dev.thecyberhub.org/blogs/${encodeURL(blog?.title)}`} />
            </Helmet>
            <ContainerViewBlog>
                <ViewBlogHeader>
                    <BlogImageContainer>
                        <BlogImage src={coverImageUrl} alt={coverImage} />
                    </BlogImageContainer>
                    <BlogTitle> {blog?.title} </BlogTitle>
                    <UsernameAndDate>
                        @{blog?.username} | {blogCreatedAt}
                    </UsernameAndDate>
                    <ContentSection>
                        <PreviewMarkdown content={blog?.content} />
                    </ContentSection>
                </ViewBlogHeader>
                <TagsSection>
                    {blog?.tags.map((tag, id) => (tag.length !== 0 ? <Tag key={id}>{tag.slice(0, 40)}</Tag> : <></>))}
                </TagsSection>
                <CommentContainer>
                    <BlogComments blog={blog} />
                    {/* <ViewComments comments={blog?.comments} /> */}
                    {/* <AddCommentForm blog_id={blog?._id} isLoading={isLoading} /> */}
                </CommentContainer>
            </ContainerViewBlog>
        </>
    );
};

export default ViewBlog;
