import React from "react";
import EventsData from "./EventsData/EventsData";
import CTFDataOld from "../../CaptureTheFlag/CTFDataOld";
import PastEvents from "./PastEvents/PastEvents";
import OnGoingEvents from "./OnGoingEvents/OnGoingEvents";
import UpComingEvents from "./UpComingEvents/UpComingEvents";
import {
    EventsContainer,
    EventsHeading,
    MainEventsContainer,
    OnGoingEventsContainer,
    PastEventsContainer,
    RouterLink,
    UpComingEventsContainer,
    UpComingEventsSection,
} from "./EventsElement";
import { encodeURL } from "../../Blogs/util";
import { Wrapper } from "../../Dashboard/Profile/ProfileElements";

function padTo2Digits(num) {
    return num.toString().padStart(2, "0");
}

function formatDate(date) {
    return [date.getFullYear(), padTo2Digits(date.getMonth() + 1), padTo2Digits(date.getDate())].join("/");
}

const Events = () => {
    const allEvents = [...EventsData, ...CTFDataOld].sort(
        (a, b) => new Date(a.validationDate) - new Date(b.validationDate),
    );

    const pastEvents = allEvents.filter((event) => new Date(event?.validationDate) < new Date()).reverse();
    const tenPastEvents = pastEvents.slice(0, 8);

    const todayDate = new Date(Date());
    return (
        <Wrapper>
            <EventsContainer>
                <MainEventsContainer>
                    {allEvents.some(
                        (event) => formatDate(todayDate) === formatDate(new Date(event?.validationDate)),
                    ) ? (
                        <>
                            <EventsHeading>Today Events</EventsHeading>
                            <OnGoingEventsContainer>
                                {allEvents.map((event, id) =>
                                    formatDate(todayDate) === formatDate(new Date(event?.validationDate)) ? (
                                        <RouterLink key={id} to={{ pathname: `${encodeURL(event?.title)}` }}>
                                            <OnGoingEvents
                                                key={id}
                                                title={event?.title}
                                                image={event?.image}
                                                venue={event?.venue}
                                                location={event?.location}
                                                url={event?.url}
                                                date={event?.date}
                                                content={event?.content}
                                            />
                                        </RouterLink>
                                    ) : null,
                                )}
                            </OnGoingEventsContainer>
                        </>
                    ) : null}

                    <EventsHeading>Past Events</EventsHeading>
                    <PastEventsContainer>
                        {tenPastEvents.map((event, id) =>
                            formatDate(todayDate) > formatDate(new Date(event?.validationDate)) ? (
                                <RouterLink key={id} to={{ pathname: `${encodeURL(event?.title)}` }}>
                                    <PastEvents
                                        key={id}
                                        title={event?.title}
                                        image={event?.image}
                                        venue={event?.venue}
                                        location={event?.location}
                                        url={event?.url}
                                        date={event?.date}
                                        content={event?.content}
                                    />
                                </RouterLink>
                            ) : null,
                        )}
                    </PastEventsContainer>
                </MainEventsContainer>
                {allEvents.some((event) => formatDate(todayDate) < formatDate(new Date(event?.validationDate))) ? (
                    <UpComingEventsSection>
                        <UpComingEventsContainer>
                            <EventsHeading>Up Coming Events</EventsHeading>
                            {allEvents.map((event, id) =>
                                formatDate(todayDate) < formatDate(new Date(event?.validationDate)) ? (
                                    <RouterLink key={id} to={{ pathname: `${encodeURL(event?.title)}` }}>
                                        <UpComingEvents
                                            key={id}
                                            title={event?.title}
                                            image={event?.image}
                                            venue={event?.venue}
                                            location={event?.location}
                                            url={event?.url}
                                            date={event?.date}
                                            content={event?.content}
                                        />
                                    </RouterLink>
                                ) : null,
                            )}
                        </UpComingEventsContainer>
                    </UpComingEventsSection>
                ) : (
                    <>
                        <EventsHeading>No Up Coming Events</EventsHeading>
                    </>
                )}
            </EventsContainer>
        </Wrapper>
    );
};

export default Events;
