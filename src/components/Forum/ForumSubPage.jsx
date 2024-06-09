import React, { useState } from "react";
import { Wrapper } from "src/components/Dashboard/Profile/ProfileElements";
import { useParams } from "react-router-dom";
import forumData from "./ForumData";
import { encodeURL } from "src/components/Blogs/util";
import {
    Button,
    CommentTextArea,
    ForumSubPageContainer,
    PublishSection,
    QuestionSection,
} from "./ForumSubPageElements";
import { Categories, Category, DetailsSection, FooterDetailsSection, Votes } from "./ForumPosts/CardElements";
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
                    <h1> {question.title} </h1>
                    <p> {question.description} </p>

                    <FooterDetailsSection>
                        <Categories>
                            {question?.categories.map((category, id) => (
                                <Category key={id}>{category}</Category>
                            ))}
                        </Categories>
                        <DetailsSection>
                            <Votes>{question.votes} votes </Votes>
                            <p> {question.views} views </p>
                        </DetailsSection>
                        <p>
                            by @{question.username} {question.date}
                        </p>
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
