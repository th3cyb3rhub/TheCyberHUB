import React, { useState } from "react";
import {
    UpComingEventsContainer,
    UpComingEventsContent,
    UpComingEventsImage,
    UpComingEventsTitle,
    UpComingEventsHeading,
    UpComingEventsSubHeading,
    UpComingEventsChangeViewBtn,
    UpComingEventsDiscordLink,
} from "./UpComingEventsElements";

const UpComingEvents = (props) => {
    const [viewFull, setViewFull] = useState(false);
    return (
        <>
            <UpComingEventsContainer>
                <UpComingEventsTitle>
                    <UpComingEventsImage src={props.image} alt="Event Image" width="100%" height="180px" />
                    <UpComingEventsHeading>{props.title}</UpComingEventsHeading>
                    <UpComingEventsSubHeading>
                        {props.date} •{" "}
                        <UpComingEventsDiscordLink href={props.venue} target={"_blank"}>
                            {" "}
                            Discord{" "}
                        </UpComingEventsDiscordLink>
                    </UpComingEventsSubHeading>
                </UpComingEventsTitle>
                <UpComingEventsContent>
                    {viewFull ? props.content : props.content.slice(0, 200) + "..."}
                    <br></br>
                    <UpComingEventsChangeViewBtn
                        onClick={() => {
                            setViewFull(!viewFull);
                        }}
                    >
                        {viewFull ? "See Less" : "See More"}
                    </UpComingEventsChangeViewBtn>
                </UpComingEventsContent>
            </UpComingEventsContainer>
        </>
    );
};

export default UpComingEvents;
