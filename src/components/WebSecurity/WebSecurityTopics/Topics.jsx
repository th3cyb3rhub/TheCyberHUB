import React, { useEffect, useState } from "react";
import axios from "axios";

import { RouterLink } from "src/components/Tools/ToolsElements";
import Sidebar from "src/components/WebSecurity/Sidebar";
import { StyledTag } from "./TopicsElements";
import { LevelContainer } from "src/components/WebSecurity/Common/Labs/LabsElement";
import { Input } from "src/components/WebSecurity/Common/SubmissionBoxElements";
import { LevelButton } from "src/components/WebSecurity/Common/Labs/RoomCardElement";
import {
    Tags,
    TopicCard,
    TopicCards,
    TopicsContainer,
    Container,
} from "src/components/WebSecurity/WebSecurityTopics/TopicElements.jsx";
import { getApiUrl } from "src/features/apiUrl.js";

const Topics = () => {
    const [topics, setTopics] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Fetch data from the API
        const fetchData = async () => {
            try {
                const response = await axios.get(getApiUrl("api/topics"));
                setTopics(response.data); // Update state with the fetched data
                setLoading(false); // Stop loading when data is received
            } catch (err) {
                setError(err.message); // Set error if request fails
                setLoading(false);
            }
        };

        fetchData();
    }, []); // Empty dependency array ensures this runs once after component mounts

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
        return levels?.map((level, index) => (
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

    const filteredTopics = topics
        ? topics?.filter(
              (topic) =>
                  (topic.level === levelActive || levelActive === "All") &&
                  (topic.category === categoryActive || categoryActive === "All") &&
                  (topic.title.toLowerCase().includes(searchInput.toLowerCase()) ||
                      topic.tags.some((tag) => tag.toLowerCase().includes(searchInput.toLowerCase()))),
          ) || []
        : [];

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

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
                    {filteredTopics?.map((topic) => (
                        <RouterLink
                            to={`/websecurity/topic/${topic._id}`}
                            style={{ textDecoration: "none", width: "100%" }}
                            key={topic._id}
                        >
                            <TopicCard key={topic._id}>
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
