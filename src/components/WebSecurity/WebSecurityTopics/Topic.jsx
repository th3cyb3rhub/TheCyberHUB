import React from "react";
import topics from "./topicsData";
import { useParams } from "react-router-dom";
import { Container } from "./TopicElements";
import Sidebar from "src/components/WebSecurity/Sidebar";
import SubTopic from "./SubTopic";

const Topic = () => {
    const { id } = useParams();
    const topic = topics.find((topic) => topic.id === parseInt(id));

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
            console.log("Element not found:", subtopicId);
        }
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
                    <h1
                        style={{
                            color: "#ecf0f1",
                            fontSize: "2em",
                            textAlign: "center",
                        }}
                    >
                        {topic?.title}
                    </h1>
                    <p
                        style={{
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
                        }}
                    >
                        {topic?.level}
                    </p>
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

                {/* <p>Category: {topic.category}</p> */}

                {/* <p>Tags: {topic.tags.map((tag, index) => ( */}
                {/*    <Tag key={index}>{tag}</Tag> */}
                {/* ))}</p> */}
            </Container>
        </div>
    );
};

export default Topic;
