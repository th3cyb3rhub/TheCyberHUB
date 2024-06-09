import React, { useState } from "react";
import Sidebar from "./Sidebar";

export default {
    title: "Components/Sidebar/Sidebar",
    component: Sidebar,
};

const Template = (args) => {
    const [searchTerm, setSearchTerm] = useState(args.searchTerm || "");
    const [showOnlyFollowing, setShowOnlyFollowing] = useState(false);
    const [filterLabel, setFilterLabel] = useState("");
    const [selectedTags, setSelectedTags] = useState([]);

    const handleSearchTermChange = (value) => {
        setSearchTerm(value);
    };

    const handleTypeFilter = (filter) => {
        setFilterLabel(filter);
    };

    const userFilters = ["Connections", "Following", "Followers"];
    const exploreFiltersComponent = <div>Explore Filters Component</div>;

    return (
        <Sidebar
            {...args}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            handleSearchTermChange={handleSearchTermChange}
            showOnlyFollowing={showOnlyFollowing}
            setShowOnlyFollowing={setShowOnlyFollowing}
            filterLabel={filterLabel}
            userFilters={userFilters}
            handleTypeFilter={handleTypeFilter}
            exploreFiltersComponent={exploreFiltersComponent}
            sidebarType="explore"
            selectedTags={selectedTags}
            setSelectedTags={setSelectedTags}
        />
    );
};

export const Default = Template.bind({});
Default.args = {
    user: true,
    tags: ["Tag1", "Tag2", "Tag3"],
    data: {},
    searchTerm: "Initial Search Term",
};
