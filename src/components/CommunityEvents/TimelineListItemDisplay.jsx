import React, { useEffect, useState } from "react";

import {
    TimePicking,
    TimelineActivityContainer,
    TimelineDescriptionContainer,
    TimelineDurationContainer,
    TimelineListItem,
    TimelineTitleContainer,
    TimelineTopicContainer,
} from "./ModifyElements";
import InputEditor from "src/components/Common/InputEditor";
import MultipleSelect from "src/components/Common/MultipleSelect";
import TimePickerDisplay from "src/components/Common/TimePickerDisplay";

const topics = [
    "secure coding",
    "devOps practices",
    "open source collaboration",
    "cloud security",
    "vulnerability management",
    "automated security testing",
    "incident response",
    "container security",
    "regulatory compliance",
    "threat intelligence",
    "other",
];

const TimelineListItemDisplay = ({ timeLineListItemObj, setTimelineListItems, rangeDate }) => {
    const [selectedTopic, setSelectedTopic] = useState("");
    const [optionsValuesWithLabels, setOptionsValuesWithLabels] = useState([]);

    useEffect(() => {
        setOptionsValuesWithLabels(() => {
            return topics.map((topic) => {
                return { value: topic.toLowerCase(), label: topic.toLowerCase() };
            });
        });
    }, []);

    const handleChangeInput = (label, content) => {
        setTimelineListItems((prevTimeline) => {
            const updateTimelineItem = { ...prevTimeline[timeLineListItemObj.id], [label]: content };
            return { ...prevTimeline, [updateTimelineItem.id]: { ...updateTimelineItem } };
        });
    };
    const dateFieldType = rangeDate.to - rangeDate.from > 0 ? "pick date" : "show date";

    const handleSelectTopic = (topic) => {
        setSelectedTopic(topic);
        handleChangeInput("topic", topic);
    };

    return (
        <TimelineListItem>
            <TimelineTitleContainer>
                <InputEditor
                    inputType="text"
                    label="title"
                    placeholder="Title"
                    onCopyChanges={handleChangeInput}
                    content={timeLineListItemObj.title}
                />
            </TimelineTitleContainer>
            <TimelineActivityContainer>
                <InputEditor
                    inputType="text"
                    label="program"
                    placeholder="Activity / @Speaker"
                    onCopyChanges={handleChangeInput}
                    content={timeLineListItemObj.program}
                />
            </TimelineActivityContainer>
            <TimelineTopicContainer>
                <MultipleSelect
                    selectLabel="Topic"
                    selectedValue={selectedTopic}
                    onValueSelect={handleSelectTopic}
                    optionsValuesWithLabels={optionsValuesWithLabels}
                    defaultValue={timeLineListItemObj.topic}
                />
            </TimelineTopicContainer>
            <TimelineDurationContainer>
                <TimePicking>
                    <TimePickerDisplay
                        rangeDate={rangeDate}
                        nestedObj
                        modifyObj={timeLineListItemObj}
                        setModifyObj={setTimelineListItems}
                        dateFieldType={dateFieldType}
                        pickerLabel="From"
                    />
                    <TimePickerDisplay
                        rangeDate={rangeDate}
                        nestedObj
                        modifyObj={timeLineListItemObj}
                        setModifyObj={setTimelineListItems}
                        dateFieldType={dateFieldType}
                        pickerLabel="To"
                    />
                </TimePicking>
            </TimelineDurationContainer>
            <TimelineDescriptionContainer>
                <InputEditor
                    inputType="text"
                    label="description"
                    placeholder="Description"
                    onCopyChanges={handleChangeInput}
                    content={timeLineListItemObj.description}
                    isTextarea
                    textAreaHeight="100px"
                />
            </TimelineDescriptionContainer>
        </TimelineListItem>
    );
};
export default TimelineListItemDisplay;
