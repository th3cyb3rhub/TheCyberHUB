import React, { useEffect, useState } from "react";
import { format } from "date-fns";

import {
    DisplayDate,
    DisplayDateContainer,
    TimeInputEditorContainer,
    TimeInputLabel,
    TimePickerContainer,
} from "./TimePickerDisplayElements";
import InputEditor from "src/components/Common/InputEditor";
import { addZeroToDateString, setDateAndTime } from "src/utils/dateTimeRelatedFunctions";
import MultipleSelect from "src/components/Common/MultipleSelect";

const TimePickerDisplay = ({
    rangeDate,
    dateFieldType = "",
    setModifyObj,
    modifyObj,
    nestedObj = false,
    pickerLabel,
    showLabel = true,
}) => {
    const [time, setTime] = useState({ startTime: "", endTime: "" });
    const [isStartTime, setIsStartTime] = useState(true);
    const [rangeSubDate, setRangeSubDate] = useState({});
    const [dateOptions, setDateOptions] = useState([]);

    useEffect(() => {
        if (modifyObj && modifyObj.startTime && modifyObj.endTime) {
            const startTimeDate = new Date(modifyObj.startTime);
            const endTimeDate = new Date(modifyObj.endTime);
            setTime({
                startTime: `${addZeroToDateString(startTimeDate.getHours())}:${addZeroToDateString(
                    startTimeDate.getMinutes(),
                )}`,
                endTime: `${addZeroToDateString(endTimeDate.getHours())}:${addZeroToDateString(
                    endTimeDate.getMinutes(),
                )}`,
            });
        }
        if (!rangeDate || !rangeDate.from || !rangeDate.to) return;
        const fromDateInFormat = format(rangeDate?.from, "yyyy-MM-dd");
        const toDateInFormat = format(rangeDate?.to, "yyyy-MM-dd");
        if (dateFieldType === "pick date" && modifyObj && modifyObj.startTime && modifyObj.endTime) {
            setRangeSubDate({
                from: format(new Date(modifyObj.startTime), "yyyy-MM-dd"),
                to: format(new Date(modifyObj.endTime), "yyyy-MM-dd"),
            });
        } else {
            setRangeSubDate({
                from: fromDateInFormat,
                to: toDateInFormat,
            });
        }
        setDateOptions([
            { value: fromDateInFormat, label: fromDateInFormat },
            { value: toDateInFormat, label: toDateInFormat },
        ]);
    }, []);

    useEffect(() => {
        setIsStartTime(pickerLabel === "From");
    }, [pickerLabel]);

    const handleUpdateTimeValue = (properyName, timeValue, dateValue) => {
        setModifyObj((prevEventObj) => {
            const houres = timeValue.split(":")[0];
            const minutes = timeValue.split(":")[1];
            if (!dateValue) dateValue = {};
            if (Object.keys(dateValue).length === 0) dateValue = isStartTime ? rangeSubDate?.from : rangeSubDate?.to;
            if (nestedObj) {
                const updateTimelineItem = {
                    ...prevEventObj[modifyObj.id],
                    [properyName]: setDateAndTime(new Date(dateValue), new Date().setHours(houres, minutes)),
                };
                return { ...prevEventObj, [updateTimelineItem.id]: { ...updateTimelineItem } };
            }
            return {
                ...prevEventObj,
                [properyName]: setDateAndTime(prevEventObj[properyName], new Date().setHours(houres, minutes)),
            };
        });
    };
    const handleDateSelect = (date) => {
        if (isStartTime) {
            handleUpdateTimeValue("startTime", time.startTime, date);
            setRangeSubDate((prevRange) => {
                return { ...prevRange, from: date };
            });
        } else {
            handleUpdateTimeValue("endTime", time.endTime, date);
            setRangeSubDate((prevRange) => {
                return { ...prevRange, to: date };
            });
        }
    };
    return (
        <TimePickerContainer>
            <TimeInputLabel>{showLabel && `${pickerLabel}:`}</TimeInputLabel>
            {dateFieldType === "show date" && (
                <DisplayDate>
                    {isStartTime
                        ? rangeDate?.from
                            ? format(rangeDate?.from, "yyyy-MM-dd")
                            : "yyyy-mm-dd"
                        : rangeDate?.to
                        ? format(rangeDate?.to, "yyyy-MM-dd")
                        : "yyyy-mm-dd"}
                </DisplayDate>
            )}
            {dateFieldType === "pick date" && (
                <DisplayDateContainer>
                    <MultipleSelect
                        selectLabel="Date"
                        selectedValue={isStartTime ? rangeSubDate.from : rangeSubDate.to}
                        onValueSelect={handleDateSelect}
                        optionsValuesWithLabels={dateOptions}
                    />
                </DisplayDateContainer>
            )}
            <TimeInputEditorContainer dateFieldType={dateFieldType}>
                <InputEditor
                    inputType="time"
                    content={isStartTime ? time?.startTime : time?.endTime}
                    label={isStartTime ? "startTime" : "endTime"}
                    onCopyChanges={handleUpdateTimeValue}
                />
            </TimeInputEditorContainer>
        </TimePickerContainer>
    );
};
export default TimePickerDisplay;
