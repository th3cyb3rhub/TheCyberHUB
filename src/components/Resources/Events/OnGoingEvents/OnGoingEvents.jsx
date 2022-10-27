import React, { useState } from "react";
import {
    OnGoingEventsContainer,
    OnGoingEventsContent,
    OnGoingEventsImage,
    OnGoingEventsTitle,
    OnGoingEventsHeading,
    OnGoingEventsSubHeading,
    OnGoingEventsChangeViewBtn,
    OnGoingEventsDiscordLink,
} from "./OnGoingEventsElements";

const OnGoingEvents = (props) => {
    const [viewFull, setViewFull] = useState(false);
    return (
        <>
            <OnGoingEventsContainer>
                <OnGoingEventsTitle>
                    <OnGoingEventsImage src={props.image} alt="Event Image" width="100%" height="180px" />
                    <OnGoingEventsSubHeading>
                        {props.date} •
                        <OnGoingEventsDiscordLink href={props.venue} target={"_blank"}>
                            Discord
                        </OnGoingEventsDiscordLink>
                    </OnGoingEventsSubHeading>
                    <OnGoingEventsHeading>{props.title}</OnGoingEventsHeading>
                </OnGoingEventsTitle>
                <OnGoingEventsContent>
                    {viewFull ? props.content : props.content.slice(0, 200) + "..."}
                    <br></br>
                    <OnGoingEventsChangeViewBtn
                        onClick={() => {
                            setViewFull(!viewFull);
                        }}
                    >
                        {viewFull ? "See Less" : "See More"}
                    </OnGoingEventsChangeViewBtn>
                </OnGoingEventsContent>
            </OnGoingEventsContainer>
        </>
    );
};

export default OnGoingEvents;
