import React from "react";
import { useParams } from "react-router";

import {
  LinuxYoutubeVideosCard,
  CyberYoutubeVideosCard,
  BugHuntingVideosCard,
  RedTeamCoursesCard,
  BlueTeamCoursesCard,
} from "./VideoCard/VideoCard";

const COURSES_CARD_INFO = {
  linux: {
    title: "Linux",
    content: LinuxYoutubeVideosCard,
  },
  cyber_security: {
    title: "Cyber Security",
    content: CyberYoutubeVideosCard,
  },
  bug_hunting: {
    title: "Bug bounty hunting",
    content: BugHuntingVideosCard,
  },
  red_team: {
    title: "Red Team",
    content: RedTeamCoursesCard,
  },
  blue_team: {
    title: "Blue Team",
    content: BlueTeamCoursesCard,
  },
};

const YoutubeCourseDetail = () => {
  const params = useParams();

  return (
    <>
      <div className={"card__section"} id={"id"}>
        <h1 className={"h1_Courses"}>
          {COURSES_CARD_INFO[params.id].title} Courses
        </h1>
        <div className="container">{COURSES_CARD_INFO[params.id].content}</div>
      </div>
    </>
  );
};

export default YoutubeCourseDetail;
