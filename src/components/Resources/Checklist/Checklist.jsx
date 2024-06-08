import React, { useRef, useState } from "react";
import { Wrapper } from "src/components/Dashboard/Profile/ProfileElements";
import { checklistData } from "./checklistData.jsx";
import { HideDataContainer, MainTitleContainer, MethodologyHeading } from "src/components/Resources/Methodology/MethodologyElement";
import { HintIcon } from "src/components/WebSecurity/Common/HintElements";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";
import { Checkbox, CheckboxContainer } from "src/components/Courses/LearningPath/LearningPathElements.jsx";
import {
    ArrowIcon,
    InterviewsQuestionsTitle,
    QuestionSection,
    SingleQuestion,
} from "src/components/Resources/InterviewQuestions/InterviewQuestionsElements.jsx";

const Checklist = () => {
    const subtopicRefs = useRef({});

    const [active, setActive] = useState(null);
    function handleClick(subtopic) {
        setActive(subtopic === active ? null : subtopic);

        if (active !== null && active !== subtopic) {
            const previousElement = subtopicRefs.current[active];
            if (previousElement) {
                previousElement.style.display = "none";
            }
        }

        const element = subtopicRefs.current[subtopic];
        if (element && element.style.display === "block") {
            element.style.display = "none";
        } else if (element) {
            element.style.display = "block";
        }
    }

    return (
        <Wrapper>
            <div></div>
            <div>
                {checklistData.map((data) => (
                    <MainTitleContainer key={data.Methodology}>
                        <h1 style={{ fontSize: "42px" }}>{data.Methodology}</h1>
                        <p style={{ display: "block", textAlign: "center", marginBottom: "20px" }}>
                            {data.Description}
                        </p>

                        {data.Topics.map((topic) => (
                            <div key={topic.Topic} style={{ width: "100%", margin: "20px" }}>
                                <h2 style={{ textAlign: "center", fontSize: "25px" }}>{topic.Topic}</h2>
                                <p style={{ textAlign: "center", fontSize: "15px" }}>{topic.Description}</p>
                                <br />
                                {topic.SubTopics.map((subTopic) => (
                                    <div key={subTopic.Name} style={{ width: "100%" }}>
                                        <MethodologyHeading onClick={() => handleClick(subTopic.Name)}>
                                            {subTopic.Name}
                                            <HintIcon>
                                                {active === subTopic.Name ? <FaAngleUp /> : <FaAngleDown />}
                                            </HintIcon>
                                        </MethodologyHeading>
                                        <HideDataContainer
                                            ref={(el) => (subtopicRefs.current[subTopic.Name] = el)}
                                            id={subTopic.Name}
                                        >
                                            <p>
                                                <span style={{ fontWeight: "bold" }}></span> {subTopic.Name}
                                            </p>
                                            <h1 style={{ marginTop: "15px" }}>Goals:</h1>
                                            <ul style={{ listStyle: "circle", marginLeft: "0px" }}>
                                                {subTopic?.Goals?.map((goal, index) => (
                                                    <InterviewsQuestionsTitle key={index}>
                                                        <QuestionSection>
                                                            <ArrowIcon style={{ margin: "0" }}>{" > "} </ArrowIcon>
                                                            <SingleQuestion>{goal}</SingleQuestion>
                                                        </QuestionSection>

                                                        <CheckboxContainer>
                                                            <Checkbox type="checkbox" />
                                                        </CheckboxContainer>
                                                    </InterviewsQuestionsTitle>
                                                ))}
                                            </ul>

                                            <h1 style={{ marginTop: "15px" }}>Tools:</h1>
                                            <ul style={{ listStyle: "circle", marginLeft: "30px" }}>
                                                {subTopic?.Tools?.map((tool) => (
                                                    <li key={tool}>{tool}</li>
                                                ))}
                                            </ul>
                                        </HideDataContainer>
                                    </div>
                                ))}
                            </div>
                        ))}
                    </MainTitleContainer>
                ))}
            </div>
        </Wrapper>
    );
};

export default Checklist;
