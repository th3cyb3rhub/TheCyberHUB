import React, { useEffect, useState } from "react";
import {
    ExploreContainer,
    LeftContainer,
    RightContainer,
    SearchContainer,
    SearchTypeButton,
    SearchTypeContainer,
} from "./ExploreElements";
import { useDispatch, useSelector } from "react-redux";
import { getAllBlogs, reset } from "../../features/blogs/blogSlice";
import { Wrapper } from "../Dashboard/Profile/ProfileElements";
import { SearchBox, SearchIcon, SearchInput } from "../CaptureTheFlag/CTFElements";
import { getAllCTFs } from "../../features/ctf/ctfSlice";
import Users from "./Users/Users";
import Tags from "./Tags/Tags";
import { getAllUserDetails } from "../../features/userDetail/userDetailSlice";
import FeedPosts from "../Feeds/FeedPosts/FeedPosts";
import ForumPosts from "../Forum/ForumPosts/ForumPosts";
import { getForums } from "../../features/forum/forumSlice";
import { getAllFeeds } from "../../features/feeds/feedsSlice";
import BlogCards from "../Blogs/BlogCard/BlogCards";
import CtfChallenges from "../CaptureTheFlag/CTFCards/CtfChallenges";

const Explore = () => {
    const dispatch = useDispatch();
    // const {user} = useSelector(state => state.auth);
    const { userDetails } = useSelector((state) => state.userDetail);
    const { feeds } = useSelector((state) => state.feeds);
    const { blogs } = useSelector((state) => state.blogs);
    const { forums } = useSelector((state) => state.forums);
    const { ctf } = useSelector((state) => state.ctf);

    useEffect(() => {
        dispatch(getAllUserDetails());
        dispatch(getAllFeeds());
        dispatch(getAllBlogs());
        dispatch(getForums());
        dispatch(getAllCTFs());

        return () => dispatch(reset());
    }, [dispatch]);

    const blogTags = blogs.map((blog) => blog && blog.tags).flat();
    const ctfTags = ctf.map((ctf) => ctf && ctf.tags).flat();
    const forumTags = forums.map((forum) => forum && forum.tags).flat();
    const feedTags = feeds.map((feed) => feed && feed.tags).flat();

    const tags = [...new Set([...blogTags, ...ctfTags, ...forumTags, ...feedTags])].sort();

    const [searchTerm, setSearchTerm] = useState("");

    const handleSearchTermChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const [selectedType, setSelectedType] = useState("all");
    const types = [
        { value: "all", label: "ALL" },
        { value: "users", label: "Users" },
        { value: "blogs", label: "Blogs" },
        { value: "ctf", label: "CTF" },
        { value: "feeds", label: "Feeds" },
        { value: "forum", label: "Forum" },
        // jobs, internships, courses, events, quiz, interviewQues, tools
        // {value: 'jobs', label: 'Jobs'},
        // {value: 'internships', label: 'Internships'},
        // {value: 'courses', label: 'Courses'},
        // {value: 'events', label: 'Events'},
        // {value: 'quiz', label: 'Quiz'},
        // {value: 'interviewQues', label: 'Interview Questions'},
        // {value: 'tools', label: 'Tools'},
    ];

    const handleTypeSelect = (type) => {
        setSelectedType(type);
        // You can perform any additional actions here based on the selected type
    };

    return (
        <Wrapper>
            <ExploreContainer>
                <LeftContainer>
                    <SearchContainer>
                        <SearchBox>
                            <SearchIcon />
                            <SearchInput
                                type="text"
                                placeholder="Search by name"
                                value={searchTerm}
                                onChange={handleSearchTermChange}
                            />
                        </SearchBox>
                        <SearchTypeContainer>
                            {types.map((type) => (
                                <SearchTypeButton
                                    key={type.value}
                                    selected={selectedType === type.value}
                                    onClick={() => handleTypeSelect(type.value)}
                                >
                                    {type.label}
                                </SearchTypeButton>
                            ))}
                        </SearchTypeContainer>
                    </SearchContainer>

                    <Tags tags={tags} />
                </LeftContainer>

                <RightContainer>
                    {selectedType === "all" || selectedType === "users" ? (
                        <Users userDetails={userDetails} searchTerm={searchTerm} displayAt={"explore"} />
                    ) : null}

                    {selectedType === "all" || selectedType === "feeds" ? (
                        <FeedPosts feeds={feeds} searchTerm={searchTerm} displayAt={"explore"} />
                    ) : null}

                    {selectedType === "all" || selectedType === "blogs" ? (
                        <BlogCards blogs={blogs} searchTerm={searchTerm} displayAt={"explore"} />
                    ) : null}

                    {selectedType === "all" || selectedType === "forum" ? (
                        <ForumPosts forums={forums} searchTerm={searchTerm} displayAt={"explore"} />
                    ) : null}

                    {selectedType === "all" || selectedType === "ctf" ? (
                        <CtfChallenges ctf={ctf} searchTerm={searchTerm} displayAt={"explore"} />
                    ) : null}
                </RightContainer>
            </ExploreContainer>
        </Wrapper>
    );
};

export default Explore;
