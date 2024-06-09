import React, { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { GoProjectSymlink } from "react-icons/go";
import { AddToCalendarButton } from "add-to-calendar-button-react";
import { format } from "date-fns";

import {
    EventDetails,
    EventDetailsDateContainer,
    EventDetailsDescription,
    EventDetailsHeader,
    EventDetailsHeaderContainer,
    EventDetailsHeaderText,
    EventDetailsTitle,
    EventLink,
} from "./DisplayEventDetailsElement";
import DateDisplay from "src/components/Common/DateDisplay";
import ParticipantsDisplay from "src/components/CommunityEvents/ParticipantsDisplay";
import DisplayTimelineList from "./DisplayTimelineList";

const DisplayEventDetails = () => {
    const [currentEvent, setCurrentEvent] = useState({});
    const { actionDisplay, event } = useLocation().state || {};
    useEffect(() => {
        if (event) setCurrentEvent(event);
    }, [event]);
    if (!currentEvent) return <></>;

    const startTimeDateType = currentEvent?.startTime ? new Date(currentEvent?.startTime) : "";
    const endTimeDateType = currentEvent?.endTime ? new Date(currentEvent?.endTime) : "";

    const dateObj = {
        startDate: startTimeDateType ? format(startTimeDateType, "yyyy-MM-dd") : "",
        endDate: endTimeDateType ? format(endTimeDateType, "yyyy-MM-dd") : "",
        startTime: startTimeDateType ? format(startTimeDateType, "hh:mm") : "",
        endTime: endTimeDateType ? format(endTimeDateType, "hh:mm") : "",
    };
    return (
        <EventDetails>
            <EventDetailsHeaderContainer>
                <EventDetailsHeader>
                    <EventDetailsHeaderText>
                        <EventDetailsTitle>{currentEvent.name}</EventDetailsTitle>
                        <EventDetailsDescription>{currentEvent.description}</EventDetailsDescription>
                    </EventDetailsHeaderText>
                    <div>
                        <EventDetailsDateContainer>
                            <DateDisplay time={currentEvent.startTime} />
                        </EventDetailsDateContainer>
                        {actionDisplay === "Joined" && (
                            <AddToCalendarButton
                                options={[
                                    "Google",
                                    "Apple",
                                    "iCal",
                                    "Microsoft365",
                                    "MicrosoftTeams",
                                    "Outlook.com",
                                    "Yahoo",
                                ]}
                                name={currentEvent.name}
                                description={`${currentEvent.description}\n${currentEvent.link}`}
                                location={currentEvent.location}
                                hideCheckmark="true"
                                lightMode="dark"
                                buttonStyle="3d"
                                size="2"
                                startDate={dateObj?.startDate}
                                endDate={dateObj?.endDate}
                                startTime={dateObj?.startTime}
                                endTime={dateObj?.endTime}
                                timeZone={Intl.DateTimeFormat().resolvedOptions().timeZone}
                            />
                        )}
                    </div>
                </EventDetailsHeader>
                {actionDisplay === "Joined" && (
                    <EventLink
                        href={
                            /(https):\/\//i.test(currentEvent.link) ? currentEvent.link : `https://${currentEvent.link}`
                        }
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <GoProjectSymlink size="24px" style={{ marginRight: "10px" }} />
                        {currentEvent.link}
                    </EventLink>
                )}
            </EventDetailsHeaderContainer>
            <DisplayTimelineList>{currentEvent.timeline}</DisplayTimelineList>
            <ParticipantsDisplay participants={currentEvent.participants} />
        </EventDetails>
    );
};
export default DisplayEventDetails;
