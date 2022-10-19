import React from "react";

import {
  CyberSecCoursesData,
  LinuxCoursesData,
  BugHuntingCoursesData,
  RedTeamCoursesData,
  BlueTeamCoursesData,
} from "../YoutubeCoursesData";

import {
  Card,
  CardBody,
  CardFooter,
  Channel_Img,
  ChannelHeading,
  Img,
  Link,
  Tag,
  User,
  UserInfo,
  VideoHeading,
} from "./VideoCardElements";

const CoursesCard = [
  CyberSecCoursesData,
  LinuxCoursesData,
  BugHuntingCoursesData,
  RedTeamCoursesData,
  BlueTeamCoursesData,
];

export const CyberYoutubeVideosCard = CyberSecCoursesData.map((data) => {
  return (
    <Card>
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
          <Channel_Img src={data.channelLogo} alt="user__image" />
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

export const BugHuntingVideosCard = BugHuntingCoursesData.map((data) => {
  return (
    <Card>
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
          <Channel_Img src={data.channelLogo} alt="user__image" />
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
export const LinuxYoutubeVideosCard = LinuxCoursesData.map((data) => {
  return (
    <Card>
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
          <Channel_Img src={data.channelLogo} alt="user__image" />
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

export const RedTeamCoursesCard = RedTeamCoursesData.map((data) => {
  return (
    <Card>
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
          <Channel_Img src={data.channelLogo} alt="user__image" />
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
export const BlueTeamCoursesCard = BlueTeamCoursesData.map((data) => {
  return (
    <Card>
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
          <Channel_Img src={data.channelLogo} alt="user__image" />
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
