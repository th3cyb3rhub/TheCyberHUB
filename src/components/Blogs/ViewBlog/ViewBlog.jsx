import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { encodeURL } from "../util";
import { useDispatch, useSelector } from "react-redux";
import { getAllBlogs, reset } from "../../../features/blogs/blogSlice";
import { Helmet } from "react-helmet";

import {
    BlogContent,
    BlogImage,
    BlogImageContainer,
    BlogSummary,
    BlogTitle,
    CommentContainer,
    ContainerViewBlog,
    ContentSection,
    Tag,
    Tags,
    // UsernameAndDate,
    ViewBlogHeader,
} from "./ViewBlogElements";

import NotFound from "../../../NotFound";
import { toast } from "react-toastify";
import { CircleSpinner } from "react-spinners-kit";
import { getCdnBlogImages } from "../../../features/apiUrl";
import apiStatus from "../../../features/apiStatus";
import { Wrapper } from "../../Dashboard/Profile/ProfileElements";
import UnderMaintenance from "../../Other/UnderMaintenance/UnderMaintenance";

import "react-quill/dist/quill.bubble.css";
// import {RouterLink} from "../../Beta/Tools/ToolsElements";
// import PostActionsAndStats from "../../Feeds/FeedPosts/PostActionsAndStats";
// import AddCommentForm from "../BlogComments/AddCommentForm";
import BlogComments from "../BlogComments/BlogComments";

const ViewBlog = () => {
    const { isApiLoading, isApiWorking } = apiStatus();
    const { title } = useParams();
    const { blogs, isLoading, isError, message } = useSelector((state) => state.blogs);
    const dispatch = useDispatch();

    // const {user} = useSelector(state => state.auth);

    useEffect(() => {
        if (isError) {
            toast.error(message);
        }

        dispatch(getAllBlogs());
        // dispatch(getBookmarks());
        return () => {
            dispatch(reset());
        };
    }, [dispatch, isError, message]);

    if (isLoading || isApiLoading) {
        return (
            <Wrapper>
                <CircleSpinner size={25} color={"#1fc10d"} isLoading={isLoading || isApiLoading} />
            </Wrapper>
        );
    }

    if (!isApiWorking) return <UnderMaintenance />;

    const blog = blogs?.find((blog) => `${encodeURL(blog?.title)}`.toLowerCase() === title.toLowerCase());

    if (!blog) return <NotFound />;

    // const blogUnFormattedDate = new Date(blog?.createdAt);

    // const blogCreatedAt = new Intl.DateTimeFormat("en-US", {
    //     month: "short",
    //     day: "numeric",
    //     year: "numeric",
    // }).format(blogUnFormattedDate);

    const coverImage = blog?.coverImage;
    const coverImageUrl = `${getCdnBlogImages}/blog/${coverImage}`;

    const filterContent = blog?.content.replace(/src="blog-content-(\d+\.(?:png|jpe?g|gif))"/g, (match, filename) => {
        // You can construct the Azure Blob Storage URL here based on the filename
        const blobUrl = `https://storagethecyberhub.blob.core.windows.net/thecyberhub-assets/development/blog/blog-content-${filename}`;
        return `src="${blobUrl}" alt=${blog?.title} `;
    });

    const formats = [
        "header",
        "bold",
        "italic",
        "underline",
        "strike",
        "blockquote",
        "list",
        "bullet",
        "indent",
        "list-style",
        "link",
        "image",
        "code-block",
    ];

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
            {/* <ViewBlogContainer> */}
            <ContainerViewBlog>
                <ViewBlogHeader>
                    <BlogImageContainer>
                        <BlogImage src={coverImageUrl} alt={""} />
                        <BlogTitle> {blog?.title} </BlogTitle>
                    </BlogImageContainer>

                    <ContentSection>
                        <BlogSummary>{blog?.summary}</BlogSummary>
                    </ContentSection>
                    <ContentSection>
                        <BlogContent
                            value={filterContent}
                            readOnly={true}
                            modules={{ toolbar: false }}
                            formats={formats}
                            theme={"bubble"}
                        />
                    </ContentSection>
                </ViewBlogHeader>
                <Tags>
                    {blog?.tags.map((tag, id) => (tag.length !== 0 ? <Tag key={id}> {tag.slice(0, 40)} </Tag> : <></>))}
                </Tags>

                {/* <PostActionsAndStats post={blog} user={user} itemType={"blog"}/> */}

                <CommentContainer>
                    {/* <BlogComments blog={blog} isError={isError} message={message} /> */}
                    {/* <ViewComments comments={blog?.comments} /> */}
                    <BlogComments blog={blog} />
                </CommentContainer>
                {/* <UsernameAndDate> */}
                {/*    <RouterLink to={`/@${blog?.username}`}>@{blog?.username}</RouterLink> • {blogCreatedAt} */}
                {/* </UsernameAndDate> */}
            </ContainerViewBlog>
            {/* <LeftBlogSidebar/> */}
            {/* </ViewBlogContainer> */}
        </>
    );
};

export default ViewBlog;
