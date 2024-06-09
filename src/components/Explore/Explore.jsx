import React, { useEffect, useState } from "react";
import styled from "styled-components";

import { ExploreContainer, LeftContainer, RightContainer } from "./ExploreElements";

import { useDispatch, useSelector } from "react-redux";
import { Wrapper } from "src/components/Dashboard/Profile/ProfileElements";
import { getAllCTFs } from "src/features/ctf/ctfSlice";
import { blogReset, getAllBlogs } from "src/features/blogs/blogSlice";
import { getAllUserDetails, userDetailReset } from "src/features/userDetail/userDetailSlice";
import { feedReset, getAllFeeds } from "src/features/feeds/feedsSlice";
import Users from "./Users/Users";
import FeedsExplore from "./FeedsExplore";
import BlogCards from "src/components/Blogs/BlogCard/BlogCards";
import CtfChallenges from "src/components/CaptureTheFlag/CTFCards/CtfChallenges";
import apiStatus from "src/features/apiStatus";
import UnderMaintenance from "src/components/Other/UnderMaintenance/UnderMaintenance";
import LoadingSpinner from "src/components/Other/MixComponents/Spinner/LoadingSpinner";
import { getFollowData } from "src/features/follow/followSlice";
import { getConnections } from "src/features/connections/connectionSlice";
import Sidebar from "src/components/Common/SocialSidebar/Sidebar";
import { FilterButton } from "src/components/Feeds/FeedsElements";
import { HintIcon } from "src/components/WebSecurity/Common/HintElements";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";
import NotFound from "src/NotFound";

const FilterHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;
    padding: 8px 12px;
    background-color: #131313;
    border-radius: 5px;
`;

const FilterTitle = styled.p`
    margin: 0;

    /* font-weight: bold; */
`;

const FilterContent = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 10px;
    padding: 10px 0 0;
`;

const FilterSection = ({ title, children }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div>
            <FilterHeader onClick={() => setIsOpen(!isOpen)}>
                <FilterTitle>{title}</FilterTitle>
                <HintIcon>{isOpen ? <FaAngleUp /> : <FaAngleDown />}</HintIcon>
            </FilterHeader>
            {isOpen && <FilterContent>{children}</FilterContent>}
        </div>
    );
};

const FiltersComponent = ({ types, selectedType, handleTypeSelect }) => {
    return (
        <FilterSection title="Filters">
            {types.map((filter, index) => (
                <FilterButton
                    key={index}
                    style={{
                        background: selectedType === filter.value ? "#FF6B08" : "#1a1a1a",
                        color: selectedType === filter.value ? "#0A0A0A" : "",
                        borderRadius: "5px",
                    }}
                    onClick={() => handleTypeSelect(filter.value)}
                >
                    {filter.label}
                </FilterButton>
            ))}
        </FilterSection>
    );
};

