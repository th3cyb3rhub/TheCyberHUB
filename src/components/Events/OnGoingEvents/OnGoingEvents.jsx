import React, { useState } from "react";
import {
  OnGoingEventsContainer,
  OnGoingEvents_Content,
  OnGoingEvents_Image,
  OnGoingEvents_Title,
  OnGoingEvents_Heading,
  OnGoingEvents_SubHeading,
  OnGoingEvents_ChangeViewBtn,
  OnGoingEvents_DiscordLink,
} from "./OnGoingEventsElements";

const OnGoingEvents = (props) => {
  const [viewFull, setViewFull] = useState(false);
  return (
    <>
      <OnGoingEventsContainer>
        <OnGoingEvents_Title>
          <OnGoingEvents_Image src={props.image} alt="Event Image" width="100%" height="180px" />
          <OnGoingEvents_SubHeading>
            {props.date} •{" "}
            <OnGoingEvents_DiscordLink href={props.venue} target={"_blank"}>
              {" "}
              Discord{" "}
            </OnGoingEvents_DiscordLink>
          </OnGoingEvents_SubHeading>
          <OnGoingEvents_Heading>{props.title}</OnGoingEvents_Heading>
        </OnGoingEvents_Title>
        <OnGoingEvents_Content>
          {viewFull ? props.content : props.content.slice(0, 200) + "..."}
          <br></br>
          <OnGoingEvents_ChangeViewBtn
            onClick={() => {
              setViewFull(!viewFull);
            }}
          >
            {viewFull ? "See Less" : "See More"}
          </OnGoingEvents_ChangeViewBtn>
        </OnGoingEvents_Content>
      </OnGoingEventsContainer>
    </>
  );
};

export default OnGoingEvents;
