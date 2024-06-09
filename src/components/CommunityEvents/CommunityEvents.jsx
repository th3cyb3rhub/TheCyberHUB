import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import { createEvent, updateEvent, getEvents, eventsReset } from "src/features/events/eventsSlice";
import {
    ParentContainer,
    Container,
    Header,
    SubHeader,
    Tabs,
    NoDataComponent,
    EventNote,
    CommunityEventHeaderContainer,
    FilterContainer,
} from "./CommunityEventsElement";
import NoDataFound from "src/assets/images/no_data_found.svg";
import { EventItemList } from "./EventItemList";
import { RouterNavCreateButton } from "src/components/Header/Navbar/NavbarElements";
import ModifyCommunityEvent from "./ModifyCommunityEvent";
import LoadingSpinner from "src/components/Other/MixComponents/Spinner/LoadingSpinner";
import ModifyTimeline from "./ModifyTimeline";
import { SidebarFilterButtons } from "src/components/Common/SocialSidebar";

const CommunityEvents = ({
    pageHeader,
    title,
    subtitle,
    modify,
    actions = [],
    eventsJoinedId = [],
    user,
    onActionChange = () => {},
    modifyEventId,
    setModifyEventId,
    eventManageTimelineId,
    setEventManageTimelineId,
}) => {
    const dispatch = useDispatch();
    const { events, isEventLoading, isEventError, eventMessage } = useSelector((state) => state.events);
    const [isActiveTab, setActiveTab] = useState(0);
    const [openCreatingNewEvent, setOpenCreatingNewEvent] = useState(false);
    const [filterValue, setFilterValue] = useState("");

    const tabNames = [
        { id: 0, status: "upcoming" },
        { id: 1, status: "ongoing" },
        { id: 2, status: "past" },
        { id: 3, status: "cancelled" },
    ];

    useEffect(() => {
        if (isEventError) {
            toast.error(eventMessage);
        }
        dispatch(getEvents()).then((action) => {
            const hasOngoingEvent = action.payload.findIndex((eventItem) => {
                return (
                    eventItem.status === "approved" &&
                    new Date().getTime() >= new Date(eventItem.startTime).getTime() &&
                    new Date().getTime() < new Date(eventItem.endTime).getTime()
                );
            });
            if (hasOngoingEvent > -1) setActiveTab(1);
        });
        return () => dispatch(eventsReset());
    }, [dispatch]);

    const handleFilterUpdate = (filterLabel) => {
        setFilterValue(filterLabel);
    };

    const filterButtonsData = useMemo(
        () => [
            {
                filterLabel: "All",
                onClick: handleFilterUpdate,
                id: "All" + Math.random() * 100,
            },
            {
                filterLabel: "Join",
                onClick: handleFilterUpdate,
                id: "Join" + Math.random() * 100,
            },
            {
                filterLabel: "Joined",
                onClick: handleFilterUpdate,
                id: "Joined" + Math.random() * 100,
            },
            {
                filterLabel: "Full",
                onClick: handleFilterUpdate,
                id: "Full" + Math.random() * 100,
            },
        ],
        [],
    );

    let filteredEvents = events
        ? events
              .filter((event) => {
                  let eventFit = false;
                  if (tabNames[isActiveTab].status === "cancelled" || event.status === "cancelled")
                      return event.status === tabNames[isActiveTab].status;

                  switch (tabNames[isActiveTab].status) {
                      case "past":
                          if (new Date().getTime() >= new Date(event.endTime).getTime()) eventFit = true;
                          break;
                      case "upcoming":
                          if (new Date().getTime() < new Date(event.startTime).getTime()) eventFit = true;
                          break;
                      case "ongoing":
                          if (
                              new Date().getTime() >= new Date(event.startTime).getTime() &&
                              new Date().getTime() < new Date(event.endTime).getTime()
                          )
                              eventFit = true;
                          break;
                      default:
                          eventFit = false;
                  }
                  return eventFit;
              })
              .sort((a, b) => {
                  return a.date < b.date || (a.date === b.date && a.startTime < b.startTime);
              })
        : [];

    if (filterValue) {
        filteredEvents = filteredEvents.filter((event) => {
            let suitable = false;
            switch (filterValue) {
                case "Full":
                    if (
                        event.maxParticipantsNumber - event.participants.length === 0 &&
                        !eventsJoinedId.includes(event._id)
                    ) {
                        suitable = true;
                    }
                    break;
                case "Joined":
                    if (eventsJoinedId.includes(event._id)) {
                        suitable = true;
                    }
                    break;
                case "Join":
                    if (
                        event.maxParticipantsNumber - event.participants.length !== 0 &&
                        !eventsJoinedId.includes(event._id)
                    ) {
                        suitable = true;
                    }
                    break;
                default:
                    suitable = true;
            }
            return suitable; // }
        });
    }
    const handleModifyEvent = (newEvent, eventId = "") => {
        if (!eventId) return dispatch(createEvent(newEvent));
        dispatch(updateEvent({ id: newEvent._id, eventData: newEvent }));
        setModifyEventId("");
    };
    const handleCloseChangeMode = () => {
        setOpenCreatingNewEvent(false);
        setModifyEventId("");
        setEventManageTimelineId("");
    };

    useEffect(() => {
        if (!eventManageTimelineId) setOpenCreatingNewEvent(modifyEventId);
        if (modifyEventId || eventManageTimelineId) {
            window.scrollTo({
                top: 0,
                left: 0,
                behavior: "smooth",
            });
        }
    }, [modifyEventId, eventManageTimelineId]);

    const modifyEvent = events.find((event) => event._id === modifyEventId || event._id === eventManageTimelineId);
    return (
        <ParentContainer $pageHeader={pageHeader}>
            <Container>
                <Header>{title}</Header>
                <SubHeader>{subtitle}</SubHeader>
                {isEventLoading ? (
                    <LoadingSpinner />
                ) : (
                    <>
                        <CommunityEventHeaderContainer>
                            <Tabs>
                                {tabNames.map((tab, index) => (
                                    <button
                                        onClick={() => setActiveTab(index)}
                                        key={tab.id}
                                        className={isActiveTab === index ? "active" : ""}
                                    >
                                        {tab.status}
                                    </button>
                                ))}
                            </Tabs>
                            {modify && (
                                <RouterNavCreateButton noCenter onClick={() => setOpenCreatingNewEvent(true)}>
                                    Create Event
                                </RouterNavCreateButton>
                            )}
                            {!modify && (
                                <FilterContainer>
                                    <SidebarFilterButtons
                                        filterButtonsData={filterButtonsData}
                                        defaultButtonId={filterButtonsData[0].id}
                                    />
                                </FilterContainer>
                            )}
                        </CommunityEventHeaderContainer>
                        <div>
                            {modify && openCreatingNewEvent && (
                                <ModifyCommunityEvent
                                    onModify={handleModifyEvent}
                                    modifyEvent={modifyEvent}
                                    modifyEventId={modifyEventId}
                                    onCloseChangeMode={handleCloseChangeMode}
                                />
                            )}
                            {modify && !openCreatingNewEvent && eventManageTimelineId && (
                                <ModifyTimeline
                                    eventManageTimelineId={eventManageTimelineId}
                                    onCloseChangeMode={handleCloseChangeMode}
                                    onModify={handleModifyEvent}
                                    modifyEvent={modifyEvent}
                                />
                            )}
                            {filteredEvents.length !== 0 ? (
                                filteredEvents.map((event, index) => {
                                    return (
                                        <EventItemList
                                            event={event}
                                            actions={actions}
                                            key={index}
                                            index={index}
                                            modify={modify}
                                            eventsJoinedId={eventsJoinedId}
                                            user={user}
                                            onActionChange={onActionChange}
                                            tabStatus={tabNames[isActiveTab].status}
                                        />
                                    );
                                })
                            ) : (
                                <NoDataComponent>
                                    <h2>There are no {tabNames[isActiveTab].status} events right now.</h2>
                                    <img src={NoDataFound} alt="No data found" />
                                </NoDataComponent>
                            )}
                        </div>
                    </>
                )}
                {!modify && !user && (
                    <EventNote>* To Join An Event You First Need To Login/Register To The Website</EventNote>
                )}
            </Container>
        </ParentContainer>
    );
};

export default CommunityEvents;
