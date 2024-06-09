import React, { useEffect, useState } from "react";
import { nanoid } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

import {
    ModifyActionsContainer,
    ModifyActionButton,
    ModifyItem,
    ModifyTimelineList,
    ModifyTimelineListContainer,
    ModifyItemActionsContainer,
} from "./ModifyElements";
import TimelineListItemDisplay from "./TimelineListItemDisplay";
import { format } from "date-fns";

const convertFromObjToArray = (objData) => {
    return Object.values(objData);
};
const convertFromArrayToObj = (arrayData) => {
    const newObjData = {};
    arrayData.forEach((item) => {
        newObjData[item._id] = { ...item, id: item._id };
    });
    return newObjData;
};

const generateNewItem = (prevObj) => {
    const newTemporaryId = nanoid();
    let objData = {};
    if (prevObj) objData = { ...prevObj };
    return {
        ...objData,
        [newTemporaryId]: {
            id: newTemporaryId,
            title: "",
            program: "",
            description: "",
            topic: "secure coding",
            startTime: "",
            endTime: "",
            eventDay: 1,
        },
    };
};
const ModifyTimeline = ({ onModify, onCloseChangeMode, modifyEvent, eventManageTimelineId }) => {
    const [timeLineListItems, setTimelineListItems] = useState({});
    const [rangeDate, setRangeDate] = useState({ from: "", to: "" });

    useEffect(() => {
        setTimelineListItems(() => {
            if (modifyEvent.timeline.length) return convertFromArrayToObj(modifyEvent.timeline);
            return generateNewItem();
        });
        setRangeDate({
            from: new Date(modifyEvent.startTime).setHours(0, 0, 0),
            to: new Date(modifyEvent.endTime).setHours(0, 0, 0),
        });
    }, []);
    const handleRemoveLastItem = () => {
        setTimelineListItems((prevTimelineListItems) => {
            const lastItemKey = Object.keys(prevTimelineListItems)[Object.keys(prevTimelineListItems).length - 1];
            const newTimelineListItems = { ...prevTimelineListItems };
            delete newTimelineListItems[lastItemKey];
            if (Object.keys(newTimelineListItems).length === 0) return generateNewItem(newTimelineListItems);
            return newTimelineListItems;
        });
    };
    const handleAddListItem = () => {
        setTimelineListItems((prevObj) => {
            return generateNewItem(prevObj);
        });
    };
    const timeLineList = Object.values(timeLineListItems).map((timeLineListItemObj) => {
        return (
            <TimelineListItemDisplay
                timeLineListItemObj={timeLineListItemObj}
                setTimelineListItems={setTimelineListItems}
                key={timeLineListItemObj.id}
                rangeDate={rangeDate}
            />
        );
    });
    const handleSaveTimeline = () => {
        // validate the every field is not empty
        let validationError = false;
        let timeValidationError = false;
        Object.values(timeLineListItems).some((valueObj) => {
            Object.values(valueObj).some((value) => {
                if (!value) {
                    validationError = true;
                }
                return validationError;
            });

            if (
                new Date(modifyEvent.startTime) > new Date(valueObj.startTime) ||
                new Date(modifyEvent.endTime) < new Date(valueObj.endTime) ||
                new Date(valueObj.startTime) >= new Date(valueObj.endTime)
            ) {
                timeValidationError = true;
                return timeValidationError;
            }
            return validationError;
        });
        if (validationError || timeValidationError) {
            if (validationError)
                return toast.error("Some of the input fields are empty, fill all the fields and try again");
            if (timeValidationError) {
                toast.error(`The end time can't be before start time.`);
                toast.error(
                    `In addition, the sub-event needs to be during the event time. from: ${format(
                        new Date(modifyEvent.startTime),
                        "EEEE hh:mm a",
                    )}, to: ${format(new Date(modifyEvent.endTime), "EEEE hh:mm a")}`,
                );
                return;
            }
        }
        const timelineArray = convertFromObjToArray(timeLineListItems).sort((itemA, itemB) => {
            const firstStart = new Date(itemA.startTime) - new Date(itemB.startTime);
            if (firstStart) return firstStart;
            return new Date(itemA.endTime) - new Date(itemB.endTime);
        });
        onModify({ ...modifyEvent, timeline: timelineArray }, eventManageTimelineId);
        onCloseChangeMode();
    };
    return (
        <ModifyItem>
            <ModifyTimelineListContainer>
                <ModifyTimelineList>{timeLineList}</ModifyTimelineList>
                <ModifyItemActionsContainer>
                    <ModifyActionButton type="add" onClick={handleAddListItem}>
                        <p type="add">Add</p>
                    </ModifyActionButton>
                    <ModifyActionButton type="remove" onClick={handleRemoveLastItem}>
                        <p type="remove">Remove</p>
                    </ModifyActionButton>
                </ModifyItemActionsContainer>
            </ModifyTimelineListContainer>
            <ModifyActionsContainer>
                <ModifyActionButton type="save" onClick={handleSaveTimeline}>
                    <p type="save">Save</p>
                </ModifyActionButton>
                <ModifyActionButton type="cancel" onClick={onCloseChangeMode}>
                    <p type="cancel">Cancel</p>
                </ModifyActionButton>
            </ModifyActionsContainer>
        </ModifyItem>
    );
};
export default ModifyTimeline;
