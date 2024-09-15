import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container } from "./TopicElements";
import Sidebar from "src/components/WebSecurity/Sidebar";
import SubTopic from "./SubTopic";
import axios from "axios";
import { getApiUrl } from "src/features/apiUrl.js";

const Topic = () => {
    const { id } = useParams();
    const [topics, setTopics] = useState([]);
    const [topic, setTopic] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const topicsResponse = await axios.get(getApiUrl("api/topics/sidebar"));
                setTopics(topicsResponse.data);

                const topicResponse = await axios.get(getApiUrl(`api/topics/${id}`));
                setTopic(topicResponse.data);

                setLoading(false); // Stops loading after both requests complete
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchData();
    }, [id]); // Re-fetch data when 'id' changes

    const handleSelectSubtopic = (subtopicId) => {
        const element = document.getElementById(subtopicId);
        if (element) {
            const fixedDistanceFromTop = 100;
            const elementTop = element.offsetTop - fixedDistanceFromTop;
            window.scrollTo({
                top: elementTop,
                behavior: "smooth",
            });
        } else {
            console.error("Subtopic not found:", subtopicId);
        }
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;
    if (!topic) return <p>No topic found</p>;

    // Reusable styles
    const headingStyle = {
        color: "#ecf0f1",
        fontSize: "2em",
        textAlign: "center",
    };

    const levelBadgeStyle = {
        display: "flex",
        justifyContent: "center",
        width: "fit-content",
        background: "rgba(224,112,0,0.21)",
        padding: "5px 15px",
        borderRadius: "20px",
        border: "2px solid #e07000",
        color: "#ecf0f1",
        alignItems: "center",
        gap: "5px",
        margin: "0 auto",
    };

    return (
        <div
            style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                gap: "15px",
                margin: "5px auto",
            }}
        >
            <Sidebar topic={topic} topics={topics} onSelectSubtopic={handleSelectSubtopic} />
            <Container>
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "10px",
                        justifyContent: "center",
                        alignItems: "center",
                        marginBottom: "20px",
                    }}
                >
                    <h1 style={headingStyle}>{topic?.title}</h1>
                    <p style={levelBadgeStyle}>{topic?.level}</p>
                </div>
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                        gap: "20px",
                    }}
                >
                    {topic?.desc?.map((desc, index) => (
                        <SubTopic id={desc?.title} subtopic={desc} key={index} />
                    ))}
                </div>
            </Container>
        </div>
    );
};

export default Topic;
