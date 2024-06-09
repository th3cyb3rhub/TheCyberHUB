import React from "react";
import DateDisplay from "./DateDisplay";
import { DateDisplayContainer } from "./DateDisplayElements";

export default {
    title: "Components/DateDisplay/DateDisplay",
    component: DateDisplay,
    argTypes: {
        rightBorder: { control: "boolean" },
        time: { control: "date" },
        isCanBeToday: { control: "boolean" },
    },
};

const Template = (args) => (
    <DateDisplayContainer rightBorder={args.rightBorder}>
        <DateDisplay {...args} />
    </DateDisplayContainer>
);

export const Default = Template.bind({});
Default.args = {
    rightBorder: false,
    time: new Date().toISOString(),
    isCanBeToday: true,
};

export const WithRightBorder = Template.bind({});
WithRightBorder.args = {
    rightBorder: true,
    time: new Date().toISOString(),
    isCanBeToday: true,
};

export const CustomDate = Template.bind({});
CustomDate.args = {
    rightBorder: false,
    time: "2024-05-20T00:00:00Z",
    isCanBeToday: false,
};