const Explore = () => {
    const dispatch = useDispatch();

    const [showOnlyFollowing, setShowOnlyFollowing] = useState(false);

    const { user } = useSelector((state) => state.auth);
    const { isApiLoading, isApiWorking } = apiStatus();
    const { isUserDetailLoading } = useSelector((state) => state.userDetail);
    const { feeds, isFeedLoading } = useSelector((state) => state.feeds);
    const { blogs, isBlogLoading } = useSelector((state) => state.blogs);
    const { ctf, isCtfLoading } = useSelector((state) => state.ctf);
    const { connections } = useSelector((state) => state.connectionData);
    const [userDetailsLocal, setUserDetailsLocal] = useState([]);
    const userId = user?._id;
    const { followData } = useSelector((state) => state.followData);
    const allUsers = userDetailsLocal?.map((user) => user?.user) || [];
    const followers = followData?.followers;
    const following = followData?.following;
    const allConnections = connections?.connections?.map((connection) => connection.user) || [];

    const [filterLabel, setFilterLabel] = useState("all users");
    const [selectedFilter, setSelectedFilter] = useState("all");

    useEffect(() => {
        dispatch(getAllUserDetails()).then(({ payload }) => {
            setSelectedFilter(payload?.map((user) => user?.user));
            setUserDetailsLocal(payload);
        });
        dispatch(getAllFeeds());
        dispatch(getAllBlogs());
        dispatch(getAllCTFs());

        if (userId) {
            dispatch(getFollowData(userId));
            dispatch(getConnections(userId));
        }

        return () => {
            dispatch(blogReset());
            dispatch(userDetailReset());
            dispatch(feedReset());
        };
    }, [dispatch]);

    useEffect(() => {
        setSelectedFilter(allUsers);
    }, [connections]);

    const blogTags = blogs?.map((blog) => blog && blog?.tags.map((tag) => tag.toLowerCase())).flat() || [];
    const ctfTags = ctf?.map((ctf) => ctf && ctf?.tags.map((tag) => tag.toLowerCase())).flat() || [];
    const feedTags = feeds?.map((feed) => feed && feed?.tags.map((tag) => tag.toLowerCase())).flat() || [];
    // const forumTags = forums.map((forum) => forum && forum.tags).flat() || [];

    const tags = [...new Set([...feedTags, ...blogTags, ...ctfTags])].sort();

    const [searchTerm, setSearchTerm] = useState("");
    const [selectedTags, setSelectedTags] = useState([]);

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
    ];

    const handleTypeSelect = (type) => {
        setSelectedType(type);
    };

    const feedData = feeds?.map((feed) => {
        const userDetail = userDetailsLocal?.find((user) => user?.user === feed?.user);
        if (!selectedFilter?.includes(userDetail?.user)) {
            return null;
        }
        const { username, avatar, verified } = userDetail || {};

        return { ...feed, username, avatar, verified };
    });

    const filteredFeeds = feedData
        ?.filter((feed) => feed !== null)
        .reverse()
        ?.slice(0, 10)
        .reverse();

    const blogsData = blogs?.map((blog) => {
        const userDetail = userDetailsLocal?.find((user) => user?.user === blog?.user);
        if (!selectedFilter?.includes(userDetail?.user)) {
            return null;
        }
        const { username, avatar, verified } = userDetail || {};

        return { ...blog, username, avatar, verified };
    });

    const filteredBlogs = blogsData
        ?.filter((blog) => blog !== null)
        .reverse()
        ?.slice(0, 10)
        .reverse();

    const filteredCtf =
        ctf?.filter((ctf) => ctf?.registeredUsers.find(({ user }) => selectedFilter?.includes(user))) || [];

    const filteredUsers = userDetailsLocal
        ?.filter((user) => selectedFilter?.includes(user?.user))
        .reverse()
        ?.slice(0, 10)
        .reverse();

    const handleTypeFilter = (filter) => {
        if (filter.label === filterLabel) {
            setSelectedFilter(allUsers); // Deselect the filter
            setFilterLabel("all"); // Reset the filter label
        } else {
            setSelectedFilter(filter.value); // Select the filter
            setFilterLabel(filter.label); // Set the filter label
        }
    };

    const userFilters = [
        { value: allConnections, label: "Connections" },
        { value: following, label: "Following" },
        { value: followers, label: "Followers" },
        { value: allUsers, label: "all users" },
    ];

    const renderNotFoundComponents = () => {
        const dataTypes = ["Users", "Feeds", "Blogs", "Ctfs"];
        const filteredData = {
            Users: filteredUsers,
            Feeds: filteredFeeds,
            Blogs: filteredBlogs,
            Ctfs: filteredCtf,
        };
        const missingDataTypes = dataTypes.filter((type) => !filteredData[type].length);

        if (missingDataTypes.length === dataTypes.length) {
            return <NotFound title="Not Found" description="There are no items" />;
        } else if (missingDataTypes.length) {
            const lastType = missingDataTypes.pop();
            const missingDataTypesString = missingDataTypes.length
                ? `${missingDataTypes.join(", ")} and ${lastType}`
                : lastType;
            return <NotFound title="" description={`${missingDataTypesString} Not Found`} />;
        }

        return null;
    };

    if (isApiLoading || isCtfLoading) return <LoadingSpinner />;

    if (!isApiWorking) return <UnderMaintenance />;

    return (
        <Wrapper>
            <ExploreContainer>
                <LeftContainer>
                    <Sidebar
                        user={user}
                        searchTerm={searchTerm}
                        setSearchTerm={setSearchTerm}
                        handleSearchTermChange={handleSearchTermChange}
                        tags={tags}
                        selectedTags={selectedTags}
                        setSelectedTags={setSelectedTags}
                        showOnlyFollowing={showOnlyFollowing}
                        setShowOnlyFollowing={setShowOnlyFollowing}
                        userFilters={userFilters}
                        filterLabel={filterLabel}
                        handleTypeFilter={handleTypeFilter}
                        exploreFiltersComponent={FiltersComponent({ types, selectedType, handleTypeSelect })}
                        sidebarType={"explore"}
                    />
                </LeftContainer>

                <RightContainer>
                    {selectedType === "all" ? (
                        <>
                            {filteredUsers?.length ? (
                                <Users
                                    userDetails={filteredUsers}
                                    isUserDetailLoading={isUserDetailLoading}
                                    searchTerm={searchTerm}
                                    displayAt={"explore"}
                                />
                            ) : null}
                            {filteredFeeds?.length ? (
                                <FeedsExplore
                                    feeds={filteredFeeds}
                                    isFeedLoading={isFeedLoading}
                                    searchTerm={searchTerm}
                                    displayAt={"explore"}
                                    selectedTags={selectedTags}
                                />
                            ) : null}
                            {filteredBlogs?.length ? (
                                <BlogCards
                                    blogs={filteredBlogs}
                                    isBlogLoading={isBlogLoading}
                                    searchTerm={searchTerm}
                                    displayAt={"explore"}
                                    selectedTags={selectedTags}
                                />
                            ) : null}
                            {filteredCtf?.length ? (
                                <CtfChallenges
                                    ctf={filteredCtf}
                                    isCtfLoading={isCtfLoading}
                                    searchTerm={searchTerm}
                                    displayAt={"explore"}
                                    selectedTags={selectedTags}
                                />
                            ) : null}
                            {renderNotFoundComponents()}
                        </>
                    ) : (
                        <>
                            {selectedType === "users" ? (
                                <Users
                                    userDetails={filteredUsers}
                                    isUserDetailLoading={isUserDetailLoading}
                                    searchTerm={searchTerm}
                                    displayAt={"explore"}
                                />
                            ) : null}

                            {selectedType === "feeds" ? (
                                <FeedsExplore
                                    feeds={filteredFeeds}
                                    isFeedLoading={isFeedLoading}
                                    searchTerm={searchTerm}
                                    displayAt={"explore"}
                                />
                            ) : null}

                            {selectedType === "blogs" ? (
                                <BlogCards
                                    blogs={filteredBlogs}
                                    isBlogLoading={isBlogLoading}
                                    searchTerm={searchTerm}
                                    selectedTags={selectedTags}
                                    displayAt={"explore"}
                                />
                            ) : null}

                            {selectedType === "ctf" ? (
                                <CtfChallenges
                                    ctf={filteredCtf}
                                    isCtfLoading={isCtfLoading}
                                    searchTerm={searchTerm}
                                    displayAt={"explore"}
                                    selectedTags={selectedTags}
                                />
                            ) : null}
                        </>
                    )}
                </RightContainer>
            </ExploreContainer>
        </Wrapper>
    );
};

export default Explore;
