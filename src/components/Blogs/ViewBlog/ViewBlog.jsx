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
import { toast } from "react-toastify";
import { CircleSpinner } from "react-spinners-kit";
import { getCDNUrlContent } from "../../../features/apiUrl";
import { RouterLink } from "../../Beta/Tools/ToolsElements";

const ViewBlog = () => {
    const { title } = useParams();

    const { blogs, isLoading, isError, message } = useSelector((state) => state.blogs);
    const dispatch = useDispatch();

    useEffect(() => {
        if (isError) {
            console.log(message);
            if (message === "AxiosError: Request failed with status code 429") {
                toast("You have reached the maximum number of requests. Please try again later.", { type: "error" });
            }
        }

        dispatch(getAllBlogs());
        return () => {
            dispatch(reset());
        };
    }, [dispatch, isError, message]);

    const blog = blogs.find((blog) => `${encodeURL(blog.title)}`.toLowerCase() === title.toLowerCase());

    if (isLoading) {
        return (
            <>
                <CircleSpinner size={100} color="#20c20e" loading={isLoading} />
            </>
        );
    }
    if (!blog) return <NotFound />;

    const blogUnFormattedDate = new Date(blog?.createdAt);
    const blogCreatedAt = new Intl.DateTimeFormat("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
    }).format(blogUnFormattedDate);

    const API_URL = getCDNUrlContent;
    const coverImage = blog?.coverImage;
    const coverImageUrl = `${API_URL}/images/blog/${coverImage}`;

    return (
        <>
            <Helmet>
                <meta property="og:title" content={blog?.title} />
                <meta property="og:description" content={blog?.description} />
                <meta property="og:image" content={coverImageUrl} />
                <meta
                    property="og:url"
                    content={`https://thecyberhub.org/blogs/@${blog.username}/${encodeURL(blog?.title)}`}
                />
            </Helmet>
            <ContainerViewBlog>
                <ViewBlogHeader>
                    <BlogImageContainer>
                        <BlogImage src={coverImageUrl} alt={coverImage} />
                    </BlogImageContainer>
                    <BlogTitle> {blog?.title} </BlogTitle>
                    <UsernameAndDate>
                        <RouterLink to={`/@${blog?.username}`}>@{blog?.username}</RouterLink> • {blogCreatedAt}
                    </UsernameAndDate>
                    <ContentSection>
                        <PreviewMarkdown content={blog?.content} />
                    </ContentSection>
                </ViewBlogHeader>
                <TagsSection>
                    {blog?.tags.map((tag, id) => (tag.length !== 0 ? <Tag key={id}>{tag.slice(0, 40)}</Tag> : <></>))}
                </TagsSection>
                <CommentContainer>
                    <BlogComments blog={blog} isError={isError} message={message} />
                    {/* <ViewComments comments={blog?.comments} /> */}
                    {/* <AddCommentForm blog_id={blog?._id} isLoading={isLoading} /> */}
                </CommentContainer>
            </ContainerViewBlog>
        </>
    );
};

export default ViewBlog;
