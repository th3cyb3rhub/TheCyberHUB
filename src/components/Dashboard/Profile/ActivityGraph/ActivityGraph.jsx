import React from "react";
import ReactCalendarHeatmap from "react-calendar-heatmap";
import { ActivityGraphContainer } from "./ActivityGraphElements";

const ActivityGraph = () => {
    const data = {
        startDate: "2022-01-01", // Start date of the graph data
        endDate: "2022-12-31", // End date of the graph data
        values: [
            { date: "2022-01-01", count: 0 },
            { date: "2022-01-02", count: 1 },
            { date: "2022-01-04", count: 3 },
            { date: "2022-01-05", count: 4 },
            { date: "2022-01-06", count: 5 },
            { date: "2022-01-08", count: 7 },
            { date: "2022-01-09", count: 8 },
            { date: "2022-01-10", count: 9 },
            { date: "2022-01-11", count: 10 },
            { date: "2022-01-12", count: 11 },
            { date: "2022-01-13", count: 12 },
            { date: "2022-01-18", count: 17 },
            { date: "2022-01-19", count: 18 },
            { date: "2022-01-20", count: 19 },
            { date: "2022-01-21", count: 20 },
            { date: "2022-01-22", count: 21 },
            { date: "2022-01-23", count: 22 },
            { date: "2022-01-24", count: 23 },
            { date: "2022-01-25", count: 24 },
            { date: "2022-01-26", count: 25 },
            { date: "2022-01-27", count: 25 },
            { date: "2022-01-28", count: 25 },
            { date: "2022-01-29", count: 25 },
            { date: "2022-01-10", count: 25 },
            { date: "2022-02-01", count: 0 },
            { date: "2022-02-01", count: 0 },
            { date: "2022-02-02", count: 1 },
            { date: "2022-02-04", count: 3 },
            { date: "2022-02-05", count: 4 },
            { date: "2022-02-06", count: 5 },
            { date: "2022-02-08", count: 7 },
            { date: "2022-02-09", count: 8 },
            { date: "2022-02-10", count: 9 },
            { date: "2022-02-11", count: 10 },
            { date: "2022-02-12", count: 11 },
            { date: "2022-02-13", count: 12 },
            { date: "2022-02-18", count: 17 },
            { date: "2022-02-19", count: 18 },
            { date: "2022-02-20", count: 19 },
            { date: "2022-02-21", count: 20 },
            { date: "2022-02-24", count: 23 },
            { date: "2022-02-25", count: 24 },
            { date: "2022-02-26", count: 25 },
            { date: "2022-03-01", count: 0 },
            { date: "2022-03-02", count: 1 },
            { date: "2022-03-04", count: 3 },
            { date: "2022-03-06", count: 5 },
            { date: "2022-03-08", count: 7 },
            { date: "2022-03-10", count: 9 },
            { date: "2022-03-13", count: 12 },
            { date: "2022-03-18", count: 17 },
            { date: "2022-03-21", count: 20 },
            { date: "2022-03-22", count: 21 },
            { date: "2022-03-23", count: 22 },
            { date: "2022-03-24", count: 23 },
            { date: "2022-03-25", count: 24 },
            { date: "2022-03-26", count: 25 },
        ],
    };
    const tooltipDataAttrs = (value) => {
        return {
            "data-tip": value.date, // Set the date as the tooltip data
        };
    };
    return (
        <ActivityGraphContainer>
            <ReactCalendarHeatmap
                startDate={new Date(data.startDate)} // Start date of the graph data
                endDate={new Date(data.endDate)} // End date of the graph data
                values={data.values} // Array of contribution values for each date
                showWeekdayLabels={false} // Hide weekday labels
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
