import React from "react";
import { useParams } from "react-router";
import CTFData from "../../../CyberGames/CTF/CTFData";
import { encodeURL } from "../../../Learn/Blogs/util";
import EventsData from "../EventsData/EventsData";
import {
    EventComponent,
    EventContent,
    EventDate,
    EventHeaderImage,
    EventHeaderImageContainer,
    EventTitle,
    EventVenue,
} from "../EventsElement";

const Event = () => {
    const { slug } = useParams();
    const event = [...EventsData, ...CTFData].find((event) => encodeURL(event.title) === slug);

    return (
        <EventComponent>
            <EventHeaderImageContainer>
                <EventHeaderImage src={event.image} alt={event.title} />
                <EventVenue>{event.venue}</EventVenue>
            </EventHeaderImageContainer>
            <EventTitle>{event.title}</EventTitle>
            <EventDate>{event.date}</EventDate>
            <EventContent>{event.content}</EventContent>
        </EventComponent>
    );
};

export default Event;
