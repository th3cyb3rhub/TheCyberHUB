import React from "react";
import { SearchContainer } from "src/components/Explore/ExploreElements";
import { FilterButton, FilterContainer } from "src/components/Feeds/FeedsElements";
import SearchInputBox from "src/components/Common/SearchInputBox";
import SocialTags from "src/components/Feeds/FeedTags/SocialTags";
import { SidebarContainer } from "./SidebarElements";
import { RouterNavCreateButtonLink } from "src/components/Header/Navbar/NavbarElements";

const Sidebar = ({
    user,
    searchTerm,
    setSearchTerm,
    handleSearchTermChange,
    tags,
    showOnlyFollowing,
    setShowOnlyFollowing,
    filterLabel,
    userFilters,
    handleTypeFilter,
    exploreFiltersComponent,
    sidebarType,
    data,
    selectedTags,
    setSelectedTags,
}) => {
    const renderFollowingFilterButtons = () => (
        <>
            {sidebarType === "explore" ? (
                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        width: "100%",
                    }}
                >
                    <FilterButton
                        style={{
                            background: filterLabel === "Connections" ? "#FF6B08" : "",
                            color: filterLabel === "Connections" ? "#0A0A0A" : "",
                        }}
                        onClick={() => handleTypeFilter(userFilters[0])}
                    >
                        Connections
                    </FilterButton>
                    <FilterButton
                        style={{
                            background: filterLabel === "Following" ? "#FF6B08" : "",
                            color: filterLabel === "Following" ? "#0A0A0A" : "",
                        }}
                        onClick={() => handleTypeFilter(userFilters[1])}
                    >
                        Following
                    </FilterButton>
                    <FilterButton
                        style={{
                            background: filterLabel === "Followers" ? "#FF6B08" : "",
                            color: filterLabel === "Followers" ? "#0A0A0A" : "",
                        }}
                        onClick={() => handleTypeFilter(userFilters[2])}
                    >
                        Followers
                    </FilterButton>
                </div>
            ) : (
                <>
                    <FilterButton
                        style={{
                            background: showOnlyFollowing === false ? "#FF6B08" : "",
                            color: showOnlyFollowing === false ? "#0A0A0A" : "",
                        }}
                        onClick={() => setShowOnlyFollowing(false)}
                    >
                        For You
                    </FilterButton>
                    <FilterButton
                        style={{
                            background: showOnlyFollowing === true ? "#FF6B08" : "",
                            color: showOnlyFollowing === true ? "#0A0A0A" : "",
                        }}
                        onClick={() => setShowOnlyFollowing(true)}
                    >
                        Following
                    </FilterButton>
                </>
            )}
        </>
    );

    return (
        <SidebarContainer $sidebarType={sidebarType}>
            {sidebarType === "blogs" && (
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px" }}>
                    <RouterNavCreateButtonLink to={"/blogs/create"}>Create Blog</RouterNavCreateButtonLink>
                    <RouterNavCreateButtonLink to={"/blogs/my-blogs"}>View My Blogs</RouterNavCreateButtonLink>
                    <RouterNavCreateButtonLink to={"/dashboard/saved"}>Saved</RouterNavCreateButtonLink>
                </div>
            )}

            {sidebarType === "feeds" && (
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <RouterNavCreateButtonLink to={"/feeds/my-feeds"}>View My Feeds</RouterNavCreateButtonLink>
                    <RouterNavCreateButtonLink to={"/dashboard/saved"}>Saved</RouterNavCreateButtonLink>
                </div>
            )}

            {user && <FilterContainer>{renderFollowingFilterButtons()}</FilterContainer>}

            <SearchContainer>
                <SearchInputBox
                    placeholder="Search by name"
                    value={searchTerm}
                    onChange={handleSearchTermChange}
                    setValue={setSearchTerm}
                />
            </SearchContainer>

            {sidebarType === "explore" && exploreFiltersComponent}

            <SocialTags
                tags={tags}
                searchTerm={searchTerm}
                selectedTags={selectedTags}
                setSelectedTags={setSelectedTags}
            />
        </SidebarContainer>
    );
};

export default Sidebar;
