import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { blogReset, getBlog } from "src/features/blogs/blogSlice";

import {
    BlogContent,
    BlogImage,
    BlogImageContainer,
    BlogSummary,
    BlogTitle,
    ContainerViewBlog,
    ContentSection,
    Tag,
    Tags,
    UsernameAndDate,
    ViewBlogHeader,
} from "src/components/Blogs/ViewBlog/ViewBlogElements";

import NotFound from "src/NotFound";
import { cdnContentImagesUrl } from "src/features/apiUrl";
import apiStatus from "src/features/apiStatus";
import { Wrapper } from "src/components/Dashboard/Profile/ProfileElements";
import { CircleSpinner } from "react-spinners-kit";
import UnderMaintenance from "src/components/Other/UnderMaintenance/UnderMaintenance";

import "react-quill/dist/quill.bubble.css";
import { RouterLink } from "src/components/Tools/ToolsElements";
import DOMPurify from "dompurify";
import { getBookmarks } from "src/features/bookmarks/bookmarkSlice.js";

import BlogComments from "src/components/Blogs/ViewBlog/BlogComments/BlogComments.jsx";

const ViewBlog = () => {
    const dispatch = useDispatch();
    const { isApiLoading, isApiWorking } = apiStatus();
    const { title } = useParams();
    const { blog, isBlogLoading, isBlogError, blogMessage } = useSelector((state) => state.blogs);

    useEffect(() => {
        if (isBlogError) console.log(blogMessage);

        dispatch(getBlog(title?.slice(-8)));
        dispatch(getBookmarks());

        return () => {
            dispatch(blogReset());
        };
    }, [dispatch, title, isBlogError, blogMessage]);

    if (isBlogLoading || isApiLoading) {
        return (
            <Wrapper>
                <CircleSpinner size={25} color={"#ff6b08"} isBlogLoading={isBlogLoading || isApiLoading} />
            </Wrapper>
        );
    }

    if (!isApiWorking) return <UnderMaintenance />;

    if (!blog) return <NotFound />;

    const blogUnFormattedDate = new Date(blog?.createdAt);

    const blogCreatedAt = new Intl.DateTimeFormat("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
    }).format(blogUnFormattedDate);

    const coverImage = blog?.coverImage;
    const coverImageUrl = cdnContentImagesUrl(`/blog/${coverImage}`);

    const filterContent = blog?.content.replace(/src="(\d+\.(?:png|jpe?g|gif))"/g, (match, filename) => {
        const blobUrl = `${cdnContentImagesUrl(`/blog/${filename}`)}`;
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

    const purifiedCode = DOMPurify.sanitize(filterContent);

    return (
        <ContainerViewBlog>
            <ViewBlogHeader>
                <BlogImageContainer>
                    <BlogImage src={coverImageUrl} alt={""} />
                    <BlogTitle> {blog?.title} </BlogTitle>
                </BlogImageContainer>
                <UsernameAndDate>
                    <RouterLink to={`/user/${blog?.username}`}>@{blog?.username}</RouterLink> • {blogCreatedAt}
                </UsernameAndDate>
                <ContentSection>
                    <BlogSummary>{blog?.summary}</BlogSummary>
                </ContentSection>
                <ContentSection>
                    <BlogContent
                        value={purifiedCode}
                        readOnly={true}
                        modules={{ toolbar: false }}
                        formats={formats}
                        theme={"bubble"}
                    />
                </ContentSection>
            </ViewBlogHeader>
            <Tags>
                {blog?.tags?.map((tag, id) => (tag?.length !== 0 ? <Tag key={id}> {tag?.slice(0, 40)} </Tag> : <></>))}
            </Tags>

            <BlogComments blogId={blog?._id} />
        </ContainerViewBlog>
    );
};

export default ViewBlog;
