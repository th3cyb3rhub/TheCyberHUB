import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { encodeURL } from "src/components/Blogs/util";
import { useDispatch, useSelector } from "react-redux";
import { blogReset, getAllBlogs, getBlog } from "src/features/blogs/blogSlice";
import { Helmet, HelmetProvider } from "react-helmet-async";
import ReactBar from "src/components/Blogs/ReactBarr/ReactBar"; // Ensure this path is correct

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
    UsernameAndDate,
    ViewBlogHeader,
} from "src/components/Blogs/ViewBlog/ViewBlogElements";

import NotFound from "src/NotFound";
import { CircleSpinner } from "react-spinners-kit";
import { cdnContentImagesUrl } from "src/features/apiUrl";
import apiStatus from "src/features/apiStatus";
import { Wrapper } from "src/components/Dashboard/Profile/ProfileElements";
import UnderMaintenance from "src/components/Other/UnderMaintenance/UnderMaintenance";

import "react-quill/dist/quill.bubble.css";
import BlogComments from "src/components/Blogs/ViewBlog/BlogComments/BlogComments";
import ViewComments from "src/components/Blogs/ViewBlog/BlogComments/ViewComments";
import { blogCommentReset, getBlogComments } from "src/features/blogs/blogComments/blogCommentSlice";
import { getAllUserDetails, userDetailReset } from "src/features/userDetail/userDetailSlice";
import { RouterLink } from "src/components/Tools/ToolsElements";
import DOMPurify from "dompurify";
import { addBookmark, getBookmarks, removeBookmark } from "src/features/bookmarks/bookmarkSlice.js";
const ViewBlog = () => {
    const dispatch = useDispatch();
    const { isApiLoading, isApiWorking } = apiStatus();
    const { title } = useParams();
    const { blogs, isBlogLoading, isBlogError, blogMessage } = useSelector((state) => state.blogs);
    const { blog } = useSelector((state) => state.blogs);
    const { blogComments } = useSelector((state) => state.blogComments);
    const { userDetails, isUserDetailLoading, isUserDetailError, userDetailMessage } = useSelector(
        (state) => state.userDetail,
    );
    const { bookmarks } = useSelector((state) => state.bookmarks);
    const { user } = useSelector((state) => state.auth);
    const [blogId, setBlogId] = useState(null);

    useEffect(() => {
        if (isBlogError) console.log(blogMessage);
        if (isUserDetailError) console.log(userDetailMessage);

        dispatch(getAllBlogs());
        dispatch(getBlog(blogId));
        dispatch(getBlogComments());
        dispatch(getAllUserDetails());
        dispatch(getBookmarks());

        return () => {
            dispatch(blogReset());
            dispatch(blogCommentReset());
            dispatch(userDetailReset());
        };
    }, [dispatch, isBlogError, blogMessage, isUserDetailError, userDetailMessage]);

    useEffect(() => {
        const blogData = blogs?.find(
            (blog) => `${encodeURL(blog?.title)}-${blog?._id.slice(5, 10)}`.toLowerCase() === title.toLowerCase(),
        );
        setBlogId(blogData._id);
    }, []);

    if (isBlogLoading || isUserDetailLoading || isApiLoading) {
        return (
            <Wrapper>
                <CircleSpinner size={25} color={"#ff6b08"} isBlogLoading={isBlogLoading || isApiLoading} />
            </Wrapper>
        );
    }

    if (!isApiWorking) return <UnderMaintenance />;
    const userId = user?._id;

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
        // You can construct the Azure Blob Storage URL here based on the filename
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

    const blogsCommentsData = blogComments?.map((comments) => {
        const userDetail = userDetails?.find((user) => user?.user === comments.user);
        const { username, avatar, verified } = userDetail || {};

        return {
            ...comments,
            username,
            avatar,
            verified,
        };
    });

    const blogCommentsData = blogsCommentsData.filter((comment) => comment.blogId === blog?._id);

    const purifiedCode = DOMPurify.sanitize(filterContent);

    const isBookmarked = () => {
        return bookmarks?.some((bookmark) => bookmark.user === userId && bookmark.itemId === blog?._id);
    };

    const itemType = "blog";

    const handleBookmark = (_id) => {
        // if (!user) {
        //     setShowAuthPopup(true);
        //     // setStopRefresh && setStopRefresh(true);
        //     return;
        // }
        if (isBookmarked(_id)) {
            dispatch(removeBookmark({ itemType, itemId: _id }));
        } else {
            dispatch(addBookmark({ itemType, itemId: _id }));
        }
    };
    return (
        <HelmetProvider>
            <Helmet>
                <meta property="og:title" content={blog?.title} />
                <meta property="og:description" content={blog?.description} />
                <meta property="og:image" content={coverImageUrl} />
                <meta
                    property="og:url"
                    content={`https://thecyberhub.org/blogs/${encodeURL(blog?.title)}-${blog?._id.slice(5, 10)}`}
                />
            </Helmet>
            {/* <ViewBlogContainer> */}
            <ContainerViewBlog>
                <ViewBlogHeader>
                    {/* <Tag> {blog?.category} </Tag> */}

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
                    {blog?.tags.map((tag, id) => (tag.length !== 0 ? <Tag key={id}> {tag.slice(0, 40)} </Tag> : <></>))}
                </Tags>

                {/* <PostActionsAndStats post={blog} user={user} itemType={"blog"}/> */}

                <CommentContainer id={"comments"}>
                    {/* <BlogComments blog={blog} isBlogError={isBlogError} blogMessage={blogMessage} /> */}
                    <ViewComments comments={blogCommentsData} />
                    <BlogComments blogId={blog._id} />
                </CommentContainer>
            </ContainerViewBlog>
            {/* <LeftBlogSidebar/> */}
            {/* </ViewBlogContainer> */}
            <ReactBar blog={blog} isBookmarked={isBookmarked} handleBookmark={handleBookmark} />{" "}
            {/* Fixed ReactBar component at the bottom */}
        </HelmetProvider>
    );
};

export default ViewBlog;
