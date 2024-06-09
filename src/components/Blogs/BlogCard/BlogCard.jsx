import React from "react";
import {
    BlogCardImage,
    BlogImageSection,
    ButtonDelete,
    ButtonEdit, // ButtonDelete,
    // ButtonEdit,
    Categories,
    Category,
    ContainerCard, // Description,
    DetailsSection,
    EditBlogSection, // EditBlogSection,
    FooterDetailsSection,
    MainSection,
    SubSection,
    Title,
    Username,
} from "./BlogCardElements";
import { RouterLink } from "src/components/Tools/ToolsElements";
import { encodeURL } from "src/components/Blogs/util";

import { cdnContentImagesUrl } from "src/features/apiUrl";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { BiEdit } from "react-icons/bi";
import { deleteBlog } from "src/features/blogs/blogSlice";
import { AiFillDelete } from "react-icons/ai";
import { PostStat, PostStatLabel } from "src/components/Feeds/FeedPosts/FeedPostsElements.jsx";
import { BsBookmarks, BsBookmarksFill } from "react-icons/bs";
import { addBookmark, removeBookmark } from "src/features/bookmarks/bookmarkSlice.js";

const image = "https://user-images.githubusercontent.com/44284877/210166161-ad2f71a7-df74-43b9-8330-af9740d9e8ba.png";

const BlogCard = ({ blog, bookmarks }) => {
    const pathname = window.location.pathname;
    const isDashboard = pathname.split("/").includes("my-blogs");
    const dispatch = useDispatch();
    const coverImage = blog?.coverImage;
    const coverImageUrl = cdnContentImagesUrl(`/blog/${coverImage}`) || image;
    const { user } = useSelector((state) => state.auth);

    const userId = user?._id;

    const isBookmarked = () => {
        return bookmarks?.some((bookmark) => bookmark.user === userId && bookmark.itemId === blog?._id);
    };

    const itemType = "blog";

    const handleBookmark = (_id) => {
        if (isBookmarked(_id)) {
            dispatch(removeBookmark({ itemType, itemId: _id }));
        } else {
            dispatch(addBookmark({ itemType, itemId: _id }));
        }
    };
    return (
        <ContainerCard>
            <span>
                {isDashboard && user?._id === blog?.user ? (
                    <EditBlogSection>
                        <ButtonDelete onClick={() => dispatch(deleteBlog(blog?._id))} style={{ padding: "2px 10px" }}>
                            <AiFillDelete size={25} /> Delete
                        </ButtonDelete>
                        <Link key={blog?._id} to={{ pathname: `edit/${encodeURL(blog?.title)}` }}>
                            <ButtonEdit style={{ padding: "2px 10px" }}>
                                <BiEdit size={25} /> Edit
                            </ButtonEdit>
                        </Link>
                    </EditBlogSection>
                ) : null}
                <DetailsSection>
                    <BlogImageSection>
                        <RouterLink to={{ pathname: `/blogs/${encodeURL(blog?.title)}` }}>
                            <BlogCardImage src={coverImageUrl || image} alt={""} />
                        </RouterLink>
                        <Username> @{blog?.username}</Username>
                    </BlogImageSection>
                </DetailsSection>
                <MainSection>
                    <SubSection>
                        <RouterLink to={{ pathname: `/blogs/${encodeURL(blog?.title)}` }}>
                            <Title> {blog?.title} </Title>
                        </RouterLink>
                    </SubSection>
                </MainSection>
            </span>
            <FooterDetailsSection>
                <Categories>
                    {blog?.tags
                        .slice(0, 3)
                        .map((tag, id) => (tag.length !== 0 ? <Category key={id}>{tag.slice(0, 18)}</Category> : null))}
                    {blog?.tags.length > 3 ? <Category>+ {blog?.tags.length - 3}</Category> : null}
                </Categories>

                <PostStat style={{ padding: "8px" }}>
                    <PostStatLabel onClick={() => handleBookmark(blog?._id)}>
                        {isBookmarked(blog?._id) ? <BsBookmarksFill /> : <BsBookmarks />}
                    </PostStatLabel>
                </PostStat>
            </FooterDetailsSection>
        </ContainerCard>
    );
};

export default BlogCard;
