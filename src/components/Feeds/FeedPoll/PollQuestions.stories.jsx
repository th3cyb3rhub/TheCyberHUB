import React from "react";
import { Poll } from "./Poll";
import { PollQuestions } from "./PollQuestions";

export default {
    title: "Components/Poll/PollQuestions",
    component: Poll,
    id: "components-poll-answers",
};

const Template = (args) => (
    <Poll {...args}>
        <PollQuestions questions={["JavaScript", "Python", "Ruby"]} />
    </Poll>
);

export const DefaultPollQuestions = Template.bind({});
DefaultPollQuestions.args = {
    title: "What Programming language do you use",
    votes: "57 votes",
    daysLeft: "4 days left",
};
