import React, { useState } from "react";
import {
  UpComingEventsContainer,
  UpComingEvents_Content,
  UpComingEvents_Image,
  UpComingEvents_Title,
  UpComingEvents_Heading,
  UpComingEvents_SubHeading,
  UpComingEvents_ChangeViewBtn,
  UpComingEvents_DiscordLink,
} from "./UpComingEventsElements";

const UpComingEvents = (props) => {
  const [viewFull, setViewFull] = useState(false);
  return (
    <>
      <UpComingEventsContainer>
        <UpComingEvents_Title>
          <UpComingEvents_Image src={props.image} alt="Event Image" width="100%" height="180px" />
          <UpComingEvents_Heading>{props.title}</UpComingEvents_Heading>
          <UpComingEvents_SubHeading>
            {props.date} •{" "}
            <UpComingEvents_DiscordLink href={props.venue} target={"_blank"}>
              {" "}
              Discord{" "}
            </UpComingEvents_DiscordLink>
          </UpComingEvents_SubHeading>
        </UpComingEvents_Title>
        <UpComingEvents_Content>
          {viewFull ? props.content : props.content.slice(0, 200) + "..."}
          <br></br>
          <UpComingEvents_ChangeViewBtn
            onClick={() => {
              setViewFull(!viewFull);
            }}
          >
            {viewFull ? "See Less" : "See More"}
          </UpComingEvents_ChangeViewBtn>
        </UpComingEvents_Content>
      </UpComingEventsContainer>
    </>
  );
};

export default UpComingEvents;
