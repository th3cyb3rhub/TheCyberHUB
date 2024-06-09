import React, { useState } from "react";
import SidebarFilterButton from "./SidebarFilterButton";

const SidebarFilterButtons = ({ filterButtonsData, defaultButtonId = "" }) => {
    const [activeButton, setActiveButton] = useState(defaultButtonId);

    const renderButtons = filterButtonsData.map(({ filterLabel, onClick, id }) => {
        const handleClick = (filterId) => {
            setActiveButton(filterId);
            onClick(filterLabel);
        };

        return (
            <SidebarFilterButton
                activeButton={activeButton}
                filterLabel={filterLabel}
                onClick={handleClick}
                id={id}
                key={id}
            />
        );
    });
    return <div style={{ display: "flex", justifyContent: "space-between" }}>{renderButtons}</div>;
};
export default SidebarFilterButtons;
