import React from "react";
import { PastEventsContainer } from "./PastEventsElements";

import {
    EventLocation,
    EventsHeadingSmall,
    EventsImage,
    EventsSubHeading,
    EventsVenue,
} from "src/components/OldEvents/EventsElement";

const PastEvents = (event) => {
    return (
        <PastEventsContainer key={event.id}>
            <div>
                <EventsImage src={event.image} about="Event Image" width="100%" height="180px" />
                <EventsHeadingSmall> {event.title} </EventsHeadingSmall>
                <EventsSubHeading>
                    <EventLocation> {event.location} </EventLocation>
                    {event.date} • <EventsVenue> {event.venue} </EventsVenue>
                </EventsSubHeading>
            </div>
        </PastEventsContainer>
    );
};

export default PastEvents;
