import React, {useState} from "react";
import "../Extra/Events.css";
import {
    PastEventsContainer,
    PastEvents_Content,
    PastEvents_Image,
    PastEvents_Title,
    PastEvents_Heading,
    PastEvents_SubHeading,
    PastEvents_ChangeViewBtn,
    PastEvents_DiscordLink
} from "./PastEventsElements";

const PastEvents = (props) => {
    const [viewFull, setViewFull] = useState(false)
    return (
        <>
            <PastEventsContainer>
                <PastEvents_Title>
                    <PastEvents_Image src={props.image} alt="Event Image" width="100%" height="180px"/>
                    <PastEvents_Heading>{props.title}</PastEvents_Heading>
                    <PastEvents_SubHeading>
                        {props.date} • <PastEvents_DiscordLink href={props.venue} target={"_blank"}> Discord </PastEvents_DiscordLink>
                    </PastEvents_SubHeading>
                </PastEvents_Title>
                {/*<PastEvents_Content>*/}
                {/*    {viewFull ? props.content : props.content.slice(0, 200) + "..."}<br></br>*/}
                {/*    <PastEvents_ChangeViewBtn onClick={() => {setViewFull(!viewFull)}}>*/}
                {/*        {viewFull ? "See Less" : "See More"}*/}
                {/*    </PastEvents_ChangeViewBtn>*/}
                {/*</PastEvents_Content>*/}
            </PastEventsContainer>
        </>
    );
};

export default PastEvents;