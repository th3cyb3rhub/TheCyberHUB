import React from "react";
import { Section } from "../WriteUps/WriteUpsElements";
import EventsData from "./EventsData/EventsData";
import CTFData from "../../CyberGames/CTF/CTFData";
import PastEvents from "./PastEvents/PastEvents";
import OnGoingEvents from "./OnGoingEvents/OnGoingEvents";
import UpComingEvents from "./UpComingEvents/UpComingEvents";
import {
    EventsContainer,
    MainEventsContainer,
    EventsHeading,
    OnGoingEventsContainer,
    UpComingEventsContainer,
    PastEventsContainer,
} from "./EventsElement";

function padTo2Digits(num) {
    return num.toString().padStart(2, "0");
}

function formatDate(date) {
    return [padTo2Digits(date.getMonth() + 1), date.getFullYear(), padTo2Digits(date.getDate())].join("/");
}

const Events = () => {
    const todayDate = new Date(Date());

    const allEvents = [...EventsData, ...CTFData];

    allEvents.map((event) => console.log(event.date));

    return (
        <Section>
            <EventsContainer>
                <MainEventsContainer>
                    {allEvents.some(
                        (event) => formatDate(todayDate) === formatDate(new Date(event.validationDate)),
                    ) && (
                        <>
                            <EventsHeading>Today Events</EventsHeading>
                            <OnGoingEventsContainer>
                                {allEvents.map(
                                    (event, id) =>
                                        formatDate(todayDate) === formatDate(new Date(event.validationDate)) && (
                                            <OnGoingEvents
                                                key={id}
                                                title={event.title}
                                                image={event.image}
                                                venue={event.venue}
                                                location={event.location}
                                                url={event.url}
                                                date={event.date}
                                                content={event.content}
                                            />
                                        ),
                                )}
                            </OnGoingEventsContainer>
                        </>
                    )}

                    {allEvents.some((event) => formatDate(todayDate) < formatDate(new Date(event.validationDate))) && (
                        <>
                            <EventsHeading>Up Coming Events</EventsHeading>
                            <UpComingEventsContainer>
                                {allEvents.map(
                                    (event, id) =>
                                        formatDate(todayDate) < formatDate(new Date(event.validationDate)) && (
                                            <UpComingEvents
                                                key={id}
                                                title={event.title}
                                                image={event.image}
                                                venue={event.venue}
                                                location={event.location}
                                                url={event.url}
                                                date={event.date}
                                                content={event.content}
                                            />
                                        ),
                                )}
                            </UpComingEventsContainer>
                        </>
                    )}
                </MainEventsContainer>

                {allEvents.some((event) => formatDate(todayDate) > formatDate(new Date(event.validationDate))) && (
                    <PastEventsContainer>
                        <EventsHeading>Past Events</EventsHeading>
                        {allEvents.map(
                            (event, id) =>
                                formatDate(todayDate) > formatDate(new Date(event.validationDate)) && (
                                    <PastEvents
                                        key={id}
                                        title={event.title}
                                        image={event.image}
                                        venue={event.venue}
                                        location={event.location}
                                        url={event.url}
                                        date={event.date}
                                        content={event.content}
                                    />
                                ),
                        )}
                    </PastEventsContainer>
                )}
            </EventsContainer>
        </Section>
    );
};

export default Events;
