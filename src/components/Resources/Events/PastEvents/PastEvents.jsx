import React from "react";
import {
    PastEventsContainer,
    PastEventsImage,
    PastEventsTitle,
    PastEventsHeading,
    PastEventsSubHeading,
    PastEventsDiscordLink,
} from "./PastEventsElements";

const PastEvents = (props) => {
    return (
        <>
            <PastEventsContainer>
                <PastEventsTitle>
                    <PastEventsImage src={props.image} alt="Event Image" width="100%" height="180px" />
                    <PastEventsHeading>{props.title}</PastEventsHeading>
                    <PastEventsSubHeading>
                        {props.date} •
                        <PastEventsDiscordLink href={props.venue} target={"_blank"}>
                            Discord
                        </PastEventsDiscordLink>
                    </PastEventsSubHeading>
                </PastEventsTitle>
            </PastEventsContainer>
        </>
    );
};

export default PastEvents;
