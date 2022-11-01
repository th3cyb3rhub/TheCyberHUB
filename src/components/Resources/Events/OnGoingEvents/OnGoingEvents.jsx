import React from "react";
import { OnGoingEventsContainer } from "./OnGoingEventsElements";

import {
    EventsVenue,
    EventsContent,
    EventLocation,
    EventsHeading,
    EventsSubHeading,
    EventsImage,
    EventsHeader,
} from "../EventsElement";

const OnGoingEvents = (event) => {
    return (
        <OnGoingEventsContainer>
            <EventsHeader>
                <EventsImage src={event.image} about="Event Image" width="100%" height="180px" />
                <EventsHeading> {event.title} </EventsHeading>
                <EventsSubHeading>
                    <EventLocation> {event.location} </EventLocation>
                    {event.date} • <EventsVenue> {event.venue} </EventsVenue>
                </EventsSubHeading>
            </EventsHeader>
            <EventsContent> {event.content.slice(0, 200)} </EventsContent>
        </OnGoingEventsContainer>
    );
};

export default OnGoingEvents;
