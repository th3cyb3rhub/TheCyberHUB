import React from "react";

import { DateDisplayContainer } from "./DateDisplayElements";

const getTimeRelatedData = (timeDate) => {
    const today = new Date();

    const todayString = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(
        today.getDate(),
    ).padStart(2, "0")}`;

    const daysOfWeek = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];
    const dayName = daysOfWeek[timeDate.getDay()];

    return [todayString, dayName];
};

const DateDisplay = ({ rightBorder, time, isCanBeToday = true }) => {
    const timeDate = time ? new Date(time) : new Date();
    const [todayString, dayName] = getTimeRelatedData(timeDate);
    return (
        <DateDisplayContainer rightBorder={rightBorder}>
            <div className={time?.split("T")[0] === todayString && isCanBeToday ? "date today-date" : "date"}>
                <p>{dayName}</p>
                <div className="date-digit-container">
                    <p className="date-digit ">
                        {timeDate.toLocaleString("default", {
                            month: "short",
                        })}
                    </p>
                    <p className="date-digit date-digit-day">
                        {+timeDate.getDate() < 10 ? `0${timeDate.getDate()}` : timeDate.getDate()}
                    </p>
                </div>
                <p className="date-digit date-year">{`${time?.split("-")[0]}`}</p>
            </div>
        </DateDisplayContainer>
    );
};
export default DateDisplay;
