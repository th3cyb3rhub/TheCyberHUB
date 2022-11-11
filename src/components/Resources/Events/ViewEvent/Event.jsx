import React from "react";
import { useParams } from "react-router";
import CTFData from "../../../CyberGames/CTF/CTFData";
import { encodeURL } from "../../../Learn/Blogs/util";
import { Section } from "../../WriteUps/WriteUpsElements";
import EventsData from "../EventsData/EventsData";
import { ViewEventComponent } from "../EventsElement";

const Event = () => {
    const { slug } = useParams();
    const event = [...EventsData, ...CTFData].find((event) => encodeURL(event.title) === slug);

    return (
        <Section>
            <ViewEventComponent>
                <div className="imageVenueWrapper">
                    <img onError={() => alert("Image Error")} className="viewImg" src={event.image} alt={event.title} />
                    <span className="venue">{event.venue}</span>
                </div>
                <h1>{event.title}</h1>
                <h3>{event.date}</h3>
                <p>{event.content}</p>
            </ViewEventComponent>
        </Section>
    );
};

export default Event;
