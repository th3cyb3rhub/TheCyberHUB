import React from "react";
import {
    BlogCardImage,
    BlogImageSection,
    ButtonDelete,
    ButtonEdit,
    Categories,
    Category,
    ContainerCard,
    Description,
    DetailsSection,
    EditBlogSection,
    FooterDetailsSection,
    MainSection,
    SubSection,
    Title,
    Username,
} from "./NewBlogCardElements";
import { RouterLink } from "../../Beta/Tools/ToolsElements";
import { encodeURL } from "../util";
import { AiFillDelete, BiEdit } from "react-icons/all";
import { deleteBlog } from "../../../features/blogs/blogSlice";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getCDNUrl } from "../../../features/apiUrl";

const image = "https://user-images.githubusercontent.com/44284877/210166161-ad2f71a7-df74-43b9-8330-af9740d9e8ba.png";
const API_URL = getCDNUrl;

const NewBlogCard = ({ blog }) => {
    const coverImage = blog?.coverImage;
    const coverImageUrl = `${API_URL}/images/blog/${coverImage}` || image;
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);
    const { pathname } = useLocation();

    return (
        <ContainerCard>
            <MainSection>
                <SubSection>
                    <RouterLink to={{ pathname: `/blogs/@${blog.username}/${encodeURL(blog.title)}` }}>
                        <Title> {blog.title} </Title>
                        <Description> {blog.content.slice(0, 125)} </Description>
                    </RouterLink>
                </SubSection>
                <DetailsSection>
                    <BlogImageSection>
                        <EditBlogSection>
                            {pathname !== "/blogs" && user && user._id === blog.user ? (
                                <Link key={blog._id} to={{ pathname: `edit/${encodeURL(blog.title)}` }}>
                                    <ButtonEdit style={{ padding: "2px 10px" }}>
                                        <BiEdit />
                                    </ButtonEdit>
                                </Link>
                            ) : null}
                            {pathname !== "/blogs" && user && user._id === blog.user ? (
                                <ButtonDelete
                                    onClick={() => dispatch(deleteBlog(blog._id))}
                                    style={{ padding: "2px 10px" }}
                                >
                                    <AiFillDelete />
                                </ButtonDelete>
                            ) : null}
                        </EditBlogSection>
                        <BlogCardImage src={coverImageUrl || image} alt={blog.coverImage} width="100%" height="auto" />
                    </BlogImageSection>
                </DetailsSection>
            </MainSection>
            <FooterDetailsSection>
                <Categories>
                    {blog.tags
                        .slice(0, 3)
                        .map((tag, id) => (tag.length !== 0 ? <Category key={id}>{tag.slice(0, 30)}</Category> : null))}

                    {blog.tags.length > 3 ? <Category>+ {blog.tags.length - 3}</Category> : null}
                </Categories>
                <Username> @{blog.username}</Username>
            </FooterDetailsSection>
        </ContainerCard>
    );
};

export default NewBlogCard;
