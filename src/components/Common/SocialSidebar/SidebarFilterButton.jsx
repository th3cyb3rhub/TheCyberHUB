import React from "react";
import { FilterButton } from "./SidebarElements";

const SidebarFilterButton = ({ filterLabel, onClick, activeButton, id }) => {
    return (
        <FilterButton $activeButton={activeButton === id} onClick={() => onClick(id)}>
            {filterLabel}
        </FilterButton>
    );
};
export default SidebarFilterButton;
