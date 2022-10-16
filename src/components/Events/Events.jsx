import React from "react";
import {Section} from "../Resources/WriteUps/WriteUpsElements";
import EventsData from "./EventsData/EventsData";
import HacktoberfestEventData from "./EventsData/HacktoberfestEventData";
import PastEvents from "./PastEvents/PastEvents";
import OnGoingEvents from "./OnGoingEvents/OnGoingEvents";
import UpComingEvents from "./UpComingEvents/UpComingEvents";
import {
    EventsContainer,
    OnGoingEventsContainer,
    MainEventsContainer,
    PastEventsContainer,
    UpComingEventsContainer,
    EventsHeading
} from "./EventsElement";

// Here we formatted the date as in one form so that we can compare them
function padTo2Digits(num) {
    return num.toString().padStart(2, '0');
  }
function formatDate(date) {
    return [
      padTo2Digits(date.getMonth() + 1),
      date.getFullYear(),
      padTo2Digits(date.getDate()),
    ].join('/');
  }
  //Format date code ends here

const Events = () => {
    const todayDate = new Date(Date());
    const eventDate15 = "2022-10-15";
    const eventDate8 = "2022-10-8";
    // const date = new Date("2022/10/15");
    let q = new Date();
    let m = q.getMonth();
    let d = q.getDate();
    let y = q.getFullYear();
    let date = new Date(y, m, d);
    let mydate = new Date('2022-10-15');
    let eventdate0 = new Date(EventsData[0].validationDate);
    let eventdate1 = new Date(EventsData[1].validationDate);
    let eventdate2 = new Date(EventsData[2].validationDate);
    let eventdate3 = new Date(EventsData[3].validationDate);
    let eventdate4 = new Date(EventsData[4].validationDate);

    console.log(date);
    console.log(mydate)
    return (<Section>
        <EventsContainer>
            <MainEventsContainer>
                <EventsHeading>Today's Events</EventsHeading>
                <OnGoingEventsContainer>
                    {EventsData.map((event) => (formatDate(todayDate) === formatDate(new Date(event.validationDate))  && (
                            <OnGoingEvents title={event.title} image={event.image} venue={event.venue} date={event.date} content={event.content}/>
                    )))}
                </OnGoingEventsContainer>
                <EventsHeading>Up Coming</EventsHeading>
                <UpComingEventsContainer>
                    {EventsData.map((event) => (formatDate(todayDate) < formatDate(new Date(event.validationDate)) && (
                        <UpComingEvents title={event.title} image={event.image} venue={event.venue} date={event.date} content={event.content}/>)))}
                </UpComingEventsContainer>
            </MainEventsContainer>

            <PastEventsContainer>
                <EventsHeading>Past Events</EventsHeading>
                {EventsData.map((event) => (formatDate(todayDate) > formatDate(new Date(event.validationDate)) && (
                    <PastEvents title={event.title} image={event.image} venue={event.venue} date={event.date} content={event.content}/>)))}
            </PastEventsContainer>
        </EventsContainer>
    </Section>);
};

export default Events;