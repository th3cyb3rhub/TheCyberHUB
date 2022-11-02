import React from "react";
import { useParams } from "react-router-dom";
import { encodeURL } from "../../Learn/Blogs/util";
import EventsData from "./EventsData/EventsData";
import CTFData from "../../CyberGames/CTF/CTFData";
import { RoadmapContainer, RoadmapDetailsContainer } from "../../Learn/Roadmaps/RoadmapElements";

const Event = () => {
    const { title } = useParams();

    const allEvents = [...EventsData, ...CTFData].sort(
        (a, b) => new Date(a.validationDate) - new Date(b.validationDate),
    );

    const Event = allEvents.find((details) => encodeURL(details.title).toLowerCase() === title.toLowerCase());

    return (
        <RoadmapContainer>
            <RoadmapDetailsContainer>
                {Event.map((details, id) => (
                    <div key={id}>
                        <h2>{details.title}</h2>
                        <p>{details.content}</p>
                    </div>
                ))}
            </RoadmapDetailsContainer>
        </RoadmapContainer>
    );
};
export default Event;
