import React from "react";
import { PastEventsContainer } from "./PastEventsElements";

import {
    EventLocation,
    EventsHeader,
    EventsHeadingSmall,
    EventsImage,
    EventsSubHeading,
    EventsVenue,
} from "../EventsElement";

const PastEvents = (event) => {
    return (
        <PastEventsContainer key={event.id}>
            <EventsHeader>
                <EventsImage src={event.image} about="Event Image" width="100%" height="180px" />
                <EventsHeadingSmall> {event.title} </EventsHeadingSmall>
                <EventsSubHeading>
                    <EventLocation> {event.location} </EventLocation>
                    {event.date} • <EventsVenue> {event.venue} </EventsVenue>
                </EventsSubHeading>
            </EventsHeader>
        </PastEventsContainer>
    );
};

export default PastEvents;
