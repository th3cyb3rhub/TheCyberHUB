import React from 'react';

import "./VideoCard/VideoCard.css";
import {
    LinuxYoutubeVideosCard, CyberYoutubeVideosCard,
    BugHuntingVideosCard, RedTeamCoursesCard, BlueTeamCoursesCard
} from "./VideoCard/VideoCard";

export const LinuxCourses = () => {
    return (
        <div className={"paddingTop"}>
            <div className={"card__section"} id={"id"}>
                <h1 className={"h1_Courses"}>{"Linux Courses"}</h1>
                <div className="container">
                    {LinuxYoutubeVideosCard}
                </div>
            </div>
        </div>
    )
}
export const CyberSecurityCourses = () => {
    return (
        <div className={"card__section"} id={"id"}>
            <h1 className={"h1_Courses"}>{"Cyber Security Courses"}</h1>
            <div className="container">
                {CyberYoutubeVideosCard}
            </div>
        </div>
    )
}
export const BugHuntingCourses = () => {
    return (
        <div className={"card__section"} id={"id"}>
            <h1 className={"h1_Courses"}>{"Bug bounty hunting Courses"}</h1>
            <div className="container">
                {BugHuntingVideosCard}
            </div>
        </div>
    )
}
export const RedTeamCourses = () => {
    return (
        <div className={"card__section"} id={"id"}>
            <h1 className={"h1_Courses"}>{"Red Team Courses"}</h1>
            <div className="container">
                {RedTeamCoursesCard}
            </div>
        </div>
    )
}
export const BlueTeamCourses = () => {
    return (
        <div className={"card__section"} id={"id"}>
            <h1 className={"h1_Courses"}>{"Blue Team Courses"}</h1>
            <div className="container">
                {BlueTeamCoursesCard}
            </div>
        </div>
    )
}

const FreeYoutubeCourses = () => {
    return (
        <>
            <LinuxCourses/>
            <CyberSecurityCourses/>
            <BugHuntingCourses/>
            <RedTeamCourses/>
            <BlueTeamCourses/>
        </>
    )
};

export default FreeYoutubeCourses;
