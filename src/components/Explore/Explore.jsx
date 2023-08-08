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
import { Wrapper } from "../Dashboard/Profile/ProfileElements";
import { SearchBox, SearchIcon, SearchInput } from "../CaptureTheFlag/CTFElements";
import { getAllCTFs } from "../../features/ctf/ctfSlice";
import { blogReset, getAllBlogs } from "../../features/blogs/blogSlice";
import { getAllUserDetails, userDetailReset } from "../../features/userDetail/userDetailSlice";
import { feedReset, getAllFeeds } from "../../features/feeds/feedsSlice";
import Users from "./Users/Users";
import FeedsExplore from "./FeedsExplore";
import Tags from "./Tags/Tags";
import BlogCards from "../Blogs/BlogCard/BlogCards";
import CtfChallenges from "../CaptureTheFlag/CTFCards/CtfChallenges";
import apiStatus from "../../features/apiStatus";
import UnderMaintenance from "../Other/UnderMaintenance/UnderMaintenance";
import LoadingSpinner from "../Other/MixComponents/Spinner/LoadingSpinner";

const Explore = () => {
    const dispatch = useDispatch();

    // const {user} = useSelector(state => state.auth);
    const { isApiLoading, isApiWorking } = apiStatus();
    const { userDetails } = useSelector((state) => state.userDetail);
    const { feeds, isFeedLoading } = useSelector((state) => state.feeds);
    const { blogs } = useSelector((state) => state.blogs);
    const { ctf } = useSelector((state) => state.ctf);
    // const {forums} = useSelector((state) => state.forums);

    useEffect(() => {
        dispatch(getAllUserDetails());
        dispatch(getAllFeeds());
        dispatch(getAllBlogs());
        // dispatch(getForums());
        dispatch(getAllCTFs());

        return () => {
            dispatch(blogReset());
            dispatch(userDetailReset());
            dispatch(feedReset());
        };
    }, [dispatch]);

    const blogTags = blogs?.map((blog) => blog && blog?.tags).flat() || [];
    const ctfTags = ctf?.map((ctf) => ctf && ctf?.tags).flat() || [];
    const feedTags = feeds?.map((feed) => feed && feed?.tags).flat() || [];
    // const forumTags = forums.map((forum) => forum && forum.tags).flat() || [];

    const tags = [
        ...new Set([
            ...feedTags,
            ...blogTags,
            ...ctfTags,
            // ...forumTags,
        ]),
    ].sort();

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
        // {value: "forum", label: "Forum"},
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

    const feedData = feeds
        ?.slice()
        .reverse()
        .slice(0, 10)
        .reverse()
        .map((feed) => {
            const userDetail = userDetails?.find((user) => user.user === feed.user);
            const { username, avatar, verified } = userDetail || {};

            return { ...feed, username, avatar, verified };
        });

    const blogsData = blogs
        .slice()
        .reverse()
        .slice(0, 10)
        .reverse()
        .map((blog) => {
            const userDetail = userDetails?.find((user) => user.user === blog.user);
            const { username, avatar, verified } = userDetail || {};

            return { ...blog, username, avatar, verified };
        });

    const ctfData = ctf
        .slice()
        .reverse()
        .slice(0, 10)
        .reverse()
        .map((ctf) => {
            const userDetail = userDetails?.find((user) => user.user === ctf.user);
            const { username, avatar, verified } = userDetail || {};

            return { ...ctf, username, avatar, verified };
        });

    if (isApiLoading) return <LoadingSpinner />;

    if (!isApiWorking) return <UnderMaintenance />;

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
                        <FeedsExplore
                            feeds={feedData}
                            isFeedLoading={isFeedLoading}
                            searchTerm={searchTerm}
                            displayAt={"explore"}
                        />
                    ) : null}

                    {selectedType === "all" || selectedType === "blogs" ? (
                        <BlogCards blogs={blogsData} searchTerm={searchTerm} displayAt={"explore"} />
                    ) : null}

                    {/* {selectedType === "all" || selectedType === "forum" ? ( */}
                    {/*    <ForumPosts forums={forums} searchTerm={searchTerm} displayAt={"explore"}/> */}
                    {/* ) : null} */}

                    {selectedType === "all" || selectedType === "ctf" ? (
                        <CtfChallenges ctf={ctfData} searchTerm={searchTerm} displayAt={"explore"} />
                    ) : null}
                </RightContainer>
            </ExploreContainer>
        </Wrapper>
    );
};

export default Explore;
