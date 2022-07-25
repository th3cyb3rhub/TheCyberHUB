import React from "react";
import {CyberSecFreeYoutubeVideosData} from "../YoutubeCoursesData/CyberSecYouTubeVIdeosData";
import {LinuxCourses__Youtube} from "../YoutubeCoursesData/LinuxYouTubeVIdeosData";

export const CyberYoutubeVideosCard = CyberSecFreeYoutubeVideosData.map(
    (data) => {
        return (
            <div className="card">
                <div className="card__header">
                    <img src={data.YTChannelImageLink} alt="card__image" className="card__image"
                         width="600"/>
                </div>
                <div className="card__body">
                    <span className="tag tag-brown">{data.tag}</span>
                    <h3><a href={data.videoLink} target={"_blank"} className={"videoHeading"}>{data.videoHeading}</a></h3>
                </div>

                <hr/>
                <div className="card__footer">
                    <div className="user">
                        <img src={data.channelLogo} alt="user__image" className="user__image"/>
                        <div className="user__info">
                            <h5><a href={data.channelLink} target={"_blank"}
                                   className={"ChannelHeading"}>{data.channelName}</a>
                            </h5>
                            <small>{data.timeStamp}</small>
                        </div>
                    </div>
                </div>
            </div>

        )
    }
);

export const LinuxYoutubeVideosCard = LinuxCourses__Youtube.map(
    (data) => {
        return (
            <div className="card">
                <div className="card__header">
                    <img src={data.YTChannelImageLink} alt="card__image" className="card__image"
                         width="600"/>
                </div>
                <div className="card__body">
                    <span className="tag tag-brown">{data.tag}</span>
                    <h3><a href={data.videoLink} target={"_blank"} className={"videoHeading"}>{data.videoHeading}</a></h3>
                </div>

                <hr/>
                <div className="card__footer">
                    <div className="user">
                        <img src={data.channelLogo} alt="user__image" className="user__image"/>
                        <div className="user__info">
                            <h5><a href={data.channelLink} target={"_blank"}
                                   className={"ChannelHeading"}>{data.channelName}</a>
                            </h5>
                            <small>{data.timeStamp}</small>
                        </div>
                    </div>
                </div>
            </div>

        )
    }
);
