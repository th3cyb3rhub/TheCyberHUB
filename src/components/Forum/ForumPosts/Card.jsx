import React from "react";
import moment from "moment";
import {
    // Answers,
    Categories,
    Category,
    // CheckIcon,
    ContainerCard,
    Date,
    Description,
    DetailsSection,
    FooterDetailsSection,
    MainSection,
    SubSection,
    Title,
    Views,
    Votes,
} from "./CardElements";
import { encodeURL } from "../../Blogs/util";
import { RouterLink } from "../../Tools/ToolsElements";

const Card = ({ title, description, username, date, categories, views, answers, answerAccepted, votes }) => {
    const postedTime = moment(date);
    const currentTime = moment();
    const timeSincePosted = moment.duration(currentTime.diff(postedTime));
    let timeString = "";
    if (timeSincePosted.asSeconds() < 60) {
        timeString = `${Math.floor(timeSincePosted.asSeconds())} seconds ago`;
    } else if (timeSincePosted.asMinutes() < 60) {
        timeString = `${Math.floor(timeSincePosted.asMinutes())} minutes ago`;
    } else if (timeSincePosted.asHours() < 24) {
        timeString = `${Math.floor(timeSincePosted.asHours())} hours ago`;
    } else if (timeSincePosted.asDays() < 7) {
        timeString = `${Math.floor(timeSincePosted.asDays())} days ago`;
    } else {
        timeString = postedTime.format("MMM DD, YYYY");
    }
    return (
        <ContainerCard>
            <MainSection>
                <SubSection>
                    <RouterLink to={{ pathname: `/forum/${encodeURL(title)}` }}>
                        <Title> {title} </Title>
                        <Description> {description.slice(0, 150)}... </Description>
                    </RouterLink>
                </SubSection>
                <DetailsSection>
                    <Votes>{votes} votes </Votes>
                    {/* <Answers answerAccepted={answerAccepted}> */}
                    {/*    {answerAccepted ? <CheckIcon /> : null} */}
                    {/*    {answers} answer{answers !== 1 ? "s" : null} */}
                    {/* </Answers> */}
                    <Views> {views} views </Views>
                </DetailsSection>
            </MainSection>
            <FooterDetailsSection>
                <Categories>
                    {categories.map((category, id) => (
                        <Category key={id}>{category}</Category>
                    ))}
                </Categories>
                <Date>
                    by @{username} {timeString}
                </Date>
            </FooterDetailsSection>
        </ContainerCard>
    );
};

export default Card;
