import React from "react";
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
    RouterLink,
} from "./EventsElement";
import { encodeURL } from "../../Learn/Blogs/util";

function padTo2Digits(num) {
    return num.toString().padStart(2, "0");
}

function formatDate(date) {
    return [padTo2Digits(date.getMonth() + 1), date.getFullYear(), padTo2Digits(date.getDate())].join("/");
}

const Events = () => {
    const allEvents = [...EventsData, ...CTFData].sort(
        (a, b) => new Date(a.validationDate) - new Date(b.validationDate),
    );

    const pastEvents = allEvents.filter((event) => new Date(event.validationDate) < new Date()).reverse();
    const tenPastEvents = pastEvents.slice(0, 8);

    const todayDate = new Date(Date());

    return (
        <EventsContainer>
            <MainEventsContainer>
                {allEvents.some((event) => formatDate(todayDate) === formatDate(new Date(event.validationDate))) ? (
                    <>
                        <EventsHeading>Today Events</EventsHeading>
                        <OnGoingEventsContainer>
                            {allEvents.map((event, id) =>
                                formatDate(todayDate) === formatDate(new Date(event.validationDate)) ? (
                                    <RouterLink key={id} to={{ pathname: `${encodeURL(event.title)}` }}>
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
                                    </RouterLink>
                                ) : null,
                            )}
                        </OnGoingEventsContainer>
                    </>
                ) : null}

                {allEvents.some((event) => formatDate(todayDate) < formatDate(new Date(event.validationDate))) ? (
                    <>
                        <EventsHeading>Up Coming Events</EventsHeading>
                        <UpComingEventsContainer>
                            {allEvents.map((event, id) =>
                                formatDate(todayDate) < formatDate(new Date(event.validationDate)) ? (
                                    <RouterLink key={id} to={{ pathname: `${encodeURL(event.title)}` }}>
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
                                    </RouterLink>
                                ) : null,
                            )}
                        </UpComingEventsContainer>
                    </>
                ) : (
                    <>
                        <EventsHeading>No Up Coming Events</EventsHeading>
                    </>
                )}
            </MainEventsContainer>

            <PastEventsContainer>
                <EventsHeading>Past Events</EventsHeading>
                {tenPastEvents.map((event, id) =>
                    formatDate(todayDate) > formatDate(new Date(event.validationDate)) ? (
                        <RouterLink key={id} to={{ pathname: `${encodeURL(event.title)}` }}>
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
                        </RouterLink>
                    ) : null,
                )}
            </PastEventsContainer>
        </EventsContainer>
    );
};

export default Events;
