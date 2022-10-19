import React from "react";
import { Section } from "../Resources/WriteUps/WriteUpsElements";
import EventsData from "./EventsData/EventsData";
import PastEvents from "./PastEvents/PastEvents";
import OnGoingEvents from "./OnGoingEvents/OnGoingEvents";
import UpComingEvents from "./UpComingEvents/UpComingEvents";
import {
  EventsContainer,
  OnGoingEventsContainer,
  MainEventsContainer,
  PastEventsContainer,
  UpComingEventsContainer,
  EventsHeading,
} from "./EventsElement";

function padTo2Digits(num) {
  return num.toString().padStart(2, "0");
}
function formatDate(date) {
  return [padTo2Digits(date.getMonth() + 1), date.getFullYear(), padTo2Digits(date.getDate())].join("/");
}

const Events = () => {
  const todayDate = new Date(Date());

  return (
    <Section>
      <EventsContainer>
        <MainEventsContainer>
          {EventsData.some((event) => formatDate(todayDate) === formatDate(new Date(event.validationDate))) && (
            <>
              <EventsHeading>Today's Events</EventsHeading>
              <OnGoingEventsContainer>
                {EventsData.map(
                  (event) =>
                    formatDate(todayDate) === formatDate(new Date(event.validationDate)) && (
                      <OnGoingEvents
                        title={event.title}
                        image={event.image}
                        venue={event.venue}
                        date={event.date}
                        content={event.content}
                      />
                    ),
                )}
              </OnGoingEventsContainer>
            </>
          )}

          {EventsData.some((event) => formatDate(todayDate) < formatDate(new Date(event.validationDate))) && (
            <>
              <EventsHeading>Up Coming</EventsHeading>
              <UpComingEventsContainer>
                {EventsData.map(
                  (event) =>
                    formatDate(todayDate) < formatDate(new Date(event.validationDate)) && (
                      <UpComingEvents
                        title={event.title}
                        image={event.image}
                        venue={event.venue}
                        date={event.date}
                        content={event.content}
                      />
                    ),
                )}
              </UpComingEventsContainer>
            </>
          )}
        </MainEventsContainer>

        {EventsData.some((event) => formatDate(todayDate) > formatDate(new Date(event.validationDate))) && (
          <PastEventsContainer>
            <EventsHeading>Past Events</EventsHeading>
            {EventsData.map(
              (event) =>
                formatDate(todayDate) > formatDate(new Date(event.validationDate)) && (
                  <PastEvents
                    title={event.title}
                    image={event.image}
                    venue={event.venue}
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
