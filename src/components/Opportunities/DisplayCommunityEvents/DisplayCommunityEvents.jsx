import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import CommunityEvents from "src/components/CommunityEvents/CommunityEvents";
import { addParticipant, removeParticipant } from "src/features/events/eventsSlice";
import { getUserDetail } from "src/features/userDetail/userDetailSlice";
import { toast } from "react-toastify";

const DisplayCommunityEvents = () => {
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);
    const { userDetail, isUserDetailError, userDetailMessage } = useSelector((state) => state.userDetail);
    const countLeaveEvent = useRef(0);
    useEffect(() => {
        countLeaveEvent.current = 0;
        if (isUserDetailError) {
            toast.error(userDetailMessage);
            console.log(userDetailMessage);
            return;
        }
        if (user) {
            dispatch(getUserDetail(user.username));
        }
    }, [dispatch, isUserDetailError, userDetailMessage]);

    const handleActionChange = (actionDisplay, eventId) => {
        if (!user) return;
        if (actionDisplay === "Join") {
            dispatch(addParticipant({ eventId, userId: user._id }));
        } else {
            if (countLeaveEvent.current === 0) {
                toast.info(
                    "If you will leave this event and it becomes full you couldn't join again. To leave click the 'Joined/Full' button again.",
                );
                return (countLeaveEvent.current = 1);
            }
            dispatch(removeParticipant({ eventId, userId: user._id }));
            countLeaveEvent.current = 0;
        }
    };
    return (
        <CommunityEvents
            pageHeader
            title="Community Events"
            subtitle="Join to any of the Community Events to develop your skill set."
            eventsJoinedId={userDetail.events}
            user={user}
            onActionChange={handleActionChange}
        />
    );
};

export default DisplayCommunityEvents;
