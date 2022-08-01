import React from 'react';

import "./Card/Card.css";
import {CyberYoutubeVideosCard} from "./Card/Card";
import {LinuxYoutubeVideosCard} from "./Card/Card";
import {Section} from "./YouTubeVideosElements";

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
            <Section>
                <h1>
                    Under Development
                </h1>
            </Section>
            <LinuxVideosCard/>
            <CyberVideosCard/>
        </>
    )
};

export default FreeYoutubeCourses;
