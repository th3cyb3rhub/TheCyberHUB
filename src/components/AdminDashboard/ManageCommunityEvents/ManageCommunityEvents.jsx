import React, { useState } from "react";
import { useDispatch } from "react-redux";

import CommunityEvents from "src/components/CommunityEvents";
import { updateEvent } from "src/features/events/eventsSlice";
import {
    AiOutlineCloseCircleIcon,
    AiOutlineFieldTimeIcon,
    BiUserPlusIcon,
    CommunityEventsContainer,
    TbEditCircleIcon,
    TbRestoreIcon,
} from "./ManageCommunityEventsElements";

const ManageCommunityEvents = () => {
    const dispatch = useDispatch();
    const [modifyEventId, setModifyEventId] = useState("");
    const [eventManageTimelineId, setEventManageTimelineId] = useState("");
    const activeEvents = [
        {
            icon: TbEditCircleIcon,
            text: "Edit Details",
            onClick: (modifiedEvent) => setModifyEventId(modifiedEvent._id),
        },
        {
            icon: AiOutlineFieldTimeIcon,
            text: "Manage Timeline",
            onClick: (modifiedEvent) => {
                setEventManageTimelineId(modifiedEvent._id);
            },
        },
        {
            icon: BiUserPlusIcon,
            text: "Invite people",
            onClick: (modifiedEvent) => {},
        },
        {
            icon: AiOutlineCloseCircleIcon,
            text: "Cancel event",
            onClick: (modifiedEvent) =>
                dispatch(updateEvent({ id: modifiedEvent._id, eventData: { ...modifiedEvent, status: "cancelled" } })),
        },
    ];
    const actions = {
        upcoming: activeEvents,
        ongoing: activeEvents,
        cancelled: [
            {
                icon: TbRestoreIcon,
                text: "Restore event",
                onClick: (modifiedEvent) => {
                    dispatch(
                        updateEvent({ id: modifiedEvent._id, eventData: { ...modifiedEvent, status: "approved" } }),
                    );
                },
            },
        ],
        past: [
            {
                icon: TbEditCircleIcon,
                text: "Edit Details",
                onClick: (modifiedEvent) => setModifyEventId(modifiedEvent._id),
            },
        ],
    };

    return (
        <CommunityEventsContainer>
            <CommunityEvents
                title="Manage Community Events"
                subtitle="Here you can manage the community events"
                modify
                actions={actions}
                modifyEventId={modifyEventId}
                setModifyEventId={setModifyEventId}
                eventManageTimelineId={eventManageTimelineId}
                setEventManageTimelineId={setEventManageTimelineId}
            />
        </CommunityEventsContainer>
    );
};
export default ManageCommunityEvents;
