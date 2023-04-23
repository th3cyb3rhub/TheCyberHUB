import React from "react";
import ReactCalendarHeatmap from "react-calendar-heatmap";
import { ActivityGraphContainer } from "./ActivityGraphElements";

const ActivityGraph = ({ userDetail }) => {
    const ActivityDates = userDetail?.solved?.map((ctf) => ctf?.flags?.map((flag) => flag?.date)).flat() || [];
    const visitTimestamps = [...new Set(userDetail?.visitTimestamps)] || [];
    const allDates = [...ActivityDates, ...visitTimestamps];
    const dates = allDates.map((date) => date && date.split("T")[0]);

    const values = [];
    const dateWithCount = dates?.reduce((acc, date) => {
        if (acc[date]) {
            acc[date] = acc[date] + 1;
        } else {
            acc[date] = 1;
        }
        return acc;
    }, {});

    for (const date in dateWithCount) {
        values.push({ date, count: dateWithCount[date] });
    }

    const data = {
        startDate: "2023-01-01",
        endDate: "2023-12-31",
        values,
    };
    const tooltipDataAttrs = (value) => {
        return {
            "data-tip": value.date,
        };
    };
    return (
        <ActivityGraphContainer>
            <ReactCalendarHeatmap
                startDate={new Date(data.startDate)}
                endDate={new Date(data.endDate)}
                values={data.values}
                showWeekdayLabels={false}
                monthLabels={["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]}
                classForValue={(value) => {
                    if (!value) {
                        return "react-calendar-heatmap color-empty";
                    }
                    return "react-calendar-heatmap color-filled";
                    // return `react-calendar-heatmap color-github-${value.count}`;
                }}
                titleForValue={(value) => {
                    if (value && value.date && value.count) {
                        return `${value.count} on ${value.date}`;
                    }
                    return "";
                }}
                tooltipDataAttrs={tooltipDataAttrs}
            />
        </ActivityGraphContainer>
    );
};

export default ActivityGraph;
