import React from "react";
import {CyberSecFreeYoutubeVideosData} from "../YoutubeCoursesData/CyberSecYouTubeVIdeosData";
import {LinuxCourses__Youtube} from "../YoutubeCoursesData/LinuxYouTubeVIdeosData";
import {BugHuntingVideos} from "../YoutubeCoursesData/BugHuntingVideos";
import {Card, CardBody, CardFooter, Channel_Img, ChannelHeading, Img, Link, Tag, User, UserInfo, VideoHeading} from './VideoCardElements'

const VideosCard = [ CyberSecFreeYoutubeVideosData, LinuxCourses__Youtube, BugHuntingVideos ];

export const CyberYoutubeVideosCard = CyberSecFreeYoutubeVideosData.map(
    (data) => {
        return (
            <Card>
                <div>
                    <Img src={data.YTChannelImageLink} alt="card__image"
                         width="600"/>
                </div>
                <CardBody>
                    <Tag className="tag-brown">{data.tag}</Tag>
                    <VideoHeading><Link to={data.videoLink} target={"_blank"}>{data.videoHeading}</Link>
                    </VideoHeading>
                </CardBody>

                <hr/>
                <CardFooter>
                    <User>
                        <Channel_Img src={data.channelLogo} alt="user__image"/>
                        <UserInfo>
                            <ChannelHeading><Link to={data.channelLink} target={"_blank"}>{data.channelName}</Link>
                            </ChannelHeading>
                            <small>{data.timeStamp}</small>
                        </UserInfo>
                    </User>
                </CardFooter>
            </Card>
        )
    }
);

export const BugHuntingVideosCard = BugHuntingVideos.map(
    (data) => {
        return (
            <Card>
                <div>
                    <Img src={data.YTChannelImageLink} alt="card__image"
                         width="600"/>
                </div>
                <CardBody>
                    <Tag className="tag-brown">{data.tag}</Tag>
                    <VideoHeading><Link to={data.videoLink} target={"_blank"}>{data.videoHeading}</Link>
                    </VideoHeading>
                </CardBody>

                <hr/>
                <CardFooter>
                    <User>
                        <Channel_Img src={data.channelLogo} alt="user__image"/>
                        <UserInfo>
                            <ChannelHeading><Link to={data.channelLink} target={"_blank"}>{data.channelName}</Link>
                            </ChannelHeading>
                            <small>{data.timeStamp}</small>
                        </UserInfo>
                    </User>
                </CardFooter>
            </Card>
        )
    }
);
export const LinuxYoutubeVideosCard = LinuxCourses__Youtube.map(
    (data) => {
        return (
            <Card>
                <div>
                    <Img src={data.YTChannelImageLink} alt="card__image"
                         width="600"/>
                </div>
                <CardBody>
                    <Tag className="tag-brown">{data.tag}</Tag>
                    <VideoHeading><Link to={data.videoLink} target={"_blank"}>{data.videoHeading}</Link>
                    </VideoHeading>
                </CardBody>

                <hr/>
                <CardFooter>
                    <User>
                        <Channel_Img src={data.channelLogo} alt="user__image"/>
                        <UserInfo>
                            <ChannelHeading><Link to={data.channelLink} target={"_blank"}>{data.channelName}</Link>
                            </ChannelHeading>
                            <small>{data.timeStamp}</small>
                        </UserInfo>
                    </User>
                </CardFooter>
            </Card>
        )
    }
);
