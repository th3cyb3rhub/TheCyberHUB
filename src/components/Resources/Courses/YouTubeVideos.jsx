import React from 'react';
// import {
//     FreeCoursesContainer,
//     FreeCoursesH1,
//     FreeCoursesWrapper,
//     FreeCoursesCard,
//     FreeCoursesIcon,
//     FreeCoursesH2,
//     FreeCoursesP
// } from './YouTubeVideosElements'
import "./Card/Card.css";
// import Search from "../../Search/Search";

const YouTubeVideos = ({
                           id,
                           sectionsHeading,
                           topLine,
                           YTChannelImageLink,
                           tag,
                           videoHeading,
                           videoDescription,
                           videoLink,
                           channelName,
                           channelLogo,
                           timeStamp,
                           alt,
                           channelLink,
                       }) => {
    return (
        <div className={"card__section"} id={id}>

            <h1 className={"h1_Courses"}>{sectionsHeading}</h1>
            <div className="container">
                <div className="card">
                    <div className="card__header">
                        <img src={YTChannelImageLink} alt="card__image" className="card__image" p
                             width="600"/>
                    </div>
                    <div className="card__body">
                        <span className="tag tag-brown">{tag}</span>
                        <h3><a href={videoLink} className={"videoHeading"}>{videoHeading}</a></h3>
                        {/*<p>0:00 - Read the problem*/}
                        {/*    5:40 - O(n) Memory Solution*/}
                        {/*    11:00 - O(1) Memory Solution*/}
                        {/*    20:05 - Coding Explanation</p>*/}
                    </div>

                    <hr/>
                    <div className="card__footer">
                        <div className="user">
                            <img src={channelLogo} alt="user__image" className="user__image"/>
                            <div className="user__info">
                                <h5><a href={channelLink} className={"ChannelHeading"}>{channelName}</a></h5>
                                <small>{timeStamp}</small>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default YouTubeVideos;
