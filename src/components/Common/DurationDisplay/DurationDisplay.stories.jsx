import React from "react";
import DurationDisplay from "./DurationDisplay";

export default {
    title: "Components/DurationDisplay/DurationDisplay",
    component: DurationDisplay,
    argTypes: {
        startTime: { control: "date" },
        endTime: { control: "date" },
        reschedule: { control: "boolean" },
        showDate: { control: "boolean" },
    },
};

const Template = (args) => <DurationDisplay {...args} />;

export const Default = Template.bind({});
Default.args = {
    startTime: "2024-05-20",
    endTime: "2024-05-20",
    reschedule: false,
    showDate: false,
};

export const WithReschedule = Template.bind({});
WithReschedule.args = {
    startTime: "2024-05-20T08:00:00",
    endTime: "2024-05-20T12:00:00",
    reschedule: true,
    showDate: false,
};
