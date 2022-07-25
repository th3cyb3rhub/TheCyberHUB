import React from 'react';

import "./Card/Card.css";
import {CyberYoutubeVideosCard} from "./Card/Card";
import {LinuxYoutubeVideosCard} from "./Card/Card";

export const LinuxVideosCard = () => {
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
export const CyberVideosCard = () => {
    return (

        <div className={"card__section"} id={"id"}>
            <h1 className={"h1_Courses"}>{"Cyber Security Courses"}</h1>
            <div className="container">
                {CyberYoutubeVideosCard}
            </div>
        </div>


    )
}

const FreeYoutubeCourses = () => {
    return (
        <>
            <LinuxVideosCard/>
            <CyberVideosCard/>
        </>
    )
};

export default FreeYoutubeCourses;
