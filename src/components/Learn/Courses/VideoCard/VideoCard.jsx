import React from "react";

import {
    CyberSecCoursesData,
    LinuxCoursesData,
    BugHuntingCoursesData,
    RedTeamCoursesData,
    BlueTeamCoursesData,
} from "src/components/Learn/Courses/YoutubeCoursesData";

import {
    Card,
    CardBody,
    CardFooter,
    ChannelImg,
    ChannelHeading,
    Img,
    Link,
    Tag,
    User,
    UserInfo,
    VideoHeading,
} from "./VideoCardElements";

// const CoursesCard = [
//     CyberSecCoursesData,
//     LinuxCoursesData,
//     BugHuntingCoursesData,
//     RedTeamCoursesData,
//     BlueTeamCoursesData,
// ];

export const CyberYoutubeVideosCard = CyberSecCoursesData.map((data, id) => {
    return (
        <Card key={id}>
            <div>
                <Img src={data.YTChannelImageLink} alt="card__image" width="600" />
            </div>
            <CardBody>
                <Tag className="tag-brown">{data.tag}</Tag>
                <VideoHeading>
                    <Link href={data.videoLink} target={"_blank"}>
                        {data.videoHeading}
                    </Link>
                </VideoHeading>
            </CardBody>
            <hr />
            <CardFooter>
                <User>
                    <ChannelImg src={data.channelLogo} alt="user__image" />
                    <UserInfo>
                        <ChannelHeading>
                            <Link href={data.channelLink} target={"_blank"}>
                                {data.channelName}
                            </Link>
                        </ChannelHeading>
                        <small>{data.timeStamp}</small>
                    </UserInfo>
                </User>
            </CardFooter>
        </Card>
    );
});

export const BugHuntingVideosCard = BugHuntingCoursesData.map((data, id) => {
    return (
        <Card key={id}>
            <div>
                <Img src={data.YTChannelImageLink} alt="card__image" width="600" />
            </div>
            <CardBody>
                <Tag className="tag-brown">{data.tag}</Tag>
                <VideoHeading>
                    <Link href={data.videoLink} target={"_blank"}>
                        {data.videoHeading}
                    </Link>
                </VideoHeading>
            </CardBody>
            <hr />
            <CardFooter>
                <User>
                    <ChannelImg src={data.channelLogo} alt="user__image" />
                    <UserInfo>
                        <ChannelHeading>
                            <Link href={data.channelLink} target={"_blank"}>
                                {data.channelName}
                            </Link>
                        </ChannelHeading>
                        <small>{data.timeStamp}</small>
                    </UserInfo>
                </User>
            </CardFooter>
        </Card>
    );
});
export const LinuxYoutubeVideosCard = LinuxCoursesData.map((data, id) => {
    return (
        <Card key={id}>
            <div>
                <Img src={data.YTChannelImageLink} alt="card__image" width="600" />
            </div>
            <CardBody>
                <Tag className="tag-brown">{data.tag}</Tag>
                <VideoHeading>
                    <Link href={data.videoLink} target={"_blank"}>
                        {data.videoHeading}
                    </Link>
                </VideoHeading>
            </CardBody>
            <hr />
            <CardFooter>
                <User>
                    <ChannelImg src={data.channelLogo} alt="user__image" />
                    <UserInfo>
                        <ChannelHeading>
                            <Link href={data.channelLink} target={"_blank"}>
                                {data.channelName}
                            </Link>
                        </ChannelHeading>
                        <small>{data.timeStamp}</small>
                    </UserInfo>
                </User>
            </CardFooter>
        </Card>
    );
});

export const RedTeamCoursesCard = RedTeamCoursesData.map((data, id) => {
    return (
        <Card key={id}>
            <div>
                <Img src={data.YTChannelImageLink} alt="card__image" width="600" />
            </div>
            <CardBody>
                <Tag className="tag-brown">{data.tag}</Tag>
                <VideoHeading>
                    <Link href={data.videoLink} target={"_blank"}>
                        {data.videoHeading}
                    </Link>
                </VideoHeading>
            </CardBody>
            <hr />
            <CardFooter>
                <User>
                    <ChannelImg src={data.channelLogo} alt="user__image" />
                    <UserInfo>
                        <ChannelHeading>
                            <Link href={data.channelLink} target={"_blank"}>
                                {data.channelName}
                            </Link>
                        </ChannelHeading>
                        <small>{data.timeStamp}</small>
                    </UserInfo>
                </User>
            </CardFooter>
        </Card>
    );
});
export const BlueTeamCoursesCard = BlueTeamCoursesData.map((data, id) => {
    return (
        <Card key={id}>
            <div>
                <Img src={data.YTChannelImageLink} alt="card__image" width="600" />
            </div>
            <CardBody>
                <Tag className="tag-brown">{data.tag}</Tag>
                <VideoHeading>
                    <Link href={data.videoLink} target={"_blank"}>
                        {data.videoHeading}
                    </Link>
                </VideoHeading>
            </CardBody>
            <hr />
            <CardFooter>
                <User>
                    <ChannelImg src={data.channelLogo} alt="user__image" />
                    <UserInfo>
                        <ChannelHeading>
                            <Link href={data.channelLink} target={"_blank"}>
                                {data.channelName}
                            </Link>
                        </ChannelHeading>
                        <small>{data.timeStamp}</small>
                    </UserInfo>
                </User>
            </CardFooter>
        </Card>
    );
});
