import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";

import { EventItem } from "./EventItemListElement";
import { MdLocationOnIcon, BiChevronDownIcon, BiSolidChevronUpIcon } from "./CommunityEventsElement";
import DateDisplay from "src/components/Common/DateDisplay";
import ParticipantsDisplay from "./ParticipantsDisplay";
import DurationDisplay from "src/components/Common/DurationDisplay/DurationDisplay";

export const EventItemList = ({ event, actions, index, modify, eventsJoinedId, user, onActionChange, tabStatus }) => {
    const [openEventIndex, setOpenEventIndex] = useState(null);
    const [actionDisplay, setActionDisplay] = useState("");
    const [leftPlacesToJoin, setLeftPlacesToJoin] = useState(100);
    const nativage = useNavigate();
    useEffect(() => {
        if (!user) {
            setActionDisplay("Join*");
            setLeftPlacesToJoin(100);
            return;
        }
        if (eventsJoinedId.includes(event._id)) {
            setActionDisplay("Joined");
        } else {
            setActionDisplay("Join");
        }
        setLeftPlacesToJoin(event.maxParticipantsNumber - event.participants.length);
    }, [eventsJoinedId, event, user]);

    const handleDisplayActionClick = () => {
        if (!user) return toast.info("To Join An Event You First Need To Login/Register To The Website");
        if (leftPlacesToJoin === 0 && !eventsJoinedId.includes(event._id))
            return toast.info("This event is full , keep in touch for future events");
        onActionChange(actionDisplay, event._id);
    };

    return (
        <EventItem isRequestedEvent={event.reschedule} key={index}>
            <DateDisplay
                rightBorder
                time={event.startTime}
                isCanBeToday={event.status === "approved" && tabStatus !== "past"}
            />
            <div className="time-line">
                <DurationDisplay>{event}</DurationDisplay>
                <div className="time-line-detail">
                    <MdLocationOnIcon />
                    <p className="text-over-flow">{event.location}</p>
                </div>
            </div>
            <div className="details">
                <div style={{ maxWidth: "90%" }}>
                    <p style={{ overflowWrap: "break-word" }}>{event.name.toUpperCase()}</p>
                    <ParticipantsDisplay participants={event.participants} />
                </div>
                {event.reschedule && <div className="details-request">15:30 - 16:00 requested</div>}
            </div>
            {modify && actions[tabStatus] && actions[tabStatus].length > 0 ? (
                <div className="action" onMouseLeave={() => setOpenEventIndex(null)}>
                    <div
                        onClick={() => setOpenEventIndex(openEventIndex === index ? null : index)}
                        className="action-edit"
                    >
                        <p>Options</p>
                        {openEventIndex === index ? <BiSolidChevronUpIcon /> : <BiChevronDownIcon />}
                    </div>

                    {openEventIndex === index && (
                        <div className="action-dropdown">
                            {actions[tabStatus].map(({ icon: Icon, text, onClick }) => (
                                <div
                                    onClick={() => {
                                        onClick(event);
                                        setOpenEventIndex(openEventIndex === index ? null : index);
                                    }}
                                    className="action-dropdown-list"
                                    key={text}
                                >
                                    <Icon />
                                    <p>{text}</p>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            ) : (
                (tabStatus === "upcoming" || tabStatus === "ongoing") && (
                    <div className="container-action-and-text">
                        <div className="container-action">
                            <div className="action">
                                <div
                                    className={`action-edit without-dropdown ${
                                        leftPlacesToJoin === 0 && actionDisplay !== "Joined"
                                            ? " uniqe-state-button"
                                            : actionDisplay === "Join"
                                            ? " enable-button"
                                            : " disable-button"
                                    }`}
                                    onClick={handleDisplayActionClick}
                                >
                                    <p>
                                        {leftPlacesToJoin === 0 && actionDisplay !== "Joined" ? "Full" : actionDisplay}
                                    </p>
                                </div>
                            </div>
                            <div className="action">
                                <div
                                    className={`action-edit without-dropdown `}
                                    onClick={() =>
                                        nativage(`/community-events/${event._id.slice(0, 10)}`, {
                                            state: { actionDisplay, event },
                                        })
                                    }
                                >
                                    <p>View</p>
                                </div>
                            </div>
                        </div>
                        <div className="details">
                            <p>{event.participants.length ? `users joined: ${event.participants.length}` : ""}</p>
                        </div>
                    </div>
                )
            )}
        </EventItem>
    );
};
