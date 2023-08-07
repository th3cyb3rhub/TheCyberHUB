import React, { useState } from "react";
import { Wrapper } from "../Dashboard/Profile/ProfileElements";
import { useParams } from "react-router-dom";
import forumData from "./ForumData";
import { encodeURL } from "../Blogs/util";
import {
    Button,
    CommentTextArea,
    Date,
    ForumSubPageContainer,
    PublishSection,
    QuestionSection,
    Title,
    Views,
} from "./ForumSubPageElements";
import {
    Categories,
    Category,
    Description,
    DetailsSection,
    FooterDetailsSection,
    Votes,
} from "./ForumPosts/CardElements";
// import PostCommentForm from "./PostCommentForm";
import { CommentForm } from "./PostCommentFormElements";

const ForumSubPage = () => {
    const [addCommentData, setAddCommentData] = useState({
        comment: "",
    });
    const { comment } = addCommentData;
    // const [preview, setPreview] = useState(false);
    // const onPreview = () => {
    //     setPreview(true);
    // };
    // const closePreview = () => {
    //     setPreview(false);
    // };

    const { title } = useParams();
    const question = forumData.find((question) => encodeURL(question.title).toLowerCase() === title.toLowerCase());

    // Comment Form
    const onChange = (e) => {
        const value = e.target.value;
        setAddCommentData((prevState) => ({
            ...prevState,
            [e.target.name]: value,
        }));
    };
    const onSubmit = (e) => {
        e.preventDefault();

        // const addCommentData = {
        //     comment,
        // };
        setAddCommentData({
            comment: "",
        });
    };
    return (
        <Wrapper>
            <ForumSubPageContainer>
                <QuestionSection>
                    <Title> {question.title} </Title>
                    <Description> {question.description} </Description>

                    <FooterDetailsSection>
                        <Categories>
                            {question?.categories.map((category, id) => (
                                <Category key={id}>{category}</Category>
                            ))}
                        </Categories>
                        <DetailsSection>
                            <Votes>{question.votes} votes </Votes>
                            <Views> {question.views} views </Views>
                        </DetailsSection>
                        <Date>
                            by @{question.username} {question.date}
                        </Date>
                    </FooterDetailsSection>
                </QuestionSection>

                <CommentForm onSubmit={onSubmit}>
                    <CommentTextArea
                        name="comment"
                        id={"comment"}
                        value={comment}
                        onChange={onChange}
                        placeholder="Add your solution here..."
                    />
                </CommentForm>

                <PublishSection>
                    <Button> Submit </Button>
                </PublishSection>
            </ForumSubPageContainer>
        </Wrapper>
    );
};

export default ForumSubPage;
