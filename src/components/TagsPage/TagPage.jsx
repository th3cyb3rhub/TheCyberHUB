import React, { useEffect, useState } from "react";
import apiStatus from "../../features/apiStatus";
import { useDispatch, useSelector } from "react-redux";
import { getAllBlogs, reset } from "../../features/blogs/blogSlice";
import { useParams } from "react-router-dom";
import { Wrapper } from "../Dashboard/Profile/ProfileElements";
import { AllBlogs, MiddleContainer } from "../Blogs/BlogsElements";
import NewBlogCard from "../Blogs/BlogCard/NewBlogCard";
import BlogsTags from "../Blogs/BlogsTags";
import { CTFCards, CTFLink, SearchBox, SearchIcon, SearchInput } from "../Other/CyberGames/CTF/CTFElements";
import { encodeURL } from "../Blogs/util";
import CtfCard from "../Other/CyberGames/CTF/CtfCard";
import { getAllCTFs } from "../../features/ctf/ctfSlice";
import UnderMaintenance from "../Other/UnderMaintenance/UnderMaintenance";

const TagPage = () => {
    const { isApiLoading, isApiWorking } = apiStatus();
    const dispatch = useDispatch();
    const { blogs, isLoading: isBlogsLoading, isError, message } = useSelector((state) => state.blogs);

    const { ctf, isLoading: isCtfLoading } = useSelector((state) => state.ctf);
    const blogTags = blogs.map((blog) => blog && blog.tags).flat();
    const ctfTags = ctf.map((ctf) => ctf && ctf.tags).flat();
    const tags = [...new Set([...blogTags, ...ctfTags])].sort();
    const { tag } = useParams();

    useEffect(() => {
        if (isError) {
            console.log(message);
        }
        dispatch(getAllBlogs());
        dispatch(getAllCTFs());

        return () => dispatch(reset());
    }, [dispatch, isError, message]);

    const [searchTerm, setSearchTerm] = useState("");
    const [filteredData, setFilteredData] = useState([]);

    useEffect(() => {
        const filteredData = Array.isArray(tags)
            ? searchTerm !== "" &&
              tags.filter((tag) => {
                  return tag?.toLowerCase().includes(searchTerm?.toLowerCase());
              })
            : tags;
        setFilteredData(filteredData);
    }, [ctf, searchTerm]);

    const filteredBlogs =
        filteredData.length > 0
            ? blogs?.filter((blog) => blog?.tags?.some((blogTag) => filteredData.includes(blogTag)))
            : blogs?.filter((blog) => blog?.tags?.includes(tag?.split("-").join(" ")));
    const filteredCTFs =
        filteredData.length > 0
            ? ctf?.filter((ctf) => ctf?.tags?.some((ctfTag) => filteredData.includes(ctfTag)))
            : ctf?.filter((ctf) => ctf?.tags?.includes(tag?.split("-").join(" ")));

    const handleSearchTermChange = (event) => {
        setSearchTerm(event.target.value);
    };

    if (isApiLoading || isBlogsLoading || isCtfLoading) return null;

    if (!isApiWorking) return <UnderMaintenance />;

    return (
        <Wrapper>
            <MiddleContainer>
                <div>
                    <SearchBox>
                        <SearchIcon />
                        <SearchInput
                            type="text"
                            placeholder="Search by name"
                            value={searchTerm}
                            onChange={handleSearchTermChange}
                        />
                    </SearchBox>
                    <BlogsTags tags={tags} />
                </div>
                <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: "25px" }}>
                    <AllBlogs>
                        {filteredBlogs && Array.isArray(filteredBlogs) ? (
                            filteredBlogs
                                ?.slice()
                                .reverse()
                                .map((blog) => <NewBlogCard key={blog?._id} blog={blog} />)
                        ) : (
                            <h3>There are no blogs to display</h3>
                        )}
                    </AllBlogs>
                    <CTFCards
                        style={{
                            background: "transparent",
                            padding: "0",
                        }}
                    >
                        {filteredCTFs &&
                            filteredCTFs
                                ?.slice()
                                .reverse()
                                .map((challenge, index) => (
                                    <CTFLink
                                        to={{ pathname: `/ctf/${encodeURL(challenge.challengeName)}` }}
                                        key={index}
                                    >
                                        <CtfCard challenge={challenge} index={index} />
                                    </CTFLink>
                                ))}
                    </CTFCards>
                </div>
            </MiddleContainer>
        </Wrapper>
    );
};

export default TagPage;
