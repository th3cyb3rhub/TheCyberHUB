import React, { useState } from "react";
import styled from "styled-components";
import { RouterLink } from "src/components/Tools/ToolsElements";
import topics from "./topicsData";
import Sidebar from "src/components/WebSecurity/Sidebar";
import { StyledTag } from "./TopicsElements";
import { LevelContainer } from "src/components/WebSecurity/Common/Labs/LabsElement";
import { Input } from "src/components/WebSecurity/Common/SubmissionBoxElements";
import { LevelButton } from "src/components/WebSecurity/Common/Labs/RoomCardElement";

// Styled component for the container
export const TopicsContainer = styled.div`
    width: 100%;
    max-width: 1500px;
    height: 100%;

    /* background-color: #090909; */
    display: flex;
    flex-direction: row;
    gap: 15px;
    margin: 5px auto;
`;

export const Container = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    gap: 15px;

    .header {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        gap: 20px;
        padding: 0;
        margin: 0;
    }

    .room-cards-container {
        /* display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: space-between;
        gap: 20px; */
        padding: 0;
        margin: 0;
    }
`;

export const TopicCards = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 15px;
    width: 100%;
    justify-content: center;
`;

export const TopicCard = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 1fr;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
    height: 100%;
    padding: 20px;
    border-radius: 10px;
    border: 1px solid rgb(255 255 255 / 18%);
    transition: all 0.3s ease-in-out;
    background: #090909;

    &:hover {
        transform: translateY(-1px);
        background: #232323;
    }
`;

export const Tags = styled.div`
    display: flex;
    flex-wrap: wrap;
`;

const Topics = () => {
    const handleSelectSubtopic = (subtopicId) => {
        console.log(subtopicId);
    };

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

    const filteredTopics =
        topics.filter(
            (topic) =>
                (topic.level === levelActive || levelActive === "All") &&
                (topic.category === categoryActive || categoryActive === "All") &&
                (topic.title.toLowerCase().includes(searchInput.toLowerCase()) ||
                    topic.tags.some((tag) => tag.toLowerCase().includes(searchInput.toLowerCase()))),
        ) || [];

    return (
        <TopicsContainer>
            <Sidebar
                heading={"Topics"}
                topics={topics}
                setCategoryActive={setCategoryActive}
                onSelectSubtopic={handleSelectSubtopic}
                onlyCat={true}
                categoryActive={categoryActive}
            />
            <Container>
                <div className="header">
                    <LevelContainer>{renderLevelButtons(levels)}</LevelContainer>
                    <Input placeholder="Search" value={searchInput} onChange={handleSearchInputChange} />
                </div>
                <TopicCards className={"room-cards-container"}>
                    {filteredTopics.map((topic) => (
                        <RouterLink
                            to={`/websecurity/topic/${topic.id}`}
                            style={{ textDecoration: "none", width: "100%" }}
                            key={topic.id}
                        >
                            <TopicCard key={topic.id}>
                                <h3
                                    style={{
                                        marginBottom: "10px",
                                        color: "#ff6b08",
                                        fontSize: "1.2em",
                                    }}
                                >
                                    {topic.title}
                                </h3>
                                <Tags>
                                    {topic.tags.map((tag, index) => (
                                        <StyledTag key={index}>{tag}</StyledTag>
                                    ))}
                                </Tags>
                            </TopicCard>
                        </RouterLink>
                    ))}
                </TopicCards>
            </Container>
        </TopicsContainer>
    );
};

export default Topics;
