import React from "react";
import styled from "styled-components";
import { ImLab } from "react-icons/im";
import PreviewMarkdown from "src/components/Common/MarkdownPreview";
import { Link } from "react-router-dom";

const SubTopicContainer = styled.div`
    display: flex;
    flex-direction: column;
    background-color: #1a1a1a;
    padding: 20px;
    border-radius: 10px;
    border: 1px solid #212121;
`;

const SubTopicTitle = styled.p`
    font-size: 24px;
    font-weight: 600;
    color: #eee;
`;

// const SubTopicContent = styled.p``;

// const LabLevel = styled.p`
//   display: flex;
//   flex-direction: column;
//   justify-content: space-between;
//   gap: 10px;
//   font-size: 16px;
//   background: rgba(0, 125, 255, 0.26);
//   color: #eeeeee;
//   padding: 2px 7px;
//   border-radius: 5px;
//   border: 1px solid #213844;
// `;

export const LabContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 5px;
    padding: 10px;
    background-color: #151313;
    align-items: flex-start;
    border-radius: 10px;
    border: 1px solid #232222;
`;

export const LabText = styled.h1`
    font-size: 24px;
    text-align: center;
    color: #eee;
    padding: 10px;
    align-content: center;
    width: 100%;
`;

export const Labs = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding: 10px;
    align-items: flex-start;
    width: 100%;
`;

export const Lab = styled.div`
    display: flex;
    width: 100%;
    flex-direction: row;
    place-content: center space-between;
    gap: 10px;
    font-size: 16px;
    align-items: center;
`;

export const LabTitle = styled.a`
    font-size: 16px;
    color: #eee;
    display: flex;
    align-items: center;
    gap: 10px;
`;

export const LabIcon = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    background: #ed652f;
    padding: 5px;
    border: 1px solid #ed652f;
    border-radius: 5px;
    color: black;
`;

export const LabSolved = styled(Link)`
    color: #fdd;
    height: 100%;
    padding: 2px 10px;
    font-size: 12px;
    border: 1px solid #ed652f;
    border-radius: 100px;
    background: rgb(224 112 0 / 44%);

    &:hover {
        background: rgb(224 112 0 / 74%);
    }
`;

const SubTopic = ({ id, subtopic }) => {
    return (
        <SubTopicContainer id={id} key={subtopic.id}>
            <SubTopicTitle>{subtopic.title}</SubTopicTitle>
            {/* <SubTopicContent>{subtopic.content}</SubTopicContent> */}
            <PreviewMarkdown content={subtopic.content} />

            {subtopic?.labs ? (
                <LabContainer>
                    {/* <LabText>Labs</LabText> */}
                    <Labs>
                        {subtopic?.labs.map((lab, index) => (
                            <Lab key={index}>
                                <LabTitle>
                                    <LabIcon>
                                        <ImLab />
                                    </LabIcon>
                                    {lab?.title}
                                </LabTitle>
                                <LabSolved to={`/websecurity/labs/${lab.link}`}>
                                    {lab?.isCompleted ? "Completed" : "View Lab"}
                                </LabSolved>
                            </Lab>
                        ))}
                    </Labs>
                </LabContainer>
            ) : null}
        </SubTopicContainer>
    );
};

export default SubTopic;
