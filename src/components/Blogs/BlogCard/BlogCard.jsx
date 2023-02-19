import React from "react";
import {
    BlogsContainer,
    BlogsContainerTitle,
    BottomSection,
    Counts,
    Tag,
    Tags,
    Bookmark,
    Comments,
    Likes,
    Views,
} from "./BlogCardElements";
import {
    AiOutlineLike,
    AiTwotoneLike,
    BsBookmarks,
    BsFillBookmarksFill,
    CgEye,
    CgEyeAlt,
    MdModeComment,
    MdOutlineModeComment,
} from "react-icons/all";
import { deleteBlog } from "../../../features/blogs/blogSlice";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { encodeURL } from "../util";
import { getCDNUrl } from "../../../features/apiUrl";
const image = "https://user-images.githubusercontent.com/44284877/210166161-ad2f71a7-df74-43b9-8330-af9740d9e8ba.png";
const BlogCard = ({ blog }) => {
    const liked = true;
    const viewed = true;
    const bookmarked = true;
    const commented = true;

    const blogUnFormattedDate = new Date(blog.createdAt);
    const blogCreatedAt = new Intl.DateTimeFormat("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
    }).format(blogUnFormattedDate);
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);
    const { pathname } = useLocation();

    const API_URL = getCDNUrl;

    const coverImage = blog?.coverImage;
    const coverImageUrl = `${API_URL}/blog_images/${coverImage}`;

    return (
        <BlogsContainer>
            <BlogsContainerTitle>
                {pathname !== "/blogs" && user && user._id === blog.user ? (
                    <button onClick={() => dispatch(deleteBlog(blog._id))} style={{ padding: "2px 10px" }}>
                        X
                    </button>
                ) : null}
                {pathname !== "/blogs" && user && user._id === blog.user ? (
                    <Link key={blog._id} to={{ pathname: `edit/${encodeURL(blog.title)}` }}>
                        <button style={{ padding: "2px 10px" }}>+</button>
                    </Link>
                ) : null}
                <div className="blogImage-wrapper">
                    <img src={coverImageUrl || image} alt="Blog Image" width="100%" height="auto" />
                </div>
                <h3>{blog.title}</h3>
                <h6>
                    @{blog.username} • {blogCreatedAt}
                </h6>
            </BlogsContainerTitle>
            {/* <div> */}
            {/*   {blog.content.slice(0, 200)} */}
            {/*   {blog.content.length > 200 ? "..." : ""} */}
            {/* </div> */}
            <BottomSection>
                <Bookmark> {bookmarked ? <BsFillBookmarksFill /> : <BsBookmarks />} </Bookmark>
                <Tags>
                    {blog.tags.slice(0, 2).map((tag, index) => (
                        <Tag key={index}>{tag}</Tag>
                    ))}
                    {blog.tags.length > 2 ? <Tag>+{blog.tags.length - 2}</Tag> : null}
                </Tags>
                <Counts>
                    <Comments> {commented ? <MdModeComment /> : <MdOutlineModeComment />} 10 </Comments>
                    <Likes> {liked ? <AiTwotoneLike /> : <AiOutlineLike />} 100 </Likes>
                    <Views> {viewed ? <CgEyeAlt /> : <CgEye />} 1000 </Views>
                </Counts>
            </BottomSection>
        </BlogsContainer>
    );
};

export default BlogCard;
