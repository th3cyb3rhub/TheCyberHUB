import React from "react";

import "./VideoCard/VideoCard.css";
import {
    LinuxYoutubeVideosCard,
    CyberYoutubeVideosCard,
    BugHuntingVideosCard,
    RedTeamCoursesCard,
    BlueTeamCoursesCard,
} from "./VideoCard/VideoCard";

const COURSES_CARD_INFO = [
    {
        title: "Linux",
        content: LinuxYoutubeVideosCard,
    },
    {
        title: "Cyber Security",
        content: CyberYoutubeVideosCard,
    },
    {
        title: "Bug bounty hunting",
        content: BugHuntingVideosCard,
    },
    {
        title: "Red Team",
        content: RedTeamCoursesCard,
    },
    {
        title: "Blue Team",
        content: BlueTeamCoursesCard,
    },
];

const FreeYoutubeCourses = () => {
    return (
        <>
            {COURSES_CARD_INFO.map((props) => (
                <div className={"card__section"} key={props.title}>
                    <h1 className={"h1_Courses"}>{props.title}</h1>
                    <div className="container">{props.content}</div>
                </div>
            ))}
        </>
    );
};

export default FreeYoutubeCourses;
