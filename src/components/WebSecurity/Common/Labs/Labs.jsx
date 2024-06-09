import React, { useState } from "react";
import { LabContainer, LevelContainer, RoomContainer } from "./LabsElement";
import RoomCard from "./RoomCard";
import { LevelButton } from "./RoomCardElement";

import Sidebar from "src/components/WebSecurity/Sidebar";
import { Input } from "src/components/WebSecurity/Common/SubmissionBoxElements";

const Labs = ({ LabData, heading }) => {
    const [levelActive, setLevelActive] = useState("All");
    const [categoryActive, setCategoryActive] = useState("All");
    const [searchInput, setSearchInput] = useState("");

    const handleLevelButtonClick = (level) => {
        setLevelActive(level);
    };

    const handleSearchInputChange = (event) => {
        setSearchInput(event.target.value);
    };

    const renderLevelButtons = (levels) => {
        return levels.map((level, index) => (
            <LevelButton
                key={index}
                style={{
                    background: levelActive === level ? "#FF6B08" : "",
                    color: levelActive === level ? "#0A0A0A" : "",
                }}
                onClick={() => handleLevelButtonClick(level)}
            >
                {level}
            </LevelButton>
        ));
    };

    const levels = ["All", "Beginner", "Intermediate", "Advance"];

    // Filtered LabData based on search input
    const filteredLabData =
        LabData?.filter(
            (data) =>
                (data?.level === levelActive || levelActive === "All") &&
                (data?.category === categoryActive || categoryActive === "All") &&
                (data?.title.toLowerCase().includes(searchInput.toLowerCase()) ||
                    data?.description.toLowerCase().includes(searchInput.toLowerCase()) ||
                    data?.level.toLowerCase().includes(searchInput.toLowerCase()) ||
                    data?.tags.some((tag) => tag.toLowerCase().includes(searchInput.toLowerCase()))),
        ) || [];

    console.log(categoryActive);

    return (
        <>
            <div style={{ width: "100%", maxWidth: "1200px", margin: "5px auto" }}>
                <LabContainer>
                    <Sidebar
                        heading={heading}
                        topics={LabData}
                        onlyCat={true}
                        setCategoryActive={setCategoryActive}
                        categoryActive={categoryActive}
                    />

                    <RoomContainer>
                        <div className="header">
                            <LevelContainer>{renderLevelButtons(levels)}</LevelContainer>
                            <Input placeholder="Search" value={searchInput} onChange={handleSearchInputChange} />
                        </div>
                        <div className="room-cards-container">
                            {filteredLabData.map((data, index) => (
                                <RoomCard
                                    key={index}
                                    title={data?.title}
                                    subtitle={data?.description}
                                    solution={data?.solution}
                                    category={data?.category}
                                    link={data?.id}
                                    tags={data?.tags}
                                    level={data?.level}
                                />
                            ))}
                        </div>
                    </RoomContainer>
                </LabContainer>
            </div>
        </>
    );
};

export default Labs;
