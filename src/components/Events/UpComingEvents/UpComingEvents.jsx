import React from "react";
import { UpComingEventsContainer } from "./UpComingEventsElements";

import {
    EventsVenue,
    EventsContent,
    EventsHeader,
    EventsImage,
    EventsSubHeading,
    EventLocation,
    EventLink,
    EventsHeadingMedium,
} from "../EventsElement";

const UpComingEvents = (event) => {
    return (
        <>
            <UpComingEventsContainer>
                <EventsHeader>
                    <EventsImage src={event.image} about="Event Image" width="100%" height="180px" />
                    <EventLink href={event.url} target={"_blank"}>
                        <EventsHeadingMedium> {event.title} </EventsHeadingMedium>
                    </EventLink>
                    <EventsSubHeading>
                        <EventLocation> {event.location} </EventLocation>
                        {event.date} • <EventsVenue> {event.venue} </EventsVenue>
                    </EventsSubHeading>
                </EventsHeader>
                <EventsContent> {event.content.slice(0, 200)} </EventsContent>
            </UpComingEventsContainer>
        </>
    );
};

export default UpComingEvents;
